import { useEffect, useState, useRef } from "react";
import { Sprout, User, LogOut, FileText, ChevronDown, Menu, X, Sparkles, Shield, Bell } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../App";

export default function Navbar() {
  const [lang, setLang] = useState("en");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [notificationCount, setNotificationCount] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  // Load saved language and handle scroll
  useEffect(() => {
    setLang(localStorage.getItem("km-lang") || "en");

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const onChange = (e) => { if (e.detail?.lang) setLang(e.detail.lang); };
    window.addEventListener("km-lang-change", onChange);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("km-lang-change", onChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch notification count (backend + application)
  const fetchNotificationCount = async () => {
    if (!isLoggedIn || !user) return;

    try {
      let farmerId = user?.farmer_id;
      if (!farmerId) {
        const krushiSetu = JSON.parse(localStorage.getItem("krushiSetu"));
        farmerId = krushiSetu?.farmer?.farmer_id;
      }
      if (!farmerId) return;

      const [notifRes, appRes] = await Promise.all([
        fetch(`http://localhost:3001/api/farmers/notifications?farmer_id=${farmerId}`),
        fetch(`http://localhost:3001/api/farmers/applications?farmer_id=${farmerId}`)
      ]);

      if (!notifRes.ok || !appRes.ok) return;

      const notifData = await notifRes.json();
      const appData = await appRes.json();

      const readIds = JSON.parse(localStorage.getItem("readNotifications") || "[]");

      const backendUnread = notifData.notifications?.filter(n => !readIds.includes(n.id)) || [];
      const appUnread = appData.applications?.filter(app => 
        (app.status === "approved" || app.status === "rejected") &&
        !readIds.includes(`app-${app.application_id}`)
      ) || [];

      setNotificationCount(backendUnread.length + appUnread.length);

    } catch (err) {
      console.error("Error fetching notification count:", err);
    }
  };

  useEffect(() => {
    fetchNotificationCount();

    const interval = setInterval(fetchNotificationCount, 30000); // Poll every 30s
    window.addEventListener("notifications-updated", fetchNotificationCount);

    return () => {
      clearInterval(interval);
      window.removeEventListener("notifications-updated", fetchNotificationCount);
    };
  }, [isLoggedIn, user]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    localStorage.setItem("km-lang", newLang);
    document.documentElement.lang = newLang;
    window.dispatchEvent(new CustomEvent("km-lang-change", { detail: { lang: newLang } }));
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  const t = lang === "mr" ? {
    brand: "कृषी सेतू",
    login: "लॉगिन",
    home: "मुख्य पृष्ठ",
    schemes: "योजना",
    about: "आमच्याबद्दल",
    contact: "संपर्क",
    profile: "प्रोफाइल",
    mySchemes: "माझ्या योजना",
    logout: "लॉगआउट",
    welcome: "स्वागत"
  } : {
    brand: "Krushi Setu",
    login: "Login",
    home: "Home",
    schemes: "Schemes",
    about: "About",
    contact: "Contact",
    profile: "Profile",
    mySchemes: "My Schemes",
    logout: "Logout",
    welcome: "Welcome"
  };

  const navLinks = [
    { href: "/", label: t.home },
    { href: "/allschemes", label: t.schemes },
    { href: "/about", label: t.about },
    { href: "/contact", label: t.contact }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-gradient-to-r from-green-600/95 via-emerald-600/95 to-teal-600/95 backdrop-blur-xl shadow-2xl" : "bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 shadow-lg"}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>

        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand */}
            <a href="/" className="relative group flex items-center gap-3 z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-white rounded-full p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Sprout className="w-6 h-6 text-green-600 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <span className="text-2xl lg:text-3xl font-bold text-white drop-shadow-lg tracking-tight group-hover:tracking-wide transition-all duration-300">{t.brand}</span>
              <Sparkles className="w-5 h-5 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-2">
                {navLinks.map(link => (
                  <a key={link.href} href={link.href} onClick={() => setActiveLink(link.href)} className={`relative px-4 py-2 text-white font-medium transition-all duration-300 group ${activeLink === link.href ? "text-yellow-300" : "hover:text-yellow-200"}`}>
                    <span className="relative z-10">{link.label}</span>
                  </a>
                ))}
              </div>

              <div className="relative">
                <select value={lang} onChange={handleLanguageChange} className="px-4 py-2 text-sm rounded-xl border-2 border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all cursor-pointer appearance-none pr-10 font-medium shadow-lg">
                  <option value="en" className="bg-green-700 text-white">EN</option>
                  <option value="mr" className="bg-green-700 text-white">मराठी</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
              </div>

              {/* Profile + Notifications */}
              {isLoggedIn && user ? (
                <div className="relative gap-2 flex" ref={dropdownRef}>
                  <Link to="/notifications" className="relative flex mx-auto justify-center items-center px-3 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300 group">
                    <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                        {notificationCount > 9 ? '9+' : notificationCount}
                      </span>
                    )}
                  </Link>

                  <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-3 px-6 py-2.5 rounded-xl font-medium bg-white text-green-700 hover:bg-yellow-300 hover:text-green-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span className="hidden xl:inline font-semibold">
                      {user.name?.split(' ')[0] || user.farmer_name?.split(' ')[0] || t.profile}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slideDown">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 px-5 py-4 border-b border-green-100">
                        <p className="text-xs text-green-600 font-semibold uppercase tracking-wide">{t.welcome}</p>
                        <p className="font-bold text-gray-800 text-lg mt-1 truncate">{user.name || user.farmer_name || user.email}</p>
                        {user.farmer_id && <p className="text-xs text-gray-500 mt-1 font-mono bg-white/50 rounded px-2 py-1 inline-block">ID: {user.farmer_id}</p>}
                      </div>

                      <div className="py-2">
                        <Link to="/profile" onClick={() => setShowDropdown(false)} className="w-full px-5 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all flex items-center gap-3 group">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"><User className="w-5 h-5 text-green-600" /></div>
                          <div>
                            <p className="font-semibold text-gray-800">{t.profile}</p>
                            <p className="text-xs text-gray-500">View your profile</p>
                          </div>
                        </Link>
                        <button onClick={() => { navigate("/eligible-scheme"); setShowDropdown(false); }} className="w-full px-5 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all flex items-center gap-3 group">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"><FileText className="w-5 h-5 text-green-600" /></div>
                          <div>
                            <p className="font-semibold text-gray-800">{t.mySchemes}</p>
                            <p className="text-xs text-gray-500">View your applications</p>
                          </div>
                        </button>
                        <Link to="/admin/login" onClick={() => setShowDropdown(false)} className="w-full px-5 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all flex items-center gap-3 group">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"><Shield className="w-5 h-5 text-blue-600" /></div>
                          <div>
                            <p className="font-semibold text-gray-800">Admin Portal</p>
                            <p className="text-xs text-gray-500">Manage applications and users</p>
                          </div>
                        </Link>
                        <button onClick={handleLogout} className="w-full px-5 py-3 text-left text-red-600 hover:bg-red-50 transition-all flex items-center gap-3 border-t border-gray-100 mt-1 group">
                          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"><LogOut className="w-5 h-5 text-red-600" /></div>
                          <div>
                            <p className="font-semibold">{t.logout}</p>
                            <p className="text-xs text-red-400">Sign out of your account</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a href="/login" className="px-6 py-2.5 rounded-xl font-semibold bg-white text-green-700 hover:bg-yellow-300 hover:text-green-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">{t.login}</a>
              )}
            </div>

            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all">
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-shimmer { animation: shimmer 3s infinite; }
      `}</style>
    </>
  );
}
