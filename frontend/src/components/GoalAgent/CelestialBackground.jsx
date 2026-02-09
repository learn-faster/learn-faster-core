import React from 'react';

const CelestialBackground = ({ className = '' }) => (
  <div className={`celestial-bg ${className}`} aria-hidden="true">
    <div className="celestial-layer celestial-stars" />
    <div className="celestial-layer celestial-nebula" />
    <div className="celestial-layer celestial-haze" />
  </div>
);

export default CelestialBackground;
