import React from "react";

export default function CountDownSetter({
  setCountDownReady,
  counterMinutesRef,
  setNumberOfMinutes,
}) {
  return (
    <div>
      <form onSubmit={setCountDownReady}>
        <input
          type="number"
          ref={counterMinutesRef}
          placeholder="Enter number of minutes"
          title="Enter number of minutes"
          min="1"
          onChange={(e) => setNumberOfMinutes(e.target.value)}
          onInput={(e) => setNumberOfMinutes(e.target.value)}
          required
        />
        <button type="submit">Start</button>
      </form>
    </div>
  );
}
