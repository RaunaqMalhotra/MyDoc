import React, { useState } from 'react';
import './Symptoms.css';
import Navigation from '../Naviagtion/Navigation';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

function Symptoms() {
  const [formState, setFormState] = useState({
    symptoms: '',
    duration: '',
    severity: '',
    imageUpload: 'no',
    file: null,
    fileName: '',
    analyzing: false
  });
  const username = sessionStorage.getItem('username') || 'User'; 
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'file') {
      setFormState(prevState => ({ ...prevState, [name]: files[0], fileName: files[0].name }));
    } else {
      setFormState(prevState => ({ ...prevState, [name]: value }));
    }
  }
  const navigate = useNavigate(); 
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formState.symptoms.trim() === '') {
      alert('Please enter your symptoms.');
      return;
    }

    setFormState(prevState => ({ ...prevState, analyzing: true }));

    let imageUpload = null;
    if (formState.file) {
      try {
        const base64 = await toBase64(formState.file);
        imageUpload = {
          base64,
          name: formState.fileName
        };
      } catch (e) {
        console.error('File reading was not successful', e);
      }
    }
   
    // make API call here
    const payload = {
      username: username,
      symptoms: formState.symptoms,
      duration: formState.duration,
      severity: formState.severity,
      imageUpload: imageUpload
    };

    axios.post('http://localhost:9000/saveSymptoms', payload)
      .then(response => {
        console.log(response);
        setFormState({
          symptoms: '',
          duration: '',
          severity: '',
          imageUpload: 'no',
          file: null,
          fileName: '',
          analyzing: false
        });
        navigate('/results'); 
      })
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]); 
    reader.onerror = error => reject(error);
  });

  return (
    <div className='symptoms-page'>
      <h2 className='top-text'>Symptoms Check</h2>
      <form className='symptoms-form' onSubmit={handleSubmit}>
        <label className='form-label'>
          Describe your symptoms to us, {username}:
          <textarea name='symptoms' value={formState.symptoms} onChange={handleChange} />
        </label>
        <label className='form-label'>
          How long have you had those symptoms?
          <select name='duration' value={formState.duration} onChange={handleChange}>
            <option value=''>Select...</option>
            <option value='1_day'>1 day</option>
            <option value='1_day'>2-6 days</option>
            <option value='1_week'>1 week</option>
            <option value='1_month'>1 month</option>
            <option value='1_month'>1 month +</option>
          </select>
        </label>
        <label className='form-label'>
          What is the severity of your symptoms?
          <select name='severity' value={formState.severity} onChange={handleChange}>
            <option value=''>Select...</option>
            <option value='mild'>Mild</option>
            <option value='moderate'>Moderate</option>
            <option value='severe'>Severe</option>
          </select>
        </label>
        <div>
          <label className='form-label'>
            Do you want to upload an image of your symptoms?
            <div className='options-container'>
              <label>
                <input 
                  name='imageUpload' 
                  type='radio' 
                  value='yes' 
                  checked={formState.imageUpload === 'yes'} 
                  onChange={handleChange} 
                />
                Yes
              </label>
              <label>
                <input 
                  name='imageUpload' 
                  type='radio' 
                  value='no' 
                  checked={formState.imageUpload === 'no'} 
                  onChange={handleChange} 
                />
                No
              </label>
            </div>
          </label>
          {formState.imageUpload === 'yes' && (
            <label className='form-label'>
              Upload Your image here:
              <input name='file' type='file' onChange={handleChange} />
              {formState.fileName && <div> {formState.fileName}</div>}
              </label>
          )}
        </div>
        <input className='submit-button' type='submit' value={formState.analyzing ? 'Analyzing your results...' : 'Save'} />
      </form>
      <Navigation />
      <footer className='footer'>© 2023 myDoc. All rights reserved.</footer>
    </div>
  );
}

export default Symptoms;