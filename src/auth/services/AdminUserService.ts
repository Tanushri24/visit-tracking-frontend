import BaseApiService from "./BaseApiService";

const api = new BaseApiService();

export interface CreateUserByAdminDto {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  // roleId: number;
  designationId: number;
  departmentId: number;
  reportingManagerId?: number;
  locationId?: number;
  employeeCode?: string;
  joiningDate?: string;
  isActive: boolean;
}

export const createUserByAdmin = (data: CreateUserByAdminDto) => {
  // Uses the API endpoint requested by the user
  return api.post("/controller/create-user-by-admin", data);
};