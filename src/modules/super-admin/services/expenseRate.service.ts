import axios from "axios";

const API_BASE_URL = "http://192.168.29.8:8080/api/VehicleType";

export interface VehicleTypePayload {
  vehicleName: string;
  defaultRatePerKm: number;
  isActive: boolean;
}

export const createVehicleType = async (data: VehicleTypePayload) => {
  const response = await axios.post(API_BASE_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};