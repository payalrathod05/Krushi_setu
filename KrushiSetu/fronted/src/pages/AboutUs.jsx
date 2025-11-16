import React, { useState, useEffect } from 'react';

export const AboutUs = () => {
  const [lang, setLang] = useState("en");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const savedLang = localStorage.getItem("km-lang") || "en";
    setLang(savedLang);

    const savedProfile = localStorage.getItem("km-profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
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
          title: "आमच्याबद्दल",
          subtitle: "कृषी सेटू: शेतकऱ्यांना शासकीय योजनांपर्यंत जोडणारा पुल",
          missionTitle: "आमचा ध्येय",
          missionDesc: "कृषी सेटू हे एक डिजिटल प्लॅटफॉर्म आहे जे भारतीय शेतकऱ्यांना सरकारी योजनांची माहिती, वैयक्तिकृत शिफारसी आणि सोपी अर्ज प्रक्रिया पुरवते. आम्ही कृषी आणि शेतकरी कल्याण विभागाच्या अधिकृत स्रोतांवरून माहिती क्यूरेट करतो, जेणेकरून शेतकरी त्यांच्या राज्य, जमिनीच्या आकार आणि पिकांनुसार योग्य योजना शोधू शकतील.",
          schemesTitle: "आम्ही सुविधा देणाऱ्या प्रमुख योजना",
          schemesDesc: "आम्ही PM-KISAN, PMFBY, माती आरोग्य कार्ड यांसारख्या प्रमुख योजनांची माहिती आणि अर्ज मार्गदर्शन पुरवतो.",
          pmKisan: {
            name: "प्रधानमंत्री किसान सम्मान निधी (PM-KISAN)",
            desc: "छोटे आणि सीमांत शेतकऱ्यांना वार्षिक ₹६,००० थेट लाभ हस्तांतरण. २१वी किश्त ऑक्टोबर २५ ते नोव्हेंबर ३०, २०२५ दरम्यान अपेक्षित; जम्मू & काश्मीरमध्ये ७ ऑक्टोबर २०२५ रोजी जारी.",
            useful: "आर्थिक स्थिरता पुरवते, ज्यामुळे शेतकरी जोखमीपूर्ण गुंतवणुकीसाठी तयार राहू शकतात."
          },
          pmfby: {
            name: "प्रधानमंत्री फसल बीमा योजना (PMFBY)",
            desc: "सूचीबद्ध पिकांसाठी विमा संरक्षण. जनवरी २०२५ मध्ये पुढील कालावधीसाठी मंजूर; खरीफ २०२५ साठी दरवाज्यासाठी धोरण वितरण सुरू.",
            useful: "नैसर्गिक आपत्तींमधील नुकसान भरपाई, उत्पादकता वाढवते."
          },
          soilHealth: {
            name: "माती आरोग्य कार्ड योजना",
            desc: "माती चाचणी आणि खत शिफारसी. जुलै २०२५ पर्यंत २५ कोटी कार्ड वितरित; २०२५-२६ मध्ये ४१.९९ लाख नमुने विश्लेषित.",
            useful: "सुपीकता सुधारते, खत खर्च कमी करते आणि उत्पादन वाढवते."
          },
          connectionTitle: "योजनांचे कनेक्शन",
          connectionDesc: "या योजना एकमेकांना पूरक आहेत. उदाहरणार्थ, माती आरोग्य कार्ड मातीची माहिती पुरवते जी PMKSY अंतर्गत सिंचन योजना सुधारण्यास मदत करते. PM-KISAN चा आर्थिक आधार PMFBY च्या विम्याबरोबर जोडला जाऊ शकतो, ज्यामुळे शेतकरी जोखमींविरुद्ध संरक्षित राहतात आणि उत्पादकता वाढवतात.",
          whyApplyTitle: "शेतकऱ्यांनी अर्ज का करावा?",
          whyApplyDesc: "या योजनांमुळे आय वाढ, जोखीम कमी, आणि शाश्वत शेती शक्य होते. कृषी सेटू वैयक्तिकृत शिफारसी आणि सोपी अर्ज प्रक्रिया पुरवते, ज्यामुळे शेतकरी सरकारी लाभांपर्यंत सहज पोहोचू शकतात. आजच नोंदणी करा आणि आपल्या शेतीला सशक्त करा!",
          cta: "नोंदणी करा आणि योजना शोधा"
        }
      : {
          title: "About Us",
          subtitle: "Krushi Setu: Bridging Farmers to Government Schemes",
          missionTitle: "Our Mission",
          missionDesc: "Krushi Setu is a digital platform that provides Indian farmers with information on government schemes, personalized recommendations, and easy application processes. We curate data from official sources of the Department of Agriculture & Farmers Welfare, helping farmers find suitable schemes based on their state, land size, and crops.",
          schemesTitle: "Key Schemes We Feature",
          schemesDesc: "We provide information and application guidance for major schemes like PM-KISAN, PMFBY, and Soil Health Card.",
          pmKisan: {
            name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
            desc: "₹6,000 annual direct benefit transfer for small and marginal farmers. 21st installment expected between October 25 - November 30, 2025; released in Jammu & Kashmir on October 7, 2025.",
            useful: "Provides financial stability, enabling farmers to invest confidently."
          },
          pmfby: {
            name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            desc: "Crop insurance for notified crops against calamities. Approved for continuation in January 2025; doorstep policy distribution started for Kharif 2025.",
            useful: "Compensates losses from natural disasters, boosting productivity."
          },
          soilHealth: {
            name: "Soil Health Card Scheme",
            desc: "Soil testing and fertilizer recommendations. Over 25 crore cards distributed as of July 2025; 41.99 lakh samples analyzed in 2025-26.",
            useful: "Improves soil fertility, reduces fertilizer costs, and increases yields."
          },
          connectionTitle: "How Schemes Connect",
          connectionDesc: "These schemes are interconnected. For instance, Soil Health Cards provide soil insights that enhance irrigation under PMKSY. PM-KISAN's financial support pairs with PMFBY insurance, protecting farmers from risks while promoting higher productivity.",
          whyApplyTitle: "Why Farmers Should Apply",
          whyApplyDesc: "These schemes increase income, reduce risks, and enable sustainable farming. Krushi Setu offers personalized recommendations and simplified applications, making government benefits accessible. Register today and empower your farming!",
          cta: "Register and Explore Schemes"
        };

  const handleCTA = () => {
    if (!profile) {
      window.location.href = '/register';
    } else {
      window.location.href = '/schemes';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-10 from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-10"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t.title}
            </h1>
            <p className="text-2xl md:text-3xl text-green-700 font-semibold max-w-3xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      <main className="py-12 px-4">
        <div className="container mx-auto max-w-6xl space-y-12">
          {/* Mission Section */}
          <section className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
              <h2 className="text-3xl font-bold text-white text-center">{t.missionTitle}</h2>
            </div>
            <div className="p-8 md:p-12">
              <div className="flex items-start mb-6">
                <div className="bg-green-100 rounded-full p-4 mr-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed flex-1">
                  {t.missionDesc}
                </p>
              </div>
            </div>
          </section>

          {/* Schemes Section */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.schemesTitle}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.schemesDesc}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* PM-KISAN Card */}
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-green-100 to-blue-100 h-48 flex items-center justify-center">
                  <div className="text-8xl">💰</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.pmKisan.name}</h3>
                  <div className="mb-4">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-3">
                      <p className="text-sm text-gray-700 leading-relaxed">{t.pmKisan.desc}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm text-green-800 font-semibold">{t.pmKisan.useful}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PMFBY Card */}
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-48 flex items-center justify-center">
                  <div className="text-8xl">🛡️</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.pmfby.name}</h3>
                  <div className="mb-4">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-3">
                      <p className="text-sm text-gray-700 leading-relaxed">{t.pmfby.desc}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm text-green-800 font-semibold">{t.pmfby.useful}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Soil Health Card */}
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 h-48 flex items-center justify-center">
                  <div className="text-8xl">🌱</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.soilHealth.name}</h3>
                  <div className="mb-4">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-3">
                      <p className="text-sm text-gray-700 leading-relaxed">{t.soilHealth.desc}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm text-green-800 font-semibold">{t.soilHealth.useful}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Connection Section */}
          <section className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h2 className="text-3xl font-bold text-white text-center">{t.connectionTitle}</h2>
            </div>
            <div className="p-8 md:p-12">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-4 mr-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed flex-1">
                  {t.connectionDesc}
                </p>
              </div>
            </div>
          </section>

          {/* Why Apply Section */}
          <section className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-2xl border-2 border-green-700 overflow-hidden">
            <div className="p-8 md:p-12 text-center text-white">
              <h2 className="text-4xl font-bold mb-6">{t.whyApplyTitle}</h2>
              <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-8">
                {t.whyApplyDesc}
              </p>
              <button
                onClick={handleCTA}
                className="px-10 py-4 rounded-xl font-bold text-lg bg-white text-green-700 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {t.cta}
              </button>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 p-6 text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Increase Income</h3>
              <p className="text-gray-600">Direct financial benefits to boost your farming income</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-6 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Reduce Risks</h3>
              <p className="text-gray-600">Insurance protection against natural calamities</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-2 border-yellow-200 p-6 text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainable Farming</h3>
              <p className="text-gray-600">Improve soil health and increase crop yields</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};