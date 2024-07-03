import React from "react";

const Result = ({ currentTime, paragraph, userInput }) => {
  console.log(userInput);
  const userInputWords = userInput.split(" ");
  const input = userInput.split("");
  const totalWords = paragraph.split(" ");
  const totalCharacters = paragraph.split("");

  const correctChars = input.filter(
    (char, index) => totalCharacters[index] === char
  );

  const correctWords = userInputWords.filter(
    (word, index) => totalWords[index] === word
  );

  const incorrectChars = input.filter(
    (char, index) => totalCharacters[index] !== char
  );

  const grossWPM = userInputWords.length / (currentTime / 60);

  const accuracy = Math.floor(
    (correctWords.length * 100) / userInputWords.length
  );

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
