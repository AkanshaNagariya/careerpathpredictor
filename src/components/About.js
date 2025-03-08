// src/components/About.js
import React from "react";
import { useTheme } from "../context/ThemeContext"; // Use theme context
import "./About.css";

const About = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Use theme context

  return (
    <div className={`about ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      {/* Header */}
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

      {/* Main Section */}
      <section className="main">
        <h1>About CareerPathAI</h1>
        <p>
          CareerPathAI is an innovative tool that helps you discover your ideal
          career path using AI. Simply input your skills, interests, and
          experience, and let our AI suggest the best career options for you.
        </p>
        <div className="features">
          <div className="feature-card">
            <h2>AI-Powered Recommendations</h2>
            <p>
              Our advanced AI analyzes your inputs to provide personalized career
              suggestions tailored to your profile.
            </p>
          </div>
          <div className="feature-card">
            <h2>Comprehensive Career Insights</h2>
            <p>
              Get detailed information about each career, including required
              skills, growth potential, and more.
            </p>
          </div>
          <div className="feature-card">
            <h2>User-Friendly Interface</h2>
            <p>
              Our intuitive design ensures a seamless experience for users of all
              levels.
            </p>
          </div>
        </div>
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

export default About;