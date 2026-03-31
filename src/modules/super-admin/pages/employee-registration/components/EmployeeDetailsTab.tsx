// src/components/registration/EmployeeDetailsTab.tsx

import React from 'react';
import { 
    User, Mail, Phone, Lock, Eye, EyeOff, Award, Briefcase, 
    Building, MapPin, Shield, ChevronDown
} from 'lucide-react';
import type { EmployeeDetailsTabProps } from './types';

const EmployeeDetailsTab: React.FC<EmployeeDetailsTabProps> = ({
    formData,
    errors,
    designations,
    departments,
    managers,
    locations,
    userRoles,
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
            {/* Employee Information Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                    Employee Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Employee Code */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-purple-500" />
                            Employee Code <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="employeeCode"
                            value={formData.employeeCode}
                            onChange={onInputChange}
                            onBlur={onBlur}
                            placeholder="Enter employee code"
                            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                ${getFieldError('employeeCode')
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 hover:border-purple-400'
                                }`}
                        />
                        {getFieldError('employeeCode') && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {errors.employeeCode}
                            </p>
                        )}
                    </div>
                     {/* User Role */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5 text-purple-500" />
                             Role <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                name="role"
                                value={formData.role}
                                onChange={onInputChange}
                                onBlur={onBlur}
                                className={`w-full px-3 py-2 text-sm rounded-lg border appearance-none
                                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                    ${getFieldError('role')
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-300 hover:border-purple-400'
                                    }`}
                            >
                                <option value="" disabled>Select role</option>
                                {userRoles.map(role => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        {getFieldError('role') && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {errors.role}
                            </p>
                        )}
                    </div>
                    {/* ✅ FULL NAME - Fixed */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-purple-500" />
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="fullName"  // ✅ Changed to fullName
                            value={formData.fullName}
                            onChange={onInputChange}
                            onBlur={onBlur}
                            placeholder="Enter full name"
                            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                ${getFieldError('fullName')  // ✅ Changed to fullName
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 hover:border-purple-400'
                                }`}
                        />
                        {getFieldError('fullName') && (  // ✅ Changed to fullName
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {errors.fullName}
                            </p>
                        )}
                    </div>

                   

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-purple-500" />
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={onInputChange}
                            onBlur={onBlur}
                            placeholder="Enter email address"
                            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                ${getFieldError('email')
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 hover:border-purple-400'
                                }`}
                        />
                        {getFieldError('email') && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Mobile */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-purple-500" />
                            Mobile <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-400 text-sm">+91</span>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={onInputChange}
                                onBlur={onBlur}
                                placeholder="9876543210"
                                maxLength={10}
                                className={`w-full pl-12 pr-3 py-2 text-sm rounded-lg border transition-all duration-200
                                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                    ${getFieldError('mobile')
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-300 hover:border-purple-400'
                                    }`}
                            />
                        </div>
                        {getFieldError('mobile') && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {errors.mobile}
                            </p>
                        )}
                    </div>

                    {/* Designation */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-purple-500" />
                            Designation <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                name="designation"
                                value={formData.designation}
                                onChange={onInputChange}
                                onBlur={onBlur}
                                className={`w-full px-3 py-2 text-sm rounded-lg border appearance-none
                                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                    ${getFieldError('designation')
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-300 hover:border-purple-400'
                                    }`}
                            >
                                <option value="" disabled>Select designation</option>
                                {designations.map(des => (
                                <option key={des.id} value={des.id}>{des.name}</option>
                            ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        {getFieldError('designation') && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {errors.designation}
                            </p>
                        )}
                    </div>

                    {/* Department */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-purple-500" />
                            Department <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                name="department"
                                value={formData.department}
                                onChange={onInputChange}
                                onBlur={onBlur}
                                className={`w-full px-3 py-2 text-sm rounded-lg border appearance-none
                                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                    ${getFieldError('department')
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-300 hover:border-purple-400'
                                    }`}
                            >
                                <option value="" disabled>Select department</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        {getFieldError('department') && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {errors.department}
                            </p>
                        )}
                    </div>

                    {/* Reporting Manager */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-purple-500" />
                            Reporting Manager <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                name="reportingManager"
                                value={formData.reportingManager}
                                onChange={onInputChange}
                                onBlur={onBlur}
                                className={`w-full px-3 py-2 text-sm rounded-lg border appearance-none
                                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                    ${getFieldError('reportingManager')
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-300 hover:border-purple-400'
                                    }`}
                            >
                                <option value="" disabled>Select manager</option>
                                {managers.map(mgr => (
                                    <option key={mgr.id} value={mgr.id}>{mgr.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        {getFieldError('reportingManager') && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {errors.reportingManager}
                            </p>
                        )}
                    </div>

                    {/* Work Location */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-purple-500" />
                            Work Location <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                name="location"
                                value={formData.location}
                                onChange={onInputChange}
                                onBlur={onBlur}
                                className={`w-full px-3 py-2 text-sm rounded-lg border appearance-none
                                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                    ${getFieldError('location')
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-300 hover:border-purple-400'
                                    }`}
                            >
                                <option value="" disabled>Select location</option>
                                {locations.map(loc => (
                                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        {getFieldError('location') && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {errors.location}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5 text-purple-500" />
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={onInputChange}
                                onBlur={onBlur}
                                placeholder="Enter password"
                                className={`w-full px-3 py-2 text-sm rounded-lg border pr-10
                                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                    ${getFieldError('password')
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-300 hover:border-purple-400'
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={onTogglePassword}
                                className="absolute right-3 top-2 text-gray-400 hover:text-purple-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {getFieldError('password') && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5 text-purple-500" />
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={onInputChange}
                                onBlur={onBlur}
                                placeholder="Confirm password"
                                className={`w-full px-3 py-2 text-sm rounded-lg border pr-10
                                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                    ${getFieldError('confirmPassword')
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-300 hover:border-purple-400'
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={onToggleConfirmPassword}
                                className="absolute right-3 top-2 text-gray-400 hover:text-purple-600 transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {getFieldError('confirmPassword') && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Required Fields Note */}
            <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    <span className="text-xs text-gray-600">All fields are mandatory</span>
                </div>
                <span className="text-xs text-gray-400">
                    <span className="text-red-500">*</span> Required
                </span>
            </div>
        </div>
    );
};

export default EmployeeDetailsTab;