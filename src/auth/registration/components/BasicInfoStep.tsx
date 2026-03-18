// src/components/registration/BasicInfoStep.tsx

import React from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import type { BasicInfoStepProps } from './types';

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
    formData,
    errors,
    showPassword,
    showConfirmPassword,
    onInputChange,
    onBlur,
    onTogglePassword,
    onToggleConfirmPassword,
    getFieldError
}) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={onInputChange}
                            onBlur={onBlur}
                            placeholder="Enter first name"
                            className={`
                                w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-purple-500
                                ${getFieldError('firstName')
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 focus:border-purple-500'
                                }
                            `}
                        />
                    </div>
                    {getFieldError('firstName') && (
                        <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                    )}
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={onInputChange}
                            onBlur={onBlur}
                            placeholder="Enter last name"
                            className={`
                                w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-purple-500
                                ${getFieldError('lastName')
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 focus:border-purple-500'
                                }
                            `}
                        />
                    </div>
                    {getFieldError('lastName') && (
                        <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={onInputChange}
                            onBlur={onBlur}
                            placeholder="your@email.com"
                            className={`
                                w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-purple-500
                                ${getFieldError('email')
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 focus:border-purple-500'
                                }
                            `}
                        />
                    </div>
                    {getFieldError('email') && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                </div>

                {/* Mobile */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={onInputChange}
                            onBlur={onBlur}
                            placeholder="9876543210"
                            maxLength={10}
                            className={`
                                w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-purple-500
                                ${getFieldError('mobile')
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 focus:border-purple-500'
                                }
                            `}
                        />
                    </div>
                    {getFieldError('mobile') && (
                        <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={onInputChange}
                            onBlur={onBlur}
                            placeholder="Min. 8 characters"
                            className={`
                                w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-purple-500
                                ${getFieldError('password')
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 focus:border-purple-500'
                                }
                            `}
                        />
                        <button
                            type="button"
                            onClick={onTogglePassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {getFieldError('password') && (
                        <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                    )}
                    
                    {/* Password hint text - OPTIONAL: You can keep this or remove it */}
                    <p className="text-xs text-gray-500 mt-1">
                        Min. 8 characters with 1 uppercase & 1 number
                    </p>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={onInputChange}
                            onBlur={onBlur}
                            placeholder="Re-enter password"
                            className={`
                                w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-purple-500
                                ${getFieldError('confirmPassword')
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 focus:border-purple-500'
                                }
                            `}
                        />
                        <button
                            type="button"
                            onClick={onToggleConfirmPassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
                        >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {getFieldError('confirmPassword') && (
                        <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                    )}
                </div>
            </div>

            {/* Password Strength Indicator - REMOVED COMPLETELY */}
            {/* The green lines section has been removed */}
            
        </div>
    );
};

export default BasicInfoStep;