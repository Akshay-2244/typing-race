export const getRandomParagraph = () => {
  const paragraphs = [
    `Typing is a skill that improves with practice and patience. Keep practicing daily to increase your speed and accuracy. Focus on your posture and hand placement, as it can greatly affect your typing performance.`,

    `React is a powerful library for building interactive user interfaces efficiently and with ease. Its component-based architecture allows developers to create reusable code and maintain large applications more effectively. Learning React can boost your front-end development skills significantly.`,

    `Consistent practice is key to mastering typing speed and accuracy. Challenge yourself with different paragraphs, sentences, and even coding exercises. Remember to stay relaxed, and try not to look at the keyboard while typing.`,

    `Practice makes perfect, so keep typing and improving every day. Challenge yourself with longer paragraphs, difficult words, and timed races. With dedication, your WPM and accuracy will steadily improve.`,

    `In the modern world, fast and accurate typing is a valuable skill. It can save time, improve productivity, and even boost confidence in professional settings. Use online typing challenges, games, and exercises to sharpen your skills.`,

    `Learning new things requires patience, effort, and consistency. Typing might seem simple, but perfecting your speed and accuracy is a process. Stay focused, track your progress, and aim for incremental improvements.`,

    `Effective typing is not just about speed; accuracy is equally important. Practice with varied content such as articles, stories, or coding snippets. Monitor your errors and adapt your strategy to minimize mistakes over time.`,

    `Typing races are a fun way to improve your skills under pressure. Competing against yourself or others can motivate you to type faster and more accurately. Remember to keep calm and maintain a steady rhythm while typing.`,
  ];

  return paragraphs[Math.floor(Math.random() * paragraphs.length)];
};

export const countMatchingChars = (typed, reference) => {
  let count = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === reference[i]) count++;
  }
  return count;
};
