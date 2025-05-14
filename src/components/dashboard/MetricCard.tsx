import React from 'react';
import Card from '../shared/Card';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  icon: React.ReactNode;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  change,
  icon,
  color = 'bg-primary-50 text-primary-700',
}) => {
  // Determine trend icon and color
  let TrendIcon = Minus;
  let trendColor = 'text-neutral-500';
  
  if (change !== undefined) {
    if (change > 0) {
      TrendIcon = ArrowUpRight;
      trendColor = 'text-success-500';
    } else if (change < 0) {
      TrendIcon = ArrowDownRight;
      trendColor = 'text-error-500';
    }
  }

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        
        {change !== undefined && (
          <div className={`flex items-center ${trendColor} text-xs font-medium`}>
            <TrendIcon size={14} className="mr-0.5" />
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      
      <div className="mt-3">
        <h3 className="text-sm font-medium text-neutral-500">{title}</h3>
        <div className="flex items-baseline mt-1">
          <p className="text-2xl font-semibold">{value}</p>
          {unit && <span className="ml-1 text-sm text-neutral-500">{unit}</span>}
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;