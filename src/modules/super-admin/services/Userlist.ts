import axios from 'axios';

const API_BASE_URL = '';

export interface ApiUser {
  id: number;
  employeeCode: string | null;
  fullName: string;
  email: string;
  mobile: string;
  roleId: number;
  designationId: number;
  departmentId: number;
  managerId: number | null;
  locationId: number | null;
  isActive: boolean;
}

export interface User {
  id: number;
  employeeCode: string;
  fullName: string;
  email: string;
  mobile: string;
  designation: string;
  department: string;
  role: string;
  reportingManager: string;
  location: string;
  isActive: boolean;
}

// Store dropdown data for mapping
let designationsMap: Map<number, string> = new Map();
let departmentsMap: Map<number, string> = new Map();
let managersMap: Map<number, string> = new Map();
let locationsMap: Map<number, string> = new Map();
let rolesMap: Map<number, string> = new Map();

// Initialize maps with dropdown data
export const initializeMappings = (
  designations: Array<{ id: number; name: string }>,
  departments: Array<{ id: number; name: string }>,
  managers: Array<{ id: number; name: string }>,
  locations: Array<{ id: number; name: string }>,
  roles: Array<{ id: number; name: string }>
) => {
  designationsMap = new Map(designations.map(d => [d.id, d.name]));
  departmentsMap = new Map(departments.map(d => [d.id, d.name]));
  managersMap = new Map(managers.map(m => [m.id, m.name]));
  locationsMap = new Map(locations.map(l => [l.id, l.name]));
  rolesMap = new Map(roles.map(r => [r.id, r.name]));
};

// Transform API user data to frontend user format
export const transformApiUser = (apiUser: ApiUser): User => {
  return {
    id: apiUser.id,
    employeeCode: apiUser.employeeCode || `EMP${apiUser.id}`,
    fullName: apiUser.fullName,
    email: apiUser.email,
    mobile: apiUser.mobile,
    designation: designationsMap.get(apiUser.designationId) || 'Not Assigned',
    department: departmentsMap.get(apiUser.departmentId) || 'Not Assigned',
    role: rolesMap.get(apiUser.roleId) || 'User',
    reportingManager: apiUser.managerId ? managersMap.get(apiUser.managerId) || 'Not Assigned' : 'Not Assigned',
    location: apiUser.locationId ? locationsMap.get(apiUser.locationId) || 'Not Assigned' : 'Not Assigned',
    isActive: apiUser.isActive
  };
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get<ApiUser[]>('/api/Admin/users');
    
    if (response.data && Array.isArray(response.data)) {
      return response.data.map(transformApiUser);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fetch single user by ID for edit
export const fetchUserById = async (id: number): Promise<ApiUser> => {
  try {
    const response = await axiosInstance.get<ApiUser>(`/api/Admin/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

// Create new user
export const createUser = async (userData: Partial<ApiUser>): Promise<ApiUser> => {
  try {
    const response = await axiosInstance.post<ApiUser>('/api/Admin/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update user
export const updateUser = async (id: number, userData: Partial<ApiUser>): Promise<ApiUser> => {
  try {
    const response = await axiosInstance.put<ApiUser>(`/api/Admin/user/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/Admin/user/${id}`);
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};