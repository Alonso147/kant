import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, ChevronRight, BarChart3, Dumbbell, Timer, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  completed: boolean;
}

interface WorkoutRoutine {
  id: string;
  name: string;
  exercises: Exercise[];
}

const ExercisePage = () => {
  const navigate = useNavigate();
  const [selectedDate] = useState(new Date());
  const [routines, setRoutines] = useState<WorkoutRoutine[]>([
    {
      id: '1',
      name: 'Upper Body Strength',
      exercises: [
        { id: '1', name: 'Bench Press', sets: 3, reps: 10, weight: 60, completed: false },
        { id: '2', name: 'Shoulder Press', sets: 3, reps: 12, weight: 40, completed: false },
        { id: '3', name: 'Pull-ups', sets: 3, reps: 8, weight: 0, completed: false },
      ],
    },
    {
      id: '2',
      name: 'Lower Body Power',
      exercises: [
        { id: '4', name: 'Squats', sets: 4, reps: 8, weight: 80, completed: false },
        { id: '5', name: 'Deadlifts', sets: 3, reps: 8, weight: 100, completed: false },
        { id: '6', name: 'Lunges', sets: 3, reps: 12, weight: 20, completed: false },
      ],
    },
  ]);

  const [activeRoutine, setActiveRoutine] = useState<string>(routines[0].id);
  const selectedRoutine = routines.find(r => r.id === activeRoutine);

  // Función para agregar una nueva rutina de cardio
  const handleNewWorkout = () => {
    const newRoutine: WorkoutRoutine = {
      id: Date.now().toString(),
      name: "Cardio Blast",
      exercises: [
        { id: 'cardio1', name: "Jumping Jacks", sets: 3, reps: 20, weight: 0, completed: false },
        { id: 'cardio2', name: "Burpees", sets: 3, reps: 15, weight: 0, completed: false },
        { id: 'cardio3', name: "High Knees", sets: 3, reps: 30, weight: 0, completed: false },
      ],
    };
    setRoutines(prev => [...prev, newRoutine]);
    setActiveRoutine(newRoutine.id);
  };

  // Función para marcar o desmarcar un ejercicio como completado
  const handleToggleComplete = (routineId: string, exerciseId: string) => {
    setRoutines(prevRoutines =>
      prevRoutines.map(routine => {
        if (routine.id !== routineId) return routine;
        return {
          ...routine,
          exercises: routine.exercises.map(ex =>
            ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
          ),
        };
      })
    );
  };

  // Calcular cuántos ejercicios se han completado en la rutina activa
  const completedCount = selectedRoutine ? selectedRoutine.exercises.filter(e => e.completed).length : 0;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Exercise</h1>
          <p className="text-neutral-500 text-sm mt-1">Track your workouts and progress</p>
        </div>
        <button
          onClick={handleNewWorkout}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary-700 transition-colors"
        >
          <Plus size={20} className="mr-1" />
          New Workout
        </button>
      </div>

      {/* Date and Stats Section */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calendar size={20} className="text-primary-600 mr-2" />
            <span className="font-medium">{format(selectedDate, 'EEEE, MMMM d')}</span>
          </div>
          <button
            onClick={() => navigate('/organization')}
            className="text-primary-600 text-sm font-medium hover:text-primary-700"
          >
            View Calendar
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-neutral-50 rounded-lg p-3">
            <div className="flex items-center text-neutral-600 mb-1">
              <Dumbbell size={16} className="mr-1" />
              <span className="text-xs">Total Weight</span>
            </div>
            <p className="text-lg font-semibold">2,450 kg</p>
          </div>

          <div className="bg-neutral-50 rounded-lg p-3">
            <div className="flex items-center text-neutral-600 mb-1">
              <Timer size={16} className="mr-1" />
              <span className="text-xs">Workout Time</span>
            </div>
            <p className="text-lg font-semibold">45 min</p>
          </div>

          <div className="bg-neutral-50 rounded-lg p-3">
            <div className="flex items-center text-neutral-600 mb-1">
              <BarChart3 size={16} className="mr-1" />
              <span className="text-xs">Exercises</span>
            </div>
            <p className="text-lg font-semibold">
              {completedCount}/{selectedRoutine ? selectedRoutine.exercises.length : 0}
            </p>
          </div>
        </div>
      </div>

      {/* Routines Section */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-neutral-200">
          <h2 className="font-semibold">Today's Routines</h2>
        </div>

        <div className="divide-y divide-neutral-200">
          {routines.map((routine) => (
            <button
              key={routine.id}
              onClick={() => setActiveRoutine(routine.id)}
              className={`w-full text-left p-4 flex items-center justify-between transition-colors ${
                activeRoutine === routine.id ? 'bg-primary-50' : 'hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeRoutine === routine.id ? 'bg-primary-100' : 'bg-neutral-100'
                }`}>
                  <Dumbbell size={18} className={activeRoutine === routine.id ? 'text-primary-600' : 'text-neutral-600'} />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">{routine.name}</h3>
                  <p className="text-sm text-neutral-500">{routine.exercises.length} exercises</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-neutral-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Active Routine Exercises */}
      {selectedRoutine && (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="p-4 border-b border-neutral-200">
            <h2 className="font-semibold">{selectedRoutine.name}</h2>
          </div>

          <div className="divide-y divide-neutral-200">
            {selectedRoutine.exercises.map((exercise) => (
              <div key={exercise.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{exercise.name}</h3>
                  <button className="text-neutral-400 hover:text-error-500 p-1">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-neutral-500">Sets</span>
                    <p className="font-medium">{exercise.sets}</p>
                  </div>
                  <div>
                    <span className="text-neutral-500">Reps</span>
                    <p className="font-medium">{exercise.reps}</p>
                  </div>
                  <div>
                    <span className="text-neutral-500">Weight</span>
                    <p className="font-medium">{exercise.weight} kg</p>
                  </div>
                </div>

                <div className="mt-3">
                  <button
                    onClick={() => handleToggleComplete(selectedRoutine.id, exercise.id)}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      exercise.completed
                        ? 'bg-success-100 text-success-700'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {exercise.completed ? 'Completed' : 'Mark as Complete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExercisePage;
