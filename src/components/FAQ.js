import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "./FAQ.css";

const FAQ = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(null); // Track the active FAQ item

  const faqData = [
    {
      question: "What is CareerPathAI?",
      answer:
        "CareerPathAI is a platform that helps you discover potential career paths based on your skills, interests, and experience level. By analyzing your inputs, it suggests tailored career options and provides insights into each role.",
    },
    {
      question: "How does CareerPathAI predict careers?",
      answer:
        "CareerPathAI uses advanced algorithms to analyze your skills, interests, and experience level. It matches your profile with a database of careers and provides personalized recommendations.",
    },
    {
      question: "What information do I need to provide?",
      answer:
        "You need to provide details about your skills, interests, and experience level. The more accurate your inputs, the better the career recommendations will be.",
    },
    {
      question: "Can I use CareerPathAI for free?",
      answer:
        "Yes, CareerPathAI is completely free to use. Our goal is to help as many people as possible find their ideal career paths.",
    },
    {
      question: "How accurate are the career predictions?",
      answer:
        "The accuracy of the predictions depends on the quality of the information you provide. CareerPathAI uses a robust algorithm, but it's always a good idea to research further and consult with career advisors.",
    },
    {
      question: "What if I don't know my skills or interests?",
      answer:
        "If you're unsure about your skills or interests, CareerPathAI provides suggestions and examples to help you identify them. You can also take online assessments to gain more clarity.",
    },
    {
      question: "Can I save my results?",
      answer:
        "Yes, you can save your results for future reference. Simply create an account (if available) or take a screenshot of your recommendations.",
    },
    {
      question: "How often is the career database updated?",
      answer:
        "Our career database is regularly updated to reflect the latest trends and opportunities in the job market. We strive to provide the most relevant and up-to-date information.",
    },
    {
      question: "Can I use CareerPathAI on my mobile device?",
      answer:
        "Yes, CareerPathAI is fully responsive and works seamlessly on both desktop and mobile devices.",
    },
    {
      question: "Who can I contact for support?",
      answer:
        "If you have any questions or need support, feel free to reach out to us at support@careerpathai.com. We're here to help!",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active FAQ item
  };

  return (
    <div className={`faq ${isDarkMode ? "dark-mode" : "light-mode"}`}>
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
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <span className="arrow">{activeIndex === index ? "▼" : "▶"}</span>
                <h2>{item.question}</h2>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
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

export default FAQ;