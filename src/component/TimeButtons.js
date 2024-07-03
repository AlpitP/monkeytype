import React from "react";

const TimeButtons = ({ setCurrentTime, setSelectedTime, changePara }) => {
  const onClick = (e) => {
    setSelectedTime(+e.target.innerText);
    setCurrentTime(0);
    changePara();
    e.target.blur();
  };
  return (
    <div style={{ margin: 10 }}>
      <span>Time :- </span>
      <button onClick={onClick}>15</button>
      <button onClick={onClick} style={{ margin: 20 }}>
        25
      </button>
      <button onClick={onClick}>35</button>
    </div>
  );
};

export default TimeButtons;
