import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ZCurveGenerator } from './components/z-curve';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ZCurveGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;