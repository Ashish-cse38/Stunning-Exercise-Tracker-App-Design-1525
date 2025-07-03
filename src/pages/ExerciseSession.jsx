import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useExercise } from '../context/ExerciseContext';

const { FiPlay, FiPause, FiSquare, FiArrowLeft, FiCheckCircle } = FiIcons;

const ExerciseSession = () => {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const { getExerciseById, startWorkout, completeWorkout, cancelWorkout } = useExercise();
  
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState(null);

  const exercise = getExerciseById(exerciseId);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!currentWorkout) {
      const workout = startWorkout(exercise);
      setCurrentWorkout(workout);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleComplete = () => {
    setIsRunning(false);
    completeWorkout(seconds);
    setIsCompleted(true);
    
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleCancel = () => {
    setIsRunning(false);
    cancelWorkout();
    navigate('/');
  };

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Exercise not found</p>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <SafeIcon icon={FiCheckCircle} className="text-white text-4xl" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">Workout Complete!</h2>
          <p className="text-gray-300 text-lg mb-2">Great job on your {exercise.name} session</p>
          <p className="text-2xl font-bold text-green-400 mb-6">Duration: {formatTime(seconds)}</p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-400"
          >
            Redirecting to dashboard...
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCancel}
            className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="text-white text-xl" />
          </motion.button>
          <h1 className="text-2xl font-bold text-white">Exercise Session</h1>
          <div className="w-12" />
        </div>

        {/* Exercise Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`bg-gradient-to-br ${exercise.color} rounded-3xl p-8 mb-8 text-center shadow-2xl`}
        >
          <div className="text-6xl mb-4">{exercise.icon}</div>
          <h2 className="text-3xl font-bold text-white mb-2">{exercise.name}</h2>
          <p className="text-white/80 text-lg mb-4">{exercise.description}</p>
          <div className="bg-white/20 rounded-full px-4 py-2 inline-block">
            <span className="text-white font-medium">{exercise.category}</span>
          </div>
        </motion.div>

        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-3xl p-8 mb-8 text-center border border-white/10"
        >
          <motion.div
            animate={{ scale: isRunning ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
            className="text-6xl font-bold text-white mb-4"
          >
            {formatTime(seconds)}
          </motion.div>
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500' : 'bg-gray-500'} ${isRunning ? 'animate-pulse' : ''}`} />
            <span className="text-gray-300 font-medium">
              {isRunning ? 'Active' : 'Paused'}
            </span>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          {!isRunning ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <SafeIcon icon={FiPlay} className="text-xl" />
              <span>{seconds === 0 ? 'Start Workout' : 'Resume'}</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePause}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <SafeIcon icon={FiPause} className="text-xl" />
              <span>Pause</span>
            </motion.button>
          )}

          {seconds > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <SafeIcon icon={FiCheckCircle} className="text-xl" />
              <span>Complete Workout</span>
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCancel}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <SafeIcon icon={FiSquare} className="text-xl" />
            <span>Cancel</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ExerciseSession;