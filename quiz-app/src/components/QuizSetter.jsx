import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../firebase';

//this is where the options are set and then questions are rendered





const QuizSetter = ({ admin }) => {
    const getAdminID = async () => {
        const adminRef = collection(firestore, "Admins")
        const adminQuery = query(adminRef, where("email", "==", `${admin.email}`));

        const queryResults = await getDocs(adminQuery);
        return queryResults.docs[0].id;
    }

    const [questionsCount, setQuestionsCount] = useState(0);
    const [quizName, setQuizName] = useState("");
    const [questions, setQuestions] = useState([])
    const qCount = useRef(0);
    const qName = useRef("");


    const firestore = getFirestore(app)


    const createQuiz = async () => {

        const quiz = await addDoc(collection(firestore, `Admins/${await getAdminID()}/Quizes`), {
            owner: admin.email,
            name: qName.current,
            totalQuestions: qCount.current
        });
        console.log("quiz is created")
        setQuizName(qName.current)
        setQuestionsCount(qCount.current)
    }

    const updateForm = (e) => {
        e.preventDefault();
        const form = document.getElementById('my-form')

        // 👇️ if you can't add an `id` to the form
        // const form = document.querySelector('form');
        let i = 1;
        const currentQuestion = {}
        const allQuestions = []
        Array.from(form.elements).forEach((element, index) => {

            const value = element.value
            switch (index % 6) {
                case 0:
                    currentQuestion.content = element.value
                    break;

                case 1:
                    currentQuestion.option1 = element.value
                    break;
                case 2:
                    currentQuestion.option2 = element.value
                    break;
                case 3:
                    currentQuestion.option3 = element.value
                    break;
                case 4:
                    currentQuestion.option4 = element.value
                    break;
                case 5:
                    currentQuestion.correctOption = element.value;
                    allQuestions.push(currentQuestion)
                    console.log(currentQuestion.content)

                    break;



            }





        });
        setQuestions([...allQuestions])

    }

    useEffect(() => {
        //createQuiz();
    }, [])

    if (questionsCount <= 0) {
        return (
            <div>

                <input type="number" onChange={(e) => qCount.current = +e.target.value} placeholder='Select Question Count' required />
                <input type="text" onChange={(e) => qName.current = e.target.value} placeholder='Enter Quiz Name' required />
                <button
                    onClick={() => {
                        createQuiz()
                    }} >Confirm</button>

            </div>
        );
    } else {
        const questionsArray = new Array(questionsCount).fill(0);

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "50px"
                }}

            >
                <h1>Quiz Name : {quizName}</h1>
                <form id='my-form'>
                    <div>


                        {questionsArray.map((item, i) => (
                            <div key={i}>
                                <h1 >Question{i + 1}</h1>
                                <textarea name="" id="" cols="90" rows="3"></textarea>
                                <br />
                                <input type="text" placeholder="Enter option value" />
                                <br />
                                <input type="text" placeholder="Enter option value" />
                                <br />
                                <input type="text" placeholder="Enter option value" />
                                <br />
                                <input type="text" placeholder="Enter option value" />
                                <br />
                                <input type="number" placeholder='Enter correct option num' style={{ margin: "12px 0px" }} />

                            </div>
                        ))}
                    </div>
                    <button
                        style={{
                            padding: "20px"
                        }}
                        onClick={updateForm}
                    >Sumbit Questionaire</button>
                </form>
            </div >
        );
    }
}

export default QuizSetter;
