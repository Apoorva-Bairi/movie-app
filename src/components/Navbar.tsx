import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <div className="flex justify-between p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <h1 className="font-bold">MovieApp</h1>

      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <ThemeToggle />
      </div>
    </div>
  );
}