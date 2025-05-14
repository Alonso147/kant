import { NutritionData, ExerciseData, SleepData, Task, Goal, WeightRecord, MenstrualCycle, User } from '../types';
import { addDays, subDays, format, startOfWeek, addWeeks } from 'date-fns';

// Helper function to generate dates
const today = new Date();
const formatDate = (date: Date): string => format(date, 'yyyy-MM-dd');

// Mock user data
export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
  gender: 'female',
  age: 28,
  weight: 65,
  height: 168,
  goals: ['Lose weight', 'Build muscle', 'Improve sleep'],
};

// Generate 7 days of mock nutrition data
export const mockNutritionData: NutritionData[] = Array.from({ length: 7 }, (_, i) => {
  const date = subDays(today, i);
  
  return {
    id: `nutrition-${i}`,
    date: formatDate(date),
    calories: Math.floor(1800 + Math.random() * 600),
    protein: Math.floor(60 + Math.random() * 40),
    carbs: Math.floor(150 + Math.random() * 100),
    fat: Math.floor(50 + Math.random() * 30),
    meals: [
      {
        id: `meal-${i}-1`,
        name: 'Breakfast',
        type: 'breakfast',
        calories: Math.floor(300 + Math.random() * 200),
        protein: Math.floor(15 + Math.random() * 10),
        carbs: Math.floor(30 + Math.random() * 20),
        fat: Math.floor(10 + Math.random() * 10),
        time: '08:00',
      },
      {
        id: `meal-${i}-2`,
        name: 'Lunch',
        type: 'lunch',
        calories: Math.floor(500 + Math.random() * 200),
        protein: Math.floor(20 + Math.random() * 15),
        carbs: Math.floor(60 + Math.random() * 30),
        fat: Math.floor(15 + Math.random() * 10),
        time: '13:00',
      },
      {
        id: `meal-${i}-3`,
        name: 'Dinner',
        type: 'dinner',
        calories: Math.floor(600 + Math.random() * 300),
        protein: Math.floor(25 + Math.random() * 15),
        carbs: Math.floor(50 + Math.random() * 30),
        fat: Math.floor(20 + Math.random() * 10),
        time: '19:00',
      },
    ],
  };
});

// Generate 7 days of mock exercise data
export const mockExerciseData: ExerciseData[] = Array.from({ length: 7 }, (_, i) => {
  const date = subDays(today, i);
  const duration = Math.floor(30 + Math.random() * 60);
  
  return {
    id: `exercise-${i}`,
    date: formatDate(date),
    duration,
    caloriesBurned: Math.floor(duration * (7 + Math.random() * 5)),
    exercises: [
      {
        id: `ex-${i}-1`,
        name: 'Running',
        type: 'cardio',
        duration: Math.floor(15 + Math.random() * 15),
        completed: Math.random() > 0.2,
      },
      {
        id: `ex-${i}-2`,
        name: 'Push-ups',
        type: 'strength',
        duration: Math.floor(5 + Math.random() * 10),
        sets: 3,
        reps: 10,
        completed: Math.random() > 0.2,
      },
      {
        id: `ex-${i}-3`,
        name: 'Yoga',
        type: 'flexibility',
        duration: Math.floor(10 + Math.random() * 20),
        completed: Math.random() > 0.3,
      },
    ],
  };
});

// Generate 14 days of mock sleep data
export const mockSleepData: SleepData[] = Array.from({ length: 14 }, (_, i) => {
  const date = subDays(today, i);
  const duration = 5 + Math.random() * 4;
  
  return {
    id: `sleep-${i}`,
    date: formatDate(date),
    duration,
    quality: Math.ceil(Math.random() * 5) as 1 | 2 | 3 | 4 | 5,
    startTime: '23:00',
    endTime: `0${Math.floor(7 + Math.random())}:00`,
  };
});

// Generate mock tasks
export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Morning run',
    description: '5km run at moderate pace',
    dueDate: formatDate(addDays(today, 1)),
    priority: 'high',
    status: 'todo',
    category: 'Exercise',
  },
  {
    id: 'task-2',
    title: 'Meal prep',
    description: 'Prepare lunches for the week',
    dueDate: formatDate(today),
    priority: 'medium',
    status: 'inProgress',
    category: 'Nutrition',
  },
  {
    id: 'task-3',
    title: 'Meditation',
    description: '15 minutes guided meditation',
    dueDate: formatDate(today),
    priority: 'low',
    status: 'completed',
    category: 'Mental Health',
  },
  {
    id: 'task-4',
    title: 'Yoga class',
    description: 'Attend yoga class at gym',
    dueDate: formatDate(addDays(today, 2)),
    priority: 'medium',
    status: 'todo',
    category: 'Exercise',
  },
  {
    id: 'task-5',
    title: 'Drink 2L water',
    description: 'Track water intake throughout day',
    dueDate: formatDate(today),
    priority: 'high',
    status: 'inProgress',
    category: 'Nutrition',
  },
];

// Generate mock goals
export const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Lose 5kg',
    description: 'Reduce weight through diet and exercise',
    category: 'fitness',
    startDate: formatDate(subDays(today, 30)),
    endDate: formatDate(addDays(today, 60)),
    targetValue: 5,
    currentValue: 2.5,
    completed: false,
    milestones: [
      { id: 'ms-1-1', title: '1kg', targetValue: 1, completed: true },
      { id: 'ms-1-2', title: '2.5kg', targetValue: 2.5, completed: true },
      { id: 'ms-1-3', title: '5kg', targetValue: 5, completed: false },
    ],
  },
  {
    id: 'goal-2',
    title: 'Run a 10k',
    description: 'Train for and complete a 10k run',
    category: 'fitness',
    startDate: formatDate(subDays(today, 45)),
    endDate: formatDate(addDays(today, 30)),
    targetValue: 10,
    currentValue: 7,
    completed: false,
    milestones: [
      { id: 'ms-2-1', title: '5k', targetValue: 5, completed: true },
      { id: 'ms-2-2', title: '7k', targetValue: 7, completed: true },
      { id: 'ms-2-3', title: '10k', targetValue: 10, completed: false },
    ],
  },
  {
    id: 'goal-3',
    title: 'Meditate daily',
    description: 'Build a consistent meditation habit',
    category: 'mental',
    startDate: formatDate(subDays(today, 10)),
    endDate: formatDate(addDays(today, 20)),
    targetValue: 30,
    currentValue: 8,
    completed: false,
  },
];

// Generate mock weight records
export const mockWeightData: WeightRecord[] = Array.from({ length: 30 }, (_, i) => {
  const date = subDays(today, 29 - i);
  // Generate weight with small random variations but a general downward trend
  const baseWeight = 68 - (i * 0.1);
  const variation = Math.random() * 0.6 - 0.3; // Random variation between -0.3 and 0.3
  
  return {
    date: formatDate(date),
    weight: parseFloat((baseWeight + variation).toFixed(1)),
  };
});

// Generate mock menstrual cycle data (if applicable)
export const mockMenstrualData: MenstrualCycle[] = [
  {
    id: 'cycle-1',
    startDate: formatDate(subDays(today, 18)),
    endDate: formatDate(subDays(today, 14)),
    symptoms: [
      { id: 'sym-1-1', name: 'Cramps', severity: 3, date: formatDate(subDays(today, 18)) },
      { id: 'sym-1-2', name: 'Headache', severity: 2, date: formatDate(subDays(today, 17)) },
    ],
    notes: 'Regular cycle, some cramping on day 1',
  },
  {
    id: 'cycle-2',
    startDate: formatDate(subDays(today, 48)),
    endDate: formatDate(subDays(today, 44)),
    symptoms: [
      { id: 'sym-2-1', name: 'Cramps', severity: 4, date: formatDate(subDays(today, 48)) },
      { id: 'sym-2-2', name: 'Bloating', severity: 3, date: formatDate(subDays(today, 47)) },
    ],
    notes: 'Heavier flow than usual',
  },
];

// Generate calendar events (combine tasks, exercise, etc.)
export const mockCalendarEvents = [
  ...mockTasks.map(task => ({
    id: task.id,
    title: task.title,
    date: task.dueDate,
    type: 'task',
    category: task.category,
    priority: task.priority,
  })),
  ...mockExerciseData.map(exercise => ({
    id: exercise.id,
    title: 'Workout',
    date: exercise.date,
    type: 'exercise',
    duration: exercise.duration,
  })),
  ...mockMenstrualData.map(cycle => ({
    id: cycle.id,
    title: 'Period start',
    date: cycle.startDate,
    type: 'menstrual',
    endDate: cycle.endDate,
  })),
];