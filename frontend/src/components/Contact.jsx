// Contact.jsx
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css"; // Optional: for styling

const Contact = () => {
  const form = useRef();
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "your_service_id",       // from EmailJS dashboard
        "your_template_id",      // from EmailJS dashboard
        form.current,
        "your_public_key"        // from EmailJS dashboard
      )
      .then(
        (result) => {
          console.log("Success:", result.text);
          setSuccess(true);
          form.current.reset();
        },
        (error) => {
          console.log("Failed:", error.text);
          setSuccess(false);
        }
      );
  };

  return (
    <div className="contact-section">
      <h2>Contact Me</h2>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <input type="text" name="user_name" placeholder="Your Name" required />
        <input type="email" name="user_email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required />
        <button type="submit">Send Message</button>
        {success && <p className="success-msg">Message sent successfully!</p>}
      </form>
    </div>
  );
};

export default Contact;
