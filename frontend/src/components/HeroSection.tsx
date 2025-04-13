import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  ChevronDown,
  Menu,
  MessageCircle,
  Users,
} from "lucide-react";

import Hero1 from "../assets/Hero1.png";
const themes = {
  light: {
    bg: "bg-gray-50",
    text: "text-slate-800",
    primary: "bg-blue-500",
    secondary: "bg-emerald-500",
    card: "bg-white",
    accent: "bg-teal-500",
    button: "bg-slate-800 text-white",
    muted: "text-slate-500",
  },
  dark: {
    bg: "bg-slate-900",
    text: "text-gray-50",
    primary: "bg-blue-600",
    secondary: "bg-emerald-600",
    card: "bg-slate-800",
    accent: "bg-teal-600",
    button: "bg-teal-500 text-slate-900",
    muted: "text-slate-400",
  },
};

export default function HeroSection() {
  const [theme, setTheme] = useState<keyof typeof themes>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = themes[theme];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`${t.bg} min-h-screen transition-all duration-500 relative overflow-hidden`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full opacity-30 bg-teal-400 blur-3xl -top-20 -left-20 animate-pulse" />
        <div className="absolute w-96 h-96 rounded-full opacity-20 bg-blue-400 blur-3xl -bottom-32 -right-20 animate-pulse" />
        <div
          className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full opacity-10 bg-slate-500 blur-2xl animate-bounce"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-10 bg-emerald-400 blur-2xl bottom-1/3 right-1/4 animate-bounce"
          style={{ animationDuration: "12s" }}
        />

        <svg
          className="absolute top-0 left-0 w-full opacity-10"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,80 400,100 600,80 C800,60 1000,100 1200,80 C1400,60 1600,100 1920,80 L1920,0 Z"
            fill="#92AECF"
          ></path>
        </svg>
      </div>

      {/* Navbar */}
      <nav
        className={`w-full flex items-center justify-between px-6 md:px-12 py-6 sticky top-0 z-50 backdrop-blur-sm bg-opacity-70 ${t.bg}`}
      >
        <div className="flex items-center gap-2">
          <div className={`text-2xl font-bold ${t.text} flex items-center`}>
            <span className="relative">
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full animate-ping opacity-75"></span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full"></span>
              Samvaad
            </span>
          </div>
        </div>

        <ul className="hidden md:flex gap-8 font-medium">
          <li
            className={`hover:text-teal-500 cursor-pointer transition-all duration-300 ${t.text} hover:-translate-y-1`}
          >
            Home
          </li>
          <li
            className={`hover:text-teal-500 cursor-pointer transition-all duration-300 ${t.text} hover:-translate-y-1`}
          >
            About
          </li>
          <li
            className={`hover:text-teal-500 cursor-pointer transition-all duration-300 ${t.text} hover:-translate-y-1`}
          >
            Consult
          </li>
          <li
            className={`hover:text-teal-500 cursor-pointer transition-all duration-300 ${t.text} hover:-translate-y-1`}
          >
            Experts
          </li>
          <li
            className={`hover:text-teal-500 cursor-pointer transition-all duration-300 ${t.text} hover:-translate-y-1`}
          >
            Contact
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ${
              theme === "light"
                ? "bg-slate-800 text-white"
                : "bg-white text-slate-800"
            } hover:scale-110`}
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg"
          >
            <Menu className={t.text} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center ${t.card} text-center animate-fadeIn md:hidden`}
        >
          <ul className="flex flex-col gap-8 font-medium text-xl">
            <li
              className={`hover:text-teal-500 cursor-pointer transition-all duration-300 ${t.text}`}
            >
              Home
            </li>
            <li
              className={`hover:text-teal-500 cursor-pointer transition-all duration-300 ${t.text}`}
            >
              About
            </li>
            <li
              className={`hover:text-teal-500 cursor-pointer transition-all duration-300 ${t.text}`}
            >
              Consult
            </li>
            <li
              className={`hover:text-teal-500 cursor-pointer transition-all duration-300 ${t.text}`}
            >
              Experts
            </li>
            <li
              className={`hover:text-teal-500 cursor-pointer transition-all duration-300 ${t.text}`}
            >
              Contact
            </li>
          </ul>
          <button
            onClick={() => setMenuOpen(false)}
            className={`mt-12 p-2 rounded-full ${t.button}`}
          >
            Close
          </button>
        </div>
      )}

      {/* Hero Section */}
      <div className="container mx-auto px-6 md:px-12 py-12 md:py-24 relative">
        <div
          className={`rounded-3xl shadow-xl overflow-hidden ${t.card} transition-all duration-500 transform hover:shadow-2xl`}
        >
          <div className="flex flex-col md:flex-row items-center">
            {/* Left content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 space-y-8">
              <div className="space-y-6 relative">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-20 bg-teal-500 rounded-full"></div>
                  <span
                    className={`text-sm uppercase tracking-wider font-semibold ${t.muted}`}
                  >
                    Mental Wellness
                  </span>
                </div>

                <h1
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${t.text} leading-tight`}
                >
                  <span className="relative">
                    Talk.
                    <span className="absolute -bottom-2 left-0 w-full h-2 bg-teal-400 opacity-50 rounded-full transform translate-y-1"></span>
                  </span>{" "}
                  <span className="relative">
                    Heal.
                    <span className="absolute -bottom-2 left-0 w-full h-2 bg-blue-400 opacity-50 rounded-full transform translate-y-1"></span>
                  </span>{" "}
                  <span className="relative">
                    Grow.
                    <span className="absolute -bottom-2 left-0 w-full h-2 bg-emerald-400 opacity-50 rounded-full transform translate-y-1"></span>
                  </span>
                </h1>

                <p className={`text-lg md:text-xl ${t.muted} max-w-xl`}>
                  Welcome to{" "}
                  <span className="text-teal-500 font-semibold">Samvaad</span> —
                  your safe space for mental well-being in today's fast-paced
                  digital world. Connect with experts who understand what you're
                  going through.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100 text-sm">
                    <MessageCircle size={18} />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-sm">
                    <Users size={18} />
                    <span>Expert Counselors</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    className={`px-8 py-4 rounded-full shadow-lg font-semibold hover:shadow-xl transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 bg-teal-500 text-white`}
                  >
                    Start Talking
                  </button>
                  <button
                    className={`px-8 py-4 rounded-full font-semibold transition duration-300 transform hover:-translate-y-1 bg-opacity-10 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 ${t.text} bg-slate-500`}
                  >
                    Meet Our Experts
                  </button>
                </div>
              </div>
            </div>

            {/* Seperator */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="h-full w-px relative">
                <div className="absolute top-1/6 right-8 -translate-x-1/2 h-6 w-6 rounded-full bg-[#A9DAB1] opacity-80 animate-pulse"></div>
                <div
                  className="absolute top-2/6 left-8 -translate-x-1/2 h-4 w-4 rounded-full bg-[#A9DAB1] opacity-70 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute top-3/6 right-8 -translate-x-1/2 h-8 w-8 rounded-full bg-[#A9DAB1] opacity-80 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-4/6 left-8 -translate-x-1/2 h-4 w-4 rounded-full bg-[#A9DAB1] opacity-70 animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                ></div>
                <div
                  className="absolute top-5/6 right-8 -translate-x-1/2 h-6 w-6 rounded-full bg-[#A9DAB1] opacity-80 animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>

               
              </div>
            </div>

            {/* Right side image */}
            <div className="w-full md:w-1/2 p-8 md:p-12 relative">
              <div className="relative transform transition-all duration-500 hover:scale-105">
                <img
                  src={Hero1}
                  alt="Therapy Session"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 transform rotate-3 hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-xl">
                      S
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-white">
                        4.9/5 Rating
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        From 2000+ sessions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className={`${t.text}`} />
        </div>
      </div>
    </div>
  );
}
