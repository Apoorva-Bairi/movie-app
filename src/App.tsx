import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useAppSelector } from "./app/hooks";

export default function App() {
  const theme = useAppSelector((s) => s.theme.mode);

  useEffect(() => {
    const root = document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      <AppRoutes />
    </div>
  );
}