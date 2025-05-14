import React, { useState } from 'react';
import {
  Target,
  TrendingUp,
  Award,
  BarChart,
  Plus,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Nuevo modelo de Objetivo
interface Goal {
  id: string;
  title: string;
  category: string; // Aspecto: Personal, Académico, Social, Profesional
  completed: boolean;
  dueDate: Date;
}

const GoalsPage = () => {
  // Objetivos predefinidos
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Perder peso',
      category: 'Personal',
      completed: false,
      dueDate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000), // 10 días restantes
    },
    {
      id: '2',
      title: 'Correr 5K',
      category: 'Personal',
      completed: false,
      dueDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 días restantes
    },
  ]);

  // Estados para el formulario de "Nuevo Objetivo"
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalCategory, setNewGoalCategory] = useState("Personal");
  const [newGoalDueDate, setNewGoalDueDate] = useState("");

  // Agregar un nuevo objetivo
  const addNewGoal = () => {
    const due = newGoalDueDate ? new Date(newGoalDueDate) : new Date();
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: newGoalTitle,
      category: newGoalCategory,
      completed: false,
      dueDate: due,
    };
    setGoals(prev => [...prev, newGoal]);
    setNewGoalTitle("");
    setNewGoalCategory("Personal");
    setNewGoalDueDate("");
    setShowNewGoalForm(false);
  };

  // Alternar el estado de completado de un objetivo
  const toggleGoal = (goalId: string) => {
    setGoals(prev =>
      prev.map(goal => goal.id === goalId ? { ...goal, completed: !goal.completed } : goal)
    );
  };

  // Función para calcular los días restantes hasta la fecha límite
  const daysRemaining = (dueDate: Date) => {
    const diffTime = dueDate.getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Estadísticas dinámicas
  const activeGoalsCount = goals.filter(goal => !goal.completed && daysRemaining(goal.dueDate) > 0).length;
  const completedGoalsCount = goals.filter(goal => goal.completed).length;
  const totalProgress = goals.length > 0 ? Math.round((completedGoalsCount / goals.length) * 100) : 0;

  // Actualizar la gráfica (para el prototipo se muestran los mismos valores en las 4 semanas)
  const progressData = [
    { name: 'Semana 1', value: totalProgress },
    { name: 'Semana 2', value: totalProgress },
    { name: 'Semana 3', value: totalProgress },
    { name: 'Semana 4', value: totalProgress },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Objetivos</h1>
          <p className="text-neutral-500 text-sm mt-1">
            Seguimiento de tus metas personales
          </p>
        </div>
        <button
          onClick={() => setShowNewGoalForm(!showNewGoalForm)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary-700 transition-colors"
        >
          <Plus size={20} className="mr-1" />
          Nuevo Objetivo
        </button>
      </div>

      {/* Formulario para agregar nuevo objetivo */}
      {showNewGoalForm && (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 mb-6">
          <h2 className="font-semibold mb-4">Agregar Nuevo Objetivo</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Objetivo (Título)"
              value={newGoalTitle}
              onChange={(e) => setNewGoalTitle(e.target.value)}
              className="border rounded p-2"
            />
            <select
              value={newGoalCategory}
              onChange={(e) => setNewGoalCategory(e.target.value)}
              className="border rounded p-2"
            >
              <option value="Personal">Personal</option>
              <option value="Académico">Académico</option>
              <option value="Social">Social</option>
              <option value="Profesional">Profesional</option>
            </select>
            <input
              type="date"
              value={newGoalDueDate}
              onChange={(e) => setNewGoalDueDate(e.target.value)}
              className="border rounded p-2"
            />
            <button
              onClick={addNewGoal}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Agregar Objetivo
            </button>
          </div>
        </div>
      )}

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
              <Target className="text-primary-600" size={18} />
            </div>
            <h2 className="font-medium">Objetivos Activos</h2>
          </div>
          <p className="text-2xl font-semibold">{activeGoalsCount}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-lg bg-success-100 flex items-center justify-center mr-3">
              <TrendingUp className="text-success-600" size={18} />
            </div>
            <h2 className="font-medium">Progreso General</h2>
          </div>
          <p className="text-2xl font-semibold">{totalProgress}%</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-lg bg-warning-100 flex items-center justify-center mr-3">
              <Award className="text-warning-600" size={18} />
            </div>
            <h2 className="font-medium">Objetivos Completados</h2>
          </div>
          <p className="text-2xl font-semibold">{completedGoalsCount}</p>
        </div>
      </div>

      {/* Lista de objetivos */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="p-4 border-b border-neutral-200">
          <h2 className="font-semibold">Objetivos Actuales</h2>
        </div>
        <div className="divide-y divide-neutral-200">
          {goals.map((goal) => (
            <div key={goal.id} className="p-4 hover:bg-neutral-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium">{goal.title}</h3>
                  <span className="text-sm text-neutral-500">{goal.category}</span>
                </div>
                <ChevronRight size={20} className="text-neutral-400" />
              </div>
              {/* Cuenta regresiva */}
              <div className="mb-3 text-sm">
                {daysRemaining(goal.dueDate) > 0 ? (
                  <span className="text-neutral-600">{daysRemaining(goal.dueDate)} días restantes</span>
                ) : (
                  <span className="text-error-600">Vencido</span>
                )}
              </div>
              {/* Botón de toggle */}
              <button
                onClick={() => toggleGoal(goal.id)}
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  goal.completed
                    ? 'bg-success-100 text-success-700'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {goal.completed ? 'Completado' : 'Marcar como Completado'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Gráfica de progreso semanal */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Progreso Semanal</h2>
          <div className="flex items-center text-sm text-neutral-500">
            <BarChart size={16} className="mr-1" />
            Último mes
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;
