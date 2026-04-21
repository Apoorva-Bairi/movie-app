import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleTheme } from "../features/movies/themeSlice";

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.theme.mode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}