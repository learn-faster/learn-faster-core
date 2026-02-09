import React from 'react';

const InlineErrorBanner = ({ message, className = '' }) => {
  if (!message) return null;
  return (
    <div className={`rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-200 ${className}`}>
      {message}
    </div>
  );
};

export default InlineErrorBanner;
