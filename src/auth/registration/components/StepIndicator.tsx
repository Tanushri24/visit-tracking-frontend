// src/components/registration/StepIndicator.tsx

import React from 'react';
import type { StepIndicatorProps } from './types';

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
    const steps = [
        { number: 1, label: 'Basic Info' },
        { number: 2, label: 'Professional' },
        { number: 3, label: 'Review' }
    ];

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
                {steps.map((step, index) => (
                    <React.Fragment key={step.number}>
                        <div className="flex flex-col items-center">
                            <div
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                                    transition-all duration-300
                                    ${currentStep >= step.number
                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                                        : 'bg-gray-200 text-gray-500'
                                    }
                                    ${currentStep === step.number ? 'ring-4 ring-purple-100' : ''}
                                `}
                            >
                                {step.number}
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
                ))}
            </div>
        </div>
    );
};

export default StepIndicator;