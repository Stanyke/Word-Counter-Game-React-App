import React, { useState, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import Paragraphs from "../../store/Paragraphs";

export default function Home() {
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
  const [timer, setTimer] = useState("10");
  const inputRef = useRef();

  const refreshSelectedParagraph = () => {
    const shuffledParagraphs = Paragraphs.sort(() => 0.5 - Math.random());
    const newParagraph = shuffledParagraphs[0];
    const splittedNewParagraph = newParagraph.split(" ");
    setSelectedParagraph(newParagraph);
    setSplittedNewParagraph(splittedNewParagraph);
    setTotalNumberOfWordsInSelectedParagraph(splittedNewParagraph.length);
    setTotalNumberOfWordsInCorrectWordsInSelectedParagraph(0);
    setSplittedNewParagraph([]);
    setInitialWordInputted("");
    clearTextArea();
  };

  const getWordsMatchedInputValue = (index) => {
    const splittedSelectedParagraph = selectedParagraph.split(" ");
    return splittedSelectedParagraph.slice(0, index).join(" ");
  };

  const checkWordMatch = () => {
    const inputValue = inputRef.current.value;
    const trimmedInputValue = inputValue.trim();
    const splittedInputValue = inputValue.split(" ");
    const currentInputValueIndex = splittedInputValue.length;
    const splittedInitialWordInputted = initialWordInputted.split(" ");
    const lastInitialWordInputted =
      splittedInitialWordInputted[splittedInitialWordInputted.length - 1];
    const wordsMatchedInputValue = getWordsMatchedInputValue(
      currentInputValueIndex
    );

    if (
      splittedNewParagraph[currentInputValueIndex - 1] ===
        splittedInputValue[currentInputValueIndex - 1] &&
      initialWordInputted.trim() !== trimmedInputValue &&
      splittedInputValue[currentInputValueIndex - 1] !== lastInitialWordInputted
    ) {
      setTotalNumberOfWordsInCorrectWordsInSelectedParagraph(
        (prev) => prev + 1
      );
      setInitialWordInputted(inputValue);
    } else if (wordsMatchedInputValue.trim() === trimmedInputValue) {
      setTotalNumberOfWordsInCorrectWordsInSelectedParagraph(
        (prev) => prev + 1
      );
      setInitialWordInputted(inputValue);
    } else if (
      inputValue !== initialWordInputted &&
      initialWordInputted &&
      splittedInitialWordInputted.length === splittedInputValue.length
    ) {
      setTotalNumberOfWordsInCorrectWordsInSelectedParagraph(
        (prev) => prev - 1
      );
      setInitialWordInputted(inputValue);
    }
  };

  useEffect(() => {
    refreshSelectedParagraph();
  }, []);

  const clearTextArea = () => {
    inputRef.current.value = "";
  };

  return (
    <div>
      <div className={styles.headerTitle}>Word Counter Game</div>

      <div className={styles.textScore}>
        <span className={styles.leftTextScore}>
          {totalNumberOfWordsInCorrectWordsInSelectedParagraph}
        </span>
        /
        <span className={styles.rightTextScore}>
          {totalNumberOfWordsInSelectedParagraph}
        </span>
      </div>

      <div className={styles.timer}>
        Time: <b>{timer}</b>
      </div>

      <div className={styles.selectedParagraph}>{selectedParagraph}</div>

      <div className={styles.textBox}>
        <textarea
          placeholder="Enter the paragraph above..."
          className={styles.textArea}
          ref={inputRef}
          onInput={checkWordMatch}
        ></textarea>

        <div className={styles.textButtons}>
          <div>
            <button title="Clear text area" onClick={clearTextArea}>
              Clear
            </button>
          </div>
          <div>
            <button
              title="Refresh paragraph"
              onClick={refreshSelectedParagraph}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
