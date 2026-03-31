// src/modules/super-admin/pages/master-management/components/StatsCard.tsx

import React from 'react';

interface StatsCardProps {
  label: string;
  value: number;
  icon: React.ComponentType<any>;
  iconBg: string;
  iconColor: string;
  borderColor: string;
  change: string;
  changeType: 'positive' | 'negative';
}

const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  borderColor,
  change,
  changeType
}) => {
  return (
    <div className={`bg-white rounded-lg p-2.5 sm:p-3 border-l-4 ${borderColor} border border-gray-100 shadow-sm hover:shadow-md transition-all`}>
      <div className="flex items-start justify-between mb-1.5 sm:mb-2">
        <div className={`p-1.5 ${iconBg} rounded-md`}>
          <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${iconColor}`} />
        </div>
        <span className={`text-[9px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
          changeType === 'positive' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          {change}
        </span>
      </div>
      <div>
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">{value}</h3>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 font-medium">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;