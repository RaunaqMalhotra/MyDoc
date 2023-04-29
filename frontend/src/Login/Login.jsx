import React from "react";
import './Login.css';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FaStethoscope } from 'react-icons/fa'; 

const Login = () => {
    return (
        <div className='log-in-page'>
            <h2 className='log-in-title'> Log In </h2>
            <FaStethoscope className='stethoscope-icon' />
            <form className='log-in-form'> 
                <label className='form-label'>
                    Username: 
                    <input type='text' name='username'/>
                </label>
                <label className='form-label'>
                    Password:
                    <input type='text' name='password'/>
                </label>
                <input className='log-in-button' type='submit' value='Log In' />
                <p className="sign-up-link"> New here? Welcome! </p>
                <p className="log-in-button"><Link to='/signUp'> Sign up </Link></p>
            </form>
            <nav className="navigation"><Link to='/home'><FaHome /></Link></nav>
            <footer className='footer'>© 2023 myDoc. All rights reserved.</footer>
        </div>
    )
}

export default Login;