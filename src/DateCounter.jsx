import React, { useReducer } from 'react';

const initailState = { count: 0, step: 1 };   // initial state
const reducer = (state, action) => {

    console.log(state, action);
    switch (action.type) {
        case "inc":
            return { ...state, count: state.count + state.step };
        case "dec":
            return { ...state, count: state.count - state.step };
        case "setStep":
            return { ...state, step: action.payload };
        case "setCount":
            return { ...state, count: action.payload };
        case "reset":
            return initailState;
        default:
            throw new Error('Unexpected action');
    }
};

export const DateCounter = () => {
    const [ state, dispatch ] = useReducer(reducer, initailState);;
    const { count, step } = state;





    {
        let date = new Date();
        date.setDate(date.getDate() + count);

        return (
            <div className="steps">
                <div className="counter">
                    <div>
                        <input
                            className="counterSteps"
                            type="range"
                            min="0"
                            max="10"
                            value={step}
                            onChange={(e) =>
                                dispatch({
                                    type: 'setStep', payload:
                                        Number(e.target.value)
                                })}
                        />
                        <p>Steps :{step}</p>
                    </div>
                    <div>
                        <button className="btn counterSteps"
                            onClick={() => dispatch({ type: "dec" })}>
                            -
                        </button>
                        <input
                            className="counterSteps"
                            type="text"
                            value={count}
                            onChange={(e) => dispatch({ type: "setCount", payload: Number(e.target.value) })} />

                        <button className="btn counterSteps"
                            onClick={() => dispatch({ type: 'inc' })}>
                            +
                        </button>
                    </div>
                    <p>
                        <span>
                            {count === 0
                                ? "Today is "
                                : count > 0
                                    ? `${count} days from today is `
                                    : `${Math.abs(count)} days ago was `}
                        </span>
                        <span>{date.toDateString()}</span>
                    </p>
                    {count !== 0 || step !== 0 ? (
                        <div>
                            <button
                                onClick={() => dispatch({ type: 'reset' })}>Rest
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
};
export default DateCounter;

