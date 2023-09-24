import React, { useEffect } from 'react'
import firebase from 'firebase/compat/app'

import { initializeApp } from "firebase/app";
import { addDoc, collection, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { firebaseConfig as conf, app } from '../../firebase';


const firestore = getFirestore(app);


const AdminDashboard = ({ admin }) => {
    console.log(admin.email)


    const getAdminID = async () => {
        const adminRef = collection(firestore, "Admins")
        const adminQuery = query(adminRef, where("email", "==", `${admin.email}`));

        const queryResults = await getDocs(adminQuery);
        return queryResults.docs[0].id;
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
            console.log("Admin already exists")
        }

    }

    const addQuiz = async () => {


        const quiz = await addDoc(collection(firestore, `Admins/${await getAdminID()}/Quizes`), {
            owner: admin.email,
            name: "quizyquiz",
        })
        console.log(quiz)

    }

    useEffect(() => {
        //this will create an admin if he already doesn't exist in the admins collection
        addAdmin();
    }, [])



    return (
        <>
            <h1>AdminDashboard</h1>
            <button onClick={() => addQuiz()}>Create Quiz Doc</button>
            <button onClick={() => addAdmin()}>Add Admin</button>
        </>
    )
}

export default AdminDashboard