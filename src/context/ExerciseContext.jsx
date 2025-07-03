import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

const ExerciseContext = createContext();

export const useExercise = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExercise must be used within an ExerciseProvider');
  }
  return context;
};

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([
    {
      id: 1,
      name: 'Push-ups',
      category: 'Strength',
      icon: '💪',
      color: 'from-red-500 to-pink-500',
      description: 'Classic upper body exercise',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      name: 'Squats',
      category: 'Strength',
      icon: '🦵',
      color: 'from-blue-500 to-cyan-500',
      description: 'Lower body powerhouse',
      difficulty: 'Beginner'
    },
    {
      id: 3,
      name: 'Plank',
      category: 'Core',
      icon: '🏋️',
      color: 'from-green-500 to-emerald-500',
      description: 'Core stability exercise',
      difficulty: 'Intermediate'
    },
    {
      id: 4,
      name: 'Jumping Jacks',
      category: 'Cardio',
      icon: '🏃',
      color: 'from-yellow-500 to-orange-500',
      description: 'Full body cardio workout',
      difficulty: 'Beginner'
    },
    {
      id: 5,
      name: 'Burpees',
      category: 'HIIT',
      icon: '🔥',
      color: 'from-purple-500 to-indigo-500',
      description: 'High intensity full body',
      difficulty: 'Advanced'
    },
    {
      id: 6,
      name: 'Mountain Climbers',
      category: 'Cardio',
      icon: '⛰️',
      color: 'from-teal-500 to-blue-500',
      description: 'Dynamic cardio movement',
      difficulty: 'Intermediate'
    },
    {
      id: 7,
      name: 'Deadlifts',
      category: 'Strength',
      icon: '🏋️‍♂️',
      color: 'from-orange-500 to-red-500',
      description: 'Full body strength builder',
      difficulty: 'Advanced'
    },
    {
      id: 8,
      name: 'Lunges',
      category: 'Strength',
      icon: '🚶',
      color: 'from-pink-500 to-rose-500',
      description: 'Unilateral leg strength',
      difficulty: 'Intermediate'
    },
    {
      id: 9,
      name: 'Pull-ups',
      category: 'Strength',
      icon: '🤸',
      color: 'from-indigo-500 to-purple-500',
      description: 'Upper body pulling power',
      difficulty: 'Advanced'
    },
    {
      id: 10,
      name: 'Bicycle Crunches',
      category: 'Core',
      icon: '🚴',
      color: 'from-emerald-500 to-teal-500',
      description: 'Oblique targeting exercise',
      difficulty: 'Intermediate'
    },
    {
      id: 11,
      name: 'Russian Twists',
      category: 'Core',
      icon: '🌪️',
      color: 'from-violet-500 to-purple-500',
      description: 'Rotational core strength',
      difficulty: 'Intermediate'
    },
    {
      id: 12,
      name: 'High Knees',
      category: 'Cardio',
      icon: '🏃‍♀️',
      color: 'from-lime-500 to-green-500',
      description: 'Cardio and leg activation',
      difficulty: 'Beginner'
    },
    {
      id: 13,
      name: 'Box Jumps',
      category: 'HIIT',
      icon: '📦',
      color: 'from-amber-500 to-orange-500',
      description: 'Explosive lower body power',
      difficulty: 'Advanced'
    },
    {
      id: 14,
      name: 'Battle Ropes',
      category: 'HIIT',
      icon: '🪢',
      color: 'from-slate-500 to-gray-600',
      description: 'Full body conditioning',
      difficulty: 'Advanced'
    },
    {
      id: 15,
      name: 'Yoga Flow',
      category: 'Flexibility',
      icon: '🧘',
      color: 'from-rose-400 to-pink-400',
      description: 'Mindful movement practice',
      difficulty: 'Beginner'
    },
    {
      id: 16,
      name: 'Swimming',
      category: 'Cardio',
      icon: '🏊',
      color: 'from-blue-400 to-cyan-400',
      description: 'Full body low impact',
      difficulty: 'Intermediate'
    },
    {
      id: 17,
      name: 'Kettlebell Swings',
      category: 'Strength',
      icon: '🏋️‍♀️',
      color: 'from-red-600 to-orange-600',
      description: 'Hip hinge power movement',
      difficulty: 'Intermediate'
    },
    {
      id: 18,
      name: 'Stretching',
      category: 'Flexibility',
      icon: '🤸‍♀️',
      color: 'from-green-400 to-emerald-400',
      description: 'Improve flexibility and mobility',
      difficulty: 'Beginner'
    }
  ]);

  const [workoutHistory, setWorkoutHistory] = useState(() => {
    const saved = localStorage.getItem('workoutHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentWorkout, setCurrentWorkout] = useState(null);

  useEffect(() => {
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  const startWorkout = (exercise) => {
    const workout = {
      id: Date.now(),
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      category: exercise.category,
      startTime: new Date(),
      duration: 0,
      status: 'active'
    };
    setCurrentWorkout(workout);
    return workout;
  };

  const completeWorkout = (duration) => {
    if (currentWorkout) {
      const completedWorkout = {
        ...currentWorkout,
        duration,
        endTime: new Date(),
        status: 'completed',
        date: format(new Date(), 'yyyy-MM-dd')
      };
      
      setWorkoutHistory(prev => [completedWorkout, ...prev]);
      setCurrentWorkout(null);
      return completedWorkout;
    }
  };

  const cancelWorkout = () => {
    setCurrentWorkout(null);
  };

  const getExerciseById = (id) => {
    return exercises.find(exercise => exercise.id === parseInt(id));
  };

  const getWorkoutStats = () => {
    const totalWorkouts = workoutHistory.length;
    const totalDuration = workoutHistory.reduce((sum, workout) => sum + workout.duration, 0);
    const avgDuration = totalWorkouts > 0 ? totalDuration / totalWorkouts : 0;
    
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayWorkouts = workoutHistory.filter(workout => workout.date === today);
    
    const categoryStats = workoutHistory.reduce((stats, workout) => {
      stats[workout.category] = (stats[workout.category] || 0) + 1;
      return stats;
    }, {});

    return {
      totalWorkouts,
      totalDuration,
      avgDuration,
      todayWorkouts: todayWorkouts.length,
      categoryStats
    };
  };

  const getDailyStats = (days = 7) => {
    const dailyStats = {};
    const today = new Date();
    
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = format(date, 'yyyy-MM-dd');
      
      const dayWorkouts = workoutHistory.filter(workout => workout.date === dateStr);
      dailyStats[dateStr] = {
        date: dateStr,
        workouts: dayWorkouts.length,
        duration: dayWorkouts.reduce((sum, workout) => sum + workout.duration, 0)
      };
    }
    
    return Object.values(dailyStats).reverse();
  };

  const value = {
    exercises,
    workoutHistory,
    currentWorkout,
    startWorkout,
    completeWorkout,
    cancelWorkout,
    getExerciseById,
    getWorkoutStats,
    getDailyStats
  };

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  );
};