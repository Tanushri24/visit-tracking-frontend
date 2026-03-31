// src/modules/super-admin/pages/master-management/components/FilterMenu.tsx

import React from 'react';
import { X } from 'lucide-react';

interface FilterMenuProps {
  showFilterMenu: boolean;
  selectedRole: string;
  selectedStatus: string;
  selectedDepartment: string;
  roleOptions: Array<{ value: string; label: string }>;
  statusOptions: Array<{ value: string; label: string }>;
  departmentOptions: Array<{ value: string; label: string }>;
  hasActiveFilters: boolean;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onClearFilters: () => void;
  onClose: () => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  showFilterMenu,
  selectedRole,
  selectedStatus,
  selectedDepartment,
  roleOptions,
  statusOptions,
  departmentOptions,
  hasActiveFilters,
  onRoleChange,
  onStatusChange,
  onDepartmentChange,
  onClearFilters,
  onClose
}) => {
  if (!showFilterMenu) return null;

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>
      
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Role</label>
        <select
          value={selectedRole}
          onChange={(e) => onRoleChange(e.target.value)}
          className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {roleOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Department</label>
        <select
          value={selectedDepartment}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {departmentOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      
      <button
        onClick={onClose}
        className="w-full mt-2 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterMenu;