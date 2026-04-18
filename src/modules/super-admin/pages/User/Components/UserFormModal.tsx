import React from 'react';
import {
  X,
  Save,
  Award,
  User,
  Mail,
  Phone,
  Briefcase,
  Building2,
  Shield,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  UserCog,
} from 'lucide-react';

interface SelectOption {
  id: number;
  name: string;
}

interface DesignationOption extends SelectOption {
  departmentId?: number;
}

interface EditingUser {
  id?: number | string;
}

interface UserFormData {
  employeeCode?: string;
  roleId?: number | string;
  fullName: string;
  email: string;
  mobile: string;
  departmentId?: number | string;
  designationId?: number | string;
  managerId?: number | string;
  locationId?: number | string;
  password: string;
  confirmPassword: string;
  isActive?: boolean;
}

type UserFormErrors = Record<string, string>;
type StatusVariant = 'success' | 'error' | 'info' | 'warning';

interface UserFormStatus {
  message: string;
  variant?: StatusVariant;
}

interface UserFormModalProps {
  isOpen: boolean;
  editingUser: EditingUser | null;
  formData: UserFormData;
  errors: UserFormErrors;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isFormDataLoaded: boolean;  // ✅ New prop from parent
  designations: DesignationOption[];
  departments: SelectOption[];
  userRoles: SelectOption[];
  managers: SelectOption[];
  locations: SelectOption[];
  onClose: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  submitDisabled?: boolean;
  statusMessage?: string;
  status?: UserFormStatus;
}

const getStatusStyles = (variant: StatusVariant = 'info') => {
  switch (variant) {
    case 'success':
      return 'border-green-200 bg-green-50 text-green-700';
    case 'error':
      return 'border-red-200 bg-red-50 text-red-700';
    case 'warning':
      return 'border-yellow-200 bg-yellow-50 text-yellow-700';
    case 'info':
    default:
      return 'border-blue-200 bg-blue-50 text-blue-700';
  }
};

const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  editingUser,
  formData,
  errors,
  showPassword,
  showConfirmPassword,
  isFormDataLoaded,
  designations,
  departments,
  userRoles,
  managers,
  locations,
  onClose,
  onInputChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
  isSubmitting = false,
  submitDisabled = false,
  statusMessage,
  status,
}) => {
  if (!isOpen) return null;

  const currentUserRole = localStorage.getItem('role');
  const filteredRoles =
    currentUserRole === 'super-admin'
      ? userRoles
      : userRoles.filter((role) => role.name !== 'Super Admin' && role.name !== 'Admin');

  const selectedDepartmentId = Number(formData.departmentId);
  const hasDepartmentInfo = designations.some((des) => typeof des.departmentId === 'number');
  const filteredDesignations =
    hasDepartmentInfo && selectedDepartmentId
      ? designations.filter((des) => des.departmentId === selectedDepartmentId)
      : designations;

  const effectiveStatusMessage = status?.message ?? statusMessage;
  const effectiveStatusVariant = status?.variant ?? 'info';
  const isEditMode = Boolean(editingUser);
  const disableSubmit = submitDisabled || isSubmitting || (isEditMode && !isFormDataLoaded);

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isActive = e.target.value === 'true';
    const syntheticEvent = {
      target: {
        name: 'isActive',
        type: 'checkbox',
        checked: isActive,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onInputChange(syntheticEvent);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEditMode ? 'Edit User' : 'Add New User'}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 transition-colors hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          {effectiveStatusMessage && (
            <div className={`rounded-lg border px-4 py-3 text-sm ${getStatusStyles(effectiveStatusVariant)}`}>
              {effectiveStatusMessage}
            </div>
          )}

          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
              <Award className="h-4 w-4 text-purple-500" />
              Employee Code
            </label>
            <input
              type="text"
              name="employeeCode"
              value={formData.employeeCode || ''}
              onChange={onInputChange}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 ${errors.employeeCode ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Enter employee code (e.g., EMP001)"
            />
            {errors.employeeCode && <p className="mt-1 text-xs text-red-500">{errors.employeeCode}</p>}
          </div>

          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
              <Shield className="h-4 w-4 text-purple-500" />
              User Role <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="roleId"
                value={formData.roleId || ''}
                onChange={onInputChange}
                className={`w-full appearance-none rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 ${errors.roleId ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              >
                <option value="">Select role</option>
                {filteredRoles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            {errors.roleId && <p className="mt-1 text-xs text-red-500">{errors.roleId}</p>}
          </div>

          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
              <User className="h-4 w-4 text-purple-500" />
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onInputChange}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Enter full name"
            />
            {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
          </div>

          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
              <Mail className="h-4 w-4 text-purple-500" />
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Enter email address"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
              <Phone className="h-4 w-4 text-purple-500" />
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-sm text-gray-400">+91</span>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={onInputChange}
                maxLength={10}
                className={`w-full rounded-lg border py-2 pl-12 pr-3 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 ${errors.mobile ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="9876543210"
              />
            </div>
            {errors.mobile && <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>}
          </div>

          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
              <Building2 className="h-4 w-4 text-purple-500" />
              Department <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="departmentId"
                value={formData.departmentId || ''}
                onChange={onInputChange}
                className={`w-full appearance-none rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 ${errors.departmentId ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            {errors.departmentId && <p className="mt-1 text-xs text-red-500">{errors.departmentId}</p>}
          </div>

          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
              <Briefcase className="h-4 w-4 text-purple-500" />
              Designation <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="designationId"
                value={formData.designationId || ''}
                onChange={onInputChange}
                className={`w-full appearance-none rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 ${errors.designationId ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              >
                <option value="">Select designation</option>
                {filteredDesignations.map((des) => (
                  <option key={des.id} value={des.id}>
                    {des.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            {errors.designationId && <p className="mt-1 text-xs text-red-500">{errors.designationId}</p>}
          </div>

          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
              <UserCog className="h-4 w-4 text-purple-500" />
              Reporting Manager
            </label>
            <div className="relative">
              <select
                name="managerId"
                value={formData.managerId || ''}
                onChange={onInputChange}
                className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select manager</option>
                {managers.map((mgr) => (
                  <option key={mgr.id} value={mgr.id}>
                    {mgr.id} - {mgr.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
              <MapPin className="h-4 w-4 text-purple-500" />
              Work Location
            </label>
            <div className="relative">
              <select
                name="locationId"
                value={formData.locationId || ''}
                onChange={onInputChange}
                className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select location</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {!isEditMode && (
            <>
              <div>
                <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
                  <Lock className="h-4 w-4 text-purple-500" />
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={onInputChange}
                    className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={onTogglePassword}
                    className="absolute right-3 top-2 text-gray-400 hover:text-purple-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                <p className="mt-1 text-xs text-gray-400">Minimum 6 characters</p>
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
                  <Lock className="h-4 w-4 text-purple-500" />
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={onInputChange}
                    className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={onToggleConfirmPassword}
                    className="absolute right-3 top-2 text-gray-400 hover:text-purple-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>
            </>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
            <div className="flex gap-6">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="true"
                  checked={formData.isActive === true}
                  onChange={handleStatusChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="false"
                  checked={formData.isActive === false}
                  onChange={handleStatusChange}
                  className="h-4 w-4 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">Inactive</span>
              </label>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex gap-3 border-t border-gray-200 bg-gray-50 px-5 py-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={disableSubmit}
            className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="mr-1 inline h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {isEditMode ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              <>
                <Save className="mr-1 inline h-4 w-4" />
                {isEditMode ? 'Update User' : 'Add User'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export type {
  DesignationOption,
  EditingUser,
  SelectOption,
  StatusVariant,
  UserFormData,
  UserFormErrors,
  UserFormModalProps,
  UserFormStatus,
};

export default UserFormModal;