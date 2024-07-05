import { generate as generateParagraph } from "random-words";
import { useEffect, useRef, useState } from "react";
import Result from "./Result";
import { selectTimeButtons, selectWordButtons } from "../description";

const MonkeyType = () => {
  const [userInput, setUserInput] = useState("");
  const [selectedWords, setSelectedWords] = useState(15);
  const [paragraph, setParagraph] = useState(
    generateParagraph(selectedWords).join(" ")
  );
  const [selectedTime, setSelectedTime] = useState();
  const paragraphReference = useRef(null);
  const [time, setTime] = useState(1);
  const [isGameStart, setIsGameStart] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeParagraph = (words) => {
    const paragraph = generateParagraph(words ?? selectedWords).join(" ");
    setParagraph(paragraph);
    setUserInput("");
    setTime(1);
    setIsGameStart(false);
  };

  const changeModeHandler = (words, time) => {
    setSelectedWords(words);
    setSelectedTime(time);
    changeParagraph(words);
  };

  const keyPressHandler = (e) => {
    const add =
      userInput.split(" ")[currentWordIndex]?.length <
      paragraph.split(" ")[currentWordIndex]?.length;

    if (!isGameStart) {
      setIsGameStart(true);
    }

    if (selectedTime && userInput.length > paragraph.length - 30) {
      setParagraph((prev) => prev + generateParagraph(5).join(" "));
    }

    if (e.code === "Backspace" && e.altKey) {
      const words = userInput.trim().split(" ");
      words.pop();
      setUserInput(words.join(" ") + (words.length > 0 ? " " : ""));
    } else if (e.code === "Backspace") {
      setUserInput((prev) => prev.slice(0, prev.length - 1));
    } else if (e.code === "Space") {
      if (!add) {
        setUserInput((pre) => pre + e.key);
      }
    } else if (add && e.key.length === 1) {
      setUserInput((pre) => pre + e.key);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (isGameStart) {
      setTime(1);
      const interval = setInterval(() => {
        setTime((prev) => {
          if (prev < selectedTime) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 1000);
    }
  }, [isGameStart]);

  useEffect(() => {
    setCurrentWordIndex(userInput.split(" ").length - 1);
    // const a = document.querySelector(".active");
    // a.childNodes?.forEach((ele, index) => {
    //   if (userInput?.split(" ")[currentWordIndex]?.length === index) {
    //     ele.classList.add("current");
    //     ele.focus();
    //   } else {
    //     ele.classList.remove("current");
    //   }

    //   if (
    //     userInput?.split(" ")[currentWordIndex]?.[index] ===
    //     paragraph?.split(" ")[currentWordIndex]?.[index]
    //   ) {
    //     ele.classList.add("match");
    //   } else if (
    //     userInput?.split(" ")[currentWordIndex]?.[index] !==
    //     paragraph?.split(" ")[currentWordIndex]?.[index]
    //   ) {
    //     ele.classList.remove("match");
    //   }
    // });

    const characters = paragraphReference.current?.querySelectorAll(".char");
    characters?.forEach((char, index) => {
      if (index === 0) {
        char.classList.add("current");
        char.focus();
      } else {
        char.classList.remove("current");
      }
    });
  }, [userInput, paragraph, currentWordIndex]);

  if (paragraph.length === userInput.length || time === selectedTime) {
    return (
      <Result
        userInput={userInput ?? ""}
        totalTime={time}
        paragraph={paragraph}
        changeParagraph={changeParagraph}
      />
    );
  }
  return (
    <>
      <div className="App">
        <h1>Typing Speed</h1>
        <div style={{ margin: 10 }}>
          <span>Words :- </span>
          {selectWordButtons.map((button, index) => (
            <button
              key={index}
              className={selectedWords === button.value ? "selected" : ""}
              onClick={() => changeModeHandler(button.value)}
            >
              {button.value}
            </button>
          ))}
        </div>
        <div style={{ margin: 10 }}>
          <span>Time :- </span>
          {selectTimeButtons.map((button, index) => (
            <button
              key={index}
              className={selectedTime === button.value ? "selected" : ""}
              onClick={() => changeModeHandler(35, button.value)}
            >
              {button.value}
            </button>
          ))}
        </div>

        <div
          style={{
            letterSpacing: 5,
          }}
        >
          <h3>
            {selectedTime
              ? `Time:-  ${!isGameStart ? selectedTime : time}`
              : "Words:- " + selectedWords}
          </h3>
          <div className="paragraph-container">
            <div
              ref={paragraphReference}
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "90%",
                marginLeft: "5%",
              }}
            >
              {/* {paragraph.split(" ").map((word, i) => (
                <div key={i} className={currentWordIndex === i && "active"}>
                  {word.split("").map((char, index) => (
                    <input
                      key={index}
                      value={char}
                      readOnly
                      onKeyUp={keyPressHandler}
                    />
                  ))}
                  <input
                    type="text"
                    value=" "
                    onKeyUp={keyPressHandler}
                    readOnly
                  />
                </div>
              ))} */}
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
                />
              ))}
            </div>
          </div>
        </div>
        <button onClick={() => changeParagraph()}>Refresh</button>
      </div>
    </>
  );
};

export default MonkeyType;
