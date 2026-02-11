import React from 'react';
import { motion } from 'framer-motion';

/**
 * ForgettingCurve - An abstract art-inspired visualization of memory decay.
 * 
 * Displays the theoretical Ebbinghaus forgetting curve alongside the user's
 * actual retention data. Uses flowing gradients and organic shapes to create
 * a visually striking, museum-quality data visualization.
 */
const ForgettingCurve = ({ data }) => {
    if (!data) return null;

    const theoretical = data.theoretical || [];
    const actual = data.actual || [];
    const hasActualData = data.has_data && actual.length > 0;

    // SVG dimensions
    const width = 400;
    const height = 250;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Scale functions
    const xScale = (day) => padding.left + (day / 30) * chartWidth;
    const yScale = (retention) => padding.top + ((100 - retention) / 100) * chartHeight;

    // Generate smooth curve path
    const generatePath = (points) => {
        if (points.length < 2) return '';

        let path = `M ${xScale(points[0].day)} ${yScale(points[0].retention)}`;

        for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1];
            const curr = points[i];
            const cp1x = xScale(prev.day) + (xScale(curr.day) - xScale(prev.day)) * 0.5;
            const cp1y = yScale(prev.retention);
            const cp2x = xScale(curr.day) - (xScale(curr.day) - xScale(prev.day)) * 0.5;
            const cp2y = yScale(curr.retention);
            path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${xScale(curr.day)} ${yScale(curr.retention)}`;
        }

        return path;
    };

    // Generate filled area path
    const generateAreaPath = (points) => {
        const linePath = generatePath(points);
        if (!linePath) return '';

        const lastPoint = points[points.length - 1];
        const firstPoint = points[0];

        return `${linePath} L ${xScale(lastPoint.day)} ${yScale(0)} L ${xScale(firstPoint.day)} ${yScale(0)} Z`;
    };

    const theoreticalPath = generatePath(theoretical);
    const theoreticalAreaPath = generateAreaPath(theoretical);
    const actualPath = hasActualData ? generatePath(actual) : '';

    return (
        <div className="relative">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary-400/20 to-primary-200/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-primary-300/15 to-primary-500/10 rounded-full blur-2xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-500/5 rounded-full blur-[60px]" />
            </div>

            <div className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h4 className="text-lg font-black text-white">Memory Decay</h4>
                        <p className="text-xs text-dark-500">Ebbinghaus forgetting curve</p>
                    </div>
                    {hasActualData && (
                        <div className="text-right">
                            <div className="text-2xl font-black text-primary-400">{data.average_retention}%</div>
                            <div className="text-[10px] uppercase tracking-widest text-dark-500">Avg Retention</div>
                        </div>
                    )}
                </div>

                <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
                    {/* Gradient Definitions */}
                    <defs>
                        <linearGradient id="theoreticalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(194, 239, 179, 0.3)" />
                            <stop offset="100%" stopColor="rgba(194, 239, 179, 0)" />
                        </linearGradient>
                        <linearGradient id="actualGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#c2efb3" />
                            <stop offset="100%" stopColor="#dcd6f7" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Grid Lines - Abstract Art Style */}
                    {[0, 25, 50, 75, 100].map((val) => (
                        <g key={val}>
                            <line
                                x1={padding.left}
                                y1={yScale(val)}
                                x2={width - padding.right}
                                y2={yScale(val)}
                                stroke="rgba(255,255,255,0.03)"
                                strokeDasharray={val === 50 ? "none" : "4 4"}
                            />
                            <text
                                x={padding.left - 10}
                                y={yScale(val) + 4}
                                textAnchor="end"
                                className="text-[10px] fill-dark-600"
                            >
                                {val}%
                            </text>
                        </g>
                    ))}

                    {/* X-axis labels */}
                    {[0, 7, 14, 21, 30].map((day) => (
                        <text
                            key={day}
                            x={xScale(day)}
                            y={height - 10}
                            textAnchor="middle"
                            className="text-[10px] fill-dark-600"
                        >
                            {day === 0 ? 'Now' : `${day}d`}
                        </text>
                    ))}

                    {/* Theoretical Area Fill */}
                    <motion.path
                        d={theoreticalAreaPath}
                        fill="url(#theoreticalGradient)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    />

                    {/* Theoretical Curve */}
                    <motion.path
                        d={theoreticalPath}
                        fill="none"
                        stroke="rgba(194, 239, 179, 0.5)"
                        strokeWidth="2"
                        strokeDasharray="6 4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />

                    {/* Actual Retention Curve */}
                    {hasActualData && (
                        <motion.path
                            d={actualPath}
                            fill="none"
                            stroke="url(#actualGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            filter="url(#glow)"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                        />
                    )}

                    {/* Data Points - Abstract Circles */}
                    {hasActualData && actual.map((point, i) => (
                        <motion.circle
                            key={i}
                            cx={xScale(point.day)}
                            cy={yScale(point.retention)}
                            r="6"
                            fill="#161321"
                            stroke="url(#actualGradient)"
                            strokeWidth="2"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                        />
                    ))}
                </svg>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-primary-500/50" style={{ borderStyle: 'dashed' }} />
                        <span className="text-[10px] text-dark-500 uppercase tracking-wider">Theoretical</span>
                    </div>
                    {hasActualData && (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-gradient-to-r from-primary-300 to-primary-600 rounded-full" />
                            <span className="text-[10px] text-dark-500 uppercase tracking-wider">Your Retention</span>
                        </div>
                    )}
                </div>

                {/* Insight Message */}
                {!hasActualData && data.message && (
                    <div className="mt-4 text-center text-xs text-dark-500 italic">
                        {data.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgettingCurve;
