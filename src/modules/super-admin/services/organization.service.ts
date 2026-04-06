import axios from "axios";

const API_BASE_URL = "http://192.168.29.8:8080/api/Organisation"; 

export interface OrganisationPayload {
  id: number;
  organisationName: string;
  companyId: number;
  address: string;
  city: string;
  state: string;
  updatedBy: string;
  updatedDate: string;
}

/**
 * Create Organization
 */
export const createOrganisation = async (data: OrganisationPayload) => {
  const response = await axios.post(API_BASE_URL, data);
  return response.data;
};

export const getOrganisations = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};