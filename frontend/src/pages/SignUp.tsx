import { useState, useEffect } from "react";
import axios from "axios";
import { setAuthData } from "../utils/auth";
import Themes from "../components/ThemeComponents/themes"; // Adjust path as needed

const SignupPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<keyof typeof Themes>("dark"); // Default to dark theme
  const [animate, setAnimate] = useState(false);

  // Apply animation after component mounts
  useEffect(() => {
    setAnimate(true);
  }, []);

  const currentTheme = Themes[theme];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const signup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        form
      );
      setAuthData(res.data.token, res.data.user);
      window.location.href = "/home";
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 ${currentTheme.bg}`}
    >
      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-300 ${currentTheme.card} hover:shadow-lg`}
      >
        {theme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-yellow-300"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-800"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </button>

      <div
        className={`w-full max-w-md ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } transition-all duration-700 ease-out`}
      >
        <div
          className={`${currentTheme.card} shadow-xl rounded-2xl overflow-hidden transition-all duration-500`}
        >
          {/* Header with logo/image */}
          <div className={`${currentTheme.secondary} p-6 flex justify-center`}>
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-600"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
          </div>

          {/* Form content */}
          <div className="p-8">
            <h2
              className={`text-center text-2xl font-bold mb-6 ${currentTheme.text}`}
            >
              Create Account
            </h2>

            <form onSubmit={signup}>
              <div className="mb-4">
                <label
                  className={`block mb-2 text-sm font-medium ${currentTheme.muted}`}
                >
                  Username
                </label>
                <div
                  className={`relative ${
                    animate ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-500 delay-100`}
                >
                  <div
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${currentTheme.muted}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="johndoe"
                    value={form.username}
                    onChange={handleChange}
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition ${
                      theme === "dark"
                        ? "bg-slate-700 text-white border-slate-600"
                        : ""
                    }`}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className={`block mb-2 text-sm font-medium ${currentTheme.muted}`}
                >
                  Email Address
                </label>
                <div
                  className={`relative ${
                    animate ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-500 delay-200`}
                >
                  <div
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${currentTheme.muted}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition ${
                      theme === "dark"
                        ? "bg-slate-700 text-white border-slate-600"
                        : ""
                    }`}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  className={`block mb-2 text-sm font-medium ${currentTheme.muted}`}
                >
                  Password
                </label>
                <div
                  className={`relative ${
                    animate ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-500 delay-300`}
                >
                  <div
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${currentTheme.muted}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition ${
                      theme === "dark"
                        ? "bg-slate-700 text-white border-slate-600"
                        : ""
                    }`}
                  />
                </div>
              </div>

              <div
                className={`${
                  animate ? "opacity-100" : "opacity-0"
                } transition-opacity duration-500 delay-400`}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-lg text-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center ${currentTheme.button}`}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>

            <div
              className={`mt-6 text-center ${currentTheme.muted} text-sm ${
                animate ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500 delay-600`}
            >
              <p className="mt-2">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="hover:underline transition-colors duration-300"
                  style={{ color: theme === "dark" ? "#4db6ac" : "#14b8a6" }}
                >
                  Sign in
                </a>
              </p>
            </div>

            <div
              className={`mt-4 pt-4 border-t ${
                theme === "dark" ? "border-slate-700" : "border-gray-200"
              } ${
                animate ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500 delay-700`}
            >
              <p className={`text-xs text-center ${currentTheme.muted}`}>
                By creating an account, you agree to our{" "}
                <a
                  href="/terms"
                  className="hover:underline"
                  style={{ color: theme === "dark" ? "#4db6ac" : "#14b8a6" }}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="hover:underline"
                  style={{ color: theme === "dark" ? "#4db6ac" : "#14b8a6" }}
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -z-10 top-20 right-20 w-72 h-72 bg-emerald-500 rounded-full filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -z-10 bottom-40 left-20 w-72 h-72 bg-teal-500 rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -z-10 bottom-20 right-1/3 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: scale(1);
          }
          33% {
            transform: scale(1.1) translate(10px, -10px);
          }
          66% {
            transform: scale(0.9) translate(-10px, 10px);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default SignupPage;
