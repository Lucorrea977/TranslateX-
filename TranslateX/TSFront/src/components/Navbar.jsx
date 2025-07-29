import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 p-4 flex justify-between items-center shadow-md">
      <h1 className="text-white text-xl font-bold">TranslateX</h1>

      <div className="space-x-4 flex items-center">
        <Link to="/" className="text-white hover:underline">Texto</Link>
        <Link to="/voice" className="text-white hover:underline">Voz</Link>
        <Link to="/history" className="text-white hover:underline">Historial</Link>
        <Link to="/settings" className="text-white hover:underline">Config</Link>

        {/* Toggle Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-3 bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded"
        >
          {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
