// src/modules/super-admin/pages/master-management/VehicleTypes.tsx

import React, { useState } from 'react';
import {
  Car,
  Bike,
  Truck,
  Zap,
  Edit2,
  Trash2,
  Search,
  Download,
  MoreVertical,
  CheckCircle,
  Save,
  X
} from 'lucide-react';

interface VehicleType {
  id: number;
  vehicleName: string;
  vehicleCode: string;
  vehicleCategory: string;
  defaultRatePerKm: number;
  isActive: boolean;
  createdAt: string;
}

const VehicleTypes: React.FC = () => {
  // State for vehicle types
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([
    {
      id: 1,
      vehicleName: "Two Wheeler",
      vehicleCode: "2W",
      vehicleCategory: "2 Wheeler",
      defaultRatePerKm: 4.00,
      isActive: true,
      createdAt: "2024-01-01"
    },
    {
      id: 2,
      vehicleName: "Four Wheeler",
      vehicleCode: "4W",
      vehicleCategory: "4 Wheeler",
      defaultRatePerKm: 10.00,
      isActive: true,
      createdAt: "2024-01-01"
    },
    {
      id: 3,
      vehicleName: "Auto Rickshaw",
      vehicleCode: "3W",
      vehicleCategory: "3 Wheeler",
      defaultRatePerKm: 6.00,
      isActive: true,
      createdAt: "2024-01-15"
    },
    {
      id: 4,
      vehicleName: "Electric Vehicle",
      vehicleCode: "EV",
      vehicleCategory: "EV",
      defaultRatePerKm: 3.50,
      isActive: true,
      createdAt: "2024-02-01"
    }
  ]);

  // UI States
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // Form Data
  const [formData, setFormData] = useState({
    vehicleName: '',
    vehicleCode: '',
    vehicleCategory: '',
    defaultRatePerKm: 0
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Category options
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: '2 Wheeler', label: '2 Wheeler' },
    { value: '3 Wheeler', label: '3 Wheeler' },
    { value: '4 Wheeler', label: '4 Wheeler' },
    { value: 'EV', label: 'Electric Vehicle' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  // Stats
  const totalVehicles = vehicleTypes.length;
  const activeVehicles = vehicleTypes.filter(v => v.isActive).length;

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case '2 Wheeler': return Bike;
      case '3 Wheeler': return Truck;
      case '4 Wheeler': return Car;
      case 'EV': return Zap;
      default: return Car;
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Vehicle Name', 'Code', 'Category', 'Rate (₹/km)', 'Status', 'Created Date'];
    const csvData = filteredVehicles.map(vehicle => [
      vehicle.vehicleName,
      vehicle.vehicleCode,
      vehicle.vehicleCategory,
      vehicle.defaultRatePerKm.toString(),
      vehicle.isActive ? 'Active' : 'Inactive',
      vehicle.createdAt
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vehicle_types_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.vehicleName.trim()) {
      errors.vehicleName = 'Vehicle name is required';
    }
    
    if (!formData.vehicleCode.trim()) {
      errors.vehicleCode = 'Vehicle code is required';
    } else if (formData.vehicleCode.length > 10) {
      errors.vehicleCode = 'Code must be less than 10 characters';
    } else if (vehicleTypes.some(v => v.vehicleCode === formData.vehicleCode && v.id !== selectedVehicle?.id)) {
      errors.vehicleCode = 'Vehicle code already exists';
    }
    
    if (!formData.vehicleCategory) {
      errors.vehicleCategory = 'Category is required';
    }
    
    if (formData.defaultRatePerKm <= 0) {
      errors.defaultRatePerKm = 'Rate must be greater than 0';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle submit
  const handleSubmit = () => {
    if (!validateForm()) return;
    
    if (modalMode === 'create') {
      const newVehicle: VehicleType = {
        id: Math.max(...vehicleTypes.map(v => v.id), 0) + 1,
        vehicleName: formData.vehicleName,
        vehicleCode: formData.vehicleCode.toUpperCase(),
        vehicleCategory: formData.vehicleCategory,
        defaultRatePerKm: formData.defaultRatePerKm,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setVehicleTypes([...vehicleTypes, newVehicle]);
    } else if (modalMode === 'edit' && selectedVehicle) {
      setVehicleTypes(vehicleTypes.map(v => 
        v.id === selectedVehicle.id 
          ? { 
              ...v, 
              vehicleName: formData.vehicleName,
              vehicleCode: formData.vehicleCode.toUpperCase(),
              vehicleCategory: formData.vehicleCategory,
              defaultRatePerKm: formData.defaultRatePerKm
            }
          : v
      ));
    }
    
    closeModal();
  };

  // Handle delete (soft delete)
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to deactivate this vehicle type?')) {
      setVehicleTypes(vehicleTypes.map(v => 
        v.id === id ? { ...v, isActive: false } : v
      ));
      setOpenMenuId(null);
    }
  };

  // Handle activate
  const handleActivate = (id: number) => {
    setVehicleTypes(vehicleTypes.map(v => 
      v.id === id ? { ...v, isActive: true } : v
    ));
    setOpenMenuId(null);
  };
  // Open edit modal
  const openEditModal = (vehicle: VehicleType) => {
    setModalMode('edit');
    setSelectedVehicle(vehicle);
    setFormData({
      vehicleName: vehicle.vehicleName,
      vehicleCode: vehicle.vehicleCode,
      vehicleCategory: vehicle.vehicleCategory,
      defaultRatePerKm: vehicle.defaultRatePerKm
    });
    setFormErrors({});
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
  };

  // Filter vehicles
  const filteredVehicles = vehicleTypes.filter(v => {
    const matchesSearch = searchQuery === '' || 
      v.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.vehicleCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || v.vehicleCategory === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && v.isActive) ||
                         (selectedStatus === 'inactive' && !v.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Vehicle Types</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">Manage vehicle types, categories, and expense rates</p>
        </div>
      </div>

      {/* Stats Cards - Improved Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-3 md:p-4 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] md:text-xs font-medium text-gray-500 mb-1">Total Vehicles</p>
              <p className="text-xl md:text-2xl font-bold text-gray-800">{totalVehicles}</p>
              <p className="text-[9px] md:text-[10px] text-gray-400 mt-1">All registered vehicles</p>
            </div>
            <div className="p-2 md:p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-200">
              <Car className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-3 md:p-4 border border-green-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] md:text-xs font-medium text-gray-500 mb-1">Active Vehicles</p>
              <p className="text-xl md:text-2xl font-bold text-green-600">{activeVehicles}</p>
              <p className="text-[9px] md:text-[10px] text-gray-400 mt-1">Currently in use</p>
            </div>
            <div className="p-2 md:p-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg shadow-green-200">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white to-orange-50 rounded-xl p-3 md:p-4 border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] md:text-xs font-medium text-gray-500 mb-1">Rate Range</p>
              <p className="text-xl md:text-2xl font-bold text-orange-600">₹3.5 - ₹10</p>
              <p className="text-[9px] md:text-[10px] text-gray-400 mt-1">Per kilometer</p>
            </div>
            <div className="p-2 md:p-2.5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg shadow-orange-200">
              <Car className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters - All categories, status, and export moved to right side */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-full sm:max-w-xs md:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {categoryOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Vehicle Types Table - Responsive */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Vehicle Name</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Code</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Rate</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVehicles.map((vehicle) => {
                const Icon = getCategoryIcon(vehicle.vehicleCategory);
                return (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${vehicle.isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                          <Icon className={`w-3.5 h-3.5 ${vehicle.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                        </div>
                        <span className="font-medium text-gray-800 text-sm">{vehicle.vehicleName}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <span className="text-xs font-mono text-gray-600">{vehicle.vehicleCode}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span className="text-xs text-gray-600">{vehicle.vehicleCategory}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span className="text-xs font-semibold text-green-600">₹{vehicle.defaultRatePerKm.toFixed(2)}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] rounded-full ${
                        vehicle.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${vehicle.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {vehicle.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === vehicle.id ? null : vehicle.id)}
                        className="p-1 rounded-lg hover:bg-gray-100"
                      >
                        <MoreVertical className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                      {openMenuId === vehicle.id && (
                        <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          <button
                            onClick={() => openEditModal(vehicle)}
                            className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Edit2 className="w-3 h-3" />
                            Edit
                          </button>
                          {vehicle.isActive ? (
                            <button
                              onClick={() => handleDelete(vehicle.id)}
                              className="w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 className="w-3 h-3" />
                              Deactivate
                            </button>
                          ) : (
                            <button
                              onClick={() => handleActivate(vehicle.id)}
                              className="w-full px-3 py-1.5 text-left text-xs text-green-600 hover:bg-green-50 flex items-center gap-2"
                            >
                              <CheckCircle className="w-3 h-3" />
                              Activate
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredVehicles.length === 0 && (
          <div className="p-6 text-center">
            <Car className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No vehicle types found</p>
          </div>
        )}
      </div>

      {/* Vehicle Type Modal - Responsive */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
          <div className="bg-white rounded-lg w-full max-w-sm mx-3">
            <div className="p-3 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-base font-semibold">
                {modalMode === 'create' ? 'Add Vehicle Type' : 'Edit Vehicle Type'}
              </h2>
              <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Vehicle Name *</label>
                <input
                  type="text"
                  value={formData.vehicleName}
                  onChange={(e) => setFormData({...formData, vehicleName: e.target.value})}
                  className={`w-full px-2 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.vehicleName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter vehicle name"
                />
                {formErrors.vehicleName && <p className="text-[10px] text-red-500 mt-1">{formErrors.vehicleName}</p>}
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Vehicle Code *</label>
                <input
                  type="text"
                  value={formData.vehicleCode}
                  onChange={(e) => setFormData({...formData, vehicleCode: e.target.value.toUpperCase()})}
                  className={`w-full px-2 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.vehicleCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 2W, 4W, EV"
                  maxLength={10}
                />
                {formErrors.vehicleCode && <p className="text-[10px] text-red-500 mt-1">{formErrors.vehicleCode}</p>}
                <p className="text-[9px] text-gray-400 mt-1">Unique short code</p>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Category *</label>
                <select
                  value={formData.vehicleCategory}
                  onChange={(e) => setFormData({...formData, vehicleCategory: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="2 Wheeler">2 Wheeler</option>
                  <option value="3 Wheeler">3 Wheeler</option>
                  <option value="4 Wheeler">4 Wheeler</option>
                  <option value="EV">Electric Vehicle</option>
                </select>
                {formErrors.vehicleCategory && <p className="text-[10px] text-red-500 mt-1">{formErrors.vehicleCategory}</p>}
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Default Rate (₹/km) *</label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.defaultRatePerKm}
                  onChange={(e) => setFormData({...formData, defaultRatePerKm: parseFloat(e.target.value)})}
                  className={`w-full px-2 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.defaultRatePerKm ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 4, 10, 3.5"
                />
                {formErrors.defaultRatePerKm && <p className="text-[10px] text-red-500 mt-1">{formErrors.defaultRatePerKm}</p>}
              </div>
            </div>
            <div className="p-3 border-t border-gray-200 flex justify-end gap-2">
              <button onClick={closeModal} className="px-3 py-1.5 text-xs text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                Cancel
              </button>
              <button onClick={handleSubmit} className="px-3 py-1.5 text-xs text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-1">
                <Save className="w-3 h-3" />
                {modalMode === 'create' ? 'Create' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleTypes;