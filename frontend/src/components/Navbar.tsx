import { useState } from "react";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "./ThemeComponents/ThemeProvider"; // adjust path if needed

const themes = {
  light: {
    bg: "bg-gray-50",
    text: "text-slate-800",
    button: "bg-slate-800 text-white",
    card: "bg-white",
  },
  dark: {
    bg: "bg-slate-900",
    text: "text-gray-50",
    button: "bg-teal-500 text-slate-900",
    card: "bg-slate-800",
  },
};

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = themes[theme];

  return (
    <>
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
          {["Home", "About", "Consult", "Experts", "Contact"].map((item) => (
            <li
              key={item}
              className={`hover:text-teal-500 cursor-pointer transition-all duration-300 ${t.text} hover:-translate-y-1`}
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
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

      {menuOpen && (
        <div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center ${t.card} text-center animate-fadeIn md:hidden`}
        >
          <ul className="flex flex-col gap-8 font-medium text-xl">
            {["Home", "About", "Consult", "Experts", "Contact"].map((item) => (
              <li
                key={item}
                className={`hover:text-teal-500 cursor-pointer transition-all duration-300 ${t.text}`}
              >
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setMenuOpen(false)}
            className={`mt-12 p-2 rounded-full ${t.button}`}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
