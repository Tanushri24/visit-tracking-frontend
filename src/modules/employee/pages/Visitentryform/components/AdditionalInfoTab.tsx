import React from 'react';
import { MessageSquare, Paperclip, LogIn, LogOut } from 'lucide-react';

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

// ==================== COMPONENT PROPS ====================
interface Props {
  formData: VisitsEntryForm;
  errors: Partial<Record<keyof VisitsEntryForm, string>>;
  touched: Set<string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getFieldError: (fieldName: keyof VisitsEntryForm) => string | undefined;
}

// ==================== COMPONENT ====================
const AdditionalInfoTab: React.FC<Props> = ({
  formData, errors, onInputChange, onBlur, onFileChange, getFieldError
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        Additional Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Remarks */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
            Remarks
          </label>
          <textarea
            name="remarks" rows={2} value={formData.remarks}
            onChange={onInputChange} onBlur={onBlur}
            placeholder="Any additional remarks..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200"
          />
        </div>

        {/* Attachment */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <Paperclip className="w-3.5 h-3.5 text-blue-500" />
            Attachment
          </label>
          <input
            type="file" name="attachment" onChange={onFileChange}
            className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {formData.attachment && (
            <p className="text-xs text-gray-500 mt-1">Selected: {formData.attachment.name}</p>
          )}
        </div>

        {/* Check-In Time */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <LogIn className="w-3.5 h-3.5 text-blue-500" />
            Check-In Time <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local" name="checkInTime" value={formData.checkInTime.slice(0, 16)}
            onChange={onInputChange} onBlur={onBlur}
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('checkInTime') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          />
          {getFieldError('checkInTime') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.checkInTime}
            </p>
          )}
        </div>

        {/* Check-Out Time */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <LogOut className="w-3.5 h-3.5 text-blue-500" />
            Check-Out Time <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local" name="checkOutTime" value={formData.checkOutTime.slice(0, 16)}
            onChange={onInputChange} onBlur={onBlur}
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('checkOutTime') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          />
          {getFieldError('checkOutTime') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.checkOutTime}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoTab;