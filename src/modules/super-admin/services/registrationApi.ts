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

export interface LookupOption {
    id: number;
    name: string;
}

export interface ManagerOption extends LookupOption {
    email: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
    error?: string;
    statusCode?: number;
}

const getAuthHeaders = () => {
    const token =
        localStorage.getItem("authToken") ||
        localStorage.getItem("auth") ||
        localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

const extractArrayPayload = (payload: unknown): any[] => {
    if (Array.isArray(payload)) {
        return payload;
    }

    if (payload && typeof payload === "object") {
        const candidates = [
            (payload as any).data,
            (payload as any).items,
            (payload as any).result,
            (payload as any).results,
            (payload as any).value,
        ];

        for (const candidate of candidates) {
            if (Array.isArray(candidate)) {
                return candidate;
            }
        }
    }

    return [];
};

const fetchFirstMatchingList = async <T>(
    endpoints: string[],
    mapper: (item: any) => T | null
): Promise<T[]> => {
    let lastError: unknown = null;

    for (const endpoint of endpoints) {
        try {
            const response = await API.get(endpoint, {
                headers: getAuthHeaders(),
            });

            const rawItems = extractArrayPayload(response.data);
            const mappedItems = rawItems
                .map(mapper)
                .filter((item): item is T => item !== null);

            if (mappedItems.length > 0 || rawItems.length === 0) {
                return mappedItems;
            }
        } catch (error) {
            lastError = error;
            const status = (error as any)?.response?.status;
            if (status && status !== 404) {
                break;
            }
        }
    }

    throw lastError ?? new Error("Unable to fetch lookup data");
};

export const getDepartments = async (): Promise<LookupOption[]> => {
    return fetchFirstMatchingList(
        ["/Department", "/department"],
        (item) => {
            const id = Number(item?.id ?? item?.departmentId);
            const name = item?.departmentName ?? item?.name;

            if (!id || !name) {
                return null;
            }

            return { id, name: String(name) };
        }
    );
};

export const getDesignations = async (): Promise<LookupOption[]> => {
    return fetchFirstMatchingList(
        ["/Designation", "/designation"],
        (item) => {
            const id = Number(item?.id ?? item?.designationId);
            const name = item?.designationName ?? item?.name;

            if (!id || !name) {
                return null;
            }

            return { id, name: String(name) };
        }
    );
};

export const getLocations = async (): Promise<LookupOption[]> => {
    return fetchFirstMatchingList(
        ["/Location", "/location"],
        (item) => {
            const id = Number(item?.id ?? item?.locationId);
            const name = item?.locationName ?? item?.name;

            if (!id || !name) {
                return null;
            }

            return {
                id,
                name: item?.city ? `${name} (${item.city})` : String(name),
            };
        }
    );
};

export const getManagers = async (): Promise<ManagerOption[]> => {
    return fetchFirstMatchingList(
        ["/Employee", "/employee", "/Admin/employees", "/Admin/get-employees", "/User", "/Users"],
        (item) => {
            const id = Number(item?.id ?? item?.userId ?? item?.employeeId);
            const name =
                item?.name ??
                item?.fullName ??
                item?.employeeName ??
                item?.reportingManagerName;

            if (!id || !name) {
                return null;
            }

            return {
                id,
                name: String(name),
                email: String(item?.email ?? item?.emailId ?? ""),
            };
        }
    );
};

export const createEmployee = async (
    employeeData: CreateEmployeeRequest
): Promise<ApiResponse> => {
    try {
        console.log("Sending request to:", `${apiBaseUrl || "/api"}/Admin/create-employee`);
        console.log("Request payload:", JSON.stringify(employeeData, null, 2));

        const response = await API.post("/Admin/create-employee", employeeData, {
            headers: getAuthHeaders(),
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
            (typeof responseData === "string"
                ? responseData
                : responseData && typeof responseData === "object"
                    ? JSON.stringify(responseData)
                    : null) ||
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
    getDepartments,
    getDesignations,
    getLocations,
    getManagers,
};
