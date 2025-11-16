import { useEffect, useState } from "react";
import { Sprout, CheckCircle, Users, Shield, TrendingUp } from "lucide-react";

export default function Home() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("km-lang") || "en";
    setLang(saved);

    const onChange = (e) => {
      if (e.detail?.lang) setLang(e.detail.lang);
    };
    window.addEventListener("km-lang-change", onChange);
    return () => window.removeEventListener("km-lang-change", onChange);
  }, []);

  const t = lang === "mr" ? {
    hero: "शेतकऱ्यांसाठी सरकारी योजना",
    heroSub: "तुमच्या शेतीच्या आकार व उत्पन्नानुसार योजना शोधा आणि लागू करा",
    govOnly: "फक्त सरकारी योजना — खाजगी योजना समाविष्ट नाहीत",
    getStarted: "आता सुरू करा",
    login: "लॉगिन",
    schemesCount: "उपलब्ध योजना",
    countNote: "४+ योजना सूचीबद्ध",
    farmersHelped: "मदत केलेले शेतकरी",
    farmersNote: "१०,०००+ शेतकरी नोंदणीकृत",
    whyChoose: "कृषी सेतू का निवडा?",
    feature1: "सुरक्षित आणि विश्वसनीय",
    feature1Desc: "तुमचा डेटा संपूर्ण सुरक्षित ठेवला जातो",
    feature2: "सोपी प्रक्रिया",
    feature2Desc: "काही मिनिटांत योजनांसाठी अर्ज करा",
    feature3: "तज्ञ मार्गदर्शन",
    feature3Desc: "तुमच्या प्रश्नांसाठी २४/७ समर्थन",
    feature4: "योग्य योजना शोधा",
    feature4Desc: "तुमच्या प्रोफाइलनुसार वैयक्तिकृत सूचना",
    testimonialTitle: "शेतकरी काय म्हणतात",
    testimonial: "या अॅपमुळे मला माझ्या शेतीसाठी योग्य योजना मिळाल्या. खूप उपयुक्त आहे!",
    testimonialAuthor: "रमेश पाटील",
    testimonialLocation: "सातारा, महाराष्ट्र",
    ctaTitle: "आजच सुरुवात करा",
    ctaSubtitle: "तुमच्यासाठी उपलब्ध योजना शोधा आणि लाभ घ्या",
    ctaButton: "नोंदणी करा",
    alreadyRegistered: "आधीच नोंदणी केली आहे?",
    ctaLogin: "लॉगिन करा"
  } : {
    hero: "Government Schemes for Farmers",
    heroSub: "Discover and apply for schemes tailored to your farm size and income",
    govOnly: "Government schemes only — private schemes are not included",
    getStarted: "Get Started Now",
    login: "Login",
    schemesCount: "Schemes Available",
    countNote: "4+ schemes listed",
    farmersHelped: "Farmers Helped",
    farmersNote: "10,000+ farmers registered",
    whyChoose: "Why Choose Krushi Setu?",
    feature1: "Secure & Reliable",
    feature1Desc: "Your data is completely safe with us",
    feature2: "Easy Process",
    feature2Desc: "Apply for schemes in just minutes",
    feature3: "Expert Guidance",
    feature3Desc: "24/7 support for your queries",
    feature4: "Find Right Schemes",
    feature4Desc: "Personalized recommendations based on your profile",
    testimonialTitle: "What Farmers Say",
    testimonial: "This app helped me find the right schemes for my farm. Very useful!",
    testimonialAuthor: "Ramesh Patil",
    testimonialLocation: "Satara, Maharashtra",
    ctaTitle: "Start Your Journey Today",
    ctaSubtitle: "Discover schemes available for you and claim your benefits",
    ctaButton: "Register Now",
    alreadyRegistered: "Already registered?",
    ctaLogin: "Login"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-8">
              <div className="inline-block px-6 py-3 bg-white border-2 border-green-600 rounded-full shadow-lg">
                <span className="text-green-800 font-semibold text-sm">{t.govOnly}</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                {t.hero}
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {t.heroSub}
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
                <a
                  href="/register"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-800 transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
                >
                  <Sprout className="w-6 h-6" />
                  {t.getStarted}
                </a>
                <a
                  href="/login"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-white text-green-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all border-2 border-green-600 shadow-lg hover:shadow-xl"
                >
                  {t.login}
                </a>
              </div>
            </div>

            {/* Hero Images Grid */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden hover:scale-105 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop"
                  alt="Wheat field"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2316a34a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='white'%3EWheat Field%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden hover:scale-105 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop"
                  alt="Farmers"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23166534'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='white'%3EFarmers%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden hover:scale-105 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop"
                  alt="Rice paddy"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2315803d'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='white'%3ERice Paddy%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden hover:scale-105 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop"
                  alt="Tractor"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23166534'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='white'%3ETractor%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-200 overflow-hidden hover:shadow-3xl transition-all">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                <div className="text-6xl font-bold text-white mb-2">4+</div>
              </div>
              <div className="p-6">
                <div className="text-xl font-bold text-gray-900 mb-2">{t.schemesCount}</div>
                <div className="text-sm text-gray-600">{t.countNote}</div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-200 overflow-hidden hover:shadow-3xl transition-all">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                <div className="text-6xl font-bold text-white mb-2">10K+</div>
              </div>
              <div className="p-6">
                <div className="text-xl font-bold text-gray-900 mb-2">{t.farmersHelped}</div>
                <div className="text-sm text-gray-600">{t.farmersNote}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t.whyChoose}
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Empowering farmers with technology and trust</p>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-200 p-8 hover:shadow-3xl hover:-translate-y-2 transition-all">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900 text-center">{t.feature1}</h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">{t.feature1Desc}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-200 p-8 hover:shadow-3xl hover:-translate-y-2 transition-all">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900 text-center">{t.feature2}</h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">{t.feature2Desc}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-200 p-8 hover:shadow-3xl hover:-translate-y-2 transition-all">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900 text-center">{t.feature3}</h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">{t.feature3Desc}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl border-2 border-orange-200 p-8 hover:shadow-3xl hover:-translate-y-2 transition-all">
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900 text-center">{t.feature4}</h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">{t.feature4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t.testimonialTitle}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-100 to-blue-100 p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <img
                    src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=100&h=100&fit=crop"
                    alt="Farmer"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl flex-shrink-0"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2316a34a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='32' fill='white'%3ERP%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="flex-1">
                    <svg className="w-10 h-10 text-green-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                    <p className="text-xl text-gray-800 mb-6 leading-relaxed italic">
                      {t.testimonial}
                    </p>
                    <div>
                      <p className="font-bold text-lg text-gray-900">{t.testimonialAuthor}</p>
                      <p className="text-gray-600">{t.testimonialLocation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 mx-4 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl shadow-2xl border-2 border-green-700 overflow-hidden">
            <div className="p-12 md:p-16 text-center text-white space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">{t.ctaTitle}</h2>
              <p className="text-xl text-green-100 max-w-2xl mx-auto">{t.ctaSubtitle}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <a
                  href="/register"
                  className="px-10 py-5 bg-white text-green-700 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  {t.ctaButton}
                </a>
                <div className="text-lg">
                  {t.alreadyRegistered}{" "}
                  <a href="/login" className="underline font-bold hover:no-underline">
                    {t.ctaLogin}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}