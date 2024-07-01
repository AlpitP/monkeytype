import { useEffect, useRef, useState } from "react";
import { createRandomString } from "../container";
import { useNavigate } from "react-router-dom";

const MonkeyType = () => {
  const [paragraph, setParagraph] = useState(createRandomString(5, 7));
  const [userInput, setUserInput] = useState([]);
  const totalTime = useRef(0);
  const navigate = useNavigate();

  const changePara = () => {
    const wordLength = Math.floor(Math.random() * (5 - 3) + 3);
    const words = Math.floor(Math.random() * (10 - 5) + 5);
    const paragraph = createRandomString(wordLength, words);
    setParagraph(paragraph);
    setUserInput("");
    totalTime.current = 0;
  };
  useEffect(() => {
    const a = document.getElementsByClassName("char");
    for (let i = 0; i < a.length; i++) {
      if (i === 0) {
        a[i].classList.add("a");
      } else {
        a[i].classList.remove("a");
      }
    }
    console.log(paragraph.split(" ")[0]);
    console.log(userInput.join("").split(" ")[0]);
  });
  useEffect(() => {
    const keyPressHandler = (e) => {
      if (e.code === "Backspace") {
        setUserInput((prev) => prev.slice(0, prev.length - 1));
      } else {
        setUserInput((pre) => [...pre, e.key]);
      }
    };

    window.addEventListener("keyup", keyPressHandler);
    const time = setInterval(
      () => (totalTime.current = totalTime.current + 1),
      1000
    );
    return () => {
      window.removeEventListener("keyup", keyPressHandler);
      clearInterval(time);
    };
  }, []);

  return (
    <div className="App">
      <h1>Typing Speed</h1>
      <div
        style={{
          marginBlock: 30,
          letterSpacing: 5,
          wordSpacing: 10,
          marginTop: "18%",
        }}
      >
        {paragraph.split("").map((char, index) => {
          return (
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
          );
        })}
      </div>
      {paragraph.split("").length === userInput.length &&
        navigate("result", {
          state: { userInput, totalTime, paragraph },
        })}
      <button onClick={changePara}>Refresh</button>
    </div>
  );
};

export default MonkeyType;
