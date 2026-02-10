import React, { useEffect, useState } from 'react';
import { Target, Clock, TrendingUp, ChevronRight, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import goalsService from '../services/goals';

/**
 * GoalProgress Component
 * 
 * Displays active goals with progress bars on the Dashboard.
 * Shows hours logged, progress percentage, and on-track status.
 */
const GoalProgress = () => {
    const [goals, setGoals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const data = await goalsService.getGoals({ status: 'active' });
                setGoals(data);
            } catch (err) {
                console.error('Failed to fetch goals:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGoals();
    }, []);

    const getDomainColor = (domain) => {
        const colors = {
            learning: { bg: 'bg-primary-500', text: 'text-primary-300', gradient: 'from-primary-500 to-primary-700' },
            health: { bg: 'bg-primary-400', text: 'text-primary-300', gradient: 'from-primary-400 to-primary-600' },
            career: { bg: 'bg-primary-300', text: 'text-primary-200', gradient: 'from-primary-300 to-primary-500' },
            project: { bg: 'bg-primary-500', text: 'text-primary-400', gradient: 'from-primary-500 to-primary-600' },
        };
        return colors[domain] || colors.learning;
    };

    if (isLoading) {
        return (
            <div className="p-6 rounded-2xl bg-dark-900/60 backdrop-blur-sm border border-white/5">
                <div className="h-24 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    if (goals.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-dark-900/60 backdrop-blur-sm border border-white/5 border-dashed"
            >
                <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center mb-4">
                        <Target className="w-6 h-6 text-primary-500" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Set Your First Goal</h3>
                    <p className="text-dark-400 text-sm mb-4 max-w-sm">
                        Goals help you track progress and stay focused on what matters.
                    </p>
                    <button
                        onClick={() => navigate('/goals')}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 hover:bg-primary-500/20 text-primary-400 rounded-lg font-medium transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Create Goal
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-dark-900/60 backdrop-blur-sm border border-white/5"
        >
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary-400" />
                    Active Goals
                </h3>
                <button
                    onClick={() => navigate('/goals')}
                    className="text-[10px] font-bold uppercase tracking-widest text-dark-500 hover:text-primary-400 transition-colors flex items-center gap-1"
                >
                    Manage
                    <ChevronRight className="w-3 h-3" />
                </button>
            </div>

            <div className="space-y-4">
                {goals.slice(0, 3).map((goal, index) => {
                    const colors = getDomainColor(goal.domain);
                    const progress = Math.min(100, goal.progress_percent || 0);

                    return (
                        <motion.div
                            key={goal.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className={`w-2 h-2 rounded-full ${colors.bg}`} />
                                    <span className="text-white font-medium truncate">{goal.title}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs shrink-0">
                                    <span className="text-dark-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {goal.logged_hours?.toFixed(1)}h / {goal.target_hours}h
                                    </span>
                                    {goal.is_on_track !== false ? (
                                        <span className="text-primary-300 flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" />
                                            On track
                                        </span>
                                    ) : (
                                        <span className="text-primary-200 text-xs">
                                            Behind
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                                    className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
                                />
                            </div>

                            {/* Progress percentage */}
                            <div className="flex justify-end mt-1">
                                <span className={`text-[10px] font-bold ${colors.text}`}>
                                    {progress.toFixed(0)}%
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {goals.length > 3 && (
                <button
                    onClick={() => navigate('/goals')}
                    className="mt-4 w-full py-2 text-sm text-dark-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                >
                    +{goals.length - 3} more goals
                </button>
            )}
        </motion.div>
    );
};

export default GoalProgress;
