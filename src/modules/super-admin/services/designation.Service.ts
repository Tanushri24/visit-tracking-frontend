import axios from "axios";

const API_URL = "http://192.168.29.8:8080/api";

// Designation Interface
export interface Designation {
  id: number;
  designationName: string;
  departmentId: number;
  isActive: boolean;
}

// GET All Designations
export const getDesignations = async () => {
  try {
    const response = await axios.get(`${API_URL}/Designation`, {
      headers: {
        accept: "*/*",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching designations:", error);
    throw error;
  }
};

// GET Designation By ID
export const getDesignationById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/Designation/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching designation:", error);
    throw error;
  }
};
export const updateDesignation = async (
  id: number,
  data: Partial<Omit<Designation, "id">>
) => {
  try {
    const response = await axios.put(`${API_URL}/Designation/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating designation:", error);
    throw error;
  }
};