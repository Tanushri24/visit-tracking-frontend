// src/modules/super-admin/pages/master-management/components/UserCard.tsx

import React from 'react';
import { Mail, Phone, Building2, UserCog, MapPin, Award } from 'lucide-react';

interface User {
  id: number;
  employeeCode: string;
  fullName: string;
  email: string;
  mobile: string;
  designation: string;
  department: string;
  role: string;
  reportingManager: string;
  location: string;
  isActive: boolean;
}

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-3 border-b border-gray-100">
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {user.fullName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 text-sm truncate">{user.fullName}</h3>
              <p className="text-[10px] text-gray-400 flex items-center gap-1">
                <Award className="w-2.5 h-2.5" />
                {user.employeeCode}
              </p>
            </div>
          </div>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-full flex-shrink-0 ${
            user.isActive ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"
          }`}>
            <span className={`w-1 h-1 rounded-full ${user.isActive ? "bg-green-500" : "bg-red-500"}`}></span>
            {user.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
      
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[10px] font-medium text-gray-500 flex items-center gap-1 whitespace-nowrap">
            <Mail className="w-3 h-3" /> EMAIL
          </span>
          <span className="text-xs text-gray-700 text-right break-all">{user.email}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-medium text-gray-500 flex items-center gap-1">
            <Phone className="w-3 h-3" /> MOBILE
          </span>
          <span className="text-xs text-gray-700">{user.mobile}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-medium text-gray-500">DESIGNATION</span>
          <span className="text-xs text-gray-700 text-right">{user.designation}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-medium text-gray-500">DEPARTMENT</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-lg text-[10px]">
            <Building2 className="w-2.5 h-2.5" />
            {user.department}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-medium text-gray-500">ROLE</span>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
            user.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
            user.role === 'Manager' ? 'bg-orange-100 text-orange-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            <UserCog className="w-2.5 h-2.5" />
            {user.role}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-medium text-gray-500">MANAGER</span>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[9px] font-medium text-gray-600">
              {user.reportingManager.charAt(0)}
            </div>
            <span className="text-xs text-gray-700">{user.reportingManager}</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-medium text-gray-500">LOCATION</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-lg text-[10px]">
            <MapPin className="w-2.5 h-2.5" />
            {user.location}
          </span>
        </div>
        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 mt-2">
          <button
            onClick={() => onEdit(user)}
            className="px-3 py-1 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="px-3 py-1 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;