// src/components/dashboard/DashboardContent.jsx
'use client';
import { Users, Activity, CheckCircle, Wrench } from 'lucide-react';
import StatsCard from './StatsCard';

export default function DashboardContent() {
  const stats = [
    { 
      title: 'Total Toilets', 
      value: '19', 
      icon: Users, 
      bgColor: 'bg-blue-500',
      change: '2.5',
      trend: 'up'
    },
    { 
      title: 'Ongoing Tasks', 
      value: '0', 
      icon: Activity, 
      bgColor: 'bg-yellow-500',
      change: '0',
      trend: 'up'
    },
    { 
      title: 'Completed Tasks', 
      value: '15', 
      icon: CheckCircle, 
      bgColor: 'bg-green-500',
      change: '12.5',
      trend: 'up'
    },
    { 
      title: 'Total Repairs', 
      value: '0', 
      icon: Wrench, 
      bgColor: 'bg-purple-500',
      change: '0',
      trend: 'up'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bgColor={stat.bgColor}
            change={stat.change}
            trend={stat.trend}
          />
        ))}
      </div>
    </div>
  );
}