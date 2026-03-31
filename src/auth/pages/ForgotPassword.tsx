// src/auth/pages/ChangePassword.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { 
    ArrowLeft, Lock, Eye, EyeOff, KeyRound,
    Shield, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

// ==================== YUP VALIDATION SCHEMA ====================
const changePasswordSchema = yup.object().shape({
    oldPassword: yup
        .string()
        .required('Old password is required'),
    
    newPassword: yup
        .string()
        .required('New password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .test('not-same-as-old', 'New password must be different from old password', function(value) {
            return this.parent.oldPassword !== value;
        }),
    
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('newPassword')], 'Passwords do not match')
});

type ChangePasswordFormData = yup.InferType<typeof changePasswordSchema>;

interface LocationState {
    userRole?: string;
    requiresPasswordChange?: boolean;
}

const ChangePassword: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;
    
    // Get user role from location state or localStorage
    const [userRole, setUserRole] = useState<string>('employee');
    
    useEffect(() => {
        // Try to get role from state first, then from localStorage
        if (state?.userRole) {
            setUserRole(state.userRole);
        } else {
            const authData = localStorage.getItem('auth');
            if (authData) {
                const { userRole } = JSON.parse(authData);
                setUserRole(userRole || 'employee');
            }
        }
    }, [state]);
    
    // Form State
    const [formData, setFormData] = useState<ChangePasswordFormData>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    
    // UI States
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Set<string>>(new Set());
    const [success, setSuccess] = useState(false);

    // Password strength state
    const [passwordStrength, setPasswordStrength] = useState({
        length: false,
        uppercase: false,
        number: false,
        match: false
    });

    // Role-based configurations
    const roleConfig: Record<string, { gradient: string }> = {
        'super-admin': { gradient: 'from-purple-600 to-indigo-600' },
        'admin': { gradient: 'from-purple-600 to-indigo-600' },
        'manager': { gradient: 'from-purple-600 to-indigo-600' },
        'employee': { gradient: 'from-purple-600 to-indigo-600' },
        'management': { gradient: 'from-purple-600 to-indigo-600' }
    };

    const currentGradient = roleConfig[userRole]?.gradient || 'from-purple-600 to-indigo-600';

    // Validate field with Yup
    const validateField = (name: string, value: string): string => {
        try {
            let fieldSchema: yup.AnySchema;
            
            switch(name) {
                case 'oldPassword':
                    fieldSchema = yup.string().required('Old password is required');
                    break;
                case 'newPassword':
                    fieldSchema = yup.string()
                        .required('New password is required')
                        .min(8, 'Password must be at least 8 characters')
                        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                        .matches(/[0-9]/, 'Password must contain at least one number')
                        .test('not-same-as-old', 'New password must be different from old password', 
                            (val) => val !== formData.oldPassword);
                    break;
                case 'confirmPassword':
                    fieldSchema = yup.string()
                        .required('Please confirm your password')
                        .oneOf([yup.ref('newPassword')], 'Passwords do not match');
                    break;
                default:
                    return '';
            }
            
            fieldSchema.validateSync(value, { abortEarly: false });
            return '';
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                return err.message;
            }
            return 'Validation error';
        }
    };

    // Validate entire form
    const validateForm = async (): Promise<boolean> => {
        try {
            await changePasswordSchema.validate(formData, { abortEarly: false });
            setErrors({});
            return true;
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const newErrors: Record<string, string> = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        newErrors[error.path] = error.message;
                    }
                });
                setErrors(newErrors);
            }
            return false;
        }
    };

    // Handle Input Change
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Update password strength for new password
        if (name === 'newPassword') {
            setPasswordStrength({
                length: value.length >= 8,
                uppercase: /[A-Z]/.test(value),
                number: /[0-9]/.test(value),
                match: value === formData.confirmPassword && value.length > 0
            });
        }

        // Check password match
        if (name === 'confirmPassword' || name === 'newPassword') {
            const newPwd = name === 'newPassword' ? value : formData.newPassword;
            const confirmPwd = name === 'confirmPassword' ? value : formData.confirmPassword;
            setPasswordStrength(prev => ({
                ...prev,
                match: newPwd === confirmPwd && newPwd.length > 0
            }));
        }

        // Validate field if touched
        if (touched.has(name)) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    // Handle Blur
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTouched(prev => new Set(prev).add(name));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    // Handle Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Mark all fields as touched
        const allFields = ['oldPassword', 'newPassword', 'confirmPassword'];
        setTouched(new Set(allFields));

        // Validate all fields individually
        const oldPwdError = validateField('oldPassword', formData.oldPassword);
        const newPwdError = validateField('newPassword', formData.newPassword);
        const confirmPwdError = validateField('confirmPassword', formData.confirmPassword);
        
        setErrors({
            oldPassword: oldPwdError,
            newPassword: newPwdError,
            confirmPassword: confirmPwdError
        });

        // Check if any errors exist
        if (oldPwdError || newPwdError || confirmPwdError) {
            return;
        }

        // Final form validation
        const isValid = await validateForm();
        if (!isValid) return;

        setIsLoading(true);

        try {
            // Simulate API call to change password
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Get current auth data
            const authData = localStorage.getItem('auth');
            if (authData) {
                const parsedAuth = JSON.parse(authData);
                // Update password changed status
                parsedAuth.passwordChanged = true;
                localStorage.setItem('auth', JSON.stringify(parsedAuth));
            }
            
            // Show success
            setSuccess(true);
            
            // Redirect to login after 3 seconds
            setTimeout(() => {
                // Clear any existing auth to force re-login
                localStorage.removeItem('auth');
                navigate('/login', { 
                    state: { 
                        message: 'Password changed successfully. Please login with your new password.',
                        userRole: userRole 
                    } 
                });
            }, 3000);
        } catch (error) {
            console.error('Password change failed:', error);
            alert('Failed to change password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Get field error
    const getFieldError = (fieldName: string) => {
        return touched.has(fieldName) ? errors[fieldName] : undefined;
    };

    // Success View
    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center border border-purple-100">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-1">Password Changed!</h2>
                    <p className="text-sm text-gray-600 mb-3">
                        Your password has been successfully updated.
                    </p>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full mb-3">
                        <div className="bg-purple-600 h-1.5 rounded-full animate-progress" style={{ width: '100%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow"></div>
                <div className="absolute top-40 right-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slower"></div>
            </div>

            {/* Back Button - Only show if not from forced password change */}
            {!state?.requiresPasswordChange && (
                <div className="w-full max-w-sm mb-3 relative z-10">
                    <button
                        onClick={() => navigate('/login')}
                        className="inline-flex items-center gap-1.5 text-purple-600 hover:text-purple-800 transition-colors bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-purple-100 text-xs"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Login
                    </button>
                </div>
            )}

            {/* Main Card */}
            <div className="relative w-full max-w-sm z-10">
                {/* Decorative Elements */}
                <div className={`absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br ${currentGradient} rounded-2xl rotate-12 opacity-10 blur-xl`}></div>
                <div className={`absolute -bottom-3 -left-3 w-16 h-16 bg-gradient-to-tr ${currentGradient} rounded-2xl -rotate-12 opacity-10 blur-xl`}></div>
                
                <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-purple-100 p-5 relative">
                    
                    {/* Header Icon */}
                    <div className="flex justify-center mb-3">
                        <div className={`w-14 h-14 bg-gradient-to-br ${currentGradient} rounded-lg flex items-center justify-center shadow-md`}>
                            <Shield className="w-7 h-7 text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-center text-gray-800 mb-1">
                        Change Password
                    </h2>
                    <p className="text-center text-gray-500 text-xs mb-4">
                        {state?.requiresPasswordChange 
                            ? 'You need to change your password before accessing the dashboard'
                            : 'Enter your old password and choose a new one'
                        }
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Old Password */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                                <KeyRound className="w-3 h-3 text-purple-500" />
                                Old Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showOldPassword ? 'text' : 'password'}
                                    name="oldPassword"
                                    value={formData.oldPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter current password"
                                    className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 pr-9
                                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                        ${getFieldError('oldPassword') 
                                            ? 'border-red-500 bg-red-50' 
                                            : 'border-gray-300 hover:border-purple-400'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className="absolute right-2 top-2 text-gray-400 hover:text-purple-600 transition-colors"
                                >
                                    {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {getFieldError('oldPassword') && (
                                <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.oldPassword}
                                </p>
                            )}
                        </div>

                        {/* New Password */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                                <Lock className="w-3 h-3 text-purple-500" />
                                New Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter new password"
                                    className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 pr-9
                                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                        ${getFieldError('newPassword') 
                                            ? 'border-red-500 bg-red-50' 
                                            : 'border-gray-300 hover:border-purple-400'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-2 top-2 text-gray-400 hover:text-purple-600 transition-colors"
                                >
                                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {getFieldError('newPassword') && (
                                <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.newPassword}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                                <Lock className="w-3 h-3 text-purple-500" />
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Confirm new password"
                                    className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 pr-9
                                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                        ${getFieldError('confirmPassword') 
                                            ? 'border-red-500 bg-red-50' 
                                            : 'border-gray-300 hover:border-purple-400'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-2 top-2 text-gray-400 hover:text-purple-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {getFieldError('confirmPassword') && (
                                <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Password Strength Indicator */}
                        {formData.newPassword && (
                            <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                                <p className="text-xs font-medium text-gray-700 mb-2">Requirements:</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex items-center gap-1.5 text-xs">
                                        {passwordStrength.length ? (
                                            <CheckCircle className="w-3 h-3 text-green-500" />
                                        ) : (
                                            <XCircle className="w-3 h-3 text-gray-300" />
                                        )}
                                        <span className={passwordStrength.length ? 'text-green-600 text-xs' : 'text-gray-400 text-xs'}>
                                            8+ chars
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs">
                                        {passwordStrength.uppercase ? (
                                            <CheckCircle className="w-3 h-3 text-green-500" />
                                        ) : (
                                            <XCircle className="w-3 h-3 text-gray-300" />
                                        )}
                                        <span className={passwordStrength.uppercase ? 'text-green-600 text-xs' : 'text-gray-400 text-xs'}>
                                            Uppercase
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs">
                                        {passwordStrength.number ? (
                                            <CheckCircle className="w-3 h-3 text-green-500" />
                                        ) : (
                                            <XCircle className="w-3 h-3 text-gray-300" />
                                        )}
                                        <span className={passwordStrength.number ? 'text-green-600 text-xs' : 'text-gray-400 text-xs'}>
                                            Number
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs">
                                        {passwordStrength.match ? (
                                            <CheckCircle className="w-3 h-3 text-green-500" />
                                        ) : (
                                            <XCircle className="w-3 h-3 text-gray-300" />
                                        )}
                                        <span className={passwordStrength.match ? 'text-green-600 text-xs' : 'text-gray-400 text-xs'}>
                                            Match
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-gradient-to-r ${currentGradient} text-white py-2.5 rounded-lg text-sm font-medium hover:shadow-md hover:shadow-purple-500/30 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 mt-2`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span className="text-xs">Changing...</span>
                                </>
                            ) : (
                                <>
                                    <Lock className="w-3.5 h-3.5" />
                                    <span className="text-xs">Change Password</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Help Text */}
                    <p className="text-center text-xs text-gray-400 mt-3">
                        Password must be different from old password
                    </p>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes float-slow {
                    0%, 100% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(20px, -20px) scale(1.1); }
                    66% { transform: translate(-10px, 10px) scale(0.9); }
                }
                @keyframes float-slower {
                    0%, 100% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(-20px, 10px) scale(1.1); }
                    66% { transform: translate(10px, -20px) scale(0.9); }
                }
                .animate-float-slow {
                    animation: float-slow 10s ease-in-out infinite;
                }
                .animate-float-slower {
                    animation: float-slower 12s ease-in-out infinite;
                }
                .animate-progress {
                    animation: progress 3s linear;
                }
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
            `}</style>
        </div>
    );
};

export default ChangePassword;