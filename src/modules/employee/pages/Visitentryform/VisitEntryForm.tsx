import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

// ==================== IMPORT VALIDATION (interface + validation) ====================
import { validateVisitsForm } from './validation';
import type { VisitsEntryForm, ValidationErrors } from './validation';

// ==================== IMPORT TABS ====================
import VisitInformationTab from './components/VisitInformationTab';
import TravelExpenseTab from './components/TravelExpenseTab';
import BusinessOutcomeTab from './components/BusinessOutcomeTab';
import AdditionalInfoTab from './components/AdditionalInfoTab';

// ==================== MAIN COMPONENT ====================
const VisitEntryForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<VisitsEntryForm>({
    visitDate: '',
    employeeName: '',
    employeeDesignation: '',
    company: '',
    organisation: '',
    department: '',
    contactPerson: '',
    contactNumber: '',
    cityLocation: '',
    visitType: '',
    visitPurpose: '',
    discussionSummary: '',
    nextAction: '',
    nextFollowUpDate: '',
    travelMode: '',
    distanceTravelled: 0,
    ratePerKm: 0,
    autoExpenseCalculation: 0,
    funnelStage: '',
    expectedBusinessValue: 0,
    outcomeGenerated: '',
    probability: 0,
    remarks: '',
    attachment: null,
    checkInTime: '',
    checkOutTime: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  // Auto‑calculate travel expense
  const updateAutoExpense = (distance: number, rate: number) => distance * rate;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let parsedValue: any = value;

    if (type === 'number') {
      parsedValue = value === '' ? 0 : Number(value);
    }

    setFormData((prev) => {
      const updated = { ...prev, [name]: parsedValue };
      if (name === 'distanceTravelled' || name === 'ratePerKm') {
        updated.autoExpenseCalculation = updateAutoExpense(
          name === 'distanceTravelled' ? parsedValue : prev.distanceTravelled,
          name === 'ratePerKm' ? parsedValue : prev.ratePerKm
        );
      }
      return updated;
    });

    setTouched(prev => new Set(prev).add(name));
    if (errors[name as keyof VisitsEntryForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, attachment: file }));
    setTouched(prev => new Set(prev).add('attachment'));
    if (errors.attachment) setErrors(prev => ({ ...prev, attachment: undefined }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched(prev => new Set(prev).add(e.target.name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateVisitsForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      // Replace with your API call
      console.log('Form Data:', formData);
      alert('Visit created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create visit.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: keyof VisitsEntryForm) => {
    return touched.has(fieldName) ? errors[fieldName] : undefined;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Visit List
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h1 className="text-lg font-semibold text-white">Create New Visit</h1>
            <p className="text-xs text-blue-100 mt-0.5">Fill in the visit details below</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <VisitInformationTab
              formData={formData}
              errors={errors}
              touched={touched}
              onInputChange={handleChange}
              onBlur={handleBlur}
              getFieldError={getFieldError}
            />

            <TravelExpenseTab
              formData={formData}
              errors={errors}
              touched={touched}
              onInputChange={handleChange}
              onBlur={handleBlur}
              getFieldError={getFieldError}
            />

            <BusinessOutcomeTab
              formData={formData}
              errors={errors}
              touched={touched}
              onInputChange={handleChange}
              onBlur={handleBlur}
              getFieldError={getFieldError}
            />

            <AdditionalInfoTab
              formData={formData}
              errors={errors}
              touched={touched}
              onInputChange={handleChange}
              onBlur={handleBlur}
              onFileChange={handleFileChange}
              getFieldError={getFieldError}
            />

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-5 py-2 bg-blue-600 text-white rounded-md text-xs font-medium transition-all duration-200 inline-flex items-center gap-1.5 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-sm'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    Create Visit
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VisitEntryForm;
