import React, { useState, useEffect } from "react";
import TypingArea from "./components/TypingArea";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (newTheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 transition-all relative">
      {/* Theme toggle */}
      <div className="absolute top-5 right-5 z-50">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      {/* Header */}
      <header className="relative flex flex-col items-center justify-center pt-10 pb-6">
        <h1 className="text-5xl font-extrabold mb-2 text-gray-900 dark:text-gray-100 text-center">
          Typing Race Challenge
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 text-center">
          Test your typing speed and accuracy. Try to beat your own records!
        </p>
      </header>

      {/* Typing area */}
      <main className="flex-grow flex flex-col items-center justify-start w-full px-4 -mt-2">
        <TypingArea theme={theme} />
      </main>
    </div>
  );
}

export default App;
