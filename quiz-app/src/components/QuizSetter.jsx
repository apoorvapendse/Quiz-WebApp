import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import FinalScreen from './FinalScreen';

//this is where the options are set and then questions are rendered





const QuizSetter = ({ admin }) => {

    const [questionsCount, setQuestionsCount] = useState(0);
    const [quizName, setQuizName] = useState("");
    const [questions, setQuestions] = useState([])
    const [quizID, setQuizID] = useState();
    const [adminID, setAdminID] = useState();
    const qCount = useRef(0);
    const qName = useRef("");
    const [isQuizUpdated, setIsQuizUpdated] = useState(false);


    const firestore = getFirestore(app)

    useEffect(() => {
        console.log(quizID); // This will show the updated value of quizID
    }, [quizID]); // This useEffect will run when quizID changes


    const createQuiz = async () => {

        const quiz = await addDoc(collection(firestore, `Admins/${await getAdminID()}/Quizes`), {
            owner: admin.email,
            name: qName.current,
            totalQuestions: qCount.current
        });

        console.log(quiz.id)
        setQuizID(quiz.id);
        setQuizName(qName.current)
        setQuestionsCount(qCount.current)
    }

    const getAdminID = async () => {
        const adminRef = collection(firestore, "Admins")
        console.log(quizID)
        const adminQuery = query(adminRef, where("email", "==", `${admin.email}`));

        const queryResults = await getDocs(adminQuery);

        return queryResults.docs[0].id;

    }

    // used to add questions to firestore after clicking on submit questionaire
    const addQuestionsToQuiz = async () => {
        const adminID = await getAdminID();
        setAdminID(adminID);
        try {
            const quizDocRef = doc(firestore, `Admins/${adminID}/Quizes`, quizID);
            const quizDocSnapshot = await getDoc(quizDocRef);

            if (quizDocSnapshot.exists()) {
                const quizDetails = quizDocSnapshot.data();
                console.log(quizDetails);

                console.log("Questions before data:", questions)
                questions.splice(questions.length - 1, 1);
                const data = {
                    ...quizDetails,
                    ...questions,
                }
                console.log("data:", data)

                const updatedQuiz = await setDoc(quizDocRef, data)
                console.log(updatedQuiz);
                setIsQuizUpdated(true)

            } else {
                console.log("Quiz not found");
            }
        } catch (error) {
            console.error("Error getting quiz details:", error);
        }

    }

    const updateForm = async (e) => {
        e.preventDefault();
        const form = document.getElementById('my-form')

        //the below loop creates a currentQuestion object having size props and pushes it into the allQuestions array
        // Create an array to hold all the questions
        const allQuestions = [];

        Array.from(form.elements).forEach((element, index) => {
            if (index % 6 === 0) {
                // Create a new question object for each question
                const currentQuestion = {};
                currentQuestion.content = element.value;
                allQuestions.push(currentQuestion);
            } else {
                // Update the current question object's options and correctOption
                const currentQuestion = allQuestions[allQuestions.length - 1];
                switch (index % 6) {
                    case 1:
                        currentQuestion.option1 = element.value;
                        break;
                    case 2:
                        currentQuestion.option2 = element.value;
                        break;
                    case 3:
                        currentQuestion.option3 = element.value;
                        break;
                    case 4:
                        currentQuestion.option4 = element.value;
                        break;
                    case 5:
                        currentQuestion.correctOption = element.value;
                        break;
                }
            }
        });

        setQuestions([...allQuestions])


    }

    useEffect(() => {
        if (questions.length > 0) {
            addQuestionsToQuiz();
        }
    }, [questions]);

    if (isQuizUpdated) {
        return <FinalScreen adminID={adminID} quizID={quizID} />
    }

    const inputStyle = 'w-80 m-2 bg-purple border foucs:outline-none text-white border-gray-300 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'

    if (questionsCount <= 0) {
        return (
            <div className='flex h-screen flex-col justify-center items-center align-content-center h-'>

                <input type="number" onChange={(e) => qCount.current = +e.target.value} placeholder='Select Question Count' className="w-80 m-3 bg-purple foucs:outline-none text-white border border-gray-300  text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                <input type="text" onChange={(e) => qName.current = e.target.value} placeholder='Enter Quiz Name' className="w-80 m-8 bg-purple border foucs:outline-none text-white border-gray-300 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />

                <button
                    className='p-3 bg-purple mx-5'
                    onClick={() => {
                        createQuiz()
                    }} >Confirm</button>

            </div>
        );
    } else {
        const questionsArray = new Array(questionsCount).fill(0);

        return (
            <div>
                <h1>Quiz Name : {quizName}</h1>
                <form id='my-form'>
                    <div>
                        {questionsArray.map((item, i) => (
                            <div key={i} className='flex m-9 flex-col justify-center items-center align-content-center'>
                                <h1 className='text-xl'>Question{i + 1}</h1>
                                <input type='text' style={{ width: "70vw", height: "7vh" }} className={inputStyle}></input>
                                <br />
                                <input type="text" placeholder="Enter option value" className={inputStyle}/>
                                <br />
                                <input type="text" placeholder="Enter option value" className={inputStyle}/>
                                <br />
                                <input type="text" placeholder="Enter option value" className={inputStyle}/>
                                <br />
                                <input type="text" placeholder="Enter option value" className={inputStyle}/>
                                <br />
                                <input type="number" placeholder='Enter correct option num' style={{ margin: "12px 0px", width: '200px' }} className={inputStyle} />

                            </div>
                        ))}
                    </div>
                    <button
                        className='p-3 bg-purple mx-5 my-5'
                        onClick={updateForm}
                    >Sumbit Questionaire</button>
                </form>
            </div >
        );
    }
}

export default QuizSetter;
