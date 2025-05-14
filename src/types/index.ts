export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  gender?: 'male' | 'female' | 'other';
  age?: number;
  weight?: number; // in kg
  height?: number; // in cm
  goals?: string[];
}

export interface NutritionData {
  id: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: Meal[];
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

export interface ExerciseData {
  id: string;
  date: string;
  exercises: Exercise[];
  duration: number; // in minutes
  caloriesBurned: number;
}

export interface Exercise {
  id: string;
  name: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'balance' | 'other';
  duration: number; // in minutes
  sets?: number;
  reps?: number;
  weight?: number; // in kg
  completed: boolean;
}

export interface SleepData {
  id: string;
  date: string;
  duration: number; // in hours
  quality: 1 | 2 | 3 | 4 | 5; // 1-5 rating
  startTime: string;
  endTime: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'inProgress' | 'completed';
  category?: string;
  tags?: string[];
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  category: 'health' | 'fitness' | 'nutrition' | 'mental' | 'other';
  startDate: string;
  endDate?: string;
  targetValue?: number;
  currentValue?: number;
  completed: boolean;
  milestones?: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  targetValue: number;
  completed: boolean;
}

export interface MenstrualCycle {
  id: string;
  startDate: string;
  endDate?: string;
  symptoms?: MenstrualSymptom[];
  notes?: string;
}

export interface MenstrualSymptom {
  id: string;
  name: string;
  severity: 1 | 2 | 3 | 4 | 5; // 1-5 rating
  date: string;
}

export interface WeightRecord {
  date: string;
  weight: number; // in kg
}

export type MetricTimeframe = 'daily' | 'weekly' | 'monthly' | 'yearly';