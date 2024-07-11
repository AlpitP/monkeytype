import React from "react";
import { Helmet } from "react-helmet";

const Buttons = ({
  buttonsAttributes,
  label,
  selected,
  changeModeHandler,
  compare,
}) => {
  return (
    <div style={{ margin: 10 }}>
      <Helmet>
        <title>Buttons</title>
        <meta name="description" content="button" />
      </Helmet>
      <span>{label} :- </span>
      {buttonsAttributes.map((button, index) => (
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
