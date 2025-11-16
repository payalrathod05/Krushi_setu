import { useEffect, useState } from "react";
import { Sprout, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Leaf, Sun, Droplets } from "lucide-react";

export default function Footer() {
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
    brand: "कृषी सेतू",
    tagline: "शेतकऱ्यांना योग्य सरकारी योजना शोधण्यात आणि अर्ज करण्यात मदत करणे",
    quickLinks: "द्रुत दुवे",
    home: "मुख्य पृष्ठ",
    about: "आमच्याबद्दल",
    schemes: "योजना",
    contact: "संपर्क",
    legal: "कायदेशीर",
    privacy: "गोपनीयता धोरण",
    terms: "सेवा अटी",
    disclaimer: "अस्वीकरण",
    connect: "आमच्याशी संपर्क साधा",
    phone: "फोन",
    email: "ईमेल",
    address: "पत्ता",
    addressText: "कृषी भवन, पुणे, महाराष्ट्र ४११००१",
    newsletter: "वृत्तपत्र",
    newsletterText: "नवीनतम योजना आणि अपडेट मिळवा",
    subscribe: "सदस्यता घ्या",
    emailPlaceholder: "तुमचा ईमेल",
    rights: "सर्व हक्क राखीव",
    madeWith: "भारतीय शेतकऱ्यांसाठी बनवले"
  } : {
    brand: "Krushi Setu",
    tagline: "Empowering farmers to discover and apply for the right government schemes easily",
    quickLinks: "Quick Links",
    home: "Home",
    about: "About Us",
    schemes: "Schemes",
    contact: "Contact",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    disclaimer: "Disclaimer",
    connect: "Connect With Us",
    phone: "Phone",
    email: "Email",
    address: "Address",
    addressText: "Krushi Bhavan, Pune, Maharashtra 411001",
    newsletter: "Newsletter",
    newsletterText: "Get the latest schemes and updates",
    subscribe: "Subscribe",
    emailPlaceholder: "Your email address",
    rights: "All rights reserved",
    madeWith: "Made with ❤️ for Indian Farmers"
  };

  return (
    <footer className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10">
          <Leaf className="w-32 h-32 rotate-12" />
        </div>
        <div className="absolute bottom-20 right-20">
          <Sun className="w-40 h-40" />
        </div>
        <div className="absolute top-1/2 left-1/3">
          <Droplets className="w-24 h-24" />
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Sprout className="w-8 h-8 text-green-300" />
              <span>{t.brand}</span>
            </div>
            <p className="text-green-100 text-sm leading-relaxed max-w-md">
              {t.tagline}
            </p>
            
            {/* Farming Image */}
            <div className="mt-4 rounded-lg overflow-hidden shadow-lg max-w-sm">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=200&fit=crop"
                alt="Farmers working in field"
                className="w-full h-32 object-cover"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23166534'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23bbf7d0'%3EFarming Community%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-green-300">{t.newsletter}</h4>
              <p className="text-sm text-green-200 mb-3">{t.newsletterText}</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-green-600 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors">
                  {t.subscribe}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg text-green-300 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-400 rounded"></span>
              {t.quickLinks}
            </h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-green-100 hover:text-white hover:translate-x-1 inline-block transition-all">{t.home}</a></li>
              <li><a href="/about" className="text-green-100 hover:text-white hover:translate-x-1 inline-block transition-all">{t.about}</a></li>
              <li><a href="/schemes" className="text-green-100 hover:text-white hover:translate-x-1 inline-block transition-all">{t.schemes}</a></li>
              <li><a href="/contact" className="text-green-100 hover:text-white hover:translate-x-1 inline-block transition-all">{t.contact}</a></li>
            </ul>

            <h3 className="font-semibold mt-6 mb-4 text-lg text-green-300 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-400 rounded"></span>
              {t.legal}
            </h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-green-100 hover:text-white hover:translate-x-1 inline-block transition-all">{t.privacy}</a></li>
              <li><a href="/terms" className="text-green-100 hover:text-white hover:translate-x-1 inline-block transition-all">{t.terms}</a></li>
              <li><a href="/disclaimer" className="text-green-100 hover:text-white hover:translate-x-1 inline-block transition-all">{t.disclaimer}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-lg text-green-300 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-400 rounded"></span>
              {t.connect}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-300">{t.phone}</p>
                  <a href="tel:+911234567890" className="text-green-100 hover:text-white transition-colors">+91 12345 67890</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-300">{t.email}</p>
                  <a href="mailto:support@krushisetu.gov.in" className="text-green-100 hover:text-white break-all transition-colors">support@krushisetu.gov.in</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-300">{t.address}</p>
                  <p className="text-green-100">{t.addressText}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <div className="flex gap-3">
                <a 
                  href="#" 
                  aria-label="Facebook" 
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  aria-label="Twitter" 
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  aria-label="Instagram" 
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t bg-gray-900 py-5 flex mx-auto items-center justify-center border-green-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-green-200">
            <p>© {new Date().getFullYear()} {t.brand}. {t.rights}</p>
            <div className="flex items-center gap-2">
              <span>{t.madeWith}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}