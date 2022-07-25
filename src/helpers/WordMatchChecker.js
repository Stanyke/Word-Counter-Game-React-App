const WordMatchChecker = (
  inputRef,
  initialWordInputted,
  splittedNewParagraph,
  totalNumberOfWordsInSelectedParagraph,
  totalNumberOfWordsInCorrectWordsInSelectedParagraph,
  setTotalNumberOfWordsInCorrectWordsInSelectedParagraph,
  setInitialWordInputted,
  selectedParagraph
) => {
  const inputValue = inputRef.current.value;
  const trimmedInputValue = inputValue.trim();
  const splittedInputValue = inputValue.split(" ");
  const currentInputValueIndex = splittedInputValue.length;
  const splittedInitialWordInputted = initialWordInputted.split(" ");
  const trimmedInitialWordInputted = initialWordInputted.trim();
  const lastInputValue = inputValue.substring(
    inputValue.length - 1,
    inputValue.length
  );
  const lastInitialWordInputtedValue = initialWordInputted.substring(
    initialWordInputted.length - 1,
    initialWordInputted.length
  );
  const lastInitialWordInputted =
    splittedInitialWordInputted[splittedInitialWordInputted.length - 1];
  const wordsMatchedInputValue = getWordsMatchedInputValue(
    currentInputValueIndex,
    selectedParagraph
  );

  if (
    totalNumberOfWordsInCorrectWordsInSelectedParagraph >
    totalNumberOfWordsInSelectedParagraph
  ) {
    return true;
  }

  if (lastInputValue !== " " && lastInitialWordInputtedValue === " ") {
    setInitialWordInputted(inputValue);
  } else if (
    splittedNewParagraph[currentInputValueIndex - 1] ===
      splittedInputValue[currentInputValueIndex - 1] &&
    initialWordInputted.trim() !== trimmedInputValue &&
    splittedInputValue[currentInputValueIndex - 1] !== lastInitialWordInputted
  ) {
    setTotalNumberOfWordsInCorrectWordsInSelectedParagraph((prev) => prev + 1);
    setInitialWordInputted(inputValue);
  } else if (wordsMatchedInputValue.trim() === trimmedInputValue) {
    setTotalNumberOfWordsInCorrectWordsInSelectedParagraph((prev) => prev + 1);
    setInitialWordInputted(inputValue);
  } else if (
    inputValue !== initialWordInputted &&
    initialWordInputted &&
    splittedInitialWordInputted.length === splittedInputValue.length &&
    totalNumberOfWordsInCorrectWordsInSelectedParagraph !== 0 &&
    lastInputValue
  ) {
    setTotalNumberOfWordsInCorrectWordsInSelectedParagraph((prev) => prev - 1);
    setInitialWordInputted(inputValue);
  }
};

const getWordsMatchedInputValue = (index, selectedParagraph) => {
  const splittedSelectedParagraph = selectedParagraph.split(" ");
  return splittedSelectedParagraph.slice(0, index).join(" ");
};

export default WordMatchChecker;
