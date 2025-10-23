import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getMessages = async (consultationId, role) => {
  let url = `/consultations/${consultationId}/messages`;
  if (role && role !== "all") url += `?role=${role}`;
  return api.get(url);
};

export const postMessage = async (data) => api.post("/messages", data);
