import { useEffect, useState } from "react";

function Options({ dispatch, answer, options }) {
  const [newOptions, setShuffledOptions] = useState([]);
  const correctAnswer = options.correctAnswer;

  // console.log(correctAnswer);
  const answered = answer !== null;

  console.log("categoryPoints", options.correctAnswer);
  const incorrectAnswers = [...options.incorrectAnswers];
  useEffect(() => {
    const newOptions = shuffle([
      ...(options.incorrectAnswers || []),
      options.correctAnswer,
    ]);

    setShuffledOptions(newOptions);
  }, [options]);

  return (
    <div className="options">
      {newOptions.map((option, index) => (
        <button
          key={index}
          className={`btn btn-option
                    ${option === answer ? "answer" : ""}
                    ${
                      answered
                        ? option === correctAnswer
                          ? "correct"
                          : "wrong"
                        : ""
                    } `}
          disabled={answered}
          onClick={() => dispatch({ type: "newAnswer", payload: option })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default Options;
