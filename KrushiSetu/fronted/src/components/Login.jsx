import { useState, useEffect } from 'react';
import { Phone, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../App';

export default function Login() {
  const [lang, setLang] = useState("en");
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
    title: "लॉगिन",
    subtitle: "तुमच्या खात्यात लॉगिन करा",
    mobile: "मोबाइल नंबर / किसान आयडी",
    mobilePlaceholder: "तुमचा मोबाइल नंबर किंवा किसान आयडी",
    password: "पासवर्ड",
    passwordPlaceholder: "तुमचा पासवर्ड",
    submit: "लॉगिन करा",
    submitting: "लॉगिन करत आहे...",
    noAccount: "खाते नाही आहे?",
    register: "नोंदणी करा",
    forgotPassword: "पासवर्ड विसरलात?",
    errorRequired: "सर्व क्षेत्रे भरून घ्या",
    errorInvalid: "अमान्य मोबाइल किंवा पासवर्ड",
    loginSuccess: "लॉगिन यशस्वी!"
  } : {
    title: "Login",
    subtitle: "Log in to your account",
    mobile: "Mobile Number / Kisan ID",
    mobilePlaceholder: "Enter your mobile or Kisan ID",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    submit: "Login",
    submitting: "Logging in...",
    noAccount: "Don't have an account?",
    register: "Register",
    forgotPassword: "Forgot password?",
    errorRequired: "Please fill all fields",
    errorInvalid: "Invalid mobile or password",
    loginSuccess: "Login Successful!"
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!mobile || !password) {
    toast.error(t.errorRequired);
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("http://localhost:3001/api/farmers/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, password }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || t.errorInvalid);

    // Save login data in localStorage as 'krushiSetu'
    const krushiSetuData = {
      token: data.token,
      farmer: data.farmer
    };
    localStorage.setItem("krushiSetu", JSON.stringify(krushiSetuData));

    // Optional: Update auth context if you are still using it
    login({
      farmer_id: data.farmer.farmer_id,
      name: data.farmer.name,
      id: data.farmer.id
    });

    toast.success(t.loginSuccess);

    // Navigate to eligible schemes page
    setTimeout(() => {
      navigate("/eligible-scheme");
    }, 500);

  } catch (err) {
    console.error("Login failed:", err);
    toast.error(err.message || t.errorInvalid);
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 flex flex-col">
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Hero Image */}
              <div className="hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=650&fit=crop"
                  alt="Farm Landscape"
                  className="w-full h-[650px] object-cover rounded-3xl shadow-2xl"
                />
              </div>

              {/* Login Form */}
              <div className="w-full max-w-md mx-auto lg:mx-0">
                <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold text-green-800 mb-3">{t.title}</h1>
                    <p className="text-gray-600 text-lg">{t.subtitle}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Mobile / Kisan ID */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Phone className="w-4 h-4 text-green-600" /> {t.mobile}
                      </label>
                      <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                        placeholder={t.mobilePlaceholder}
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {lang === "mr" 
                          ? "उदा: 9876543210 किंवा KRS726269" 
                          : "e.g: 9876543210 or KRS726269"}
                      </p>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Lock className="w-4 h-4 text-green-600" /> {t.password}
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                        placeholder={t.passwordPlaceholder}
                        required
                      />
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                      <a href="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium hover:underline">
                        {t.forgotPassword}
                      </a>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? t.submitting : t.submit}
                      {!loading && <ArrowRight className="w-5 h-5" />}
                    </button>
                  </form>

                  {/* Register Link */}
                  <div className="mt-6 text-center text-gray-600">
                    {t.noAccount}{" "}
                    <a href="/register" className="text-green-600 hover:text-green-700 font-semibold hover:underline">
                      {t.register}
                    </a>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}