import React, { useState, useEffect } from 'react';
import { Save, Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { agentApi } from '../../services/agent';

const AgentSettings = ({ onClose, onSaved }) => {
  const [settings, setSettings] = useState({
    llm_config: {
      provider: 'openai',
      model: 'gpt-4o',
      base_url: '',
      temperature: 0.7,
      api_key: ''
    },
    vision_llm_config: {
      provider: 'openai',
      model: 'gpt-4o',
      base_url: '',
      temperature: 0.7,
      api_key: ''
    },
    guardrail_mode: 'soft',
    enable_screenshots: true,
    check_in_frequency_hours: 4,
    use_biometrics: false,
    email: '',
    resend_api_key: ''
  });
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showVisionKey, setShowVisionKey] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [settingsData, statusData] = await Promise.all([
          agentApi.settings(),
          agentApi.status()
        ]);

        if (settingsData) {
          setSettings((prev) => ({
            ...prev,
            ...settingsData
          }));
        }
        setConnected(statusData?.fitbit_connected || false);
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (section, field, value) => {
    if (section) {
      setSettings((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        [field]: value
      }));
    }
    setError(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await agentApi.saveSettings(settings);
      onSaved?.();
      if (onClose) onClose();
    } catch (error) {
      console.error('Error saving settings:', error);
      setError(typeof error === 'string' ? error : 'Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-4">
      <div className="space-y-6">
        {error && (
          <div className="p-3 bg-red-500/10 text-red-300 text-sm rounded-lg border border-red-500/20">
            {error}
          </div>
        )}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-dark-400">
            <Loader2 className="animate-spin" size={32} />
            <span className="text-sm">Loading settings...</span>
          </div>
        ) : (
          <>
            <Section title="Guardrails" icon={ShieldCheck}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-300">Mode</span>
                <select
                  value={settings.guardrail_mode}
                  onChange={(e) => handleChange(null, 'guardrail_mode', e.target.value)}
                  className={inputClass}
                >
                  <option value="soft">Soft</option>
                  <option value="hard">Hard (refuse out‑of‑domain)</option>
                </select>
              </div>
            </Section>

            <Section title="LLM Configuration">
              <ConfigFields config={settings.llm_config} onChange={(f, v) => handleChange('llm_config', f, v)} showKey={showApiKey} setShowKey={setShowApiKey} />
            </Section>

            <Section title="Vision LLM">
              <ConfigFields config={settings.vision_llm_config} onChange={(f, v) => handleChange('vision_llm_config', f, v)} showKey={showVisionKey} setShowKey={setShowVisionKey} />
            </Section>

            <Section title="Capabilities & Biometrics">
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-300">Enable Screenshots</span>
                <input
                  type="checkbox"
                  checked={settings.enable_screenshots}
                  onChange={(e) => handleChange(null, 'enable_screenshots', e.target.checked)}
                  className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-dark-300">Use Biometrics</span>
                <input
                  type="checkbox"
                  checked={settings.use_biometrics}
                  onChange={(e) => handleChange(null, 'use_biometrics', e.target.checked)}
                  className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                />
              </div>
              {!connected && (
                <div className="mt-3 text-xs text-dark-500">Fitbit not connected. Use onboarding or Settings to connect.</div>
              )}
            </Section>

            <Section title="Email">
              <label className="block text-xs text-dark-400 mb-1">Email</label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => handleChange(null, 'email', e.target.value)}
                className={inputClass}
                placeholder="you@email.com"
              />
              <label className="block text-xs text-dark-400 mt-3 mb-1">Resend API key</label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={settings.resend_api_key || ''}
                  onChange={(e) => handleChange(null, 'resend_api_key', e.target.value)}
                  className={inputClass}
                  placeholder="re_..."
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white"
                >
                  {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Section>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full py-2.5 bg-gradient-to-r from-primary-500 to-indigo-500 text-white rounded-lg hover:from-primary-400 hover:to-indigo-400 disabled:opacity-70 flex items-center justify-center gap-2 font-medium"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Save Configuration
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const Section = ({ title, icon: Icon, children }) => (
  <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
    <div className="flex items-center gap-2 text-sm font-semibold text-white">
      {Icon ? <Icon className="w-4 h-4 text-primary-300" /> : null}
      {title}
    </div>
    {children}
  </div>
);

const ConfigFields = ({ config, onChange, showKey, setShowKey }) => (
  <div className="space-y-3">
    <div>
      <label className="block text-xs text-dark-400 mb-1">Provider</label>
      <select
        value={config.provider}
        onChange={(e) => onChange('provider', e.target.value)}
        className={inputClass}
      >
        <option value="openai">OpenAI</option>
        <option value="groq">Groq</option>
        <option value="ollama">Ollama</option>
        <option value="openrouter">OpenRouter</option>
      </select>
    </div>
    <div>
      <label className="block text-xs text-dark-400 mb-1">Model Name</label>
      <input
        type="text"
        value={config.model}
        onChange={(e) => onChange('model', e.target.value)}
        className={inputClass}
      />
    </div>
    <div>
      <label className="block text-xs text-dark-400 mb-1">API Key</label>
      <div className="relative">
        <input
          type={showKey ? 'text' : 'password'}
          value={config.api_key || ''}
          onChange={(e) => onChange('api_key', e.target.value)}
          className={inputClass}
        />
        <button
          type="button"
          onClick={() => setShowKey(!showKey)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white"
        >
          {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
    {config.provider === 'ollama' && (
      <div>
        <label className="block text-xs text-dark-400 mb-1">Base URL</label>
        <input
          type="text"
          value={config.base_url || ''}
          onChange={(e) => onChange('base_url', e.target.value)}
          className={inputClass}
          placeholder="http://localhost:11434"
        />
      </div>
    )}
  </div>
);

const inputClass = "w-full px-3 py-2 rounded-xl bg-dark-900/70 border border-white/10 text-sm text-white placeholder:text-dark-500 focus:border-primary-500/60 focus:ring-2 focus:ring-primary-500/20";

export default AgentSettings;
