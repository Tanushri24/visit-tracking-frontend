import axios from "axios";

const API_BASE_URL = "http://192.168.29.8:8080/api/VisitPurpose";

export interface VisitPurposePayload {
  id: number;
  purposeName: string;
  status: number;
  updatedBy: string;
  updatedDate: string;
}


export const createVisitPurpose = async (data: VisitPurposePayload) => {
  const response = await axios.post(API_BASE_URL, data);
  return response.data;
};

export const getVisitPurposes = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data;
};

// export const deleteVisitPurpose = async (id: number) => {
//   const response = await axios.delete(`${API_BASE_URL}/${id}`);
//   return response.data;
// };