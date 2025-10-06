import React from "react";

const Stats = ({ wpm, accuracy, timeLeft, theme }) => {
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const labelColor = theme === "dark" ? "text-gray-300" : "text-gray-500";

  return (
    <div className={`w-full max-w-5xl flex justify-around items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-xl mb-6 transition-colors duration-500`}>
      
      {/* WPM */}
      <div className="flex flex-col items-center">
        <span className={`text-sm sm:text-base ${labelColor}`}>WPM</span>
        <span className={`text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-300 ${textColor}`}>{wpm}</span>
      </div>

      {/* Accuracy */}
      <div className="flex flex-col items-center">
        <span className={`text-sm sm:text-base ${labelColor}`}>Accuracy</span>
        <span className={`text-2xl sm:text-3xl font-bold text-yellow-500 dark:text-yellow-300 ${textColor}`}>{accuracy}%</span>
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center">
        <span className={`text-sm sm:text-base ${labelColor}`}>Time</span>
        <span className={`text-2xl sm:text-3xl font-bold text-red-500 dark:text-red-400 ${textColor}`}>{timeLeft}s</span>
      </div>
    </div>
  );
};

export default Stats;
