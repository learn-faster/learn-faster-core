import React from 'react';

const SolarCoreIcon = ({ className = '', size = 32 }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="haloGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 26) rotate(90) scale(30)">
        <stop offset="0" stopColor="#dcd6f7" stopOpacity="0.35" />
        <stop offset="0.45" stopColor="#c2efb3" stopOpacity="0.25" />
        <stop offset="1" stopColor="#0B0F1A" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="accretionRing" x1="6" y1="32" x2="58" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0B0F1A" stopOpacity="0.2" />
        <stop offset="0.25" stopColor="#c2efb3" stopOpacity="0.5" />
        <stop offset="0.5" stopColor="#dcd6f7" stopOpacity="0.95" />
        <stop offset="0.75" stopColor="#c2efb3" stopOpacity="0.5" />
        <stop offset="1" stopColor="#0B0F1A" stopOpacity="0.2" />
      </linearGradient>
      <radialGradient id="coreVoid" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(30 28) rotate(90) scale(14)">
        <stop offset="0" stopColor="#000000" stopOpacity="0.95" />
        <stop offset="1" stopColor="#0B0F1A" stopOpacity="0.95" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#haloGlow)" />
    <g className="solar-ring">
      <ellipse
        cx="32"
        cy="34"
        rx="22.5"
        ry="9.5"
        fill="none"
        stroke="url(#accretionRing)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="10 6 4 6"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="18.5"
        ry="7.5"
        fill="none"
        stroke="rgba(194,239,179,0.35)"
        strokeWidth="1.6"
        strokeDasharray="6 8"
      />
    </g>
    <circle cx="32" cy="32" r="12" fill="url(#coreVoid)" />
    <circle cx="32" cy="32" r="14.5" stroke="rgba(220,214,247,0.3)" strokeWidth="1.2" />
    <circle cx="16" cy="18" r="1.4" fill="#dcd6f7" />
    <circle cx="50" cy="16" r="1.2" fill="#c2efb3" />
    <circle cx="48" cy="46" r="1.6" fill="#2ec4b6" />
  </svg>
);

export default SolarCoreIcon;
