import { create } from 'zustand';
import studyService from '../services/study';
import cognitiveService from '../services/cognitive';
import goalsService from '../services/goals';

/**
 * Global Timer Store
 * 
 * Manages the study timer state across the entire application.
 * Highlights:
 * - Persists state during navigation
 * - Syncs with backend sessions
 * - Handles WORK/BREAK transitions
 * - Logs time to Goals via FocusSessions
 */
const useTimerStore = create((set, get) => ({
    // State
    timeLeft: 25 * 60,
    isActive: false,
    mode: 'WORK', // WORK, BREAK
    studyType: 'deep', // deep, practice
    sessionCount: 0,
    activeSessionId: null,
    goal: '',

    // Goal Integration
    selectedGoalId: null,  // ID of the goal the session is attributed to
    focusSessionId: null,  // ID of the focus session in goals API
    sessionStartTime: null, // When the session started

    // Config (loaded from settings)
    focusDuration: 25,
    breakDuration: 5,

    // Actions
    loadSettings: async () => {
        try {
            const settings = await cognitiveService.getSettings();
            const focus = settings.focus_duration || 25;
            const brk = settings.break_duration || 5;
            set({
                focusDuration: focus,
                breakDuration: brk,
                timeLeft: focus * 60
            });
        } catch (error) {
            console.error("Failed to load timer settings:", error);
        }
    },

    tick: () => {
        const { timeLeft, isActive, mode, studyType, focusDuration, breakDuration, sessionCount } = get();
        if (!isActive) return;

        if (timeLeft > 0) {
            set({ timeLeft: timeLeft - 1 });
        } else {
            // Phase transition
            if (mode === 'WORK') {
                set({
                    mode: 'BREAK',
                    isActive: false, // Pause on transition to notify user
                    sessionCount: sessionCount + 1,
                    timeLeft: breakDuration * 60
                });
            } else {
                set({
                    mode: 'WORK',
                    isActive: false,
                    timeLeft: (studyType === 'practice' ? Math.round(focusDuration * 0.6) : focusDuration) * 60
                });
            }
        }
    },

    startSession: async (sessionGoal, goalId = null) => {
        const { studyType } = get();
        try {
            // Start study session (existing API)
            const session = await studyService.startSession({
                goal: sessionGoal,
                success_criteria: '',
                study_type: studyType
            });

            // Start focus session for goal tracking (new API)
            let focusSession = null;
            if (goalId) {
                try {
                    focusSession = await goalsService.startFocusSession(goalId, {
                        session_type: studyType
                    });
                } catch (err) {
                    console.error("Failed to start focus session:", err);
                }
            }

            set({
                activeSessionId: session.id,
                goal: sessionGoal,
                selectedGoalId: goalId,
                focusSessionId: focusSession?.id || null,
                sessionStartTime: Date.now(),
                isActive: true
            });
            return session;
        } catch (error) {
            console.error("Failed to start session:", error);
            throw error;
        }
    },

    togglePlayPause: () => {
        const { isActive } = get();
        set({ isActive: !isActive });
    },

    stopSession: () => {
        set({ isActive: false });
    },

    endSessionSync: async (reflection, rating) => {
        const { activeSessionId, focusSessionId, sessionStartTime, studyType, focusDuration } = get();
        if (!activeSessionId) return;

        try {
            // End study session (existing API)
            await studyService.endSession(activeSessionId, {
                reflection,
                effectiveness_rating: rating
            });

            // End focus session and log time (new API)
            if (focusSessionId && sessionStartTime) {
                const durationMinutes = Math.round((Date.now() - sessionStartTime) / 60000);
                try {
                    await goalsService.endFocusSession(focusSessionId, {
                        duration_minutes: durationMinutes,
                        notes: reflection
                    });
                } catch (err) {
                    console.error("Failed to end focus session:", err);
                }
            }

            set({
                activeSessionId: null,
                focusSessionId: null,
                selectedGoalId: null,
                sessionStartTime: null,
                goal: '',
                isActive: false,
                mode: 'WORK',
                timeLeft: (studyType === 'practice' ? Math.round(focusDuration * 0.6) : focusDuration) * 60
            });
        } catch (error) {
            console.error("Failed to end session:", error);
            throw error;
        }
    },

    reset: () => {
        const { studyType, focusDuration } = get();
        set({
            isActive: false,
            mode: 'WORK',
            timeLeft: (studyType === 'practice' ? Math.round(focusDuration * 0.6) : focusDuration) * 60
        });
    },

    setStudyType: (type) => {
        const { isActive, focusDuration } = get();
        if (isActive) return;
        set({
            studyType: type,
            timeLeft: (type === 'practice' ? Math.round(focusDuration * 0.6) : focusDuration) * 60
        });
    },

    setSelectedGoalId: (goalId) => set({ selectedGoalId: goalId }),

    setTimeLeft: (seconds) => set({ timeLeft: seconds }),
}));

export default useTimerStore;

