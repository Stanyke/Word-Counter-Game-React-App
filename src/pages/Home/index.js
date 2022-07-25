import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./style.module.scss";
import Paragraphs from "../../store/Paragraphs";
import TextAreaBox from "../../components/TextAreaBox";
import CountDownSetter from "../../components/CountDownSetter";
import timeCountDown from "../../helpers/Timer";

export default function Home() {
  const initialTimer = "00:00:00";
  const [selectedParagraph, setSelectedParagraph] = useState("");
  const [
    totalNumberOfWordsInSelectedParagraph,
    setTotalNumberOfWordsInSelectedParagraph,
  ] = useState(0);
  const [
    totalNumberOfWordsInCorrectWordsInSelectedParagraph,
    setTotalNumberOfWordsInCorrectWordsInSelectedParagraph,
  ] = useState(0);
  const [splittedNewParagraph, setSplittedNewParagraph] = useState([]);
  const [initialWordInputted, setInitialWordInputted] = useState("");
  const [timer, setTimer] = useState(initialTimer);
  const [numberOfMinutes, setNumberOfMinutes] = useState(null);
  const inputRef = useRef();
  const counterMinutesRef = useRef();
  const timerRef = useRef(null);

  const clearTextArea = (clearAll) => {
    if (timer !== initialTimer) {
      setTotalNumberOfWordsInCorrectWordsInSelectedParagraph(0);
      inputRef.current.value = "";
    } else if (clearAll) {
      inputRef.current.value = "";
    }
  };

  const timeDeadLine = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 60 * numberOfMinutes);
    return deadline;
  };

  const setCountDownReady = (e) => {
    e.preventDefault();
    timeCountDown(timeDeadLine(), setTimer, timerRef);
  };

  const refreshSelectedParagraph = useCallback(() => {
    const shuffledParagraphs = Paragraphs.sort(() => 0.5 - Math.random());
    const newParagraph = shuffledParagraphs[0];
    const splittedNewParagraph = newParagraph.split(" ");
    setSelectedParagraph(newParagraph);
    setSplittedNewParagraph(splittedNewParagraph);
    setTotalNumberOfWordsInSelectedParagraph(splittedNewParagraph.length);
    setTotalNumberOfWordsInCorrectWordsInSelectedParagraph(0);
    setSplittedNewParagraph([]);
    setInitialWordInputted("");
    clearTextArea(true);
    setTimer(initialTimer);
    timeCountDown(timeDeadLine(), setTimer, timerRef);
  }, []);

  useEffect(() => {
    refreshSelectedParagraph();
  }, [refreshSelectedParagraph]);

  return (
    <div>
      <div className={styles.headerTitle}>Word Counter Game</div>

      <div className={styles.timer}>
        Time: <b>{timer}</b>
        <br />
      </div>
      {timer === initialTimer ? (
        <CountDownSetter
          setCountDownReady={setCountDownReady}
          counterMinutesRef={counterMinutesRef}
          setNumberOfMinutes={setNumberOfMinutes}
        />
      ) : null}

      <div className={styles.textScore}>
        <span className={styles.leftTextScore}>
          {totalNumberOfWordsInCorrectWordsInSelectedParagraph}
        </span>
        /
        <span className={styles.rightTextScore}>
          {totalNumberOfWordsInSelectedParagraph}
        </span>
      </div>

      <div className={styles.selectedParagraph}>{selectedParagraph}</div>

      <TextAreaBox
        styles={styles}
        inputRef={inputRef}
        initialWordInputted={initialWordInputted}
        splittedNewParagraph={splittedNewParagraph}
        totalNumberOfWordsInSelectedParagraph={
          totalNumberOfWordsInSelectedParagraph
        }
        totalNumberOfWordsInCorrectWordsInSelectedParagraph={
          totalNumberOfWordsInCorrectWordsInSelectedParagraph
        }
        setTotalNumberOfWordsInCorrectWordsInSelectedParagraph={
          setTotalNumberOfWordsInCorrectWordsInSelectedParagraph
        }
        setInitialWordInputted={setInitialWordInputted}
        selectedParagraph={selectedParagraph}
        clearTextArea={clearTextArea}
        refreshSelectedParagraph={refreshSelectedParagraph}
        disabled={timer === initialTimer ? true : false}
      />
    </div>
  );
}
