import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Info,
  Heart,
  Send,
  Users,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";
import Themes from "../components/ThemeComponents/themes"; // Update path as needed
import { useTheme } from "../components/ThemeComponents/ThemeProvider"; // Import the useTheme hook

interface Volunteer {
  id: number;
  name: string;
  role: string;
  experience: string;
  email: string;
  phone: string;
  bio: string;
  image: string;
}

// Keep dummy data for now, replace with API call later
const dummyVolunteers: Volunteer[] = [
  {
    id: 1,
    name: "Riya Sharma",
    role: "Community Outreach Coordinator",
    experience: "2 years",
    email: "riya@samwaad.in",
    phone: "+91 98765 43211",
    bio: "Passionate about mental health awareness and fostering supportive community connections. Enjoys organizing workshops.",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    id: 2,
    name: "Kabir Singh",
    role: "Tech Support Volunteer",
    experience: "1 year",
    email: "kabir@samwaad.in",
    phone: "+91 98765 43212",
    bio: "Utilizes technical skills to enhance Samwaad's digital platform, ensuring smooth access to resources for users and counselors.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Aisha Khan",
    role: "Peer Support Facilitator",
    experience: "3 years",
    email: "aisha@samwaad.in",
    phone: "+91 98765 43213",
    bio: "Experienced in active listening and guiding peer support groups. Believes in the power of shared experiences for healing.",
    image: "https://randomuser.me/api/portraits/women/31.jpg",
  },
];

const VolunteersPage = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [selected, setSelected] = useState<Volunteer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme: currentTheme } = useTheme(); // Get theme from context

  // Get current theme styles based on theme context
  const isDarkMode = currentTheme === "dark";
  const theme = isDarkMode ? Themes.dark : Themes.light;

  useEffect(() => {
    // TODO: Replace with a real API call to fetch volunteers
    setVolunteers(dummyVolunteers);
  }, []);

  const openModal = (volunteer: Volunteer) => {
    setSelected(volunteer);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = (e?: React.MouseEvent) => {
    // Prevent closing if clicking inside the modal content
    if (e && (e.target as Element).closest(".modal-content")) {
      return;
    }
    setSelected(null);
    setIsModalOpen(false);
    document.body.style.overflow = ""; // Restore scrolling
  };

  return (
    <div
      className={`min-h-screen ${theme.bg} relative overflow-hidden transition-colors duration-500`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated circles */}
        <div
          className={`absolute top-1/4 left-1/5 w-64 h-64 rounded-full ${theme.primary} opacity-10 animate-float`}
        ></div>
        <div
          className={`absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full ${theme.secondary} opacity-10 animate-float-delayed`}
        ></div>
        <div
          className={`absolute top-2/3 left-1/3 w-48 h-48 rounded-full ${theme.accent} opacity-10 animate-float-slow`}
        ></div>

        {/* Light patterns for visual interest */}
        {isDarkMode && (
          <>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-64 bg-gradient-to-t from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-10 relative z-10">
        {/* --- Introduction Section --- */}
        <section className="text-center mb-16 mt-8 animate-fade-in">
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
            Meet Some of Our Volunteers
          </h2>
          <p className={`text-center ${theme.muted} mb-10`}>
            The faces behind our mission
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {volunteers.map((volunteer) => (
              <div
                key={volunteer.id}
                className={`${theme.card} rounded-2xl shadow-lg overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
              >
                <div className={`h-2  bg-teal-600`}></div>
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div
                      className={`absolute inset-0 rounded-full ${theme.accent} opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`}
                    ></div>
                    <img
                      src={volunteer.image}
                      alt={volunteer.name}
                      className={`w-28 h-28 rounded-full object-cover border-4 ${
                        isDarkMode ? "border-gray-700" : "border-white"
                      } shadow-md z-10 relative group-hover:border-current transition-all duration-300`}
                    />
                  </div>
                  <h3
                    className={`text-xl font-semibold ${theme.text} mb-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300`}
                  >
                    {volunteer.name}
                  </h3>
                  <div className="flex items-center justify-center mb-1">
                    <span
                      className={`px-3 py-1 rounded-full text-xs bg-teal-600  ${
                        isDarkMode ? "text-white" : "text-white"
                      } font-medium`}
                    >
                      {volunteer.role}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${theme.muted} mb-4 flex items-center justify-center`}
                  >
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />{" "}
                    {volunteer.experience} experience
                  </p>
                  <p
                    className={`text-sm ${theme.muted} flex-grow mb-6 px-2 line-clamp-3`}
                  >
                    "{volunteer.bio}"
                  </p>

                  <div className="mt-auto w-full">
                    <button
                      onClick={() => openModal(volunteer)}
                      className={`w-full py-3 px-4 rounded-lg  bg-teal-600 hover:opacity-90 transition-all duration-300 flex items-center justify-center group-hover:shadow-md text-white `}
                    >
                      View Full Profile
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                <div
                  className={`border-t border-opacity-10 p-4 ${
                    isDarkMode ? "bg-slate-800" : "bg-slate-50"
                  } flex justify-center gap-4`}
                >
                  <a
                    href={`mailto:${volunteer.email}`}
                    title={`Email ${volunteer.name}`}
                    className={`p-2 ${theme.muted} hover:text-blue-500 transition-colors duration-300 hover:scale-110 transform`}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href={`tel:${volunteer.phone}`}
                    title={`Call ${volunteer.name}`}
                    className={`p-2 ${theme.muted} hover:text-green-500 transition-colors duration-300 hover:scale-110 transform`}
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => openModal(volunteer)}
                    title={`More info about ${volunteer.name}`}
                    className={`p-2 ${theme.muted} hover:text-indigo-500 transition-colors duration-300 hover:scale-110 transform`}
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- How to Join Section --- */}
        <section
          className={`${theme.card} rounded-2xl shadow-lg p-8 md:p-12 mb-16 relative overflow-hidden animate-fade-in-delayed-more`}
        >
          {/* Background decorative element */}
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
                {[
                  {
                    title: "Explore Roles",
                    content:
                      "Review our current volunteer opportunities and requirements (e.g., time commitment, specific skills needed) on our dedicated volunteering page.",
                  },
                  {
                    title: "Submit Application",
                    content:
                      "Fill out our online volunteer application form, telling us about yourself, your interests, and your availability.",
                  },
                  {
                    title: "Interview & Screening",
                    content:
                      "We'll review your application and may invite you for a brief interview to discuss potential roles and ensure a good fit for both you and Samwaad.",
                  },
                  {
                    title: "Onboarding & Training",
                    content:
                      "Once accepted, you'll receive orientation and any necessary training to prepare you for your volunteer role.",
                  },
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

              <a
                href="/volunteer-application"
                className={`inline-flex items-center ${theme.button} px-8 py-4 rounded-xl font-medium transition-all duration-300 text-lg shadow hover:shadow-lg hover:translate-y-1 transform`}
              >
                Apply Now to Volunteer
                <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* --- Modal --- */}
      {isModalOpen && selected && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in"
          onClick={closeModal}
        >
          <div
            className={`${theme.card} rounded-xl p-6 sm:p-8 w-full max-w-lg relative shadow-2xl modal-content animate-zoom-in`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-300 transform hover:rotate-90 z-10"
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

            {/* Decorative header */}
            <div
              className={`absolute top-0 left-0 right-0 h-24 ${theme.primary} rounded-t-xl`}
            ></div>

            <div className="flex flex-col items-center text-center relative z-10 mt-8">
              <img
                src={selected.image}
                alt={selected.name}
                className={`w-32 h-32 rounded-full mb-5 object-cover border-4 ${
                  isDarkMode ? "border-gray-700" : "border-white"
                } shadow-lg`}
              />
              <h2 className={`text-2xl font-bold ${theme.text} mb-1`}>
                {selected.name}
              </h2>
              <p
                className={`${
                  isDarkMode ? "text-blue-400" : "text-indigo-600"
                } font-medium mb-2`}
              >
                {selected.role}
              </p>
              <p className={`text-sm ${theme.muted} mb-4`}>
                Experience: {selected.experience}
              </p>
              <p className={`${theme.muted} mb-6 max-w-md mx-auto`}>
                {selected.bio}
              </p>

              <div
                className={`${
                  isDarkMode ? "bg-slate-700" : "bg-slate-50"
                } rounded-lg p-4 w-full max-w-sm mx-auto mb-6`}
              >
                <h4 className={`font-semibold ${theme.text} mb-3 text-left`}>
                  Contact Info:
                </h4>
                <div className="flex flex-col items-start w-full gap-2 text-sm">
                  <a
                    href={`mailto:${selected.email}`}
                    className={`flex items-center ${theme.muted} hover:text-blue-500 transition-colors duration-300 group`}
                  >
                    <Mail className="w-4 h-4 mr-3 group-hover:text-blue-500 transition-colors duration-300" />
                    {selected.email}
                  </a>
                  <a
                    href={`tel:${selected.phone}`}
                    className={`flex items-center ${theme.muted} hover:text-green-500 transition-colors duration-300 group`}
                  >
                    <Phone className="w-4 h-4 mr-3 group-hover:text-green-500 transition-colors duration-300" />
                    {selected.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => closeModal()}
                className={`px-6 py-3 ${theme.button} rounded-lg transition-all duration-300 hover:opacity-90 flex items-center`}
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global styles for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.95); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 12s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-delayed {
          opacity: 0;
          animation: fade-in 0.8s ease-out forwards;
          animation-delay: 0.2s;
        }
        
        .animate-fade-in-delayed-more {
          opacity: 0;
          animation: fade-in 0.8s ease-out forwards;
          animation-delay: 0.4s;
        }
        
        .animate-zoom-in {
          animation: zoom-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default VolunteersPage;
