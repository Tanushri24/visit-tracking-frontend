import React from 'react';
import { TrendingUp, IndianRupee, Award } from 'lucide-react';

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
const funnelStageOptions = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed'];
const outcomeOptions = ['Won', 'Lost', 'Pending', 'In Progress'];

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
const BusinessOutcomeTab: React.FC<Props> = ({
  formData, errors, onInputChange, onBlur, getFieldError
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        Business & Outcome
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Funnel Stage */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
            Funnel Stage <span className="text-red-500">*</span>
          </label>
          <select
            name="funnelStage" value={formData.funnelStage}
            onChange={onInputChange} onBlur={onBlur}
            className={`w-full px-3 py-2 text-sm rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('funnelStage') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <option value="">Select stage</option>
            {funnelStageOptions.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
          {getFieldError('funnelStage') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.funnelStage}
            </p>
          )}
        </div>

        {/* Expected Business Value */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-blue-500" />
            Expected Business Value (₹)
          </label>
          <input
            type="number" step="1000" name="expectedBusinessValue" value={formData.expectedBusinessValue || ''}
            onChange={onInputChange} onBlur={onBlur} placeholder="0"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200"
          />
        </div>

        {/* Outcome Generated */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-blue-500" />
            Outcome Generated <span className="text-red-500">*</span>
          </label>
          <select
            name="outcomeGenerated" value={formData.outcomeGenerated}
            onChange={onInputChange} onBlur={onBlur}
            className={`w-full px-3 py-2 text-sm rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('outcomeGenerated') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <option value="">Select outcome</option>
            {outcomeOptions.map(outcome => (
              <option key={outcome} value={outcome}>{outcome}</option>
            ))}
          </select>
          {getFieldError('outcomeGenerated') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.outcomeGenerated}
            </p>
          )}
        </div>

        {/* Probability */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
            Probability (%) <span className="text-red-500">*</span>
          </label>
          <input
            type="number" min="0" max="100" name="probability" value={formData.probability || ''}
            onChange={onInputChange} onBlur={onBlur} placeholder="0-100"
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('probability') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          />
          {getFieldError('probability') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.probability}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessOutcomeTab;