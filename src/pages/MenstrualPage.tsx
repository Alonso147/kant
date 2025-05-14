import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import {
  Heart,
  Droplet,
  ThermometerSun,
  Smile,
  Moon,
  Plus,
  ChevronRight,
} from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  intensity: number;
  date: Date;
}

const MenstrualPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [cyclePhase] = useState('Fase folicular');
  const [symptoms] = useState<Symptom[]>([
    { id: '1', name: 'Cólicos', intensity: 3, date: new Date() },
    { id: '2', name: 'Fatiga', intensity: 2, date: new Date() },
    { id: '3', name: 'Cambios de humor', intensity: 1, date: new Date() },
  ]);

  const getDateClass = (date: Date) => {
    // Aquí implementarías la lógica para colorear las fechas según la fase
    return 'bg-primary-100';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Seguimiento del Ciclo
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            Monitorea tu ciclo menstrual y síntomas
          </p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary-700 transition-colors">
          <Plus size={20} className="mr-1" />
          Registrar Día
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendario y Fase Actual */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileClassName={({ date }) => getDateClass(date)}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 className="font-semibold mb-4">Fase Actual</h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-medium text-primary-600">
                  {cyclePhase}
                </p>
                <p className="text-sm text-neutral-500">Día 8 de 28</p>
              </div>
              <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Heart className="text-primary-600" size={24} />
              </div>
            </div>
            <div className="h-2 bg-neutral-200 rounded-full">
              <div
                className="h-2 bg-primary-500 rounded-full"
                style={{ width: '28%' }}
              ></div>
            </div>
            <p className="text-sm text-neutral-500 mt-2">
              Próximo período en 20 días
            </p>
          </div>
        </div>

        {/* Síntomas y Estado */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="p-4 border-b border-neutral-200">
              <h2 className="font-semibold">Síntomas de Hoy</h2>
            </div>

            <div className="divide-y divide-neutral-200">
              {symptoms.map((symptom) => (
                <div
                  key={symptom.id}
                  className="p-4 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
                        <Droplet className="text-primary-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">{symptom.name}</h3>
                        <div className="flex mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-6 h-1 rounded-full mr-1 ${
                                i < symptom.intensity
                                  ? 'bg-primary-500'
                                  : 'bg-neutral-200'
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-neutral-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 className="font-semibold mb-4">Estado General</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center text-neutral-600 mb-2">
                  <ThermometerSun size={16} className="mr-2" />
                  <span className="text-sm font-medium">Temperatura</span>
                </div>
                <p className="text-lg font-semibold">36.5°C</p>
              </div>
              
              <div className="p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center text-neutral-600 mb-2">
                  <Moon size={16} className="mr-2" />
                  <span className="text-sm font-medium">Calidad de Sueño</span>
                </div>
                <p className="text-lg font-semibold">Buena</p>
              </div>
              
              <div className="p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center text-neutral-600 mb-2">
                  <Smile size={16} className="mr-2" />
                  <span className="text-sm font-medium">Estado de Ánimo</span>
                </div>
                <p className="text-lg font-semibold">Positivo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenstrualPage;