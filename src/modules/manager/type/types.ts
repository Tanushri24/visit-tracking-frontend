// ============================================
// ENUMS
// ============================================

export type EmployeeStatus = 'active' | 'inactive' | 'on-leave';
export type Priority = 'high' | 'medium' | 'low';
export type ActivityType = 'visit' | 'update' | 'expense' | 'won' | 'followup';
export type DateRange = 'today' | 'week' | 'month' | 'custom';
export type TabType = 'overview' | 'team' | 'funnel' | 'expenses' | 'followups';

// ============================================
// INTERFACES
// ============================================

export interface TeamMember {
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
  status: EmployeeStatus;
}

export interface StagnantDeal {
  id: number;
  client: string;
  employee: string;
  stage: string;
  daysStagnant: number;
  lastAction: string;
  value: number;
  priority: Priority;
}

export interface PendingExpense {
  id: number;
  employee: string;
  employeeAvatar?: string;
  date: Date;
  client: string;
  distance: number;
  vehicle: string;
  amount: number;
}

export interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: Date;
  type: ActivityType;
}

export interface KPIData {
  teamVisitsToday: number;
  teamVisitsTrend: number;
  monthlyExpenses: number;
  expensesTrend: number;
  pipelineValue: number;
  pipelineTrend: number;
  overdueFollowups: number;
  overdueTrend: number;
}

export interface BusinessMetric {
  label: string;
  current: number;
  target: number;
  unit: 'number' | 'currency' | 'percentage';
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'red';
}

export interface ScheduleEvent {
  time: string;
  client: string;
  employee: string;
  type: string;
}

export interface FunnelStage {
  stage: string;
  count: number;
  value: number;
  color: string;
}

export interface PipelineDistribution {
  label: string;
  value: number;
  color: string;
}

export interface QuickStat {
  label: string;
  value: string;
}

export interface FollowupSummary {
  highPriority: number;
  mediumPriority: number;
  lowPriority: number;
  completedToday: number;
}

// ============================================
// PROPS INTERFACES
// ============================================

export interface ManagerDashboardProps {
  managerId: number;
  managerName: string;
  managerRole: string;
  initialDateRange?: DateRange;
}

export interface KPICardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ReactNode;
  color: 'blue' | 'yellow' | 'green' | 'red';
  format?: 'number' | 'currency' | 'percentage';
}

export interface TeamPerformanceTableProps {
  data: TeamMember[];
  onViewAll?: () => void;
}

export interface StagnantDealsTableProps {
  data: StagnantDeal[];
}

export interface PendingExpensesTableProps {
  data: PendingExpense[];
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

export interface BusinessMetricsProps {
  metrics: BusinessMetric[];
}

export interface TodayScheduleProps {
  events: ScheduleEvent[];
  currentDate: Date;
}

export interface RecentActivitiesProps {
  activities: Activity[];
}

export interface FunnelAnalysisProps {
  stages: FunnelStage[];
  conversionRates: {
    visitToLead: number;
    leadToProposal: number;
    proposalToWon: number;
  };
  distribution: PipelineDistribution[];
  quickStats: QuickStat[];
}

export interface FollowupsTabProps {
  overdueDeals: StagnantDeal[];
  summary: FollowupSummary;
  onAssign: (id: number) => void;
  onRemind: (id: number) => void;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface DashboardApiResponse {
  success: boolean;
  data: ManagerDashboardData;
  error?: string;
}

export interface ManagerDashboardData {
  kpi: KPIData;
  teamPerformance: TeamMember[];
  stagnantDeals: StagnantDeal[];
  pendingExpenses: PendingExpense[];
  activities: Activity[];
  schedule: ScheduleEvent[];
  funnel: {
    stages: FunnelStage[];
    conversionRates: {
      visitToLead: number;
      leadToProposal: number;
      proposalToWon: number;
    };
    distribution: PipelineDistribution[];
    quickStats: QuickStat[];
  };
  followupSummary: FollowupSummary;
}