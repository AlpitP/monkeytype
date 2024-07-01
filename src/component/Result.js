import React from "react";
import { useLocation } from "react-router-dom";

const Result = () => {
  const { state } = useLocation();
  const { userInput, totalTime, paragraph } = state;

  const correctChars = userInput.filter(
    (char, index) => paragraph.split("")[index] === char
  );

  const incorrectWords = userInput
    .join("")
    .split(" ")
    .filter((word, index) => paragraph.split(" ")[index] !== word);

  const incorrectChars = paragraph.split("").length - correctChars.length;

  const grossWPM = paragraph.split(" ").length / (totalTime.current / 60);
  const netWPM = Math.floor(
    grossWPM - incorrectWords.length / (totalTime.current / 60)
  );

  const accuracy = Math.floor((netWPM / grossWPM) * 100);
  return (
    <div className="App">
      <h1>Result</h1>
      <h3>Correct :- {correctChars.length} </h3>
      <h3>Incorrect :- {incorrectChars}</h3>
      <h3>WPM :- {netWPM}</h3>
      <h3>Accuracy :- {accuracy}%</h3>
    </div>
  );
};

export default Result;
