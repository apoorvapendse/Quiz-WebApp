import React, { useEffect, useState } from 'react'
import './styles/DashBoardTable.css'
import { Firestore, collection, getDoc, getDocs, getFirestore } from 'firebase/firestore'
import { app } from '../../firebase'

const DashBoardTable = ({ attempterCount, prevQuizes, adminID, quizIDs }) => {








    const firestore = getFirestore(app)


    const convertToCSV = (data) => {
        const csvRows = [];
        const headers = Object.keys(data[0]);

        // Add headers to the CSV
        csvRows.push(headers.join(','));

        // Add data rows to the CSV
        data.forEach((row) => {
            const values = headers.map((header) => {
                const escapedValue = String(row[header]).replace(/"/g, '""');
                return `"${escapedValue}"`;
            });
            csvRows.push(values.join(','));
        });

        return csvRows.join('\n');
    };

    const downloadCSV = (data, fileName) => {
        const csvString = convertToCSV(data);
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };



    return (
        <table >
            <tbody>

                <tr>
                    <th>Quiz Name</th>
                    <th>Total Questions</th>
                    <th>Total Attempters</th>
                    <th>Quiz Code</th>
                    <th>Download CSV</th>
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
                        <td>
                            <button
                                onClick={async () => {


                                    const attempterRef = collection(firestore, `Admins/${adminID}/Quizes/${quizIDs[index]}/Attempters`)
                                    const snapshot = await getDocs(attempterRef);

                                    const currentQuizUsers = [];
                                    snapshot.forEach((item) => {

                                        currentQuizUsers.push(item.data())
                                    })
                                    console.log(currentQuizUsers)
                                    downloadCSV(currentQuizUsers, `${item.name}_users.csv`);

                                }}

                            >

                                Download CSV
                            </button>
                        </td>

                    </tr>
                )}
            </tbody>


        </table>
    )
}

export default DashBoardTable