// ============================================
// MASTER TYPES (Based on SRS Document)
// ============================================

export interface Company {
  id: number;
  companyName: string;
  companyType: 'Private' | 'Public' | 'Government' | 'NGO' | 'Educational';
  industryType: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  website?: string;
  email?: string;
  phone?: string;
  gstNo?: string;
  panNo?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Organisation {
  id: number;
  organisationName: string;
  companyId: number;
  companyName?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  email?: string;
  phone?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Department {
  id: number;
  departmentName: string;
  organisationId: number;
  organisationName?: string;
  companyId?: number;
  companyName?: string;
  headOfDepartment?: string;
  email?: string;
  phone?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface ContactPerson {
  id: number;
  name: string;
  designation: string;
  mobile: string;
  email: string;
  companyId?: number;
  companyName?: string;
  organisationId?: number;
  organisationName?: string;
  departmentId?: number;
  departmentName?: string;
  remarks?: string;
  isPrimary: boolean;
  isActive: boolean;
  createdAt: Date;
}

export interface Employee {
  id: number;
  employeeCode: string;
  name: string;
  email: string;
  mobile: string;
  designationId: number;
  designationName?: string;
  departmentId: number;
  departmentName?: string;
  reportingManagerId?: number;
  reportingManagerName?: string;
  locationId?: number;
  locationName?: string;
  joiningDate: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface Designation {
  id: number;
  designationName: string;
  level: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface VisitPurpose {
  id: number;
  purposeName: string;
  description?: string;
  category: 'Sales' | 'Support' | 'Service' | 'Meeting' | 'Other';
  isActive: boolean;
  createdAt: Date;
}

export interface FunnelStage {
  id: number;
  stageName: string;
  stageOrder: number;
  color: string;
  isClosedStage: boolean;
  isWonStage: boolean;
  isLostStage: boolean;
  probability: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface OutcomeType {
  id: number;
  outcomeName: string;
  category: 'Lead' | 'Proposal' | 'Demo' | 'Order' | 'Follow-up' | 'Other';
  isRevenueLinked: boolean;
  isPositive: boolean;
  description?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface ExpenseRate {
  id: number;
  vehicleTypeId: number;
  vehicleTypeName?: string;
  ratePerKm: number;
  effectiveFrom: Date;
  effectiveTo?: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface Location {
  id: number;
  locationName: string;
  city: string;
  state: string;
  pincode?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface VehicleType {
  id: number;
  vehicleName: string;
  defaultRatePerKm: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
}

// ============================================
// UNION TYPE FOR ALL MASTERS
// ============================================

export type MasterType = 
  | 'companies'
  | 'organisations'
  | 'departments'
  | 'contacts'
  | 'employees'
  | 'designations'
  | 'purposes'
  | 'funnel-stages'
  | 'outcomes'
  | 'expense-rates'
  | 'locations'
  | 'vehicles';

export interface MasterConfig {
  id: MasterType;
  label: string;
  icon: string;
  description: string;
  fields: MasterField[];
}

export interface MasterField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'tel' | 'select' | 'date' | 'boolean' | 'textarea';
  required: boolean;
  options?: { value: any; label: string }[];
  placeholder?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}