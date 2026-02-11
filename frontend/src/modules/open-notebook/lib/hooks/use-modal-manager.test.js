import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { useModalManager } from './use-modal-manager'

describe('useModalManager', () => {
  it('should return null modal state when no params present', () => {
    const wrapper = ({ children }) =>
      React.createElement(MemoryRouter, { initialEntries: ['/test-path'] }, children)
    const { result } = renderHook(() => useModalManager(), { wrapper })

    expect(result.current.modalType).toBeNull()
    expect(result.current.modalId).toBeNull()
    expect(result.current.isOpen).toBe(false)
  })

  it('should read modal state from URL params', () => {
    const wrapper = ({ children }) =>
      React.createElement(MemoryRouter, { initialEntries: ['/test-path?modal=note&id=123'] }, children)
    const { result } = renderHook(() => useModalManager(), { wrapper })

    expect(result.current.modalType).toBe('note')
    expect(result.current.modalId).toBe('123')
    expect(result.current.isOpen).toBe(true)
  })

  it('should call router.push when opening a modal', () => {
    const wrapper = ({ children }) =>
      React.createElement(MemoryRouter, { initialEntries: ['/test-path'] }, children)
    const { result } = renderHook(() => useModalManager(), { wrapper })

    act(() => {
      result.current.openModal('source', 'abc')
    })

    expect(result.current.modalType).toBe('source')
    expect(result.current.modalId).toBe('abc')
  })

  it('should call router.push when closing a modal', () => {
    const wrapper = ({ children }) =>
      React.createElement(MemoryRouter, { initialEntries: ['/test-path?modal=note&id=123'] }, children)
    const { result } = renderHook(() => useModalManager(), { wrapper })

    act(() => {
      result.current.closeModal()
    })

    expect(result.current.isOpen).toBe(false)
  })
})
