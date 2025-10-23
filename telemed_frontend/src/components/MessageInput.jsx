import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [consultationId, setConsultationId] = useState("");
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("patient");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consultationId || !author || !content) return alert("All fields are required");
    onSend({ consultation_id: consultationId, author, role, content });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <input placeholder="Consultation ID" value={consultationId} onChange={(e) => setConsultationId(e.target.value)} />
      <input placeholder="Author ID" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>
      <input placeholder="Message" value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}
