import { X, Save, Award, User, Mail, Phone, Briefcase, Building2, Shield, MapPin, Lock, Eye, EyeOff, ChevronDown, UserCog } from 'lucide-react';

interface UserFormModalProps {
  isOpen: boolean;
  editingUser: any;
  formData: any;
  errors: Record<string, string>;
  showPassword: boolean;
  showConfirmPassword: boolean;
  designations: Array<{ id: number; name: string }>;
  departments: Array<{ id: number; name: string }>;
  userRoles: Array<{ id: number; name: string }>;
  managers: Array<{ id: number; name: string }>;
  locations: Array<{ id: number; name: string }>;
  onClose: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onSubmit: () => void;
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  editingUser,
  formData,
  errors,
  showPassword,
  showConfirmPassword,
  designations,
  departments,
  userRoles,
  managers,
  locations,
  onClose,
  onInputChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {editingUser ? 'Edit User' : 'Add New User'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-5 space-y-4">
          {/* Employee Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Award className="w-4 h-4 text-purple-500" />
              Employee Code
            </label>
            <input
              type="text"
              name="employeeCode"
              value={formData.employeeCode || ''}
              onChange={onInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm
                ${errors.employeeCode ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Enter employee code (e.g., EMP001)"
            />
            {errors.employeeCode && <p className="text-xs text-red-500 mt-1">{errors.employeeCode}</p>}
          </div>
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <User className="w-4 h-4 text-purple-500" />
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm
                ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Enter full name"
            />
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
          </div>
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Mail className="w-4 h-4 text-purple-500" />
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm
                ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Enter email address"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          
          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Phone className="w-4 h-4 text-purple-500" />
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400 text-sm">+91</span>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={onInputChange}
                maxLength={10}
                className={`w-full pl-12 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm
                  ${errors.mobile ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="9876543210"
              />
            </div>
            {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
          </div>
          
          {/* Department - Now above Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Building2 className="w-4 h-4 text-purple-500" />
              Department <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="departmentId"
                value={formData.departmentId || ''}
                onChange={onInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none
                  ${errors.departmentId ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              >
                <option value="">Select department</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {errors.departmentId && <p className="text-xs text-red-500 mt-1">{errors.departmentId}</p>}
          </div>
          
          {/* Designation - Moved below Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Briefcase className="w-4 h-4 text-purple-500" />
              Designation <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="designationId"
                value={formData.designationId || ''}
                onChange={onInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none
                  ${errors.designationId ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              >
                <option value="">Select designation</option>
                {designations.map(des => (
                  <option key={des.id} value={des.id}>{des.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {errors.designationId && <p className="text-xs text-red-500 mt-1">{errors.designationId}</p>}
          </div>
          
          {/* Role - Using ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Shield className="w-4 h-4 text-purple-500" />
              User Role <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="roleId"
                value={formData.roleId || ''}
                onChange={onInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none
                  ${errors.roleId ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              >
                <option value="">Select role</option>
                {userRoles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {errors.roleId && <p className="text-xs text-red-500 mt-1">{errors.roleId}</p>}
          </div>
          
          {/* Reporting Manager - Using ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <UserCog className="w-4 h-4 text-purple-500" />
              Reporting Manager
            </label>
            <div className="relative">
              <select
                name="managerId"
                value={formData.managerId || ''}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none"
              >
                <option value="">Select manager</option>
                {managers.map(mgr => (
                  <option key={mgr.id} value={mgr.id}>{mgr.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          {/* Work Location - Using ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-purple-500" />
              Work Location
            </label>
            <div className="relative">
              <select
                name="locationId"
                value={formData.locationId || ''}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none"
              >
                <option value="">Select location</option>
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          {/* Password - Only for new users */}
          {!editingUser && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Lock className="w-4 h-4 text-purple-500" />
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={onInputChange}
                    className={`w-full px-3 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm
                      ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={onTogglePassword}
                    className="absolute right-3 top-2 text-gray-400 hover:text-purple-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Lock className="w-4 h-4 text-purple-500" />
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={onInputChange}
                    className={`w-full px-3 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm
                      ${errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={onToggleConfirmPassword}
                    className="absolute right-3 top-2 text-gray-400 hover:text-purple-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
              </div>
            </>
          )}
          
          {/* Active Status */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={onInputChange}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Active Status</span>
            </label>
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-5 py-3 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-sm font-medium"
          >
            <Save className="w-4 h-4 inline mr-1" />
            {editingUser ? 'Update User' : 'Add User'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;