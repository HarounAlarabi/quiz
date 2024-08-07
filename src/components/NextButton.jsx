import { useQuiz } from "./contexts/QuizContexts";

function NextButton() {
  const { dispatch, answer, index, questionsNum } = useQuiz();

  if (answer === null) {
    return null;
  }
  if (index < questionsNum - 1) {
    return (
      <button
        className="btn btn-next"
        onClick={() => dispatch({ type: "next" })}
      >
        Next &rarr;
      </button>
    );
  }
  return (
    <button
      className="btn btn-finish"
      onClick={() => dispatch({ type: "finish" })}
    >
      Finish
    </button>
  );
}

export default NextButton;
