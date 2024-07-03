import { generate } from "random-words";
import { useEffect, useRef, useState } from "react";
import Result from "./Result";
import TimeButtons from "./TimeButtons";
import WordsButtons from "./WordsButtons";

const MonkeyType = () => {
  const [paragraph, setParagraph] = useState(generate(10).join(" "));
  const [index, setIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [totalWords, setTotalWords] = useState(10);
  const [selectedTime, setSelectedTime] = useState();
  const [custom, setCustom] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const isSpace = useRef(true);
  const myRef = useRef(null);

  const changePara = (e) => {
    const paragraph = generate(totalWords).join(" ");
    setParagraph(paragraph);
    setUserInput("");
    setCurrentTime(0);
    e && e.target.blur();
  };
  console.log(index);
  useEffect(() => {
    // console.log(userInput.split(" "));
    const input = userInput && userInput.split(" ");
    const wordIndex = input.length;
    if (input) {
      if (
        input[wordIndex - 1].length < paragraph.split(" ")[wordIndex - 1].length
      ) {
        isSpace.current = true;
      } else {
        isSpace.current = false;
      }
    }

    const characters = myRef.current && myRef.current.querySelectorAll(".char");
    // characters[index].style.borderLeft = "1px solid black";
    characters &&
      characters.forEach((char, index) => {
        index === 0
          ? char.classList.add("current")
          : char.classList.remove("current");
      });
  }, [userInput]);

  useEffect(() => {
    changePara();
  }, [totalWords, selectedTime]);

  useEffect(() => {
    const keyPressHandler = (e) => {
      const space = isSpace.current;
      if (e.code === "Backspace") {
        setUserInput((prev) => prev.slice(0, prev.length - 1));
        setIndex((prev) => prev > 0 && prev - 1);
      } else if (
        (space === true && e.code !== "Space" && e.key !== "Meta") ||
        (space === false && e.code === "Space")
      ) {
        setUserInput((pre) => pre + e.key);
        setIndex((prev) => prev + 1);
      }
    };
    window.addEventListener("keyup", keyPressHandler);
    return () => {
      window.removeEventListener("keyup", keyPressHandler);
    };
  }, []);

  if (
    paragraph.split("").length === userInput.split("").length ||
    currentTime === selectedTime
  ) {
    return (
      <Result
        userInput={userInput ?? ""}
        currentTime={currentTime}
        paragraph={paragraph}
      />
    );
  } else {
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
            setSelectedTime={setSelectedTime}
          />
        )}
        {custom === "time" && (
          <TimeButtons
            setCurrentTime={setCurrentTime}
            setSelectedTime={setSelectedTime}
            changePara={changePara}
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
          <div ref={myRef}>
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
        </div>
        <button onClick={changePara}>Refresh</button>
      </div>
    );
  }
};

export default MonkeyType;
