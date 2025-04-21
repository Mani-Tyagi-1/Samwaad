import { useEffect, useState } from "react";
import axios from "axios";
import Themes from "../components/ThemeComponents/themes"; // Update import path as needed

const Profile = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // Get current theme based on dark mode state
  const theme = isDarkMode ? Themes.dark : Themes.light;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/auth/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data.user);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load user profile.");
        setLoading(false);
      }
    };

    fetchUserData();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  if (loading)
    return (
      <div className={`flex items-center justify-center h-screen ${theme.bg}`}>
        <div className={`animate-pulse ${theme.text} text-xl`}>
          Loading profile...
        </div>
      </div>
    );

  if (error)
    return (
      <div className={`p-8 flex justify-center items-center ${theme.bg}`}>
        <div className="p-6 rounded-lg border border-red-300 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-300">
          <p className="font-medium">{error}</p>
          <button
            className={`mt-4 px-4 py-2 rounded ${theme.button}`}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className={`min-h-screen ${theme.bg} py-12`}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Theme toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-full ${theme.button} flex items-center space-x-2`}
          >
            <span>{isDarkMode ? "🌙" : "☀️"}</span>
            <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
          </button>
        </div>

        {/* Profile card */}
        <div className={`${theme.card} rounded-2xl shadow-xl overflow-hidden`}>
          {/* Cover photo area */}
          <div className={`h-48 ${theme.primary} relative`}>
            {userData.coverPhoto && (
              <img
                src={userData.coverPhoto}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Profile info */}
          <div className="px-6 md:px-10 pt-16 pb-10 -mt-12 relative">
            {/* Profile image */}
            <div className="absolute -top-16 left-10">
              <div
                className={`p-1.5 rounded-full ${theme.accent} inline-block`}
              >
                <img
                  src={
                    userData.profilePicture ||
                    "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
                  }
                  alt={userData.username}
                  className="w-24 h-24 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/path/to/default-avatar.png";
                  }}
                />
              </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col md:flex-row md:items-start justify-between">
              <div>
                <h1 className={`text-3xl font-bold ${theme.text}`}>
                  {userData.username}
                </h1>
                <p className={`${theme.muted} mt-1`}>{userData.email}</p>
                {userData.location && (
                  <p className={`${theme.muted} mt-2 flex items-center`}>
                    <span className="mr-2">📍</span> {userData.location}
                  </p>
                )}
              </div>

              <div className="mt-6 md:mt-0">
                <button
                  className={`px-6 py-2 rounded-lg ${theme.button} font-medium`}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-3 gap-4 mt-8 border-y border-gray-200 dark:border-gray-700 py-6">
              <div className="text-center">
                <p className={`text-2xl font-bold ${theme.text}`}>
                  {userData.followers || 0}
                </p>
                <p className={`${theme.muted}`}>Followers</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${theme.text}`}>
                  {userData.following || 0}
                </p>
                <p className={`${theme.muted}`}>Following</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${theme.text}`}>
                  {userData.posts || 0}
                </p>
                <p className={`${theme.muted}`}>Posts</p>
              </div>
            </div>

            {/* Bio section */}
            <div className="mt-8">
              <h3 className={`text-xl font-semibold ${theme.text} mb-3`}>
                About
              </h3>
              <p className={`${theme.muted} whitespace-pre-wrap`}>
                {userData.bio || "No bio added yet."}
              </p>
            </div>

            {/* Additional sections */}
            <div className="mt-8">
              <h3 className={`text-xl font-semibold ${theme.text} mb-3`}>
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {userData.interests ? (
                  userData.interests.map((interest: string, index: number) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
                        theme.secondary
                      } ${isDarkMode ? "text-white" : "text-gray-800"}`}
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <p className={theme.muted}>No interests added yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
