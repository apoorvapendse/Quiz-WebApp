import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useRef, useState } from 'react'
import { app } from '../../firebase';
import Quiz from './Quiz';

const UserCodeEntry = ({ user }) => {



    const firestore = getFirestore(app)

    const admin_id = useRef(0);
    const quiz_id = useRef(0);


    const [renderQuiz, setRenderQuiz] = useState(false);
    const [quizInfo, setQuizInfo] = useState();

    const getQuiz = async () => {
        const val = document.querySelector("input").value;
        const [adminID, quizID] = val.split("|");
        admin_id.current = adminID;
        quiz_id.current = quizID


        const quizDocRef = doc(firestore, `Admins/${adminID}/Quizes`, quizID);
        const quizDocSnapshot = await getDoc(quizDocRef);

        if (quizDocSnapshot.exists()) {
            const quizDetails = quizDocSnapshot.data();
            console.log(quizDetails);
            setQuizInfo(quizDetails);
            setRenderQuiz(true)

        }
    }

    if (renderQuiz === true) {
        return <Quiz quizObj={quizInfo} user={user} adminID={admin_id.current} quizID={quiz_id.current} />


    }
    else {


        return (
            <div className='flex flex-col items-center h-screen justify-center '>
                <h1 className='flex justify-center p-6 text-4xl'>Enter Code</h1>
                <input type="text" placeholder='Enter the quiz code' className='m-3 bg-purple foucs:outline-none text-white border border-gray-300  text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white w-3/12' />
                <button onClick={getQuiz} className=' p-3 bg-purple mx-5'>Enter Quiz</button>
            </div>
        )
    }
}

export default UserCodeEntry