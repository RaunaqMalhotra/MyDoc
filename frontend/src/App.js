import React from 'react';
import {Routes, Route }from 'react-router-dom'
import Homepage from './Homepage/Home';
import './App.css';
import PersonalInfo from './PersonalInfo/PersonalInfo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />}></Route>
        <Route path="/info" element={<PersonalInfo />}></Route>
      </Routes>
    </div>
  );
}

export default App;
