import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const Result = ({ totalTime, changeParagraph, characterCount }) => {
  console.log(characterCount);
  const wpm = characterCount.correctWord / (totalTime / 60);

  const accuracy = Math.floor(
    (characterCount.correctWord * 100) /
      (characterCount.correctWord + characterCount.incorrectWord)
  );
  return (
    <div className="App">
      <Helmet
        titleTemplate="%s | Result"
        onChangeClientState={(newState, addedTags, removedTags) =>
          console.log(newState, addedTags, removedTags)
        }
      >
        <title>Monkeytype</title>
        <meta name="description" content="Result"></meta>
        <meta name="description" content="abc"></meta>
      </Helmet>
      <h1>Result</h1>
      <h3>Correct :- {characterCount.correct} </h3>
      <h3>Incorrect :- {characterCount.incorrect}</h3>
      <h3>WPM :- {Math.floor(wpm)}</h3>
      <h3>Accuracy :- {wpm === 0 ? "0" : accuracy}%</h3>
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
