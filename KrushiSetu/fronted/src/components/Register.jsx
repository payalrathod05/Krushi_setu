import { useState, useEffect } from 'react';
import { Sprout, User, Phone, MapPin, Building2, Landmark, DollarSign, Lock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lang, setLang] = useState("en");
  const navigate = useNavigate()
  const API_BASE_URL = "http://localhost:3001/api/farmer";
  const [form, setForm] = useState({
    kisanId: "",
    name: "",
    mobile: "",
    state: "",
    district: "",
    landSize: 0,
    landUnit: "Acres",
    incomeRange: "lt1",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

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
    title: "नोंदणी",
    subtitle: "शासकीय योजनांसाठी तुमचे खाते तयार करा",
    kisanId: "किसान आयडी",
    kisanIdPlaceholder: "तुमचा किसान आयडी टाका",
    name: "पूर्ण नाव",
    namePlaceholder: "तुमचे पूर्ण नाव",
    mobile: "मोबाइल क्रमांक",
    mobilePlaceholder: "१० अंकी मोबाइल",
    mobileNote: "प्रमाणीकरणासाठी OTP पाठवला जाईल",
    state: "राज्य",
    statePlaceholder: "राज्य निवडा",
    district: "जिल्हा",
    districtPlaceholder: "तुमचा जिल्हा टाका",
    landSize: "एकूण जमीन",
    landUnit: "एकक",
    incomeRange: "वार्षिक उत्पन्न श्रेणी",
    password: "पासवर्ड तयार करा",
    passwordPlaceholder: "तुमचा पासवर्ड टाका",
    confirmPassword: "पासवर्ड पुन्हा टाका",
    confirmPasswordPlaceholder: "पासवर्ड पुन्हा टाका",
    submit: "नोंदणी",
    submitting: "नोंदणी करत आहे...",
    haveAccount: "आधीच खाते आहे?",
    login: "लॉगिन करा",
    errorRequired: "सर्व क्षेत्रे भरून घ्या",
    errorPasswordMismatch: "पासवर्ड जुळत नाहीत",
    heroTitle: "समुदायात सामील व्हा",
    heroSubtitle: "आजच तुमचा योजना प्रवास सुरू करा",
    benefit1: "सुरक्षित डेटा",
    benefit2: "जलद प्रक्रिया",
    benefit3: "२४/७ समर्थन"
  } : {
    title: "Register",
    subtitle: "Create your account to access government schemes",
    kisanId: "Kisan ID",
    kisanIdPlaceholder: "Enter your Kisan ID",
    name: "Full Name",
    namePlaceholder: "Your full name",
    mobile: "Mobile Number",
    mobilePlaceholder: "10-digit mobile",
    mobileNote: "An OTP will be sent for verification",
    state: "State",
    statePlaceholder: "Select state",
    district: "District",
    districtPlaceholder: "Enter your district",
    landSize: "Total Land Size",
    landUnit: "Units",
    incomeRange: "Annual Income Range",
    password: "Create Password",
    passwordPlaceholder: "Enter your password",
    confirmPassword: "Confirm Password",
    confirmPasswordPlaceholder: "Confirm your password",
    submit: "Register",
    submitting: "Registering...",
    haveAccount: "Already have an account?",
    login: "Login",
    errorRequired: "Please fill all required fields",
    errorPasswordMismatch: "Passwords do not match",
    heroTitle: "Join the Community",
    heroSubtitle: "Start Your Scheme Journey Today",
    benefit1: "Secure Data",
    benefit2: "Fast Process",
    benefit3: "24/7 Support"
  };

  function handleChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError('');
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   if (
  //     !form.kisanId ||
  //     !form.name ||
  //     !form.mobile ||
  //     !form.state ||
  //     !form.district ||
  //     !form.landSize ||
  //     !form.password ||
  //     !confirmPassword
  //   ) {
  //     setError(t.errorRequired);
  //     return;
  //   }
  //   if (form.password !== confirmPassword) {
  //     setError(t.errorPasswordMismatch);
  //     return;
  //   }

  //   setLoading(true);
  //   setTimeout(() => {
  //     localStorage.setItem("km-profile", JSON.stringify(form));
  //     localStorage.setItem("km-auth", JSON.stringify({ kisanId: form.kisanId }));
  //     console.log('Registration successful:', form);
  //     setLoading(false);
  //     // Navigate: window.location.href = '/dashboard';
  //   }, 1500);
  // }
async function handleSubmit(e) {
  e.preventDefault();

  // Basic validation
  if (
    !form.kisanId ||
    !form.name ||
    !form.mobile ||
    !form.state ||
    !form.district ||
    !form.landSize ||
    !form.password ||
    !confirmPassword
  ) {
    setError(t.errorRequired);
    return;
  }

  if (form.password !== confirmPassword) {
    setError(t.errorPasswordMismatch);
    return;
  }

  setLoading(true);
  setError("");

try {
  const response = await fetch("http://localhost:3001/api/farmers/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: form.name,
      mobile: form.mobile,
      aadhaar: form.kisanId,
      password: form.password,
      pm_kisan_id: form.kisanId,
      district: form.district,
      state: form.state,
      land_size: form.landSize,
      income: form.incomeRange,
      crop_type: "Unknown"
    }),
  });

  const text = await response.text();  // instead of json
  console.log("Server returned:", text);

  let data;
  try {
    data = JSON.parse(text); // Try parsing JSON if possible
  } catch {
    throw new Error("Server returned invalid JSON");
  }

  if (!response.ok) throw new Error(data.message || "Registration failed");

  console.log("✅ Registration successful:", data);
   navigate("/eligible-scheme");
} catch (err) {
  toast.error(err.message)
  setError(err.message);
} finally {
  setLoading(false);
}


}




  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 flex flex-col">
   
      

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Hero Section with Image */}
            <div className="hidden lg:block sticky top-24">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=700&fit=crop"
                  alt="Farmers working together in field"
                  className="w-full h-[600px] object-cover rounded-3xl shadow-2xl"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='700'%3E%3Crect width='600' height='700' fill='%23166534'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='white'%3EFarmer Community%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/40 to-transparent rounded-3xl"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h2 className="text-4xl font-bold mb-3">{t.heroTitle}</h2>
                  <p className="text-xl opacity-90 mb-6">{t.heroSubtitle}</p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">{t.benefit1}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">{t.benefit2}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">{t.benefit3}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Registration Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-green-800 mb-3">{t.title}</h1>
                <p className="text-gray-600 text-lg">{t.subtitle}</p>
              </div>

              <div className="space-y-5">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
                    <p className="font-medium">{error}</p>
                  </div>
                )}

                {/* Kisan ID */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 text-green-600" />
                    {t.kisanId}
                  </label>
                  <input
                    type="text"
                    value={form.kisanId}
                    onChange={(e) => handleChange("kisanId", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder={t.kisanIdPlaceholder}
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 text-green-600" />
                    {t.name}
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder={t.namePlaceholder}
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    {t.mobile}
                  </label>
                  <input
                    type="tel"
                    value={form.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder={t.mobilePlaceholder}
                  />
                  <p className="text-xs text-gray-500 mt-1">{t.mobileNote}</p>
                </div>
                {/* Aadhaar Number */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 text-green-600" />
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    value={form.aadhaar}
                    onChange={(e) => handleChange("aadhaar", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="Enter your Aadhaar number"
                  />
                </div>


                {/* State & District */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      {t.state}
                    </label>
                    <select
                      value={form.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    >
                      <option value="">{t.statePlaceholder}</option>
                      <option value="Maharashtra">महाराष्ट्र / Maharashtra</option>
                      <option value="Karnataka">कर्नाटक / Karnataka</option>
                      <option value="Gujarat">गुजरात / Gujarat</option>
                      <option value="Punjab">पंजाब / Punjab</option>
                      <option value="UP">उत्तर प्रदेश / UP</option>
                    </select>
                  </div>

                  


                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Building2 className="w-4 h-4 text-green-600" />
                      {t.district}
                    </label>
                    <input
                      type="text"
                      value={form.district}
                      onChange={(e) => handleChange("district", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                      placeholder={t.districtPlaceholder}
                    />
                  </div>
                </div>

                {/* Land Size & Unit */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Landmark className="w-4 h-4 text-green-600" />
                      {t.landSize}
                    </label>
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={form.landSize}
                      onChange={(e) => handleChange("landSize", Number(e.target.value) || 0)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.landUnit}</label>
                    <select
                      value={form.landUnit}
                      onChange={(e) => handleChange("landUnit", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    >
                      <option value="Acres">एक्र / Acres</option>
                      <option value="Hectares">हेक्टेअर / Hectares</option>
                      <option value="Bigha">बीघा / Bigha</option>
                    </select>
                  </div>
                </div>

                {/* Income Range */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    {t.incomeRange}
                  </label>
                  <select
                    value={form.incomeRange}
                    onChange={(e) => handleChange("incomeRange", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                  >
                    <option value="lt1">₹1 लाख ते कमी / Less than ₹1 Lakh</option>
                    <option value="1to3">₹1 लाख - ₹3 लाख / ₹1-3 Lakh</option>
                    <option value="gt3">₹3 लाख ते जास्ती / More than ₹3 Lakh</option>
                  </select>
                </div>

                {/* Password */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Lock className="w-4 h-4 text-green-600" />
                    {t.password}
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder={t.passwordPlaceholder}
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Lock className="w-4 h-4 text-green-600" />
                    {t.confirmPassword}
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder={t.confirmPasswordPlaceholder}
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? t.submitting : t.submit}
                </button>
              </div>

              <div className="mt-6 text-center text-gray-600">
                {t.haveAccount}{" "}
                <a href="/login" className="text-green-600 hover:text-green-700 font-semibold hover:underline">
                  {t.login}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

   
    </div>
  );
}