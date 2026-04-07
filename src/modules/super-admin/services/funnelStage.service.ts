import axios from "axios";

const API_BASE_URL = "http://192.168.29.8:8080/api/FunnelStage";

export interface FunnelStagePayload {
  id?: number;
  stageName: string;
  stageOrder: number;
  isClosedStage: boolean;
  isWonStage: boolean;
  isLostStage: boolean;
  isActive: boolean;
}

/**
 * GET All Funnel Stages
 */
export const getFunnelStages = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

/**
 * CREATE Funnel Stage
 */
export const createFunnelStage = async (data: FunnelStagePayload) => {
  const response = await axios.post(API_BASE_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

// export const deleteFunnelStage = async (id: number) => {
//   const res = await axios.delete(`${API_BASE_URL}/${id}`);
//   return res.data;
// };