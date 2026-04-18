import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.29.8:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interface
export interface Reporting {
  id: number;
  displayName: string;
}

// GET Reporting Managers
export const getReporting = async (): Promise<Reporting[]> => {
  try {
    const response = await API.get("/Employee/reporting-manager-dropdown");
    return response.data;
  } catch (error) {
    console.error("Error fetching reporting managers:", error);
    throw error;
  }
};

