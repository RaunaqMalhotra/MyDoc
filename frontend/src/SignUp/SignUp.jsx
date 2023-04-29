import React from "react";
import './SignUp.css';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const SignUp = () => {
    return (
        <div className='sign-up-page'>
            <div className='welcome-title'>We're thrilled to have you join us!</div>
            <h1 className='sign-up-title'>Sign up</h1>
            <form className='sign-up-form'> 
                <label className='form-label'>
                    Username:
                    <input type='text' name='username'/>
                </label>
                <label className='form-label'>
                    Email: 
                    <input type='text' name='email'/>
                </label>
                <label className='form-label'>
                    Password:
                    <input type='password' name='password'/>
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