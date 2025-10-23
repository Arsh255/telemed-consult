import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [consultationId, setConsultationId] = useState("");
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("patient");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consultationId || !author || !content)
      return alert("All fields are required");
    onSend({ consultation_id: consultationId, author, role, content });
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "#f3f4f6",
        padding: "15px",
        borderRadius: "10px",
        border: "1px solid #e5e7eb",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Consultation ID"
          value={consultationId}
          onChange={(e) => setConsultationId(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          placeholder="Author ID"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            padding: "8px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            flex: "0.5",
          }}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        <input
          type="text"
          placeholder="Type your message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            flex: 1.5,
            padding: "8px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "background-color 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1e40af")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
        >
          Send
        </button>
      </div>
    </form>
  );
}
