import React, { useState } from 'react';
import './styles/AdminLogin.css';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import UserCodeEntry from './UserCodeEntry';

const UserLogin = ({ user, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const signUpHandler = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setUser(user);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const loginHandler = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed in:", user);
                setUser(user);
            })
            .catch((err) => {
                console.log(err);
            });

    }
    if (user) {
        return (
            <UserCodeEntry user={user} />
        )
    }

    return (
        <div className="wrapper">
            <div className="card-switch">
                <label className="switch">
                    <input type="checkbox" className="toggle" />
                    <span className="slider"></span>
                    <span className="card-side"></span>
                    <div className="flip-card__inner">
                        <div className="flip-card__front">
                            <div className="title">Log in</div>
                            <form className="flip-card__form" onSubmit={loginHandler}>
                                <input
                                    className="flip-card__input"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    className="flip-card__input"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="flip-card__btn">Let's go!</button>
                            </form>
                        </div>
                        <div className="flip-card__back">
                            <div className="title">Sign up</div>
                            <form className="flip-card__form" onSubmit={signUpHandler}>
                                <input
                                    className="flip-card__input"
                                    placeholder="Name"
                                    type="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    className="flip-card__input"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    className="flip-card__input"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="flip-card__btn">Confirm!</button>
                            </form>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
}

export default UserLogin;
