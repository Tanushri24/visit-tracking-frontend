// src/services/ExpenseRate.service.ts
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

export interface ExpenseRateRequest {
  vehicleTypeId: number;
  ratePerKm: number;
  effectiveFrom: string;
  effectiveTo: string;
  isActive: boolean;
}

export interface ExpenseRateResponse {
  id: number;
  vehicleTypeId: number;
  vehicleTypeName?: string;
  ratePerKm: number;
  effectiveFrom: string;
  effectiveTo: string;
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

// Get all expense rates (GET /api/Expenserate)
export const getExpenseRates = async (): Promise<ExpenseRateResponse[]> => {
  try {
    const response = await API.get("/Expenserate", {
      headers: getAuthHeaders(),
    });

    console.log("Expense rates response:", response.data);

    // Handle different response formats
    let expenseRates: ExpenseRateResponse[] = [];
    if (Array.isArray(response.data)) {
      expenseRates = response.data;
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      expenseRates = response.data.data;
    } else if (response.data?.items && Array.isArray(response.data.items)) {
      expenseRates = response.data.items;
    } else if (response.data?.result && Array.isArray(response.data.result)) {
      expenseRates = response.data.result;
    }

    return expenseRates.map((er: any) => ({
      id: er.id,
      vehicleTypeId: er.vehicleTypeId,
      vehicleTypeName: er.vehicleTypeName || er.vehicleType?.name,
      ratePerKm: er.ratePerKm,
      effectiveFrom: er.effectiveFrom,
      effectiveTo: er.effectiveTo,
      isActive: er.isActive ?? er.status === "active",
      created_at: er.created_at || er.createdAt,
      updated_at: er.updated_at || er.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching expense rates:", error);
    throw error;
  }
};

// Create new expense rate (POST /api/Expenserate)
export const createExpenseRate = async (
  expenseData: ExpenseRateRequest
): Promise<ApiResponse> => {
  try {
    console.log("Creating expense rate:", expenseData);

    const response = await API.post("/Expenserate", expenseData, {
      headers: getAuthHeaders(),
    });

    console.log("Create expense rate response:", response.data);

    return {
      success: true,
      message: response.data?.message || "Expense rate created successfully",
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
      "Failed to create expense rate";

    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
      statusCode,
    };
  }
};

// // Delete expense rate by ID (DELETE /api/Expenserate/{id})
// export const deleteExpenseRate = async (id: number): Promise<ApiResponse> => {
//   try {
//     console.log(`Deleting expense rate with ID: ${id}`);
    
//     const response = await API.delete(`/Expenserate/${id}`, {
//       headers: getAuthHeaders(),
//     });

//     console.log("Delete expense rate response:", response.data);

//     return {
//       success: true,
//       message: response.data?.message || "Expense rate deleted successfully",
//       data: response.data,
//       statusCode: response.status,
//     };
//   } catch (error) {
//     console.error("API Error deleting expense rate:", error);
//     const axiosError = error as any;
//     const statusCode = axiosError?.response?.status ?? 0;
//     const responseData = axiosError?.response?.data;

//     let errorMessage = "";
    
//     if (statusCode === 404) {
//       errorMessage = "Expense rate not found. It may have been already deleted.";
//     } else if (statusCode === 400) {
//       errorMessage = responseData?.message || "Cannot delete expense rate. It may be referenced by other records.";
//     } else {
//       errorMessage =
//         responseData?.message ||
//         responseData?.title ||
//         (typeof responseData === "string" ? responseData : null) ||
//         axiosError?.message ||
//         "Failed to delete expense rate";
//     }

//     return {
//       success: false,
//       message: errorMessage,
//       error: errorMessage,
//       statusCode,
//     };
//   }
// };

// Update expense rate by ID (PUT /api/Expenserate/{id})
export const updateExpenseRate = async (
  id: number,
  expenseData: Partial<ExpenseRateRequest>
): Promise<ApiResponse> => {
  try {
    console.log(`Updating expense rate with ID: ${id}`, expenseData);
    
    const response = await API.put(`/Expenserate/${id}`, expenseData, {
      headers: getAuthHeaders(),
    });

    console.log("Update expense rate response:", response.data);

    return {
      success: true,
      message: response.data?.message || "Expense rate updated successfully",
      data: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    console.error("API Error updating expense rate:", error);
    const axiosError = error as any;
    const statusCode = axiosError?.response?.status ?? 0;
    const responseData = axiosError?.response?.data;

    const errorMessage =
      responseData?.message ||
      responseData?.title ||
      (typeof responseData === "string" ? responseData : null) ||
      axiosError?.message ||
      "Failed to update expense rate";

    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
      statusCode,
    };
  }
};

// Get single expense rate by ID (GET /api/Expenserate/{id})
export const getExpenseRateById = async (id: number): Promise<ExpenseRateResponse | null> => {
  try {
    const response = await API.get(`/Expenserate/${id}`, {
      headers: getAuthHeaders(),
    });

    const data = response.data;
    const expenseRate = data?.data || data;

    return {
      id: expenseRate.id,
      vehicleTypeId: expenseRate.vehicleTypeId,
      vehicleTypeName: expenseRate.vehicleTypeName,
      ratePerKm: expenseRate.ratePerKm,
      effectiveFrom: expenseRate.effectiveFrom,
      effectiveTo: expenseRate.effectiveTo,
      isActive: expenseRate.isActive,
      created_at: expenseRate.created_at || expenseRate.createdAt,
      updated_at: expenseRate.updated_at || expenseRate.updatedAt,
    };
  } catch (error) {
    console.error(`Error fetching expense rate with ID ${id}:`, error);
    return null;
  }
};