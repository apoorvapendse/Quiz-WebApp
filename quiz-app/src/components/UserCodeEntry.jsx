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
            <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <h1>Enter Code</h1>
                <input type="text" placeholder='Enter the quiz code' className='text-center border-2 border-green-500 w-3/12' />
                <button onClick={getQuiz} className=' p-2 bg-sky-500 text-emerald-50 font-bold hover:opacity-70 m-2'>Enter Quiz</button>
            </div>
        )
    }
}

export default UserCodeEntry