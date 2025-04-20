import { useState, useEffect } from "react";
import axios from "axios";
import { setAuthData } from "../utils/auth";
import Themes from "../components/ThemeComponents/themes"; // Adjust path as needed

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const login = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      setAuthData(res.data.token, res.data.user);
      window.location.href = "/home";
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = () => {
    window.open(`${import.meta.env.VITE_API_URL}/auth/google`, "_self");
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
          <div className={`${currentTheme.primary} p-6 flex justify-center`}>
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
                className="text-blue-600"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>

          {/* Form content */}
          <div className="p-8">
            <h2
              className={`text-center text-2xl font-bold mb-6 ${currentTheme.text}`}
            >
              Welcome Back
            </h2>

            <form onSubmit={login}>
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
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition ${
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
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition ${
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
                    "Sign In"
                  )}
                </button>
              </div>
            </form>

            <div
              className={`mt-6 text-center ${currentTheme.muted} ${
                animate ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500 delay-500`}
            >
              <p className="text-sm">or continue with</p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={googleLogin}
                  className={`flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md ${
                    theme === "dark"
                      ? "bg-slate-800 hover:bg-slate-700 border-slate-700"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#4285F4"
                      d="M15.545 6.558c0-.608-.052-1.195-.15-1.76H7.937v3.32h4.305a3.73 3.73 0 0 1-1.595 2.458v2h2.576c1.507-1.38 2.377-3.414 2.377-5.822z"
                    />
                    <path
                      fill="#34A853"
                      d="M7.937 16c2.147 0 3.95-.724 5.264-1.94l-2.576-2a3.71 3.71 0 0 1-5.543-1.502H2.44v2.066A6.964 6.964 0 0 0 7.937 16z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.082 10.558a3.8 3.8 0 0 1 0-2.446V6.046H2.44a6.959 6.959 0 0 0 0 6.228l2.642-2.066z"
                    />
                    <path
                      fill="#EA4335"
                      d="M7.937 6.063c1.215 0 2.3.415 3.157 1.23l2.26-2.26C11.97 3.807 10.1 3.065 7.938 3.065A6.964 6.964 0 0 0 2.44 6.046l2.642 2.063c.624-1.868 2.387-3.146 4.354-3.146z"
                    />
                  </svg>
                  <span className={`ml-2 ${currentTheme.text}`}>Google</span>
                </button>
              </div>
            </div>

            <div
              className={`mt-6 text-center ${currentTheme.muted} text-sm ${
                animate ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500 delay-600`}
            >
              <a
                href="#"
                className="hover:underline transition-colors duration-300"
                style={{ color: theme === "dark" ? "#4db6ac" : "#14b8a6" }}
              >
                Forgot password?
              </a>
              <p className="mt-2">
                Don't have an account?{" "}
                <a
                  href="/"
                  className="hover:underline transition-colors duration-300"
                  style={{ color: theme === "dark" ? "#4db6ac" : "#14b8a6" }}
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -z-10 top-20 left-20 w-72 h-72 bg-teal-500 rounded-full filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -z-10 top-40 right-20 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -z-10 bottom-20 left-1/2 w-72 h-72 bg-emerald-500 rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
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

export default LoginPage;
