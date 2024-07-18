import { useEffect } from "react";


function Timer({ remainingTime, dispatch, questions }) {

    const mins = Math.floor(remainingTime / 60);
    const secs = remainingTime % 60;

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: 'tick' });
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [ dispatch, questions ]);
    console.log('remainingTime', remainingTime);
    return (
        <div className="timer">
            {mins < 10 && '0'}{mins}:
            {secs < 10 && '0'}{secs}
        </div>
    );
}

export default Timer;




