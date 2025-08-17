import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      form.current,
      'YOUR_PUBLIC_KEY'
    )
    .then(() => {
      alert("Message sent successfully!");
      form.current.reset();
    }, (error) => {
      alert("Failed to send message. Try again.");
      console.log(error.text);
    });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="from_name" required />
      <label>Email</label>
      <input type="email" name="email" required />
      <label>Message</label>
      <textarea name="message" required />
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
