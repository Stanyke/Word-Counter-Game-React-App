const getTimeRemaining = (e) => {
  const total = Date.parse(e) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / 1000 / 60 / 60) % 24);
  return {
    total,
    hours,
    minutes,
    seconds,
  };
};

const startTimer = (e, setTimer) => {
  let { total, hours, minutes, seconds } = getTimeRemaining(e);
  if (total >= 0) {
    setTimer(
      (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
    );
  }
};

const timeCountDown = (e, setTimer, Ref) => {
  if (Ref.current) clearInterval(Ref.current);
  const id = setInterval(() => {
    startTimer(e, setTimer);
  }, 1000);
  Ref.current = id;
};

export default timeCountDown;
