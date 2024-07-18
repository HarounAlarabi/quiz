import React from "react";
import Options from "./Options";
import { useQuiz } from "./contexts/QuizContexts";

function Questions() {
  const { questions, index } = useQuiz();

  const question = questions[index];

  return (
    <div>
      <h4>{question.question.text}</h4>
      <Options />
    </div>
  );
}

export default Questions;
