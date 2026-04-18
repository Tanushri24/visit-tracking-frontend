import React from 'react';
import {
  Calendar, User, Briefcase, Building, Users, Phone, MapPin,
  FileText, Target, MessageSquare, CalendarDays
} from 'lucide-react';

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
const visitTypeOptions = ['Sales', 'Support', 'Training', 'Inspection', 'Other'];

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
const VisitInformationTab: React.FC<Props> = ({
  formData, errors, onInputChange, onBlur, getFieldError
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
        <Calendar className="w-5 h-5 text-blue-600" />
        Visit Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Visit Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            Visit Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date" name="visitDate" value={formData.visitDate}
            onChange={onInputChange} onBlur={onBlur}
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('visitDate') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          />
          {getFieldError('visitDate') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.visitDate}
            </p>
          )}
        </div>

        {/* Employee Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-500" />
            Employee Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text" name="employeeName" value={formData.employeeName}
            onChange={onInputChange} onBlur={onBlur} placeholder="John Doe"
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('employeeName') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          />
          {getFieldError('employeeName') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.employeeName}
            </p>
          )}
        </div>

        {/* Employee Designation */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-blue-500" />
            Designation <span className="text-red-500">*</span>
          </label>
          <input
            type="text" name="employeeDesignation" value={formData.employeeDesignation}
            onChange={onInputChange} onBlur={onBlur} placeholder="Sales Manager"
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('employeeDesignation') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          />
          {getFieldError('employeeDesignation') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.employeeDesignation}
            </p>
          )}
        </div>

        {/* Company */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-blue-500" />
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text" name="company" value={formData.company}
            onChange={onInputChange} onBlur={onBlur} placeholder="ABC Corp"
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('company') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          />
          {getFieldError('company') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.company}
            </p>
          )}
        </div>

        {/* Organisation */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-500" />
            Organisation <span className="text-red-500">*</span>
          </label>
          <input
            type="text" name="organisation" value={formData.organisation}
            onChange={onInputChange} onBlur={onBlur} placeholder="Org Name"
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('organisation') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          />
          {getFieldError('organisation') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.organisation}
            </p>
          )}
        </div>

        {/* Department */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-blue-500" />
            Department <span className="text-red-500">*</span>
          </label>
          <input
            type="text" name="department" value={formData.department}
            onChange={onInputChange} onBlur={onBlur} placeholder="Sales"
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('department') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          />
          {getFieldError('department') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.department}
            </p>
          )}
        </div>

        {/* Contact Person */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-500" />
            Contact Person <span className="text-red-500">*</span>
          </label>
          <input
            type="text" name="contactPerson" value={formData.contactPerson}
            onChange={onInputChange} onBlur={onBlur} placeholder="Jane Smith"
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('contactPerson') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          />
          {getFieldError('contactPerson') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.contactPerson}
            </p>
          )}
        </div>

        {/* Contact Number */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-blue-500" />
            Contact Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-sm">+91</span>
            <input
              type="tel" name="contactNumber" value={formData.contactNumber}
              onChange={onInputChange} onBlur={onBlur} placeholder="9876543210" maxLength={10}
              className={`w-full pl-12 pr-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                getFieldError('contactNumber') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
              }`}
            />
          </div>
          {getFieldError('contactNumber') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.contactNumber}
            </p>
          )}
        </div>

        {/* City/Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
            City / Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text" name="cityLocation" value={formData.cityLocation}
            onChange={onInputChange} onBlur={onBlur} placeholder="Mumbai"
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('cityLocation') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          />
          {getFieldError('cityLocation') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.cityLocation}
            </p>
          )}
        </div>

        {/* Visit Type */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-500" />
            Visit Type <span className="text-red-500">*</span>
          </label>
          <select
            name="visitType" value={formData.visitType}
            onChange={onInputChange} onBlur={onBlur}
            className={`w-full px-3 py-2 text-sm rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('visitType') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <option value="">Select visit type</option>
            {visitTypeOptions.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {getFieldError('visitType') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.visitType}
            </p>
          )}
        </div>

        {/* Visit Purpose */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-blue-500" />
            Visit Purpose <span className="text-red-500">*</span>
          </label>
          <input
            type="text" name="visitPurpose" value={formData.visitPurpose}
            onChange={onInputChange} onBlur={onBlur} placeholder="Product demo"
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('visitPurpose') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          />
          {getFieldError('visitPurpose') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.visitPurpose}
            </p>
          )}
        </div>

        {/* Discussion Summary */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
            Discussion Summary
          </label>
          <textarea
            name="discussionSummary" rows={3} value={formData.discussionSummary}
            onChange={onInputChange} onBlur={onBlur}
            placeholder="Brief summary of the discussion..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200"
          />
        </div>

        {/* Next Action */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-500" />
            Next Action
          </label>
          <input
            type="text" name="nextAction" value={formData.nextAction}
            onChange={onInputChange} onBlur={onBlur} placeholder="Send proposal"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200"
          />
        </div>

        {/* Next Follow-up Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-blue-500" />
            Next Follow-up Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date" name="nextFollowUpDate" value={formData.nextFollowUpDate}
            onChange={onInputChange} onBlur={onBlur}
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('nextFollowUpDate') ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          />
          {getFieldError('nextFollowUpDate') && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.nextFollowUpDate}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitInformationTab;