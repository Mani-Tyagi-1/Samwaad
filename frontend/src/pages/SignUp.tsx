import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios"; // Import AxiosError
import { setAuthData } from "../utils/auth";
import Themes from "../components/ThemeComponents/themes"; // Adjust path as needed

// Define a type for potential API error responses
interface ApiErrorResponse {
  message?: string;
  errors?: { [key: string]: string }; // Example: { email: "Email already exists" }
}

const SignupPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<keyof typeof Themes>("dark"); // Default to dark theme
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const currentTheme = Themes[theme];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    // Clear specific error when user starts typing in a field
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: undefined });
    }
    // Clear general alert when user modifies form
    if (alert) {
      setAlert(null);
    }
  };

  // --- Validation Function ---
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    let isValid = true;

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      // Basic email format check
      newErrors.email = "Email address is invalid";
      isValid = false;
    }
    if (!form.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      // Example: Minimum password length
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  // --- End Validation Function ---

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null); // Clear previous alerts
    setErrors({}); // Clear previous errors

    // --- Perform Validation ---
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }
    // --- End Validation ---

    console.log("Form data:", form);
    try {
      setIsLoading(true);
      const res = await axios.post<{ token: string; user: any }>( // Add type annotation for response data
        "http://localhost:5000/api/auth/signup",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAuthData(res.data.token, res.data.user);
      // Optional: Show success message before redirect
      // setAlert({ message: "Signup successful! Redirecting...", type: "success" });
      // setTimeout(() => {
      //   window.location.href = "/home";
      // }, 1500); // Delay redirect slightly
      window.location.href = "/"; // Immediate redirect
    } catch (error) {
      console.error("Signup failed:", error);
      let errorMessage = "Signup failed. Please try again later.";

      // --- Handle Specific API Errors ---
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ApiErrorResponse>;
        if (serverError.response && serverError.response.data) {
          // Prefer a specific message from the backend if available
          if (serverError.response.data.message) {
            errorMessage = serverError.response.data.message;
          }
          // Check for field-specific errors (like "Email already exists")
          else if (serverError.response.data.errors) {
            const fieldErrors = serverError.response.data.errors;
            // Combine field errors into one message or set individual field errors
            errorMessage = Object.values(fieldErrors).join(" "); // Simple join
            // OR update the errors state:
            // setErrors(prev => ({ ...prev, ...fieldErrors }));
            // errorMessage = "Please check the errors below."; // Update general message
          }
          // Handle common status codes if no specific message
          else if (serverError.response.status === 409) {
            // Conflict
            errorMessage = "Username or Email already exists.";
          } else if (serverError.response.status === 400) {
            // Bad Request
            errorMessage = "Invalid data submitted. Please check your inputs.";
          }
        }
      }
      setAlert({ message: errorMessage, type: "error" });
      // --- End Error Handling ---
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
        {/* SVG icons remain the same */}
        {theme === "dark" ? (
          <svg
            /* Sun icon */ className="text-yellow-300"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
            /* Moon icon */ className="text-slate-800"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
          <div className={`${currentTheme.secondary} p-6 flex justify-center`}>
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-lg">
              <svg
                /* User Plus Icon */ className="text-emerald-600"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
          </div>

          <div className="p-8">
            <h2
              className={`text-center text-2xl font-bold mb-6 ${currentTheme.text}`}
            >
              Create Account
            </h2>

            {/* --- Alert Display Area --- */}
            {alert && (
              <div
                className={`p-4 mb-4 text-sm rounded-lg ${
                  alert.type === "error"
                    ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                }`}
                role="alert"
              >
                <span className="font-medium">
                  {alert.type === "error" ? "Error!" : "Success!"}
                </span>{" "}
                {alert.message}
                {/* Optional: Add a close button */}
                {/* <button onClick={() => setAlert(null)} className="float-right font-bold">X</button> */}
              </div>
            )}
            {/* --- End Alert Display Area --- */}

            <form onSubmit={signup} noValidate>
              {" "}
              {/* Add noValidate to prevent default browser validation interfering */}
              <div className="mb-4">
                <label
                  htmlFor="username" // Add htmlFor for accessibility
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
                    /* Icon */ className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${currentTheme.muted}`}
                  >
                    <svg
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
                    id="username" // Add id matching htmlFor
                    type="text"
                    name="username"
                    placeholder="johndoe"
                    value={form.username}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.username} // Accessibility
                    aria-describedby="username-error" // Accessibility
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      errors.username
                        ? "border-red-500"
                        : "border-gray-300 dark:border-slate-600"
                    } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition ${
                      theme === "dark"
                        ? "bg-slate-700 text-white"
                        : "bg-white text-black"
                    }`}
                  />
                </div>
                {/* --- Error Message Display --- */}
                {errors.username && (
                  <p id="username-error" className="mt-1 text-xs text-red-500">
                    {errors.username}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
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
                    /* Icon */ className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${currentTheme.muted}`}
                  >
                    <svg
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
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300 dark:border-slate-600"
                    } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition ${
                      theme === "dark"
                        ? "bg-slate-700 text-white"
                        : "bg-white text-black"
                    }`}
                  />
                </div>
                {/* --- Error Message Display --- */}
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
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
                    /* Icon */ className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${currentTheme.muted}`}
                  >
                    <svg
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
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.password}
                    aria-describedby="password-error"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-300 dark:border-slate-600"
                    } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition ${
                      theme === "dark"
                        ? "bg-slate-700 text-white"
                        : "bg-white text-black"
                    }`}
                  />
                </div>
                {/* --- Error Message Display --- */}
                {errors.password && (
                  <p id="password-error" className="mt-1 text-xs text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>
              <div
                className={`${
                  animate ? "opacity-100" : "opacity-0"
                } transition-opacity duration-500 delay-400`}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-lg text-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center ${currentTheme.button} disabled:opacity-50 disabled:cursor-not-allowed`} // Added disabled styles
                >
                  {isLoading ? (
                    <svg
                      /* Spinner */ className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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

            {/* --- Footer links remain the same --- */}
            <div
              className={`mt-6 text-center ${currentTheme.muted} text-sm ${
                animate ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500 delay-600`}
            >
              <p className="mt-2">
                {" "}
                Already have an account?{" "}
                <a
                  href="/login"
                  className="hover:underline transition-colors duration-300"
                  style={{ color: theme === "dark" ? "#4db6ac" : "#14b8a6" }}
                >
                  {" "}
                  Sign in{" "}
                </a>{" "}
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
                {" "}
                By creating an account, you agree to our{" "}
                <a
                  href="/terms"
                  className="hover:underline"
                  style={{ color: theme === "dark" ? "#4db6ac" : "#14b8a6" }}
                >
                  {" "}
                  Terms of Service{" "}
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="hover:underline"
                  style={{ color: theme === "dark" ? "#4db6ac" : "#14b8a6" }}
                >
                  {" "}
                  Privacy Policy{" "}
                </a>{" "}
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements remain the same */}
        <div className="absolute -z-10 top-20 right-20 w-72 h-72 bg-emerald-500 rounded-full filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -z-10 bottom-40 left-20 w-72 h-72 bg-teal-500 rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -z-10 bottom-20 right-1/3 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Styles remain the same */}
      <style>{`
        @keyframes blob { /* ... keyframes ... */ }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default SignupPage;
