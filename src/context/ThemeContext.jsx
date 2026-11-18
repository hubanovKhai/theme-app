import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'

const ThemeStateContext = createContext(null)
const ThemeActionsContext = createContext(null)

function getSystemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function getInitialMode() {
  try {
    return localStorage.getItem('theme-mode') || 'light'
  } catch {
    return 'light'
  }
}

function themeReducer(state, action) {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, mode: action.payload }
    case 'TOGGLE': {
      const next = state.mode === 'dark' ? 'light' : 'dark'
      return { ...state, mode: next }
    }
    default:
      return state
  }
}

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, undefined, () => ({
    mode: getInitialMode(),
  }))

  const [systemTheme, setSystemTheme] = useState(getSystemTheme)

  useEffect(() => {
    if (!window.matchMedia) return
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event) =>
      setSystemTheme(event.matches ? 'dark' : 'light')

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === 'theme-mode' && event.newValue) {
        dispatch({ type: 'SET_THEME', payload: event.newValue })
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const resolvedTheme = state.mode === 'system' ? systemTheme : state.mode

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme
    try {
      localStorage.setItem('theme-mode', state.mode)
    } catch {}
  }, [state.mode, resolvedTheme])

  const setTheme = useCallback((newMode) => {
    dispatch({ type: 'SET_THEME', payload: newMode })
  }, [])

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE' })
  }, [])

  const stateValue = useMemo(
    () => ({
      mode: state.mode,
      theme: resolvedTheme,
    }),
    [state.mode, resolvedTheme],
  )

  const actionsValue = useMemo(
    () => ({
      setTheme,
      toggleTheme,
    }),
    [setTheme, toggleTheme],
  )

  return (
    <ThemeStateContext.Provider value={stateValue}>
      <ThemeActionsContext.Provider value={actionsValue}>
        {children}
      </ThemeActionsContext.Provider>
    </ThemeStateContext.Provider>
  )
}

export function useThemeState() {
  const context = useContext(ThemeStateContext)
  if (!context) {
    throw new Error('useThemeState потрібно викликати всередині ThemeProvider')
  }
  return context
}

export function useThemeActions() {
  const context = useContext(ThemeActionsContext)
  if (!context) {
    throw new Error('useThemeActions потрібно викликати всередині ThemeProvider')
  }
  return context
}

export function useTheme() {
  const state = useThemeState()
  const actions = useThemeActions()
  return { ...state, ...actions }
}
