
import React from 'react';
import Options from './Options';

function Questions({ question, dispatch, answer, options, points }) {


    return (
        <div>
            <h4>{question.question.text}</h4>
            <Options
                options={options}
                dispatch={dispatch}
                answer={answer}
                questionIndex={question.index}
            />

        </div>
    );
}

export default Questions;
