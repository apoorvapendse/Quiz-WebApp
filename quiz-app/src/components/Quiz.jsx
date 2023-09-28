import React, { useEffect, useRef, useState } from 'react';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';

import { addDoc } from 'firebase/firestore';
import { app } from '../../firebase';
import QuizAnswerKey from './QuizAnswerKey';



const firestore = getFirestore(app)


const Quiz = ({ user, quizObj, adminID, quizID }) => {
    const [questionsArray, setQuestionsArray] = useState([]);
    const [quizAtempted, setQuizAttempted] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]); // State to store selected options
    const quizScore = useRef(0);

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

    // Handle option selection
    const handleOptionSelect = (index, selectedOption) => {
        const updatedSelectedOptions = [...selectedOptions];
        updatedSelectedOptions[index] = selectedOption;
        setSelectedOptions(updatedSelectedOptions);
    };


    async function submitHandler(e) {
        e.preventDefault();
        console.log("Selected Options:", selectedOptions);
        console.log("Form is submitted");
        const optionNumbers = selectedOptions.map((item) => item.substring(6, 7))

        questionsArray.forEach((item, index) => {
            // console.log(item.content, item.correctOption, optionNumbers[index])
            if (item.correctOption == optionNumbers[index]) {
                quizScore.current += 1;
            }

        })

        console.log(`user scored:${quizScore.current}/${questionsArray.length}`)

        let score = quizScore;

        //adding score and user email in Admins/[adminID]/Quizes/[QuizID]/Attempters/
        const userScore = await addDoc(collection(firestore, `Admins/${adminID}/Quizes/${quizID}/Attempters`), {
            email: user.email,
            score: score.current
        });
        console.log(userScore)
        console.log('score uploaded successfully')
        setQuizAttempted(true);

    }

    if (quizAtempted == true) {
        return (
            <QuizAnswerKey score={quizScore.current} questionsArray={questionsArray} selectedOptions={selectedOptions} />
        )
    }
    return (
        <>
            <h1>Quiz</h1>
            <form onSubmit={submitHandler}>
                {questionsArray.map((item, index) => (
                    <div key={index}>
                        <h3>Question {index + 1}</h3>
                        <p>{item.content}</p>
                        <div className="question">
                            <label>
                                <input
                                    type="radio"
                                    name={`option${index}`}
                                    value="option1"
                                    onChange={() => handleOptionSelect(index, "option1")}
                                />{" "}
                                {item.option1}
                            </label>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name={`option${index}`}
                                    value="option2"
                                    onChange={() => handleOptionSelect(index, "option2")}
                                />{" "}
                                {item.option2}
                            </label>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name={`option${index}`}
                                    value="option3"
                                    onChange={() => handleOptionSelect(index, "option3")}
                                />{" "}
                                {item.option3}
                            </label>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name={`option${index}`}
                                    value="option4"
                                    onChange={() => handleOptionSelect(index, "option4")}
                                />{" "}
                                {item.option4}
                            </label>
                        </div>
                        <hr />
                    </div>
                ))}
                <button type='submit' style={{ margin: "10px", padding: "10px" }}>Submit answers</button>
            </form>
        </>
    );
};

export default Quiz;
