// src/modules/super-admin/pages/master-management/components/UserTable.tsx

import React from 'react';
import { Mail, Phone, Building2, UserCog, MapPin, Award, Edit2, Trash2 } from 'lucide-react';

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

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
          <UserCog className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-gray-400 text-sm font-medium">No users found</p>
        <p className="text-xs text-gray-300 mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
            <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
            <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Designation</th>
            <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
            <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
            <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Manager</th>
            <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
            <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            <th className="px-3 py-2.5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-xs shadow-sm flex-shrink-0">
                    {user.fullName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-xs sm:text-sm">{user.fullName}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1">
                      <Award className="w-2.5 h-2.5" />
                      {user.employeeCode}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-2.5">
                <div className="text-xs sm:text-sm text-gray-700 flex items-center gap-1">
                  <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="break-all text-xs sm:text-sm">{user.email}</span>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                  <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 flex-shrink-0" />
                  <span>{user.mobile}</span>
                </div>
              </td>
              <td className="px-3 py-2.5">
                <span className="text-xs sm:text-sm text-gray-700">{user.designation}</span>
              </td>
              <td className="px-3 py-2.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-lg text-[10px] sm:text-xs font-medium">
                  <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  {user.department}
                </span>
              </td>
              <td className="px-3 py-2.5">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
                  user.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                  user.role === 'Manager' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  <UserCog className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  {user.role}
                </span>
              </td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 flex items-center justify-center text-[9px] sm:text-xs font-medium text-gray-600 flex-shrink-0">
                    {user.reportingManager.charAt(0)}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">{user.reportingManager}</span>
                </div>
              </td>
              <td className="px-3 py-2.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-lg text-[10px] sm:text-xs font-medium">
                  <MapPin className="w-2.5 h-2.5" />
                  {user.location}
                </span>
              </td>
              <td className="px-3 py-2.5">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full ${
                  user.isActive ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"
                }`}>
                  <span className={`w-1 h-1 rounded-full ${user.isActive ? "bg-green-500" : "bg-red-500"}`}></span>
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-3 py-2.5 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit User"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete User"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;