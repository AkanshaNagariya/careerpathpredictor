// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import LandingPage from "./components/LandingPage";
import PredictCareer from "./components/PredictCareer";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import CareerResults from "./components/CareerResults";
import RoadmapPage from "./components/RoadmapPage"; // Import the new component
import Privacy from "./components/Privacy";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/predict-career" element={<PredictCareer />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/roadmap" element={<RoadmapPage />} /> {/* Add this route */}
          <Route path="/career-results" element={<CareerResults />} />
          <Route path="/Privacy" element={<Privacy/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;