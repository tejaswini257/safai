// src/components/dashboard/StatsCard.jsx
'use client';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function StatsCard({ title, value, icon: Icon, bgColor, change, trend }) {
  const isPositive = trend === 'up';
  const textColor = isPositive ? 'text-green-100' : 'text-red-100';
  const ArrowIcon = isPositive ? ArrowUp : ArrowDown;
  
  return (
    <div className={`${bgColor} rounded-2xl p-6 text-white shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-white/80">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-xl bg-white/10">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className={`inline-flex items-center text-xs font-medium ${textColor}`}>
          <ArrowIcon className="h-3 w-3 mr-1" />
          <span>{change}% {isPositive ? 'increase' : 'decrease'} from last week</span>
        </div>
      </div>
    </div>
  );
}