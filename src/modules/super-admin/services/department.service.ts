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
export const createDepartment = async (
  data: DepartmentPayload
): Promise<Department> => {
  const response = await axios.post(API_BASE_URL, data);
  return response.data;
};