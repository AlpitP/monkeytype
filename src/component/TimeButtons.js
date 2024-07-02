import React from "react";

const TimeButtons = ({ setCurrentTime, setSelectedTime }) => {
  const onClick = (e, value) => {
    setSelectedTime(value);
    setCurrentTime(0);
    e.target.blur();
  };
  return (
    <div style={{ margin: 10 }}>
      <span>Time :- </span>
      <button onClick={(e) => onClick(e, 15)}>15</button>
      <button onClick={(e) => onClick(e, 25)} style={{ margin: 20 }}>
        25
      </button>
      <button onClick={(e) => onClick(e, 35)}>35</button>
    </div>
  );
};

export default TimeButtons;
