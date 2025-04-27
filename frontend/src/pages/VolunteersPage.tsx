import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  Info,
  Heart,
  Send,
  Users,
  CheckCircle,
  Star, // Keep Star if you decide to add experience later
  ArrowRight,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import Themes from "../components/ThemeComponents/themes";
import { useTheme } from "../components/ThemeComponents/ThemeProvider";

// --- Interface based on VolunteerApplication model (status='Accepted') ---
// Note: Mapping some fields and providing defaults for missing ones.
interface VolunteerProfile {
  _id: string; // From MongoDB _id
  fullName: string; // Direct from model
  email: string; // Direct from model
  phone: string; // Direct from model
  interest: string; // Use as proxy for 'role' display
  // --- Fields NOT in the Application Model - need defaults or adding to schema ---
  // Add these fields to VolunteerApplication schema if needed later
  // experience?: string;
  bio?: string; // Maybe add to schema? Provide default for now.
  imagePath?: string; // Assume a field for image path similar to resumePath
  // --- Fields from Application Model less likely to be shown directly on card ---
  // age?: number;
  // city?: string;
  // state?: string;
  // availability?: string;
}

// Helper function (remains the same)
const generateRoomId = (userId1: string, userId2: string): string => {
  const ids = [userId1, userId2].sort();
  return ids.join("_");
};

const VolunteersPage = () => {
  // Use the new interface name
  const [volunteers, setVolunteers] = useState<VolunteerProfile[]>([]);
  const [selected, setSelected] = useState<VolunteerProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme: currentTheme } = useTheme();
  const navigate = useNavigate();

  // --- Placeholder for logged-in user ID ---
  // TODO: Replace with actual logged-in user ID from auth context/state
  const currentUserId = "user_abc_123";

  const isDarkMode = currentTheme === "dark";
  const theme = isDarkMode ? Themes.dark : Themes.light;
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // --- Fetch *Accepted* Volunteers from API ---
  useEffect(() => {
    const fetchVolunteers = async () => {
      setIsLoading(true);
      setError(null);
      // --- POINT THIS TO YOUR ENDPOINT RETURNING ACCEPTED VOLUNTEERS ---
      const endpoint = `${API_BASE_URL}/volunteers`; // IMPORTANT: Ensure this returns *accepted* volunteers

      try {
        console.log(`Fetching volunteers from: ${endpoint}`); // Log endpoint
        const response = await fetch(endpoint);
        console.log(`Response status: ${response.status}`); // Log status

        if (!response.ok) {
          let errorMsg = `Failed to fetch volunteers. Status: ${response.status}`;
          let errorDetails = null;
          try {
            errorDetails = await response.json(); // Try to get detailed error
            console.error("Error response body:", errorDetails);
            errorMsg = errorDetails?.message || errorMsg;
          } catch (_) {
            console.warn("Could not parse error response body as JSON.");
          }
          throw new Error(errorMsg);
        }

        const data: VolunteerProfile[] = await response.json();
        console.log("Fetched data:", data); // Log received data

        if (!Array.isArray(data)) {
          console.error("Received non-array data:", data);
          throw new Error("Received invalid data format from server.");
        }

        setVolunteers(data);
      } catch (err: any) {
        console.error("Error fetching volunteers:", err);
        setError(
          err.message ||
            "An unexpected error occurred while fetching volunteers."
        );
        setVolunteers([]); // Clear volunteers on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchVolunteers();
  }, [API_BASE_URL]); // Dependency on API_BASE_URL can be useful if it changes

  const openModal = (volunteer: VolunteerProfile) => {
    setSelected(volunteer);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (e?: React.MouseEvent) => {
    if (e && (e.target as Element).closest(".modal-content")) {
      return;
    }
    setSelected(null);
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  const handleStartChat = (volunteer: VolunteerProfile) => {
    if (!currentUserId) {
      setError("Please log in to start a chat.");
      console.error("User is not logged in.");
      return;
    }
    const volunteerIdString = volunteer._id;
    const roomId = generateRoomId(currentUserId, volunteerIdString);
    // Pass `fullName` as the name to display
    navigate(`/chat/${roomId}`, {
      state: { chatPartnerName: volunteer.fullName },
    });
  };

  // Helper function to construct image URL (adjust path as needed)
  const getImageUrl = (imagePath?: string): string => {
    if (imagePath) {
      // Assuming imagePath is relative like 'uploads/images/avatar-123.jpg'
      // Adjust if your backend serves files differently
      return `${API_BASE_URL}/${imagePath.replace(/\\/g, "/")}`; // Ensure forward slashes
    }
    // Fallback image
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      selected?.fullName || "V"
    )}&background=random&size=128`;
  };

  return (
    <div
      className={`min-h-screen ${theme.bg} relative overflow-hidden transition-colors duration-500`}
    >
      {/* Animated Background Elements (Keep as is) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* ... circles and patterns ... */}
        <div
          className={`absolute top-1/4 left-1/5 w-64 h-64 rounded-full ${theme.primary} opacity-10 animate-float`}
        ></div>
        <div
          className={`absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full ${theme.secondary} opacity-10 animate-float-delayed`}
        ></div>
        <div
          className={`absolute top-2/3 left-1/3 w-48 h-48 rounded-full ${theme.accent} opacity-10 animate-float-slow`}
        ></div>

        {isDarkMode && (
          <>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-64 bg-gradient-to-t from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-10 relative z-10">
        {/* Introduction Section (Keep as is) */}
        <section className="text-center mb-16 mt-8 animate-fade-in">
          {/* ... Intro content ... */}
          <div
            className={`p-4 rounded-full ${theme.primary} inline-block mb-6`}
          >
            <Heart
              className={`h-12 w-12 ${
                isDarkMode ? "text-white" : "text-white"
              } animate-pulse-slow`}
            />
          </div>
          <h1
            className={`text-4xl md:text-5xl font-bold ${theme.text} mb-6 tracking-tight`}
          >
            Our Dedicated Volunteer Team
          </h1>
          <p
            className={`text-lg ${theme.muted} max-w-3xl mx-auto mb-8 leading-relaxed`}
          >
            At Samwaad, our mission to provide accessible mental health support
            is powered by the passion and dedication of our volunteers. They
            bring diverse skills, empathy, and a commitment to making a
            difference in people's lives.
          </p>
          <div className="max-w-2xl mx-auto relative">
            <p className={`text-md ${theme.muted} italic relative z-10`}>
              Get to know the individuals who help make free consultation and
              support possible for our community.
            </p>
            <div
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 ${theme.accent} opacity-50 rounded-full`}
            ></div>
          </div>
        </section>

        {/* --- Meet Our Volunteers Section --- */}
        <section className="mb-20 animate-fade-in-delayed">
          <h2
            className={`text-3xl font-semibold text-center ${theme.text} mb-2`}
          >
            Meet Our Volunteers
          </h2>
          <p className={`text-center ${theme.muted} mb-10`}>
            The compassionate individuals powering our mission
          </p>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className={`w-12 h-12 ${theme.text} animate-spin`} />
              <p className={`ml-4 text-lg ${theme.muted}`}>
                Loading Volunteers...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div
              className={`my-10 p-6 rounded-lg ${theme.card} border border-red-500/30 shadow-md flex items-center justify-center flex-col text-center`}
            >
              <AlertTriangle className="w-10 h-10 text-red-500 mb-3" />
              <p className={`font-semibold ${theme.text} mb-1`}>
                Failed to load volunteers
              </p>
              <p className={`text-sm ${theme.muted}`}>{error}</p>
            </div>
          )}

          {/* No Volunteers Found State */}
          {!isLoading && !error && volunteers.length === 0 && (
            <div
              className={`my-10 p-6 rounded-lg ${theme.card} shadow-sm text-center border ${theme.border}`}
            >
              <p className={`text-lg ${theme.text}`}>
                No Active Volunteers Found
              </p>
              <p className={`text-base ${theme.muted} mt-2`}>
                We are always looking for passionate individuals. Check out how
                to join us below!
              </p>
            </div>
          )}

          {/* Volunteer Grid */}
          {!isLoading && !error && volunteers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {volunteers.map((volunteer) => (
                <div
                  key={volunteer._id}
                  className={`${theme.card} rounded-2xl shadow-lg overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl group border ${theme.border}`}
                >
                  <div
                    className={`h-2 bg-gradient-to-r from-teal-500 to-blue-500`}
                  ></div>
                  <div className="p-6 flex flex-col items-center text-center flex-grow">
                    <div className="relative mb-6">
                      <div
                        className={`absolute inset-0 rounded-full ${theme.accent} opacity-0 scale-75 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500`}
                      ></div>
                      <img
                        // Use getImageUrl helper
                        src={getImageUrl(volunteer.imagePath)}
                        alt={volunteer.fullName} // Use fullName for alt text
                        className={`w-28 h-28 rounded-full object-cover border-4 ${
                          isDarkMode ? "border-gray-700" : "border-white"
                        } shadow-md z-10 relative group-hover:border-teal-500 transition-all duration-300`}
                      />
                    </div>
                    {/* Display fullName */}
                    <h3
                      className={`text-xl font-semibold ${theme.text} mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300`}
                    >
                      {volunteer.fullName}
                    </h3>
                    {/* Display interest as Role */}
                    <div className="flex items-center justify-center mb-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          isDarkMode
                            ? "bg-teal-900 text-teal-300"
                            : "bg-teal-100 text-teal-800"
                        } font-medium`}
                      >
                        {volunteer.interest}{" "}
                        {/* Display application interest */}
                      </span>
                    </div>
                    {/* Omit Experience or add it later */}
                    {/* <p className={`text-sm ${theme.muted} mb-4 flex items-center justify-center`}><Star className="w-4 h-4 mr-1 text-yellow-500" /> {volunteer.experience} experience</p> */}

                    {/* Bio: Use provided or default */}
                    <p
                      className={`text-sm ${theme.muted} flex-grow mb-6 px-2 line-clamp-3`}
                    >
                      {volunteer.bio ||
                        "Dedicated to supporting the Samwaad community."}{" "}
                      {/* Default bio */}
                    </p>

                    <div className="mt-auto flex flex-col gap-3 w-full px-4">
                      <button
                        onClick={() => openModal(volunteer)}
                        className={`w-full py-2.5 px-4 rounded-lg ${theme.button} hover:opacity-90 transition-all duration-300 flex items-center justify-center group-hover:shadow-md text-sm font-medium`}
                      >
                        {" "}
                        View Profile <Info className="w-4 h-4 ml-2" />{" "}
                      </button>
                      <button
                        onClick={() => handleStartChat(volunteer)}
                        className={`w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:opacity-95 transition-all duration-300 flex items-center justify-center group-hover:shadow-lg text-sm font-medium shadow`}
                      >
                        {" "}
                        Start Chat{" "}
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />{" "}
                      </button>
                    </div>
                  </div>
                  <div
                    className={`border-t ${theme.border} p-3 ${
                      isDarkMode ? "bg-slate-800/50" : "bg-slate-50/70"
                    } flex justify-center gap-4`}
                  >
                    <a
                      href={`mailto:${volunteer.email}`}
                      title={`Email ${volunteer.fullName}`}
                      className={`p-2 ${theme.muted} hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform`}
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href={`tel:${volunteer.phone}`}
                      title={`Call ${volunteer.fullName}`}
                      className={`p-2 ${theme.muted} hover:text-green-400 transition-colors duration-300 hover:scale-110 transform`}
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* How to Join Section (Keep as is) */}
        <section
          className={`${theme.card} rounded-2xl shadow-lg p-8 md:p-12 mb-16 relative overflow-hidden animate-fade-in-delayed-more border ${theme.border}`}
        >
          {/* ... decorative elements ... */}
          <div
            className={`absolute right-0 top-0 w-64 h-64 ${theme.primary} opacity-5 rounded-full -mr-20 -mt-20`}
          ></div>
          <div
            className={`absolute left-0 bottom-0 w-40 h-40 ${theme.secondary} opacity-5 rounded-full -ml-10 -mb-10`}
          ></div>

          <div className="flex flex-col md:flex-row items-center md:gap-12 relative z-10">
            <div
              className={`flex-shrink-0 mb-8 md:mb-0 p-6 rounded-full ${theme.primary} bg-opacity-10 transform transition-transform duration-500 hover:rotate-12`}
            >
              <Users
                className={`w-24 h-24 md:w-32 md:h-32 ${
                  isDarkMode ? "text-blue-400" : "text-indigo-500"
                }`}
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className={`text-3xl font-semibold ${theme.text} mb-4`}>
                Interested in Volunteering?
              </h2>
              <p className={`${theme.muted} mb-6 leading-relaxed`}>
                Join our compassionate team and contribute your time and skills
                to support mental well-being in the community. We value diverse
                backgrounds and experiences. Here's how you can get involved:
              </p>
              <ol
                className={`space-y-4 text-left ${theme.text} mb-8 pl-4 md:pl-0`}
              >
                {/* Steps remain the same */}
                {[
                  /* ... Step content ... */
                  { title: "Explore Roles", content: "..." },
                  {
                    title: "Submit Application",
                    content:
                      "Fill out our online volunteer application form...",
                  }, // Updated link context
                  { title: "Interview & Screening", content: "..." },
                  { title: "Onboarding & Training", content: "..." },
                ].map((step, index) => (
                  <li key={index} className="flex items-start group">
                    <div
                      className={`relative ${
                        isDarkMode ? "text-emerald-400" : "text-green-500"
                      } mr-3 mt-1 flex-shrink-0`}
                    >
                      <span
                        className={`absolute -left-2 top-0 w-10 h-10 rounded-full ${theme.secondary} opacity-0 group-hover:opacity-20 transform scale-0 group-hover:scale-100 transition-all duration-300`}
                      ></span>
                      <CheckCircle className="w-5 h-5 relative z-10" />
                    </div>
                    <span>
                      <span className="font-semibold">{step.title}:</span>{" "}
                      {step.content}
                    </span>
                  </li>
                ))}
              </ol>
              {/* Ensure this links to your VolunteerForm route */}
              <a
                href="/volunteer-application"
                className={`inline-flex items-center ${theme.button} px-8 py-4 rounded-xl font-medium transition-all duration-300 text-lg shadow hover:shadow-lg hover:-translate-y-1 transform`}
              >
                Apply Now to Volunteer
                <Send className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Modal: Updated to use VolunteerProfile and map fields */}
      {isModalOpen && selected && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in"
          onClick={closeModal}
        >
          <div
            className={`${theme.card} rounded-xl p-6 sm:p-8 w-full max-w-lg relative shadow-2xl modal-content animate-zoom-in border ${theme.border}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-red-500 transition-all duration-300 transform hover:rotate-90 z-20 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Header gradient */}
            <div
              className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-teal-500/60 to-transparent rounded-t-xl opacity-80`}
            ></div>
            <div className="flex flex-col items-center text-center relative z-10 pt-10">
              {/* Use getImageUrl */}
              <img
                src={getImageUrl(selected.imagePath)}
                alt={selected.fullName}
                className={`w-32 h-32 rounded-full mb-4 object-cover border-4 ${
                  isDarkMode ? "border-gray-600" : "border-white"
                } shadow-lg`}
              />
              {/* Display fullName */}
              <h2 className={`text-3xl font-bold ${theme.text} mb-1`}>
                {selected.fullName}
              </h2>
              {/* Display interest as role */}
              <p
                className={`${
                  isDarkMode ? "text-teal-400" : "text-teal-600"
                } font-medium text-lg mb-2`}
              >
                {selected.interest}
              </p>
              {/* Display bio if available */}
              <p
                className={`${theme.text} mb-6 max-w-md mx-auto leading-relaxed text-base`}
              >
                {selected.bio ||
                  "Helping the Samwaad community grow stronger together."}
              </p>
              {/* Contact Info */}
              <div
                className={`${
                  isDarkMode ? "bg-slate-800/60" : "bg-slate-100/80"
                } rounded-lg p-4 w-full max-w-sm mx-auto mb-6 border ${
                  theme.border
                }`}
              >
                <h4
                  className={`font-semibold ${theme.text} mb-3 text-left text-md`}
                >
                  Contact Information:
                </h4>
                <div className="flex flex-col items-start w-full gap-2.5 text-sm">
                  <a
                    href={`mailto:${selected.email}`}
                    className={`flex items-center ${theme.muted} hover:text-blue-400 transition-colors duration-300 group w-full p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700`}
                  >
                    <Mail className="w-5 h-5 mr-3 flex-shrink-0 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                    <span className="truncate">{selected.email}</span>
                  </a>
                  <a
                    href={`tel:${selected.phone}`}
                    className={`flex items-center ${theme.muted} hover:text-green-400 transition-colors duration-300 group w-full p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700`}
                  >
                    <Phone className="w-5 h-5 mr-3 flex-shrink-0 text-gray-400 group-hover:text-green-400 transition-colors duration-300" />
                    <span className="truncate">{selected.phone}</span>
                  </a>
                </div>
              </div>
              {/* Close button */}
              <button
                onClick={() => closeModal()}
                className={`mt-2 px-8 py-3 ${theme.button} rounded-lg transition-all duration-300 hover:opacity-90 flex items-center text-base font-medium shadow-sm hover:shadow-md`}
              >
                {" "}
                Close Profile{" "}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global styles for animations (Keep as is) */}
      <style>{`
       /* ... Keyframes float, pulse-slow, fade-in, zoom-in ... */
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
        @keyframes float-delayed { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-5deg); } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(3deg); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(0.95); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoom-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
       .animate-float { animation: float 8s ease-in-out infinite; }
       .animate-float-delayed { animation: float-delayed 12s ease-in-out infinite; }
       .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
       .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
       .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
       .animate-fade-in-delayed { opacity: 0; animation: fade-in 0.8s ease-out forwards 0.2s; }
       .animate-fade-in-delayed-more { opacity: 0; animation: fade-in 0.8s ease-out forwards 0.4s; }
       .animate-zoom-in { animation: zoom-in 0.3s ease-out forwards; }
        .line-clamp-3 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
        .modal-content { max-height: 90vh; overflow-y: auto; }
        /* Subtle scrollbar for modal and potentially other scrollable areas */
        .modal-content::-webkit-scrollbar, .scrollbar-thin::-webkit-scrollbar { width: 6px; }
        .modal-content::-webkit-scrollbar-track, .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .modal-content::-webkit-scrollbar-thumb, .scrollbar-thin::-webkit-scrollbar-thumb { background-color: rgba(150, 150, 150, 0.4); border-radius: 3px; }
        .modal-content::-webkit-scrollbar-thumb:hover, .scrollbar-thin::-webkit-scrollbar-thumb:hover { background-color: rgba(150, 150, 150, 0.6); }
       /* Firefox scrollbar */
       .modal-content, .scrollbar-thin { scrollbar-width: thin; scrollbar-color: rgba(150, 150, 150, 0.4) transparent; }

     `}</style>
    </div>
  );
};

export default VolunteersPage;
