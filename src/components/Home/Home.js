import React, { useState, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import Paragraphs from "../../store/Paragraphs";

export default function Home() {
  const [selectedParagraph, setSelectedParagraph] = useState("");
  const inputRef = useRef();

  const refreshSelectedParagraph = () => {
    const shuffledParagraphs = Paragraphs.sort(() => 0.5 - Math.random());
    setSelectedParagraph(shuffledParagraphs[0]);
  };

  useEffect(() => {
    refreshSelectedParagraph()
  }, []);

  const clearTextArea = () => {
    inputRef.current.value = "";
  };

  return (
    <div>
      <div className={styles.headerTitle}>Word Counter Game</div>

      <div className={styles.selectedParagraph}>{selectedParagraph}</div>

      <div className={styles.textBox}>
        <textarea
          placeholder="Enter the paragraph above..."
          className={styles.textArea}
          ref={inputRef}
        ></textarea>

        <div className={styles.textButtons}>
          <div>
            <button title="Clear text area" onClick={clearTextArea}>
              Clear
            </button>
          </div>
          <div>
            <button title="Refresh paragraph" onClick={refreshSelectedParagraph}>Refresh</button>
          </div>
        </div>
      </div>
    </div>
  );
}
