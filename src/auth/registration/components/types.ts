// src/components/registration/types.ts

export interface EmployeeRegistrationData {
    // Personal Information
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
    
    // Professional Information
    employeeCode: string;
    designation: string;
    department: string;
    reportingManager: string;
    location: string;
    joiningDate: string;

    // Role
    roleId: number;
    
    // Additional
    profilePicture?: File | null;
}

export interface Designation {
    id: number;
    name: string;
}

export interface Department {
    id: number;
    name: string;
}

export interface Manager {
    id: number;
    name: string;
    email: string;
}

export interface Location {
    id: number;
    name: string;
    city: string;
}

export interface RegistrationErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    mobile?: string;
    password?: string;
    confirmPassword?: string;
    employeeCode?: string;
    designation?: string;
    department?: string;
    reportingManager?: string;
    location?: string;
    joiningDate?: string;
}

export interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

export interface BasicInfoStepProps {
    formData: EmployeeRegistrationData;
    errors: RegistrationErrors;
    touched: Set<string>;
    showPassword: boolean;
    showConfirmPassword: boolean;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    onTogglePassword: () => void;
    onToggleConfirmPassword: () => void;
    getFieldError: (fieldName: keyof RegistrationErrors) => string | undefined;
}

export interface ProfessionalInfoStepProps {
    formData: EmployeeRegistrationData;
    errors: RegistrationErrors;
    touched: Set<string>;
    designations: Designation[];
    departments: Department[];
    managers: Manager[];
    locations: Location[];
    previewUrl: string | null;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onProfilePictureChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getFieldError: (fieldName: keyof RegistrationErrors) => string | undefined;
}

export interface ReviewStepProps {
    formData: EmployeeRegistrationData;
    agreeToTerms: boolean;
    onTermsChange: (checked: boolean) => void;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
}