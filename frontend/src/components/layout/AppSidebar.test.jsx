/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { useSidebarStore } from '@/lib/stores/sidebar-store'

// Mock Tooltip components to avoid Radix UI async issues in tests
vi.mock('@/components/ui/tooltip', () => ({
  TooltipProvider: ({ children }) => <>{children}</>,
  Tooltip: ({ children }) => <>{children}</>,
  TooltipTrigger: ({ children }) => <>{children}</>,
  TooltipContent: ({ children }) => <div>{children}</div>,
}))
vi.mock('@/lib/stores/sidebar-store', () => ({
  useSidebarStore: vi.fn()
}))
vi.mock('@/lib/hooks/use-create-dialogs', () => ({
  useCreateDialogs: () => ({
    openSourceDialog: vi.fn(),
    openNotebookDialog: vi.fn(),
    openPodcastDialog: vi.fn(),
  })
}))

const renderWithRouter = (ui) =>
  render(React.createElement(MemoryRouter, null, ui))
// But setup.ts has some basic mocks, let's see.

describe('AppSidebar', () => {
  it('renders correctly when expanded', () => {
    vi.mocked(useSidebarStore).mockReturnValue({
      isCollapsed: false,
      toggleCollapse: vi.fn(),
    })

    renderWithRouter(<AppSidebar />)
    
    // Check for logo or app name (using actual locale value)
    expect(screen.getByText(/Open Notebook/i)).toBeDefined()
    
    // Check for navigation items (using actual locale values)
    expect(screen.getByText(/Sources/i)).toBeDefined()
    expect(screen.getByText(/Notebooks/i)).toBeDefined()
  })

  it('toggles collapse state when clicking handle', () => {
    const toggleCollapse = vi.fn()
    vi.mocked(useSidebarStore).mockReturnValue({
      isCollapsed: false,
      toggleCollapse,
    })

    renderWithRouter(<AppSidebar />)
    
    // The collapse button has ChevronLeft icon when expanded
    // The collapse button has ChevronLeft icon when expanded
    // const toggleButton = screen.getAllByRole('button')[0]
    // Let's use more specific selector if possible, but AppSidebar has many buttons
    // Actually, line 147 has the button
    
    // Use data-testid for reliable selection
    fireEvent.click(screen.getByTestId('sidebar-toggle'))
    
    expect(toggleCollapse).toHaveBeenCalled()
  })

  it('shows collapsed view when isCollapsed is true', () => {
    vi.mocked(useSidebarStore).mockReturnValue({
      isCollapsed: true,
      toggleCollapse: vi.fn(),
    })

    renderWithRouter(<AppSidebar />)
    
    // In collapsed mode, app name shouldn't be visible (as text)
    expect(screen.queryByText(/Open Notebook/i)).toBeNull()
  })
})
