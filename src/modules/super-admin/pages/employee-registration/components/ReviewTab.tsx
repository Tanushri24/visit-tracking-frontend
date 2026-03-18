// src/components/registration/ReviewTab.tsx

import React from 'react';
import { 
    User, Briefcase, MapPin, Mail, Phone, 
    Award, Building, Shield, Lock, CheckCircle,
    ChevronRight
} from 'lucide-react';
import type { ReviewTabProps } from './types';

const ReviewTab: React.FC<ReviewTabProps> = ({
    formData,
    agreeToTerms,
    onTermsChange
}) => {
    return (
        <div className="space-y-6">
            
            {/* Header Section */}
            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                    Review Employee Information
                </h2>
                <p className="text-sm text-gray-600 mt-1 ml-8">
                    Please verify all details before submitting
                </p>
            </div>
            
            {/* Employee Information Card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        Employee Information
                    </h3>
                </div>
                
                <div className="p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Employee Code */}
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div className="flex items-center gap-2 text-purple-600 mb-1">
                                <Award className="w-4 h-4" />
                                <span className="text-xs font-medium uppercase tracking-wider">Employee Code</span>
                            </div>
                            <div className="text-base font-semibold text-gray-800 pl-6">
                                {formData.employeeCode || '—'}
                            </div>
                        </div>

                        {/* ✅ Full Name - FIXED */}
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div className="flex items-center gap-2 text-purple-600 mb-1">
                                <User className="w-4 h-4" />
                                <span className="text-xs font-medium uppercase tracking-wider">Full Name</span>
                            </div>
                            <div className="text-base font-semibold text-gray-800 pl-6">
                                {formData.fullName || '—'}  {/* ✅ Using fullName */}
                            </div>
                        </div>

                        {/* Designation */}
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div className="flex items-center gap-2 text-purple-600 mb-1">
                                <Briefcase className="w-4 h-4" />
                                <span className="text-xs font-medium uppercase tracking-wider">Designation</span>
                            </div>
                            <div className="text-base font-semibold text-gray-800 pl-6">
                                {formData.designation || '—'}
                            </div>
                        </div>

                        {/* Department */}
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div className="flex items-center gap-2 text-purple-600 mb-1">
                                <Building className="w-4 h-4" />
                                <span className="text-xs font-medium uppercase tracking-wider">Department</span>
                            </div>
                            <div className="text-base font-semibold text-gray-800 pl-6">
                                {formData.department || '—'}
                            </div>
                        </div>

                        {/* Reporting Manager */}
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div className="flex items-center gap-2 text-purple-600 mb-1">
                                <User className="w-4 h-4" />
                                <span className="text-xs font-medium uppercase tracking-wider">Reporting Manager</span>
                            </div>
                            <div className="text-base font-semibold text-gray-800 pl-6">
                                {formData.reportingManager || '—'}
                            </div>
                        </div>

                        {/* Work Location */}
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div className="flex items-center gap-2 text-purple-600 mb-1">
                                <MapPin className="w-4 h-4" />
                                <span className="text-xs font-medium uppercase tracking-wider">Work Location</span>
                            </div>
                            <div className="text-base font-semibold text-gray-800 pl-6">
                                {formData.location || '—'}
                            </div>
                        </div>

                        {/* User Role */}
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div className="flex items-center gap-2 text-purple-600 mb-1">
                                <Shield className="w-4 h-4" />
                                <span className="text-xs font-medium uppercase tracking-wider">User Role</span>
                            </div>
                            <div className="text-base font-semibold text-gray-800 pl-6 capitalize">
                                {formData.role || '—'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Information Card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                        <Lock className="w-5 h-5" />
                        Account Information
                    </h3>
                </div>
                
                <div className="p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Email */}
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div className="flex items-center gap-2 text-purple-600 mb-1">
                                <Mail className="w-4 h-4" />
                                <span className="text-xs font-medium uppercase tracking-wider">Email Address</span>
                            </div>
                            <div className="text-base font-semibold text-gray-800 pl-6 break-all">
                                {formData.email || '—'}
                            </div>
                        </div>

                        {/* Mobile */}
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div className="flex items-center gap-2 text-purple-600 mb-1">
                                <Phone className="w-4 h-4" />
                                <span className="text-xs font-medium uppercase tracking-wider">Mobile Number</span>
                            </div>
                            <div className="text-base font-semibold text-gray-800 pl-6">
                                {formData.mobile || '—'}
                            </div>
                        </div>

                        {/* Password */}
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div className="flex items-center gap-2 text-purple-600 mb-1">
                                <Lock className="w-4 h-4" />
                                <span className="text-xs font-medium uppercase tracking-wider">Password</span>
                            </div>
                            <div className="text-base font-semibold text-gray-800 pl-6">
                                ••••••••
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Row - Quick Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-100">
                    <div className="text-xs text-purple-600 font-medium">Employee</div>
                    <div className="text-sm font-bold text-gray-800 truncate">
                        {formData.employeeCode}
                    </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-100">
                    <div className="text-xs text-purple-600 font-medium">Name</div>
                    <div className="text-sm font-bold text-gray-800 truncate">
                        {formData.fullName?.split(' ')[0] || '—'}  {/* ✅ First name only for summary */}
                    </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-100">
                    <div className="text-xs text-purple-600 font-medium">Role</div>
                    <div className="text-sm font-bold text-gray-800 truncate capitalize">
                        {formData.role}
                    </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-100">
                    <div className="text-xs text-purple-600 font-medium">Location</div>
                    <div className="text-sm font-bold text-gray-800 truncate">
                        {formData.location?.split(' ')[0] || '—'}
                    </div>
                </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-white border border-purple-200 rounded-xl p-5 shadow-sm">
                <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={(e) => onTermsChange(e.target.checked)}
                        className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 group-hover:border-purple-400 transition-colors"
                    />
                    <span className="text-sm text-gray-700 leading-relaxed">
                        <span className="font-medium">I confirm</span> that all the information provided is correct and 
                        I agree to the{' '}
                        <a href="#" className="text-purple-600 hover:text-purple-800 hover:underline font-semibold">
                            Terms and Conditions
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-purple-600 hover:text-purple-800 hover:underline font-semibold">
                            Privacy Policy
                        </a>
                    </span>
                </label>
            </div>

            {/* Success Message */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                <div className="shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                    <h4 className="text-base font-semibold text-green-800">Ready to Submit</h4>
                    <p className="text-sm text-green-700 mt-0.5">
                        Please review all information carefully before creating the employee.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReviewTab;