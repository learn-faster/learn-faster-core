import React, { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const hashId = (value) => {
  const str = String(value ?? '');
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const buildLayout = (items, maxNodes) => {
  const visibleItems = items.slice(0, maxNodes);
  const total = visibleItems.length || 1;
  return visibleItems.map((item, index) => {
    const seed = hashId(item.id ?? `${item.title}-${index}`);
    const angle = ((seed % 360) + (360 / total) * index) * (Math.PI / 180);
    const radius = 22 + (seed % 18);
    const x = clamp(50 + Math.cos(angle) * radius, 12, 88);
    const y = clamp(50 + Math.sin(angle) * radius, 12, 88);
    return { item, x, y };
  });
};

const ProgressHalo = ({ progress }) => (
  <div
    className="absolute inset-0 rounded-[32px] opacity-70"
    style={{
      background: `conic-gradient(from 180deg at 50% 50%, rgba(194,239,179,0.9) ${progress}%, rgba(220,214,247,0.15) 0%)`
    }}
  />
);

const DailyConstellation = ({ plan, onToggle, variant = 'compact' }) => {
  const [hovered, setHovered] = useState(null);
  const items = plan?.items || [];
  const maxNodes = variant === 'compact' ? 10 : 18;
  const overflow = items.length > maxNodes ? items.length - maxNodes : 0;
  const layout = useMemo(() => buildLayout(items, maxNodes), [items, maxNodes]);

  const completedCount = plan?.completed_count || 0;
  const totalCount = plan?.total_count || items.length || 0;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (!items.length) {
    return (
      <div className="p-6 rounded-2xl bg-dark-900/60 border border-white/10 text-center text-xs text-dark-500">
        No plan yet. Start a study session to generate one.
      </div>
    );
  }

  return (
    <div className={`relative rounded-[32px] border border-white/10 bg-dark-900/60 ${variant === 'compact' ? 'p-5' : 'p-6'} overflow-hidden`}>
      <ProgressHalo progress={progress} />
      <div className="relative z-10 rounded-[26px] border border-white/10 bg-dark-950/70 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary-300 font-black">Today’s Constellation</p>
            <p className="text-xs text-dark-400 mt-1">
              {completedCount}/{totalCount} tasks · {plan?.minutes_completed || 0}/{plan?.minutes_planned || 0} min
            </p>
          </div>
          <div className="agent-orb agent-orb-mini rounded-full relative">
            <div className="agent-orb-shell">
              <span className="agent-orb-core" />
              <span className="agent-orb-ring" />
              <span className="agent-orb-halo" />
            </div>
          </div>
        </div>

        <div className={`relative ${variant === 'compact' ? 'h-52' : 'h-72'} rounded-3xl border border-white/5 bg-black/30 overflow-hidden group`}>
          <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {layout.map((node, index) => {
              if (index === 0) return null;
              const prev = layout[index - 1];
              return (
                <line
                  key={`edge-${node.item.id}`}
                  x1={`${prev.x}%`}
                  y1={`${prev.y}%`}
                  x2={`${node.x}%`}
                  y2={`${node.y}%`}
                  stroke="rgba(247,210,122,0.5)"
                  strokeWidth="1.6"
                />
              );
            })}
          </svg>

          {layout.map((node) => {
            const isCompleted = !!node.item.completed;
            const title = node.item.title?.trim() || 'Untitled task';
            const isHovered = hovered === node.item.id;
            return (
              <button
                key={node.item.id}
                type="button"
                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform hover:scale-110"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onClick={() => onToggle?.(node.item.id, node.item.completed)}
                onMouseEnter={() => setHovered(node.item.id)}
                onMouseLeave={() => setHovered(null)}
                aria-label={`${title} ${isCompleted ? 'completed' : 'pending'}`}
              >
                {isCompleted ? (
                  <>
                    <span className="w-3 h-3 rounded-full bg-primary-200/90 shadow-[0_0_10px_rgba(194,239,179,0.55)]" />
                    {isHovered && (
                      <>
                        <span className="absolute w-6 h-6 rounded-full border border-primary-200/60 animate-ping" />
                        <span className="absolute w-10 h-10 rounded-full border border-primary-200/30 animate-ping [animation-delay:120ms]" />
                        <span className="absolute -top-4 left-3 w-1.5 h-1.5 rounded-full bg-primary-100/90 animate-ping" />
                        <span className="absolute -left-4 bottom-2 w-1 h-1 rounded-full bg-primary-100/70 animate-ping [animation-delay:180ms]" />
                        <span className="absolute right-3 bottom-4 w-1 h-1 rounded-full bg-primary-100/60 animate-ping [animation-delay:240ms]" />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#f7d27a]/85 shadow-[0_0_10px_rgba(247,210,122,0.6)]" />
                    {isHovered && (
                      <>
                        <span className="absolute w-7 h-7 rounded-full border border-[#f7d27a]/60 animate-ping" />
                        <span className="absolute w-12 h-12 rounded-full border border-[#f7d27a]/35 animate-ping [animation-delay:120ms]" />
                        <span className="absolute -top-4 right-2 w-1.5 h-1.5 rounded-full bg-[#fbe7b2]/90 animate-ping" />
                        <span className="absolute left-3 -bottom-4 w-1 h-1 rounded-full bg-[#fbe7b2]/70 animate-ping [animation-delay:180ms]" />
                        <span className="absolute -right-4 bottom-3 w-1 h-1 rounded-full bg-[#fbe7b2]/60 animate-ping [animation-delay:240ms]" />
                      </>
                    )}
                  </>
                )}
                {hovered === node.item.id && variant === 'expanded' && (
                  <div className="absolute z-20 w-48 text-left -top-16 left-1/2 -translate-x-1/2 rounded-xl bg-dark-900/95 border border-white/10 px-3 py-2 text-[11px] text-dark-200 shadow-lg">
                    <p className="font-semibold text-white">{title}</p>
                    <p className="text-dark-400">{node.item.duration_minutes || 0} min</p>
                    {node.item.notes && <p className="text-dark-500 mt-1">{node.item.notes}</p>}
                  </div>
                )}
              </button>
            );
          })}

          {overflow > 0 && (
            <div className="absolute bottom-4 right-4 text-[10px] font-bold uppercase tracking-widest text-dark-300 bg-dark-900/80 border border-white/10 px-3 py-2 rounded-full">
              +{overflow} more
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyConstellation;
