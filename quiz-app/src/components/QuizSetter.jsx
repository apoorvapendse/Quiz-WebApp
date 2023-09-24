import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../firebase';







const QuizSetter = ({ admin }) => {
    const getAdminID = async () => {
        const adminRef = collection(firestore, "Admins")
        const adminQuery = query(adminRef, where("email", "==", `${admin.email}`));

        const queryResults = await getDocs(adminQuery);
        return queryResults.docs[0].id;
    }

    const [questionsCount, setQuestionsCount] = useState(0);
    const qCount = useRef(0);


    const firestore = getFirestore(app)


    const createQuiz = async () => {


        const quiz = await addDoc(collection(firestore, `Admins/${await getAdminID()}/Quizes`), {
            owner: admin.email,
            name: "lordApoorav",
        });
        console.log("quiz is created")
    }

    useEffect(() => {
        createQuiz();
    }, [])

    if (questionsCount <= 0) {
        return (
            <div>
                <input type="number" onChange={(e) => qCount.current = +e.target.value} />
                <button onClick={() => {
                    setQuestionsCount(qCount.current);
                }}>Confirm</button>
            </div>
        );
    } else {
        const questionsArray = new Array(questionsCount).fill(0);

        return (
            <div>
                {questionsArray.map((item, i) => (
                    <>
                        <h1 key={i}>Question{i + 1}</h1>
                        <textarea name="" id="" cols="90" rows="3"></textarea>
                        <br />
                        <input type="text" placeholder="Enter option value" />
                        <br />
                        <input type="text" placeholder="Enter option value" />
                        <br />
                        <input type="text" placeholder="Enter option value" />
                        <br />
                        <input type="text" placeholder="Enter option value" />

                    </>
                ))}
            </div>
        );
    }
}

export default QuizSetter;
