import { useTheme } from './ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <h2>Перемикач теми</h2>
      <button onClick={toggleTheme} className="theme-btn">
        {theme === 'light' ? <FaMoon /> : <FaSun />}
        <span>{theme === 'light' ? 'Темна тема' : 'Світла тема'}</span>
      </button>
    </header>
  );
}