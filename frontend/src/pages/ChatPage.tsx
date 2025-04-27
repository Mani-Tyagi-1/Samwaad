import React from "react";
import { useParams, useLocation } from "react-router-dom";
import ChatBox from "../components/ChatComponents/ChatBox"; // Adjust path as needed
import { useTheme } from "../components/ThemeComponents/ThemeProvider"; // Import the useTheme hook
import Themes from "../components/ThemeComponents/themes"; // Update path as needed
import { MessageSquare } from "lucide-react"; // Icon for header

const ChatPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>(); // Get roomId from URL
  const location = useLocation(); // Get location state
  const { theme: currentTheme } = useTheme(); // Get theme context

  // --- Placeholder for logged-in user ID ---
  // In a real app, get this from your authentication context or state management
  const currentUserId = "user_abc_123"; // Replace with actual logged-in user ID (MUST match the one used in VolunteersPage)

  // Get the chat partner's name passed from VolunteersPage
  const chatPartnerName = location.state?.chatPartnerName || "Volunteer"; // Default name if state not passed

  // Get theme styles
  const isDarkMode = currentTheme === "dark";
  const theme = isDarkMode ? Themes.dark : Themes.light;

  if (!roomId) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${theme.bg} ${theme.text}`}
      >
        Error: Chat room ID is missing.
      </div>
    );
  }

  if (!currentUserId) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${theme.bg} ${theme.text}`}
      >
        Error: User ID is missing. Please log in.
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col h-screen ${theme.bg} p-4 md:p-6 lg:p-8 transition-colors duration-500`}
    >
      {/* Chat Header */}
      <div
        className={`mb-4 p-4 rounded-t-xl shadow ${theme.card} flex items-center border-b ${theme.bg}`}
      >
        <MessageSquare
          className={`w-6 h-6 mr-3 ${
            isDarkMode ? "text-teal-400" : "text-teal-600"
          }`}
        />
        <h1 className={`text-xl font-semibold ${theme.text}`}>
          Chat with {chatPartnerName}
        </h1>
        {/* Optional: Add back button or other controls here */}
      </div>

      {/* ChatBox Container */}
      <div className="flex-grow flex flex-col overflow-hidden rounded-b-xl shadow">
        {/* Pass theme directly or let ChatBox use its own context */}
        <ChatBox roomId={roomId} userId={currentUserId} />
      </div>
    </div>
  );
};

export default ChatPage;
