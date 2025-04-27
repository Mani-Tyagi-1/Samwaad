import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

// Ensure this matches your backend server address
const SOCKET_SERVER_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // For fetching messages

// Create socket instance outside the hook to prevent multiple connections
// Add reconnection options for better stability
const socket: Socket = io(SOCKET_SERVER_URL, {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ["websocket"], // Prefer WebSocket
  // auth: { token: "your_auth_token_if_needed" } // Add auth if your backend requires it
});

interface Message {
  _id?: string; // Optional: ID from MongoDB
  text: string;
  senderId: string;
  timestamp: string;
  roomId: string;
}

export const useChat = (roomId: string, userId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial messages for the room
  const fetchMessages = useCallback(async () => {
    if (!roomId) return;
    setIsLoading(true);
    setError(null);
    console.log(`Fetching messages for room: ${roomId}`);
    try {
      // Use VITE_API_URL if set, otherwise default
      const response = await fetch(`${API_BASE_URL}/messages/${roomId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.statusText}`);
      }
      const data: Message[] = await response.json();
      console.log("Fetched messages:", data);
      setMessages(data); // Set fetched messages (already sorted by backend)
    } catch (err: any) {
      console.error("Error fetching messages:", err);
      setError(err.message || "Could not load previous messages.");
      setMessages([]); // Clear messages on error
    } finally {
      setIsLoading(false);
    }
  }, [roomId]); // Dependency on roomId

  useEffect(() => {
    // Socket connection listeners
    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
      // Join room *after* connection is confirmed
      socket.emit("join", { roomId });
      console.log(`Socket joining room: ${roomId}`);
    };

    const handleDisconnect = (reason: string) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
    };

    const handleConnectError = (err: Error) => {
      console.error("Socket connection error:", err.message);
      // Maybe show an error to the user
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);

    // Listener for incoming messages
    const handleReceiveMessage = (message: Message) => {
      console.log("Received message:", message);
      // Prevent adding duplicate messages if sender is the current user
      // (Backend emits to room, including sender, so sender gets it back)
      // Check if message already exists locally (using _id if available, or a simple check)
      setMessages((prev) => {
        // If the incoming message has an ID and it's already in the list, don't add again
        if (message._id && prev.some((m) => m._id === message._id)) {
          return prev;
        }
        // If it's a message sent by the current user *without* an ID yet (optimistic update),
        // and the incoming message matches it and *has* an ID, update the local one? (More complex logic needed)
        // For simplicity now, just add if not already present by ID.
        // A simple check: if the last message is identical text/sender/room, maybe skip (less reliable)
        if (prev.length > 0) {
          const lastMsg = prev[prev.length - 1];
          if (
            !lastMsg._id &&
            lastMsg.text === message.text &&
            lastMsg.senderId === message.senderId &&
            lastMsg.roomId === message.roomId
          ) {
            // Likely the confirmation of the optimistically added message, potentially update it with _id
            // For now, let's prevent adding it again if it looks like the last one we added optimistically
            // return prev; // This might hide legitimate duplicate sends, be careful.
            // A better approach uses temporary IDs for optimistic updates.
          }
        }

        return [...prev, message];
      });
    };

    socket.on("receiveMessage", handleReceiveMessage);

    // Fetch initial messages when roomId changes or connection established
    if (isConnected && roomId) {
      fetchMessages();
    } else if (!isConnected && socket.active) {
      // If not connected but socket is trying, wait for 'connect' event
      console.log("Waiting for socket connection to fetch messages...");
    } else if (!socket.active) {
      // If socket isn't even trying to connect, attempt connection
      console.log("Socket not active, attempting to connect...");
      socket.connect();
    }

    // Cleanup function
    return () => {
      console.log(`Socket leaving room: ${roomId}`);
      socket.emit("leave", { roomId }); // Good practice to explicitly leave room
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
      socket.off("receiveMessage", handleReceiveMessage);
      // Do NOT disconnect the socket here if it's shared globally
      // socket.disconnect();
    };
  }, [roomId, userId, fetchMessages, isConnected]); // Add dependencies

  const sendMessage = () => {
    if (!newMsg.trim() || !isConnected) {
      console.warn(
        "Cannot send message: Input is empty or socket not connected."
      );
      return;
    }
    const messageData: Message = {
      roomId,
      text: newMsg,
      senderId: userId,
      timestamp: new Date().toISOString(),
    };

    console.log("Sending message:", messageData);
    socket.emit("sendMessage", messageData); // Send message object directly

    // Optimistic UI update: Add message immediately to local state
    // Note: Backend response (`receiveMessage`) might contain the `_id` from DB.
    // You might want more complex logic to replace the optimistic message with the confirmed one.
    setMessages((prev) => [...prev, messageData]);

    setNewMsg(""); // Clear input field
  };

  return {
    messages,
    newMsg,
    setNewMsg,
    sendMessage,
    isConnected,
    isLoading,
    error,
  };
};
