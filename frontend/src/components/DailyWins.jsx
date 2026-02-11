import React from 'react';
import { Sparkles, Flame, CheckCircle2, Radar } from 'lucide-react';

const DailyWins = ({ dashboard }) => {
  const focusMinutes = dashboard?.focus_summary?.minutes_today || 0;
  const dueToday = dashboard?.due_today || 0;
  const streak = dashboard?.streak_status?.streak || 0;
  const velocity = dashboard?.velocity || 0;

  const wins = [
    {
      label: 'Focus Minutes',
      value: `${focusMinutes}m`,
      icon: Sparkles,
      accent: 'text-primary-300'
    },
    {
      label: 'Cards Due',
      value: dueToday,
      icon: CheckCircle2,
      accent: 'text-primary-200'
    },
    {
      label: 'Streak',
      value: `${streak}d`,
      icon: Flame,
      accent: 'text-primary-300'
    },
    {
      label: 'Velocity',
      value: `${velocity}`,
      icon: Radar,
      accent: 'text-primary-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {wins.map((win) => (
        <div key={win.label} className="p-3 rounded-xl bg-dark-900/70 border border-white/10">
          <div className="flex items-center gap-2">
            <win.icon className={`w-4 h-4 ${win.accent}`} />
            <p className="text-[10px] uppercase tracking-widest text-dark-400">{win.label}</p>
          </div>
          <p className="text-lg font-black text-white mt-2">{win.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DailyWins;
