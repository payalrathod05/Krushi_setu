import React, { useState, useEffect } from 'react';

export const Contact = () => {
  const [lang, setLang] = useState("en");
  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const savedLang = localStorage.getItem("km-lang") || "en";
    setLang(savedLang);

    const savedProfile = localStorage.getItem("km-profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      const parsedProfile = JSON.parse(savedProfile);
      setFormData({
        ...formData,
        name: parsedProfile.name || '',
        email: parsedProfile.email || ''
      });
    }

    const onChange = (e) => {
      if (e.detail?.lang) setLang(e.detail.lang);
    };
    window.addEventListener("km-lang-change", onChange);
    return () => window.removeEventListener("km-lang-change", onChange);
  }, []);

  const t =
    lang === "mr"
      ? {
          title: "संपर्क साधा",
          subtitle: "आमच्याशी संपर्क साधा आणि आपल्या प्रश्नांसाठी मदत मिळवा",
          contactInfoTitle: "संपर्क माहिती",
          phone: "फोन",
          phoneNumber: "+91-22-12345678",
          email: "ईमेल",
          emailAddress: "support@krushisetu.in",
          address: "पत्ता",
          addressText: "मुंबई, महाराष्ट्र, भारत",
          formTitle: "आम्हाला संदेश पाठवा",
          name: "नाव",
          emailLabel: "ईमेल",
          subject: "विषय",
          message: "मेसेज",
          submit: "पाठवा",
          submitting: "पाठवत आहे...",
          success: "क्वेरी यशस्वीपणे पाठवली! आम्ही लवकरच उत्तर देऊ.",
          error: "एरर: कृपया पुन्हा प्रयत्न करा.",
          supportTitle: "आम्ही मदत करण्यासाठी येथे आहोत",
          supportDesc: "कोणत्याही प्रश्न, समस्या किंवा अभिप्राय यासाठी आमच्याशी संपर्क साधण्यास मोकळ्या मनाने या."
        }
      : {
          title: "Contact Us",
          subtitle: "Get in touch with us for any queries or support",
          contactInfoTitle: "Contact Information",
          phone: "Phone",
          phoneNumber: "+91-22-12345678",
          email: "Email",
          emailAddress: "support@krushisetu.in",
          address: "Address",
          addressText: "Mumbai, Maharashtra, India",
          formTitle: "Send Us a Message",
          name: "Name",
          emailLabel: "Email",
          subject: "Subject",
          message: "Message",
          submit: "Send Message",
          submitting: "Sending...",
          success: "Query sent successfully! We'll respond soon.",
          error: "Error: Please try again.",
          supportTitle: "We're Here to Help",
          supportDesc: "Feel free to reach out to us for any questions, issues, or feedback."
        };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage(t.error);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      setSubmitMessage(t.success);
      setIsSubmitting(false);
      setFormData({ 
        name: profile?.name || '', 
        email: profile?.email || '', 
        subject: '', 
        message: '' 
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-10 from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-10"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      <main className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Support Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl border-2 border-blue-700 p-8 mb-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-3">{t.supportTitle}</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">{t.supportDesc}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5">
                  <h2 className="text-2xl font-bold text-white text-center">{t.contactInfoTitle}</h2>
                </div>
                <div className="p-8 space-y-6">
                  {/* Phone */}
                  <div className="flex items-start bg-green-50 rounded-xl p-5 border-2 border-green-200 hover:shadow-lg transition-all">
                    <div className="bg-white rounded-full p-3 mr-4">
                      <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-700 mb-1">{t.phone}</p>
                      <p className="text-lg font-bold text-gray-900">{t.phoneNumber}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start bg-blue-50 rounded-xl p-5 border-2 border-blue-200 hover:shadow-lg transition-all">
                    <div className="bg-white rounded-full p-3 mr-4">
                      <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-700 mb-1">{t.email}</p>
                      <p className="text-lg font-bold text-gray-900">{t.emailAddress}</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start bg-orange-50 rounded-xl p-5 border-2 border-orange-200 hover:shadow-lg transition-all">
                    <div className="bg-white rounded-full p-3 mr-4">
                      <svg className="w-7 h-7 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-orange-700 mb-1">{t.address}</p>
                      <p className="text-lg font-bold text-gray-900">{t.addressText}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info Card */}
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-lg border-2 border-purple-200 p-6">
                <div className="flex items-start">
                  <svg className="w-8 h-8 text-purple-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Quick Response Time</h3>
                    <p className="text-sm text-gray-700">We typically respond to queries within 24-48 hours on business days.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5">
                <h2 className="text-2xl font-bold text-white text-center">{t.formTitle}</h2>
              </div>
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {t.name} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {t.emailLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {t.subject}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="What is this about?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {t.message} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us more about your query..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-4 rounded-xl font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t.submitting}
                      </span>
                    ) : (
                      t.submit
                    )}
                  </button>
                </form>
                
                {submitMessage && (
                  <div className={`mt-6 p-4 rounded-xl border-2 ${
                    submitMessage.includes('success') || submitMessage.includes('यशस्वी')
                      ? 'bg-green-50 border-green-300 text-green-800' 
                      : 'bg-red-50 border-red-300 text-red-800'
                  }`}>
                    <div className="flex items-center">
                      {submitMessage.includes('success') || submitMessage.includes('यशस्वी') ? (
                        <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <p className="font-semibold">{submitMessage}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FAQ Prompt */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Have Questions?</h3>
            <p className="text-gray-600 mb-4">Check our FAQ section or reach out directly. We're always happy to help!</p>
          </div>
        </div>
      </main>
    </div>
  );
};