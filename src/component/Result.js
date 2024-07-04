import React from "react";

const Result = ({ totalTime, paragraph, userInput, changeParagraph }) => {
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

  const incorrectChars = userInput.length - correctChars.length;
  console.log(userInput);
  const grossWPM = userInputWords.length / (totalTime / (60 * 1000));
  console.log(grossWPM);

  const accuracy = Math.floor(
    (correctWords.length * 100) / userInputWords.length
  );

  return (
    <div className="App">
      <h1>Result</h1>
      <h3>Correct :- {correctChars.length} </h3>
      <h3>Incorrect :- {incorrectChars}</h3>
      <h3>WPM :- {Math.floor(grossWPM)}</h3>
      <h3>Accuracy :- {accuracy}%</h3>
      <button onClick={() => changeParagraph()}>Restart</button>
    </div>
  );
};

export default Result;
