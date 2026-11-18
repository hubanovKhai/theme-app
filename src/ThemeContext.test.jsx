import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Header from './components/Header'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.dataset.theme = 'light'
})

describe('ThemeContext', () => {
  test('кнопка перемикає тему на dark', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>,
    )

    const toggleButton = screen.getByRole('button', {
      name: /Змінити тему/i,
    })
    fireEvent.click(toggleButton)

    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  test('обрана тема зберігається у localStorage', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>,
    )

    const toggleButton = screen.getByRole('button', {
      name: /Змінити тему/i,
    })
    fireEvent.click(toggleButton)

    expect(localStorage.getItem('theme-mode')).toBe('dark')
  })

  test('хук useTheme кидає помилку поза ThemeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    function BrokenComponent() {
      useTheme()
      return null
    }

    expect(() => render(<BrokenComponent />)).toThrow(
      'useThemeState потрібно викликати всередині ThemeProvider',
    )

    spy.mockRestore()
  })
})
