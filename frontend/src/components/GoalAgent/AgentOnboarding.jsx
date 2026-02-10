import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, ChevronRight, Mail, HeartPulse } from 'lucide-react';
import { agentApi } from '../../services/agent';
import cognitiveService from '../../services/cognitive';
import useLLMConfig from '../../hooks/useLLMConfig';
import ApiKeySetup from '../ApiKeySetup';
import FileUpload from '../documents/FileUpload';

const inputClass = "w-full px-3 py-2 rounded-xl bg-dark-900/80 border border-primary-500/20 text-sm text-white placeholder:text-primary-100/40 focus:border-primary-500/70 focus:ring-2 focus:ring-primary-500/30";

const AgentOnboarding = ({ onComplete, onOpenSettings }) => {
  const [step, setStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [coreSaving, setCoreSaving] = useState(false);
  const [coreError, setCoreError] = useState('');
  const [goals, setGoals] = useState({ short: '', near: '', long: '' });
  const [weeklyHours, setWeeklyHours] = useState('6');
  const [focusStyle, setFocusStyle] = useState('deep');
  const [preferredTime, setPreferredTime] = useState('morning');
  const [email, setEmail] = useState('');
  const [resendApiKey, setResendApiKey] = useState('');
  const [useBiometrics, setUseBiometrics] = useState(false);
  const [fitbitClientId, setFitbitClientId] = useState('');
  const [fitbitClientSecret, setFitbitClientSecret] = useState('');
  const [fitbitRedirectUri, setFitbitRedirectUri] = useState('http://localhost:5173/api/fitbit/callback');

  const { isConfigured, getConfig, refresh } = useLLMConfig();

  const steps = useMemo(() => {
    const base = ['Goals', 'Preferences', 'Integrations', 'Upload'];
    return isConfigured ? base : ['Core', ...base];
  }, [isConfigured]);

  useEffect(() => {
    if (step >= steps.length) {
      setStep(steps.length - 1);
    }
  }, [steps, step]);

  const saveOnboarding = async () => {
    setIsSaving(true);
    try {
      const onboarding = {
        weekly_hours: weeklyHours,
        focus_style: focusStyle,
        preferred_time: preferredTime,
        goals
      };

      const goalsPayload = [];
      if (goals.short.trim()) goalsPayload.push({ title: goals.short, domain: 'learning', target_hours: 20, priority: 1 });
      if (goals.near.trim()) goalsPayload.push({ title: goals.near, domain: 'learning', target_hours: 40, priority: 2 });
      if (goals.long.trim()) goalsPayload.push({ title: goals.long, domain: 'learning', target_hours: 80, priority: 3 });

      await agentApi.onboarding({ onboarding, goals: goalsPayload });

      await agentApi.saveSettings({
        email,
        resend_api_key: resendApiKey,
        use_biometrics: useBiometrics,
        fitbit_client_id: fitbitClientId,
        fitbit_client_secret: fitbitClientSecret,
        fitbit_redirect_uri: fitbitRedirectUri
      });

      onComplete?.();
    } catch (e) {
      console.error('Failed to save onboarding', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCoreConfigured = async () => {
    setCoreError('');
    setCoreSaving(true);
    try {
      refresh();
      const llmConfig = getConfig();
      await agentApi.saveSettings({ llm_config: llmConfig });
      await cognitiveService.updateSettings({ llm_config: llmConfig });
      setStep((s) => Math.min(steps.length - 1, s + 1));
    } catch (e) {
      setCoreError(e?.userMessage || e?.message || 'Unable to save LLM configuration.');
    } finally {
      setCoreSaving(false);
    }
  };

  const stepLabel = steps[step];

  return (
    <div className="h-full flex flex-col">
      <div className="px-5 py-4 border-b border-primary-500/10">
        <p className="text-sm font-semibold text-white tracking-wide">Personalize your agent</p>
        <p className="text-[11px] text-primary-100/70 mt-1">Help me build a pacing model that fits your goals and energy.</p>
        <div className="mt-3 flex gap-2">
          {steps.map((label, idx) => (
            <div
              key={label}
              className={`text-[10px] px-3 py-1 rounded-full border ${idx === step ? 'bg-primary-500/25 text-primary-100 border-primary-500/50' : 'bg-white/5 text-primary-100/60 border-primary-500/15'}`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 custom-scrollbar">
        {stepLabel === 'Core' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-primary-500/20 bg-white/5 p-4">
              <p className="text-xs text-primary-100/70">Connect your AI provider so we can generate maps, flashcards, and summaries.</p>
            </div>
            <ApiKeySetup onConfigured={handleCoreConfigured} />
            {coreSaving && (
              <div className="text-xs text-primary-100/70">Saving AI configuration…</div>
            )}
            {coreError && (
              <div className="text-xs text-rose-300">{coreError}</div>
            )}
            <button
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              className="text-xs text-primary-100/60 hover:text-white"
            >
              Skip for now
            </button>
          </div>
        )}

        {stepLabel === 'Goals' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-primary-500/20 bg-white/5 p-4">
              <p className="text-xs text-primary-100/70">Define what “success” looks like at each time horizon.</p>
              <div className="mt-4 space-y-4">
                <Field label="Short‑term goal (days)">
                  <input className={inputClass} value={goals.short} onChange={(e) => setGoals({ ...goals, short: e.target.value })} placeholder="e.g. Finish chapter 2" />
                </Field>
                <Field label="Near‑term goal (weeks)">
                  <input className={inputClass} value={goals.near} onChange={(e) => setGoals({ ...goals, near: e.target.value })} placeholder="e.g. Complete ML basics" />
                </Field>
                <Field label="Long‑term goal (months+)">
                  <input className={inputClass} value={goals.long} onChange={(e) => setGoals({ ...goals, long: e.target.value })} placeholder="e.g. Build portfolio project" />
                </Field>
              </div>
            </div>
          </div>
        )}

        {stepLabel === 'Preferences' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-primary-500/20 bg-white/5 p-4 space-y-4">
              <Field label="Available hours per week">
                <input className={inputClass} type="number" value={weeklyHours} onChange={(e) => setWeeklyHours(e.target.value)} />
              </Field>
              <Field label="Focus style">
                <select className={inputClass} value={focusStyle} onChange={(e) => setFocusStyle(e.target.value)}>
                  <option value="deep">Deep work blocks</option>
                  <option value="short">Short bursts</option>
                  <option value="mixed">Mixed schedule</option>
                </select>
              </Field>
              <Field label="Preferred time">
                <select className={inputClass} value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)}>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              </Field>
            </div>
          </div>
        )}

        {stepLabel === 'Integrations' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-primary-500/20 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
                <Mail className="w-4 h-4 text-primary-300" /> Email setup
              </div>
              <Field label="Email">
                <input className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
              </Field>
              <Field label="Resend API key">
                <input className={inputClass} value={resendApiKey} onChange={(e) => setResendApiKey(e.target.value)} placeholder="re_..." />
              </Field>
            </div>

            <div className="rounded-2xl border border-primary-500/20 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <HeartPulse className="w-4 h-4 text-primary-300" /> Fitbit (optional)
                </div>
                <label className="text-xs text-primary-100/70 flex items-center gap-2">
                  <input type="checkbox" checked={useBiometrics} onChange={(e) => setUseBiometrics(e.target.checked)} /> Enable
                </label>
              </div>
              {useBiometrics && (
                <div className="mt-3 space-y-2">
                  <Field label="Client ID">
                    <input className={inputClass} value={fitbitClientId} onChange={(e) => setFitbitClientId(e.target.value)} />
                  </Field>
                  <Field label="Client Secret">
                    <input className={inputClass} value={fitbitClientSecret} onChange={(e) => setFitbitClientSecret(e.target.value)} />
                  </Field>
                  <Field label="Redirect URI">
                    <input className={inputClass} value={fitbitRedirectUri} onChange={(e) => setFitbitRedirectUri(e.target.value)} />
                  </Field>
                  <button
                    onClick={() => window.location.href = '/api/fitbit/auth'}
                    className="mt-2 px-3 py-2 text-xs font-bold rounded-lg bg-primary-500/90 hover:bg-primary-500 text-dark-950 shadow-[0_0_16px_rgba(46,196,182,0.25)]"
                  >
                    Connect Fitbit
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {stepLabel === 'Upload' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-primary-500/20 bg-white/5 p-4">
              <p className="text-xs text-primary-100/70">Upload your first document to unlock maps, flashcards, and practice sessions.</p>
            </div>
            <FileUpload onComplete={() => setStep((s) => Math.min(steps.length - 1, s + 1))} />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-primary-500/10 flex items-center justify-between">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="text-xs text-primary-100/60 hover:text-white"
          disabled={step === 0}
        >
          Back
        </button>
        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-primary-500/90 hover:bg-primary-500 text-dark-950 flex items-center gap-1 shadow-[0_0_16px_rgba(46,196,182,0.25)]"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={saveOnboarding}
            disabled={isSaving}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-primary-500/90 hover:bg-primary-500 text-dark-950 flex items-center gap-1 shadow-[0_0_16px_rgba(46,196,182,0.25)]"
          >
            <CheckCircle2 className="w-4 h-4" /> Finish
          </button>
        )}
      </div>
    </div>
  );
};

const Field = ({ label, children }) => (
  <div>
    <label className="block text-[11px] text-primary-100/70 mb-1">{label}</label>
    {children}
  </div>
);

export default AgentOnboarding;
