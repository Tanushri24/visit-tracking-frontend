// src/components/registration/EmployeeRegistration.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Home, Briefcase } from 'lucide-react';

// Import components
import StepIndicator from './components/StepIndicator';
import BasicInfoStep from './components/BasicInfoStep';
import ProfessionalInfoStep from './components/ProfessionalInfoStep';
import ReviewStep from './components/ReviewStep';


// Import types and validation
import type {
    EmployeeRegistrationData,
    Designation,
    Department,
    Manager,
    Location,
    RegistrationErrors
} from './components/types';
import { validateRegistrationForm } from './components/validation';

const EmployeeRegistration: React.FC = () => {
    const navigate = useNavigate();

    // Form Data State
    const [formData, setFormData] = useState<EmployeeRegistrationData>({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        employeeCode: '',
        designation: '',
        department: '',
        reportingManager: '',
        location: '',
        joiningDate: '',
        profilePicture: null
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

    // UI States
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<RegistrationErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [touched, setTouched] = useState<Set<string>>(new Set());
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    // Validate on form data change
    useEffect(() => {
        if (touched.size > 0) {
            const validationErrors = validateRegistrationForm(formData, currentStep);
            setErrors(validationErrors);
        }
    }, [formData, currentStep, touched]);

    // Handle Input Change
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Mark field as touched
        setTouched(prev => new Set(prev).add(name));
    };

    // Handle Blur Event
    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name } = e.target;
        setTouched(prev => new Set(prev).add(name));
    };

    // Handle Profile Picture Upload
    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('File size should be less than 2MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }

            setFormData(prev => ({
                ...prev,
                profilePicture: file
            }));

            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    // Handle Next Step
    const handleNextStep = () => {
        const stepErrors = validateRegistrationForm(formData, currentStep);
        setErrors(stepErrors);

        // Mark all current step fields as touched
        const stepFields = currentStep === 1
            ? ['firstName', 'lastName', 'email', 'mobile', 'password', 'confirmPassword']
            : ['employeeCode', 'designation', 'department', 'reportingManager', 'location', 'joiningDate'];

        setTouched(prev => {
            const newSet = new Set(prev);
            stepFields.forEach(field => newSet.add(field));
            return newSet;
        });

        if (Object.keys(stepErrors).length === 0) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Handle Previous Step
    const handlePreviousStep = () => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle Form Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateRegistrationForm(formData, 3);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            alert('Please fix the errors before submitting');
            return;
        }

        if (!agreeToTerms) {
            alert('Please agree to terms and conditions');
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            setRegistrationSuccess(true);

            // Auto redirect to login after 3 seconds
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Get field error
    const getFieldError = useCallback((fieldName: keyof RegistrationErrors) => {
        return touched.has(fieldName) ? errors[fieldName] : undefined;
    }, [touched, errors]);

    // Toggle password visibility
    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    // If registration successful, show success message
    if (registrationSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-purple-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
                    <p className="text-gray-600 mb-4">
                        Your employee account has been created successfully.
                        You will be redirected to login page in 3 seconds.
                    </p>
                    <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
                        <div className="bg-purple-600 h-2 rounded-full animate-progress"></div>
                    </div>
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go to Login Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header with Back Button */}
                <div className="mb-6">
                    <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-purple-100 shadow-sm">
                        <button
                            onClick={() => navigate('/login')}
                            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="text-sm font-medium">Back to Login</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <Home className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-gray-600">Employee Registration</span>
                        </div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
                    {/* Header with Gradient */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-3 rounded-xl">
                                <Briefcase className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Employee Registration</h1>
                                <p className="text-purple-100 text-sm">Join our team and start tracking your visits</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        <StepIndicator currentStep={currentStep} totalSteps={3} />

                        <form onSubmit={handleSubmit}>
                            {currentStep === 1 && (
                                <BasicInfoStep
                                    formData={formData}
                                    errors={errors}
                                    touched={touched}
                                    showPassword={showPassword}
                                    showConfirmPassword={showConfirmPassword}
                                    onInputChange={handleInputChange}
                                    onBlur={handleBlur}
                                    onTogglePassword={togglePassword}
                                    onToggleConfirmPassword={toggleConfirmPassword}
                                    getFieldError={getFieldError}
                                />
                            )}

                            {currentStep === 2 && (
                                <ProfessionalInfoStep
                                    formData={formData}
                                    errors={errors}
                                    touched={touched}
                                    designations={designations}
                                    departments={departments}
                                    managers={managers}
                                    locations={locations}
                                    previewUrl={previewUrl}
                                    onInputChange={handleInputChange}
                                    onBlur={handleBlur}
                                    onProfilePictureChange={handleProfilePictureChange}
                                    getFieldError={getFieldError}
                                />
                            )}

                            {currentStep === 3 && (
                                <ReviewStep
                                    formData={formData}
                                    agreeToTerms={agreeToTerms}
                                    onTermsChange={setAgreeToTerms}
                                />
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                                {currentStep > 1 ? (
                                    <button
                                        type="button"
                                        onClick={handlePreviousStep}
                                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium inline-flex items-center gap-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Previous
                                    </button>
                                ) : (
                                    <div></div>
                                )}

                                {currentStep < 3 ? (
                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium inline-flex items-center gap-2"
                                    >
                                        Next
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isLoading || !agreeToTerms}
                                        className={`
                                            px-8 py-3 bg-purple-600 text-white rounded-lg font-medium
                                            transition-all duration-200 inline-flex items-center gap-2
                                            ${isLoading || !agreeToTerms
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'hover:bg-purple-700 hover:shadow-lg'
                                            }
                                        `}
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Registering...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-4 h-4" />
                                                Complete Registration
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Login Link */}
                <p className="text-center mt-6 text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-purple-600 hover:text-purple-700 hover:underline">
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default EmployeeRegistration;