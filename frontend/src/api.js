import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

// Add token automatically if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ---------- API Calls ---------- //
export const submitApplicant = (formData) =>
  API.post("/students", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const adminLogin = (credentials) =>
  API.post("/admin/login", credentials);

export const fetchApplicants = () => API.get("/students");
