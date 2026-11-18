import { useThemeState } from '../context/ThemeContext'
import { useThemeStore } from '../store/useThemeStore'

export default function Content({ engine }) {
  const { mode, theme } = useThemeState()
  const zustandTheme = useThemeStore((state) => state.theme)
  const zustandToggle = useThemeStore((state) => state.toggleTheme)

  return (
    <main
      style={{
        flex: 1,
        padding: '32px 24px',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <section
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ marginBottom: '12px' }}>Основний контент (Context API)</h2>
        <p
          style={{
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '12px',
          }}
        >
          Цей блок автоматично змінює фон, колір рамок та тексту через
          CSS-змінні, які керуються атрибутом{' '}
          <code>data-theme=&quot;{theme}&quot;</code> на тегу{' '}
          <code>&lt;html&gt;</code>.
        </p>
        <p>
          Обраний режим у налаштуваннях: <strong>{mode}</strong>. Спробуйте
          відкрити цю сторінку у другій вкладці браузера і змінити тему — обидві
          вкладки синхронізуються миттєво!
        </p>
      </section>

      {engine === 'zustand' && (
        <section
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '2px dashed var(--accent)',
            borderRadius: '12px',
            padding: '24px',
          }}
        >
          <h3 style={{ marginBottom: '10px' }}>
            Альтернативна реалізація: Zustand
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '14px' }}>
            Zustand не потребує обгортання у <code>&lt;Provider&gt;</code> і
            оновлює лише ті компоненти, які підписані на конкретне поле стану.
            Поточна тема у store: <strong>{zustandTheme}</strong>.
          </p>
          <button onClick={zustandToggle}>Перемкнути через Zustand</button>
        </section>
      )}
    </main>
  )
}
