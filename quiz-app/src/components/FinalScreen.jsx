import React from 'react'

const FinalScreen = (props) => {


    const { adminID, quizID } = props
    console.log(adminID, quizID)




    return (
        <main style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div>FinalScreen</div>
            <p>Quiz created successfully</p>
            <p>Share this code with your friends:</p>
            <h3>{adminID}|{quizID}</h3>
        </main>
    )
}

export default FinalScreen
