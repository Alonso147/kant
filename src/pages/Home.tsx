import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import { Flame, Dumbbell, Activity, Calendar } from 'lucide-react';

const performanceData = [
  { day: 'Lun', progreso: 90 },
  { day: 'Mar', progreso: 100 },
  { day: 'Mié', progreso: 80 },
  { day: 'Jue', progreso: 85 },
  { day: 'Vie', progreso: 95 },
  { day: 'Sáb', progreso: 75 },
  { day: 'Dom', progreso: 36 },
];

const focusData = [
  { name: 'Nutrición', value: 40, color: '#ADEF91' },
  { name: 'Entrenamiento', value: 35, color: '#99E1D9' },
  { name: 'Sueño', value: 25, color: '#0B6E4F' },
];

const motivationalQuotes = [
  "Cada pequeño esfuerzo te acerca a un gran logro.",
  "La constancia vence al talento cuando el talento no se esfuerza.",
  "Tus hábitos hoy definen tu éxito mañana.",
];

const getPersonalizedAdvice = () => {
  const advice = [];

  // Basado en horas de sueño
  const lastSleep = performanceData[performanceData.length - 1].progreso;
  if (lastSleep < 80) {
    advice.push("Tu descanso no ha sido óptimo. Intenta ajustar tu horario de sueño para mejorar recuperación y enfoque.");
  } else {
    advice.push("Gran trabajo descansando bien. Mantén esta rutina para un rendimiento constante.");
  }

  // Basado en progreso de entrenamiento
  const avgProgress = performanceData.reduce((acc, curr) => acc + curr.progreso, 0) / performanceData.length;
  if (avgProgress < 85) {
    advice.push("Estás avanzando bien, pero podrías mejorar incorporando más movilidad o variando tu rutina.");
  } else {
    advice.push("Tu constancia es impresionante. Mantén el ritmo y escucha a tu cuerpo para evitar sobrecarga.");
  }

  // Basado en ciclo menstrual (simulación)
  const menstrualPhase = "luteal";
  if (menstrualPhase === "luteal") {
    advice.push("Estás en fase lútea. Prioriza alimentos ricos en magnesio y modera el ejercicio intenso si te sientes baja de energía.");
  } else if (menstrualPhase === "ovulation") {
    advice.push("Estás en fase de ovulación. ¡Momento perfecto para entrenamientos más intensos y metas exigentes!");
  } else if (menstrualPhase === "menstruation") {
    advice.push("Durante la menstruación, dale prioridad a la recuperación y a ejercicios suaves como yoga o movilidad.");
  }

  return advice;
};

const adviceList = getPersonalizedAdvice();
const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

const HomePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Título y descripción */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Inicio</h1>
        <p className="text-neutral-500 text-sm mt-1">
          Tu resumen general para mantenerte enfocado y en control.
        </p>
      </div>

      {/* Cards resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center text-neutral-600 mb-1">
            <Flame size={18} className="mr-2 text-red-500" />
            <span className="text-xs">Calorías quemadas</span>
          </div>
          <p className="text-lg font-semibold">2,150 kcal</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center text-neutral-600 mb-1">
            <Dumbbell size={18} className="mr-2 text-blue-500" />
            <span className="text-xs">Sesiones de gym</span>
          </div>
          <p className="text-lg font-semibold">6 / 6</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center text-neutral-600 mb-1">
            <Activity size={18} className="mr-2 text-emerald-500" />
            <span className="text-xs">Nivel de energía</span>
          </div>
          <p className="text-lg font-semibold">Alta</p>
        </div>
      </div>

      {/* Frase Motivacional */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <h2 className="font-semibold">Motivación del día 💪</h2>
        <p className="text-sm text-neutral-500 italic mt-2">{randomQuote}</p>
      </div>

      {/* Gráficos */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Gráfico de progreso semanal */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h2 className="font-semibold mb-4">Progreso semanal</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="progreso" fill="#0B6E4F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de enfoque */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h2 className="font-semibold mb-4">Enfoque actual</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={focusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {focusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sección de Consejos */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mt-6">
        <h2 className="font-semibold">Consejos personalizados 🌱</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-neutral-700 mt-2">
          {adviceList.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>

      {/* Nueva sección: Tareas y Eventos del Día */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Tareas y Eventos del Día</h2>
          <Link to="/organization" className="text-sm text-blue-500 hover:underline">
            Ver más
          </Link>
        </div>
        <ul className="list-disc list-inside text-sm text-neutral-700">
          <li>Reunión de equipo a las 9:00 AM</li>
          <li>Llamada con cliente a las 11:00 AM</li>
          <li>Entrenamiento: sesión de gym programada</li>
          <li>Recordatorio: enviar reporte diario</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
