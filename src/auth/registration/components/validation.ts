// src/components/registration/validation.ts

// src/components/registration/validation.ts
import type { EmployeeRegistrationData, RegistrationErrors } from './types';

export const validateRegistrationForm = (
    formData: EmployeeRegistrationData,
    step: number
): RegistrationErrors => {
    const errors: RegistrationErrors = {};

    // Step 1: Basic Information Validation
    if (step === 1 || step === 3) {
        // First Name
        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        } else if (formData.firstName.length < 2) {
            errors.firstName = 'First name must be at least 2 characters';
        }

        // Last Name
        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        // Mobile
        const mobileRegex = /^[0-9]{10}$/;
        if (!formData.mobile) {
            errors.mobile = 'Mobile number is required';
        } else if (!mobileRegex.test(formData.mobile)) {
            errors.mobile = 'Please enter a 10-digit mobile number';
        }

        // Password
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        } else if (!/[A-Z]/.test(formData.password)) {
            errors.password = 'Password must contain at least one uppercase letter';
        } else if (!/[0-9]/.test(formData.password)) {
            errors.password = 'Password must contain at least one number';
        }

        // Confirm Password
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
    }

    // Step 2: Professional Information Validation
    if (step === 2 || step === 3) {
        // Employee Code
        if (!formData.employeeCode) {
            errors.employeeCode = 'Employee code is required';
        }

        // Designation
        if (!formData.designation) {
            errors.designation = 'Please select a designation';
        }

        // Department
        if (!formData.department) {
            errors.department = 'Please select a department';
        }

        // Reporting Manager
        if (!formData.reportingManager) {
            errors.reportingManager = 'Please select a reporting manager';
        }

        // Location
        if (!formData.location) {
            errors.location = 'Please select a work location';
        }

        // Joining Date
        if (!formData.joiningDate) {
            errors.joiningDate = 'Joining date is required';
        } else {
            const joiningDate = new Date(formData.joiningDate);
            const today = new Date();
            if (joiningDate < today) {
                errors.joiningDate = 'Joining date cannot be in the past';
            }
        }
    }

    return errors;
};

export const isStepValid = (
    errors: RegistrationErrors,
    step: number
): boolean => {
    const stepFields = {
        1: ['firstName', 'lastName', 'email', 'mobile', 'password', 'confirmPassword'],
        2: ['employeeCode', 'designation', 'department', 'reportingManager', 'location', 'joiningDate'],
        3: [] // Review step checks all fields
    };

    const fields = step === 3 
        ? [...stepFields[1], ...stepFields[2]]
        : stepFields[step as keyof typeof stepFields];

    return !fields.some(field => errors[field as keyof RegistrationErrors]);
};