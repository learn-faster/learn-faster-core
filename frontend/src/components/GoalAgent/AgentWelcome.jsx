import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Send, Sparkles } from 'lucide-react';
import { agentApi } from '../../services/agent';
import { motion } from 'framer-motion';
import CelestialBackground from './CelestialBackground';
import SolarCoreIcon from './SolarCoreIcon';

const AgentWelcome = ({ onStart, onSkip }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome aboard. What do you want to learn next?' }
  ]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let animationId = 0;
    const stars = Array.from({ length: 150 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.6 + 0.2
    }));

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const drawShip = (time) => {
      const t = time * 0.001;
      const shipX = width * (0.3 + 0.2 * Math.sin(t * 0.2));
      const shipY = height * 0.35 + Math.sin(t * 1.8) * 18;

      ctx.save();
      ctx.translate(shipX, shipY);
      ctx.rotate(Math.sin(t * 0.6) * 0.05);

      ctx.fillStyle = 'rgba(194,239,179,0.2)';
      ctx.beginPath();
      ctx.ellipse(-70, 6, 60, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      const grad = ctx.createLinearGradient(-40, 0, 70, 0);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.5, '#c2efb3');
      grad.addColorStop(1, '#dcd6f7');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(-40, -16);
      ctx.lineTo(52, 0);
      ctx.lineTo(-40, 16);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.beginPath();
      ctx.arc(-8, 0, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(194,239,179,0.8)';
      ctx.beginPath();
      ctx.moveTo(-55, -6);
      ctx.lineTo(-78, 0);
      ctx.lineTo(-55, 6);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      const trail = ctx.createLinearGradient(shipX - 140, shipY, shipX - 20, shipY);
      trail.addColorStop(0, 'rgba(194,239,179,0)');
      trail.addColorStop(1, 'rgba(194,239,179,0.45)');
      ctx.strokeStyle = trail;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(shipX - 140, shipY + 6);
      ctx.lineTo(shipX - 30, shipY + 6);
      ctx.stroke();
    };

    const loop = (time) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(5, 8, 18, 0.6)';
      ctx.fillRect(0, 0, width, height);

      stars.forEach((s) => {
        s.x += s.speed * 0.0006;
        if (s.x > 1.1) s.x = -0.1;
        const px = s.x * width;
        const py = s.y * height;
        const size = s.z * 2;
        ctx.fillStyle = `rgba(220,214,247,${0.35 + s.z * 0.5})`;
        ctx.fillRect(px, py, size, size);
      });

      drawShip(time);
      animationId = requestAnimationFrame(loop);
    };
    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isSending) return;
    setError('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsSending(true);
    try {
      const data = await agentApi.chat({ message: text });
      setMessages((prev) => [...prev, { role: 'assistant', content: data?.message || 'Got it.' }]);
    } catch (e) {
      setError(e?.userMessage || e?.message || 'Unable to reach the Goal Agent. Try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const tips = [
    'Start by uploading your first document.',
    'Add a goal to unlock your learning path.',
    'Set up your AI core in onboarding.'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[130] bg-dark-950/95 backdrop-blur-2xl overflow-hidden">
      <CelestialBackground className="absolute inset-0 opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/25 via-transparent to-primary-300/25" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_15%,rgba(194,239,179,0.3),transparent_40%),radial-gradient(circle_at_75%_20%,rgba(220,214,247,0.28),transparent_45%)]" />

      <div className="relative z-10 h-full w-full px-6 py-8">
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-auto z-20">
          <div className="flex items-center gap-3 rounded-full border border-primary-500/30 bg-dark-900/70 px-4 py-2 backdrop-blur-xl shadow-[0_0_20px_rgba(46,196,182,0.15)]">
            <div className="h-8 w-8 rounded-full flex items-center justify-center">
              <SolarCoreIcon size={28} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary-300 font-black">Goal Agent</p>
              <p className="text-[10px] text-primary-100/70">Mission briefing online.</p>
            </div>
          </div>
          <button
            onClick={onSkip}
            className="text-xs font-semibold text-primary-100 hover:text-white transition-colors px-4 py-2 rounded-full border border-primary-500/40 bg-primary-500/15 shadow-[0_0_24px_rgba(46,196,182,0.35)]"
          >
            Skip
          </button>
        </div>

        <div ref={containerRef} className="absolute inset-0 pointer-events-none">
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div className="text-center mb-6">
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary-200/80 font-black">Mission Control</p>
            <h1 className="text-4xl md:text-5xl font-black text-white mt-3">
              Chart your learning trajectory
            </h1>
            <p className="text-primary-100/80 mt-3 max-w-2xl">
              Tell me your mission. I’ll build your plan, checkpoints, and pace.
            </p>
          </div>

          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="mb-6 flex items-center justify-center"
          >
            <div className="relative w-[140px] h-[140px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-primary-500/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-3 rounded-full border border-primary-500/20"
              />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-300/40 to-primary-600/30 border border-primary-500/50 shadow-[0_0_40px_rgba(194,239,179,0.5)] flex items-center justify-center">
                  <SolarCoreIcon size={56} />
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="w-full max-w-3xl rounded-[2.5rem] border border-primary-500/30 bg-dark-900/80 backdrop-blur-xl p-6 shadow-[0_0_50px_rgba(46,196,182,0.25)]">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-primary-300 font-black">
              <Sparkles className="w-3 h-3" /> Interstellar Uplink
            </div>
            <div className="mt-5 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Awaiting mission briefing..."
                className="w-full pr-12 pl-4 py-4 rounded-2xl bg-dark-950/80 border border-primary-500/40 text-sm text-white placeholder:text-primary-100/40 focus:border-primary-400/90 focus:ring-2 focus:ring-primary-500/40 resize-none h-[64px] shadow-[0_0_30px_rgba(46,196,182,0.35)]"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isSending}
                className="absolute right-3 top-3 p-2 rounded-xl bg-primary-500 hover:bg-primary-400 text-dark-950 disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 text-[11px] text-primary-100/70">
              {isSending ? 'Agent is analyzing...' : tips[tipIndex]}
            </div>
            {error && (
              <div className="mt-1 text-[11px] text-rose-300">{error}</div>
            )}

            <div className="mt-4 flex items-center justify-between text-[10px] text-primary-100/60">
              <span>Ask a goal, timeframe, or learning focus.</span>
              <button
                onClick={onStart}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-400 to-primary-600 text-dark-950 font-bold uppercase tracking-[0.2em] text-[10px] shadow-[0_0_18px_rgba(46,196,182,0.3)]"
              >
                Start Onboarding <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentWelcome;
