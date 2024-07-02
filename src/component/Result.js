import React from "react";
import { useLocation } from "react-router-dom";

const Result = () => {
  const { state } = useLocation();
  const { userInput, currentTime, paragraph } = state;
  console.log(currentTime);
  const userInputWords = userInput.join("").split(" ");
  const totalWords = paragraph.split(" ");
  const totalCharacters = paragraph.split("");

  const correctChars = userInput.filter(
    (char, index) => totalCharacters[index] === char
  );

  const correctWords = userInputWords.filter(
    (word, index) => totalWords[index] === word
  );

  const incorrectChars = userInput.filter(
    (char, index) => totalCharacters[index] !== char
  );

  const grossWPM = userInputWords.length / (currentTime / 60);

  const accuracy = Math.floor(
    (correctWords.length * 100) / userInputWords.length
  );
  console.log(correctWords);
  console.log(userInputWords);
  return (
    <div className="App">
      <h1>Result</h1>
      <h3>Correct :- {correctChars.length} </h3>
      <h3>Incorrect :- {incorrectChars.length}</h3>
      <h3>WPM :- {Math.floor(grossWPM)}</h3>
      <h3>Accuracy :- {accuracy}%</h3>
    </div>
  );
};

export default Result;
