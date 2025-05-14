import React from 'react';
import { Utensils, Dumbbell, Scale, Moon, Calendar as CalendarIcon, Heart } from 'lucide-react';
import Card from '../components/shared/Card';
import MetricCard from '../components/dashboard/MetricCard';
import ProgressRing from '../components/shared/ProgressRing';
import CalorieChart from '../components/dashboard/CalorieChart';
import WeightChart from '../components/dashboard/WeightChart';
import SleepChart from '../components/dashboard/SleepChart';
import MiniCalendar from '../components/dashboard/MiniCalendar';
import QuickEntry from '../components/dashboard/QuickEntry';
import { mockNutritionData, mockSleepData, mockGoals } from '../utils/mockData';

const Dashboard: React.FC = () => {
  // Get today's metrics from the latest data
  const todayNutrition = mockNutritionData[0];
  const todaySleep = mockSleepData[0];
  
  // Calculate progress for goals
  const goalProgress = mockGoals.map(goal => {
    if (goal.targetValue && goal.currentValue) {
      return {
        ...goal,
        progress: goal.currentValue / goal.targetValue,
      };
    }
    return { ...goal, progress: 0 };
  });

  return (
    <div className="animate-fade-in">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
        <span className="text-sm text-neutral-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard 
          title="Calories" 
          value={todayNutrition.calories} 
          unit="kcal"
          change={3}
          icon={<Utensils size={18} />}
          color="bg-primary-50 text-primary-700"
        />
        
        <MetricCard 
          title="Protein" 
          value={todayNutrition.protein} 
          unit="g"
          change={5}
          icon={<Dumbbell size={18} />}
          color="bg-info-50 text-info-700"
        />
        
        <MetricCard 
          title="Weight" 
          value="65.5" 
          unit="kg"
          change={-2}
          icon={<Scale size={18} />}
          color="bg-warning-50 text-warning-700"
        />
        
        <MetricCard 
          title="Sleep" 
          value={todaySleep.duration.toFixed(1)} 
          unit="hrs"
          change={0}
          icon={<Moon size={18} />}
          color="bg-success-50 text-success-700"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Calories Chart */}
          <Card title="Calorie Intake (Last 7 Days)">
            <CalorieChart />
          </Card>
          
          {/* Weight Chart */}
          <Card title="Weight Tracking">
            <WeightChart />
          </Card>
          
          {/* Sleep Chart */}
          <Card title="Sleep Duration">
            <SleepChart />
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Calendar */}
          <Card title="Calendar" action={<button className="text-xs text-primary-600 hover:underline">View Full</button>}>
            <MiniCalendar />
          </Card>
          
          {/* Quick Entry */}
          <QuickEntry />
          
          {/* Goals Progress */}
          <Card title="Goal Progress">
            <div className="space-y-4">
              {goalProgress.slice(0, 3).map((goal) => (
                <div key={goal.id} className="flex items-center">
                  <div className="mr-3">
                    <ProgressRing progress={goal.progress} size={44} strokeWidth={4}>
                      <span className="text-xs font-medium">
                        {Math.round(goal.progress * 100)}%
                      </span>
                    </ProgressRing>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">
                      {goal.title}
                    </p>
                    {goal.targetValue && goal.currentValue && (
                      <p className="text-xs text-neutral-500">
                        {goal.currentValue} / {goal.targetValue} {goal.category === 'fitness' ? 'kg' : ''}
                      </p>
                    )}
                  </div>
                  <div className="ml-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      goal.category === 'fitness' 
                        ? 'bg-success-100 text-success-800' 
                        : 'bg-info-100 text-info-800'
                    }`}>
                      {goal.category}
                    </span>
                  </div>
                </div>
              ))}
              <button className="w-full py-1.5 px-3 border border-neutral-300 rounded-md text-xs font-medium text-neutral-700 hover:bg-neutral-50">
                View All Goals
              </button>
            </div>
          </Card>
          
          {/* Period Tracking (if applicable) */}
          <Card title="Cycle Tracking" className="bg-primary-50 bg-opacity-50 border-primary-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-medium text-neutral-900">Current Phase</h4>
                <p className="text-xs text-neutral-500">Day 8 of 28</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Heart size={20} className="text-primary-600" />
              </div>
            </div>
            <div className="h-2 w-full bg-primary-100 rounded-full mb-4">
              <div 
                className="h-2 bg-primary-500 rounded-full"
                style={{ width: '28%' }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-neutral-500">
              <span>Follicular phase</span>
              <span>Next period in 20 days</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;