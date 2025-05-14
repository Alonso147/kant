import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { mockWeightData } from '../../utils/mockData';

const WeightChart: React.FC = () => {
  const data = [...mockWeightData]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item) => ({
      date: item.date,
      weight: item.weight,
      formattedDate: format(parseISO(item.date), 'MM/dd'),
    }));

  // Calculate min and max for Y-axis domain
  const weights = data.map(d => d.weight);
  const minWeight = Math.floor(Math.min(...weights) - 1);
  const maxWeight = Math.ceil(Math.max(...weights) + 1);

  // Filter to show only every 5th data point on the X-axis for cleaner appearance
  const filteredData = data.filter((_, index) => index % 5 === 0);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="formattedDate" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            ticks={filteredData.map(d => d.formattedDate)}
          />
          <YAxis 
            domain={[minWeight, maxWeight]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}
            formatter={(value: number) => [`${value} kg`, 'Weight']}
            labelFormatter={(label) => {
              const item = data.find(d => d.formattedDate === label);
              return item ? format(parseISO(item.date), 'MMMM d, yyyy') : label;
            }}
          />
          <Line 
            type="monotone" 
            dataKey="weight" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 4, fill: '#10b981', stroke: 'white', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeightChart;