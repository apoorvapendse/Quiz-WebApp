import React from 'react'
import firebase from 'firebase/compat/app'

import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { firebaseConfig as conf, app } from '../../firebase';


const firestore = getFirestore(app);


const AdminDashboard = ({ admin }) => {
    console.log(admin.email)
    const addQuiz = () => {
        addDoc(collection(firestore, "Quizes"), {
            owner: admin.email,
            name: "Apoorva",


        })
            .then((doc) => {
                console.log("Doc created:", doc)
            })
    }



    return (
        <>
            <h1>AdminDashboard</h1>
            <button onClick={() => addQuiz()}>Create Quiz Doc</button>
        </>
    )
}

export default AdminDashboard