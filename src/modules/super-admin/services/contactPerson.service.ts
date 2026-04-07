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
    try {
      const res = await API.get("/Company");
      console.log("Company API:", res.data);
      return res.data ?? [];
    } catch (error) {
      console.error("Error fetching companies:", error);
      return [];
    }
  },

  getOrganisations: async () => {
  try {
    const res = await API.get("/Organisation");
    console.log("Organisation API:", res.data);

    return res.data?.data ?? res.data ?? [];
  } catch (error) {
    console.error("Error fetching organisations:", error);
    return [];
  }
},

  getDepartments: async () => {
    try {
      const res = await API.get("/Department");
      console.log("Department API:", res.data);
      return res.data ?? [];
    } catch (error) {
      console.error("Error fetching departments:", error);
      return [];
    }
  }
};

