import React from 'react'
import './styles/Home.css'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div className='home'>
            <button>
                <Link to={'/admin/auth'}>

                    Admin
                </Link>
            </button>
            <button>Give Quiz</button>

        </div>
    )
}

export default Home