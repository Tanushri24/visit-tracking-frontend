// src/services/department.service.ts
import axios from "axios";

const API_BASE_URL = "http://192.168.29.8:8080/api/Department";

export interface DepartmentPayload {
  id: number;
  departmentName: string;
  organisationId: number;
}

export interface Department {
  id: number;
  departmentName: string;
  organisationId: number;
  createdAt: string;
  updatedAt: string;
}

// GET all departments
export const getDepartments = async (): Promise<Department[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

// CREATE new department
export const createDepartment = async (data: DepartmentPayload): Promise<Department> => {
  const response = await axios.post(API_BASE_URL, data);
  return response.data;
};

// ✅ UPDATE existing department
export const updateDepartment = async (id: number, data: Partial<DepartmentPayload>): Promise<Department> => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, data);
  return response.data;
};