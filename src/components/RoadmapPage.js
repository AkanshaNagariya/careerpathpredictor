import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./RoadmapPage.css";

const RoadmapPage = () => {
  const location = useLocation();
  const career = location.state?.career || {};
  const { isDarkMode, toggleTheme } = useTheme();
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    // Simulate fetching steps from an API or a static list
    const fetchSteps = () => {
      const steps = [
        `Learn the basics of ${career.requiredSkills[0]}`,
        `Gain experience in ${career.requiredSkills[1]}`,
        `Build projects using ${career.requiredSkills.join(", ")}`,
        "Apply for internships or entry-level positions",
        "Continuously improve and specialize",
      ];
      setSteps(steps);
    };

    fetchSteps();
  }, [career]);

  return (
    <div className={`roadmap-page ${isDarkMode ? "dark-mode" : "light-mode"}`}>
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
        <h1>Roadmap for {career.jobTitle}</h1>
        <div className="roadmap-content">
          <h2>Steps to Become a {career.jobTitle}</h2>
          <ul>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <p className="copyright">&copy; 2023 CareerPathAI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RoadmapPage;