// src/components/registration/types.ts

// ============================================
// MAIN EMPLOYEE DATA INTERFACE
// ============================================
export interface EmployeeRegistrationData {
    // Employee Information - Using fullName (not firstName/lastName)
    employeeCode: string;
    fullName: string;                    // ✅ Single full name field
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
    designation: string;
    department: string;
    reportingManager: string;
    location: string;
    role: string;                         // ✅ User role (Super Admin, Admin, etc.)
    // ❌ Removed: firstName, lastName, joiningDate, profilePicture
}

// ============================================
// ERROR INTERFACE
// ============================================
export interface RegistrationErrors {
    employeeCode?: string;
    fullName?: string;                    // ✅ Using fullName
    email?: string;
    mobile?: string;
    password?: string;
    confirmPassword?: string;
    designation?: string;
    department?: string;
    reportingManager?: string;
    location?: string;
    role?: string;
}

// ============================================
// DROPDOWN DATA TYPES
// ============================================
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

export interface UserRole {
    id: number;
    name: string;
}

// ============================================
// STEP INDICATOR TYPES
// ============================================
export interface Step {
    number: number;
    label: string;
    icon: any; // Lucide icon type
}

export interface StepIndicatorProps {
    currentStep: number;  // 0 or 1 (for 2 tabs)
    steps: Step[];        // Array of 2 steps
}

// ============================================
// TAB PROPS TYPES
// ============================================
export interface EmployeeDetailsTabProps {
    formData: EmployeeRegistrationData;
    errors: RegistrationErrors;
    touched: Set<string>;
    designations: Designation[];
    departments: Department[];
    managers: Manager[];
    locations: Location[];
    userRoles: UserRole[];
    showPassword: boolean;
    showConfirmPassword: boolean;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onTogglePassword: () => void;
    onToggleConfirmPassword: () => void;
    getFieldError: (fieldName: keyof RegistrationErrors) => string | undefined;
    // ❌ Removed: previewUrl, onProfilePictureChange
}

export interface ReviewTabProps {
    formData: EmployeeRegistrationData;
    agreeToTerms: boolean;
    onTermsChange: (checked: boolean) => void;
    // ❌ Removed: previewUrl
}

// ============================================
// API RESPONSE TYPE
// ============================================
export interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
}