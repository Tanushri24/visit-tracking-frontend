// src/modules/super-admin/pages/Master/VehicleTypeMaster.tsx
import React, { useState } from 'react';
import { 
  Search, 
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Plus,
  Car,
  Bike,
  Truck,
  Gauge,
  Trash2
} from 'lucide-react';
import { createVehicleType } from '../../../services/VehicleType.service';

interface VehicleType {
  id: number;
  vehicleName: string;
  defaultRate: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const VehicleTypeMaster = () => {
  const [vehicles, setVehicles] = useState<VehicleType[]>([
    { id: 1, vehicleName: 'Two Wheeler', defaultRate: 4, status: 'active', createdAt: '2024-01-15', updatedAt: '2024-02-20' },
    { id: 2, vehicleName: 'Four Wheeler', defaultRate: 10, status: 'active', createdAt: '2024-01-15', updatedAt: '2024-02-20' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<VehicleType | null>(null);
  
  const [newVehicle, setNewVehicle] = useState({
    vehicleName: '',
    defaultRate: 0,
    status: 'active' as 'active' | 'inactive'
  });

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.vehicleName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVehicles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  const exportToCSV = () => {
    const headers = ['Vehicle Name', 'Rate Per KM (₹)', 'Status', 'Created At', 'Updated At'];
    const csvData = filteredVehicles.map(v => [v.vehicleName, v.defaultRate.toString(), v.status, v.createdAt, v.updatedAt]);
    const blob = new Blob([[headers, ...csvData].map(row => row.join(',')).join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `vehicle_types_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const viewVehicleDetails = (vehicle: VehicleType) => { setSelectedVehicle(vehicle); setShowViewModal(true); };
  
  // Delete vehicle
  const handleDeleteVehicle = () => {
    if (vehicleToDelete) {
      setVehicles(vehicles.filter(v => v.id !== vehicleToDelete.id));
      setShowDeleteModal(false);
      setVehicleToDelete(null);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (vehicle: VehicleType) => {
    setVehicleToDelete(vehicle);
    setShowDeleteModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewVehicle(prev => ({ ...prev, [name]: name === 'defaultRate' ? parseFloat(value) || 0 : value }));
  };

  const handleInsertVehicle = async () => {
    try {
      const payload = {
        vehicleName: newVehicle.vehicleName,
        defaultRate: newVehicle.defaultRate,
        status: newVehicle.status === "active" // Fixed: Convert "active" to true, "inactive" to false
      };

      const response = await createVehicleType(payload);

      const currentDate = new Date().toISOString().split("T")[0];

      setVehicles([
        ...vehicles,
        {
          id: response.id || vehicles.length + 1,
          vehicleName: newVehicle.vehicleName,
          defaultRate: newVehicle.defaultRate,
          status: newVehicle.status, // Fixed: Use the status string directly
          createdAt: currentDate,
          updatedAt: currentDate
        }
      ]);

      setShowInsertModal(false);

      // Reset form
      setNewVehicle({
        vehicleName: "",
        defaultRate: 0,
        status: "active", // Fixed: Reset to "active" string, not "true"
      });

    } catch (error) {
      console.error("Error creating vehicle type:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-3 sm:p-4 md:p-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Vehicle Type Master</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage vehicle types and their expense rates</p>
        </div>

        {/* Stats Cards - Smaller Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-purple-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-purple-600">Total Vehicles</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-700">{vehicles.length}</p>
              </div>
              <div className="bg-purple-500 rounded-lg p-1.5 sm:p-2">
                <Car size={18} className="text-white sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-green-600">Active Vehicles</p>
                <p className="text-xl sm:text-2xl font-bold text-green-700">{vehicles.filter(v => v.status === 'active').length}</p>
              </div>
              <div className="bg-green-500 rounded-lg p-1.5 sm:p-2">
                <Bike size={18} className="text-white sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-red-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-red-600">Inactive Vehicles</p>
                <p className="text-xl sm:text-2xl font-bold text-red-700">{vehicles.filter(v => v.status === 'inactive').length}</p>
              </div>
              <div className="bg-red-500 rounded-lg p-1.5 sm:p-2">
                <Truck size={18} className="text-white sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-blue-600">Default Rate (Min)</p>
                <p className="text-lg sm:text-xl font-bold text-blue-700">₹{Math.min(...vehicles.map(v => v.defaultRate))}/km</p>
              </div>
              <div className="bg-blue-500 rounded-lg p-1.5 sm:p-2">
                <Gauge size={18} className="text-white sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm mb-4 sm:mb-6">
          <div className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search vehicles..."
                className="w-full pl-9 pr-3 py-1.5 sm:py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowInsertModal(true)} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-1.5 text-sm shadow-sm">
                <Plus size={16} /><span className="hidden sm:inline">Add New Vehicle</span><span className="sm:hidden">Add</span>
              </button>
              <button onClick={() => setShowFilters(!showFilters)} className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-1.5 text-sm">
                <Filter size={16} /><span className="hidden sm:inline">Filters</span>
              </button>
              <button onClick={exportToCSV} className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-1.5 text-sm">
                <Download size={16} /><span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-64">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button onClick={() => { setFilterStatus('all'); setSearchTerm(''); }} className="px-3 py-1.5 text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm">
                    <RefreshCw size={14} /> Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Name</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate Per KM (₹)</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.map((vehicle, index) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-500">{indexOfFirstItem + index + 1}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {vehicle.vehicleName === 'Two Wheeler' && <Bike size={14} className="text-gray-500 sm:w-4 sm:h-4" />}
                        {vehicle.vehicleName === 'Four Wheeler' && <Car size={14} className="text-gray-500 sm:w-4 sm:h-4" />}
                        <p className="font-medium text-gray-900 text-sm">{vehicle.vehicleName}</p>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3"><p className="text-xs sm:text-sm font-semibold text-purple-600">₹{vehicle.defaultRate}/km</p></td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${vehicle.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{vehicle.status}</span></td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => viewVehicleDetails(vehicle)} className="p-1 text-purple-600 hover:bg-purple-50 rounded" title="View Details"><Eye size={14} /></button>
                        <button onClick={() => openDeleteModal(vehicle)} className="p-1 text-red-600 hover:bg-red-50 rounded" title="Delete Vehicle"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredVehicles.length > 0 && (
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-gray-500">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredVehicles.length)} of {filteredVehicles.length} entries</div>
            <div className="flex gap-1.5 sm:gap-2">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50 flex items-center gap-1"><ChevronLeft size={12} /> Previous</button>
              <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-purple-600 text-white rounded-lg">Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50 flex items-center gap-1">Next <ChevronRight size={12} /></button>
            </div>
          </div>
        )}

        {/* View Modal */}
        {showViewModal && selectedVehicle && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-4 sm:px-5 py-3 flex justify-between items-center">
                <h2 className="text-base sm:text-lg font-bold">Vehicle Details</h2>
                <button onClick={() => { setShowViewModal(false); setSelectedVehicle(null); }} className="p-1 hover:bg-gray-100 rounded"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              <div className="p-4 sm:p-5 space-y-4">
                <div className="border-b pb-3"><h3 className="text-sm sm:text-base font-semibold text-purple-600 mb-2">Vehicle Information</h3>
                  <div className="space-y-2"><div><p className="text-xs text-gray-500">Vehicle Name</p><p className="text-sm font-medium">{selectedVehicle.vehicleName}</p></div>
                  <div><p className="text-xs text-gray-500">Rate Per KM</p><p className="text-sm font-semibold text-purple-600">₹{selectedVehicle.defaultRate}/km</p></div>
                  <div><p className="text-xs text-gray-500">Status</p><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${selectedVehicle.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{selectedVehicle.status}</span></div></div>
                </div>
                <div><h3 className="text-sm sm:text-base font-semibold text-purple-600 mb-2">System Information</h3>
                  <div className="space-y-2"><div><p className="text-xs text-gray-500">Created At</p><p className="text-sm">{new Date(selectedVehicle.createdAt).toLocaleDateString()}</p></div>
                  <div><p className="text-xs text-gray-500">Last Updated</p><p className="text-sm">{new Date(selectedVehicle.updatedAt).toLocaleDateString()}</p></div></div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-white border-t px-4 sm:px-5 py-3 flex justify-end"><button onClick={() => { setShowViewModal(false); setSelectedVehicle(null); }} className="px-3 sm:px-4 py-1.5 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">Close</button></div>
            </div>
          </div>
        )}

        {/* Insert Modal */}
        {showInsertModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-4 sm:px-5 py-3 flex justify-between items-center">
                <h2 className="text-base sm:text-lg font-bold">Add New Vehicle</h2>
                <button onClick={() => { setShowInsertModal(false); setNewVehicle({ vehicleName: '', defaultRate: 0, status: 'active' }); }} className="p-1 hover:bg-gray-100 rounded"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleInsertVehicle(); }}>
                <div className="p-4 sm:p-5 space-y-3">
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Vehicle Name *</label><input type="text" name="vehicleName" value={newVehicle.vehicleName} onChange={handleInputChange} required placeholder="e.g., Two Wheeler" className="w-full px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500" /></div>
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Rate Per KM (₹) *</label><input type="number" name="defaultRate" value={newVehicle.defaultRate} onChange={handleInputChange} required min="0" step="0.5" placeholder="e.g., 4" className="w-full px-3 py-1.5 text-sm border rounded-lg" /><p className="text-xs text-gray-400 mt-1">Default: Two Wheeler ₹4/km, Four Wheeler ₹10/km</p></div>
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Status</label><select name="status" value={newVehicle.status} onChange={handleInputChange} className="w-full px-3 py-1.5 text-sm border rounded-lg"><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
                </div>
                <div className="sticky bottom-0 bg-white border-t px-4 sm:px-5 py-3 flex justify-end gap-2"><button type="button" onClick={() => setShowInsertModal(false)} className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50">Cancel</button><button type="submit" className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700">Add Vehicle</button></div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && vehicleToDelete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Trash2 className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-center text-gray-800 mb-2">Confirm Delete</h3>
                <p className="text-xs sm:text-sm text-gray-600 text-center mb-4">
                  Are you sure you want to delete the vehicle type <strong className="text-gray-800">{vehicleToDelete.vehicleName}</strong>?
                  <br />
                  This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setVehicleToDelete(null);
                    }}
                    className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteVehicle}
                    className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredVehicles.length === 0 && (
          <div className="text-center py-8 sm:py-10 bg-white rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3"><Car className="w-6 h-6 text-gray-400" /></div>
            <p className="text-sm text-gray-500">No vehicle types found</p>
            <button onClick={() => { setSearchTerm(''); setFilterStatus('all'); }} className="mt-2 text-purple-600 text-xs font-medium">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleTypeMaster;