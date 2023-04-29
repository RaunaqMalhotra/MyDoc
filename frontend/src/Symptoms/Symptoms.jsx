import React, { useState } from "react";
import './Symptoms.css';
import Navigation from "../Naviagtion/Navigation";

const Symptoms = () => {
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState('');
  const [imageUpload, setImageUpload] = useState("no");
  const [fileName, setFileName] = useState("");

  const [analyzing, setAnalyzing] = useState(false);

  const handleSymptomsChange = event => {
    setSymptoms(event.target.value);
  }

  const handleDurationChange = event => {
    setDuration(event.target.value);
  }

  const handleSeverityChange = event => {
    setSeverity(event.target.value);
  }

  const handleImageUploadChange = (event) => {
    setImageUpload(event.target.value);
  };

  const handleFileChange = (event) => {
    setFileName(event.target.files[0].name);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (symptoms.trim() === '') {
      alert('Please enter your symptoms.');
      return;
    }
    setAnalyzing(true);
    // JUST TO SIMULATE THE GPT API WE NEED TO SET IT UPPPP
    setTimeout(() => {
      console.log(symptoms);
      console.log(duration);
      console.log(severity);
      console.log(imageUpload);
      setSymptoms('');
      setDuration('');
      setSeverity('');
      setImageUpload(false);
      setAnalyzing(false);
    }, 2000);
  }

  return (
    <div className="symptoms-page">
      <h2 className="top-text">Symptoms Check</h2>
      <form className="symptoms-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Describe your symptoms to us:
          <textarea value={symptoms} onChange={handleSymptomsChange} />
        </label>
        <label className="form-label">
          How long have you had those symptoms?
          <select value={duration} onChange={handleDurationChange}>
            <option value="">Select...</option>
            <option value="1_day">1 day</option>
            <option value="1_week">1 week</option>
            <option value="1_month">1 month</option>
            <option value="1_month">1 month +</option>
          </select>
        </label>
        <label className="form-label">
          What is the severity of your symptoms?
          <select value={severity} onChange={handleSeverityChange}>
            <option value="">Select...</option>
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>
        </label>
        <div>
      <label className="form-label">
        Do you want to upload an image of your symptoms?
        <div className="options-container">
          <label>
            <input 
              type="radio" 
              value="yes" 
              checked={imageUpload === "yes"} 
              onChange={handleImageUploadChange} 
            />
            Yes
          </label>
          <label>
            <input 
              type="radio" 
              value="no" 
              checked={imageUpload === "no"} 
              onChange={handleImageUploadChange} 
            />
            No
          </label>
        </div>
      </label>
      {imageUpload === "yes" && (
        <label className="form-label">
          Upload Your image here:
          <input type="file" onChange={handleFileChange} />
          {fileName && <div> {fileName}</div>}
        </label>
      )}
    </div>
        <input className="submit-button" type="submit" value={analyzing ? "Analyzing your results..." : "Save"} />
      </form>
      <Navigation />
      <footer className='footer'>© 2023 myDoc. All rights reserved.</footer>
    </div>
  );
}

export default Symptoms;
