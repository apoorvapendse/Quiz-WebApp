import React from 'react'

const QuizAnswerKey = ({ score, questionsArray, selectedOptions }) => {

    console.log()
    return (
        <>
        <h1 className='flex justify-center p-4 text-4xl'>Your score was {score}/{questionsArray.length} </h1>
        <div className='flex'>
            {questionsArray.map((item, index) =>
                <div className='ml-12 w-full sm:w-1/3'>
                    <br />
                    <h3 className='text-xl'>{item.content}</h3>
                    <p className=' italic m-2'>{index + 1}.{item.option1}</p>
                    <p className=' italic m-2'>{index + 2}.{item.option2}</p>
                    <p className=' italic m-2'>{index + 3}.{item.option3}</p>
                    <p className=' italic m-2'>{index + 4}.{item.option4}</p>
                    <h4 className='ml-2  text-green-500 font-bold'>Correct :option{item.correctOption}</h4>
                    <h4 className='ml-2' >Selected :{selectedOptions[index]}</h4>
                    <br />



                </div>
            )}

        </div>
        </>

    )
}

export default QuizAnswerKey