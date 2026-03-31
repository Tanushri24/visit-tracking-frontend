// src/modules/super-admin/pages/master-management/components/FilterChips.tsx

import React from 'react';
import { X } from 'lucide-react';

interface FilterChipsProps {
  selectedRole: string;
  selectedStatus: string;
  selectedDepartment: string;
  searchQuery: string;
  onClearRole: () => void;
  onClearStatus: () => void;
  onClearDepartment: () => void;
  onClearSearch: () => void;
  onClearAll: () => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({
  selectedRole,
  selectedStatus,
  selectedDepartment,
  searchQuery,
  onClearRole,
  onClearStatus,
  onClearDepartment,
  onClearSearch,
  onClearAll
}) => {
  const hasActiveFilters = selectedRole !== 'all' || selectedStatus !== 'all' || 
                          selectedDepartment !== 'all' || searchQuery !== '';

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[10px] text-gray-500">Active filters:</span>
      {selectedRole !== 'all' && (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[10px]">
          Role: {selectedRole}
          <button onClick={onClearRole} className="hover:text-blue-900">
            <X className="w-2.5 h-2.5" />
          </button>
        </span>
      )}
      {selectedStatus !== 'all' && (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-50 text-green-700 rounded-md text-[10px]">
          Status: {selectedStatus === 'active' ? 'Active' : 'Inactive'}
          <button onClick={onClearStatus} className="hover:text-green-900">
            <X className="w-2.5 h-2.5" />
          </button>
        </span>
      )}
      {selectedDepartment !== 'all' && (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded-md text-[10px]">
          Dept: {selectedDepartment}
          <button onClick={onClearDepartment} className="hover:text-purple-900">
            <X className="w-2.5 h-2.5" />
          </button>
        </span>
      )}
      {searchQuery && (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-md text-[10px]">
          Search: {searchQuery.length > 15 ? searchQuery.substring(0, 15) + '...' : searchQuery}
          <button onClick={onClearSearch} className="hover:text-gray-900">
            <X className="w-2.5 h-2.5" />
          </button>
        </span>
      )}
      <button
        onClick={onClearAll}
        className="text-[10px] text-red-600 hover:text-red-700 underline"
      >
        Clear all
      </button>
    </div>
  );
};

export default FilterChips;