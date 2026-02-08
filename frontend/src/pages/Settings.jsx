import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Watch, Bell, Brain, Save, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [connected, setConnected] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    use_biometrics: false,
    llm_config: {
      provider: 'openai',
      model: 'gpt-4o',
      base_url: '',
      api_key: ''
    },
    resend_api_key: ''
  });

  useEffect(() => {
    fetchInitialData();

    // Check if we just returned from a successful connection
    const params = new URLSearchParams(location.search);
    if (params.get('fitbit_connected') === 'true') {
      setConnected(true);
      navigate('/settings', { replace: true });
    }
  }, [location]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Fitbit Status
      const statusRes = await fetch('/api/fitbit/status');
      const statusData = await statusRes.json();
      setConnected(statusData.connected);

      // 2. Fetch Agent Settings (which now includes use_biometrics)
      const settingsRes = await fetch('/api/goals/agent/settings');
      const settingsData = await settingsRes.json();
      setSettings(prev => ({
        ...prev,
        use_biometrics: settingsData.use_biometrics || false,
        llm_config: settingsData.llm_config || prev.llm_config,
        resend_api_key: settingsData.resend_api_key || ''
      }));
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus(null);
    try {
      const response = await fetch('/api/goals/agent/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handleConnectFitbit = () => {
    window.location.href = '/api/fitbit/auth';
  };

  const handleDisconnectFitbit = async () => {
    try {
      const response = await fetch('/api/fitbit/disconnect', {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) setConnected(false);
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f1115]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100 p-8 pt-24 font-['Inter']">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              System Configuration
            </h1>
            <p className="text-gray-400 mt-2">Adjust your biological and cognitive preferences.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${saving ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20'
              }`}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Save Status Notification */}
        <AnimatePresence>
          {saveStatus && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex items-center gap-3 p-4 rounded-xl border ${saveStatus === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                }`}
            >
              {saveStatus === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              {saveStatus === 'success' ? 'Settings saved successfully' : 'Failed to save settings'}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Fitbit Section */}
          <div className="bg-[#1a1d23]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-500/10">
                <Watch className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold">Biometric Sync</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${connected ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-rose-500'}`} />
                  <span className="font-medium">{connected ? 'Fitbit Connected' : 'Disconnected'}</span>
                </div>
                {connected ? (
                  <button onClick={handleDisconnectFitbit} className="text-rose-400 hover:text-rose-300 text-sm font-medium transition-colors">
                    Disconnect
                  </button>
                ) : (
                  <button onClick={handleConnectFitbit} className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                    Connect Fitbit
                  </button>
                )}
              </div>

              {connected && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5 text-indigo-400" />
                      <div>
                        <p className="font-medium">Predictive Focus Planning</p>
                        <p className="text-xs text-gray-500">Sync study windows with sleep cycles</p>
                      </div>
                    </div>
                    <div className="relative inline-flex items-center">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.use_biometrics}
                        onChange={(e) => setSettings({ ...settings, use_biometrics: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                  </label>
                </motion.div>
              )}
            </div>
          </div>

          {/* Email Notifications */}
          <div className="bg-[#1a1d23]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-purple-500/10">
                <Bell className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Resend API Key</label>
                <input
                  type="password"
                  placeholder="re_..."
                  value={settings.resend_api_key}
                  onChange={(e) => setSettings({ ...settings, resend_api_key: e.target.value })}
                  className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Advanced Security */}
          <div className="md:col-span-2 bg-[#1a1d23]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-500/10">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-xl font-semibold">Model Preferences</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Your agent uses these settings to plan cross-domain learning paths and manage your cognitive load.
            </p>
            {/* Model settings could go here similar to AgentSettings.jsx */}
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-xs text-emerald-400/80">
              Note: More granular model parameters can be configured in the Agent terminal.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;