import { useState } from "react";
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FaStethoscope } from 'react-icons/fa'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:9000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate('/info');
            } else {
                console.log('Login failed.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='log-in-page'>
            <h2 className='log-in-title'> Log In </h2>
            <FaStethoscope className='stethoscope-icon' />
            <form className='log-in-form' onSubmit={handleSubmit}> 
                <label className='form-label'>
                    Username: 
                    <input type='text' name='username' value={username} onChange={e => setUsername(e.target.value)}/>
                </label>
                <label className='form-label'>
                    Password:
                    <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
                <input className='log-in-button' type='submit' value='Log In' />
                <p className="sign-up-link"> New here? Welcome! </p>
                <Link to='/signUp'><button className="log-in-button"> Sign up </button></Link>
            </form>
            <nav className="navigation"><Link to='/home'><FaHome /></Link></nav>
            <footer className='footer'>© 2023 myDoc. All rights reserved.</footer>
        </div>
    )
}

export default Login;
