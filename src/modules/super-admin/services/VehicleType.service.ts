// src/services/VehicleType.service.ts
import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim() || "";
const apiBaseUrl = configuredApiUrl.replace(/\/Auth\/?$/, "");

const API = axios.create({
  baseURL: apiBaseUrl || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

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

export interface VehicleTypeRequest {
  vehicleName: string;
  defaultRatePerKm: number;
  isActive: boolean;
}

export interface VehicleTypeResponse {
  id: number;
  vehicleName: string;
  defaultRatePerKm: number;
  isActive: boolean;
  created_at?: string;
  updated_at?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
  statusCode?: number;
}

// Get all vehicle types
export const getVehicleTypes = async (): Promise<VehicleTypeResponse[]> => {
  try {
    const response = await API.get("/VehicleType", {
      headers: getAuthHeaders(),
    });

    console.log("Vehicle types response:", response.data);

    // Handle different response formats
    let vehicleTypes: VehicleTypeResponse[] = [];
    if (Array.isArray(response.data)) {
      vehicleTypes = response.data;
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      vehicleTypes = response.data.data;
    } else if (response.data?.items && Array.isArray(response.data.items)) {
      vehicleTypes = response.data.items;
    } else if (response.data?.result && Array.isArray(response.data.result)) {
      vehicleTypes = response.data.result;
    }

    return vehicleTypes.map((vt: any) => ({
      id: vt.id,
      vehicleName: vt.vehicleName,
      defaultRatePerKm: vt.defaultRatePerKm || vt.defaultRate,
      isActive: vt.isActive ?? vt.status === "active",
      created_at: vt.created_at || vt.createdAt,
      updated_at: vt.updated_at || vt.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching vehicle types:", error);
    throw error;
  }
};

// Create new vehicle type
export const createVehicleType = async (
  vehicleData: VehicleTypeRequest
): Promise<ApiResponse> => {
  try {
    console.log("Creating vehicle type:", vehicleData);

    const response = await API.post("/VehicleType", vehicleData, {
      headers: getAuthHeaders(),
    });

    console.log("Create vehicle type response:", response.data);

    return {
      success: true,
      message: response.data?.message || "Vehicle type created successfully",
      data: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    console.error("API Error:", error);
    const axiosError = error as any;
    const statusCode = axiosError?.response?.status ?? 0;
    const responseData = axiosError?.response?.data;

    const errorMessage =
      responseData?.message ||
      responseData?.title ||
      (typeof responseData === "string" ? responseData : null) ||
      axiosError?.message ||
      "Failed to create vehicle type";

    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
      statusCode,
    };
  }
};

// // Delete vehicle type
// export const deleteVehicleType = async (id: number): Promise<ApiResponse> => {
//   try {
//     const response = await API.delete(`/VehicleType/${id}`, {
//       headers: getAuthHeaders(),
//     });

//     return {
//       success: true,
//       message: "Vehicle type deleted successfully",
//       data: response.data,
//       statusCode: response.status,
//     };
//   } catch (error) {
//     console.error("API Error:", error);
//     const axiosError = error as any;
//     const statusCode = axiosError?.response?.status ?? 0;
//     const responseData = axiosError?.response?.data;

//     const errorMessage =
//       responseData?.message ||
//       responseData?.title ||
//       (typeof responseData === "string" ? responseData : null) ||
//       axiosError?.message ||
//       "Failed to delete vehicle type";

//     return {
//       success: false,
//       message: errorMessage,
//       error: errorMessage,
//       statusCode,
//     };
//   }
// };

// Update vehicle type
export const updateVehicleType = async (
  id: number,
  vehicleData: Partial<VehicleTypeRequest>
): Promise<ApiResponse> => {
  try {
    const response = await API.put(`/VehicleType/${id}`, vehicleData, {
      headers: getAuthHeaders(),
    });

    return {
      success: true,
      message: "Vehicle type updated successfully",
      data: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    console.error("API Error:", error);
    const axiosError = error as any;
    const statusCode = axiosError?.response?.status ?? 0;
    const responseData = axiosError?.response?.data;

    const errorMessage =
      responseData?.message ||
      responseData?.title ||
      (typeof responseData === "string" ? responseData : null) ||
      axiosError?.message ||
      "Failed to update vehicle type";

    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
      statusCode,
    };
  }
};