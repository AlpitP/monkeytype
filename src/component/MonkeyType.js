import { generate as generateParagraph } from "random-words";
import { useEffect, useRef, useState } from "react";
import Result from "./Result";

const MonkeyType = () => {
  const [userInput, setUserInput] = useState("");
  const [selectedWords, setSelectedWords] = useState(15);
  const [paragraph, setParagraph] = useState(
    generateParagraph(selectedWords).join(" ")
  );
  const [selectedTime, setSelectedTime] = useState();
  const paragraphReference = useRef(null);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState();
  const [isGameStart, setIsGameStart] = useState(false);

  const changeParagraph = (words) => {
    const paragraph = generateParagraph(words ?? selectedWords).join(" ");
    setParagraph(paragraph);
    setUserInput("");
    setRemainingTime(selectedTime);
    setIsGameStart(false);
  };
  const clickHandler = (words, time) => {
    setSelectedWords(words);
    setSelectedTime(time);
    changeParagraph(words);
  };

  const keyPressHandler = (e) => {
    const add =
      userInput.split(" ")[currentWordIndex - 1].length <
      paragraph.split(" ")[currentWordIndex - 1].length;

    if (!userInput) {
      setIsGameStart(true);
    }

    if (e.code === "Backspace") {
      setUserInput((prev) => prev.slice(0, prev.length - 1));
    } else if (
      ((!userInput || add) && e.code !== "Space" && e.key !== "Meta") ||
      (!add && e.code === "Space")
    ) {
      setUserInput((pre) => pre + e.key);
    }
  };

  useEffect(() => {
    if (isGameStart) {
      const time = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime((prev) => prev - 1);
        }
      }, 1000);
      return () => clearInterval(time);
    }
  }, [startTime, remainingTime]);

  useEffect(() => {
    if (isGameStart) {
      setStartTime(Date.now());
      setRemainingTime(selectedTime);
    }
  }, [isGameStart]);

  useEffect(() => {
    setCurrentWordIndex(userInput.split(" ").length);
    if (userInput.length === paragraph.length || remainingTime === 0) {
      setEndTime(Date.now());
    }
    if (selectedTime) {
      if (userInput.length > paragraph.length - 30) {
        setParagraph((prev) => prev + generateParagraph(5).join(" "));
      }
    }

    const characters =
      paragraphReference.current &&
      paragraphReference.current.querySelectorAll(".char");
    characters &&
      characters.forEach((char, index) => {
        if (index === 0) {
          char.classList.add("current");
          char.focus();
        } else {
          char.classList.remove("current");
        }
      });
  }, [userInput, paragraph, remainingTime]);

  if (paragraph.length === userInput.length || remainingTime === 0) {
    return (
      <Result
        userInput={userInput ?? ""}
        totalTime={endTime - startTime}
        paragraph={paragraph}
        changeParagraph={changeParagraph}
      />
    );
  } else {
    return (
      <div className="App">
        <h1>Typing Speed</h1>
        <div style={{ margin: 10 }}>
          <span>Words :- </span>
          <button onClick={() => clickHandler(15)}>15</button>
          <button onClick={() => clickHandler(25)}>25</button>
          <button onClick={() => clickHandler(50)}>50</button>
          <button onClick={() => clickHandler(100)}>100</button>
        </div>
        <div style={{ margin: 10 }}>
          <span>Time :- </span>
          <button onClick={() => clickHandler(35, 15)}>15</button>
          <button onClick={() => clickHandler(35, 30)}>30</button>
          <button onClick={() => clickHandler(35, 60)}>60</button>
          <button onClick={() => clickHandler(35, 120)}>120</button>
        </div>

        <div
          style={{
            letterSpacing: 5,
          }}
        >
          <h3>
            {selectedTime
              ? `Time:-  ${!isGameStart ? selectedTime : remainingTime}`
              : "Words:- " + selectedWords}
          </h3>
          <div
            ref={paragraphReference}
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "90%",
              marginLeft: "5%",
            }}
          >
            {paragraph.split("").map((char, index) => (
              <input
                key={index}
                className={
                  userInput[index] === paragraph[index]
                    ? "match"
                    : !userInput[index]
                    ? "char"
                    : "not-match"
                }
                value={char}
                onKeyUp={keyPressHandler}
                readOnly
                autoFocus
              />
            ))}
          </div>
        </div>
        <button onClick={() => changeParagraph()}>Refresh</button>
      </div>
    );
  }
};
export default MonkeyType;
