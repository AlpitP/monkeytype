import { generate } from "random-words";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TimeButtons from "./TimeButtons";
import WordsButtons from "./WordsButtons";

const MonkeyType = () => {
  const [paragraph, setParagraph] = useState(generate(5).join(" "));
  const [userInput, setUserInput] = useState([]);
  const [totalWords, setTotalWords] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [custom, setCustom] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const isSpace = useRef(true);
  const navigate = useNavigate();

  const changePara = (e) => {
    const words = Math.floor(Math.random() * (10 - 5) + 5);
    const paragraph = generate(totalWords ?? words).join(" ");
    setParagraph(paragraph);
    setUserInput("");
    setCurrentTime(0);
    e && e.target.blur();
  };

  useEffect(() => {
    const input = userInput && userInput.join("").split(" ");
    for (let i = 0; i < input.length; i++) {
      if (input[i].length < paragraph.split(" ")[i].length) {
        isSpace.current = true;
      } else {
        isSpace.current = false;
      }
    }

    const chars = document.getElementsByClassName("char");
    for (let i = 0; i < chars.length; i++) {
      if (i === 0) {
        chars[i].classList.add("current");
      } else {
        chars[i].classList.remove("current");
      }
    }
  }, [userInput]);

  useEffect(() => {
    if (currentTime === selectedTime) {
      navigate("result", {
        state: { userInput, currentTime, paragraph },
      });
    }
  }, [currentTime]);

  useEffect(() => {
    totalWords && changePara();
  }, [totalWords]);

  useEffect(() => {
    const keyPressHandler = (e) => {
      const a = isSpace.current;
      if (e.code === "Backspace") {
        setUserInput((prev) => prev.slice(0, prev.length - 1));
      } else if (a === true && e.code !== "Space" && e.key !== "Meta") {
        setUserInput((pre) => [...pre, e.key]);
      } else if (a === false && e.code === "Space") {
        setUserInput((pre) => [...pre, e.key]);
      }
    };

    window.addEventListener("keyup", keyPressHandler);
    const time = setInterval(() => setCurrentTime((prev) => prev + 1), 1000);
    return () => {
      window.removeEventListener("keyup", keyPressHandler);
      clearInterval(time);
    };
  }, []);

  return (
    <div className="App">
      <h1>Typing Speed</h1>
      <div>
        <button onClick={() => setCustom("words")} style={{ margin: 20 }}>
          Words
        </button>
        <button onClick={() => setCustom("time")}>Time</button>
      </div>
      {custom === "words" && (
        <WordsButtons
          setCurrentTime={setCurrentTime}
          setTotalWords={setTotalWords}
          changePara={changePara}
        />
      )}
      {custom === "time" && (
        <TimeButtons
          setCurrentTime={setCurrentTime}
          setSelectedTime={setSelectedTime}
        />
      )}

      <div
        style={{
          marginBlock: 30,
          letterSpacing: 5,
          wordSpacing: 10,
          marginTop: "15%",
        }}
      >
        {selectedTime && <h2>{currentTime}</h2>}
        {paragraph.split("").map((char, index) => (
          <span
            key={index}
            className={
              userInput[index] === paragraph.split("")[index]
                ? "match"
                : !userInput[index]
                ? "char"
                : "not-match"
            }
          >
            {char}
          </span>
        ))}
      </div>
      {paragraph.split("").length === userInput.length &&
        navigate("result", {
          state: { userInput, currentTime, paragraph },
        })}
      <button onClick={changePara}>Refresh</button>
    </div>
  );
};

export default MonkeyType;
