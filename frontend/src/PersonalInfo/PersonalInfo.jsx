import React, { useEffect, useState } from 'react';
import './PersonalInfo.css';
import Navigation from '../Naviagtion/Navigation';
const PersonalInfo = () => {
    const [location, setLocation] = useState({});
    const [locationClicked, setLocationClicked] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        }
    }, []);

    const handleLocationClick = () => {
        setLocationClicked(true);
    }

    return (
        <div className='personal-info-page'>
            <div className='top-text'>Your Health is Our Priority</div>
            <h1 className='personal-info-title'>Enter Personal Information</h1>
            <form className='personal-info-form'>
                <label className='form-label'>
                    Full Name: 
                    <input type='text' name='name' />
                </label>
                <label className='form-label'>
                    Age: 
                    <input type='number' name='age' min='0' />
                </label>
                <label className='form-label'>
                    Height (in cm): 
                    <input type='number' name='height' min='0' />
                </label>
                <label className='form-label'>
                    Weight (in kg): 
                    <input type='number' name='weight' min='0' />
                </label>
                <label className='form-label'>
                    Gender:
                    <select name='gender'>
                        <option value=''>Select...</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='other'>Other</option>
                    </select>
                </label>
                <label className='form-label'>
                    Race: 
                    <select name='race'>
                        <option value=''>Select...</option>
                        <option value='asian'>Asian</option>
                        <option value='black'>Black</option>
                        <option value='white'>White</option>
                        <option value='hispanic'>Hispanic</option>
                        <option value='other'>Other</option>
                    </select>
                </label>
                <label className='form-label'>
                    Current Medications: 
                    <textarea name='currentMedications' />
                </label>
                <button className='location-button' onClick={handleLocationClick}>
                    Location
                </button>
                {locationClicked && 
                    <p className='location-text'>Location gathered!</p>
                }
                <input className='submit-button' type='submit' value='Save Your Info' />
            </form>
            <Navigation />
            <footer className='footer'>© 2023 myDoc. All rights reserved.</footer>
        </div>
    );
};

export default PersonalInfo;
