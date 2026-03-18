// src/modules/admin/pages/registration/AdminEmployeeRegistration.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    ArrowLeft, ArrowRight, CheckCircle, Save,
    User, FileText 
} from 'lucide-react';

// Import types and validation (from shared registration folder)
import type {
    EmployeeRegistrationData,
    Designation,
    Department,
    Manager,
    Location,
    RegistrationErrors,
    UserRole
} from '../../../super-admin/pages/employee-registration/components/types';
import { validateRegistrationForm } from '../../../super-admin/pages/employee-registration/components/validation';

// Import components (from shared registration folder)
import EmployeeDetailsTab from '../../../super-admin/pages/employee-registration/components/EmployeeDetailsTab';
import ReviewTab from '../../../super-admin/pages/employee-registration/components/ReviewTab';

const AdminEmployeeRegistration: React.FC = () => {
    const navigate = useNavigate();

    // Form Data State
    const [formData, setFormData] = useState<EmployeeRegistrationData>({
        employeeCode: '',
        fullName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        designation: '',
        department: '',
        reportingManager: '',
        location: '',
        role: 'employee'  // Default role
    });

    // Dropdown Data States
    const [designations] = useState<Designation[]>([
        { id: 1, name: 'Software Developer' },
        { id: 2, name: 'Senior Developer' },
        { id: 3, name: 'Team Lead' },
        { id: 4, name: 'Project Manager' },
        { id: 5, name: 'Business Development Executive' },
        { id: 6, name: 'Sales Manager' },
        { id: 7, name: 'HR Executive' },
        { id: 8, name: 'Accountant' }
    ]);

    const [departments] = useState<Department[]>([
        { id: 1, name: 'Engineering' },
        { id: 2, name: 'Sales' },
        { id: 3, name: 'Marketing' },
        { id: 4, name: 'Human Resources' },
        { id: 5, name: 'Finance' },
        { id: 6, name: 'Operations' },
        { id: 7, name: 'Business Development' },
        { id: 8, name: 'Project Management' }
    ]);

    const [managers] = useState<Manager[]>([
        { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@company.com' },
        { id: 2, name: 'Priya Patel', email: 'priya.patel@company.com' },
        { id: 3, name: 'Amit Kumar', email: 'amit.kumar@company.com' },
        { id: 4, name: 'Neha Singh', email: 'neha.singh@company.com' },
        { id: 5, name: 'Vikram Mehta', email: 'vikram.mehta@company.com' }
    ]);

    const [locations] = useState<Location[]>([
        { id: 1, name: 'Mumbai HQ', city: 'Mumbai' },
        { id: 2, name: 'Delhi Office', city: 'Delhi' },
        { id: 3, name: 'Bangalore Branch', city: 'Bangalore' },
        { id: 4, name: 'Pune Office', city: 'Pune' },
        { id: 5, name: 'Chennai Branch', city: 'Chennai' },
        { id: 6, name: 'Kolkata Office', city: 'Kolkata' }
    ]);

    // ✅ FILTERED USER ROLES - Admin removed, only 3 roles
    const [userRoles] = useState<UserRole[]>([
        { id: 1, name: 'Manager' },
        { id: 2, name: 'Employee' },
        { id: 3, name: 'Management' }
    ]);

    // UI States
    const [activeTab, setActiveTab] = useState(0);
    const [errors, setErrors] = useState<RegistrationErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [touched, setTouched] = useState<Set<string>>(new Set());
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    // Validate on form data change
    useEffect(() => {
        if (touched.size > 0) {
            const validationErrors = validateRegistrationForm(formData);
            setErrors(validationErrors);
        }
    }, [formData, touched]);

    // Handle Input Change
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setTouched(prev => new Set(prev).add(name));
    };

    // Handle Blur Event
    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name } = e.target;
        setTouched(prev => new Set(prev).add(name));
    };

    // Handle Tab Change
    const handleTabChange = (tabIndex: number) => {
        if (tabIndex === 1) {
            const validationErrors = validateRegistrationForm(formData);
            setErrors(validationErrors);
            
            const allFields = [
                'employeeCode', 'fullName', 'email', 'mobile', 
                'password', 'confirmPassword', 'designation', 'department', 
                'reportingManager', 'location', 'role'
            ];
            
            setTouched(prev => {
                const newSet = new Set(prev);
                allFields.forEach(field => newSet.add(field));
                return newSet;
            });

            if (Object.keys(validationErrors).length === 0) {
                setActiveTab(tabIndex);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            setActiveTab(tabIndex);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Handle Form Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateRegistrationForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            alert('Please fix the errors before submitting');
            setActiveTab(0);
            return;
        }

        if (!agreeToTerms) {
            alert('Please agree to terms and conditions');
            return;
        }

        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setRegistrationSuccess(true);
            setTimeout(() => {
                navigate('/admin/employees');
            }, 3000);
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const getFieldError = useCallback((fieldName: keyof RegistrationErrors) => {
        return touched.has(fieldName) ? errors[fieldName] : undefined;
    }, [touched, errors]);

    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    // Success message
    if (registrationSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-2">
                <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Employee Created Successfully!</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        New employee has been registered in the system.
                    </p>
                    <Link
                        to="/admin/employees"
                        className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                        <ArrowLeft className="w-3 h-3" />
                        Go to Employee List
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4">
            <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="mb-4">
                    <button
                        onClick={() => navigate('/admin/employees')}
                        className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Employee List
                    </button>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    
                    {/* Title */}
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h1 className="text-lg font-semibold text-gray-800">Create New Employee</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Add a new employee to the system</p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 px-6">
                        <div className="flex space-x-6">
                            <button
                                onClick={() => handleTabChange(0)}
                                className={`
                                    py-3 px-1 border-b-2 font-medium text-xs flex items-center gap-1.5
                                    transition-colors duration-200
                                    ${activeTab === 0
                                        ? 'border-purple-600 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                                `}
                            >
                                <User className="w-3.5 h-3.5" />
                                Employee Details
                                {Object.keys(errors).length > 0 && activeTab === 0 && (
                                    <span className="ml-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                )}
                            </button>
                            <button
                                onClick={() => handleTabChange(1)}
                                className={`
                                    py-3 px-1 border-b-2 font-medium text-xs flex items-center gap-1.5
                                    transition-colors duration-200
                                    ${activeTab === 1
                                        ? 'border-purple-600 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                                `}
                            >
                                <FileText className="w-3.5 h-3.5" />
                                Review & Submit
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        <form onSubmit={handleSubmit}>
                            
                            {activeTab === 0 && (
                                <EmployeeDetailsTab
                                    formData={formData}
                                    errors={errors}
                                    touched={touched}
                                    designations={designations}
                                    departments={departments}
                                    managers={managers}
                                    locations={locations}
                                    userRoles={userRoles}  // ✅ Filtered roles passed here
                                    showPassword={showPassword}
                                    showConfirmPassword={showConfirmPassword}
                                    onInputChange={handleInputChange}
                                    onBlur={handleBlur}
                                    onTogglePassword={togglePassword}
                                    onToggleConfirmPassword={toggleConfirmPassword}
                                    getFieldError={getFieldError}
                                />
                            )}
                            
                            {activeTab === 1 && (
                                <ReviewTab
                                    formData={formData}
                                    agreeToTerms={agreeToTerms}
                                    onTermsChange={setAgreeToTerms}
                                />
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                                {activeTab === 1 ? (
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab(0)}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-xs font-medium inline-flex items-center gap-1.5"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                        Edit Details
                                    </button>
                                ) : (
                                    <div></div>
                                )}

                                {activeTab === 0 ? (
                                    <button
                                        type="button"
                                        onClick={() => handleTabChange(1)}
                                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-xs font-medium inline-flex items-center gap-1.5"
                                    >
                                        Review & Continue
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isLoading || !agreeToTerms}
                                        className={`
                                            px-5 py-2 bg-purple-600 text-white rounded-md text-xs font-medium
                                            transition-all duration-200 inline-flex items-center gap-1.5
                                            ${isLoading || !agreeToTerms
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'hover:bg-purple-700 hover:shadow-sm'
                                            }
                                        `}
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-3.5 h-3.5" />
                                                Create Employee
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminEmployeeRegistration;