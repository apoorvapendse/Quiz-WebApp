import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'

import { initializeApp } from "firebase/app";
import { addDoc, collection, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { firebaseConfig as conf, app } from '../../firebase';
import QuizSetter from './QuizSetter';
import DashBoardTable from './DashBoardTable';


const firestore = getFirestore(app);



const AdminDashboard = ({ admin }) => {

    const [quiz, setQuiz] = useState(false);
    const [previousQuizes, setPreviousQuizes] = useState([]);
    const [previousQuizIds, setPreviousQuizIds] = useState([])




    const [adminID, setAdminID] = useState();



    const [attempterCount, setAttempterCount] = useState([])

    const getAttemptersLength = async () => {


        const prevPlayerCountPerQuiz = []
        previousQuizIds.forEach(async (item) => {



            const UserRef = collection(firestore, `Admins/${adminID}/Quizes/${item}/Attempters`);
            const prevAttempters = await getDocs(UserRef);

            prevPlayerCountPerQuiz.push(prevAttempters.docs.length)

            setAttempterCount(prevPlayerCountPerQuiz)
            console.log(attempterCount)


        })

    }

    useEffect(() => {
        getAttemptersLength();
    }, [previousQuizIds])



    const getAdminID = async () => {
        const adminRef = collection(firestore, "Admins")

        const adminQuery = query(adminRef, where("email", "==", `${admin.email}`));

        const queryResults = await getDocs(adminQuery);

        setAdminID(queryResults.docs[0].id);

    }

    const getPreviousQuizes = async (adminID) => {
        const quizRef = collection(firestore, `Admins/${adminID}/Quizes`);
        const previousQuizesCollection = await getDocs(quizRef);

        const allQuizes = []
        const allQuizIDs = []

        previousQuizesCollection.forEach((item) => allQuizes.push(item.data()))
        previousQuizesCollection.forEach((item) => allQuizIDs.push(item.id))

        setPreviousQuizes(allQuizes)
        setPreviousQuizIds(allQuizIDs)
    }

    const addAdmin = async () => {

        const adminRef = collection(firestore, "Admins")
        const adminQuery = query(adminRef, where("email", "==", `${admin.email}`));

        const queryResults = await getDocs(adminQuery);

        if (queryResults.size == 0) {
            const newAdmin = await addDoc(collection(firestore, "Admins"), {
                email: admin.email
            })

            console.log("Admin created:", newAdmin);
        }
        else {
            console.log("Admin already exists", queryResults.docs[0].id)
            getPreviousQuizes(queryResults.docs[0].id)
            //if admin already exists then we will fetch all the previous quizes set by him


        }

    }

    const addQuiz = async () => {

        setQuiz(true);
        console.log(quiz)

    }

    useEffect(() => {
        console.log("useeff called")
        //this will create an admin if he already doesn't exist in the admins collection
        addAdmin();
        // console.log(admin)
        getAdminID();

    }, [])


    if (quiz == false) {

        return (
            <>
                <h1>AdminDashboard</h1>
                <button onClick={() => addQuiz()}>Create Quiz </button>
                <button onClick={() => addAdmin()}>Add Admin</button>

                <DashBoardTable attempterCount={attempterCount} prevQuizes={previousQuizes} />

            </>
        )
    }
    else {
        return <QuizSetter admin={admin} />
    }

}

export default AdminDashboard
