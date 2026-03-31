// src/components/registration/ProfessionalInfoStep.tsx

import React from 'react';
import { 
    Award, Briefcase, Building, User, 
    MapPin, Calendar, Upload, Camera 
} from 'lucide-react';
import type { ProfessionalInfoStepProps } from './types';

const ProfessionalInfoStep: React.FC<ProfessionalInfoStepProps> = ({
    formData,
    errors,
    designations,
    departments,
    managers,
    locations,
    previewUrl,
    onInputChange,
    onBlur,
    onProfilePictureChange,
    getFieldError
}) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Employee Code */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Employee Code <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="employeeCode"
                            value={formData.employeeCode}
                            onChange={onInputChange}
                            onBlur={onBlur}
                            placeholder="EMP001"
                            className={`
                                w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-purple-500
                                ${getFieldError('employeeCode')
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 focus:border-purple-500'
                                }
                            `}
                        />
                    </div>
                    {getFieldError('employeeCode') && (
                        <p className="mt-1 text-sm text-red-500">{errors.employeeCode}</p>
                    )}
                </div>

                {/* Designation */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designation <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            name="designation"
                            value={formData.designation}
                            onChange={onInputChange}
                            onBlur={onBlur}
                            className={`
                                w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none
                                ${getFieldError('designation')
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 focus:border-purple-500'
                                }
                            `}
                        >
                            <option value="">Select Designation</option>
                            {designations.map(des => (
                                <option key={des.id} value={des.id}>{des.name}</option>
                            ))}
                        </select>
                    </div>
                    {getFieldError('designation') && (
                        <p className="mt-1 text-sm text-red-500">{errors.designation}</p>
                    )}
                </div>

                {/* Department */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            name="department"
                            value={formData.department}
                            onChange={onInputChange}
                            onBlur={onBlur}
                            className={`
                                w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none
                                ${getFieldError('department')
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 focus:border-purple-500'
                                }
                            `}
                        >
                            <option value="">Select Department</option>
                            {departments.map(dept => (
                                <option key={dept.id} value={dept.id}>{dept.name}</option>
                            ))}
                        </select>
                    </div>
                    {getFieldError('department') && (
                        <p className="mt-1 text-sm text-red-500">{errors.department}</p>
                    )}
                </div>

                {/* Reporting Manager */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reporting Manager <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            name="reportingManager"
                            value={formData.reportingManager}
                            onChange={onInputChange}
                            onBlur={onBlur}
                            className={`
                                w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none
                                ${getFieldError('reportingManager')
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 focus:border-purple-500'
                                }
                            `}
                        >
                            <option value="">Select Manager</option>
                            {managers.map(mgr => (
                                <option key={mgr.id} value={mgr.id}>{mgr.name}</option>
                            ))}
                        </select>
                    </div>
                    {getFieldError('reportingManager') && (
                        <p className="mt-1 text-sm text-red-500">{errors.reportingManager}</p>
                    )}
                </div>

                {/* Work Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            name="location"
                            value={formData.location}
                            onChange={onInputChange}
                            onBlur={onBlur}
                            className={`
                                w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none
                                ${getFieldError('location')
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 focus:border-purple-500'
                                }
                            `}
                        >
                            <option value="">Select Location</option>
                            {locations.map(loc => (
                                <option key={loc.id} value={loc.id}>{loc.name}</option>
                            ))}
                        </select>
                    </div>
                    {getFieldError('location') && (
                        <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                    )}
                </div>

                {/* Joining Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Joining Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="date"
                            name="joiningDate"
                            value={formData.joiningDate}
                            onChange={onInputChange}
                            onBlur={onBlur}
                            className={`
                                w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-purple-500
                                ${getFieldError('joiningDate')
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 focus:border-purple-500'
                                }
                            `}
                        />
                    </div>
                    {getFieldError('joiningDate') && (
                        <p className="mt-1 text-sm text-red-500">{errors.joiningDate}</p>
                    )}
                </div>
            </div>

            {/* Profile Picture Upload */}
            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture
                </label>
                <div className="flex items-center gap-6 p-4 bg-purple-50 rounded-lg">
                    <div className="shrink-0">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
                            {previewUrl ? (
                                <img 
                                    src={previewUrl} 
                                    alt="Profile Preview" 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Camera className="w-8 h-8 text-white" />
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onProfilePictureChange}
                            id="profile-upload"
                            className="hidden"
                        />
                        <label
                            htmlFor="profile-upload"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors border border-purple-200"
                        >
                            <Upload className="w-4 h-4" />
                            Upload Photo
                        </label>
                        <p className="mt-1 text-xs text-gray-500">
                            JPG, PNG up to 2MB
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalInfoStep;