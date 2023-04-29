import React from 'react';
import {Routes, Route }from 'react-router-dom'
import Homepage from './Homepage/Home';
import './App.css';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import Symptoms from './Symptoms/Symptoms';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />}></Route>
        <Route path="/info" element={<PersonalInfo />}></Route>
        <Route path="/symptoms" element={<Symptoms />}></Route>
      </Routes>
    </div>
  );
}

export default App;
