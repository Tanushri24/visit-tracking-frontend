// src/services/Userlist.ts
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://192.168.29.8:8080';

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

export interface UserSearchByIdParams {
  id: number | string;
}

export interface UpdateUserPayload {
  employeeCode?: string | null;
  fullName?: string;
  email?: string;
  mobile?: string;
  roleId?: number;
  designationId?: number;
  departmentId?: number;
  managerId?: number | null;
  locationId?: number | null;
  isActive?: boolean;
}

export interface CreateUserPayload extends Partial<ApiUser> {}

export interface NormalizedApiError {
  message: string;
  status?: number;
  details?: unknown;
}

// Maps for dropdown data
let designationsMap: Map<number, string> = new Map();
let departmentsMap: Map<number, string> = new Map();
let managersMap: Map<number, string> = new Map();
let locationsMap: Map<number, string> = new Map();
let rolesMap: Map<number, string> = new Map();
let reportingManagersMap: Map<number, string> = new Map();

export const initializeMappings = (
  designations: Array<{ id: number; name: string }>,
  departments: Array<{ id: number; name: string }>,
  managers: Array<{ id: number; name: string }>,
  locations: Array<{ id: number; name: string }>,
  roles: Array<{ id: number; name: string }>,
  reportingManagers?: Array<{ id: number; name: string }>
) => {
  designationsMap = new Map(designations.map(d => [d.id, d.name]));
  departmentsMap = new Map(departments.map(d => [d.id, d.name]));
  managersMap = new Map(managers.map(m => [m.id, m.name]));
  locationsMap = new Map(locations.map(l => [l.id, l.name]));
  rolesMap = new Map(roles.map(r => [r.id, r.name]));
  reportingManagersMap = new Map((reportingManagers ?? []).map(r => [r.id, r.name]));
};

export const transformApiUser = (apiUser: ApiUser): User => {
  const reportingFallback =
    apiUser.managerId ? reportingManagersMap.get(apiUser.managerId) : undefined;

  return {
    id: apiUser.id,
    employeeCode: apiUser.employeeCode || `EMP${apiUser.id}`,
    fullName: apiUser.fullName,
    email: apiUser.email,
    mobile: apiUser.mobile,
    designation: designationsMap.get(apiUser.designationId) || 'Not Assigned',
    department: departmentsMap.get(apiUser.departmentId) || 'Not Assigned',
    role: rolesMap.get(apiUser.roleId) || 'User',
    reportingManager: apiUser.managerId
      ? managersMap.get(apiUser.managerId) || reportingManagersMap.get(apiUser.managerId) || 'Not Assigned'
      : 'Not Assigned',
    location: apiUser.locationId
      ? locationsMap.get(apiUser.locationId) || 'Not Assigned'
      : reportingFallback || 'Not Assigned',
    isActive: apiUser.isActive
  };
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const normalizeApiError = (error: unknown): NormalizedApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return {
      message:
        axiosError.response?.data?.message ||
        axiosError.message ||
        'Something went wrong while communicating with the server.',
      status: axiosError.response?.status,
      details: axiosError.response?.data
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message
    };
  }

  return {
    message: 'An unexpected error occurred.',
    details: error
  };
};

const handleRequestError = (error: unknown): never => {
  const normalizedError = normalizeApiError(error);
  console.error(normalizedError.message, normalizedError.details ?? error);
  throw new Error(normalizedError.message);
};

const getValidUserId = (id: number | string): number => {
  const parsedId = typeof id === 'string' ? Number(id.trim()) : id;

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw new Error('A valid user ID is required.');
  }

  return parsedId;
};

const request = async <T>(config: {
  method: 'get' | 'post' | 'put' | 'delete';
  url: string;
  data?: unknown;
}): Promise<T> => {
  try {
    const response = await axiosInstance.request<T>({
      method: config.method,
      url: config.url,
      data: config.data
    });

    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

// GET all users
export const fetchUsers = async (): Promise<User[]> => {
  const users = await request<ApiUser[]>({
    method: 'get',
    url: '/api/Admin/users'
  });

  return Array.isArray(users) ? users.map(transformApiUser) : [];
};

// GET single user by ID
export const fetchUserById = async (params: UserSearchByIdParams | number): Promise<ApiUser | null> => {
  const id = typeof params === 'number' ? params : getValidUserId(params.id);
  const user = await request<ApiUser | null>({
    method: 'get',
    url: `/api/Admin/user/${id}`
  });

  if (!user || typeof user !== 'object' || Object.keys(user).length === 0) {
    return null;
  }

  return user;
};

// CREATE new user
export const createUser = async (userData: CreateUserPayload): Promise<ApiUser> => {
  return request<ApiUser>({
    method: 'post',
    url: '/api/Admin/users',
    data: userData
  });
};

// UPDATE user – uses PUT /api/Admin/user/{id}
export const updateUser = async (id: number | string, userData: UpdateUserPayload): Promise<ApiUser> => {
  const validId = getValidUserId(id);

  return request<ApiUser>({
    method: 'put',
    url: `/api/Admin/user/${validId}`,
    data: userData
  });
};

// DELETE user
export const deleteUser = async (id: number | string): Promise<void> => {
  const validId = getValidUserId(id);

  await request<void>({
    method: 'delete',
    url: `/api/Admin/user/${validId}`
  });
};