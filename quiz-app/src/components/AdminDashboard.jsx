import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'

import { initializeApp } from "firebase/app";
import { addDoc, collection, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { firebaseConfig as conf, app } from '../../firebase';
import QuizSetter from './QuizSetter';


const firestore = getFirestore(app);



const AdminDashboard = ({ admin }) => {

    const [quiz, setQuiz] = useState(false);


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
            console.log("Admin already exists")
        }

    }

    const addQuiz = async () => {

        setQuiz(true);
        console.log(quiz)

    }

    useEffect(() => {
        //this will create an admin if he already doesn't exist in the admins collection
        addAdmin();
    }, [])


    if (quiz == false) {

        return (
            <>
                <h1>AdminDashboard</h1>
                <button onClick={() => addQuiz()}>Create Quiz </button>
                <button onClick={() => addAdmin()}>Add Admin</button>
            </>
        )
    }
    else {
        return <QuizSetter admin={admin} />
    }

}

export default AdminDashboard
