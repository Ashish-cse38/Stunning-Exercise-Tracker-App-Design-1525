import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useExercise } from '../context/ExerciseContext';
import { useDevice } from '../hooks/useDevice';

const { FiClock, FiCalendar, FiTarget, FiTrendingUp, FiFilter } = FiIcons;

const History = () => {
  const { workoutHistory, getWorkoutStats } = useExercise();
  const { isMobile, isDesktop } = useDevice();
  const [filter, setFilter] = useState('all');
  const stats = getWorkoutStats();

  const categories = ['all', 'Strength', 'Cardio', 'Core', 'HIIT', 'Flexibility'];

  const filteredHistory = workoutHistory.filter(workout => 
    filter === 'all' || workout.category === filter
  );

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Strength': 'from-red-500 to-pink-500',
      'Cardio': 'from-blue-500 to-cyan-500',
      'Core': 'from-green-500 to-emerald-500',
      'HIIT': 'from-purple-500 to-indigo-500',
      'Flexibility': 'from-yellow-500 to-orange-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Strength': '💪',
      'Cardio': '🏃',
      'Core': '🏋️',
      'HIIT': '🔥',
      'Flexibility': '🧘'
    };
    return icons[category] || '💪';
  };

  if (isDesktop) {
    return (
      <div className="min-h-screen pl-80 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Workout History
              </h1>
              <p className="text-gray-300 text-xl">Track your incredible fitness journey</p>
            </motion.div>

            {/* Stats Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-4 gap-6 mb-8"
            >
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl p-6 border border-blue-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Total Sessions</p>
                    <p className="text-3xl font-bold text-white">{stats.totalWorkouts}</p>
                  </div>
                  <SafeIcon icon={FiTarget} className="text-blue-400 text-3xl" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl p-6 border border-green-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Total Time</p>
                    <p className="text-3xl font-bold text-white">{Math.round(stats.totalDuration / 60)}m</p>
                  </div>
                  <SafeIcon icon={FiClock} className="text-green-400 text-3xl" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl p-6 border border-purple-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Avg Duration</p>
                    <p className="text-3xl font-bold text-white">{Math.round(stats.avgDuration / 60)}m</p>
                  </div>
                  <SafeIcon icon={FiTrendingUp} className="text-purple-400 text-3xl" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl p-6 border border-orange-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Today</p>
                    <p className="text-3xl font-bold text-white">{stats.todayWorkouts}</p>
                  </div>
                  <SafeIcon icon={FiIcons.FiZap} className="text-orange-400 text-3xl" />
                </div>
              </div>
            </motion.div>

            {/* Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-4 mb-4">
                <SafeIcon icon={FiFilter} className="text-gray-400 text-xl" />
                <span className="text-gray-300 font-medium text-lg">Filter by category</span>
              </div>
              <div className="flex space-x-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(category)}
                    className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                      filter === category
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {category === 'all' ? 'All' : category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* History Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredHistory.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <div className="text-8xl mb-6">🏃‍♂️</div>
                  <p className="text-gray-400 text-2xl">No workouts yet</p>
                  <p className="text-gray-500 text-lg">Start your fitness journey today!</p>
                </div>
              ) : (
                filteredHistory.map((workout, index) => (
                  <motion.div
                    key={workout.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`bg-gradient-to-r ${getCategoryColor(workout.category)}/20 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{getCategoryIcon(workout.category)}</div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{workout.exerciseName}</h3>
                          <p className="text-gray-300 text-sm">{workout.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-xl">{formatDuration(workout.duration)}</p>
                        <p className="text-gray-400 text-sm">
                          {format(new Date(workout.endTime), 'MMM dd, HH:mm')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <SafeIcon icon={FiCalendar} className="text-sm" />
                          <span className="text-sm">{format(new Date(workout.date), 'MMM dd')}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <SafeIcon icon={FiClock} className="text-sm" />
                          <span className="text-sm">{format(new Date(workout.startTime), 'HH:mm')}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(workout.category)} text-white text-sm font-medium`}>
                        Completed
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 pt-8 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Workout History
          </h1>
          <p className="text-gray-300">Track your fitness journey</p>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-4 border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Sessions</p>
                <p className="text-2xl font-bold text-white">{stats.totalWorkouts}</p>
              </div>
              <SafeIcon icon={FiTarget} className="text-blue-400 text-2xl" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-4 border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Time</p>
                <p className="text-2xl font-bold text-white">{Math.round(stats.totalDuration / 60)}m</p>
              </div>
              <SafeIcon icon={FiClock} className="text-green-400 text-2xl" />
            </div>
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center space-x-2 mb-3">
            <SafeIcon icon={FiFilter} className="text-gray-400 text-lg" />
            <span className="text-gray-300 font-medium">Filter by category</span>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* History List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-4"
        >
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏃‍♂️</div>
              <p className="text-gray-400 text-lg">No workouts yet</p>
              <p className="text-gray-500">Start your fitness journey today!</p>
            </div>
          ) : (
            filteredHistory.map((workout, index) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                className={`bg-gradient-to-r ${getCategoryColor(workout.category)}/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getCategoryIcon(workout.category)}</div>
                    <div>
                      <h3 className="text-white font-semibold">{workout.exerciseName}</h3>
                      <p className="text-gray-300 text-sm">{workout.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{formatDuration(workout.duration)}</p>
                    <p className="text-gray-400 text-sm">
                      {format(new Date(workout.endTime), 'MMM dd, HH:mm')}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-gray-400">
                      <SafeIcon icon={FiCalendar} className="text-xs" />
                      <span>{format(new Date(workout.date), 'MMM dd')}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <SafeIcon icon={FiClock} className="text-xs" />
                      <span>{format(new Date(workout.startTime), 'HH:mm')}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(workout.category)} text-white text-xs font-medium`}>
                    Completed
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default History;