// src/components/registration/validation.ts

import type { EmployeeRegistrationData, RegistrationErrors } from './types';  // ✅ Added missing import

export const validateRegistrationForm = (
    formData: EmployeeRegistrationData
): RegistrationErrors => {
    const errors: RegistrationErrors = {};

    // Employee Code
    if (!formData.employeeCode) {
        errors.employeeCode = 'Employee code is required';
    }

    // Full Name - ✅ Updated validation
    if (!formData.fullName?.trim()) {
        errors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 3) {
        errors.fullName = 'Full name must be at least 3 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
        errors.fullName = 'Full name can only contain letters and spaces';
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

    // User Role
    if (!formData.role) {
        errors.role = 'Please select a user role';
    }

    return errors;
};