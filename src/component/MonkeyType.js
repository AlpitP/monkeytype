import { generate as generateParagraph } from "random-words";
import { useEffect, useRef, useState, useTransition } from "react";
import { Helmet } from "react-helmet";
import { selectTimeButtons, selectWordButtons } from "../description";
import Buttons from "./Buttons";
import Result from "./Result";
import TypingArea from "./TypingArea";

const MonkeyType = () => {
  const [userInput, setUserInput] = useState("");
  const [selectedWords, setSelectedWords] = useState(15);
  const [selectedTime, setSelectedTime] = useState(0);
  const [isStartTyping, setIsStartTyping] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const intervalRef = useRef(null);
  const [time, setTime] = useState(0);
  const [paragraph, setParagraph] = useState(
    generateParagraph(selectedWords).join(" ")
  );
  const [characterCount, setCharacterCount] = useState({
    correct: 0,
    incorrect: 0,
    correctWord: 0,
    incorrectWord: 0,
  });
  const remainingTime = useRef();

  const [, startTransition] = useTransition();

  function selectTab({ words, time }) {
    startTransition(() => {
      setSelectedWords(words);
      setSelectedTime(time);
    });
  }
  console.log(process.env.REACT_APP_ABC);

  const changeModeHandler = ({ words, time }) => {
    selectTab({ words, time });
    remainingTime.current = selectedTime;
  };

  const changeParagraph = () => {
    const paragraph = generateParagraph(selectedWords).join(" ");
    setParagraph(paragraph);
    setUserInput("");
    setCurrentWordIndex(0);
    setIsStartTyping(false);
    setTime(0);
    clearInterval(intervalRef.current);
    remainingTime.current = selectedTime;
    setCharacterCount({
      correct: 0,
      incorrect: 0,
      correctWord: 0,
      incorrectWord: 0,
    });
  };

  const keyPressHandler = (e) => {
    const currentUserInputWord = userInput.split(" ")[currentWordIndex];
    const currentParagraphWord = paragraph.split(" ")[currentWordIndex];

    const checkUserInputWordLength =
      currentUserInputWord?.length < currentParagraphWord.length;

    if (selectedTime && userInput.length > paragraph.length - 30) {
      setParagraph((prev) => prev + " " + generateParagraph(5).join(" "));
    }

    if (e.code === "Backspace" && e.altKey) {
      const words = userInput.split(" ");
      words.pop();
      setUserInput(words.join(" "));
    } else if (e.code === "Backspace") {
      setUserInput((prev) => prev.slice(0, prev.length - 1));

      if (
        currentUserInputWord[currentUserInputWord?.length - 1] ===
        currentParagraphWord[currentUserInputWord?.length - 1]
      ) {
        setCharacterCount({
          ...characterCount,
          correct: characterCount.correct - 1,
        });
      } else {
        setCharacterCount({
          ...characterCount,
          incorrect: characterCount.incorrect - 1,
        });
      }
    } else if (e.code === "Space") {
      if (!checkUserInputWordLength) {
        setUserInput((pre) => pre + e.key);

        if (currentParagraphWord === currentUserInputWord) {
          setCharacterCount({
            ...characterCount,
            correctWord: characterCount.correctWord + 1,
          });
        } else {
          setCharacterCount({
            ...characterCount,
            incorrectWord: characterCount.incorrectWord + 1,
          });
        }
      }
    } else if (checkUserInputWordLength && e.key.length === 1) {
      setUserInput((pre) => pre + e.key);

      if (!isStartTyping) {
        gameStart();
      }

      if (e.key === currentParagraphWord[currentUserInputWord?.length]) {
        setCharacterCount({
          ...characterCount,
          correct: characterCount.correct + 1,
        });
      } else {
        setCharacterCount({
          ...characterCount,
          incorrect: characterCount.incorrect + 1,
        });
      }
    }
  };

  const checkCharacter = ({ wordIndex, characterIndex }) => {
    const userEnterWord = userInput.split(" ")[wordIndex];
    const paragraphWord = paragraph.split(" ")[wordIndex];

    if (
      characterIndex === userEnterWord?.length &&
      wordIndex === currentWordIndex
    )
      return "current";

    if (
      paragraphWord[characterIndex] === userEnterWord?.split("")[characterIndex]
    ) {
      return "match";
    } else if (!userEnterWord?.split("")[characterIndex]) {
      return "char";
    } else {
      return "not-match";
    }
  };

  useEffect(() => {
    setCurrentWordIndex(userInput.split(" ").length - 1);
  }, [userInput]);

  const gameStart = () => {
    setIsStartTyping(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (selectedTime === 0 || prev < selectedTime) {
          remainingTime.current = remainingTime.current - 1;
          return prev + 1;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    changeParagraph();
  }, [selectedWords, selectedTime]);

  if (
    paragraph.length === userInput.length ||
    (selectedTime && time >= selectedTime)
  ) {
    clearInterval(intervalRef.current);
    return (
      <Result
        userInput={userInput ?? ""}
        totalTime={time}
        paragraph={paragraph}
        changeParagraph={changeParagraph}
        characterCount={characterCount}
      />
    );
  }
  return (
    <>
      <div className="App">
        <Helmet>
          <title>Monkeytype</title>
          <meta name="description" content="Monkey type"></meta>
        </Helmet>
        <h1>Typing Speed</h1>

        <Buttons
          buttonsAttributes={selectWordButtons}
          label="Words"
          selected={selectedWords}
          changeModeHandler={changeModeHandler}
          compare="words"
        />
        <Buttons
          buttonsAttributes={selectTimeButtons}
          label="Time"
          selected={selectedTime}
          changeModeHandler={changeModeHandler}
          compare="time"
        />
        <div
          style={{
            letterSpacing: 5,
          }}
        >
          <h3>
            {selectedTime
              ? `Time:-  ${
                  !isStartTyping ? selectedTime : remainingTime.current
                }`
              : "Words:- " + selectedWords}
          </h3>
          <TypingArea
            paragraph={paragraph}
            keyPressHandler={keyPressHandler}
            checkCharacter={checkCharacter}
          />
          <button onClick={changeParagraph}>Refresh</button>
        </div>
      </div>
    </>
  );
};

export default MonkeyType;
