// src/components/CareerResults.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./CareerResults.css";

const CareerResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const careers = location.state?.careers || "";
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();

  const parsedCareers = React.useMemo(() => {
    if (!careers) return [];

    try {
      const careerBlocks = careers.split(/\n(?=- Job title:)/);

      return careerBlocks.map((block) => {
        const lines = block.split("\n");
        return {
          jobTitle: lines[0]?.replace("- Job title: ", "").trim() || "N/A",
          shortDescription: lines[1]?.replace("- Short description: ", "").trim() || "N/A",
          requiredSkills: lines[2]?.replace("- Required skills: ", "").trim().split(", ") || [],
          growthPotential: lines[3]?.replace("- Growth potential: ", "").trim() || "N/A",
        };
      });
    } catch (error) {
      console.error("Error parsing career suggestions:", error);
      return [];
    }
  }, [careers]);

  useEffect(() => {
    setIsLoading(!careers);
  }, [careers]);

  const handleLearnMore = (career) => {
    navigate("/roadmap", { state: { career } }); // Navigate to RoadmapPage with career data
  };

  return (
    <div className={`career-results ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <header className="header">
        <div className="logo">CareerPathAI</div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
        </nav>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <section className="main">
        <h1>Your Career Recommendations</h1>
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : parsedCareers.length > 0 ? (
          <div className="career-grid">
            {parsedCareers.map((career, index) => (
              <div key={index} className="career-card">
                <h2>{career.jobTitle}</h2>
                <p>{career.shortDescription}</p>
                <h3>Required Skills</h3>
                <ul>
                  {career.requiredSkills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
                <h3>Growth Potential</h3>
                <p>{career.growthPotential}</p>
                <button onClick={() => handleLearnMore(career)}>Learn More</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No career suggestions found. Please try again.</p>
        )}
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default CareerResults;