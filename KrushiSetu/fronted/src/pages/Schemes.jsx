import { useState, useEffect } from "react";
import { Loader2, Sparkles, TrendingUp, MapPin, Award, Leaf, ChevronRight, CheckCircle2, DollarSign, Users, Calendar, ArrowUpRight, Info } from "lucide-react";

export default function AllSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lang, setLang] = useState("en");
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("schemes");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const onChange = (e) => {
      if (e.detail?.lang) setLang(e.detail.lang);
    };
    
    const onProfileChange = (e) => {
      if (e.detail?.profile) {
        setProfile(e.detail.profile);
      }
    };

    window.addEventListener("km-lang-change", onChange);
    window.addEventListener("km-profile-change", onProfileChange);
    
    return () => {
      window.removeEventListener("km-lang-change", onChange);
      window.removeEventListener("km-profile-change", onProfileChange);
    };
  }, []);

  useEffect(() => {
    async function fetchSchemes() {
      try {
        const response = await fetch("http://localhost:3001/api/schemes/", {
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch schemes");
        }

        const data = await response.json();
        
        if (data.schemes) {
          setSchemes(data.schemes);
        } else if (Array.isArray(data)) {
          setSchemes(data);
        } else {
          setSchemes([]);
        }

        if (data.crops) {
          setCrops(data.crops);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSchemes();
  }, []);

  const handleApply = (schemeName) => {
    alert(`Applying for: ${schemeName}\n\nIn production, this would navigate to the application form.`);
  };

  const handleViewDetails = (scheme) => {
    setSelectedScheme(scheme);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedScheme(null), 300);
  };

  const t = lang === "mr" ? {
    title: "उपलब्ध योजना",
    subtitle: "तुमच्या प्रोफाइलनुसार योग्य शासकीय योजना शोधा",
    noProfile: "प्रथम नोंदणी करा किंवा लॉगिन करा योजना पाहण्यासाठी",
    eligibility: "पात्रता",
    benefits: "फायदे",
    loading: "योजना लोड करत आहे...",
    error: "त्रुटी",
    noSchemes: "योजना उपलब्ध नाहीत",
    tryAgain: "पुन्हा प्रयत्न करा",
    generalSchemes: "सामान्य योजना",
    applyNow: "अर्ज करा",
    register: "नोंदणी करा",
    login: "लॉगिन",
    cropsTitle: "उपलब्ध पिके",
    cropsSubtitle: "तुमच्या प्रोफाइलनुसार योग्य पिकांची माहिती",
    suitableStates: "योग्य राज्ये",
    yield: "उत्पादन",
    learnMore: "अधिक जाणून घ्या",
    profileInfo: "तुमच्या प्रोफाइलवर आधारित (राज्य: {state}, जमीन: {land} {unit}), या शिफारसी आहेत.",
    schemesTab: "योजना",
    cropsTab: "पिके",
    tailored: "विशेष शिफारस",
    viewDetails: "तपशील पहा",
    schemeDetails: "योजनेचे तपशील",
    closeModal: "बंद करा",
    applyForScheme: "या योजनेसाठी अर्ज करा",
    description: "वर्णन"
  } : {
    title: "Available Schemes",
    subtitle: "Discover government schemes tailored to your profile",
    noProfile: "Register or login first to view personalized schemes",
    eligibility: "Eligibility",
    benefits: "Benefits",
    loading: "Loading schemes...",
    error: "Error",
    noSchemes: "No schemes available",
    tryAgain: "Try Again",
    generalSchemes: "General Schemes",
    applyNow: "Apply Now",
    register: "Register",
    login: "Login",
    cropsTitle: "Available Crops",
    cropsSubtitle: "Crop information tailored to your profile",
    suitableStates: "Suitable States",
    yield: "Yield",
    learnMore: "Learn More",
    profileInfo: "Based on your profile (State: {state}, Land: {land} {unit}), these are tailored recommendations.",
    schemesTab: "Schemes",
    cropsTab: "Crops",
    tailored: "Tailored for You",
    viewDetails: "View Details",
    schemeDetails: "Scheme Details",
    closeModal: "Close",
    applyForScheme: "Apply for this Scheme",
    description: "Description"
  };

  const staticCrops = [
    {
      name: lang === "mr" ? "तांदूळ (Rice)" : "Rice",
      description: lang === "mr" 
        ? "मुख्य अन्नधान्य पिक, खरीप हंगामात लावले जाते. भारतातील प्रमुख पिक."
        : "Major food grain crop, sown in Kharif season. Key crop in India.",
      suitableStates: lang === "mr" 
        ? "महाराष्ट्र, आंध्र प्रदेश, पश्चिम बंगाल"
        : "Maharashtra, Andhra Pradesh, West Bengal",
      yield: lang === "mr" ? "२५००-३००० किलो/हेक्टर" : "2500-3000 kg/hectare",
      benefits: lang === "mr" ? "उच्च उत्पादन, निर्यात संधी" : "High production, export opportunities",
      icon: "🌾",
      color: "from-amber-400 to-orange-500"
    },
    {
      name: lang === "mr" ? "गहू (Wheat)" : "Wheat",
      description: lang === "mr"
        ? "रब्बी हंगामातील मुख्य पिक, पोषणयुक्त अन्नधान्य."
        : "Main Rabi season crop, nutritious food grain.",
      suitableStates: lang === "mr"
        ? "पंजाब, उत्तर प्रदेश, हरियाणा"
        : "Punjab, Uttar Pradesh, Haryana",
      yield: lang === "mr" ? "३०००-४००० किलो/हेक्टर" : "3000-4000 kg/hectare",
      benefits: lang === "mr" ? "स्थिर उत्पन्न, सरकारी खरेदी" : "Stable income, government procurement",
      icon: "🌾",
      color: "from-yellow-400 to-amber-500"
    },
    {
      name: lang === "mr" ? "डाळी (Pulses)" : "Pulses",
      description: lang === "mr"
        ? "प्रोटीन समृद्ध पिक, माती सुधारणा करणारे."
        : "Protein-rich crop, improves soil fertility.",
      suitableStates: lang === "mr"
        ? "मध्य प्रदेश, राजस्थान, महाराष्ट्र"
        : "Madhya Pradesh, Rajasthan, Maharashtra",
      yield: lang === "mr" ? "८००-१२०० किलो/हेक्टर" : "800-1200 kg/hectare",
      benefits: lang === "mr" ? "स्वावलंबन, कमी पाणी आवश्यक" : "Self-reliance, low water requirement",
      icon: "🫘",
      color: "from-green-400 to-emerald-500"
    },
    {
      name: lang === "mr" ? "कापूस (Cotton)" : "Cotton",
      description: lang === "mr"
        ? "नगदी पिक, कपडा उद्योगासाठी महत्त्वाचे."
        : "Cash crop, essential for textile industry.",
      suitableStates: lang === "mr"
        ? "गुजरात, महाराष्ट्र, तेलंगणा"
        : "Gujarat, Maharashtra, Telangana",
      yield: lang === "mr" ? "४००-६०० किलो/हेक्टर" : "400-600 kg/hectare",
      benefits: lang === "mr" ? "उच्च किंमत, निर्यात" : "High market price, exports",
      icon: "🌸",
      color: "from-pink-400 to-rose-500"
    },
    {
      name: lang === "mr" ? "सोयाबीन (Soybean)" : "Soybean",
      description: lang === "mr"
        ? "तेल आणि प्रोटीन स्रोत, खरीप पिक."
        : "Oil and protein source, Kharif crop.",
      suitableStates: lang === "mr"
        ? "मध्य प्रदेश, महाराष्ट्र, राजस्थान"
        : "Madhya Pradesh, Maharashtra, Rajasthan",
      yield: lang === "mr" ? "१५००-२५०० किलो/हेक्टर" : "1500-2500 kg/hectare",
      benefits: lang === "mr" ? "बहुपयोगी, माती नायट्रोजन वाढवते" : "Multi-purpose, enriches soil nitrogen",
      icon: "🫛",
      color: "from-lime-400 to-green-500"
    },
    {
      name: lang === "mr" ? "भात (Paddy)" : "Paddy",
      description: lang === "mr"
        ? "तांदूळ उत्पादनासाठी, पाणी भरपूर भागात."
        : "For rice production, suitable in water-abundant areas.",
      suitableStates: lang === "mr"
        ? "ओडिशा, बिहार, तामिळनाडू"
        : "Odisha, Bihar, Tamil Nadu",
      yield: lang === "mr" ? "३०००-४००० किलो/हेक्टर" : "3000-4000 kg/hectare",
      benefits: lang === "mr" ? "मुख्य अन्न, सरकारी योजनांचा लाभ" : "Staple food, benefits from government schemes",
      icon: "🌾",
      color: "from-teal-400 to-cyan-500"
    },
  ];

  const displayCrops = crops.length > 0 ? crops : staticCrops;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGFhNTUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMCAyNGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
        <div className="text-center relative z-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <Loader2 className="w-16 h-16 text-green-600 animate-spin relative z-10" />
          </div>
          <p className="text-gray-700 text-xl font-semibold mt-6">{t.loading}</p>
          <div className="flex gap-2 justify-center mt-4">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white text-3xl font-bold">!</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{t.error}</h3>
            <p className="text-red-600 mb-6 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              {t.tryAgain}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0  overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <main className="relative mt-20 z-10 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Header */}
          {/* <section className="text-center mb-16 relative">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
              <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
              <span className="text-green-700 font-semibold">{profile ? t.tailored : t.generalSchemes}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
              {t.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 font-medium">
              {t.subtitle}
            </p>

            {!profile && (
              <div className="mt-8 bg-white/60 backdrop-blur-md rounded-3xl p-8 max-w-2xl mx-auto shadow-xl border border-white/20">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Info className="w-6 h-6 text-blue-600" />
                  <p className="text-lg text-gray-800 font-semibold">{t.noProfile}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <button
                    onClick={() => alert('Navigate to /register')}
                    className="group px-8 py-4 rounded-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-2xl flex items-center justify-center gap-2"
                  >
                    {t.register}
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => alert('Navigate to /login')}
                    className="px-8 py-4 rounded-2xl font-bold bg-white text-gray-800 hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl border-2 border-gray-200"
                  >
                    {t.login}
                  </button>
                </div>
              </div>
            )}
          </section> */}

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-2 shadow-xl inline-flex gap-2">
              <button
                onClick={() => setActiveTab("schemes")}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "schemes"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                <Award className="w-5 h-5" />
                {t.schemesTab}
              </button>
              <button
                onClick={() => setActiveTab("crops")}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "crops"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                <Leaf className="w-5 h-5" />
                {t.cropsTab}
              </button>
            </div>
          </div>

          {/* Schemes Section */}
          {activeTab === "schemes" && (
            <section className="mb-16">
              {schemes.length === 0 ? (
                <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl p-16 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-12 h-12 text-gray-500" />
                  </div>
                  <p className="text-gray-600 text-xl font-semibold">{t.noSchemes}</p>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {schemes.map((scheme, index) => (
                    <div
                      key={scheme.id || index}
                      onMouseEnter={() => setHoveredCard(`scheme-${index}`)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className={`group bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/20 ${
                        hoveredCard === `scheme-${index}` ? "ring-4 ring-green-400/50" : ""
                      }`}
                    >
                      <div className="relative h-48 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 overflow-hidden">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`text-7xl transform transition-transform duration-500 ${
                            hoveredCard === `scheme-${index}` ? "scale-125 rotate-12" : ""
                          }`}>
                            🌾
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                            <span className="text-green-700 font-bold text-sm">#{index + 1}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-green-600 transition-colors">
                          {scheme.name}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                          {scheme.description}
                        </p>
                        
                        <div className="space-y-3 mb-6">
                          {scheme.eligibility && (
                            <div className="flex items-start gap-3 bg-green-50 p-3 rounded-xl">
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold text-green-900 text-xs uppercase tracking-wide">{t.eligibility}</p>
                                <p className="text-sm text-gray-700">{scheme.eligibility}</p>
                              </div>
                            </div>
                          )}
                          {(scheme.benefits || scheme.benefit_amount) && (
                            <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-xl">
                              <DollarSign className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold text-blue-900 text-xs uppercase tracking-wide">{t.benefits}</p>
                                <p className="text-sm text-gray-700">{scheme.benefits || scheme.benefit_amount}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleViewDetails(scheme)}
                          className="w-full py-4 px-6 rounded-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                        >
                          {t.viewDetails}
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Crops Section */}
          {activeTab === "crops" && (
            <section className="mb-16">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {displayCrops.map((crop, index) => (
                  <div
                    key={crop.id || index}
                    onMouseEnter={() => setHoveredCard(`crop-${index}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`group bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/20 ${
                      hoveredCard === `crop-${index}` ? "ring-4 ring-emerald-400/50" : ""
                    }`}
                  >
                    <div className={`relative h-48 bg-gradient-to-br ${crop.color || "from-green-400 to-emerald-500"} overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`text-7xl transform transition-transform duration-500 ${
                          hoveredCard === `crop-${index}` ? "scale-125 rotate-12" : ""
                        }`}>
                          {crop.icon || "🌱"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-emerald-600 transition-colors">
                        {crop.name}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {crop.description}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        {crop.suitableStates && (
                          <div className="flex items-start gap-3 bg-purple-50 p-3 rounded-xl">
                            <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold text-purple-900 text-xs uppercase tracking-wide">{t.suitableStates}</p>
                              <p className="text-sm text-gray-700">{crop.suitableStates}</p>
                            </div>
                          </div>
                        )}
                        {crop.yield && (
                          <div className="flex items-start gap-3 bg-orange-50 p-3 rounded-xl">
                            <TrendingUp className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold text-orange-900 text-xs uppercase tracking-wide">{t.yield}</p>
                              <p className="text-sm text-gray-700">{crop.yield}</p>
                            </div>
                          </div>
                        )}
                        {crop.benefits && (
                          <div className="flex items-start gap-3 bg-teal-50 p-3 rounded-xl">
                            <Award className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold text-teal-900 text-xs uppercase tracking-wide">{t.benefits}</p>
                              <p className="text-sm text-gray-700">{crop.benefits}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <button className="w-full py-4 px-6 rounded-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                        {t.learnMore}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Profile Info Banner */}
          {profile && (
            <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full mb-6">
                  <Users className="w-5 h-5 text-white" />
                  <span className="text-white font-bold">{t.tailored}</span>
                </div>
                <p className="text-xl md:text-2xl text-white font-semibold max-w-3xl mx-auto leading-relaxed">
                  {t.profileInfo
                    .replace("{state}", profile?.state || "N/A")
                    .replace("{land}", profile?.landSize || "N/A")
                    .replace("{unit}", profile?.landUnit || "")}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Scheme Details Modal */}
      {showModal && selectedScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          ></div>
          
          {/* Modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-8 rounded-t-3xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-4">
                    <Award className="w-4 h-4 text-white" />
                    <span className="text-white font-semibold text-sm">{t.schemeDetails}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {selectedScheme.name}
                  </h2>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all hover:rotate-90"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Description */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{t.description}</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed bg-blue-50 p-6 rounded-2xl">
                  {selectedScheme.description}
                </p>
              </div>

              {/* Eligibility */}
              {selectedScheme.eligibility && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{t.eligibility}</h3>
                  </div>
                  <div className="bg-green-50 p-6 rounded-2xl">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {selectedScheme.eligibility}
                    </p>
                  </div>
                </div>
              )}

              {/* Benefits */}
              {(selectedScheme.benefits || selectedScheme.benefit_amount) && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{t.benefits}</h3>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-2xl">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {selectedScheme.benefits || selectedScheme.benefit_amount}
                    </p>
                  </div>
                </div>
              )}

              {/* Additional Details */}
              {selectedScheme.deadline && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Application Deadline</h3>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-2xl">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {selectedScheme.deadline}
                    </p>
                  </div>
                </div>
              )}

              {/* Apply Button */}
              {/* <div className="sticky bottom-0 bg-white pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleApply(selectedScheme.name)}
                  className="w-full py-5 px-6 rounded-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg group"
                >
                  <Award className="w-6 h-6" />
                  {t.applyForScheme}
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}