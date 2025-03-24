import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./RoadmapPage.css";
import axios from "axios";
import html2pdf from "html2pdf.js";

const RoadmapPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const career = location.state?.career || {};
  const { isDarkMode, toggleTheme } = useTheme();
  const [steps, setSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const roadmapRef = useRef(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      setIsLoading(true);
      setError("");

      try {
        const prompt = `Generate a detailed roadmap for someone aspiring to become a ${career.jobTitle}. 
        The roadmap should include:
        1. A step-by-step guide to learn the required skills: ${career.requiredSkills.join(", ")}.
        2. The average time (in weeks) it takes to learn each skill.
        3. Free resources for each step, including YouTube video links and Coursera course links.
        
        Format the output as a JSON object with the following structure:
        {
          "steps": [
            {
              "title": "Step 1: Learn [Skill Name]",
              "description": "A brief description of what this step involves.",
              "weeks": "X weeks",
              "resources": [
                {
                  "type": "youtube",
                  "title": "Video Title",
                  "link": "https://youtube.com/..."
                },
                {
                  "type": "coursera",
                  "title": "Course Title",
                  "link": "https://coursera.org/..."
                }
              ]
            },
            // Add more steps as needed
          ]
        }`;

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

        const responseContent = response.data.choices[0]?.message?.content || "";
        const jsonString = responseContent
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        const roadmapData = JSON.parse(jsonString);

        if (roadmapData.steps && Array.isArray(roadmapData.steps)) {
          setSteps(roadmapData.steps);
        } else {
          throw new Error("Invalid roadmap data format");
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error.response ? error.response.data : error.message);
        setError("Failed to load roadmap. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (career.jobTitle) {
      fetchRoadmap();
    }
  }, [career]);

  const handleGoBack = () => {
    navigate("/career-results");
  };

  const handleDownloadPdf = () => {
    if (!roadmapRef.current) {
      alert("Roadmap is not available for download.");
      return;
    }

    const element = roadmapRef.current;

    // Clone the roadmap content
    const clonedElement = element.cloneNode(true);

    // Apply simplified styles for the PDF
    clonedElement.style.backgroundColor = "#ffffff";
    clonedElement.style.color = "#000000";

    // Ensure all links are black for better visibility in the PDF
    const links = clonedElement.querySelectorAll("a");
    links.forEach((link) => {
      link.style.color = "#000000";
    });

    const options = {
      margin: 10,
      filename: `Roadmap_for_${career.jobTitle}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Generate and download PDF
    html2pdf().from(clonedElement).set(options).save();
  };

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
        <div className="back-button-container">
          <button className="back-button" onClick={handleGoBack}>
            ← Back
          </button>
        </div>
        <h1>Roadmap for {career.jobTitle}</h1>
        <button
          className="download-pdf-button"
          onClick={handleDownloadPdf}
          disabled={steps.length === 0 || error}
        >
          Download as PDF
        </button>
        {isLoading ? (
          <p>Loading roadmap...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : steps.length > 0 ? (
          <div className="roadmap-content" ref={roadmapRef}>
            <h2>Steps to Become a {career.jobTitle}</h2>
            <ul>
              {steps.map((step, index) => (
                <li key={index}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <p>Estimated time to learn: {step.weeks}</p>
                  <div>
                    <strong>Resources:</strong>
                    <ul>
                      {step.resources.map((resource, idx) => (
                        <li key={idx}>
                          <a href={resource.link} target="_blank" rel="noopener noreferrer">
                            {resource.type === "youtube" ? "YouTube" : "Coursera"} - {resource.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
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

export default RoadmapPage;