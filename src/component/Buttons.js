import React from "react";

const Buttons = ({
  selectTimeButtons,
  label,
  selected,
  changeModeHandler,
  compare,
}) => {
  return (
    <div style={{ margin: 10 }}>
      <span>{label} :- </span>
      {selectTimeButtons.map((button, index) => (
        <button
          key={index}
          className={selected === button[compare] ? "selected" : ""}
          onClick={() =>
            changeModeHandler({ words: button.words, time: button.time })
          }
        >
          {button[compare]}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
