import React, { useState } from "react";
import { Moon, Lightbulb } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Interfaz para cada registro de sueño
interface SleepRecord {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  motive: string;
  duration: number;
}

// Datos ficticios iniciales
const initialSleepRecords: SleepRecord[] = [
  {
    id: "1",
    date: new Date(2024, 3, 10),
    startTime: "22:30",
    endTime: "06:45",
    motive: "Rutina establecida",
    duration: 8.25,
  },
  {
    id: "2",
    date: new Date(2024, 3, 11),
    startTime: "23:15",
    endTime: "07:00",
    motive: "Trabajo tarde",
    duration: 7.75,
  },
  {
    id: "3",
    date: new Date(2024, 3, 12),
    startTime: "00:00",
    endTime: "07:30",
    motive: "Insomnio",
    duration: 7.5,
  },
];

const Sleep: React.FC = () => {
  // Estado para almacenar los registros iniciales
  const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>(initialSleepRecords);
  // Estados para el formulario de registro (solo se agrega un nuevo registro)
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [motive, setMotive] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // Para evitar múltiples registros

  // Función para guardar un registro de sueño (solo una vez)
  const handleSave = () => {
    if (!startTime || !endTime || isRegistered) return;

    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);
    let startInMinutes = startHour * 60 + startMin;
    let endInMinutes = endHour * 60 + endMin;
    let durationMinutes = endInMinutes - startInMinutes;

    if (durationMinutes < 0) durationMinutes += 1440; // Ajuste si pasa medianoche
    const duration = durationMinutes / 60;
    const newRecord: SleepRecord = {
      id: Date.now().toString(),
      date: new Date(),
      startTime,
      endTime,
      motive,
      duration,
    };

    setSleepRecords([...sleepRecords, newRecord]);
    setIsRegistered(true); // Evita más registros
    setStartTime("");
    setEndTime("");
    setMotive("");
  };

  // Datos para la gráfica semanal
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const weeklyData = daysOfWeek.map((day, idx) => {
    const totalHours = sleepRecords
      .filter((record) => record.date.getDay() === idx)
      .reduce((sum, record) => sum + record.duration, 0);
    return { name: day, hours: totalHours };
  });

  // Ordenamos el historial para mostrar primero los registros más recientes.
  const sortedRecords = [...sleepRecords].sort((a, b) => b.date.getTime() - a.date.getTime());

  // Cálculo de promedio de sueño (para consejos)
  const totalSleep = sleepRecords.reduce((sum, rec) => sum + rec.duration, 0);
  const avgSleep = sleepRecords.length > 0 ? totalSleep / sleepRecords.length : 0;
  const iaAdvice =
    avgSleep < 7
      ? "Se recomienda dormir al menos 7 horas para mejorar tu rendimiento y bienestar."
      : "Buen trabajo, estás manteniendo un patrón de sueño saludable.";

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Encabezado */}
      <div className="flex items-center mb-6">
        <Moon className="mr-2" size={24} />
        <h1 className="text-2xl font-bold text-neutral-900">Sleep</h1>
      </div>

      {/* Registro de sueño (solo un registro permitido) */}
      {!isRegistered && (
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <h2 className="font-semibold mb-4">Registro de sueño</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Selector de hora de inicio */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Hora de inicio
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:border-green-500"
              />
            </div>
            {/* Selector de hora de fin */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Hora de fin
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:border-green-500"
              />
            </div>
            {/* Campo de motivo */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Motivo
              </label>
              <input
                type="text"
                value={motive}
                onChange={(e) => setMotive(e.target.value)}
                placeholder="¿Por qué dormiste así?"
                className="w-full p-2 border rounded focus:outline-none focus:border-green-500"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Guardar
          </button>
        </div>
      )}

      {/* Visualización semanal */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <h2 className="font-semibold mb-4">Visualización Semanal</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: "Horas", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Bar dataKey="hours" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Historial de sueño */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <h2 className="font-semibold mb-4">Historial</h2>
        <ul className="space-y-3">
          {sortedRecords.map((record) => (
            <li key={record.id} className="p-3 border rounded hover:bg-neutral-50">
              <div className="flex justify-between text-sm">
                <span>{record.date.toLocaleDateString()}</span>
                <span>{record.duration.toFixed(1)} hrs</span>
              </div>
              <p className="mt-1 text-sm text-neutral-700">
                Inicio: {record.startTime} - Fin: {record.endTime}
              </p>
              <p className="mt-1 text-sm text-neutral-600">Motivo: {record.motive}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Consejos de la IA */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="flex items-center mb-4">
          <Lightbulb className="text-green-600 mr-2" size={20} />
          <h2 className="font-semibold">Consejos de la IA</h2>
        </div>
        <p className="text-neutral-800">{iaAdvice}</p>
      </div>
    </div>
  );
};

export default Sleep;
