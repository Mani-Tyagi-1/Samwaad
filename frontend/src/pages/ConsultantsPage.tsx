import { useState, useEffect } from "react";
import { Mail, Phone, Info, CalendarCheck, UserCheck } from "lucide-react";
import { useTheme } from "../components/ThemeComponents/ThemeProvider"; // Import the useTheme hook
import Themes from "../components/ThemeComponents/themes"; // Import theme definitions



// Define the interface for a Consultant
interface Consultant {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  email: string;
  phone: string;
  bio: string;
  image: string;
}

// Dummy data for professional consultants
const dummyConsultants: Consultant[] = [
  {
    id: 1,
    name: "Dr. Arjun Mehta",
    specialization: "Clinical Psychologist",
    experience: "8 years",
    email: "arjun.mehta@samwaadpro.com",
    phone: "+91 98765 43210",
    bio: "PhD in Clinical Psychology. Specializes in cognitive behavioral therapy (CBT) for anxiety, depression, and stress management. Certified trauma counselor.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Sonal Khanna",
    specialization: "Licensed Career Counselor",
    experience: "5 years",
    email: "sonal.khanna@samwaadpro.com",
    phone: "+91 99123 45678",
    bio: "Masters in Counseling Psychology. Helps students and professionals navigate career transitions, develop skills, and achieve work-life balance.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Dr. Priya Desai",
    specialization: "Psychiatrist (MD)",
    experience: "12 years",
    email: "priya.desai@samwaadpro.com",
    phone: "+91 91234 56789",
    bio: "Medical Doctor specialized in psychiatry. Provides diagnosis, medication management, and therapy for complex mental health conditions.",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
  },
];

const ConsultantsPage = () => {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [selected, setSelected] = useState<Consultant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme: currentTheme } = useTheme(); // Get theme from context
  const theme = currentTheme === "dark" ? Themes.dark : Themes.light;

  useEffect(() => {
    // Simulating fetching consultants data
    setConsultants(dummyConsultants);
  }, []);

  const openModal = (consultant: Consultant) => {
    setSelected(consultant);
    setIsModalOpen(true);
  };

  const closeModal = (e?: React.MouseEvent) => {
    if (e && (e.target as Element).closest(".modal-content")) {
      return;
    }
    setSelected(null);
    setIsModalOpen(false);
  };

  const handleBookClick = (consultant: Consultant) => {
    console.log(
      `Initiating booking process for ${consultant.name} (ID: ${consultant.id})`
    );
    alert(`Redirecting to booking page for ${consultant.name}...`);
    closeModal();
  };

  return (
    <div
      className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-300 relative overflow-hidden`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape shape1"></div>
        <div className="floating-shape shape2"></div>
        <div className="floating-shape shape3"></div>
        <div className="floating-shape shape4"></div>
      </div>

      <div className="relative z-10 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Introduction Section */}
          <section className="text-center mb-16 relative">
            <div
              className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full ${theme.accent} flex items-center justify-center animate-pulse-slow`}
            >
              <UserCheck className="h-8 w-8 text-white" />
            </div>
            <div
              className={`pt-20 ${
                currentTheme === "dark"
                  ? "text-gradient-dark"
                  : "text-gradient-light"
              }`}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Expert Consultants for Your Needs
              </h1>
            </div>
            <p className={`text-lg ${theme.muted} max-w-3xl mx-auto mb-6`}>
              Connect with our verified professionals for expert guidance and
              support. Our consultants offer confidential, paid sessions
              tailored to your specific goals.
            </p>
            <p className={`text-md ${theme.muted} max-w-2xl mx-auto`}>
              Investing in professional consultation is investing in your growth
              and well-being. Browse profiles and book a session today.
            </p>
          </section>

          {/* Meet Our Consultants Section */}
          <section className="mb-16">
            <h2
              className={`text-3xl font-semibold text-center mb-10 ${
                currentTheme === "dark" ? "text-gray-100" : "text-slate-800"
              }`}
            >
              Meet Our Professional Consultants
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {consultants.map((consultant) => (
                <div
                  key={consultant.id}
                  className={`${
                    theme.card
                  } rounded-xl overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-xl card-animated ${
                    currentTheme === "dark" ? "shadow-blue-500/20" : "shadow-lg"
                  }`}
                >
                  <div className="p-6 flex flex-col items-center text-center relative">
                    {/* Card gradient overlay */}
                    <div
                      className={`absolute inset-0 ${
                        currentTheme === "dark"
                          ? "card-gradient-dark"
                          : "card-gradient-light"
                      } opacity-10`}
                    ></div>

                    <div className="relative z-10">
                      <div className="avatar-container mb-4 relative">
                        <img
                          src={consultant.image}
                          alt={consultant.name}
                          className="w-28 h-28 rounded-full object-cover shadow-md border-4 avatar-glow"
                          style={{
                            borderColor:
                              currentTheme === "dark" ? "#10b981" : "#10b981",
                          }}
                        />
                        <div className="avatar-ring"></div>
                      </div>

                      <h3
                        className={`text-xl font-semibold ${
                          currentTheme === "dark"
                            ? "text-white"
                            : "text-slate-900"
                        }`}
                      >
                        {consultant.name}
                      </h3>
                      <p
                        className={`font-medium text-sm mb-1 ${
                          currentTheme === "dark"
                            ? "text-emerald-400"
                            : "text-emerald-600"
                        }`}
                      >
                        {consultant.specialization}
                      </p>
                      <p className={`text-sm ${theme.muted} mb-4`}>
                        {consultant.experience} experience
                      </p>
                      <p
                        className={`text-xs ${theme.muted} flex-grow mb-4 px-2 text-left italic`}
                      >
                        "
                        {consultant.bio.length > 90
                          ? consultant.bio.substring(0, 90) + "..."
                          : consultant.bio}
                        "
                      </p>
                    </div>
                  </div>
                  <div
                    className={`mt-auto border-t ${
                      currentTheme === "dark"
                        ? "border-slate-700 bg-slate-800"
                        : "border-slate-100 bg-slate-50"
                    } p-4 flex justify-around gap-3`}
                  >
                    <button
                      onClick={() => handleBookClick(consultant)}
                      className={`flex-1 ${
                        currentTheme === "dark"
                          ? "bg-teal-500 text-slate-900 hover:bg-teal-400"
                          : "bg-emerald-500 text-white hover:bg-emerald-600"
                      } px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 text-sm flex items-center justify-center gap-1.5 btn-pulse`}
                      title={`Book a session with ${consultant.name}`}
                    >
                      <CalendarCheck className="w-4 h-4" />
                      Book Session
                    </button>
                    <button
                      onClick={() => openModal(consultant)}
                      className={`flex-1 ${
                        currentTheme === "dark"
                          ? "bg-slate-700 text-teal-300 border-slate-600 hover:bg-slate-600"
                          : "bg-white text-emerald-600 border-emerald-300 hover:bg-emerald-50"
                      } border px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm flex items-center justify-center gap-1.5`}
                      title={`View details for ${consultant.name}`}
                    >
                      <Info className="w-4 h-4" /> Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Modal for Consultant Details */}
      {isModalOpen && selected && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center p-4 transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            className={`${theme.card} rounded-xl p-6 sm:p-8 w-full max-w-xl relative shadow-2xl modal-content animate-modal-in`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              className={`absolute top-3 right-3 ${
                currentTheme === "dark"
                  ? "text-slate-400 hover:text-red-400"
                  : "text-slate-400 hover:text-red-500"
              } transition-colors z-10`}
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

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Left Side: Image & Basic Info */}
              <div className="flex-shrink-0 text-center">
                <div className="avatar-container-lg relative mx-auto">
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full mb-4 object-cover shadow-lg mx-auto modal-avatar"
                    style={{
                      borderColor:
                        currentTheme === "dark" ? "#10b981" : "#10b981",
                      borderWidth: "4px",
                    }}
                  />
                  <div className="modal-avatar-ring"></div>
                </div>
                <h2
                  className={`text-2xl font-bold ${
                    currentTheme === "dark" ? "text-white" : "text-slate-800"
                  } mb-1`}
                >
                  {selected.name}
                </h2>
                <p
                  className={`${
                    currentTheme === "dark"
                      ? "text-emerald-400"
                      : "text-emerald-700"
                  } font-semibold text-center`}
                >
                  {selected.specialization}
                </p>
                <p className={`text-sm ${theme.muted} text-center mb-4`}>
                  Experience: {selected.experience}
                </p>
              </div>

              {/* Right Side: Bio, Contact, Book Button */}
              <div className="flex-1 text-left">
                <h3
                  className={`font-semibold ${
                    currentTheme === "dark" ? "text-gray-200" : "text-slate-700"
                  } text-lg mb-2 border-b ${
                    currentTheme === "dark"
                      ? "border-slate-700"
                      : "border-slate-200"
                  } pb-1`}
                >
                  About
                </h3>
                <p
                  className={`${
                    currentTheme === "dark" ? "text-gray-300" : "text-slate-600"
                  } mb-6 text-sm`}
                >
                  {selected.bio}
                </p>

                {/* Contact Info */}
                <div
                  className={`${
                    currentTheme === "dark"
                      ? "bg-slate-800 border-slate-700"
                      : "bg-slate-50 border-slate-200"
                  } rounded-lg p-4 w-full mx-auto mb-6 border`}
                >
                  <h4
                    className={`font-semibold ${
                      currentTheme === "dark"
                        ? "text-gray-200"
                        : "text-slate-700"
                    } mb-3 text-sm`}
                  >
                    Contact for Inquiries:
                  </h4>
                  <div className="flex flex-col items-start w-full gap-2 text-sm">
                    <a
                      href={`mailto:${selected.email}`}
                      className={`flex items-center ${
                        currentTheme === "dark"
                          ? "text-gray-300 hover:text-teal-300"
                          : "text-slate-700 hover:text-emerald-600"
                      } transition-colors group`}
                    >
                      <Mail
                        className={`w-4 h-4 mr-3 ${
                          currentTheme === "dark"
                            ? "text-slate-500 group-hover:text-teal-400"
                            : "text-slate-400 group-hover:text-emerald-500"
                        } transition-colors flex-shrink-0`}
                      />
                      {selected.email}
                    </a>
                    <a
                      href={`tel:${selected.phone}`}
                      className={`flex items-center ${
                        currentTheme === "dark"
                          ? "text-gray-300 hover:text-teal-300"
                          : "text-slate-700 hover:text-green-600"
                      } transition-colors group`}
                    >
                      <Phone
                        className={`w-4 h-4 mr-3 ${
                          currentTheme === "dark"
                            ? "text-slate-500 group-hover:text-teal-400"
                            : "text-slate-400 group-hover:text-green-500"
                        } transition-colors flex-shrink-0`}
                      />
                      {selected.phone}
                    </a>
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={() => handleBookClick(selected)}
                  className={`w-full mt-4 ${
                    currentTheme === "dark"
                      ? "bg-teal-500 text-slate-900 hover:bg-teal-400"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  } px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg btn-pulse-lg`}
                >
                  <CalendarCheck className="w-5 h-5" />
                  Book a Consultation
                </button>
                <p className={`text-xs text-center ${theme.muted} mt-2`}>
                  Secure booking process ensures confidentiality.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations and Theme Styles */}
      <style>{`
        /* Animated Background Shapes */
        .floating-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          filter: blur(80px);
          animation-duration: 15s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        .shape1 {
          top: 5%;
          left: 10%;
          width: 300px;
          height: 300px;
          background: ${currentTheme === "dark" ? "#3b82f6" : "#3b82f6"};
          animation-name: float1;
        }

        .shape2 {
          top: 10%;
          right: 15%;
          width: 400px;
          height: 400px;
          background: ${currentTheme === "dark" ? "#10b981" : "#10b981"};
          animation-name: float2;
        }

        .shape3 {
          bottom: 15%;
          left: 20%;
          width: 350px;
          height: 350px;
          background: ${currentTheme === "dark" ? "#14b8a6" : "#14b8a6"};
          animation-name: float3;
        }

        .shape4 {
          bottom: 10%;
          right: 10%;
          width: 250px;
          height: 250px;
          background: ${currentTheme === "dark" ? "#6366f1" : "#6366f1"};
          animation-name: float4;
        }

        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, 50px);
          }
        }

        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-40px, 30px);
          }
        }

        @keyframes float3 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(50px, -30px);
          }
        }

        @keyframes float4 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, -40px);
          }
        }

        /* Text Gradients */
        .text-gradient-light {
          background: linear-gradient(90deg, #0f766e, #059669, #0284c7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .text-gradient-dark {
          background: linear-gradient(90deg, #5eead4, #34d399, #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Card Animations */
        .card-animated {
          position: relative;
          z-index: 1;
          transition: all 0.3s ease-out;
        }

        .card-animated:hover {
          transform: translateY(-10px);
          box-shadow: ${
            currentTheme === "dark"
              ? "0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.1)"
              : "0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.1)"
          };
        }

        .card-gradient-light {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        }

        .card-gradient-dark {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        }

        /* Avatar Animation */
        .avatar-container {
          position: relative;
          display: inline-block;
        }

        .avatar-glow {
          transition: all 0.3s ease;
        }

        .card-animated:hover .avatar-glow {
          box-shadow: 0 0 15px
            ${
              currentTheme === "dark"
                ? "rgba(16, 185, 129, 0.7)"
                : "rgba(16, 185, 129, 0.7)"
            };
        }

        .avatar-ring {
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% + 8px);
          height: calc(100% + 8px);
          border-radius: 50%;
          border: 2px solid transparent;
        }

        .card-animated:hover .avatar-ring {
          border-color: ${currentTheme === "dark" ? "#10b981" : "#10b981"};
          animation: spin 10s linear infinite;
        }

        /* Modal Animation */
        .animate-modal-in {
          animation: modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .modal-avatar {
          transition: transform 0.5s ease;
        }

        .modal-avatar-ring {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% + 8px);
          height: calc(100% + 8px);
          border-radius: 50%;
          border: 2px solid ${currentTheme === "dark" ? "#10b981" : "#10b981"};
          animation: spin 10s linear infinite;
        }

        @keyframes spin {
          100% {
            transform: translateX(-50%) rotate(360deg);
          }
        }

        /* Button Animations */
        .btn-pulse {
          position: relative;
          overflow: hidden;
        }

        .btn-pulse:after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.4);
          opacity: 0;
          border-radius: 50%;
          transform: scale(1);
          transition: opacity 1s, transform 1s;
        }

        .btn-pulse:hover:after {
          opacity: 0;
          transform: scale(20);
        }

        .btn-pulse-lg:after {
          transform: scale(1);
          transition: opacity 1s, transform 1.5s;
        }

        .btn-pulse-lg:hover:after {
          transform: scale(40);
        }

        /* General Animation */
        .animate-pulse-slow {
          animation: pulseSlow 3s infinite;
        }

        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
          50% {
            opacity: 0.7;
            transform: translate(-50%, 0) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default ConsultantsPage;
