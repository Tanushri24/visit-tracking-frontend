import React from 'react';
import { Car, Ruler, IndianRupee } from 'lucide-react';

// ==================== LOCAL INTERFACE ====================
export interface VisitsEntryForm {
  visitDate: string;
  employeeName: string;
  employeeDesignation: string;
  company: string;
  organisation: string;
  department: string;
  contactPerson: string;
  contactNumber: string;
  cityLocation: string;
  visitType: string;
  visitPurpose: string;
  discussionSummary: string;
  nextAction: string;
  nextFollowUpDate: string;
  travelMode: string;
  distanceTravelled: number;
  ratePerKm: number;
  autoExpenseCalculation: number;
  funnelStage: string;
  expectedBusinessValue: number;
  outcomeGenerated: string;
  probability: number;
  remarks: string;
  attachment: File | null;
  checkInTime: string;
  checkOutTime: string;
}

// ==================== LOCAL CONSTANTS ====================
const travelModeOptions = ['Car', 'Bike', 'Public Transport', 'Walk', 'Other'];

// ==================== COMPONENT PROPS ====================
interface Props {
  formData: VisitsEntryForm;
  errors: Partial<Record<keyof VisitsEntryForm, string>>;
  touched: Set<string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  getFieldError: (fieldName: keyof VisitsEntryForm) => string | undefined;
}

// ==================== COMPONENT ====================
const TravelExpenseTab: React.FC<Props> = ({
  formData, errors, onInputChange, onBlur, getFieldError
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
        <Car className="w-5 h-5 text-blue-600" />
        Travel & Expense
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Travel Mode */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-blue-500" />
            Travel Mode <span className="text-red-500">*</span>
          </label>
          <select
            name="travelMode" value={formData.travelMode}
            onChange={onInputChange} onBlur={onBlur}
            className={`w-full px-3 py-2 text-sm rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('travelMode') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <option value="">Select travel mode</option>
            {travelModeOptions.map(mode => (
              <option key={mode} value={mode}>{mode}</option>
            ))}
          </select>
          {getFieldError('travelMode') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.travelMode}
            </p>
          )}
        </div>

        {/* Distance Travelled */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-blue-500" />
            Distance Travelled (km) <span className="text-red-500">*</span>
          </label>
          <input
            type="number" step="0.1" name="distanceTravelled" value={formData.distanceTravelled || ''}
            onChange={onInputChange} onBlur={onBlur} placeholder="0.0"
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('distanceTravelled') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          />
          {getFieldError('distanceTravelled') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.distanceTravelled}
            </p>
          )}
        </div>

        {/* Rate per Km */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-blue-500" />
            Rate per Km (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number" step="0.5" name="ratePerKm" value={formData.ratePerKm || ''}
            onChange={onInputChange} onBlur={onBlur} placeholder="0.00"
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('ratePerKm') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          />
          {getFieldError('ratePerKm') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.ratePerKm}
            </p>
          )}
        </div>

        {/* Auto Expense (read-only) */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-blue-500" />
            Travel Expense (Auto)
          </label>
          <input
            type="text"
            value={`₹ ${formData.autoExpenseCalculation.toFixed(2)}`}
            readOnly
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default TravelExpenseTab;