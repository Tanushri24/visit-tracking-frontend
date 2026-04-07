import axios from 'axios';

const API_URL = 'http://192.168.29.8:8080/api/Company';

export interface CompanyCreateRequest {
  companyName: string;
  companyType: string;
  industryType: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isActive: boolean;
}

export interface CompanyResponse extends CompanyCreateRequest {
  id: number;
}

export const companyApi = {
  getCompanies: async (): Promise<CompanyResponse[]> => {
    const res = await axios.get<CompanyResponse[]>(API_URL);
    return res.data;
  },

  createCompany: async (data: CompanyCreateRequest): Promise<CompanyResponse> => {
    const res = await axios.post<CompanyResponse>(API_URL, data);
    return res.data;
  },
  //  deleteCompany: async (id: number) => {
  //   console.log("Deleting ID:", id);

  //   const res = await axios.delete(`${API_URL}/${id}`);

  //   return res.data;
  // }


};
