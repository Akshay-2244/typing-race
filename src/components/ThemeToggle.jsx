import React from "react";

const ThemeToggle = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold shadow hover:scale-105 transition-all"
  >
    {theme === "dark" ? "Light Mode" : "Dark Mode"}
  </button>
);

export default ThemeToggle;
