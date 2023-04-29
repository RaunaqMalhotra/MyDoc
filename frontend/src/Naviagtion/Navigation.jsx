import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaNotesMedical, FaChartBar } from 'react-icons/fa';
import './Navigation.css';

const Navigation = () => {
    return (
        <nav className='navigation'>
            <Link to='/home'><FaHome /></Link>
            <Link to='/symptoms'><FaNotesMedical /></Link>
            <Link to='/results'><FaChartBar /></Link>
        </nav>
    );
};

export default Navigation;
