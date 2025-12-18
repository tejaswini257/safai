'use client';

import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Washroom Cleanliness Impact Chart
export function WashroomCleanlinessChart() {
  const data = {
    labels: ['Budhawar Bazaar', 'Narendra Nagar', 'Sakkardara Bridge'],
    datasets: [
      {
        label: 'Before Cleaning',
        data: [4.2, 3.8, 4.5],
        backgroundColor: '#E5E7EB',
        borderRadius: 6,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      },
      {
        label: 'After Cleaning',
        data: [9.1, 8.8, 9.4],
        backgroundColor: '#2DB7C4',
        borderRadius: 6,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 16,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: true,
        text: 'Washroom Cleanliness Impact',
        font: {
          size: 16,
          weight: 600,
        },
        padding: {
          bottom: 16,
        },
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#1F2937',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => {
            return `Score: ${context.raw}`;
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
      y: {
        grid: {
          color: '#F3F4F6',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
          stepSize: 2,
          max: 10,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EEF2F5] shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-5 h-full">
      <Bar 
        data={data} 
        options={options}
        plugins={[{
          id: 'customDataLabels',
          afterDatasetsDraw(chart, args, options) {
            const { ctx, data, chartArea: { top, bottom, left, right, width, height } } = chart;
            
            data.datasets.forEach((dataset, i) => {
              const meta = chart.getDatasetMeta(i);
              meta.data.forEach((bar, index) => {
                const data = dataset.data[index];
                ctx.fillStyle = i === 0 ? '#4B5563' : 'white';
                ctx.font = '500 12px Inter';
                ctx.textAlign = 'center';
                ctx.fillText(data, bar.x, bar.y - 8);
              });
            });
          }
        }]}
      />
    </div>
  );
}

// Cleaner Performance Chart
export function CleanerPerformanceChart() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [12, 15, 18, 14, 20, 22, 24],
        borderColor: 'transparent',
        backgroundColor: (context) => {
          const bgColor = [
            'rgba(45, 183, 196, 0.2)',
            'rgba(45, 183, 196, 0.4)',
          ];
          if (!context.chart.chartArea) return;
          const { ctx, chartArea: { top, bottom } } = context.chart;
          const gradient = ctx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0, bgColor[0]);
          gradient.addColorStop(1, bgColor[1]);
          return gradient;
        },
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#2DB7C4',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Find the index of the highest value
  const maxValueIndex = data.datasets[0].data.indexOf(Math.max(...data.datasets[0].data));
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Cleaner Performance This Week',
        font: {
          size: 16,
          weight: 600,
        },
        padding: {
          bottom: 16,
        },
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#1F2937',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => {
            return `${context.parsed.y} tasks`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
      y: {
        grid: {
          color: '#F3F4F6',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
          stepSize: 5,
        },
        min: 0,
        max: 30,
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EEF2F5] shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-5 h-full relative">
      <div className="absolute right-4 top-4 bg-[#EAF7F8] text-[#2DB7C4] text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
        <span className="mr-1">▲</span> Tasks +27%
      </div>
      <Line data={data} options={options} />
      {data.labels.map((label, i) => (
        <div 
          key={i}
          className={`absolute ${i === maxValueIndex ? 'block' : 'hidden'}`}
          style={{
            left: `${(i / (data.labels.length - 1)) * 100}%`,
            top: '50%',
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="bg-[#F4B740] text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
            <span className="mr-1">★</span> {data.datasets[0].data[i]} tasks
          </div>
        </div>
      ))}
    </div>
  );
}
