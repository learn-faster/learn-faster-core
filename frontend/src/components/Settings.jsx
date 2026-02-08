import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, X, Bot, Key, Bell, Mail, BrainCircuit, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/card';
import api from '../services/api';

/**
 * Global Settings Modal
 * 
 * Manages application-wide configuration including:
 * 1. AI Provider Settings (LLM, API Keys)
 * 2. Notification Preferences (Email, Streaks, Digests)
 */
const Settings = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('ai'); // 'ai', 'notifications', or 'biometrics'

    // AI State
    const [provider, setProvider] = useState('groq');
    const [apiKey, setApiKey] = useState('');
    const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434');
    const [model, setModel] = useState('qwen/qwen3-32b');

    // Notification State
    const [email, setEmail] = useState('');
    const [resendApiKey, setResendApiKey] = useState('');
    const [notifyDaily, setNotifyDaily] = useState(true);
    const [notifyStreak, setNotifyStreak] = useState(true);
    const [notifyDigest, setNotifyDigest] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Biometric State
    const [connected, setConnected] = useState(false);
    const [useBiometrics, setUseBiometrics] = useState(false);
    const [fitbitClientId, setFitbitClientId] = useState('');
    const [fitbitClientSecret, setFitbitClientSecret] = useState('');
    const [fitbitRedirectUri, setFitbitRedirectUri] = useState('http://localhost:5173/api/fitbit/callback');

    useEffect(() => {
        if (!isOpen) return;

        // Load AI settings from local storage
        const savedProvider = localStorage.getItem('llm_provider') || 'groq';
        const savedKey = localStorage.getItem('llm_api_key') || '';
        const savedUrl = localStorage.getItem('ollama_base_url') || 'http://localhost:11434';
        const savedModel = localStorage.getItem('llm_model') || 'qwen/qwen3-32b';

        setProvider(savedProvider);
        setApiKey(savedKey);
        setOllamaUrl(savedUrl);
        setModel(savedModel);

        // Load Notification settings & Biometrics from backend
        const fetchSettings = async () => {
            try {
                const [settingsData, statusData] = await Promise.all([
                    api.get('/goals/agent/settings'),
                    api.get('/fitbit/status')
                ]);

                if (settingsData.email) setEmail(settingsData.email);
                if (settingsData.resend_api_key) setResendApiKey(settingsData.resend_api_key);
                setNotifyDaily(settingsData.email_daily_reminder !== false);
                setNotifyStreak(settingsData.email_streak_alert !== false);
                setNotifyDigest(settingsData.email_weekly_digest !== false);
                setUseBiometrics(settingsData.use_biometrics === true);
                if (settingsData.fitbit_client_id) setFitbitClientId(settingsData.fitbit_client_id);
                if (settingsData.fitbit_client_secret) setFitbitClientSecret(settingsData.fitbit_client_secret);
                if (settingsData.fitbit_redirect_uri) setFitbitRedirectUri(settingsData.fitbit_redirect_uri);
                setConnected(statusData.connected || false);
            } catch (err) {
                console.error("Failed to load settings:", err);
            }
        };
        fetchSettings();
    }, [isOpen]);

    const handleSave = async () => {
        setIsSaving(true);

        const llmConfig = {
            provider,
            api_key: apiKey,
            model
        };

        // Only include base_url for Ollama providers
        if (provider === 'ollama' || provider === 'ollama_cloud') {
            llmConfig.base_url = ollamaUrl;
        }

        // Save AI Settings to local storage for frontend use
        localStorage.setItem('llm_provider', provider);
        localStorage.setItem('llm_api_key', apiKey);
        localStorage.setItem('ollama_base_url', ollamaUrl);
        localStorage.setItem('llm_model', model);

        // Save Notification & AI Settings to backend
        try {
            await api.post('/goals/agent/settings', {
                email,
                resend_api_key: resendApiKey,
                email_daily_reminder: notifyDaily,
                email_streak_alert: notifyStreak,
                email_weekly_digest: notifyDigest,
                use_biometrics: useBiometrics,
                fitbit_client_id: fitbitClientId,
                fitbit_client_secret: fitbitClientSecret,
                fitbit_redirect_uri: fitbitRedirectUri,
                llm_config: llmConfig
            });
            onClose();
        } catch (err) {
            console.error("Failed to save settings:", err);
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg"
            >
                <Card className="relative overflow-hidden flex flex-col max-h-[90vh]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                                <SettingsIcon className="w-6 h-6 text-primary-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Settings</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/5 text-dark-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 bg-dark-800/50 p-1 rounded-xl mb-6 shrink-0">
                        <button
                            onClick={() => setActiveTab('ai')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'ai'
                                ? 'bg-primary-500/20 text-primary-400 shadow-sm'
                                : 'text-dark-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Bot className="w-4 h-4" />
                            AI Config
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'notifications'
                                ? 'bg-primary-500/20 text-primary-400 shadow-sm'
                                : 'text-dark-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Bell className="w-4 h-4" />
                            Notifications
                        </button>
                        <button
                            onClick={() => setActiveTab('biometrics')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'biometrics'
                                ? 'bg-primary-500/20 text-primary-400 shadow-sm'
                                : 'text-dark-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <BrainCircuit className="w-4 h-4" />
                            Biometrics
                        </button>
                    </div>

                    {/* Content */}
                    <div className="overflow-y-auto pr-2 custom-scrollbar">
                        {activeTab === 'ai' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-dark-300 mb-2">Provider</label>
                                    <select
                                        value={provider}
                                        onChange={(e) => {
                                            const p = e.target.value;
                                            setProvider(p);
                                            if (p === 'openai') setModel('gpt-3.5-turbo');
                                            else if (p === 'groq') setModel('qwen/qwen3-32b');
                                            else if (p === 'ollama') setModel('llama3');
                                            else if (p === 'ollama_cloud') setModel('llama3');
                                        }}
                                        className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    >
                                        <option value="openai">OpenAI</option>
                                        <option value="groq">Groq</option>
                                        <option value="ollama">Ollama (Local)</option>
                                        <option value="ollama_cloud">Ollama (Cloud)</option>
                                    </select>
                                </div>

                                {provider !== 'ollama' && (
                                    <div>
                                        <label className="block text-sm font-medium text-dark-300 mb-2">API Key</label>
                                        <div className="relative">
                                            <Key className="absolute left-4 top-3.5 w-4 h-4 text-dark-500" />
                                            <input
                                                type="password"
                                                value={apiKey}
                                                onChange={(e) => setApiKey(e.target.value)}
                                                placeholder={`Enter ${provider === 'ollama_cloud' ? 'Ollama' : provider} API Key`}
                                                className="w-full bg-dark-800 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                )}

                                {(provider === 'ollama' || provider === 'ollama_cloud') && (
                                    <div>
                                        <label className="block text-sm font-medium text-dark-300 mb-2">Base URL</label>
                                        <input
                                            type="text"
                                            value={ollamaUrl}
                                            onChange={(e) => setOllamaUrl(e.target.value)}
                                            placeholder={provider === 'ollama' ? "http://localhost:11434" : "https://api.ollama.com"}
                                            className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-dark-300 mb-2">Model Name</label>
                                    <input
                                        type="text"
                                        value={model}
                                        onChange={(e) => setModel(e.target.value)}
                                        placeholder="e.g. gpt-4"
                                        className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4">
                                    <h4 className="flex items-center gap-2 text-primary-300 font-bold mb-2">
                                        <Bot className="w-4 h-4" />
                                        Your Agent
                                    </h4>
                                    <p className="text-sm text-primary-200/70">
                                        Configure how I should contact you to keep you on track with your goals.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-dark-300 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-3.5 w-4 h-4 text-dark-500" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full bg-dark-800 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-dark-300 mb-2">Resend API Key</label>
                                    <div className="relative">
                                        <Key className="absolute left-4 top-3.5 w-4 h-4 text-dark-500" />
                                        <input
                                            type="password"
                                            value={resendApiKey}
                                            onChange={(e) => setResendApiKey(e.target.value)}
                                            placeholder="re_..."
                                            className="w-full bg-dark-800 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                    <p className="text-[10px] text-dark-400 mt-1 ml-1 font-mono">
                                        Free at resend.com
                                    </p>
                                </div>

                                <div className="space-y-4 pt-2">
                                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Preferences</h4>

                                    <button
                                        type="button"
                                        onClick={() => setNotifyDaily(!notifyDaily)}
                                        className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                                    >
                                        <div className="text-left">
                                            <span className="block font-medium text-white group-hover:text-primary-400 transition-colors">Daily Quiz Reminder</span>
                                            <span className="text-xs text-dark-400">Get a notification when cards are due</span>
                                        </div>
                                        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${notifyDaily ? 'bg-primary-500' : 'bg-dark-700'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notifyDaily ? 'translate-x-6' : 'translate-x-0'}`} />
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setNotifyStreak(!notifyStreak)}
                                        className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                                    >
                                        <div className="text-left">
                                            <span className="block font-medium text-white group-hover:text-primary-400 transition-colors">Streak Alerts</span>
                                            <span className="text-xs text-dark-400">Warn me if I'm about to lose my streak</span>
                                        </div>
                                        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${notifyStreak ? 'bg-primary-500' : 'bg-dark-700'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notifyStreak ? 'translate-x-6' : 'translate-x-0'}`} />
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setNotifyDigest(!notifyDigest)}
                                        className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                                    >
                                        <div className="text-left">
                                            <span className="block font-medium text-white group-hover:text-primary-400 transition-colors">Weekly Digest</span>
                                            <span className="text-xs text-dark-400">Summary of progress on Sunday night</span>
                                        </div>
                                        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${notifyDigest ? 'bg-primary-500' : 'bg-dark-700'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notifyDigest ? 'translate-x-6' : 'translate-x-0'}`} />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'biometrics' && (
                            <div className="space-y-6">
                                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                                    <h4 className="flex items-center gap-2 text-indigo-300 font-bold mb-2">
                                        <Zap className="w-4 h-4" />
                                        Fitbit Sync
                                    </h4>
                                    <p className="text-sm text-indigo-200/70">
                                        Connecting your Fitbit allows the Agent to schedule your most demanding studies during your peak physiological recovery windows.
                                    </p>
                                </div>

                                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${connected ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-dark-800 border border-white/5'}`}>
                                                <Zap className={`w-6 h-6 ${connected ? 'text-emerald-400' : 'text-dark-500'}`} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">Fitbit Connection</p>
                                                <p className={`text-xs ${connected ? 'text-emerald-400' : 'text-dark-500'}`}>
                                                    {connected ? 'Device Synced' : 'Not connected'}
                                                </p>
                                            </div>
                                        </div>

                                        {!connected ? (
                                            <button
                                                onClick={() => window.location.href = '/api/fitbit/auth?user_id=default_user'}
                                                disabled={!fitbitClientId || !fitbitRedirectUri}
                                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Connect
                                            </button>
                                        ) : (
                                            <button
                                                onClick={async () => {
                                                    await api.delete('/fitbit/disconnect');
                                                    setConnected(false);
                                                }}
                                                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-bold rounded-lg transition-all border border-red-500/20"
                                            >
                                                Disconnect
                                            </button>
                                        )}
                                    </div>

                                    {!connected && (
                                        <div className="pt-4 border-t border-white/5 space-y-4">
                                            <div>
                                                <label className="block text-xs font-medium text-dark-300 mb-2 uppercase tracking-wider">Client ID</label>
                                                <input
                                                    type="text"
                                                    value={fitbitClientId}
                                                    onChange={(e) => setFitbitClientId(e.target.value)}
                                                    placeholder="ABCD12"
                                                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-dark-300 mb-2 uppercase tracking-wider">Client Secret</label>
                                                <input
                                                    type="password"
                                                    value={fitbitClientSecret}
                                                    onChange={(e) => setFitbitClientSecret(e.target.value)}
                                                    placeholder="••••••••••••••••"
                                                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-dark-300 mb-2 uppercase tracking-wider">Redirect URI</label>
                                                <input
                                                    type="text"
                                                    value={fitbitRedirectUri}
                                                    onChange={(e) => setFitbitRedirectUri(e.target.value)}
                                                    placeholder="http://localhost:5173/api/fitbit/callback"
                                                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                                                />
                                                <p className="text-[10px] text-dark-400 mt-1 ml-1">
                                                    Must match your Fitbit App settings exactly.
                                                </p>
                                            </div>
                                            <p className="text-[10px] text-indigo-300/60 leading-relaxed">
                                                Tip: Click "Save Configuration" below after entering credentials, then click "Connect".
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {connected && (
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Biometric Features</h4>
                                        <button
                                            type="button"
                                            onClick={() => setUseBiometrics(!useBiometrics)}
                                            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                                        >
                                            <div className="text-left">
                                                <span className="block font-medium text-white group-hover:text-primary-400 transition-colors">Predictive Focusing</span>
                                                <span className="text-xs text-dark-400">Optimize study sessions via sleep cycles</span>
                                            </div>
                                            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${useBiometrics ? 'bg-emerald-500' : 'bg-dark-700'}`}>
                                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${useBiometrics ? 'translate-x-6' : 'translate-x-0'}`} />
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="pt-6 mt-6 border-t border-white/5 shrink-0">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl shadow-lg shadow-primary-500/25 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Configuration
                                </>
                            )}
                        </button>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default Settings;
