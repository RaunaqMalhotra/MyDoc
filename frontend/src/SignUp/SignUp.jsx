import React, { useState } from "react";
import './SignUp.css';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:9000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate('/login');
            } else {
                console.log('Registration failed.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <div className='sign-up-page'>
            <div className='welcome-title'>We're thrilled to have you join us!</div>
            <h1 className='sign-up-title'>Sign up</h1>
            <form className='sign-up-form' onSubmit={handleSubmit}> 
                <label className='form-label'>
                    Username:
                    <input type='text' name='username' value={username} onChange={e => setUsername(e.target.value)}/>
                </label>
                <label className='form-label'>
                    Email: 
                    <input type='email' name='email' value={email} onChange={e => setEmail(e.target.value)}/>
                </label>
                <label className='form-label'>
                    Password:
                    <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
                <input className='sign-up-button' type='submit' value='Create Account' />
                <p className="sign-up-link"> Already have an account? Awesome! </p>
                <Link to='/login'><button className="sign-up-button"> Log in </button></Link>
            </form>
            <nav className="navigation"><Link to='/home'><FaHome /></Link></nav>

            <footer className='footer'>© 2023 myDoc. All rights reserved.</footer>
        </div>
    )
}

export default SignUp;
