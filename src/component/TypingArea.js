import React from "react";
import { Helmet } from "react-helmet";

const TypingArea = ({ paragraph, keyPressHandler, checkCharacter }) => {
  return (
    <div className="paragraph-container">
      <Helmet>
        <title>Typing area</title>
        <meta name="description" content="typing area" />
      </Helmet>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "90%",
          marginLeft: "5%",
        }}
      >
        {paragraph.split(" ").map((word, wordIndex) => {
          word += " ";
          return (
            <div key={wordIndex}>
              {word.split("").map((char, characterIndex) => (
                <input
                  key={characterIndex}
                  value={char}
                  readOnly
                  onKeyDown={keyPressHandler}
                  className={checkCharacter({ wordIndex, characterIndex })}
                  autoFocus
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TypingArea;
