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
        <h1 className='flex justify-center p-4 text-4xl bg-dark-purple'>Quiz</h1>
            <form onSubmit={submitHandler} className='flex flex-col items-center h-screen justify-center'>
                {currentQuestionIndex >= 0 && currentQuestionIndex < questionsArray.length && (
                    <div key={currentQuestionIndex} className='m-10 space-y-4 flex flex-col items-center justify-center'>
                        <h3 className=' font-extrabold  text-2xl'>Question {currentQuestionIndex + 1}</h3>
                        <p className=' text-xl'>{questionsArray[currentQuestionIndex].content}</p>
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
                <div className="flex justify-between border-red-950  w-40 h-17" >
                    <button onClick={goToPrevQuestion} disabled={currentQuestionIndex === 0} type='button' className='w-80 m-2 bg-purple border foucs:outline-none text-white border-gray-300 text-sm rounded-lg p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'>prev</button>
                    <button onClick={goToNextQuestion} disabled={currentQuestionIndex === questionsArray.length - 1} type='button' className='w-80 m-2 bg-purple border foucs:outline-none text-white border-gray-300 text-sm rounded-lg p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'>next</button>
                </div>
                <button type='submit' className='m-2 bg-dark-purple border-none outline-none text-white text-sm rounded-lg p-2.5 dark:text-white'>Submit answers</button>
            </form>
        </>
    );
};

export default Quiz;