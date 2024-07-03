import React from "react";

const WordsButtons = ({
  setTotalWords,
  setCurrentTime,
  setSelectedTime,
  changePara,
}) => {
  const onClick = (e) => {
    setTotalWords(+e.target.innerText);
    setCurrentTime(0);
    setSelectedTime();
    changePara();
    e.target.blur();
  };
  return (
    <div style={{ margin: 10 }}>
      <span>Words :- </span>
      <button onClick={onClick}>10</button>
      <button onClick={onClick} style={{ margin: 20 }}>
        20
      </button>
      <button onClick={onClick}>30</button>
    </div>
  );
};

export default WordsButtons;
