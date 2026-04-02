import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.29.8:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || localStorage.getItem("authToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export type ContactPerson = {
  id: number;
  companyId: number;
  organisationId: number;
  departmentId: number;
  name: string;
  designation: string;
  mobile: string;
  email: string;
  remark: string;
  isActive: boolean;
};

export type ContactPersonPayload = Omit<ContactPerson, "id">;

export type CompanyOption = {
  id: number;
  companyName: string;
  isActive?: boolean;
};

export type OrganisationOption = {
  id: number;
  organisationName: string;
  companyId: number;
  isActive?: boolean;
};

export type DepartmentOption = {
  id: number;
  departmentName: string;
  organisationId: number;
  isActive?: boolean;
};

export const contactService = {
  getAll: async () => {
    return await API.get("/Contactperson");
  },

  create: async (data: ContactPersonPayload) => {
    return await API.post("/Contactperson", data);
  },

  update: async (id: number, data: ContactPersonPayload & { id?: number }) => {
    return await API.put(`/Contactperson/${id}`, data);
  },

  getCompanies: async () => {
    const res = await API.get<CompanyOption[]>("/Company");
    return res.data ?? [];
  },

  getOrganisations: async () => {
    const res = await API.get<OrganisationOption[]>("/Organisation");
    return res.data ?? [];
  },

  getDepartments: async () => {
    const res = await API.get<DepartmentOption[]>("/Department");
    return res.data ?? [];
  },
};
