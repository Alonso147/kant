import React, { useState } from 'react';
import Card from '../shared/Card';
import { Utensils, Dumbbell, Moon, Scale } from 'lucide-react';

interface QuickEntryProps {
  onSubmit?: (data: any) => void;
}

type EntryType = 'meal' | 'exercise' | 'sleep' | 'weight';

const QuickEntry: React.FC<QuickEntryProps> = ({ onSubmit }) => {
  const [activeTab, setActiveTab] = useState<EntryType>('meal');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would capture form data and pass it to onSubmit
    console.log('Form submitted');
  };

  return (
    <Card title="Quick Entry" className="animate-fade-in">
      <div className="flex border-b border-neutral-200 mb-4">
        <button
          className={`pb-2 px-3 text-sm font-medium flex items-center ${
            activeTab === 'meal'
              ? 'text-primary-700 border-b-2 border-primary-500'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
          onClick={() => setActiveTab('meal')}
        >
          <Utensils size={16} className="mr-1.5" />
          Meal
        </button>
        <button
          className={`pb-2 px-3 text-sm font-medium flex items-center ${
            activeTab === 'exercise'
              ? 'text-primary-700 border-b-2 border-primary-500'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
          onClick={() => setActiveTab('exercise')}
        >
          <Dumbbell size={16} className="mr-1.5" />
          Exercise
        </button>
        <button
          className={`pb-2 px-3 text-sm font-medium flex items-center ${
            activeTab === 'sleep'
              ? 'text-primary-700 border-b-2 border-primary-500'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
          onClick={() => setActiveTab('sleep')}
        >
          <Moon size={16} className="mr-1.5" />
          Sleep
        </button>
        <button
          className={`pb-2 px-3 text-sm font-medium flex items-center ${
            activeTab === 'weight'
              ? 'text-primary-700 border-b-2 border-primary-500'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
          onClick={() => setActiveTab('weight')}
        >
          <Scale size={16} className="mr-1.5" />
          Weight
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === 'meal' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Meal Type
              </label>
              <select className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-sm">
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snack</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Food Name
                </label>
                <input 
                  type="text" 
                  className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-sm" 
                  placeholder="E.g., Oatmeal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Calories
                </label>
                <input 
                  type="number" 
                  className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-sm" 
                  placeholder="kcal"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exercise' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Exercise Type
              </label>
              <select className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-sm">
                <option>Cardio</option>
                <option>Strength</option>
                <option>Flexibility</option>
                <option>Balance</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Exercise Name
                </label>
                <input 
                  type="text" 
                  className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-sm" 
                  placeholder="E.g., Running"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Duration (mins)
                </label>
                <input 
                  type="number" 
                  className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-sm" 
                  placeholder="30"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sleep' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Sleep Time
                </label>
                <input 
                  type="time" 
                  className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-sm" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Wake Time
                </label>
                <input 
                  type="time" 
                  className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-sm" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Sleep Quality
              </label>
              <div className="flex items-center space-x-2 pt-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-300 text-sm hover:bg-primary-50 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'weight' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Weight (kg)
              </label>
              <input 
                type="number" 
                step="0.1"
                className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-sm" 
                placeholder="65.5"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Date
              </label>
              <input 
                type="date" 
                className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-sm" 
                defaultValue={new Date().toISOString().slice(0, 10)}
              />
            </div>
          </div>
        )}

        <div className="mt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Save
          </button>
        </div>
      </form>
    </Card>
  );
};

export default QuickEntry;