/*
  # Initial Schema Setup for Wellness Tracker

  1. New Tables
    - users (extends Supabase auth.users)
      - id (uuid, references auth.users)
      - username (text)
      - full_name (text)
      - avatar_url (text)
      - gender (text)
      - birth_date (date)
      - height (numeric)
      - created_at (timestamp)
      - updated_at (timestamp)

    - weight_logs
      - id (uuid)
      - user_id (uuid, references users)
      - weight (numeric)
      - date (date)
      - notes (text)
      - created_at (timestamp)

    - nutrition_logs
      - id (uuid)
      - user_id (uuid, references users)
      - date (date)
      - meal_type (text)
      - food_name (text)
      - calories (integer)
      - protein (numeric)
      - carbs (numeric)
      - fat (numeric)
      - created_at (timestamp)

    - sleep_logs
      - id (uuid)
      - user_id (uuid, references users)
      - date (date)
      - duration (numeric)
      - quality (integer)
      - start_time (time)
      - end_time (time)
      - created_at (timestamp)

    - exercise_logs
      - id (uuid)
      - user_id (uuid, references users)
      - date (date)
      - exercise_type (text)
      - name (text)
      - duration (integer)
      - calories_burned (integer)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create custom types
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE meal_type AS ENUM ('breakfast', 'lunch', 'dinner', 'snack');
CREATE TYPE exercise_type AS ENUM ('cardio', 'strength', 'flexibility', 'balance');

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  gender gender_type,
  birth_date date,
  height numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create weight_logs table
CREATE TABLE weight_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  weight numeric NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create nutrition_logs table
CREATE TABLE nutrition_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  meal_type meal_type NOT NULL,
  food_name text NOT NULL,
  calories integer NOT NULL,
  protein numeric DEFAULT 0,
  carbs numeric DEFAULT 0,
  fat numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create sleep_logs table
CREATE TABLE sleep_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  duration numeric NOT NULL,
  quality integer CHECK (quality BETWEEN 1 AND 5),
  start_time time NOT NULL,
  end_time time NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create exercise_logs table
CREATE TABLE exercise_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  exercise_type exercise_type NOT NULL,
  name text NOT NULL,
  duration integer NOT NULL,
  calories_burned integer,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE weight_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sleep_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can view own weight logs"
  ON weight_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own weight logs"
  ON weight_logs FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own nutrition logs"
  ON nutrition_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own nutrition logs"
  ON nutrition_logs FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own sleep logs"
  ON sleep_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own sleep logs"
  ON sleep_logs FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own exercise logs"
  ON exercise_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own exercise logs"
  ON exercise_logs FOR ALL
  USING (auth.uid() = user_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO users (id, username, avatar_url, full_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();