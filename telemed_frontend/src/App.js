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

  return (
    <div style={{ width: "500px", margin: "20px auto", textAlign: "center" }}>
      <h2>🩺 Telemed Consultation Chat</h2>

      <input
        style={{ marginBottom: "10px" }}
        placeholder="Consultation ID"
        value={consultationId}
        onChange={(e) => setConsultationId(e.target.value)}
      />

      <RoleFilter role={role} setRole={setRole} />

      <button
        onClick={fetchMessages}
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          padding: "5px 15px",
          cursor: "pointer",
        }}
      >
        Show Messages
      </button>

      <MessageList messages={messages} />
    </div>
  );
}
