import React, { useEffect, useRef, useState } from 'react';
import { Send, Bot, User, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { agentApi } from '../../services/agent';

const AgentChat = ({ status, onOpenSettings }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I’m your Goal Agent. Tell me what you want to achieve and I’ll build a plan.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || isLoading) return;
    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const data = await agentApi.chat({ message: userMsg.content });
      const agentMsg = {
        role: 'assistant',
        content: data.message,
        guardrail: data.guardrail,
        suggested_actions: data.suggested_actions || [],
        tool_events: data.tool_events || []
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry — something went wrong. Try again in a moment.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickAction = (text) => {
    sendMessage(text);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-white/5 text-xs text-dark-400">
        {status?.email_configured ? 'Email ready' : (
          <span className="text-amber-300">Email not configured. </span>
        )}
        {!status?.email_configured && (
          <button onClick={onOpenSettings} className="text-primary-300 hover:text-primary-200 ml-1">Set it up</button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-dark-400">
            <Bot className="w-4 h-4" /> Thinking...
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-3 border-t border-white/5">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about goals, schedules, or study plans..."
            className="w-full pr-10 pl-3 py-2 rounded-xl bg-dark-900/70 border border-white/10 text-sm text-white placeholder:text-dark-500 focus:border-primary-500/60 focus:ring-2 focus:ring-primary-500/20 resize-none h-[44px]"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 p-2 rounded-lg bg-primary-500 hover:bg-primary-400 text-white disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 text-[10px] text-dark-500">Guardrails are enabled — I stay focused on your goals.</div>
      </div>
    </div>
  );
};

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full agent-orb flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${isUser ? 'bg-primary-500/90 text-white' : 'bg-dark-900/70 border border-white/10 text-white shadow-[0_0_25px_rgba(139,92,246,0.08)]'}`}>
        {message.guardrail?.status === 'out_of_domain' && (
          <div className="mb-2 text-[11px] text-amber-300 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Outside goal scope — I’ll steer back to your learning.
          </div>
        )}
        <div className="prose prose-invert prose-sm max-w-none prose-p:my-1">
          <ReactMarkdown>
            {message.content}
          </ReactMarkdown>
        </div>
        {Array.isArray(message.tool_events) && message.tool_events.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.tool_events.map((evt, idx) => (
              <div key={idx} className="text-[11px] rounded-lg bg-white/5 border border-white/10 px-2 py-1">
                <span className="text-primary-300">{evt.type}</span>: {evt.status}
              </div>
            ))}
          </div>
        )}
        {Array.isArray(message.suggested_actions) && message.suggested_actions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.suggested_actions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickAction(action)}
                className="text-[10px] px-2 py-1 rounded-full bg-primary-500/20 text-primary-200 hover:bg-primary-500/30"
              >
                {action}
              </button>
            ))}
          </div>
        )}
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-primary-500/20 text-primary-200 flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export default AgentChat;
