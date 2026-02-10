import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Clock, Award } from 'lucide-react';

/**
 * LearningVelocity - Abstract art-inspired visualization of learning rate.
 * 
 * Displays cards mastered per study hour with a dynamic, orbital animation
 * that represents the flow of knowledge being absorbed.
 */
const LearningVelocity = ({ data }) => {
    if (!data) return null;

    const { velocity, mastered_cards, study_hours, description } = data;

    // Calculate orbit positions for the abstract visualization
    const orbitRadius = 60;
    const particles = Array.from({ length: Math.min(mastered_cards, 12) }, (_, i) => ({
        id: i,
        angle: (i / Math.min(mastered_cards, 12)) * 360,
        delay: i * 0.1,
        size: 4 + Math.random() * 4
    }));

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dark-900/80 to-dark-950 border border-white/5 p-8">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(194,239,179,0.12),transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(220,214,247,0.1),transparent_50%)]" />
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                {/* Left: Orbital Visualization */}
                <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                        {/* Outer Ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full border border-white/5"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Middle Ring */}
                        <div className="absolute inset-6 rounded-full border border-white/5" />

                        {/* Inner Glow */}
                        <div className="absolute inset-12 rounded-full bg-gradient-to-br from-primary-400/25 to-primary-200/10 blur-xl" />

                        {/* Center Core */}
                        <div className="absolute inset-14 rounded-full bg-dark-900/90 border border-primary-500/30 flex items-center justify-center">
                            <div className="text-center">
                                <motion.div
                                    className="text-3xl font-black text-white"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                >
                                    {velocity}
                                </motion.div>
                                <div className="text-[9px] uppercase tracking-widest text-primary-300 font-bold">
                                    cards/hr
                                </div>
                            </div>
                        </div>

                        {/* Orbiting Particles */}
                        {particles.map((particle) => (
                            <motion.div
                                key={particle.id}
                                className="absolute w-full h-full"
                                style={{ transformOrigin: 'center center' }}
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 20 + particle.id * 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: particle.delay
                                }}
                            >
                                <motion.div
                                    className="absolute rounded-full bg-gradient-to-r from-primary-300 to-primary-500"
                                    style={{
                                        width: particle.size,
                                        height: particle.size,
                                        top: '50%',
                                        left: `calc(50% + ${orbitRadius}px)`,
                                        transform: 'translate(-50%, -50%)',
                                        boxShadow: '0 0 10px rgba(194, 239, 179, 0.5)'
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: particle.delay
                                    }}
                                />
                            </motion.div>
                        ))}

                        {/* Static Accent Dots */}
                        <div className="absolute top-2 right-8 w-1 h-1 rounded-full bg-primary-300/60" />
                        <div className="absolute bottom-6 left-4 w-1.5 h-1.5 rounded-full bg-primary-200/30" />
                        <div className="absolute top-12 left-2 w-0.5 h-0.5 rounded-full bg-white/30" />
                    </div>
                </div>

                {/* Right: Metrics */}
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-black text-white mb-1 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-primary-300" />
                            Learning Velocity
                        </h4>
                        <p className="text-sm text-dark-400">{description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Award className="w-4 h-4 text-primary-300" />
                                <span className="text-[10px] uppercase tracking-widest text-dark-500 font-bold">Mastered</span>
                            </div>
                            <div className="text-2xl font-black text-white">{mastered_cards}</div>
                            <div className="text-xs text-dark-500">cards</div>
                        </div>

                        <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-primary-300" />
                                <span className="text-[10px] uppercase tracking-widest text-dark-500 font-bold">Study Time</span>
                            </div>
                            <div className="text-2xl font-black text-white">{study_hours}</div>
                            <div className="text-xs text-dark-500">hours</div>
                        </div>
                    </div>

                    {/* Velocity Indicator Bar */}
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] uppercase tracking-widest text-dark-500 font-bold">Efficiency</span>
                            <span className="text-xs text-primary-400 font-bold">
                                {velocity >= 10 ? 'Excellent' : velocity >= 5 ? 'Good' : 'Building'}
                            </span>
                        </div>
                        <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary-300 via-primary-500 to-primary-700 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((velocity / 15) * 100, 100)}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                        <div className="flex justify-between mt-1">
                            <span className="text-[9px] text-dark-600">0</span>
                            <span className="text-[9px] text-dark-600">15+ cards/hr</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningVelocity;
