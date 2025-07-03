import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useDevice } from '../hooks/useDevice';

const { FiHome, FiActivity, FiBarChart3, FiClock, FiMenu } = FiIcons;

const Navigation = () => {
  const location = useLocation();
  const { isMobile, isDesktop } = useDevice();
  
  const navItems = [
    { path: '/', icon: FiHome, label: 'Home', color: 'from-blue-500 to-cyan-500' },
    { path: '/history', icon: FiClock, label: 'History', color: 'from-green-500 to-emerald-500' },
    { path: '/analytics', icon: FiBarChart3, label: 'Analytics', color: 'from-purple-500 to-indigo-500' },
  ];

  if (isDesktop) {
    return (
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-lg border-r border-purple-500/30 z-50"
      >
        <div className="p-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
              FitTracker Pro
            </h1>
            <p className="text-gray-400">Your Ultimate Fitness Companion</p>
          </motion.div>

          <div className="space-y-4">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                >
                  <Link to={item.path} className="block">
                    <motion.div
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex items-center p-4 rounded-2xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r ' + item.color + ' shadow-lg shadow-purple-500/30' 
                          : 'hover:bg-white/10'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeDesktopTab"
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl"
                          transition={{ type: "spring", duration: 0.6 }}
                        />
                      )}
                      <SafeIcon 
                        icon={item.icon} 
                        className={`text-2xl mr-4 transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-gray-400'
                        }`} 
                      />
                      <span className={`text-lg font-medium transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-gray-400'
                      }`}>
                        {item.label}
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-lg border-t border-purple-500/30"
    >
      <div className="flex justify-around items-center py-4 px-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r ' + item.color + ' shadow-lg shadow-purple-500/30' 
                    : 'hover:bg-white/10'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMobileTab"
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <SafeIcon 
                  icon={item.icon} 
                  className={`text-2xl mb-1 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400'
                  }`} 
                />
                <span className={`text-xs font-medium transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`}>
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;