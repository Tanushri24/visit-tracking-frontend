import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    ArrowLeft, Save, CheckCircle, AlertCircle
} from 'lucide-react';

import EmployeeDetailsTab from './components/EmployeeDetailsTab';

import type {
    EmployeeRegistrationData,
    Designation,
    Department,
    Manager,
    Location,
    RegistrationErrors,
    UserRole
} from './components/types';
import { validateRegistrationForm } from './components/validation';

import { registrationApi, type CreateEmployeeRequest } from '../../services/registrationApi';

const EmployeeRegistration: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<EmployeeRegistrationData>({
        employeeCode: '',
        fullName: '',
        email: '',
        mobile: '',
        designation: '',
        department: '',
        reportingManager: '',
        location: '',
        role: ''
    });

    // Department API data
    const [departments, setDepartments] = useState<Department[]>([]);

    const [designations] = useState<Designation[]>([
        { id: 1, name: 'Designation 1' },
        { id: 123, name: 'Designation 123' }
    ]);

    const [managers] = useState<Manager[]>([
        { id: 12, name: 'Reporting Manager 12', email: 'manager12@agnigate.com' }
    ]);

    const [locations] = useState<Location[]>([
        { id: 2, name: 'Bhopal', city: '' },
        { id: 3, name: 'Indore', city: '' },
        { id: 4, name: 'Jabalpur', city: '' },
        { id: 5, name: 'Sagar', city: '' },
        { id: 7, name: 'Sehore', city: '' }
    ]);

    // Get current user role from localStorage
    const currentUserRole = localStorage.getItem('role');

    const allUserRoles: UserRole[] = [
        { id: 1, name: 'Super Admin' },
        { id: 2, name: 'Admin' },
        { id: 3, name: 'Master Management' },
        { id: 4, name: 'Manager' },
        { id: 5, name: 'Team Lead' },
        { id: 6, name: 'Employee' },
        { id: 7, name: 'HR' }
    ];

    // Filter out Super Admin and Admin roles if current user is not Super Admin
    const [userRoles] = useState<UserRole[]>(
        currentUserRole === 'super-admin' 
            ? allUserRoles 
            : allUserRoles.filter(role => role.name !== 'Super Admin' && role.name !== 'Admin')
    );

    const [errors, setErrors] = useState<RegistrationErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [touched, setTouched] = useState<Set<string>>(new Set());
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    // Fetch departments from API
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const depts = await registrationApi.getDepartments();
                setDepartments(depts);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };
        fetchDepartments();
    }, []);

    useEffect(() => {
        if (touched.size > 0) {
            const validationErrors = validateRegistrationForm(formData);
            setErrors(validationErrors);
        }
    }, [formData, touched]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setTouched(prev => new Set(prev).add(name));
        setApiError(null);
    };

    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name } = e.target;
        setTouched(prev => new Set(prev).add(name));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const allFields = [
            'employeeCode', 'fullName', 'email', 'mobile',
            'designation', 'department', 'reportingManager', 'location', 'role'
        ];

        setTouched(prev => {
            const newSet = new Set(prev);
            allFields.forEach(field => newSet.add(field));
            return newSet;
        });

        const validationErrors = validateRegistrationForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsLoading(true);
        setApiError(null);

        try {
            const payload: CreateEmployeeRequest = {
                fullName: formData.fullName.trim(),
                email: formData.email.trim(),
                mobile: formData.mobile.trim(),
                roleId: Number(formData.role),
                departmentId: Number(formData.department),
                employeeCode: formData.employeeCode.trim(),
                designationId: Number(formData.designation),
                reportingManagerId: Number(formData.reportingManager),
                locationId: Number(formData.location)
            };

            console.log('Sending data to API:', payload);

            const response = await registrationApi.createEmployee(payload);
// In your handleSubmit function, replace the success part:

if (response.success) {
    setRegistrationSuccess(true);
    
    // Get user role from localStorage
    const userRole = localStorage.getItem('role');
    
    setTimeout(() => {
        if (userRole === 'super-admin') {
            navigate('/super-admin/employees');
        } else {
            // Default to admin (for admin, hr, manager, etc.)
            navigate('/admin/employees');
        }
    }, 3000);
            } else {
                setApiError(response.message || 'Registration failed. Please try again.');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setApiError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const getFieldError = useCallback((fieldName: keyof RegistrationErrors) => {
        return touched.has(fieldName) ? errors[fieldName] : undefined;
    }, [touched, errors]);

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
                    <div className="text-xs text-gray-500 mb-4">
                        Redirecting to employee list...
                    </div>
                    <Link
                        to="/super-admin/employees"
                        className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                        <ArrowLeft className="w-3 h-3" />
                        Go to Employee List Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-4">
                    <button
                        onClick={() => navigate('/super-admin/employees')}
                        className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Employee List
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h1 className="text-lg font-semibold text-gray-800">Create New Employee</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Add a new employee to the system</p>
                    </div>

                    {apiError && (
                        <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <div className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <div className="text-xs text-red-700">
                                    <span className="font-medium">Error: </span>
                                    {apiError}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-6">
                        <form onSubmit={handleSubmit}>
                            <EmployeeDetailsTab
                                formData={formData}
                                errors={errors}
                                touched={touched}
                                designations={designations}
                                departments={departments}
                                managers={managers}
                                locations={locations}
                                userRoles={userRoles}
                                onInputChange={handleInputChange}
                                onBlur={handleBlur}
                                getFieldError={getFieldError}
                            />

                            <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`
                                        px-5 py-2 bg-purple-600 text-white rounded-md text-xs font-medium
                                        transition-all duration-200 inline-flex items-center gap-1.5
                                        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700 hover:shadow-sm'}
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeRegistration;