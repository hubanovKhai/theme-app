import { useTheme } from './ThemeContext';

export default function Content() {
  const { theme } = useTheme();

  return (
    <main>
      <h1>Основний контент</h1>
      <p>Поточний активний режим: <strong>{theme}</strong></p>
      <p>
        Цей застосунок використовує React Context API для збереження стану теми 
        та CSS-змінні для динамічного оновлення кольорів сторінки.
      </p>
    </main>
  );
}