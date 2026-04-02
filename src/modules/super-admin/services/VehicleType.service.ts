import axios from "axios";

const API_BASE_URL = "http://192.168.29.8:8080/api/VehicleType";

export interface VehicleTypePayload {
  vehicleName: string;
  defaultRate: number;
  status: boolean; // boolean type
}

/**
 * Create Vehicle Type
 */
export const createVehicleType = async (data: VehicleTypePayload) => {
  try {
    // ensure status is boolean
    const payload = {
      ...data,
      status: Boolean(data.status)
    };

    const response = await axios.post(API_BASE_URL, payload);
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};