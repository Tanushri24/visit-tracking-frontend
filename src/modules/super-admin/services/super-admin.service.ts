// src/modules/super-admin/superadmin.service.ts

// ContactPerson / SuperAdmin API calls from frontend
import axios from "axios";

const API_BASE = "https://localhost:7146/api"; // your backend URL

export const superAdminService = {
  getDashboard: () => axios.get(`${API_BASE}/superadmin/dashboard`),
  getUsers: (page = 1, limit = 10) =>
    axios.get(`${API_BASE}/superadmin/users?page=${page}&limit=${limit}`),
  updateUser: (id: string, data: any) =>
    axios.put(`${API_BASE}/superadmin/users/${id}`, data),
  deleteUser: (id: string) => axios.delete(`${API_BASE}/superadmin/users/${id}`),
};