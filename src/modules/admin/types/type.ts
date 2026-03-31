// modules/admin/types/admin.types.ts
// import { ReactElement } from 'react';

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

export interface QuickAction {
  icon: React.ElementType<any>;
  label: string;
  color: string;
  onClick?: () => void;
}

export interface RecentActivity {
  user: string;
  action: string;
  target: string;
  time: string;
  type: string;
}

export interface PendingApproval {
  item: string;
  count: number;
  priority: 'high' | 'medium' | 'low';
}

export interface MasterStat {
  name: string;
  count: number;
  icon: React.ElementType<any>;
}

export interface FilterOption {
  label: string;
  value: TimeRange;
}