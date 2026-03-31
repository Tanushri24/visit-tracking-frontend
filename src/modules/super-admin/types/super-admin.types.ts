// types/super-admin.types.ts

export type TimeRange = 'today' | 'week' | 'month' | 'custom';

export interface StatCard {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType<any>;
  borderColor: string;
  shadowColor: string;
  iconBg: string;
  iconColor: string;
  lightBg: string;
}

export interface ChartData {
  day: string;
  value: number;
}

export interface Visit {
  id: number;
  user: string;
  location: string;
  time: string;
  avatar: string;
}

export interface Location {
  name: string;
  count: number;
}

export interface ScheduleItem {
  time: string;
  title: string;
}

export interface FilterState {
  startDate: Date | null;
  endDate: Date | null;
  timeRange: TimeRange;
}

export interface DashboardProps {
  role?: 'super-admin' | 'admin' | 'manager' | 'employee';
}