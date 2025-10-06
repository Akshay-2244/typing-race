import React, { useState, useEffect, useRef } from "react";
import { getRandomParagraph, countMatchingChars } from "../utils/helpers";
import Stats from "./Stats";
import Results from "./Results";

const TOTAL_TIME = 60; // 60 seconds countdown

const TypingArea = ({ theme }) => {
  const [text, setText] = useState(getRandomParagraph());
  const [typedText, setTypedText] = useState("");
  const [modifiedIndexes, setModifiedIndexes] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const containerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => containerRef.current.focus(), []);

  // Countdown timer
  useEffect(() => {
    if (isRunning && !finished) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishRace();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, finished]);

  const handleKeyDown = (e) => {
    e.preventDefault();
    const key = e.key;

    if (!isRunning) setIsRunning(true);

    if (key === "Backspace") {
      if (typedText.length > 0) setModifiedIndexes((prev) => [...prev, typedText.length - 1]);
      setTypedText((prev) => prev.slice(0, -1));
    } else if (key.length === 1) {
      setTypedText((prev) => prev + key);
    }

    // Real-time stats
    const typedLen = key === "Backspace" ? typedText.length - 1 : typedText.length + 1;
    const correctChars = countMatchingChars(
      key === "Backspace" ? typedText.slice(0, -1) : typedText + key,
      text
    );

    const elapsedMinutes = (TOTAL_TIME - timeLeft) / 60 || 1 / 60;
    setWpm(Math.round(correctChars / 5 / elapsedMinutes));
    setAccuracy(Math.round((correctChars / (typedLen || 1)) * 100));

    if (typedLen >= text.length) finishRace();
  };

  const finishRace = () => {
    setFinished(true);
    clearInterval(timerRef.current);
  };

  const restart = () => {
    setText(getRandomParagraph());
    setTypedText("");
    setModifiedIndexes([]);
    setTimeLeft(TOTAL_TIME);
    setIsRunning(false);
    setFinished(false);
    setWpm(0);
    setAccuracy(100);
    containerRef.current.focus();
  };

  if (finished)
    return (
      <Results
        restart={restart}
        stats={{ wpm, accuracy, timeTaken: TOTAL_TIME - timeLeft }}
        theme={theme}
      />
    );

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto mt-6 px-2">
      <Stats wpm={wpm} accuracy={accuracy} timeLeft={timeLeft} />

      <div
        tabIndex={0}
        ref={containerRef}
        onKeyDown={handleKeyDown}
        className="mt-4 p-6 w-full max-h-[400px] overflow-y-auto bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-2xl cursor-text text-lg sm:text-xl tracking-wide leading-relaxed"
      >
        {text.split("").map((char, idx) => {
          let colorClass = "text-gray-700 dark:text-gray-200";

          if (idx < typedText.length) {
            if (typedText[idx] === char) {
              colorClass = modifiedIndexes.includes(idx)
                ? "text-yellow-400 dark:text-yellow-300 font-bold"
                : "text-green-600 dark:text-green-300 font-bold";
            } else {
              colorClass = "text-red-600 dark:text-red-400 font-bold";
            }
          } else if (idx === typedText.length) {
            colorClass += " underline decoration-yellow-400 dark:decoration-yellow-300";
          }

          return (
            <span
              key={idx}
              className={`${colorClass} relative inline-block`}
              style={{ marginRight: char === " " ? "6px" : "2px" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>

      <button
        onClick={finishRace}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all"
      >
        Finish Race
      </button>
    </div>
  );
};

export default TypingArea;
