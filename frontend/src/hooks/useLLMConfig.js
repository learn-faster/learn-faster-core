import { useState, useEffect, useCallback } from 'react';
import aiSettings from '../services/aiSettings';

/**
 * Hook for managing LLM configuration with localStorage persistence.
 * Provides centralized access to LLM settings and validation.
 * 
 * @returns {Object} LLM configuration state and helpers.
 */
const useLLMConfig = () => {
    const [provider, setProvider] = useState('openai');
    const [apiKey, setApiKey] = useState('');
    const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434');
    const [baseUrl, setBaseUrl] = useState('');
    const [model, setModel] = useState('gpt-4o-mini');
    const [isLoaded, setIsLoaded] = useState(false);
    const [providers, setProviders] = useState([]);

    const refresh = useCallback(async () => {
        try {
            const data = await aiSettings.get();
            const globalConfig = data?.llm?.global || {};
            setProvider(globalConfig.provider || 'openai');
            setApiKey(globalConfig.api_key || '');
            setModel(globalConfig.model || 'gpt-4o-mini');
            setBaseUrl(globalConfig.base_url || '');
            if (globalConfig.provider === 'ollama' && globalConfig.base_url) {
                setOllamaUrl(globalConfig.base_url);
            }
            setProviders(Array.isArray(data?.providers) ? data.providers : []);

            localStorage.setItem('llm_provider', globalConfig.provider || 'openai');
            localStorage.setItem('llm_api_key', globalConfig.api_key || '');
            localStorage.setItem('ollama_base_url', globalConfig.base_url || 'http://localhost:11434');
            localStorage.setItem('llm_model', globalConfig.model || 'gpt-4o-mini');
            localStorage.setItem('llm_base_url', globalConfig.base_url || '');
        } catch (err) {
            const savedProvider = localStorage.getItem('llm_provider') || 'openai';
            const savedKey = localStorage.getItem('llm_api_key') || '';
            const savedUrl = localStorage.getItem('ollama_base_url') || 'http://localhost:11434';
            const savedModel = localStorage.getItem('llm_model') || 'gpt-4o-mini';
            const savedBaseUrl = localStorage.getItem('llm_base_url') || '';

            setProvider(savedProvider);
            setApiKey(savedKey);
            setOllamaUrl(savedUrl);
            setModel(savedModel);
            setBaseUrl(savedBaseUrl);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Load from localStorage on mount
    useEffect(() => {
        refresh();
    }, [refresh]);

    // Check if API key is configured (Ollama doesn't need one)
    const providerMeta = providers.find((p) => p.id === provider);
    const requiresKey = providerMeta ? providerMeta.requires_api_key : provider !== 'ollama';
    const isConfigured = !requiresKey || (apiKey && apiKey.trim().length > 0);

    // Get the full config object for API calls
    const getConfig = useCallback(() => ({
        provider,
        api_key: apiKey,
        base_url: provider === 'ollama' ? ollamaUrl : baseUrl,
        model
    }), [provider, apiKey, ollamaUrl, baseUrl, model]);

    // Save all settings to localStorage
    const saveConfig = useCallback(async (newConfig) => {
        const { provider: p, apiKey: k, ollamaUrl: u, model: m, baseUrl: b } = newConfig;
        const nextProvider = p !== undefined ? p : provider;
        const nextBaseUrl = nextProvider === 'ollama' ? (u !== undefined ? u : ollamaUrl) : (b !== undefined ? b : baseUrl);

        await aiSettings.update({
            llm: {
                global: {
                    provider: nextProvider,
                    api_key: k !== undefined ? k : apiKey,
                    base_url: nextBaseUrl,
                    model: m !== undefined ? m : model
                }
            }
        });

        if (p !== undefined) setProvider(p);
        if (k !== undefined) setApiKey(k);
        if (u !== undefined) setOllamaUrl(u);
        if (m !== undefined) setModel(m);
        if (b !== undefined) setBaseUrl(b);
    }, [apiKey, baseUrl, model, ollamaUrl, provider]);

    // Quick save just the API key
    const saveApiKey = useCallback(async (key) => {
        await saveConfig({ apiKey: key });
    }, [saveConfig]);

    return {
        provider,
        apiKey,
        ollamaUrl,
        baseUrl,
        model,
        isConfigured,
        isLoaded,
        getConfig,
        saveConfig,
        saveApiKey,
        setProvider,
        setApiKey,
        setOllamaUrl,
        setBaseUrl,
        setModel,
        refresh,
        providers
    };
};

export default useLLMConfig;
