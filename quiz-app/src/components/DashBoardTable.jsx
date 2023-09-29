import React, { useEffect, useState } from 'react'
import './styles/DashBoardTable.css'
import { collection, getDoc, getDocs, getFirestore } from 'firebase/firestore'
import { app } from '../../firebase'

const DashBoardTable = ({ attempterCount, prevQuizes, adminID, quizIDs }) => {



    console.log(quizIDs)









    return (
        <table >
            <tbody>

                <tr>
                    <th>Quiz Name</th>
                    <th>Total Questions</th>
                    <th>Total Attempters</th>
                    <th>Quiz Code</th>
                </tr>
                {prevQuizes.map((item, index) =>

                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.totalQuestions}</td>
                        <td>{attempterCount[index]}</td>
                        <td><button onClick={() => {
                            navigator.clipboard.writeText(`${adminID}|${quizIDs[index]}`)
                            alert("Quiz Code Copied to clipboard")
                        }}
                        >Copy</button></td>

                    </tr>
                )}
            </tbody>


        </table>
    )
}

export default DashBoardTable