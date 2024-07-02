import React from "react";

const WordsButtons = ({ setTotalWords, setCurrentTime, changePara }) => {
  const onClick = (e, value) => {
    setTotalWords(value);
    setCurrentTime(0);
    changePara();
    e.target.blur();
  };
  return (
    <div style={{ margin: 10 }}>
      <span>Words :- </span>
      <button onClick={(e) => onClick(e, 10)}>10</button>
      <button onClick={(e) => onClick(e, 20)} style={{ margin: 20 }}>
        20
      </button>
      <button onClick={(e) => onClick(e, 30)}>30</button>
    </div>
  );
};

export default WordsButtons;
