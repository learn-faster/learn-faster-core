import React from 'react';
import { motion } from 'framer-motion';

/**
 * Abstract Art Background Component
 * 
 * Creates an animated, study-themed abstract background with:
 * - Morphing gradient orbs
 * - Subtle geometric grid overlay
 * - Floating particles for depth
 */
const AbstractBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />

            {/* Primary gradient orb - top right */}
            <motion.div
                className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(59,130,246,0.2) 40%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Secondary gradient orb - bottom left */}
            <motion.div
                className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(139,92,246,0.2) 50%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
                animate={{
                    scale: [1, 1.15, 1],
                    x: [0, -20, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Accent orb - center */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10"
                style={{
                    background: 'radial-gradient(circle, rgba(244,114,182,0.3) 0%, transparent 60%)',
                    filter: 'blur(40px)',
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Geometric grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Subtle noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
};

export default AbstractBackground;
