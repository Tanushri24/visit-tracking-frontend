import axios from "axios";

const API_URL = "http://192.168.29.8:8080/api";

// Location Interface
export interface Location {
  id: number;
  locationName: string;
  state: string;
  country: string;
  isActive: boolean;
}

// GET All Locations
export const getLocations = async () => {
  try {
    const response = await axios.get(`${API_URL}/Location`, {
      headers: {
        accept: "*/*",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

// GET Location By ID
export const getLocationById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/Location/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching location:", error);
    throw error;
  }
};