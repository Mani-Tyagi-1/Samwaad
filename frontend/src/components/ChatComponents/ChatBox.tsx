import React, { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useChat } from "../../hooks/useChat"; // Adjust path as needed
import { useTheme } from "../ThemeComponents/ThemeProvider"; // Import theme hook
import Themes from "../ThemeComponents/themes"; // Import themes

interface Props {
  roomId: string;
  userId: string;
}

const ChatBox = ({ roomId, userId }: Props) => {
  const { messages, newMsg, setNewMsg, sendMessage, isLoading, error } =
    useChat(roomId, userId);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for scrolling
  const { theme: currentTheme } = useTheme(); // Get theme

  // Determine theme styles
  const isDarkMode = currentTheme === "dark";
  const theme = isDarkMode ? Themes.dark : Themes.light;
  const themeInputBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const themeInputBorder = isDarkMode ? "border-gray-700" : "border-gray-300";
  const themeInputText = isDarkMode ? "text-gray-200" : "text-gray-800";
  const themePlaceholder = isDarkMode
    ? "placeholder-gray-500"
    : "placeholder-gray-400";
  const themeSendButton = isDarkMode
    ? "bg-teal-600 hover:bg-teal-700"
    : "bg-teal-600 hover:bg-teal-700"; // Consistent button color
  const themeTimestamp = isDarkMode ? "text-gray-400" : "text-gray-500";

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (newMsg.trim()) {
      sendMessage();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Send on Enter, allow Shift+Enter for newline
      e.preventDefault(); // Prevent default newline on Enter
      handleSend();
    }
  };

  return (
    // Apply theme background and text color to the main container
    <div
      className={`w-full h-full flex flex-col ${theme.card} rounded-b-xl overflow-hidden`}
    >
      {/* Message Area */}
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin ${
          isDarkMode
            ? "scrollbar-thumb-gray-600 scrollbar-track-gray-800"
            : "scrollbar-thumb-gray-400 scrollbar-track-gray-100"
        }`}
      >
        {isLoading && (
          <div className={`text-center ${theme.muted}`}>
            Loading messages...
          </div>
        )}
        {error && (
          <div className={`text-center text-red-500`}>
            Error loading messages: {error}
          </div>
        )}
        {!isLoading && !error && messages.length === 0 && (
          <div className={`text-center ${theme.muted}`}>
            No messages yet. Start the conversation!
          </div>
        )}
        {messages.map((msg:any, idx:any) => (
          <div
            key={msg._id || idx} // Use message ID from DB if available, otherwise index
            className={`flex ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`py-2 px-3 rounded-lg max-w-[70%] break-words shadow-sm ${
                msg.senderId === userId
                  ? "bg-teal-600 text-white" // Sender's messages
                  : `${isDarkMode ? "bg-gray-700" : "bg-gray-200"} ${
                      theme.text
                    }` // Receiver's messages
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <small
                className={`text-xs opacity-70 block text-right mt-1 ${
                  msg.senderId === userId ? "text-teal-100" : themeTimestamp
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          </div>
        ))}
        {/* Empty div to target for scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div
        className={`p-3 border-t ${isDarkMode ? "border-gray-700" : "border-gray-300"} ${
          isDarkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={handleKeyDown} // Use keydown handler
            className={`flex-1 px-4 py-2 border ${themeInputBorder} ${themeInputBg} ${themeInputText} ${themePlaceholder} rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200`}
            placeholder="Type your message..."
            autoComplete="off"
          />
          <button
            onClick={handleSend}
            disabled={!newMsg.trim()} // Disable if input is empty
            className={`p-2.5 ${themeSendButton} text-white rounded-full transition duration-200 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
              isDarkMode
                ? "focus:ring-offset-gray-800"
                : "focus:ring-offset-gray-50"
            } ${
              !newMsg.trim()
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 active:scale-95"
            }`} // Themed button
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Add scrollbar-thin styles globally or via Tailwind plugin if needed */}
      <style>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: ${isDarkMode
            ? "#4B5563 #1F2937"
            : "#9CA3AF #F9FAFB"}; /* thumb track */
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: ${isDarkMode ? "#1F2937" : "#F9FAFB"}; /* track */
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: ${isDarkMode ? "#4B5563" : "#9CA3AF"}; /* thumb */
          border-radius: 4px;
          border: 2px solid ${isDarkMode ? "#1F2937" : "#F9FAFB"}; /* creates padding around thumb */
        }
      `}</style>
    </div>
  );
};

export default ChatBox;
