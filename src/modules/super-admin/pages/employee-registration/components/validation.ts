import type { EmployeeRegistrationData, RegistrationErrors } from './types';

export const validateRegistrationForm = (
    formData: EmployeeRegistrationData
): RegistrationErrors => {
    const errors: RegistrationErrors = {};

    if (!formData.employeeCode.trim()) {
        errors.employeeCode = 'Employee code is required';
    }

    if (!formData.fullName.trim()) {
        errors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
        errors.fullName = 'Full name must be at least 3 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName.trim())) {
        errors.fullName = 'Full name can only contain letters and spaces';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Please enter a valid email address';
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.mobile.trim()) {
        errors.mobile = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobile.trim())) {
        errors.mobile = 'Please enter a 10-digit mobile number';
    }

    if (!formData.designation) {
        errors.designation = 'Please select a designation';
    }

    if (!formData.department) {
        errors.department = 'Please select a department';
    }

    if (!formData.reportingManager) {
        errors.reportingManager = 'Please select a reporting manager';
    }

    if (!formData.location) {
        errors.location = 'Please select a work location';
    }

    if (!formData.role) {
        errors.role = 'Please select a user role';
    }

    return errors;
};
