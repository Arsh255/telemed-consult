import { useState } from "react";
import { getMessages, postMessage } from "./api";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import RoleFilter from "./components/RoleFilter";

export default function App() {
  const [consultationId, setConsultationId] = useState("CONSULT_001");
  const [messages, setMessages] = useState([]);
  const [role, setRole] = useState("all");

  const fetchMessages = async () => {
    if (!consultationId) {
      alert("Please enter a Consultation ID first");
      return;
    }
    try {
      const res = await getMessages(consultationId, role);
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error(err);
      alert("No messages found for this consultation.");
      setMessages([]);
    }
  };

  const handleSend = async (msg) => {
    try {
      await postMessage(msg);
      fetchMessages();
    } catch (err) {
      alert("Failed to send message");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        backgroundColor: "#f9fafb",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <h2 style={{ color: "#1e3a8a", marginBottom: "20px" }}>
        Telemed Consultation Chat
      </h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          style={{
            padding: "10px",
            width: "70%",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
          placeholder="Enter Consultation ID"
          value={consultationId}
          onChange={(e) => setConsultationId(e.target.value)}
        />

        <button
          onClick={fetchMessages}
          style={{
            padding: "10px 18px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Show Messages
        </button>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <RoleFilter role={role} setRole={setRole} />
      </div>

      <div
        style={{
          height: "300px",
          overflowY: "auto",
          background: "white",
          borderRadius: "8px",
          border: "1px solid #ddd",
          padding: "15px",
        }}
      >
        <MessageList messages={messages} />
      </div>

      <div style={{ marginTop: "25px" }}>
        <h4 style={{ marginBottom: "10px", color: "#1e3a8a" }}>
          Send a New Message
        </h4>
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
