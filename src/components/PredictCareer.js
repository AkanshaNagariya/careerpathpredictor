import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import "./PredictCareer.css";

const PredictCareer = () => {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [experience, setExperience] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({}); // State to track errors
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!skills.trim()) {
      newErrors.skills = "Skills are required.";
    }
    if (!interests) {
      newErrors.interests = "Please select an interest.";
    }
    if (!experience) {
      newErrors.experience = "Please select your experience level.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handlePredictCareer = async () => {
    if (!validateForm()) {
      return; // Stop if there are validation errors
    }

    setIsLoading(true);

    try {
      const prompt = `Suggest **at least 9 career paths** for someone with skills in ${skills}, interests in ${interests}, and experience level ${experience}. 
      Format the output exactly like this (one career per block):
      
      - Job title: [Job Title]
      - Short description: [Short Description]
      - Required skills: [Skill 1, Skill 2, Skill 3]
      - Growth potential: [High/Medium/Low]
      
      Make sure to provide exactly 5-10 career options without any introductory text or summary. Each career should be separated by a blank line.`;

      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 3500,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
          },
        }
      );

      let careerSuggestions = response.data.choices[0]?.message?.content || "";

      // Remove any introductory lines (e.g., "Here are 10 recommendations:")
      careerSuggestions = careerSuggestions
        .split("\n") // Split into lines
        .filter((line) => line.trim() !== "") // Remove empty lines
        .join("\n"); // Join the lines back together

      console.log("Cleaned AI Response:", careerSuggestions); // Debugging: Log the cleaned response
      navigate("/career-results", { state: { careers: careerSuggestions } });
    } catch (error) {
      console.error("Error fetching career predictions:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`predict-career ${isDarkMode ? "dark-mode" : "light-mode"}`}>
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
        <h1>Predict Your Career Path</h1>
        <p>Input your skills, interests, and experience to get personalized career recommendations.</p>
        <div className="input-fields">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            {errors.skills && <span className="error">{errors.skills}</span>}
          </div>
          <div className="input-group">
            <select
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            >
              <option value="">Select your interests</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="education">Education</option>
            </select>
            {errors.interests && <span className="error">{errors.interests}</span>}
          </div>
          <div className="input-group">
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option value="">Select your experience level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            {errors.experience && <span className="error">{errors.experience}</span>}
          </div>
          <button onClick={handlePredictCareer} disabled={isLoading}>
            {isLoading ? "Predicting..." : "Predict My Career Path"}
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
          <a href="/Privacy">Privacy Policy</a>
        </div>
        <p className="copyright">&copy; 2025 CareerPathAI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PredictCareer;