import React, { useEffect, useState } from "react";

const Results = ({ restart, stats, theme }) => {
  const [history, setHistory] = useState([]);

  // Save the current race only once on component mount
  useEffect(() => {
    const saved = localStorage.getItem("typingHistory");
    const previousHistory = saved ? JSON.parse(saved) : [];

    const raceStats = { ...stats, date: new Date().toLocaleString() };

    // Avoid duplicate if the latest saved race is same as current
    const isDuplicate =
      previousHistory.length > 0 &&
      JSON.stringify(previousHistory[0]) === JSON.stringify(raceStats);

    const newHistory = isDuplicate ? previousHistory : [raceStats, ...previousHistory];

    // Save only if not duplicate
    if (!isDuplicate) localStorage.setItem("typingHistory", JSON.stringify(newHistory));

    setHistory(newHistory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs only once

  // Clear history function
  const clearHistory = () => {
    localStorage.removeItem("typingHistory");
    setHistory([]);
  };

  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-900";

  return (
    <div className="flex flex-col items-center mt-10 px-4 w-full max-w-4xl">
      {/* Race Stats */}
      <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${textColor}`}>Race Finished!</h1>

      <div
        className={`p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-xl w-full text-center ${textColor}`}
      >
        <p className="mb-2">
          WPM: <span className="font-bold">{stats.wpm}</span>
        </p>
        <p className="mb-2">
          Accuracy: <span className="font-bold">{stats.accuracy}%</span>
        </p>
        <p className="mb-4">
          Time: <span className="font-bold">{stats.timeTaken}s</span>
        </p>
        <button
          onClick={restart}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all"
        >
          Restart
        </button>
      </div>

      {/* Recent Races Section */}
      {history.length > 0 && (
        <div
          className={`mt-6 w-full overflow-x-auto rounded-lg shadow-lg p-4 bg-gray-100 dark:bg-gray-800 relative`}
        >
          <h2 className={`text-xl font-semibold mb-2 ${textColor}`}>Recent Races</h2>

          {/* Clear History Button at top-right */}
          <button
            onClick={clearHistory}
            className="absolute top-4 right-4 px-4 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all text-sm"
          >
            Clear History
          </button>

          <table className={`w-full text-left ${textColor} mt-2`}>
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">WPM</th>
                <th className="px-4 py-2">Accuracy</th>
                <th className="px-4 py-2">Time(s)</th>
              </tr>
            </thead>
            <tbody>
              {history.map((race, idx) => (
                <tr key={idx} className="border-b border-gray-300 dark:border-gray-600">
                  <td className="px-4 py-2">{race.date}</td>
                  <td className="px-4 py-2">{race.wpm}</td>
                  <td className="px-4 py-2">{race.accuracy}%</td>
                  <td className="px-4 py-2">{race.timeTaken}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Results;
