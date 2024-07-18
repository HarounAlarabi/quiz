import { useQuiz } from "./contexts/QuizContexts";

function Progress() {
  const { index, questionsNum, maxPoints, points, answer } = useQuiz();
  return (
    <header className="progress">
      <progress value={index + 1} max={questionsNum} />
      <p>
        Question <strong>{index}</strong>/{questionsNum}
      </p>
      <p>
        <strong>
          {points}/{maxPoints} points
        </strong>
      </p>
    </header>
  );
}

export default Progress;
