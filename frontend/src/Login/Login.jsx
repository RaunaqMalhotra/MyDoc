import React from "react";
import './Login.css';
import { Link } from 'react-router-dom';
import Navigation from '../Naviagtion/Navigation';
import { FaStethoscope } from 'react-icons/fa'; 

const Login = () => {
    return (
        <div className='log-in-page'>
            <h2 className='log-in-title'> Log In for a better experience </h2>
            <FaStethoscope className='stethoscope-icon' />
            <form className='log-in-form'> 
                <label className='form-label'>
                    Email: 
                    <input type='text' name='email'/>
                </label>
                <label className='form-label'>
                    Password:
                    <input type='text' name='passowrd'/>
                </label>
                <input className='log-in-button' type='submit' value='Log In' />
                <p className="sign-up-link"> New here? Welcome! </p>
                <p className="sign-up-link"><Link to='/signUp'> Sign up </Link></p>
            </form>
            <Navigation />
            <footer className='footer'>© 2023 myDoc. All rights reserved.</footer>
        </div>
    )
}

export default Login;