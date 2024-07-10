import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const Result = ({ totalTime, changeParagraph, characterCount }) => {
  const wmp = characterCount.correctWord / (totalTime / 60);

  const accuracy = Math.floor(
    (characterCount.correctWord * 100) /
      (characterCount.correctWord + characterCount.incorrectWord)
  );

  return (
    <div className="App">
      <Helmet titleTemplate="%s | Result">
        <title>Monkeytype</title>
      </Helmet>
      <h1>Result</h1>
      <h3>Correct :- {characterCount.correct} </h3>
      <h3>Incorrect :- {characterCount.incorrect}</h3>
      <h3>WPM :- {Math.floor(wmp)}</h3>
      <h3>Accuracy :- {accuracy}%</h3>
      <button onClick={changeParagraph}>Restart</button>
    </div>
  );
};

Result.propTypes = {
  totalTime: PropTypes.number,
  changeParagraph: PropTypes.func,
  characterCount: PropTypes.object,
};

export default Result;
