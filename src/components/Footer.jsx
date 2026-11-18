import { useThemeState } from '../context/ThemeContext'

export default function Footer() {
  const { theme } = useThemeState()

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        padding: '16px 24px',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '14px',
      }}
    >
      Лабораторна робота: React Context API &bull; Активна тема оформлення:{' '}
      <strong style={{ color: 'var(--text-main)' }}>
        {theme.toUpperCase()}
      </strong>
    </footer>
  )
}
