import React, { useEffect, useState } from 'react';
import './PersonalInfo.css';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../Naviagtion/Navigation';

const PersonalInfo = () => {
    const [location, setLocation] = useState({});
    const [locationClicked, setLocationClicked] = useState(false);
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [sexuality, setSexuality] = useState('');
    const [race, setRace] = useState('');
    const [currentMedications, setCurrentMedications] = useState('');
    const username = sessionStorage.getItem('username') || 'User'; 
    const navigate = useNavigate();

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:9000/savePersonalInfo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, fullName, age, height, weight, gender, sexuality, race, currentMedications }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate('/symptoms');
               
            } else {
                console.log('Failed to save personal info.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='personal-info-page'>
            <div className='top-text'>Your Health is Our Priority</div>
            <h1 className='personal-info-title'>Welcome, {username}! </h1>
            <h2 className='personal-info-title'>{username}, please enter Personal Information</h2>
            <form className='personal-info-form' onSubmit={handleSubmit}>
                <label className='form-label'>
                    Full Name: 
                    <input type='text' name='name' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </label>
                <label className='form-label'>
                    Age: 
                    <input type='number' name='age' min='0' value={age} onChange={(e) => setAge(e.target.value)} />
                </label>
                <label className='form-label'>
                    Height (in cm): 
                    <input type='number' name='height' min='0' value={height} onChange={(e) => setHeight(e.target.value)} />
                </label>
                <label className='form-label'>
                    Weight (in kg): 
                    <input type='number' name='weight' min='0' value={weight} onChange={(e) => setWeight(e.target.value)} />
                </label>
                <label className='form-label'>
    Gender:
    <select name='gender' value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value=''>Select...</option>
        <option value='male'>Male</option>
        <option value='female'>Female</option>
        <option value='non-binary'>Non-binary</option>
        <option value='transgender'>Transgender</option>
        <option value='other'>Other</option>
    </select>
</label>
<label className='form-label'>
    Sexuality:
    <select name='sexuality' value={sexuality} onChange={(e) => setSexuality(e.target.value)}>
        <option value=''>Select...</option>
        <option value='not comfortable'>Not Comfortable disclosing</option>
        <option value='straight'>Straight</option>
        <option value='gay'>Gay</option>
        <option value='lesbian'>Lesbian</option>
        <option value='asexual'>Asexual</option>
        <option value='other'>Other</option>
    </select>
</label>
<label className='form-label'>
    Race: 
    <select name='race' value={race} onChange={(e) => setRace(e.target.value)}>
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
    <textarea name='currentMedications' value={currentMedications} onChange={(e) => setCurrentMedications(e.target.value)} />
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
