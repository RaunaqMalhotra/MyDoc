import React, { useEffect, useState } from 'react';
import './Home.css'; 
import { FaHospital, FaStethoscope, FaMapMarkedAlt, FaUserAlt, FaRobot, } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const Homepage = () => {
    const titleText = "Weelcome to myDoc";
    const [title, setTitle] = useState("");

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < titleText.length) {
                setTitle((prevTitle) => prevTitle + titleText.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 100); 
    
        return () => clearInterval(timer);
    }, []);
    

    return (
        <div className='homepage'>
            <header>
                <h1 className="app-title">{title}</h1>
                <Link to="/login">
                  <button className='get-started-button'>Get Started </button>
                </Link>
            </header>

            <main>

                <section className='about-section'>
                    <h2>About Us</h2>
                    <p className="mission-statement">Our mission is to raise awareness and educate individuals about diseases. We utilize advanced AI technologies to predict potential conditions based on the symptoms you provide. We also provide information about nearby hospitals and doctors to assist you in seeking professional medical advice.</p>
                    <FaHospital className="about-icon" />
                    <FaStethoscope className="about-icon" />
                    <FaMapMarkedAlt className="about-icon" />
                </section>

                <section className='how-it-works-section'>
                    <h2>How It Works</h2>
                    <div className="step">
                        <FaUserAlt className="step-icon"/>
                        <p> Input your personal details and symptoms.</p>
                    </div>
                    <div className="step">
                        <FaRobot className="step-icon"/>
                        <p> Our AI analyzes your inputs and predicts potential conditions.</p>
                    </div>
                    <div className="step">
                        <FaHospital className="step-icon"/>
                        <p> We provide information about nearby hospitals and suggested doctors.</p>
                    </div>
                </section>
            </main>

            <footer>
                <p>© 2023 myDoc. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Homepage;


