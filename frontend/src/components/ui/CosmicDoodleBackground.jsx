import React from 'react';

/**
 * Cosmic Doodle Background
 *
 * Hand-drawn sci-fi layers:
 * - Nebula blobs (SVG)
 * - Parallax stars
 * - Sketchy constellations
 */
const CosmicDoodleBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <svg className="absolute w-0 h-0">
        <filter id="doodle-ink" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" />
          <feDisplacementMap in="SourceGraphic" scale="2.5" />
        </filter>
      </svg>

      <div className="absolute inset-0 doodle-paper" />

      <div className="doodle-bg">
        <div className="doodle-nebula">
          <svg viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
            <defs>
              <linearGradient id="nebulaA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(220,214,247,0.45)" />
                <stop offset="100%" stopColor="rgba(46,196,182,0.35)" />
              </linearGradient>
              <linearGradient id="nebulaB" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(194,239,179,0.35)" />
                <stop offset="100%" stopColor="rgba(220,214,247,0.3)" />
              </linearGradient>
            </defs>
            <path
              d="M120 200 C 260 100, 420 80, 540 180 C 660 280, 760 240, 860 150 C 1020 20, 1180 120, 1100 300 C 1020 500, 820 540, 660 520 C 480 500, 360 460, 220 400 C 120 360, 40 280, 120 200 Z"
              fill="url(#nebulaA)"
              opacity="0.85"
            />
            <path
              d="M200 640 C 340 560, 520 540, 640 600 C 760 660, 880 700, 980 640 C 1120 560, 1200 640, 1120 760 C 1020 900, 820 880, 660 840 C 500 800, 380 780, 260 740 C 160 700, 120 680, 200 640 Z"
              fill="url(#nebulaB)"
              opacity="0.7"
            />
          </svg>
        </div>

        <div className="doodle-stars" />
        <div className="doodle-stars layer-2" />

        <svg className="doodle-constellations" viewBox="0 0 1000 700" preserveAspectRatio="none">
          <path d="M80 140 L160 100 L240 160 L320 120 L400 180" stroke="rgba(220,214,247,0.65)" />
          <path d="M640 120 L700 200 L780 170 L860 240 L940 200" stroke="rgba(194,239,179,0.6)" />
          <path d="M120 520 L220 480 L300 540 L380 500 L460 560" stroke="rgba(220,214,247,0.55)" />
          <path d="M620 520 L700 560 L780 520 L860 600" stroke="rgba(194,239,179,0.55)" />
        </svg>
      </div>
    </div>
  );
};

export default CosmicDoodleBackground;
