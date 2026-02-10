import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, RotateCcw, ChevronDown, ChevronUp, Coffee, Target, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useTimerStore from '../stores/useTimerStore';
import { EFFECTIVENESS_RATINGS } from '../constants/metacognition';
import goalsService from '../services/goals';
import { TIMER_PRESETS } from '../constants/timerPresets';

/**
 * SmartTimer - Dashboard Version (Control Center)
 * 
 * Connected to the global useTimerStore.
 */
const SmartTimer = () => {
    const {
        timeLeft, isActive, mode, studyType, activeSessionId, goal, selectedGoalId,
        sessionCount, isExpanded,
        togglePlayPause, stopSession, endSessionSync, reset, setStudyType,
        loadSettings, focusDuration, breakDuration, presetKey,
        setFocusDuration, setBreakDuration, setPresetKey,
        startRequest, consumeStartRequest
    } = useTimerStore();

    const [localExpanded, setLocalExpanded] = useState(false);
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [showReflectModal, setShowReflectModal] = useState(false);
    const [localGoal, setLocalGoal] = useState('');
    const [localGoalId, setLocalGoalId] = useState(null);
    const [goals, setGoals] = useState([]);
    const [reflection, setReflection] = useState('');
    const [effectivenessRating, setEffectivenessRating] = useState(3);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [useCustom, setUseCustom] = useState(false);

    // Fetch goals when plan modal opens
    useEffect(() => {
        if (showPlanModal) {
            goalsService.getGoals({ status: 'active' }).then(setGoals).catch(console.error);
        }
    }, [showPlanModal]);

    useEffect(() => {
        if (startRequest && !showPlanModal && !isActive) {
            setShowPlanModal(true);
            consumeStartRequest();
        }
    }, [startRequest, showPlanModal, isActive, consumeStartRequest]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        if (isActive) {
            togglePlayPause();
            return;
        }

        if (activeSessionId || mode === 'BREAK') {
            togglePlayPause();
            return;
        }

        setShowPlanModal(true);
    };

    const confirmStartSession = async () => {
        setIsSubmitting(true);
        try {
            await useTimerStore.getState().startSession(localGoal, localGoalId);
            setShowPlanModal(false);
            setLocalGoal('');
            setLocalGoalId(null);
        } catch (error) {
            console.error("Failed to start session:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStop = () => {
        if (!activeSessionId) {
            reset();
            return;
        }
        stopSession();
        setShowReflectModal(true);
    };

    const confirmEndSession = async () => {
        setIsSubmitting(true);
        try {
            await endSessionSync(reflection, effectivenessRating);
            setShowReflectModal(false);
            setLocalGoal('');
            setReflection('');
        } catch (error) {
            console.error("Failed to end session:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const themeColor = mode === 'WORK' ? (studyType === 'practice' ? 'practice' : 'work') : 'break';

    const colorClasses = {
        work: { bg: 'bg-primary-500', text: 'text-primary-300', border: 'border-primary-500/30', glow: 'shadow-primary-500/20' },
        practice: { bg: 'bg-primary-400', text: 'text-primary-300', border: 'border-primary-400/30', glow: 'shadow-primary-400/20' },
        break: { bg: 'bg-primary-300', text: 'text-primary-200', border: 'border-primary-300/30', glow: 'shadow-primary-300/20' },
    };

    const colors = colorClasses[themeColor];
    const progress = 100 - (timeLeft / (mode === 'WORK' ? (studyType === 'practice' ? focusDuration * 0.6 * 60 : focusDuration * 60) : breakDuration * 60) * 100);

    return (
        <>
            <div className={`relative overflow-hidden rounded-2xl bg-dark-900/60 backdrop-blur-sm border border-white/5 shadow-lg ${colors.glow} transition-all`}>
                {/* Progress bar */}
                <div className="absolute top-0 left-0 h-1 bg-dark-800 w-full">
                    <motion.div
                        className={`h-full ${colors.bg}`}
                        initial={false}
                        animate={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                    />
                </div>

                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <div className={`text-5xl font-black font-mono tracking-tighter ${isActive ? 'text-white' : 'text-dark-300'}`}>
                                    {formatTime(timeLeft)}
                                </div>
                                <div className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${colors.text}`}>
                                    {mode === 'WORK' ? (studyType === 'practice' ? 'Practice' : 'Deep Reading') : 'Break Time'}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handlePlayPause}
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all active:scale-95 ${isActive ? 'bg-primary-500 hover:bg-primary-400 text-dark-950' : `${colors.bg} hover:opacity-90 text-white`
                                        }`}
                                >
                                    {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                                </button>
                                <button
                                    onClick={handleStop}
                                    className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-dark-400 hover:text-white flex items-center justify-center transition-all"
                                >
                                    <Square className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={reset}
                                    disabled={isActive}
                                    className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-dark-400 hover:text-white flex items-center justify-center transition-all disabled:opacity-30"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex gap-1 p-1 bg-white/5 rounded-lg">
                                {['deep', 'practice'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setStudyType(type)}
                                        disabled={isActive}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${studyType === type
                                            ? (type === 'deep' ? 'bg-primary-500 text-white' : 'bg-primary-400 text-white')
                                            : 'text-dark-400 hover:text-white'
                                            } disabled:opacity-50`}
                                    >
                                        {type === 'deep' ? 'Deep' : 'Practice'}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setLocalExpanded(!localExpanded)}
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-dark-400 hover:text-white transition-all"
                            >
                                {localExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>

                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${colors.border} border ${colors.text}`}>
                                Session {sessionCount + 1}
                            </div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {localExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-6 mt-6 border-t border-white/5 space-y-6">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-dark-500 flex items-center gap-2">
                                                <Timer className="w-3 h-3" /> Time Blueprint
                                            </p>
                                            <button
                                                onClick={() => setUseCustom(!useCustom)}
                                                disabled={isActive}
                                                className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                                                    useCustom ? 'border-primary-500/40 text-primary-300' : 'border-white/10 text-dark-400'
                                                }`}
                                            >
                                                {useCustom ? 'Custom' : 'Science Presets'}
                                            </button>
                                        </div>

                                        {!useCustom && (
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                {TIMER_PRESETS.map((preset) => (
                                                    <button
                                                        key={preset.key}
                                                        disabled={isActive}
                                                        onClick={() => setPresetKey(preset.key, preset.focus, preset.break)}
                                                        className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${
                                                            presetKey === preset.key
                                                                ? 'border-primary-500/50 text-primary-200 bg-primary-500/10'
                                                                : 'border-white/10 text-dark-400 hover:text-white hover:border-white/30'
                                                        } disabled:opacity-40`}
                                                    >
                                                        {preset.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {!useCustom && (
                                            <p className="text-[11px] text-dark-500 mt-3">
                                                {TIMER_PRESETS.find((p) => p.key === presetKey)?.note || 'Longer sessions support deeper learning.'}
                                            </p>
                                        )}

                                        {useCustom && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-dark-500 mb-2">
                                                        Focus Length ({focusDuration}m)
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="10"
                                                        max="120"
                                                        step="5"
                                                        disabled={isActive}
                                                        value={focusDuration}
                                                        onChange={(e) => setFocusDuration(parseInt(e.target.value, 10))}
                                                        className="w-full accent-primary-400"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-dark-500 mb-2">
                                                        Break Length ({breakDuration}m)
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="3"
                                                        max="30"
                                                        step="1"
                                                        disabled={isActive}
                                                        value={breakDuration}
                                                        onChange={(e) => setBreakDuration(parseInt(e.target.value, 10))}
                                                        className="w-full accent-primary-400"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {mode === 'BREAK' ? (
                                        <div className="flex items-center gap-3 text-primary-300">
                                            <Coffee className="w-5 h-5" />
                                            <div>
                                                <p className="font-bold">Time to recharge</p>
                                                <p className="text-sm text-dark-400">Step away from the screen, stretch, breathe.</p>
                                            </div>
                                        </div>
                                    ) : activeSessionId ? (
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-dark-500 mb-2">Current Goal</p>
                                            <p className="text-white font-medium">{goal || "No goal set"}</p>
                                        </div>
                                    ) : (
                                        <div className="text-center text-dark-500">
                                            <p className="text-sm">Press play to start a new focus session</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Modals (Plan/Reflect) */}
            <AnimatePresence>
                {showPlanModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={() => setShowPlanModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            className="w-full max-w-md bg-dark-900 rounded-2xl p-6 border border-white/10 shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <h3 className={`text-xl font-bold ${colors.text} mb-4`}>What's your focus?</h3>

                            {/* Goal Selector */}
                            {goals.length > 0 && (
                                <div className="mb-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-dark-500 mb-2 block">
                                        Attribute to Goal
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setLocalGoalId(null)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${localGoalId === null
                                                    ? 'bg-white/10 text-white border border-white/20'
                                                    : 'bg-white/5 text-dark-400 hover:bg-white/10'
                                                }`}
                                        >
                                            No Goal
                                        </button>
                                        {goals.map(g => (
                                            <button
                                                key={g.id}
                                                onClick={() => setLocalGoalId(g.id)}
                                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${localGoalId === g.id
                                                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                                        : 'bg-white/5 text-dark-400 hover:bg-white/10'
                                                    }`}
                                            >
                                                <Target className="w-3 h-3" />
                                                {g.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <input
                                value={localGoal}
                                onChange={e => setLocalGoal(e.target.value)}
                                placeholder="e.g., Understand chapter 3 concepts..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                                autoFocus
                            />
                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setShowPlanModal(false)} className="flex-1 py-3 rounded-xl font-bold text-dark-400">Cancel</button>
                                <button
                                    onClick={confirmStartSession}
                                    disabled={!localGoal || isSubmitting}
                                    className={`flex-1 py-3 rounded-xl font-bold ${colors.bg} text-white disabled:opacity-50`}
                                >
                                    {isSubmitting ? 'Starting...' : 'Start Focus'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showReflectModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            className="w-full max-w-md bg-dark-900 rounded-2xl p-6 border border-white/10 shadow-2xl"
                        >
                            <h3 className="text-xl font-bold text-primary-300 mb-2">Session Complete</h3>
                            <textarea
                                value={reflection}
                                onChange={e => setReflection(e.target.value)}
                                placeholder="How did it go?"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white h-24 resize-none mb-4"
                            />
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(rate => (
                                    <button
                                        key={rate}
                                        onClick={() => setEffectivenessRating(rate)}
                                        className={`flex-1 py-2 rounded-lg font-bold ${effectivenessRating === rate ? 'bg-primary-500 text-white' : 'bg-white/5 text-dark-400'}`}
                                    >
                                        {rate}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={confirmEndSession}
                                disabled={isSubmitting}
                                className="w-full py-4 mt-6 rounded-xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 text-white disabled:opacity-50"
                            >
                                {isSubmitting ? 'Saving...' : 'Complete Session'}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SmartTimer;
