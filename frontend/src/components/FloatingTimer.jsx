import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, Clock } from 'lucide-react';
import useTimerStore from '../stores/useTimerStore';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Global Floating Timer Component
 * 
 * stays in the bottom-right corner and syncs with the global timer store.
 * Allows quick access to timer controls while consuming other content.
 */
const FloatingTimer = () => {
    const {
        timeLeft, isActive, mode, studyType, activeSessionId,
        togglePlayPause, tick, loadSettings
    } = useTimerStore();

    const navigate = useNavigate();
    const location = useLocation();

    // Kick off settings load
    useEffect(() => {
        loadSettings();
    }, []);

    // Global tick interval
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                tick();
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, tick]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Don't show on dashboard (it has a full-size version)
    if (location.pathname === '/') return null;

    // Show only if active or has an active session
    if (!activeSessionId && !isActive) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                drag
                dragConstraints={{ left: -1000, right: 0, top: -1000, bottom: 0 }}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-2 pl-4 rounded-2xl bg-dark-900/80 backdrop-blur-xl border border-white/10 shadow-2xl cursor-move active:scale-95"
            >
                <div
                    className="flex flex-col cursor-pointer"
                    onClick={() => navigate('/')}
                >
                        <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-primary-500 animate-pulse' : 'bg-dark-500'}`} />
                        <span className="text-xs font-bold text-white font-mono">{formatTime(timeLeft)}</span>
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-dark-500">
                        {mode} • {studyType}
                    </span>
                </div>

                <div className="flex gap-1">
                    <button
                        onClick={togglePlayPause}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 ${isActive ? 'bg-primary-500/10 text-primary-300' : 'bg-primary-500/10 text-primary-500'
                            }`}
                    >
                        {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-dark-400 flex items-center justify-center transition-all"
                    >
                        <Clock className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default FloatingTimer;
