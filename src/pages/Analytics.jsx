import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useExercise } from '../context/ExerciseContext';
import { useDevice } from '../hooks/useDevice';

const { FiTrendingUp, FiBarChart3, FiPieChart, FiCalendar, FiActivity } = FiIcons;

const Analytics = () => {
  const { workoutHistory, getWorkoutStats, getDailyStats } = useExercise();
  const { isMobile, isDesktop } = useDevice();
  const [selectedPeriod, setSelectedPeriod] = useState(7);
  const stats = getWorkoutStats();
  const dailyStats = getDailyStats(selectedPeriod);

  const categoryColors = {
    'Strength': '#ef4444',
    'Cardio': '#3b82f6',
    'Core': '#10b981',
    'HIIT': '#8b5cf6',
    'Flexibility': '#f59e0b'
  };

  const pieData = Object.entries(stats.categoryStats).map(([category, count]) => ({
    name: category,
    value: count,
    color: categoryColors[category] || '#6b7280'
  }));

  const weeklyData = dailyStats.map(day => ({
    date: format(new Date(day.date), 'MMM dd'),
    workouts: day.workouts,
    duration: Math.round(day.duration / 60) // Convert to minutes
  }));

  const periods = [
    { label: '7 Days', value: 7 },
    { label: '14 Days', value: 14 },
    { label: '30 Days', value: 30 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/90 backdrop-blur-sm p-4 rounded-xl border border-purple-500/30 shadow-2xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'workouts' ? 'Workouts' : 'Duration'}: {entry.value}
              {entry.dataKey === 'duration' ? ' min' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
                Analytics Dashboard
              </h1>
              <p className="text-gray-300 text-xl">Deep insights into your fitness journey</p>
            </motion.div>

            {/* Period Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiCalendar} className="text-gray-400 text-xl" />
                <span className="text-gray-300 font-medium text-lg">Time Period</span>
              </div>
              <div className="flex space-x-3">
                {periods.map((period) => (
                  <motion.button
                    key={period.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPeriod(period.value)}
                    className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                      selectedPeriod === period.value
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {period.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-4 gap-6 mb-8"
            >
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl p-6 border border-blue-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Total Workouts</p>
                    <p className="text-3xl font-bold text-white">{stats.totalWorkouts}</p>
                  </div>
                  <SafeIcon icon={FiActivity} className="text-blue-400 text-3xl" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl p-6 border border-green-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Avg Duration</p>
                    <p className="text-3xl font-bold text-white">{Math.round(stats.avgDuration / 60)}m</p>
                  </div>
                  <SafeIcon icon={FiTrendingUp} className="text-green-400 text-3xl" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl p-6 border border-purple-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">This Period</p>
                    <p className="text-3xl font-bold text-white">{dailyStats.reduce((sum, day) => sum + day.workouts, 0)}</p>
                  </div>
                  <SafeIcon icon={FiBarChart3} className="text-purple-400 text-3xl" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl p-6 border border-orange-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Total Duration</p>
                    <p className="text-3xl font-bold text-white">{Math.round(stats.totalDuration / 60)}m</p>
                  </div>
                  <SafeIcon icon={FiIcons.FiClock} className="text-orange-400 text-3xl" />
                </div>
              </div>
            </motion.div>

            {/* Charts Grid */}
            <div className="grid grid-cols-2 gap-8">
              {/* Daily Activity Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <SafeIcon icon={FiTrendingUp} className="text-purple-400 text-2xl" />
                  <h3 className="text-white font-bold text-xl">Daily Activity</h3>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyData}>
                      <defs>
                        <linearGradient id="colorWorkouts" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#9ca3af"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#9ca3af"
                        fontSize={12}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="workouts" 
                        stroke="#8b5cf6" 
                        fillOpacity={1}
                        fill="url(#colorWorkouts)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Duration Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <SafeIcon icon={FiBarChart3} className="text-cyan-400 text-2xl" />
                  <h3 className="text-white font-bold text-xl">Duration Trends</h3>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#9ca3af"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#9ca3af"
                        fontSize={12}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="duration" 
                        fill="url(#colorGradient)"
                        radius={[8, 8, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Category Distribution */}
              {pieData.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <SafeIcon icon={FiPieChart} className="text-yellow-400 text-2xl" />
                    <h3 className="text-white font-bold text-xl">Exercise Categories</h3>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}

              {/* Category Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-4"
              >
                <h3 className="text-white font-bold text-xl mb-6">Category Breakdown</h3>
                {Object.entries(stats.categoryStats).map(([category, count]) => (
                  <div key={category} className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: categoryColors[category] }}
                        />
                        <span className="text-white font-medium text-lg">{category}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-2xl">{count}</p>
                        <p className="text-gray-400 text-sm">sessions</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
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
            Analytics
          </h1>
          <p className="text-gray-300">Insights into your fitness journey</p>
        </motion.div>

        {/* Period Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center space-x-2 mb-3">
            <SafeIcon icon={FiCalendar} className="text-gray-400 text-lg" />
            <span className="text-gray-300 font-medium">Time Period</span>
          </div>
          <div className="flex space-x-2">
            {periods.map((period) => (
              <motion.button
                key={period.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedPeriod === period.value
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {period.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-4 border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Avg Duration</p>
                <p className="text-2xl font-bold text-white">{Math.round(stats.avgDuration / 60)}m</p>
              </div>
              <SafeIcon icon={FiTrendingUp} className="text-blue-400 text-2xl" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-4 border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">This Period</p>
                <p className="text-2xl font-bold text-white">{dailyStats.reduce((sum, day) => sum + day.workouts, 0)}</p>
              </div>
              <SafeIcon icon={FiBarChart3} className="text-green-400 text-2xl" />
            </div>
          </div>
        </motion.div>

        {/* Daily Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <SafeIcon icon={FiTrendingUp} className="text-purple-400 text-lg" />
            <h3 className="text-white font-semibold">Daily Activity</h3>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="workouts" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Duration Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <SafeIcon icon={FiBarChart3} className="text-cyan-400 text-lg" />
            <h3 className="text-white font-semibold">Duration Trends</h3>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="duration" 
                  fill="url(#colorGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Distribution */}
        {pieData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10"
          >
            <div className="flex items-center space-x-2 mb-4">
              <SafeIcon icon={FiPieChart} className="text-yellow-400 text-lg" />
              <h3 className="text-white font-semibold">Exercise Categories</h3>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-3"
        >
          <h3 className="text-white font-semibold mb-4">Category Breakdown</h3>
          {Object.entries(stats.categoryStats).map(([category, count]) => (
            <div key={category} className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: categoryColors[category] }}
                  />
                  <span className="text-white font-medium">{category}</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{count}</p>
                  <p className="text-gray-400 text-sm">sessions</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Analytics;