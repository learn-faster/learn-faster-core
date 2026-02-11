import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import AgentSettings from '../components/GoalAgent/AgentSettings';

const mockAgentApi = vi.hoisted(() => ({
  settings: vi.fn(),
  status: vi.fn(),
  fitbitSummary: vi.fn(),
  fitbitRefresh: vi.fn(),
  saveSettings: vi.fn()
}));

vi.mock('../services/agent', () => ({
  agentApi: mockAgentApi
}));

vi.mock('../services/aiSettings', () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      providers: [],
      llm: { global: { provider: 'openai', model: 'gpt-4o' } },
    }),
  },
}));

describe('AgentSettings Fitbit UI', () => {
  beforeEach(() => {
    mockAgentApi.settings.mockResolvedValue({});
    mockAgentApi.saveSettings.mockResolvedValue({});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('shows Fitbit summary when connected', async () => {
    mockAgentApi.status.mockResolvedValue({ fitbit_connected: true });
    mockAgentApi.fitbitSummary.mockResolvedValue({
      readiness_score: 88,
      sleep_duration_hours: 7.2,
      sleep_efficiency: 85,
      resting_heart_rate: 60
    });

    render(<AgentSettings />);

    await waitFor(() => {
      expect(screen.getByText(/Readiness/i)).toBeInTheDocument();
    });

    expect(screen.getByText('88')).toBeInTheDocument();
    expect(screen.getByText(/Sleep:/i)).toBeInTheDocument();
    expect(screen.getByText(/Resting HR:/i)).toBeInTheDocument();
  });

  it('shows not connected message when Fitbit is disconnected', async () => {
    mockAgentApi.status.mockResolvedValue({ fitbit_connected: false });
    mockAgentApi.fitbitSummary.mockResolvedValue({});

    render(<AgentSettings />);

    await waitFor(() => {
      expect(screen.getByText(/Fitbit not connected/i)).toBeInTheDocument();
    });
  });
});
