import React, { useState } from "react";
import { TrendingUp, DollarSign, Target, Award, Users } from "lucide-react";


interface FunnelData { stage: string; value: number; }
interface ConversionData { name: string; value: number; }
interface EmployeeData { name: string; visits: number; revenue: number; }
interface AlertData { message: string; type: "overdue" | "high-value" | "stalled"; }

const funnelData: FunnelData[] = [
  { stage: "Lead Identified", value: 50 }, { stage: "Initial Visit", value: 40 },
  { stage: "Requirement Discussion", value: 35 }, { stage: "Demo Conducted", value: 30 },
  { stage: "Proposal Shared", value: 25 }, { stage: "Negotiation", value: 15 },
  { stage: "Order Won", value: 10 }, { stage: "Order Lost", value: 5 },
];

const conversionData: ConversionData[] = [
  { name: "Visit → Lead", value: 60 }, { name: "Lead → Proposal", value: 45 },
  { name: "Proposal → Demo", value: 35 }, { name: "Demo → Order", value: 20 },
];

const topEmployees: EmployeeData[] = [
  { name: "Rahul Verma", visits: 40, revenue: 950000 },
  { name: "Sneha Sharma", visits: 38, revenue: 870000 },
];

const alerts: AlertData[] = [
  { message: "Opportunity #123 overdue", type: "overdue" },
  { message: "High-value deal pending approval", type: "high-value" },
  { message: "Follow-up pending for Opportunity #456", type: "stalled" },
];

const COLORS: string[] = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

const ManagementDashboard: React.FC = () => {
  const [sortBy, setSortBy] = useState<"visits" | "revenue">("visits");
  const [selectedStage, setSelectedStage] = useState<string>("All");

  const sortedEmployees = [...topEmployees].sort((a, b) =>
    sortBy === "visits" ? b.visits - a.visits : b.revenue - a.revenue
  );

  const totalWon = funnelData.find((d) => d.stage === "Order Won")?.value || 0;
  const totalLost = funnelData.find((d) => d.stage === "Order Lost")?.value || 0;
  const total = totalWon + totalLost;
  const wonPercent = total > 0 ? (totalWon / total) * 100 : 0;

  const filteredFunnel =
    selectedStage === "All" ? funnelData : funnelData.filter((f) => f.stage === selectedStage);

  const totalPipeline = funnelData.reduce((acc, stage) => acc + stage.value, 0);

  const handleConversionClick = (conv: ConversionData) => {
    alert(`Conversion: ${conv.name} - ${conv.value}%`);
  };

  const handleAlertClick = (alertData: AlertData) => {
    alert(`Alert clicked: ${alertData.message} (${alertData.type})`);
};

  return (
    <div className=" p-4 md:p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
              Management Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Overview of visits, pipeline, and employee performance
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
  {[
    { icon: <TrendingUp className="w-5 h-5 text-blue-500" />, label: "Total Visits", value: "320", border: "border-blue-500", bg: "bg-blue-50" },
    { icon: <DollarSign className="w-5 h-5 text-green-500" />, label: "Total Expenses", value: "₹ 1,50,000", border: "border-green-500", bg: "bg-green-0" },
    { icon: <Target className="w-5 h-5 text-purple-500" />, label: "Pipeline Value", value: `₹ ${totalPipeline.toLocaleString()}`, border: "border-purple-500", bg: "bg-purple-50" },
    { icon: <Award className="w-5 h-5 text-yellow-500" />, label: "Won Value", value: "₹ 25,00,000", border: "border-yellow-400", bg: "bg-yellow-50" },
  ].map((card, i) => (
    <div
      key={i}
      className={`${card.bg} rounded-lg p-3 shadow-sm border-l-4 ${card.border}
      hover:shadow-md transition flex flex-col justify-between min-h-[85px]`}
    >

      {/* Top */}
      <div className="flex flex-col items-start gap-1.5">

        <div className="p-1.5 rounded-md bg-white/70 backdrop-blur-sm">
          {card.icon}
        </div>

        <span className="text-xs text-gray-600 font-medium">
          {card.label}
        </span>
      </div>

      {/* Value */}
      <p className="text-lg md:text-xl font-bold text-gray-900 mt-1">
        {card.value}
      </p>

    </div>
  ))}
</div>
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Top Employees */}
          <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg border border-gray-100 overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
             <h2 className="flex items-center gap-2 text-base font-semibold text-gray-700">
                   📊 Top Employees
             </h2>
              <select className="p-1 text-sm border border-gray-300 rounded" value={sortBy} onChange={(e) => setSortBy(e.target.value as "visits" | "revenue")}>
                <option value="visits">Sort by Visits</option>
                <option value="revenue">Sort by Revenue</option>
              </select>
            </div>
            <table className="w-full text-left border-collapse text-sm min-w-[400px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 text-gray-500">Employee</th>
                  <th className="py-2 text-gray-500">Visits</th>
                  <th className="py-2 text-gray-500">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {sortedEmployees.map((emp, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-2 text-gray-700">{emp.name}</td>
                    <td className="py-2 text-gray-700">{emp.visits}</td>
                    <td className="py-2 text-gray-700">₹ {emp.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg border border-gray-100 flex flex-wrap gap-2">
            {alerts.map((alert, i) => (
              <span
                key={i}
                onClick={() => handleAlertClick(alert)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium shadow-sm text-sm cursor-pointer transition ${
                  alert.type === "overdue" ? "bg-red-100 text-red-700 hover:bg-red-200"
                  : alert.type === "high-value" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                {alert.message}
              </span>
            ))}
          </div>

          {/* Conversion Rates */}
          <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg border border-gray-100">
            <h2 className="text-base font-semibold text-gray-700 mb-3">Business Conversion Rates</h2>
            <div className="space-y-3">
              {conversionData.map((conv, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{conv.name}</span>
                    <span className={`${conv.value >= 50 ? "text-green-600 font-semibold" : "text-gray-600"}`}>{conv.value}%</span>
                  </div>
                  <div
                    className="w-full bg-gray-200 h-3 rounded-lg hover:opacity-80 transition"
                    style={{ width: `${conv.value}%`, backgroundColor: COLORS[i % COLORS.length] }}
                    onClick={() => handleConversionClick(conv)}
                    title={`${conv.name}: ${conv.value}%`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Won vs Lost */}
          <div className="bg-gradient-to-br from-green-50 to-green-200 rounded-xl p-4 shadow-md hover:shadow-lg border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28">
              <div className="absolute inset-0 rounded-full bg-gray-200"></div>
              <div
                className="absolute inset-0 rounded-full bg-green-400"
                style={{
                  clip: `rect(0px, 112px, 112px, 56px)`,
                  transform: `rotate(${(wonPercent / 100) * 360}deg)`,
                  transformOrigin: "center center",
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center text-gray-800 font-semibold text-base">
                {wonPercent.toFixed(0)}%
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-500">Won vs Lost Value</p>
              <p className="text-base text-gray-800 font-semibold">Won: {totalWon} | Lost: {totalLost}</p>
            </div>
          </div>

          {/* Stage-wise Funnel */}
          <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg border border-gray-100 overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
              <h2 className="text-base font-semibold text-gray-700">Stage-wise Funnel</h2>
              <select className="p-2 text-sm border border-gray-300 rounded" value={selectedStage} onChange={(e) => setSelectedStage(e.target.value)}>
                <option value="All">All Stages</option>
                {funnelData.map((stage) => <option key={stage.stage} value={stage.stage}>{stage.stage}</option>)}
              </select>
            </div>
            <div className="space-y-3 min-w-[200px]">
              {filteredFunnel.map((stage, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{stage.stage}</span>
                    <span>{stage.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-lg">
                    <div className="h-3 rounded-lg" style={{ width: `${(stage.value / 50) * 100}%`, backgroundColor: COLORS[i % COLORS.length] }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementDashboard;