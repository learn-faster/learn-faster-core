import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Shield, AlertTriangle } from 'lucide-react';

/**
 * StreakProtection - Gamified streak status with protection warning.
 * 
 * Displays current streak with an abstract flame animation.
 * Shows an urgent warning when the streak is at risk.
 */
const StreakProtection = ({ data, onStudyNow }) => {
    if (!data) return null;

    const { streak, studied_today, at_risk, message } = data;

    return (
        <AnimatePresence mode="wait">
            {at_risk ? (
                <motion.div
                    key="at-risk"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-red-500/20 border border-amber-500/30 p-5"
                >
                    {/* Animated Background Pulse */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    <div className="relative z-10 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center"
                            >
                                <AlertTriangle className="w-6 h-6 text-amber-400" />
                            </motion.div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-black text-amber-400">{streak} Day Streak</span>
                                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold uppercase tracking-wider">
                                        At Risk
                                    </span>
                                </div>
                                <p className="text-xs text-amber-200/70 mt-0.5">{message}</p>
                            </div>
                        </div>

                        <motion.button
                            onClick={onStudyNow}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-500/25 whitespace-nowrap"
                        >
                            Study Now
                        </motion.button>
                    </div>
                </motion.div>
            ) : streak > 0 ? (
                <motion.div
                    key="active"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/5 border border-orange-500/20 p-5"
                >
                    <div className="flex items-center gap-4">
                        {/* Animated Flame */}
                        <div className="relative w-12 h-12">
                            <motion.div
                                className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/30 to-amber-500/20"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        y: [0, -2, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                >
                                    <Flame className="w-6 h-6 text-orange-400" />
                                </motion.div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-black text-white">{streak}</span>
                                <span className="text-sm font-bold text-orange-400">Day Streak</span>
                                {studied_today && (
                                    <span className="ml-2 flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider">
                                        <Shield className="w-3 h-3" /> Protected
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-dark-400 mt-0.5">Keep going! Consistency is the key to mastery.</p>
                        </div>

                        {/* Streak Visualization */}
                        <div className="hidden md:flex items-center gap-1">
                            {Array.from({ length: Math.min(streak, 7) }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-400 to-amber-500"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    style={{
                                        boxShadow: '0 0 8px rgba(251, 146, 60, 0.5)'
                                    }}
                                />
                            ))}
                            {streak > 7 && (
                                <span className="text-xs font-bold text-orange-400 ml-1">+{streak - 7}</span>
                            )}
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-2xl bg-white/5 border border-white/5 p-5"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-dark-800 flex items-center justify-center">
                            <Flame className="w-6 h-6 text-dark-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">Start Your Streak</p>
                            <p className="text-xs text-dark-500">Complete a study session to begin building your streak.</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StreakProtection;
