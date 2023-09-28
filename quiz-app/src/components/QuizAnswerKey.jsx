import React from 'react'

const QuizAnswerKey = ({ score, questionsArray, selectedOptions }) => {

    console.log()
    return (
        <>
            <h1>Your score was {score}/{questionsArray.length} </h1>
            {questionsArray.map((item, index) =>
                <>
                    <br />
                    <h3>{item.content}</h3>
                    <p>{item.option1}</p>
                    <p>{item.option2}</p>
                    <p>{item.option3}</p>
                    <p>{item.option4}</p>
                    <h4>Correct :option{item.correctOption}</h4>
                    <h4>Selected :{selectedOptions[index]}</h4>
                    <br />



                </>
            )}

        </>

    )
}

export default QuizAnswerKey