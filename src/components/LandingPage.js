// src/components/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Use theme context
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme(); // Use theme context

  const handleGetStarted = () => {
    navigate("/predict-career");
  };

  return (
    <div className={`landing-page ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <header className="header">
        <div className="logo">CareerPathAI</div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/FAQ">FAQ</a>
          <a href="/contact">Contact</a>
        </nav>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <section className="hero">
        <h1>Welcome to CareerPathAI</h1>
        <p>
          Discover your ideal career path with the power of AI. Whether you're just starting out or looking to make a change, we're here to help you find the perfect fit.
        </p>
        <button onClick={handleGetStarted}>Get Started</button>
      </section>

     {/* Footer */}
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

export default LandingPage;