export interface EmployeeRegistrationData {
    employeeCode: string;
    fullName: string;
    email: string;
    mobile: string;
    designation: string;
    department: string;
    reportingManager: string;
    location: string;
    role: string;
}

export interface RegistrationErrors {
    employeeCode?: string;
    fullName?: string;
    email?: string;
    mobile?: string;
    designation?: string;
    department?: string;
    reportingManager?: string;
    location?: string;
    role?: string;
}

export interface Designation {
    id: number;
    name: string;
    departmentId?: number;
}

export interface Department {
    id: number;
    name: string;
}

export interface Manager {
    id: number;
    name: string;
    email?: string;
}

export interface Location {
    id: number;
    name: string;
    city: string;
}

export interface UserRole {
    id: number;
    name: string;
}

export interface Step {
    number: number;
    label: string;
    icon: any;
}

export interface StepIndicatorProps {
    currentStep: number;
    steps: Step[];
}

export interface EmployeeDetailsTabProps {
    formData: EmployeeRegistrationData;
    errors: RegistrationErrors;
    touched: Set<string>;
    designations: Designation[];
    departments: Department[];
    managers: Manager[];
    locations: Location[];
    userRoles: UserRole[];
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
    getFieldError: (fieldName: keyof RegistrationErrors) => string | undefined;
}

export interface ReviewTabProps {
    formData: EmployeeRegistrationData;
    agreeToTerms: boolean;
    onTermsChange: (checked: boolean) => void;
}

export interface CreateEmployeeApiRequest {
    fullName: string;
    email: string;
    mobile: string;
    roleId: number;
    departmentId: number;
    employeeCode: string;
    designationId: number;
    reportingManagerId: number;
    locationId: number;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    statusCode?: number;
}
