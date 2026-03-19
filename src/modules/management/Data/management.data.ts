import type { FunnelData, ConversionData, EmployeeData, AlertData } from "../types/management.types";

export const funnelData: FunnelData[] = [
  { stage: "Lead Identified", value: 50 },
  { stage: "Initial Visit", value: 40 },
  { stage: "Requirement Discussion", value: 35 },
  { stage: "Demo Conducted", value: 30 },
  { stage: "Proposal Shared", value: 25 },
  { stage: "Negotiation", value: 15 },
  { stage: "Order Won", value: 10 },
  { stage: "Order Lost", value: 5 },
];

export const conversionData: ConversionData[] = [
  { name: "Visit → Lead", value: 60 },
  { name: "Lead → Proposal", value: 45 },
  { name: "Proposal → Demo", value: 35 },
  { name: "Demo → Order", value: 20 },
];

export const topEmployees: EmployeeData[] = [
  { name: "Rahul Verma", visits: 40, revenue: 950000 },
  { name: "Sneha Sharma", visits: 38, revenue: 870000 },
];

export const alerts: AlertData[] = [
  { message: "Opportunity #123 overdue", type: "overdue" },
  { message: "High-value deal pending approval", type: "high-value" },
  { message: "Follow-up pending for Opportunity #456", type: "stalled" },
];

export const COLORS: string[] = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
];