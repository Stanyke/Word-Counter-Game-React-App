import React from "react";
import { toast } from "react-toastify";
import WordMatchChecker from "../helpers/WordMatchChecker";

const rejectTypingFormat = (e) => {
  toast("Copy and paste is not supported");
  e.preventDefault();
  return false;
};

export default function TextAreaBox({
  styles,
  inputRef,
  initialWordInputted,
  splittedNewParagraph,
  totalNumberOfWordsInSelectedParagraph,
  totalNumberOfWordsInCorrectWordsInSelectedParagraph,
  setTotalNumberOfWordsInCorrectWordsInSelectedParagraph,
  setInitialWordInputted,
  selectedParagraph,
  clearTextArea,
  refreshSelectedParagraph,
  disabled
}) {
  return (
    <div className={styles.textBox}>
      <textarea
        placeholder="Enter the paragraph above..."
        className={styles.textArea}
        ref={inputRef}
        onInput={() =>
          WordMatchChecker(
            inputRef,
            initialWordInputted,
            splittedNewParagraph,
            totalNumberOfWordsInSelectedParagraph,
            totalNumberOfWordsInCorrectWordsInSelectedParagraph,
            setTotalNumberOfWordsInCorrectWordsInSelectedParagraph,
            setInitialWordInputted,
            selectedParagraph
          )
        }
        onPaste={rejectTypingFormat}
        onCopy={rejectTypingFormat}
        onCut={rejectTypingFormat}
        onDrag={rejectTypingFormat}
        onDrop={rejectTypingFormat}
        disabled={disabled}
      ></textarea>

      <div className={styles.textButtons}>
        <div>
          <button title="Clear text area" onClick={clearTextArea}>
            Clear
          </button>
        </div>
        <div>
          <button title="Refresh paragraph" onClick={refreshSelectedParagraph}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
