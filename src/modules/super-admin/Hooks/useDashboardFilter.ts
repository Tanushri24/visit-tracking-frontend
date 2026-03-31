// hooks/useDashboardFilter.ts
import { useState, useCallback, useMemo } from 'react';
import type { FilterState, TimeRange } from '../types/super-admin.types';

export const useDashboardFilter = () => {
  const [filterState, setFilterState] = useState<FilterState>({
    startDate: null,
    endDate: null,
    timeRange: 'week'
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleTimeRangeChange = useCallback((range: TimeRange) => {
    const dates = getDateRange(range);
    setFilterState({
      timeRange: range,
      startDate: dates.start,
      endDate: dates.end
    });
  }, []);

  const handleDateSelect = useCallback((start: Date | null, end: Date | null) => {
    setFilterState(prev => ({
      ...prev,
      startDate: start,
      endDate: end,
      timeRange: 'custom'
    }));
    setShowDatePicker(false);
  }, []);

  const toggleDatePicker = useCallback(() => {
    setShowDatePicker(prev => !prev);
  }, []);

  const filterLabel = useMemo(() => {
    switch (filterState.timeRange) {
      case 'today': return 'Today';
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      case 'custom':
        if (filterState.startDate && filterState.endDate) {
          return `${filterState.startDate.toLocaleDateString()} - ${filterState.endDate.toLocaleDateString()}`;
        }
        return 'Custom Range';
      default: return 'This Week';
    }
  }, [filterState]);

  return {
    filterState,
    showDatePicker,
    filterLabel,
    handleTimeRangeChange,
    handleDateSelect,
    toggleDatePicker,
    setShowDatePicker
  };
};

// Helper function
const getDateRange = (range: TimeRange) => {
  const now = new Date();
  const start = new Date();
  const end = new Date();

  switch (range) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      break;
    case 'week':
      start.setDate(now.getDate() - 7);
      break;
    case 'month':
      start.setMonth(now.getMonth() - 1);
      break;
    default:
      start.setDate(now.getDate() - 7);
  }

  return { start, end };
};