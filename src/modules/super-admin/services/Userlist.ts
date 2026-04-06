import axios from 'axios';

const API_BASE_URL = ''; // Your API base URL

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

// Mapping for IDs to names
const roleMapping: Record<number, string> = {
  1: 'Admin',
  2: 'Manager',
  3: 'User'
};

const designationMapping: Record<number, string> = {
  1: 'Sales Executive',
  2: 'Team Lead',
  3: 'Regional Manager',
  4: 'Software Developer',
  5: 'HR Manager',
  6: 'Marketing Executive',
  7: 'Finance Manager'
};

const departmentMapping: Record<number, string> = {
  1: 'Sales',
  2: 'Marketing',
  3: 'IT',
  4: 'HR',
  5: 'Finance',
  6: 'Operations',
  12: 'Technology'
};

const managerMapping: Record<number, string> = {
  1: 'Amit Verma',
  2: 'Neha Kapoor',
  3: 'Rajesh Kumar',
  4: 'Priya Singh',
  5: 'Super Admin',
  6: 'Vikram Sharma'
};

const locationMapping: Record<number, string> = {
  1: 'Mumbai',
  2: 'Delhi',
  3: 'Bangalore',
  4: 'Pune',
  5: 'Hyderabad',
  6: 'Chennai',
  7: 'Kolkata'
};

// Transform API user data to frontend user format
export const transformApiUser = (apiUser: ApiUser): User => {
  return {
    id: apiUser.id,
    employeeCode: apiUser.employeeCode || `EMP${apiUser.id}`,
    fullName: apiUser.fullName,
    email: apiUser.email,
    mobile: apiUser.mobile,
    designation: designationMapping[apiUser.designationId] || 'Not Assigned',
    department: departmentMapping[apiUser.departmentId] || 'Not Assigned',
    role: roleMapping[apiUser.roleId] || 'User',
    reportingManager: apiUser.managerId ? managerMapping[apiUser.managerId] || 'Not Assigned' : 'Not Assigned',
    location: apiUser.locationId ? locationMapping[apiUser.locationId] || 'Not Assigned' : 'Not Assigned',
    isActive: apiUser.isActive
  };
};

// Create axios instance
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

// Update user - Using PUT to /api/Admin/user/{id}
export const updateUser = async (id: number, userData: Partial<ApiUser>): Promise<ApiUser> => {
  try {
    const response = await axiosInstance.put<ApiUser>(`/api/Admin/user/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

// Delete user - Using DELETE to /api/Admin/user/{id}
export const deleteUser = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/Admin/user/${id}`);
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};