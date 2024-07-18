import { useQuiz } from "./contexts/QuizContexts";

function Finish() {
  const { points, maxPoints, highScore, dispatch } = useQuiz();
  const percentage = (points / maxPoints) * 100;

  console.log("prencentage is ", percentage);

  let result = "";
  let emoji = "";

  if (percentage < 50) {
    result = "You can do better!";
    emoji = "😢";
  } else if (percentage < 70) {
    result = "Good job!";
    emoji = "😊";
  } else if (percentage < 90) {
    result = "Great job!";
    emoji = "🎉";
  } else {
    result = "Excellent job!";
    emoji = "🥳";
  }

  console.log("points is ", points);

  return (
    <>
      <p className="result">
        <span role="img" aria-label="clap">
          👏
        </span>{" "}
        {result}{" "}
        <span role="img" aria-label="clap">
          👏
        </span>
        <br />
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">High Score: {highScore}</p>

      <button
        className="btn btn-restart "
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default Finish;
