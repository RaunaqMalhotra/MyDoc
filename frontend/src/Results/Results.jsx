import { useState, useEffect } from "react";
import './Results.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FaStethoscope } from 'react-icons/fa'; 

const Results = (props) => {
  const [result, setResult] = useState({
    disease: '',
    accuracy: 0,
  });

  useEffect(() => {
    fetch('http://localhost:9000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        symptoms: props.symptoms,
      }),
    })
    .then(response => response.json())
    .then(data => {
      setResult({
        disease: data.disease,
        accuracy: data.accuracy,
      });
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="results-container">
      <div className="navbar">
        <button className="home-icon" onClick={() => navigate('/')}>
          <FaHome size={30}/>
        </button>
        <button className="diagnosis-icon">
          <FaStethoscope size={30}/>
        </button>
      </div>
      <div className="results-card">
        <h2>Prediction Results</h2>
        <h3>Disease: {result.disease}</h3>
        <h3>Accuracy: {Math.round(result.accuracy * 100)}%</h3>
        <Link to="/"><button className="home-button">Go Home</button></Link>
      </div>
    </div>
  );
}

export default Results;
