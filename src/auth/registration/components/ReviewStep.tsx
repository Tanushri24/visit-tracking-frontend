// src/components/registration/ReviewStep.tsx

import React from 'react';
import { User, Briefcase, Calendar, MapPin, Mail, Phone } from 'lucide-react';
import type { ReviewStepProps } from './types';

const ReviewStep: React.FC<ReviewStepProps> = ({
    formData,
    agreeToTerms,
    onTermsChange
}) => {
    return (
        <div className="space-y-6">
            {/* Basic Information Review */}
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
                <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <User className="w-3 h-3" /> Full Name
                        </p>
                        <p className="font-medium text-gray-800">
                            {formData.firstName} {formData.lastName}
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" /> Email
                        </p>
                        <p className="font-medium text-gray-800">{formData.email}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" /> Mobile
                        </p>
                        <p className="font-medium text-gray-800">{formData.mobile}</p>
                    </div>
                </div>
            </div>

            {/* Professional Information Review */}
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
                <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Employee Code</p>
                        <p className="font-medium text-gray-800">{formData.employeeCode}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Designation</p>
                        <p className="font-medium text-gray-800">{formData.designation}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Department</p>
                        <p className="font-medium text-gray-800">{formData.department}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Reporting Manager</p>
                        <p className="font-medium text-gray-800">{formData.reportingManager}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> Work Location
                        </p>
                        <p className="font-medium text-gray-800">{formData.location}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Joining Date
                        </p>
                        <p className="font-medium text-gray-800">
                            {new Date(formData.joiningDate).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-white border border-purple-200 rounded-lg p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={(e) => onTermsChange(e.target.checked)}
                        className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-600">
                        I agree to the{' '}
                        <a href="#" className="text-purple-600 hover:underline font-medium">
                            Terms and Conditions
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-purple-600 hover:underline font-medium">
                            Privacy Policy
                        </a>
                    </span>
                </label>
            </div>
        </div>
    );
};

export default ReviewStep;