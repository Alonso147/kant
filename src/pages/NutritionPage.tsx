import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import {
  Plus, Calendar, Utensils, Scale, Target,
  Bell, BarChart3, ChevronRight, Camera
} from 'lucide-react';

interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  completed: boolean;
}

const NutritionPage = () => {
  const [selectedDate] = useState(new Date());

  // Datos simulados para macronutrientes y calorías semanales
  const macroData = [
    { name: 'Proteínas', value: 120, color: '#ADEF91' },
    { name: 'Carbohidratos', value: 250, color: '#99E1D9' },
    { name: 'Grasas', value: 70, color: '#0B6E4F' },
  ];

  const weeklyData = [
    { day: 'Lun', calories: 2100, goal: 2200 },
    { day: 'Mar', calories: 2300, goal: 2200 },
    { day: 'Mié', calories: 1950, goal: 2200 },
    { day: 'Jue', calories: 2250, goal: 2200 },
    { day: 'Vie', calories: 2000, goal: 2200 },
    { day: 'Sáb', calories: 2400, goal: 2200 },
    { day: 'Dom', calories: 2150, goal: 2200 },
  ];

  // Usamos useState para manejar las comidas, lo que permite modificaciones dinámicas
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: '1',
      name: 'Desayuno',
      time: '08:00',
      calories: 450,
      protein: 20,
      carbs: 60,
      fat: 15,
      completed: true,
    },
    {
      id: '2',
      name: 'Almuerzo',
      time: '13:00',
      calories: 650,
      protein: 35,
      carbs: 80,
      fat: 20,
      completed: false,
    },
    {
      id: '3',
      name: 'Cena',
      time: '20:00',
      calories: 550,
      protein: 30,
      carbs: 65,
      fat: 18,
      completed: false,
    },
  ]);

  // Handler para agregar una nueva comida inventada
  const handleAddMeal = () => {
    const newMeal: Meal = {
      id: Date.now().toString(),
      name: 'Snack energético',
      time: '16:00',
      calories: 300,
      protein: 10,
      carbs: 40,
      fat: 8,
      completed: false,
    };
    setMeals(prev => [...prev, newMeal]);
  };

  // Handler para marcar/demarcar una comida como completada
  const handleToggleMeal = (mealId: string) => {
    setMeals(prev =>
      prev.map(meal =>
        meal.id === mealId ? { ...meal, completed: !meal.completed } : meal
      )
    );
  };

  // Calcular estadísticas dinámicas basadas en las comidas que estén completadas
  const goalCalories = 2200;
  const goalProtein = 120;
  const totalCompletedCalories = meals
    .filter(m => m.completed)
    .reduce((sum, m) => sum + m.calories, 0);
  const totalCompletedProtein = meals
    .filter(m => m.completed)
    .reduce((sum, m) => sum + m.protein, 0);
  const progressPercentage = Math.min(100, Math.round((totalCompletedCalories / goalCalories) * 100));

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Nutrición</h1>
          <p className="text-neutral-500 text-sm mt-1">
            Seguimiento de tu alimentación diaria
          </p>
        </div>
        <button
          onClick={handleAddMeal}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary-700 transition-colors"
        >
          <Plus size={20} className="mr-1" />
          Añadir Comida
        </button>
      </div>

      {/* Date and Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calendar size={20} className="text-primary-600 mr-2" />
            <span className="font-medium">
              {format(selectedDate, 'EEEE, d MMMM')}
            </span>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100">
              <Camera size={20} />
            </button>
            <button className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100">
              <Bell size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-neutral-50 rounded-lg p-3">
            <div className="flex items-center text-neutral-600 mb-1">
              <Utensils size={16} className="mr-1" />
              <span className="text-xs">Calorías</span>
            </div>
            <p className="text-lg font-semibold">
              {totalCompletedCalories} / {goalCalories}
            </p>
          </div>

          <div className="bg-neutral-50 rounded-lg p-3">
            <div className="flex items-center text-neutral-600 mb-1">
              <Scale size={16} className="mr-1" />
              <span className="text-xs">Proteína</span>
            </div>
            <p className="text-lg font-semibold">
              {totalCompletedProtein}g / {goalProtein}g
            </p>
          </div>

          <div className="bg-neutral-50 rounded-lg p-3">
            <div className="flex items-center text-neutral-600 mb-1">
              <Target size={16} className="mr-1" />
              <span className="text-xs">Progreso</span>
            </div>
            <p className="text-lg font-semibold">{progressPercentage}%</p>
          </div>
        </div>
      </div>

      {/* Macros and Weekly Progress */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Macronutrients Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
          <h2 className="font-semibold mb-4">Distribución de Macros</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Calories */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
          <h2 className="font-semibold mb-4">Calorías Semanales</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calories" fill="#10b981" />
                <Bar dataKey="goal" fill="#e2e8f0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Meals List */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="p-4 border-b border-neutral-200">
          <h2 className="font-semibold">Comidas de Hoy</h2>
        </div>

        <div className="divide-y divide-neutral-200">
          {meals.map((meal) => (
            <div key={meal.id} className="p-4 hover:bg-neutral-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
                    <Utensils className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">{meal.name}</h3>
                    <p className="text-sm text-neutral-500">{meal.time}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-neutral-400" />
              </div>

              <div className="grid grid-cols-4 gap-4 mt-3">
                <div className="text-center p-2 bg-neutral-50 rounded-lg">
                  <p className="text-xs text-neutral-500">Calorías</p>
                  <p className="font-medium">{meal.calories}</p>
                </div>
                <div className="text-center p-2 bg-neutral-50 rounded-lg">
                  <p className="text-xs text-neutral-500">Proteína</p>
                  <p className="font-medium">{meal.protein}g</p>
                </div>
                <div className="text-center p-2 bg-neutral-50 rounded-lg">
                  <p className="text-xs text-neutral-500">Carbos</p>
                  <p className="font-medium">{meal.carbs}g</p>
                </div>
                <div className="text-center p-2 bg-neutral-50 rounded-lg">
                  <p className="text-xs text-neutral-500">Grasas</p>
                  <p className="font-medium">{meal.fat}g</p>
                </div>
              </div>

              <button
                onClick={() => handleToggleMeal(meal.id)}
                className={`w-full mt-3 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  meal.completed
                    ? 'bg-success-100 text-success-700'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {meal.completed ? 'Completado' : 'Marcar como completado'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;
