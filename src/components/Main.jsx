import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import Footer from "./Footer";
import Timer from "./Timer";

import YourProgress from "./chart/YourProgress";
import { useQuiz } from "./contexts/QuizContexts";

function Main() {
  const { status } = useQuiz();
  return (
    <main className="main">
      {status === "loading" && <Loader />}
      {status === "failed" && <Error />}
      {status === "ready" && <Start />}
      {status === "displayRecords" && <YourProgress />}
      {status === "active" && (
        <>
          <Progress />
          <Questions />
          <Footer>
            <Timer />
            <NextButton />
          </Footer>
        </>
      )}
      {status === "finished" && <Finish />}
    </main>
  );
}

export default Main;

{
  /* <main className="main">
      {status === "loading" && <Loader />}
      {status === "failed" && <Error />}
      {status === "ready" && (
        <Start
          questionsNum={questionsNum}
          dispatch={dispatch}
          pointsRecord={pointsRecord}
          maxPoints={maxPoints}
        />
      )}

      {status === "displayRecords" && (
        <YourProgress
          points={pointsRecord.map((record) => record.points)}
          maxPoints={maxPoints}
          dispatch={dispatch}
        />
      )}

      {status === "active" && (
        <>
          <Progress
            index={index}
            numQuestions={questionsNum}
            maxPoints={maxPoints}
            points={points}
            answer={answer}
          />
          <Questions
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
            options={questions[index]}
            correctAnswer={questions[index]?.correctAnswer || ""}
            points={points}
          />
          <Footer>
            <Timer
              remainingTime={remainingTime}
              dispatch={dispatch}
              questions={questions}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              questionsNum={questionsNum}
              index={index}
            />
          </Footer>
        </>
      )}
      {status === "finished" && (
        <Finish
          points={points}
          maxPoints={maxPoints}
          highScore={highScore}
          dispatch={dispatch}
        />
      )}
    </main> */
}
