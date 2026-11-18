import { create } from 'zustand'

const getInitialMode = () => {
  try {
    return localStorage.getItem('theme-mode') || 'light'
  } catch {
    return 'light'
  }
}

const resolveTheme = (mode) => {
  if (mode !== 'system') return mode
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export const useThemeStore = create((set) => {
  const mode = getInitialMode()

  return {
    mode,
    theme: resolveTheme(mode),

    setTheme: (newMode) => {
      const resolved = resolveTheme(newMode)
      document.documentElement.dataset.theme = resolved
      try {
        localStorage.setItem('theme-mode', newMode)
      } catch {}
      set({ mode: newMode, theme: resolved })
    },

    toggleTheme: () =>
      set((state) => {
        const nextMode = state.mode === 'dark' ? 'light' : 'dark'
        document.documentElement.dataset.theme = nextMode
        try {
          localStorage.setItem('theme-mode', nextMode)
        } catch {}
        return { mode: nextMode, theme: nextMode }
      }),
  }
})
