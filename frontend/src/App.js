import React from 'react';
import {Routes, Route }from 'react-router-dom'
import Homepage from './Homepage/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Homepage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
