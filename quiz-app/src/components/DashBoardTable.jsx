import React, { useEffect, useState } from 'react'
import './styles/DashBoardTable.css'
import { collection, getDoc, getDocs, getFirestore } from 'firebase/firestore'
import { app } from '../../firebase'

const DashBoardTable = ({ attempterCount, prevQuizes }) => {



    console.log(attempterCount, prevQuizes)









    return (
        <table >
            <tbody>

                <tr>
                    <th>Quiz Name</th>
                    <th>Total Questions</th>
                    <th>Total Attempters</th>
                </tr>
                {prevQuizes.map((item, index) =>

                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.totalQuestions}</td>
                        <td>{attempterCount[index]}</td>

                    </tr>
                )}
            </tbody>


        </table>
    )
}

export default DashBoardTable