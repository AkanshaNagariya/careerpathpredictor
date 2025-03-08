// src/components/UserProfile.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const [skills, setSkills] = useState(["JavaScript", "React"]);
  const [interests, setInterests] = useState(["Technology", "Design"]);
  const [experience, setExperience] = useState("Intermediate");
  const navigate = useNavigate();

  const handleSaveProfile = () => {
    // Save profile data to local storage
    const profileData = { skills, interests, experience };
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    alert("Profile saved!");
  };

  return (
    <div className="user-profile">
      {/* Header */}
      <header className="header">
        <div className="logo">CareerPathAI</div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/userprofile">UserProfile</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      {/* Main Section */}
      <section className="main">
        <h1>Your Profile</h1>
        <div className="profile-details">
          <h2>Skills</h2>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <h2>Interests</h2>
          <ul>
            {interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
          <h2>Experience Level</h2>
          <p>{experience}</p>
          <button onClick={handleSaveProfile}>Save Profile</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/userprofile">UserProfile</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <div className="social-icons">
          <a href="https://twitter.com">Twitter</a>
          <a href="https://linkedin.com">LinkedIn</a>
          <a href="https://github.com">GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default UserProfile;