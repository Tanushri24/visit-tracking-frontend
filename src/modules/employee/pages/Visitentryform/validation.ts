// validation.ts
export interface VisitsEntryForm {
  visitDate: string;
  employeeName: string;
  employeeDesignation: string;
  company: string;
  organisation: string;
  department: string;
  contactPerson: string;
  contactNumber: string;
  cityLocation: string;
  visitType: string;
  visitPurpose: string;
  discussionSummary: string;
  nextAction: string;
  nextFollowUpDate: string;
  travelMode: string;
  distanceTravelled: number;
  ratePerKm: number;
  autoExpenseCalculation: number;
  funnelStage: string;
  expectedBusinessValue: number;
  outcomeGenerated: string;
  probability: number;
  remarks: string;
  attachment: File | null;
  checkInTime: string;
  checkOutTime: string;
}

export type ValidationErrors = Partial<Record<keyof VisitsEntryForm, string>>;

export const validateVisitsForm = (formData: VisitsEntryForm): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.visitDate) errors.visitDate = 'Visit date is required';
  if (!formData.employeeName?.trim()) errors.employeeName = 'Employee name is required';
  if (!formData.employeeDesignation?.trim()) errors.employeeDesignation = 'Designation is required';
  if (!formData.company?.trim()) errors.company = 'Company is required';
  if (!formData.organisation?.trim()) errors.organisation = 'Organisation is required';
  if (!formData.department?.trim()) errors.department = 'Department is required';
  if (!formData.contactPerson?.trim()) errors.contactPerson = 'Contact person is required';
  if (!formData.contactNumber?.trim()) errors.contactNumber = 'Contact number is required';
  if (!formData.cityLocation?.trim()) errors.cityLocation = 'City/Location is required';
  if (!formData.visitType) errors.visitType = 'Visit type is required';
  if (!formData.visitPurpose?.trim()) errors.visitPurpose = 'Visit purpose is required';
  if (!formData.nextFollowUpDate) errors.nextFollowUpDate = 'Next follow-up date is required';
  if (!formData.travelMode) errors.travelMode = 'Travel mode is required';
  if (formData.distanceTravelled <= 0) errors.distanceTravelled = 'Distance must be greater than 0';
  if (formData.ratePerKm <= 0) errors.ratePerKm = 'Rate per km must be greater than 0';
  if (!formData.funnelStage) errors.funnelStage = 'Funnel stage is required';
  if (!formData.outcomeGenerated) errors.outcomeGenerated = 'Outcome is required';
  if (formData.probability < 0 || formData.probability > 100)
    errors.probability = 'Probability must be between 0 and 100';
  if (!formData.checkInTime) errors.checkInTime = 'Check-in time is required';
  if (!formData.checkOutTime) errors.checkOutTime = 'Check-out time is required';

  return errors;
};