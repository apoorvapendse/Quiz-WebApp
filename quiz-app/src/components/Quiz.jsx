import React, { useEffect, useState } from 'react';

const Quiz = ({ user, quizObj, adminID, quizID }) => {
    const [questionsArray, setQuestionsArray] = useState([]);

    useEffect(() => {
        const questions = [];
        for (let key in quizObj) {
            const questionObjKey = +key;

            if (!isNaN(questionObjKey)) {
                questions.push(quizObj[questionObjKey]);
            }
        }

        setQuestionsArray(questions);
    }, [quizObj]);

    return (
        <>
            <h1>Quiz</h1>
            {questionsArray.map((item, index) => (
                <div key={index}>
                    <h3>Question {index + 1}</h3>
                    <p>{item.content}</p>
                    <div className="question">
                        <label>
                            <input type="radio" name={`option${index}`} value="option1" /> {item.option1}
                        </label>
                        <br />
                        <label>
                            <input type="radio" name={`option${index}`} value="option2" /> {item.option2}
                        </label>
                        <br />
                        <label>
                            <input type="radio" name={`option${index}`} value="option3" /> {item.option3}
                        </label>
                        <br />
                        <label>
                            <input type="radio" name={`option${index}`} value="option4" /> {item.option4}
                        </label>
                    </div>
                    <hr />
                </div>
            ))}
        </>
    );
};

export default Quiz;
