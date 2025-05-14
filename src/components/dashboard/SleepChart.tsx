import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { mockSleepData } from '../../utils/mockData';

const SleepChart: React.FC = () => {
  const data = [...mockSleepData]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 7) // Get last 7 days
    .map((item) => ({
      date: item.date,
      hours: item.duration,
      quality: item.quality,
      formattedDate: format(parseISO(item.date), 'EEE'),
    }));

  // Calculate weekly average
  const weeklyAverage = data.reduce((sum, item) => sum + item.hours, 0) / data.length;

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="formattedDate" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            domain={[0, 10]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}h`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}
            formatter={(value: number, name: string) => {
              if (name === 'hours') return [`${value.toFixed(1)} hours`, 'Sleep Duration'];
              return [value, name];
            }}
            labelFormatter={(label) => {
              const item = data.find(d => d.formattedDate === label);
              return item ? format(parseISO(item.date), 'MMMM d, yyyy') : label;
            }}
          />
          <ReferenceLine 
            y={weeklyAverage} 
            stroke="#9CA3AF" 
            strokeDasharray="3 3"
            label={{ 
              value: `Avg: ${weeklyAverage.toFixed(1)}h`,
              position: 'right',
              fill: '#6B7280',
              fontSize: 12
            }}
          />
          <Bar 
            dataKey="hours" 
            fill="#10b981" 
            radius={[4, 4, 0, 0]}
            barSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SleepChart;