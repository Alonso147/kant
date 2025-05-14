import React, { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { Plus, Calendar, CheckCircle2, Circle, Clock } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configurar el localizador para BigCalendar
const locales = { es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Definición de la interfaz Task
interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'inProgress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  tags: string[];
}

// Componente para cada tarea en el Kanban con arrastre fluido y transiciones suaves
const SortableTaskItem: React.FC<{ task: Task; onToggle: (id: string) => void }> = ({ task, onToggle }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
    data: { sortable: { containerId: task.status } },
  });

  // Agrega una transición para que el movimiento sea suave
  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition: transition || 'transform 200ms ease-in-out',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-neutral-50 rounded-lg p-4 border border-neutral-200 transition-all hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          {task.status === 'completed' ? (
            <CheckCircle2 className="text-success-500" size={16} />
          ) : task.status === 'inProgress' ? (
            <Clock className="text-warning-500" size={16} />
          ) : (
            <Circle className="text-neutral-400" size={16} />
          )}
          <h3 className="font-medium ml-2">{task.title}</h3>
        </div>
      </div>
      {task.description && (
        <p className="text-sm text-neutral-600 mb-3">{task.description}</p>
      )}
      <button
        onClick={() => onToggle(task.id)}
        className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
          task.status === 'completed'
            ? 'bg-success-100 text-success-700'
            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
        }`}
      >
        {task.status === 'completed' ? 'Completado' : 'Marcar como Completo'}
      </button>
    </div>
  );
};

const OrganizationPage: React.FC = () => {
  // Vista de calendario o kanban
  const [view, setView] = useState<'calendar' | 'kanban'>('calendar');

  // Tareas iniciales
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Completar rutina de ejercicios',
      description: '30 minutos de cardio + ejercicios de fuerza',
      status: 'todo',
      priority: 'high',
      dueDate: new Date(),
      tags: ['ejercicio', 'salud'],
    },
    {
      id: '2',
      title: 'Preparar comidas de la semana',
      status: 'inProgress',
      priority: 'medium',
      tags: ['nutrición'],
    },
    {
      id: '3',
      title: 'Meditar 15 minutos',
      status: 'completed',
      priority: 'low',
      tags: ['bienestar'],
    },
  ]);

  // Estados para el formulario de Nueva Tarea
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  // Función para agregar una nueva tarea
  const addNewTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      status: 'todo',
      priority: 'medium',
      dueDate: newTaskDueDate ? new Date(newTaskDueDate) : new Date(),
      tags: [],
    };
    setTasks(prev => [...prev, newTask]);
    // Resetear campos del formulario
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskDueDate("");
    setShowNewTaskForm(false);
  };

  // Configurar sensores de DnD (soporte para mouse y teclado)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    // Obtener el containerId de cada elemento (valor de 'status')
    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current.sortable.containerId;

    if (activeContainer && overContainer && activeContainer !== overContainer) {
      // Actualizar el status de la tarea arrastrada a la nueva columna
      setTasks(prev =>
        prev.map(task =>
          task.id === active.id ? { ...task, status: overContainer } : task
        )
      );
    } else if (active.id !== over.id && activeContainer === overContainer) {
      // Reordenar tareas dentro del mismo contenedor
      const containerTasks = tasks.filter(task => task.status === activeContainer);
      const oldIndex = containerTasks.findIndex(task => task.id === active.id);
      const newIndex = containerTasks.findIndex(task => task.id === over.id);
      const newOrder = arrayMove(containerTasks, oldIndex, newIndex);
      // Actualizar la lista completa de tareas con el nuevo orden en ese contenedor
      const updatedTasks = tasks.map(task => {
        if (task.status !== activeContainer) return task;
        // Busca la tarea en el nuevo orden
        const found = newOrder.find(t => t.id === task.id);
        return found ? found : task;
      });
      setTasks(updatedTasks);
    }
  };

  // Función para marcar/desmarcar una tarea
  const handleToggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, status: task.status === 'completed' ? 'todo' : 'completed' }
          : task
      )
    );
  };

  // Para la vista de calendario, mapear tareas con fecha a eventos
  const events = tasks
    .filter(task => task.dueDate)
    .map(task => ({
      id: task.id,
      title: task.title,
      start: task.dueDate || new Date(),
      end: task.dueDate || new Date(),
      allDay: true,
    }));

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Organización</h1>
          <p className="text-neutral-500 text-sm mt-1">Gestiona tus tareas y eventos</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-neutral-100 rounded-lg p-1">
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'calendar'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Calendar size={16} className="inline-block mr-1" />
              Calendario
            </button>
            <button
              onClick={() => setView('kanban')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'kanban'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Calendar size={16} className="inline-block mr-1" />
              Kanban
            </button>
          </div>
          <button
            onClick={() => setShowNewTaskForm(!showNewTaskForm)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary-700 transition-colors"
          >
            <Plus size={20} className="mr-1" />
            Nueva Tarea
          </button>
        </div>
      </div>

      {/* New Task Form */}
      {showNewTaskForm && (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 mb-6">
          <h2 className="font-semibold mb-4">Agregar Nueva Tarea</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Título de la tarea"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="border rounded p-2"
            />
            <textarea
              placeholder="Descripción de la tarea"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="border rounded p-2"
            />
            <input
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
              className="border rounded p-2"
            />
            <button
              onClick={addNewTask}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Agregar Tarea
            </button>
          </div>
        </div>
      )}

      {view === 'calendar' ? (
        // Calendar View: Overflow para evitar desbordes en los números
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 overflow-hidden">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
          />
        </div>
      ) : (
        // Kanban View: DnD Context permite mover tareas entre secciones
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-3 gap-6">
            {(['todo', 'inProgress', 'completed'] as const).map((status) => (
              <div
                key={status}
                className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden transition-all hover:bg-neutral-50"
                data-droppable-id={status}
              >
                <div className="p-4 border-b border-neutral-200">
                  <h2 className="font-semibold capitalize">
                    {status === 'todo' && 'Por hacer'}
                    {status === 'inProgress' && 'En progreso'}
                    {status === 'completed' && 'Completado'}
                  </h2>
                </div>
                <div className="p-4" data-droppable-id={status}>
                  <SortableContext
                    items={tasks.filter((t) => t.status === status).map(t => t.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-3">
                      {tasks.filter((task) => task.status === status).map((task) => (
                        <SortableTaskItem key={task.id} task={task} onToggle={handleToggleTask} />
                      ))}
                    </div>
                  </SortableContext>
                </div>
              </div>
            ))}
          </div>
        </DndContext>
      )}
    </div>
  );
};

export default OrganizationPage;
