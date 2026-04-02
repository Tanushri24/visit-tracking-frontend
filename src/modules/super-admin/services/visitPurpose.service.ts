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