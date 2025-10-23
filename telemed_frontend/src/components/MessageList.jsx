export default function MessageList({ messages }) {
  if (!messages.length) return <p>No messages yet.</p>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "6px", maxHeight: "300px", overflowY: "auto" }}>
      {messages.map((msg) => (
        <div key={msg._id} style={{ marginBottom: "8px" }}>
          <strong>{msg.role === "doctor" ? "Doctor" : " Patient"}:</strong>
          <span> {msg.content}</span>
          <div style={{ fontSize: "0.8em", color: "gray" }}>
            {new Date(msg.timestamp).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
