// src/services/registrationApi.ts

import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim() || "";
const apiBaseUrl = configuredApiUrl.replace(/\/Auth\/?$/, "");

const API = axios.create({
  baseURL: apiBaseUrl || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface CreateEmployeeRequest {
    fullName: string;
    email: string;
    mobile: string;
    roleId: number;
    departmentId: number;
    employeeCode: string;
    designationId: number;
    reportingManagerId: number;
    locationId: number;
}


export interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
    error?: string;
    statusCode?: number;
}

export const createEmployee = async (
    employeeData: CreateEmployeeRequest
): Promise<ApiResponse> => {
    try {
        console.log("Sending request to:", `${apiBaseUrl || "/api"}/Admin/create-employee`);
        console.log("Request payload:", JSON.stringify(employeeData, null, 2));

        const token = localStorage.getItem("authToken") || localStorage.getItem("auth");
        const response = await API.post("/Admin/create-employee", employeeData, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });

        console.log("Response status:", response.status);
        console.log("Response data:", JSON.stringify(response.data, null, 2));

        return {
            success: true,
            message: response.data?.message || "Employee created successfully",
            data: response.data,
            statusCode: response.status,
        };
    } catch (error) {
        console.error("API Error:", error);
        const axiosError = error as any;
        const statusCode = axiosError?.response?.status ?? 0;
        const responseData = axiosError?.response?.data;
        console.error("Create employee response status:", statusCode);
        console.error("Create employee response data:", responseData);
        const validationErrors = responseData?.errors;
        const validationMessage =
            validationErrors && typeof validationErrors === "object"
                ? Object.values(validationErrors).flat().join("\n")
                : null;
        const errorMessage =
            validationMessage ||
            responseData?.message ||
            responseData?.title ||
            axiosError?.message ||
            "Unknown error";

        return {
            success: false,
            message: errorMessage,
            error: errorMessage,
            statusCode,
        };
    }
};

export const registrationApi = {
    createEmployee,
};
