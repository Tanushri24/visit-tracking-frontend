import React, { useState, useEffect } from 'react';
import {
  TrendingUp, TrendingDown, Eye, Edit2, Trash2, Download,
  Filter, Search, Calendar, MapPin, DollarSign, Car,
  User, CheckCircle, AlertCircle, Clock, Phone, Mail,
  MessageSquare, MoreVertical, RefreshCw, FileText,
  ThumbsUp, ThumbsDown, Briefcase, Target, Users,
  PieChart, BarChart3, Activity, Award, Globe
} from 'lucide-react';

// ============================================
// TYPES
// ============================================

interface TeamMember {
  id: number;
  name: string;
  avatar?: string;
  designation: string;
  visits: number;
  expenses: number;
  leads: number;
  won: number;
  pipeline: number;
  performance: number;
  status: 'active' | 'inactive' | 'on-leave';
}

interface StagnantDeal {
  id: number;
  client: string;
  employee: string;
  stage: string;
  daysStagnant: number;
  lastAction: string;
  value: number;
  priority: 'high' | 'medium' | 'low';
}

interface PendingExpense {
  id: number;
  employee: string;
  date: Date;
  client: string;
  distance: number;
  vehicle: string;
  amount: number;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: Date;
  type: 'visit' | 'update' | 'expense' | 'won' | 'followup';
}

// ============================================
// MOCK DATA
// ============================================

const mockTeamPerformance: TeamMember[] = [
  { id: 1, name: 'Priya Singh', designation: 'Sr. BD Executive', visits: 15, expenses: 3200, leads: 10, won: 3, pipeline: 1800000, performance: 90, status: 'active' },
  { id: 2, name: 'Rajesh Kumar', designation: 'BD Executive', visits: 12, expenses: 2400, leads: 8, won: 2, pipeline: 1200000, performance: 80, status: 'active' },
  { id: 3, name: 'Amit Patel', designation: 'BD Executive', visits: 8, expenses: 1800, leads: 4, won: 1, pipeline: 800000, performance: 60, status: 'active' },
  { id: 4, name: 'Sneha Reddy', designation: 'Sr. BD Executive', visits: 14, expenses: 2800, leads: 9, won: 2, pipeline: 1500000, performance: 85, status: 'active' },
  { id: 5, name: 'Vikram Shah', designation: 'BD Executive', visits: 10, expenses: 2250, leads: 6, won: 1, pipeline: 1000000, performance: 70, status: 'on-leave' }
];

const mockStagnantDeals: StagnantDeal[] = [
  { id: 1, client: 'MP Board', employee: 'Rajesh Kumar', stage: 'Proposal Shared', daysStagnant: 15, lastAction: 'Follow-up pending', value: 1200000, priority: 'high' },
  { id: 2, client: 'Bhoj University', employee: 'Priya Singh', stage: 'Demo Conducted', daysStagnant: 12, lastAction: 'Waiting for response', value: 1800000, priority: 'high' },
  { id: 3, client: 'ITI Limited', employee: 'Amit Patel', stage: 'Negotiation', daysStagnant: 10, lastAction: 'Call back scheduled', value: 2500000, priority: 'medium' },
  { id: 4, client: 'RGTU Bhopal', employee: 'Sneha Reddy', stage: 'Technical Discussion', daysStagnant: 8, lastAction: 'Pending', value: 800000, priority: 'low' },
  { id: 5, client: 'SGSITS Indore', employee: 'Vikram Shah', stage: 'Commercial Negotiation', daysStagnant: 7, lastAction: 'No response', value: 1500000, priority: 'medium' }
];

const mockPendingExpenses: PendingExpense[] = [
  { id: 1, employee: 'Rajesh Kumar', date: new Date(), client: 'MP Board', distance: 48, vehicle: '4-Wheeler', amount: 480 },
  { id: 2, employee: 'Priya Singh', date: new Date(), client: 'Bhoj University', distance: 35, vehicle: '2-Wheeler', amount: 140 },
  { id: 3, employee: 'Amit Patel', date: new Date(Date.now() - 86400000), client: 'ITI Limited', distance: 62, vehicle: '4-Wheeler', amount: 620 },
  { id: 4, employee: 'Sneha Reddy', date: new Date(Date.now() - 86400000), client: 'RGTU', distance: 28, vehicle: '2-Wheeler', amount: 112 }
];

const mockActivities: Activity[] = [
  { id: 1, user: 'Priya', action: 'created new visit', target: 'Bhoj University - Demo', time: new Date(Date.now() - 3600000), type: 'visit' },
  { id: 2, user: 'Rajesh', action: 'updated funnel', target: 'MP Board → Proposal Shared', time: new Date(Date.now() - 7200000), type: 'update' },
  { id: 3, user: 'Sneha', action: 'added follow-up', target: 'RGTU - Commercial Negotiation', time: new Date(Date.now() - 10800000), type: 'followup' },
  { id: 4, user: 'Amit', action: 'submitted expense', target: '₹620 - Pending approval', time: new Date(Date.now() - 14400000), type: 'expense' },
  { id: 5, user: 'Vikram', action: 'marked Won', target: 'SGSITS - Order Received (₹4.5L)', time: new Date(Date.now() - 18000000), type: 'won' }
];

// ============================================
// MAIN COMPONENT
// ============================================

const ManagerDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('month');
  const [loading, setLoading] = useState(false);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short'
    }).format(date);
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'on-leave': return 'bg-yellow-100 text-yellow-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Get activity icon
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'visit': return <Eye className="w-4 h-4" />;
      case 'update': return <Edit2 className="w-4 h-4" />;
      case 'expense': return <DollarSign className="w-4 h-4" />;
      case 'won': return <CheckCircle className="w-4 h-4" />;
      case 'followup': return <Clock className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, John Smith • Team Lead, Sales Department
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Team Visits Today */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Team Visits Today</p>
              <h3 className="text-2xl font-bold text-gray-900">24</h3>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600 font-medium">+12%</span>
                <span className="text-xs text-gray-400 ml-1">vs yesterday</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Team Expenses */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Monthly Expenses</p>
              <h3 className="text-2xl font-bold text-gray-900">₹12,450</h3>
              <div className="flex items-center mt-2">
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-xs text-red-600 font-medium">-5%</span>
                <span className="text-xs text-gray-400 ml-1">vs last month</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Pipeline Value */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pipeline Value</p>
              <h3 className="text-2xl font-bold text-gray-900">₹45L</h3>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600 font-medium">+25%</span>
                <span className="text-xs text-gray-400 ml-1">vs last month</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        {/* Overdue Follow-ups */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Overdue Follow-ups</p>
              <h3 className="text-2xl font-bold text-gray-900">8</h3>
              <div className="flex items-center mt-2">
                <AlertCircle className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-xs text-red-600 font-medium">+15%</span>
                <span className="text-xs text-gray-400 ml-1">vs yesterday</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-6">
          {['Overview', 'Team Performance', 'Funnel Analysis', 'Expenses', 'Follow-ups'].map((tab, index) => (
            <button
              key={index}
              onClick={() => setSelectedTab(index)}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                selectedTab === index
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {selectedTab === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Team Performance Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Team Performance</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Visits</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Expenses</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Leads</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Won</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Pipeline</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Performance</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockTeamPerformance.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                              {member.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{member.name}</p>
                              <p className="text-xs text-gray-500">{member.designation}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-sm">{member.visits}</td>
                        <td className="px-4 py-3 text-center text-sm">₹{member.expenses.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center text-sm">{member.leads}</td>
                        <td className="px-4 py-3 text-center text-sm">{member.won}</td>
                        <td className="px-4 py-3 text-center text-sm">₹{(member.pipeline / 100000).toFixed(1)}L</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full ${
                                  member.performance >= 80 ? 'bg-green-500' :
                                  member.performance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${member.performance}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-600">{member.performance}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                            {member.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stagnant Deals */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <h3 className="font-semibold text-gray-900">Stagnant Deals</h3>
                </div>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                  {mockStagnantDeals.length} Deals
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Days</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Value</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Priority</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockStagnantDeals.map((deal) => (
                      <tr key={deal.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">{deal.client}</p>
                        </td>
                        <td className="px-4 py-3 text-sm">{deal.employee}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {deal.stage}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-sm ${
                            deal.daysStagnant > 10 ? 'text-red-600' : 'text-yellow-600'
                          }`}>
                            {deal.daysStagnant} days
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-medium">
                          {formatCurrency(deal.value)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(deal.priority)}`}>
                            {deal.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button className="text-blue-600 hover:text-blue-700">
                            <User className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pending Expenses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Pending Expense Approvals</h3>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                  {mockPendingExpenses.length} Pending
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Distance</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockPendingExpenses.map((expense) => (
                      <tr key={expense.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                              {expense.employee.charAt(0)}
                            </div>
                            <span className="text-sm">{expense.employee}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{formatDate(expense.date)}</td>
                        <td className="px-4 py-3 text-sm">{expense.client}</td>
                        <td className="px-4 py-3 text-center text-sm">{expense.distance} km</td>
                        <td className="px-4 py-3 text-center text-sm">{expense.vehicle}</td>
                        <td className="px-4 py-3 text-right text-sm font-medium">₹{expense.amount}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                              <ThumbsDown className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Business Metrics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Business Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Total Visits</span>
                    <span className="font-medium">59/70</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Leads Generated</span>
                    <span className="font-medium">37/45</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Proposals</span>
                    <span className="font-medium">24/30</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-medium">21.6%/25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '86%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Today's Schedule</h3>
                <span className="text-xs text-gray-500">
                  {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { time: '10:00 AM', client: 'Bhoj University', employee: 'Priya', type: 'Visit' },
                  { time: '11:30 AM', client: 'MP Board', employee: 'Rajesh', type: 'Demo' },
                  { time: '2:00 PM', client: 'RGTU', employee: 'Sneha', type: 'Meeting' },
                  { time: '3:30 PM', client: 'ITI Limited', employee: 'Amit', type: 'Call' },
                ].map((event, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-xs text-blue-600 font-medium">
                        {event.time.split(' ')[0]}
                      </span>
                      <span className="text-xs text-blue-600">
                        {event.time.split(' ')[1]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{event.client}</p>
                      <p className="text-xs text-gray-500">{event.employee} • {event.type}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                View Full Calendar
              </button>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {mockActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'visit' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'update' ? 'bg-yellow-100 text-yellow-600' :
                      activity.type === 'expense' ? 'bg-purple-100 text-purple-600' :
                      activity.type === 'won' ? 'bg-green-100 text-green-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.target}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Performance Tab */}
      {selectedTab === 1 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Team Performance Details</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Visits</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Expenses</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Leads</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Won</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Pipeline</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Conversion</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Efficiency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockTeamPerformance.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.designation}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-sm">{member.visits}</td>
                      <td className="px-4 py-3 text-center text-sm">₹{member.expenses.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center text-sm">{member.leads}</td>
                      <td className="px-4 py-3 text-center text-sm">{member.won}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium">₹{(member.pipeline / 100000).toFixed(1)}L</td>
                      <td className="px-4 py-3 text-center text-sm">{((member.won / member.leads) * 100 || 0).toFixed(1)}%</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                member.performance >= 80 ? 'bg-green-500' :
                                member.performance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${member.performance}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{member.performance}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Funnel Analysis Tab */}
      {selectedTab === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Sales Funnel</h3>
            <div className="space-y-4">
              {[
                { stage: 'Lead Identified', count: 45, value: 45, color: 'bg-blue-600' },
                { stage: 'Initial Visit', count: 38, value: 42, color: 'bg-purple-600' },
                { stage: 'Requirement', count: 32, value: 38, color: 'bg-indigo-600' },
                { stage: 'Proposal Shared', count: 28, value: 35, color: 'bg-yellow-600' },
                { stage: 'Demo Conducted', count: 24, value: 32, color: 'bg-green-600' },
                { stage: 'Negotiation', count: 18, value: 28, color: 'bg-orange-600' },
                { stage: 'Won', count: 12, value: 24, color: 'bg-emerald-600' },
              ].map((stage, i) => (
                <div key={i} className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                    <span className="text-sm text-gray-600">{stage.count} deals • ₹{stage.value}L</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`${stage.color} h-3 rounded-full`} 
                      style={{ width: `${(stage.count / 45) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-xs text-gray-500">Visit to Lead</p>
                <p className="text-lg font-bold text-blue-600">71%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Lead to Proposal</p>
                <p className="text-lg font-bold text-yellow-600">56%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Proposal to Won</p>
                <p className="text-lg font-bold text-green-600">44%</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Pipeline Distribution</h3>
              <div className="space-y-3">
                {[
                  { label: 'Active', value: 65, color: 'bg-blue-600' },
                  { label: 'Negotiation', value: 18, color: 'bg-yellow-600' },
                  { label: 'Closing', value: 12, color: 'bg-green-600' },
                  { label: 'Stagnant', value: 8, color: 'bg-red-600' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Deal Size</span>
                  <span className="text-sm font-medium">₹2.8L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sales Cycle</span>
                  <span className="text-sm font-medium">18 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Win Rate</span>
                  <span className="text-sm font-medium">44%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Deals</span>
                  <span className="text-sm font-medium">103</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expenses Tab */}
      {selectedTab === 3 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Expense Approvals</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Distance</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...mockPendingExpenses, ...mockPendingExpenses].map((expense, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                          {expense.employee.charAt(0)}
                        </div>
                        <span className="text-sm">{expense.employee}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{formatDate(expense.date)}</td>
                    <td className="px-4 py-3 text-sm">{expense.client}</td>
                    <td className="px-4 py-3 text-center text-sm">{expense.distance} km</td>
                    <td className="px-4 py-3 text-center text-sm">{expense.vehicle}</td>
                    <td className="px-4 py-3 text-right text-sm font-medium">₹{expense.amount}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        Pending
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Follow-ups Tab */}
      {selectedTab === 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Overdue Follow-ups</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {mockStagnantDeals.map((deal) => (
                <div key={deal.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{deal.client}</h4>
                      <p className="text-sm text-gray-600">{deal.employee} • {deal.stage}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(deal.priority)}`}>
                      {deal.daysStagnant} days
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Last: {deal.lastAction}</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">
                      Assign
                    </button>
                    <button className="px-3 py-1 border border-gray-200 text-gray-600 text-xs rounded-lg hover:bg-gray-50">
                      Remind
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Follow-up Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium text-red-700">High Priority</span>
                <span className="text-lg font-bold text-red-700">5</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm font-medium text-yellow-700">Medium Priority</span>
                <span className="text-lg font-bold text-yellow-700">8</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-700">Low Priority</span>
                <span className="text-lg font-bold text-green-700">12</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Completed Today</span>
                <span className="text-lg font-bold text-gray-700">7</span>
              </div>
            </div>
            
            <button className="w-full mt-6 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
              View All Follow-ups
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;