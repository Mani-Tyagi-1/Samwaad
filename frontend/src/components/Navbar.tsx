import { useState } from "react";
import { Moon, Sun } from "lucide-react";

const themes = {
  light: {
    bg: "bg-[#E8E388]",
    text: "text-[#2E5166]",
    card: "bg-[#A9DAB1]",
    accent: "bg-[#92AECF]",
    button: "bg-[#2E5166] text-[#E8E388]",
  },
  dark: {
    bg: "bg-[#2E5166]",
    text: "text-[#E8E388]",
    card: "bg-[#92AECF]",
    accent: "bg-[#A9DAB1]",
    button: "bg-[#E8E388] text-[#2E5166]",
  },
};

export default function HeroSection() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const t = themes[theme];

  return (
    <div
      className={`${t.bg} min-h-screen transition-colors duration-500 relative overflow-hidden`}
    >
      {/* Navbar */}
      <nav
        className={`w-full flex items-center justify-between px-8 py-4 shadow-md ${t.card}`}
      >
        <div className={`text-2xl font-bold ${t.text}`}>Samvaad</div>
        <ul className="hidden md:flex gap-8 font-medium">
          <li className={`hover:underline cursor-pointer ${t.text}`}>Home</li>
          <li className={`hover:underline cursor-pointer ${t.text}`}>About</li>
          <li className={`hover:underline cursor-pointer ${t.text}`}>
            Consult
          </li>
          <li className={`hover:underline cursor-pointer ${t.text}`}>
            Experts
          </li>
          <li className={`hover:underline cursor-pointer ${t.text}`}>
            Contact
          </li>
        </ul>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-full shadow-md bg-white/70 hover:scale-110 transition"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? (
            <Moon className="text-black" />
          ) : (
            <Sun className="text-yellow-300" />
          )}
        </button>
      </nav>

      {/* Floating Shapes */}
      <div className="absolute w-80 h-80 bg-[#A9DAB1] rounded-full opacity-20 blur-3xl top-[-50px] left-[-80px] animate-pulse" />
      <div className="absolute w-96 h-96 bg-[#92AECF] rounded-full opacity-20 blur-2xl bottom-[-100px] right-[-100px] animate-spin-slow" />

      {/* Hero Card */}
      <div
        className={`rounded-3xl shadow-2xl p-10 max-w-5xl mx-auto mt-20 flex flex-col md:flex-row items-center justify-between gap-10 ${t.card} transition-all duration-500`}
      >
        {/* Text Content */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className={`text-5xl font-extrabold tracking-tight ${t.text}`}>
            Talk. Heal. Grow.
          </h1>
          <p className={`text-xl font-medium ${t.text}`}>
            Welcome to <span className="italic font-semibold">Samvaad</span> — a
            safe space for your mental well-being. Speak with experts, or just
            vent your thoughts. You're not alone.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button
              className={`px-6 py-3 rounded-full shadow-md hover:scale-105 transition transform ${t.button}`}
            >
              Start Talking
            </button>
            <button
              className={`px-6 py-3 rounded-full shadow-inner border-2 ${t.text} hover:bg-opacity-20 transition`}
            >
              Explore Experts
            </button>
          </div>
        </div>

        {/* Illustration */}
        <div>
          <img
            src="https://illustrations.popsy.co/gray/therapy-session.svg"
            alt="Therapy Illustration"
            className="w-full max-w-sm drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
