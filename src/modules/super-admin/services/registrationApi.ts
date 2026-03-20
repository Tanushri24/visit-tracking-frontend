// src/services/registrationApi.ts

const API_BASE_URL = 'http://192.168.29.8:8080/api';

export interface CreateEmployeeRequest {
    fullName: string;
    email: string;
    mobile: string;
    roleId: number;
    designationId: number;
    departmentId: number;
    reportingManagerId: number;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
    error?: string;
    statusCode?: number;
}

export const registrationApi = {
    /**
     * Create a new employee user
     * @param employeeData - Employee data to create
     * @returns Promise with API response
     */
    createEmployee: async (employeeData: CreateEmployeeRequest): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${API_BASE_URL}/controller/create-user-by-admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any authentication headers if required
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(employeeData),
            });

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message: data.message || 'Failed to create employee',
                    error: data.error || 'Unknown error occurred',
                    statusCode: response.status
                };
            }

            return {
                success: true,
                message: 'Employee created successfully',
                data: data,
                statusCode: response.status
            };
        } catch (error) {
            console.error('API Error:', error);
            return {
                success: false,
                message: 'Network error occurred. Please check your connection.',
                error: error instanceof Error ? error.message : 'Unknown error',
                statusCode: 0
            };
        }
    }
};

// Export a convenience function
export const createEmployee = async (employeeData: CreateEmployeeRequest): Promise<ApiResponse> => {
    return registrationApi.createEmployee(employeeData);
};