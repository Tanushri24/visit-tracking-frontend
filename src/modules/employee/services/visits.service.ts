import axios from "axios";

// ✅ Base URL
const API_URL = "http://192.168.29.8:8080/api/Visit";

// ✅ Payload Interface
export interface VisitPayload {
  visitCode: string;
  visitDate: string;
  employeeId: number;
  companyId: number;
  organisationId: number;
  departmentId: number;
  contactPersonId: number;
  visitPurposeId: number;
  discussionSummary: string;
  nextAction: string;
  nextFollowUpDate: string;
  vehicleTypeId: number;
  distanceKm: number;
  rateAppliedPerKm: number;
  travelExpenseAmount: number;
  funnelStageId: number;
  outcomeTypeId: number;
  expectedBusinessValue: number;
  actualBusinessValue: number;
  probabilityPercent: number;
  status: string;
  checkInTime: string;
  checkOutTime: string;
  latitude: string;
  longitude: string;
  remarks: string;
  attachmentPath: string;
  insertedBy: number;
  insertedDate: string;
  updatedBy: number;
  updatedDate: string;
}

// =======================
// ✅ CREATE VISIT (POST)
// =======================
export const createVisit = async (payload: VisitPayload) => {
  try {
    const response = await axios.post(API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Create Visit Error:", error.response?.data || error.message);
    throw error;
  }
};