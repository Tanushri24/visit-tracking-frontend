import React, { useMemo, useState } from "react";
import { 
  Bike, Car, Plus, Search, Filter, CalendarDays, ToggleLeft, 
  TrendingUp, TrendingDown, DollarSign, Activity, Calendar, Clock, Award 
} from "lucide-react";

// ================= Types =================
interface Rate {
  id: number;
  vehicleType: "Two Wheeler" | "Four Wheeler";
  ratePerKm: number;
  effectiveFrom: string;
  effectiveTo?: string;
  isActive: boolean;
}

// ================= Defaults =================
const DEFAULTS: Record<Rate["vehicleType"], number> = {
  "Two Wheeler": 4,
  "Four Wheeler": 10,
};

const seed: Rate[] = [
  {
    id: 1,
    vehicleType: "Two Wheeler",
    ratePerKm: 4,
    effectiveFrom: "2026-01-01",
    effectiveTo: "",
    isActive: true,
  },
  {
    id: 2,
    vehicleType: "Four Wheeler",
    ratePerKm: 10,
    effectiveFrom: "2026-01-01",
    effectiveTo: "",
    isActive: true,
  },
  {
    id: 3,
    vehicleType: "Two Wheeler",
    ratePerKm: 5,
    effectiveFrom: "2025-06-01",
    effectiveTo: "2025-12-31",
    isActive: false,
  },
  {
    id: 4,
    vehicleType: "Four Wheeler",
    ratePerKm: 12,
    effectiveFrom: "2025-06-01",
    effectiveTo: "2025-12-31",
    isActive: false,
  },
];

// ================= Helpers =================
const toDate = (d?: string) => (d ? new Date(d) : undefined);

function hasOverlap(newItem: Partial<Rate>, list: Rate[]): boolean {
  if (!newItem.vehicleType || !newItem.effectiveFrom) return false;
  const nStart = toDate(newItem.effectiveFrom)!;
  const nEnd = toDate(newItem.effectiveTo);

  return list.some((r) => {
    if (r.vehicleType !== newItem.vehicleType) return false;
    const rStart = toDate(r.effectiveFrom)!;
    const rEnd = toDate(r.effectiveTo);

    const startA = nStart;
    const endA = nEnd ?? new Date("9999-12-31");
    const startB = rStart;
    const endB = rEnd ?? new Date("9999-12-31");

    return startA <= endB && startB <= endA;
  });
}

// ================= Component =================
const RateManagementTable: React.FC = () => {
  const [rates, setRates] = useState<Rate[]>(seed);
  const [form, setForm] = useState<Partial<Rate>>({ vehicleType: "Two Wheeler" });
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [vehicleFilter, setVehicleFilter] = useState<"all" | Rate["vehicleType"]>("all");
  const [error, setError] = useState<string | null>(null);

  const kpis = useMemo(() => {
    const total = rates.length;
    const active = rates.filter((r) => r.isActive).length;
    const inactive = total - active;
    const avg = total ? rates.reduce((s, r) => s + r.ratePerKm, 0) / total : 0;
    
    const twoWheelerActive = rates.find(r => r.vehicleType === "Two Wheeler" && r.isActive)?.ratePerKm || 0;
    const fourWheelerActive = rates.find(r => r.vehicleType === "Four Wheeler" && r.isActive)?.ratePerKm || 0;
    
    const activePercentage = total ? (active / total) * 100 : 0;
    
    return { 
      total, 
      active, 
      inactive, 
      avg, 
      twoWheelerActive, 
      fourWheelerActive,
      activePercentage 
    };
  }, [rates]);

  const filtered = useMemo(() => {
    return rates.filter((r) => {
      const s = q.toLowerCase();
      const matchesSearch =
        !q ||
        r.vehicleType.toLowerCase().includes(s) ||
        String(r.ratePerKm).includes(s) ||
        r.effectiveFrom.includes(s) ||
        (r.effectiveTo || "").includes(s);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && r.isActive) ||
        (statusFilter === "inactive" && !r.isActive);
      const matchesVehicle = vehicleFilter === "all" || r.vehicleType === vehicleFilter;
      return matchesSearch && matchesStatus && matchesVehicle;
    });
  }, [rates, q, statusFilter, vehicleFilter]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: name === "ratePerKm" ? Number(value) : value }));
  };

  const addRate = () => {
    setError(null);
    if (!form.vehicleType || !form.ratePerKm || !form.effectiveFrom) {
      setError("Please fill Vehicle, Rate and Effective From");
      return;
    }
    if (hasOverlap(form, rates)) {
      setError("Date range overlaps with an existing rate for this vehicle");
      return;
    }
    const newRate: Rate = {
      id: Date.now(),
      vehicleType: form.vehicleType,
      ratePerKm: Number(form.ratePerKm),
      effectiveFrom: form.effectiveFrom,
      effectiveTo: form.effectiveTo || "",
      isActive: true,
    };
    setRates((p) => [newRate, ...p]);
    setForm({ vehicleType: form.vehicleType });
  };

  const toggle = (id: number) => {
    setRates((p) => p.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)));
  };

  // Handle filter change with proper typing
  const handleVehicleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVehicleFilter(e.target.value as "all" | Rate["vehicleType"]);
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as "all" | "active" | "inactive");
  };

  return (
    <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white shadow-lg">
          <Car className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">Rate Management</h1>
          <p className="text-[11px] sm:text-xs text-gray-500">Configure vehicle-wise rate per KM with effective dates</p>
        </div>
      </div>

      {/* Enhanced KPI Cards - Fully Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Rates Card */}
        <div className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="p-3 sm:p-5">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-gray-400 bg-gray-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">Total</span>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">{kpis.total}</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                All rate configurations
              </p>
            </div>
          </div>
          <div className="h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-blue-300 group-hover:h-1 sm:group-hover:h-1.5 transition-all"></div>
        </div>

        {/* Active Rates Card */}
        <div className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="p-3 sm:p-5">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-gray-400 bg-gray-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {kpis.activePercentage.toFixed(1)}%
              </span>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-green-600">{kpis.active}</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                Active configurations
              </p>
            </div>
          </div>
          <div className="h-0.5 sm:h-1 bg-gradient-to-r from-green-500 to-green-300 group-hover:h-1 sm:group-hover:h-1.5 transition-all"></div>
        </div>

        {/* Inactive Rates Card */}
        <div className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="p-3 sm:p-5">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-gray-400 bg-gray-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">Archived</span>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-red-600">{kpis.inactive}</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                Historical rates
              </p>
            </div>
          </div>
          <div className="h-0.5 sm:h-1 bg-gradient-to-r from-red-500 to-red-300 group-hover:h-1 sm:group-hover:h-1.5 transition-all"></div>
        </div>

        {/* Average Rate Card */}
        <div className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="p-3 sm:p-5">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-gray-400 bg-gray-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">Weighted</span>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-purple-600">₹ {kpis.avg.toFixed(2)}</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                Average rate per km
              </p>
            </div>
          </div>
          <div className="h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-purple-300 group-hover:h-1 sm:group-hover:h-1.5 transition-all"></div>
        </div>
      </div>

      {/* Form Card - Responsive */}
      <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 sm:gap-3">
          <select 
            name="vehicleType" 
            value={form.vehicleType || ""} 
            onChange={onChange} 
            className="border p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Two Wheeler">Two Wheeler</option>
            <option value="Four Wheeler">Four Wheeler</option>
          </select>
          <input 
            name="ratePerKm" 
            type="number" 
            placeholder={`Rate (default ${DEFAULTS[form.vehicleType as Rate["vehicleType"]] ?? "-"})`} 
            value={form.ratePerKm ?? ""} 
            onChange={onChange} 
            className="border p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            name="effectiveFrom" 
            type="date" 
            value={form.effectiveFrom || ""} 
            onChange={onChange} 
            className="border p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            name="effectiveTo" 
            type="date" 
            value={form.effectiveTo || ""} 
            onChange={onChange} 
            className="border p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={addRate} 
            className="inline-flex items-center justify-center gap-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors py-2"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
        <p className="text-[11px] text-gray-500 flex items-center gap-1">
          <CalendarDays className="w-3 h-3" /> Overlapping date ranges for same vehicle are not allowed.
        </p>
      </div>

      {/* Toolbar - Responsive */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input 
            value={q} 
            onChange={(e) => setQ(e.target.value)} 
            placeholder="Search rates..." 
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border rounded-lg px-2 py-1 text-xs bg-white">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <select 
              value={vehicleFilter} 
              onChange={handleVehicleFilterChange} 
              className="outline-none bg-transparent"
            >
              <option value="all">All Vehicles</option>
              <option value="Two Wheeler">Two Wheeler</option>
              <option value="Four Wheeler">Four Wheeler</option>
            </select>
          </div>
          <div className="flex items-center gap-1 border rounded-lg px-2 py-1 text-xs bg-white">
            <ToggleLeft className="w-3.5 h-3.5 text-gray-500" />
            <select 
              value={statusFilter} 
              onChange={handleStatusFilterChange} 
              className="outline-none bg-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table - Responsive with horizontal scroll */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-gray-50 text-gray-600 text-xs">
            <tr>
              <th className="p-3 text-left">Rate ID</th>
              <th className="p-3 text-left">Vehicle Type</th>
              <th className="p-3 text-left">Rate / KM</th>
              <th className="p-3 text-left">Effective From</th>
              <th className="p-3 text-left">Effective To</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-3 text-xs text-gray-500">#{r.id}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {r.vehicleType === "Two Wheeler" ? (
                        <Bike className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      ) : (
                        <Car className="w-4 h-4 text-green-500 flex-shrink-0" />
                      )}
                      <span className="font-medium text-sm">{r.vehicleType}</span>
                    </div>
                  </td>
                  <td className="p-3 font-semibold">₹ {r.ratePerKm}</td>
                  <td className="p-3 text-sm">{r.effectiveFrom}</td>
                  <td className="p-3 text-sm">{r.effectiveTo || "-"}</td>
                  <td className="p-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      r.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}>
                      {r.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3">
                    <button 
                      onClick={() => toggle(r.id)} 
                      className="text-blue-600 text-xs hover:underline font-medium"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-sm text-gray-400">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer note - Responsive */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 sm:p-4 rounded-xl border border-gray-200">
        <div className="flex items-start gap-2 text-[10px] sm:text-xs text-gray-600">
          <div className="p-1 bg-blue-100 rounded-lg flex-shrink-0">
            <CalendarDays className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
          </div>
          <div>
            <strong className="text-gray-700">Business Rules:</strong> Historical rates are preserved per visit (store RateAppliedPerKm & TravelExpenseAmount). 
            New rates apply to <strong className="text-blue-600">future visits only</strong>. Old visit records remain unchanged.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateManagementTable;