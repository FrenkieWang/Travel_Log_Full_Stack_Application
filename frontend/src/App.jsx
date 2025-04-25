import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import JourneyPlanPage from './pages/JourneyPlanPage';
import TravelLogPage from './pages/TravelLogPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/journey-plans" element={<JourneyPlanPage />} />
        <Route path="/travel-logs" element={<TravelLogPage />} />
      </Routes>
    </Router>
  );
};

export default App;
