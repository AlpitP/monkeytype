import { generate as generateParagraph } from "random-words";
import { useEffect, useState } from "react";
import { selectTimeButtons, selectWordButtons } from "../description";
import Result from "./Result";

const MonkeyType = () => {
  const [userInput, setUserInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState(15);
  const [paragraph, setParagraph] = useState(
    generateParagraph(selectedWords).join(" ")
  );
  const [selectedTime, setSelectedTime] = useState(0);
  const [time, setTime] = useState(1);
  // const [isGameStart, setIsGameStart] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const changeParagraph = () => {
    const paragraph = generateParagraph(selectedWords).join(" ");
    setParagraph(paragraph);
    setUserInput("");
    setTime();
    setCurrentIndex(0);
  };

  const changeModeHandler = (words, time) => {
    setSelectedWords(words);
    setSelectedTime(time);
  };

  const keyPressHandler = (e) => {
    const add =
      userInput.split(" ")[currentWordIndex]?.length <
      paragraph.split(" ")[currentWordIndex]?.length;

    if (userInput.length === 0) {
      setTime(1);
      gameStart();
    }

    if (selectedTime && userInput.length > paragraph.length - 30) {
      setParagraph((prev) => prev + generateParagraph(5).join(" "));
    }

    if (e.code === "Backspace" && e.altKey) {
      const words = userInput.split(" ");
      const wordLength = words?.[currentWordIndex]?.length;
      words.pop();
      setUserInput(words.join(" "));
      currentIndex > 0 &&
        setCurrentIndex((prev) =>
          currentWordIndex === 0 ? prev - wordLength : prev - wordLength - 1
        );
    } else if (e.code === "Backspace") {
      setUserInput((prev) => prev.slice(0, prev.length - 1));
      currentIndex > 0 && setCurrentIndex((prev) => prev - 1);
    } else if (e.code === "Space") {
      if (!add) {
        setUserInput((pre) => pre + e.key);
        currentIndex >= 0 && setCurrentIndex((prev) => prev + 1);
      }
    } else if (add && e.key.length === 1) {
      setUserInput((pre) => pre + e.key);
      currentIndex >= 0 && setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    changeParagraph();
  }, [selectedWords, selectedTime]);

  const gameStart = () => {
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
  };

  // useEffect(() => {
  //   if (isGameStart) {
  //     setTime(1);
  //     const interval = setInterval(() => {
  //       setTime((prev) => {
  //         if (prev < selectedTime) {
  //           return prev + 1;
  //         } else {
  //           clearInterval(interval);
  //           return prev;
  //         }
  //       });
  //     }, 1000);
  //   }
  // }, [isGameStart]);

  useEffect(() => {
    setCurrentWordIndex(userInput.split(" ").length - 1);

    const characters = document.querySelectorAll(".char");
    characters?.forEach((char, index) => {
      if (index === currentIndex) {
        char.classList.add("current");
        char.focus();
      } else {
        char.classList.remove("current");
      }

      if (userInput?.[index] === paragraph[index]) {
        char.classList.add("match");
      } else if (!userInput?.[index]) {
        char.classList.remove("not-match");
        char.classList.remove("match");
      } else {
        char.classList.remove("match");
        char.classList.add("not-match");
      }
    });
  }, [userInput, paragraph]);

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
              onClick={() => changeModeHandler(button.value, button.time)}
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
              onClick={() => changeModeHandler(button.words, button.value)}
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
              ? `Time:-  ${userInput.length === 0 ? selectedTime : time}`
              : "Words:- " + selectedWords}
          </h3>
          <div className="paragraph-container">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "90%",
                marginLeft: "5%",
              }}
            >
              {paragraph.split(" ").map((word, i) => (
                <div key={i}>
                  {word.split("").map((char, index) => (
                    <input
                      key={index}
                      value={char}
                      readOnly
                      onKeyDown={keyPressHandler}
                      className="char"
                    />
                  ))}
                  <input
                    onKeyDown={keyPressHandler}
                    className="char"
                    readOnly
                    value=" "
                  />
                </div>
              ))}
              {/* {paragraph.split("").map((char, index) => (
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
              ))} */}
            </div>
          </div>
        </div>
        <button onClick={changeParagraph}>Refresh</button>
      </div>
    </>
  );
};

export default MonkeyType;
