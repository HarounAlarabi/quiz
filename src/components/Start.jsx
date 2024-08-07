import YourProgress from "./chart/YourProgress";

import { useQuiz } from "./contexts/QuizContexts";
function Start() {
  const { questionsNum, dispatch } = useQuiz();

  return (
    <>
      <div className="start">
        <h2>Welome to fun quiz</h2>
        <h3>Are you ready to test your knowledge?</h3>
        <h4>This quiz contains {questionsNum} questions</h4>
      </div>
      <div className="start-btn">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "start" })}
        >
          Start Quiz
        </button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "displayRecords" })}
        >
          Display Records
        </button>
      </div>
    </>
  );
}

export default Start;
