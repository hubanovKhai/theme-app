import { FaDesktop, FaMoon, FaPalette, FaSun } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

export default function Header({ engine, onToggleEngine }) {
  const { mode, theme, toggleTheme, setTheme } = useTheme()

  const renderIcon = () => {
    if (mode === 'system') return <FaDesktop />
    if (mode === 'blue') return <FaPalette />
    return theme === 'dark' ? <FaMoon /> : <FaSun />
  }

  return (
    <header
      style={{
        backgroundColor: 'var(--bg-header)',
        borderBottom: '1px solid var(--border)',
        padding: '16px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <div>
        <h1 style={{ fontSize: '20px' }}>Перемикач теми</h1>
        <small style={{ opacity: 0.8 }}>
          Режим: <strong>{mode}</strong> (активна: <strong>{theme}</strong>)
        </small>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <button onClick={toggleTheme} aria-label="Змінити тему">
          {renderIcon()}
          <span>Змінити тему</span>
        </button>

        <select
          value={mode}
          onChange={(event) => setTheme(event.target.value)}
          aria-label="Вибір теми"
        >
          <option value="light">Світла (Light)</option>
          <option value="dark">Темна (Dark)</option>
          <option value="system">Системна (System)</option>
          <option value="blue">Синя (Blue)</option>
        </select>

        {onToggleEngine && (
          <button
            onClick={onToggleEngine}
            title="Перемкнути демонстрацію Context / Zustand"
          >
            Двигун: {engine === 'context' ? 'Context API' : 'Zustand'}
          </button>
        )}
      </div>
    </header>
  )
}
