import { useState, useEffect } from "react";
import { useTheme } from "./ThemeComponents/ThemeProvider"; // adjust path if needed
import { Link, useLocation, useNavigate } from "react-router-dom"; // useLocation to access URL params, useNavigate to clean URL
import { Menu, Moon, Sun } from "lucide-react";

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

  // Define the User interface more explicitly
  interface User {
    _id: string; // Typically MongoDB IDs are strings
    profilePicture?: string; // Make optional as it might not always be present initially
    username: string;
    email: string; // Include other fields you might need
    // Add other properties returned by your /api/user endpoint
  }

  const [user, setUser] = useState<User | null>(null); // state to store user profile data
  const t = themes[theme];

  const location = useLocation(); // useLocation to access current location
  const navigate = useNavigate(); // To remove token from URL after processing

  // Fetch user data using token
  const fetchUserData = async (token: string) => {
    console.log("Fetching user data with token...");
    try {
      const response = await fetch(`/api/auth/user`, {
        // Make sure this matches your backend route
        headers: {
          Authorization: `Bearer ${token}`, // Correctly format the Bearer token
        },
      });

      console.log("Response status:", response); // Log response status

      if (!response.ok) {
        // Handle specific errors like 401 Unauthorized
        if (response.status === 401) {
          console.error("Unauthorized: Invalid or expired token.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null); // Clear user state
        } else {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }
        return; // Stop execution if fetch failed
      }

      const data = await response.json();

      if (data.user) {
        // Store the fetched user data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        // Set the user data in state
        setUser(data.user);
        console.log("User data fetched and set:", data.user);
      } else {
        console.error("User data not found in response:", data);
        // Clear potentially stale data if fetch succeeded but didn't return user
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Clear storage on error as well
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  // Effect runs on component mount and when location changes (for URL token)
  useEffect(() => {
    console.log("Navbar effect running. Location:", location.search);
    const urlParams = new URLSearchParams(location.search);
    const tokenFromUrl = urlParams.get("token");
    const storedToken = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("user");

    let currentToken: string | null = null;

    if (tokenFromUrl) {
      console.log("Token found in URL:", tokenFromUrl);
      // Store token from URL and prioritize it
      localStorage.setItem("token", tokenFromUrl);
      currentToken = tokenFromUrl;

      // Fetch user data immediately using the new token
      fetchUserData(tokenFromUrl);

      // Clean the token from the URL without reloading the page
      navigate(location.pathname, { replace: true }); // Removes query params
    } else if (storedToken) {
      console.log("Token found in localStorage:", storedToken);
      currentToken = storedToken;
      // If we have a token but no user data in state/localStorage, fetch it
      if (!user && !storedUserData) {
        fetchUserData(currentToken);
      }
    }

    // If user data exists in localStorage and not yet in state, load it
    if (storedUserData && !user) {
      try {
        const parsedUser = JSON.parse(storedUserData);
        console.log(
          "User data found in localStorage, setting state:",
          parsedUser
        );
        setUser(parsedUser);
        // Optional: Verify token validity even if user data is stored
        // if (currentToken) fetchUserData(currentToken); // Can cause extra fetch, use cautiously
      } catch (e) {
        console.error("Failed to parse user data from localStorage:", e);
        localStorage.removeItem("user"); // Clear corrupted data
      }
    }

    // If no token found anywhere, ensure user state is null
    if (!tokenFromUrl && !storedToken) {
      console.log("No token found. Ensuring user is logged out.");
      // Make sure local storage is clear if no token exists
      if (localStorage.getItem("user")) localStorage.removeItem("user");
      if (user) setUser(null); // Clear state if user was somehow set previously
    }

    // Depend on location.search to re-run when URL query params change
    // Depend on `navigate` for cleaning the URL (stable function)
    // `user` dependency ensures we don't re-fetch if user is already set from localStorage
  }, [location.search, navigate, user]); // Refined dependencies

  // Placeholder image if profile picture is missing
  const defaultProfilePic =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0_XPfyUZJugz5lXkm0DUtAkpjRw367tcFig&s"; // Example placeholder

  return (
    <nav
      className={`w-full flex items-center justify-between px-6 md:px-12 py-6 sticky top-0 z-50 backdrop-blur-sm bg-opacity-70 ${t.bg}`}
    >
      {/* Left Side - Logo */}
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className={`text-2xl font-bold ${t.text} flex items-center`}
        >
          <span className="relative">
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full animate-ping opacity-75"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full"></span>
            Samvaad
          </span>
        </Link>
      </div>

      {/* Center - Navigation Links */}
      <ul className="hidden md:flex gap-8 font-medium items-center">
        {" "}
        {/* Added items-center */}
        {[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Consult", path: "/consult" },
          { name: "Experts", path: "/experts" },
          { name: "Contact", path: "/contact" },
        ].map((item) => (
          <li
            key={item.name}
            className={`hover:text-teal-500 cursor-pointer transition-all duration-300 ${t.text} hover:-translate-y-1`}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>

      {/* Right Side - Theme Toggle, Profile/Login, Menu */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
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

        {/* Profile Section + logout or Login Button */}
        <div className="hidden md:flex items-center">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-teal-500 cursor-pointer transition-all duration-300"
              >
                <img
                  src={user.profilePicture || defaultProfilePic}
                  alt={`${user.username}'s profile`}
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultProfilePic;
                  }}
                />
                <span className={`${t.text} font-medium`}>{user.username}</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.href = "/"; // Or use navigate("/") if using react-router
                }}
                className="px-3 py-1 rounded-md text-sm font-medium text-red-500 border border-red-400 hover:bg-red-50 dark:hover:bg-red-900 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${t.button} hover:opacity-90`}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg"
          aria-label="Open Menu"
        >
          <Menu className={t.text} />
        </button>
      </div>

      {/* Mobile Menu (Dropdown) - Basic example, style as needed */}
      {menuOpen && (
        <div
          className={`absolute top-full right-0 mt-2 mr-4 md:hidden w-48 rounded-md shadow-lg py-1 ${t.card} ${t.text} ring-1 ring-black ring-opacity-5 z-50`}
        >
          {/* Mobile Menu Links */}
          <Link
            to="/"
            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          {/* ... Add other links ... */}

          {/* Mobile Profile/Login */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
          {user ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700"
              onClick={() => setMenuOpen(false)}
            >
              <img
                src={user.profilePicture || defaultProfilePic}
                alt="Profile"
                className="w-6 h-6 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultProfilePic;
                }}
              />
              <span>{user.username}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
