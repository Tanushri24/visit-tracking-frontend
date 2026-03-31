import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7146/api",
  headers: {
    "Content-Type": "application/json"
  }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getDepartments = async () => {
  const res = await API.get("/Department");
  return res.data;
};

export const createDepartment = async (data: { departmentName: string; organisationId: number; isActive?: boolean }) => {
  const res = await API.post("/Department", data);
  return res.data;
};

export const updateDepartment = async (id: number, data: any) => {
  const res = await API.put(`/Department/${id}`, data);
  return res.data;
};

export const deleteDepartment = async (id: number) => {
  const res = await API.delete(`/Department/${id}`);
  return res.data;
};
