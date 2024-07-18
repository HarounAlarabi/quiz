import { useEffect, useReducer } from "react";
import { createContext, useContext } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  currentQuestion: null,
  highScore: 0,
  remainingTime: 20,
  pointsRecord: JSON.parse(localStorage.getItem("pointsRecord")) || [],
};

const sec_per_question = 40;

// Convert categoryPoints to loop
const categoryPoints = {};
const categories = [
  "society_and_culture",
  "science",
  "sport_and_leisure",
  "history",
  "geography",
  "arts_and_literature",
  "food_and_drink",
  "film_and_tv",
  "music",
];
categories.forEach((category) => {
  categoryPoints[category] = 10;
});
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "failed",
      };
    case "start":
      return {
        ...state,
        status: "active",
        remainingTime: state.questions.length * sec_per_question,
      };

    case "displayRecords":
      return {
        ...state,
        status: "displayRecords",
        pointsRecord: JSON.parse(localStorage.getItem("pointsRecord")),
      };

    case "newAnswer":
      const question = state.questions[state.index];
      const category = question.category;
      const points = categoryPoints[category] || 0;
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctAnswer
            ? state.points + points
            : state.points,
      };
    case "next":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      const maxPoints = state.questions.reduce(
        (total, question) => total + (categoryPoints[question.category] || 0),
        0
      );
      const percentage = (state.points / maxPoints) * 100;
      const updatedPointsRecord = [
        ...state.pointsRecord,
        { points: state.points, percentage },
      ];

      localStorage.setItem("pointsRecord", JSON.stringify(updatedPointsRecord));

      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
        pointsRecord: updatedPointsRecord,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };

    case "resetStorage":
      localStorage.removeItem("pointsRecord");
      return {
        ...initialState,
        status: "ready",
        pointsRecord: [],
      };
    case "tick":
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
        status: state.remainingTime === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unexpected action");
  }
};

function QuizProvider({ children }) {
  const [
    {
      status,
      questions,
      index,
      answer,
      points,
      highScore,
      remainingTime,
      pointsRecord,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const questionsNum = questions.length;
  const maxPoints = questions.reduce(
    (total, question) => total + (categoryPoints[question.category] || 0),
    0
  );

  useEffect(() => {
    fetch("https://the-trivia-api.com/v2/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        index,
        answer,
        points,
        highScore,
        remainingTime,
        pointsRecord,
        questionsNum,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

export { QuizProvider, useQuiz };
