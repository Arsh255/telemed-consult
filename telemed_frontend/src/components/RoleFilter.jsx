export default function RoleFilter({ role, setRole }) {
  return (
    <div>
      <label>Filter by role: </label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="all">All</option>
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
      </select>
    </div>
  );
}
