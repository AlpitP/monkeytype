import React from "react";

const TypingArea = ({
  paragraph,
  keyPressHandler,
  checkCharacter,
  selectedTime,
  isStartTyping,
  time,
  selectedWords,
}) => {
  return (
    <div
      style={{
        letterSpacing: 5,
      }}
    >
      <h3>
        {selectedTime
          ? `Time:-  ${!isStartTyping ? selectedTime : time}`
          : "Words:- " + selectedWords}
      </h3>
      <div className="paragraph-container">
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
    </div>
  );
};

export default TypingArea;
