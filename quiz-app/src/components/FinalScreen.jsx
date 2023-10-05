import React from 'react'

const FinalScreen = (props) => {


    const { adminID, quizID } = props
    console.log(adminID, quizID)

    function copyToClipboard(text) {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    };



    return (
        <>
        <main className={'flex h-screen flex-col justify-center items-center text-xl '}>
            <div className={'space-y-4 text-center'}>
            <div>FinalScreen</div>
            <p>Quiz created successfully</p>
            <p>Share this code with your friends:</p>
            <h3>{adminID}|{quizID}</h3>
            </div>
            <button className='my-12 p-3 bg-purple mx-5 ' onClick={() => copyToClipboard(`${adminID}|${quizID}`)}>Copy to Clipboard</button>
        </main>
        </>
    )
}

export default FinalScreen
