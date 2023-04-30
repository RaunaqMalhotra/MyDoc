import { useState, useEffect } from "react";
import './Results.css';
import { Link, useNavigate } from 'react-router-dom'; 
import Navigation from "../Naviagtion/Navigation";

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
        console.log(data);
      setResult({
        disease: data.disease,
        accuracy: data.accuracy,
      });
    });
  }, [props.symptoms]); 


  const navigate = useNavigate();

  return (
    <div className="results-container">
    
        <h2>Prediction Results</h2>
        <h3>Disease: {result.disease}</h3>
        <h3>Accuracy: {Math.round(result.accuracy * 100)}%</h3>
        <Navigation />
        <footer />
    </div>
  );
}

export default Results;
