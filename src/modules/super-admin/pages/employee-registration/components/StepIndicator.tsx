// src/components/registration/StepIndicator.tsx

import React from 'react';
import type { StepIndicatorProps } from './types';
import { CheckCircle, User, FileText } from 'lucide-react';

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between max-w-md mx-auto"> {/* Reduced max-width */}
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <React.Fragment key={step.number}>
                            <div className="flex flex-col items-center">
                                <div
                                    className={`
                                        w-12 h-12 rounded-full flex items-center justify-center font-semibold
                                        transition-all duration-300 relative
                                        ${currentStep >= step.number
                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-200'
                                            : 'bg-gray-200 text-gray-500'
                                        }
                                        ${currentStep === step.number ? 'ring-4 ring-purple-100' : ''}
                                    `}
                                >
                                    {currentStep > step.number ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        <Icon className="w-5 h-5" />
                                    )}
                                </div>
                                <span
                                    className={`
                                        text-xs mt-2 font-medium
                                        ${currentStep >= step.number ? 'text-purple-600' : 'text-gray-400'}
                                    `}
                                >
                                    {step.label}
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`
                                        flex-1 h-1 mx-4 rounded
                                        ${currentStep > step.number ? 'bg-purple-600' : 'bg-gray-200'}
                                    `}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default StepIndicator;