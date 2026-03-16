// constants/dashboard.constants.ts
import { Eye, Users, MapPin, Clock } from 'lucide-react';
import type { StatCard, ChartData, Visit, Location, ScheduleItem } from '../types/super-admin.types';

export const STATS_CARDS: StatCard[] = [
  {
    label: 'Total Visits',
    value: '1,234',
    change: '+12%',
    icon: Eye,
    borderColor: 'border-l-purple-500',
    shadowColor: 'shadow-purple-100',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    lightBg: 'bg-purple-50'
  },
  {
    label: 'Active Users',
    value: '567',
    change: '+8%',
    icon: Users,
    borderColor: 'border-l-purple-400',
    shadowColor: 'shadow-purple-100',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
    lightBg: 'bg-purple-50'
  },
  {
    label: 'Locations',
    value: '42',
    change: '+3',
    icon: MapPin,
    borderColor: 'border-l-purple-500',
    shadowColor: 'shadow-purple-100',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    lightBg: 'bg-purple-50'
  },
  {
    label: 'Avg Time',
    value: '2.4h',
    change: '-5%',
    icon: Clock,
    borderColor: 'border-l-purple-400',
    shadowColor: 'shadow-purple-100',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
    lightBg: 'bg-purple-50'
  }
];

export const CHART_DATA: ChartData[] = [
  { day: 'Mon', value: 30 },
  { day: 'Tue', value: 55 },
  { day: 'Wed', value: 75 },
  { day: 'Thu', value: 45 },
  { day: 'Fri', value: 85 },
  { day: 'Sat', value: 50 },
  { day: 'Sun', value: 35 }
];

export const RECENT_VISITS: Visit[] = [
  { id: 1, user: 'John Smith', location: 'Downtown Office', time: '10 min ago', avatar: 'JS' },
  { id: 2, user: 'Emma Wilson', location: 'North Warehouse', time: '25 min ago', avatar: 'EW' },
  { id: 3, user: 'Michael Chen', location: 'Tech Hub', time: '1 hour ago', avatar: 'MC' },
  { id: 4, user: 'Sarah Johnson', location: 'South Branch', time: '2 hours ago', avatar: 'SJ' },
  { id: 5, user: 'David Brown', location: 'East Facility', time: '3 hours ago', avatar: 'DB' }
];

export const POPULAR_LOCATIONS: Location[] = [
  { name: 'Downtown Office', count: 145 },
  { name: 'North Warehouse', count: 98 },
  { name: 'Tech Hub', count: 87 },
  { name: 'South Branch', count: 76 }
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  { time: '09:00 AM', title: 'Downtown Office' },
  { time: '11:30 AM', title: 'Team Meeting' },
  { time: '02:00 PM', title: 'Site Inspection' },
  { time: '04:30 PM', title: 'Client Call' }
];