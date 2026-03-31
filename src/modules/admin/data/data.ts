// modules/admin/constants/admin.constants.ts
import { 
  Users, Settings, FileText, Eye,
  Calendar, MapPin, Shield, Activity,
  Clock, CheckCircle, UserPlus
} from 'lucide-react';
import type {
    StatCard,
    QuickAction,
    RecentActivity,
    PendingApproval,
    MasterStat,
    FilterOption
} from '../types/type';

// Stats Cards Data
export const STATS_CARDS: StatCard[] = [
  { 
    label: 'Total Users', 
    value: '1,234', 
    change: '+12%',
    icon: Users,
    borderColor: 'border-l-blue-500',
    shadowColor: 'shadow-blue-100',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    lightBg: 'bg-blue-50'
  },
  { 
    label: 'Active Masters', 
    value: '48', 
    change: '+3',
    icon: Settings,
    borderColor: 'border-l-purple-500',
    shadowColor: 'shadow-purple-100',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    lightBg: 'bg-purple-50'
  },
  { 
    label: 'Total Reports', 
    value: '567', 
    change: '+8%',
    icon: FileText,
    borderColor: 'border-l-emerald-500',
    shadowColor: 'shadow-emerald-100',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    lightBg: 'bg-emerald-50'
  },
  { 
    label: 'Active Visits', 
    value: '89', 
    change: '+23%',
    icon: Eye,
    borderColor: 'border-l-orange-500',
    shadowColor: 'shadow-orange-100',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    lightBg: 'bg-orange-50'
  },
];

// Quick Actions Data
export const QUICK_ACTIONS: QuickAction[] = [
  { icon: UserPlus, label: 'Add User', color: 'blue', onClick: () => {} },
  { icon: Settings, label: 'Manage Masters', color: 'purple', onClick: () => {} },
  { icon: FileText, label: 'Generate Report', color: 'emerald', onClick: () => {} },
  { icon: Calendar, label: 'Schedule', color: 'orange', onClick: () => {} },
];

// Recent Activities Data
export const RECENT_ACTIVITIES: RecentActivity[] = [
  { user: 'John Smith', action: 'added new user', target: 'Emma Wilson', time: '5 min ago', type: 'create' },
  { user: 'Admin', action: 'updated master', target: 'Location Settings', time: '15 min ago', type: 'update' },
  { user: 'Sarah Johnson', action: 'generated report', target: 'Monthly Summary', time: '1 hour ago', type: 'report' },
  { user: 'Michael Chen', action: 'modified permissions', target: 'Manager Role', time: '2 hours ago', type: 'security' },
];

// Pending Approvals Data
export const PENDING_APPROVALS: PendingApproval[] = [
  { item: 'New User Registration', count: 5, priority: 'high' },
  { item: 'Master Data Changes', count: 3, priority: 'medium' },
  { item: 'Report Requests', count: 8, priority: 'low' },
];

// Master Data Stats
export const MASTER_STATS: MasterStat[] = [
  { name: 'Locations', count: 42, icon: MapPin },
  { name: 'Roles', count: 8, icon: Shield },
  { name: 'Permissions', count: 24, icon: Settings },
  { name: 'Categories', count: 15, icon: FileText },
];

// Filter Options
export const FILTER_OPTIONS: FilterOption[] = [
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'Custom', value: 'custom' }
];