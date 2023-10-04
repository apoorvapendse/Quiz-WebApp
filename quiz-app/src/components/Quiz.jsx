import React, { useEffect, useRef, useState } from 'react';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';

import { addDoc } from 'firebase/firestore';
import { app } from '../../firebase';
import QuizAnswerKey from './QuizAnswerKey';



const firestore = getFirestore(app)


const Quiz = ({ user, quizObj, adminID, quizID }) => {
    const [questionsArray, setQuestionsArray] = useState([]);
    const [quizAtempted, setQuizAttempted] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const quizScore = useRef(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);



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

    const goToNextQuestion = () => {
        if (currentQuestionIndex < questionsArray.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const goToPrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
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
            <h1 className='text-3xl font-bold underline'>Quiz</h1>
            <form onSubmit={submitHandler} style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                {currentQuestionIndex >= 0 && currentQuestionIndex < questionsArray.length && (
                    <div key={currentQuestionIndex}>
                        <h3>Question {currentQuestionIndex + 1}</h3>
                        <p>{questionsArray[currentQuestionIndex].content}</p>
                        <div className="question">
                            <label>
                                <input
                                    type="radio"
                                    name={`option${currentQuestionIndex}`}
                                    value="option1"
                                    onChange={() => handleOptionSelect(currentQuestionIndex, "option1")}
                                    checked={selectedOptions[currentQuestionIndex] === "option1"}
                                />{" "}
                                {questionsArray[currentQuestionIndex].option1}
                            </label>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name={`option${currentQuestionIndex}`}
                                    value="option2"
                                    onChange={() => handleOptionSelect(currentQuestionIndex, "option2")}
                                    checked={selectedOptions[currentQuestionIndex] === "option2"}
                                />{" "}
                                {questionsArray[currentQuestionIndex].option2}
                            </label>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name={`option${currentQuestionIndex}`}
                                    value="option3"
                                    onChange={() => handleOptionSelect(currentQuestionIndex, "option3")}
                                    checked={selectedOptions[currentQuestionIndex] === "option3"}
                                />{" "}
                                {questionsArray[currentQuestionIndex].option3}
                            </label>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name={`option${currentQuestionIndex}`}
                                    value="option4"
                                    onChange={() => handleOptionSelect(currentQuestionIndex, "option4")}
                                    checked={selectedOptions[currentQuestionIndex] === "option4"}
                                />{" "}
                                {questionsArray[currentQuestionIndex].option4}
                            </label>
                        </div>
                        <hr />
                    </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", width: "5%" }}>
                    <button onClick={goToPrevQuestion} disabled={currentQuestionIndex === 0} type='button' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded'>prev</button>
                    <button onClick={goToNextQuestion} disabled={currentQuestionIndex === questionsArray.length - 1} type='button' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded'>next</button>
                </div>
                <button type='submit' style={{ margin: "10px", padding: "10px" }}>Submit answers</button>
            </form>
        </>
    );
};

export default Quiz;