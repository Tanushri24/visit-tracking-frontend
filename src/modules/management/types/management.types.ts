export interface FunnelData {
  stage: string;
  value: number;
}

export interface ConversionData {
  name: string;
  value: number;
}

export interface EmployeeData {
  name: string;
  visits: number;
  revenue: number;
}

export interface AlertData {
  message: string;
  type: "overdue" | "high-value" | "stalled";
}