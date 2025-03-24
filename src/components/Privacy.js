import React from "react";
import "./Privacy.css"; // Import the CSS file

const Privacy = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <p className="last-updated">Last updated: October 10, 2023</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to <strong>MyAwesomeApp</strong> ("we," "our," "us"). Your privacy is important to us, and we are dedicated to safeguarding your personal information. This Privacy Policy explains how we collect, use, and protect your data when you use our website or services.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>
          We collect the following types of information to provide and improve our services:
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, and other details you provide voluntarily.</li>
            <li><strong>Usage Data:</strong> Information such as your IP address, browser type, device information, and pages visited.</li>
            <li><strong>Cookies:</strong> We use cookies and similar technologies to enhance your experience and analyze website traffic.</li>
          </ul>
        </p>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>
          Your information is used for the following purposes:
          <ul>
            <li>To deliver and improve our services.</li>
            <li>To personalize your experience on our website.</li>
            <li>To communicate with you, including responding to inquiries and sending updates.</li>
            <li>To analyze usage trends and optimize our website.</li>
          </ul>
        </p>
      </section>

      <section>
        <h2>4. Sharing Your Information</h2>
        <p>
          We respect your privacy and do not sell or trade your personal information. However, we may share your data in the following cases:
          <ul>
            <li>With your explicit consent.</li>
            <li>To comply with legal obligations or protect our rights.</li>
            <li>With trusted third-party service providers who assist us in operating our website.</li>
          </ul>
        </p>
      </section>

      <section>
        <h2>5. Data Security</h2>
        <p>
          We take data security seriously and implement industry-standard measures to protect your information. However, no system is completely secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2>6. Your Rights</h2>
        <p>
          You have the following rights regarding your personal data:
          <ul>
            <li>Access and review the data we hold about you.</li>
            <li>Request corrections to inaccurate or incomplete information.</li>
            <li>Request deletion of your personal data.</li>
            <li>Opt-out of receiving promotional communications.</li>
          </ul>
        </p>
      </section>

      <section>
        <h2>7. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. The updated policy will be posted here with a revised "Last updated" date.
        </p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, please reach out to us:
          <br />
          Email: <a href="mailto:privacy@myawesomeapp.com">privacy@myawesomeapp.com</a>
          <br />
          Phone: +1 (555) 123-4567
        </p>
      </section>
    </div>
  );
};

export default Privacy;