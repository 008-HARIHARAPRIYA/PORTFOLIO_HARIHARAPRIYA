import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import bgImage from '../assets/image.png';
import profileImg from '../assets/hariimg.jpg';
import {  FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Projects from './Projects';
import { Link } from 'react-router-dom';
import CodingStatus from './CodingStatus';
import Footer from './Footer.jsx';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { useEditMode } from './EditModeContext';

const Home = () => {
  const [experiences, setExperiences] = useState([
    {
      date: 'Dec 2023',
      company: 'Svasti Technology Solutions — Trichy',
      detail: 'Learned Web Development using React, Express.js, and PostgreSQL.'
    },
    {
      date: 'June 2024',
      company: 'Quantanics Techserv Pvt. Ltd — Madurai',
      detail: 'Developed a Smart Trolley Shopping System (Android + IoT) using MVC, Node.js & Git.'
    }
  ]);

  const [tools, setTools] = useState([
    'Visual Studio', 'Netbeans', 'Android Studio', 'Google Colab', 'Postman', 'GitHub', 'Jira'
  ]);

  const [skills, setSkills] = useState([
    'Fullstack Development', 'Java, C Programming', 'DSA', 'Android App Dev', 'DBMS', 'MERN Stack',
    'OOP Design', 'Cloud Computing', 'AI & ML', 'R Programming'
  ]);

  const [newTool, setNewTool] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newExperience, setNewExperience] = useState({ date: '', company: '', detail: '' });
  const [resumeUrl, setResumeUrl] = useState(require('../assets/resume.pdf'));
  const { editMode, enableEditMode, disableEditMode } = useEditMode();
  const [education, setEducation] = useState([
    {
      school: "Velammal College of Engineering and Technology",
      degree: "B.E. Computer Science and Engineering (2022–2026)",
      score: "CGPA: 9.02"
    },
    {
      school: "St. Joseph’s Girls’ Higher Secondary School",
      degree: "HSC (2021–2022)",
      score: "Percentage: 97.17%"
    },
    {
      school: "Fuscos Matriculation School",
      degree: "SSLC (2019–2020)",
      score: "Percentage: 96.6%"
    }
  ]);
  const [newEducation, setNewEducation] = useState({ school: '', degree: '', score: '' });
  const [editingExperienceIdx, setEditingExperienceIdx] = useState(null);
  const [editingEducationIdx, setEditingEducationIdx] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleAddTool = () => {
    if (newTool.trim()) {
      setTools([...tools, newTool]);
      setNewTool('');
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleAddExperience = () => {
    const { date, company, detail } = newExperience;
    if (date && company && detail) {
      setExperiences([...experiences, newExperience]);
      setNewExperience({ date: '', company: '', detail: '' });
    }
  };

  const handleEditModeClick = () => {
    if (editMode) {
      disableEditMode();
    } else {
      const key = window.prompt("Enter secret key to enable edit mode:");
      if (!enableEditMode(key)) {
        alert("Incorrect secret key!");
      }
    }
  };

  // Handle resume upload (edit mode only)
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = function (ev) {
        // Save the PDF as a blob URL for download (in-memory, not persistent)
        setResumeUrl(ev.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  // Experience handlers
  const handleEditExperience = (idx) => {
    setNewExperience(experiences[idx]);
    setEditingExperienceIdx(idx);
  };
  const handleDeleteExperience = (idx) => {
    setExperiences(experiences.filter((_, i) => i !== idx));
    setEditingExperienceIdx(null);
  };
  const handleSaveExperience = () => {
    if (editingExperienceIdx !== null) {
      const updated = [...experiences];
      updated[editingExperienceIdx] = newExperience;
      setExperiences(updated);
      setEditingExperienceIdx(null);
      setNewExperience({ date: '', company: '', detail: '' });
    } else {
      handleAddExperience();
    }
  };

  // Education handlers
  const handleEditEducation = (idx) => {
    setNewEducation(education[idx]);
    setEditingEducationIdx(idx);
  };
  const handleDeleteEducation = (idx) => {
    setEducation(education.filter((_, i) => i !== idx));
    setEditingEducationIdx(null);
  };
  const handleSaveEducation = () => {
    if (editingEducationIdx !== null) {
      const updated = [...education];
      updated[editingEducationIdx] = newEducation;
      setEducation(updated);
      setEditingEducationIdx(null);
      setNewEducation({ school: '', degree: '', score: '' });
    } else {
      setEducation([...education, newEducation]);
      setNewEducation({ school: '', degree: '', score: '' });
    }
  };

  return (
    <div className="hero" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* Navbar */}
      <nav className="navbar">
        <h2>My Portfolio</h2>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#footer-contact">Contact</a></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/certifications">Certifications</Link></li>
          <li>
            <button
              style={{
                background: editMode ? "linear-gradient(90deg,#ff5858,#f09819)" : "linear-gradient(90deg,#43cea2,#185a9d)",
                color: "#fff",
                border: "none",
                borderRadius: "25px",
                padding: "7px 20px",
                cursor: "pointer",
                marginLeft: "10px",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                transition: "background 0.3s"
              }}
              onClick={handleEditModeClick}
            >
              {editMode ? "Exit Edit Mode" : "Edit Mode"}
            </button>
          </li>
          <li>
            <a
              href={resumeUrl}
              download="Hariharapriya_Resume.pdf"
              style={{
                background: "linear-gradient(90deg,#36d1c4,#5b86e5)",
                color: "#fff",
                borderRadius: "25px",
                padding: "7px 20px",
                textDecoration: "none",
                marginLeft: "10px",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                transition: "background 0.3s"
              }}
            >
              Download Resume
            </a>
          </li>
          {editMode && (
            <li>
              <label
                style={{
                  background: "linear-gradient(90deg,#f7971e,#ffd200)",
                  color: "#222",
                  borderRadius: "25px",
                  padding: "7px 20px",
                  cursor: "pointer",
                  marginLeft: "10px",
                  fontWeight: 600,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                  transition: "background 0.3s"
                }}
              >
                Upload Resume
                <input
                  type="file"
                  accept="application/pdf"
                  style={{ display: "none" }}
                  onChange={handleResumeUpload}
                />
              </label>
            </li>
          )}
        </ul>
      </nav>

      {/* Profile Card */}
      <div className="card-container">
        <div className="card">
          <div className="left">
            <img src={profileImg} alt="Profile" />
          </div>
          <div className="right">
            <h1>R.S.Hariharapriya</h1>
            <h3>FINAL YEAR CSE STUDENT</h3>
            <p><strong>Phone:</strong> 9790502928</p>
            <p><strong>Email:</strong> hariharapriya73@gmail.com</p>
            <p><strong>Address:</strong><br />3/96, Sourashtrapuram 4th street, Vandiyur, Madurai-625020.</p>
            <p><strong>Date of Birth:</strong> February 18th, 2005</p>
          </div>
        </div>
      </div>

      {/* Social Footer */}
      <div className="footer-socials">
  <a href="https://www.linkedin.com/in/hariharapriya-r-s-9880a72b1" target="_blank" rel="noreferrer" title="LinkedIn">
    <FaLinkedin />
  </a>
  <a href="https://github.com/008-HARIHARAPRIYA" target="_blank" rel="noreferrer" title="GitHub">
    <FaGithub />
  </a>
  <a href="https://leetcode.com/u/22CSEA08_HARIHARAPRIYA/" target="_blank" rel="noreferrer" title="LeetCode">
    <SiLeetcode />
  </a>
  <a href="https://www.geeksforgeeks.org/user/hariharacjgc/" target="_blank" rel="noreferrer" title="GeeksforGeeks">
    <SiGeeksforgeeks />
  </a>
</div>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>ABOUT ME</h2>
        <p>
          A dedicated Computer Science and Engineering student with a strong passion for learning and applying knowledge in practical scenarios. Seeking opportunities to contribute to innovative projects and grow professionally in a dynamic environment.
        </p>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience-section">
        <h2>EXPERIENCE</h2>
        <div className="timeline">
          {experiences.map((exp, idx) => (
            <div
              className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
              data-aos={idx % 2 === 0 ? 'fade-right' : 'fade-left'}
              key={idx}
            >
              <div className="timeline-content">
                {editMode && editingExperienceIdx === idx ? (
                  <>
                    <input
                      type="text"
                      placeholder="Date"
                      value={newExperience.date}
                      onChange={e => setNewExperience({ ...newExperience, date: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={newExperience.company}
                      onChange={e => setNewExperience({ ...newExperience, company: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Details"
                      value={newExperience.detail}
                      onChange={e => setNewExperience({ ...newExperience, detail: e.target.value })}
                    />
                    <button onClick={handleSaveExperience}>Update</button>
                    <button onClick={() => setEditingExperienceIdx(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <h4>{exp.date}</h4>
                    <h5>{exp.company}</h5>
                    <p>{exp.detail}</p>
                    {editMode && (
                      <div style={{ marginTop: 8 }}>
                        <button onClick={() => handleEditExperience(idx)}>Edit</button>
                        <button onClick={() => handleDeleteExperience(idx)}>Delete</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {editMode && editingExperienceIdx === null && (
          <div className="add-experience-form">
            <input
              type="text"
              placeholder="Date"
              value={newExperience.date}
              onChange={(e) => setNewExperience({ ...newExperience, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Company"
              value={newExperience.company}
              onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
            />
            <input
              type="text"
              placeholder="Details"
              value={newExperience.detail}
              onChange={(e) => setNewExperience({ ...newExperience, detail: e.target.value })}
            />
            <button onClick={handleSaveExperience}>Add Experience</button>
          </div>
        )}
      </section>

      {/* Divider */}
      <hr className="section-divider" style={{ backgroundColor: "black", height: "2px", border: "none" }} />

      {/* Education Section */}
      <section id="education" className="education-section">
        <h2 className="section-title" data-aos="fade-up">EDUCATION</h2>
        <div className="education-timeline">
          {education.map((edu, idx) => (
            <div className="education-item" data-aos="fade-up" key={idx}>
              <div className="education-dot" />
              <div className="education-content">
                {editMode && editingEducationIdx === idx ? (
                  <>
                    <input
                      type="text"
                      placeholder="School"
                      value={newEducation.school}
                      onChange={e => setNewEducation({ ...newEducation, school: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Degree"
                      value={newEducation.degree}
                      onChange={e => setNewEducation({ ...newEducation, degree: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Score"
                      value={newEducation.score}
                      onChange={e => setNewEducation({ ...newEducation, score: e.target.value })}
                    />
                    <button onClick={handleSaveEducation}>Update</button>
                    <button onClick={() => setEditingEducationIdx(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <h3>{edu.school}</h3>
                    <p>{edu.degree}</p>
                    <span>{edu.score}</span>
                    {editMode && (
                      <div style={{ marginTop: 8 }}>
                        <button onClick={() => handleEditEducation(idx)}>Edit</button>
                        <button onClick={() => handleDeleteEducation(idx)}>Delete</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {editMode && editingEducationIdx === null && (
          <div className="add-experience-form">
            <input
              type="text"
              placeholder="School"
              value={newEducation.school}
              onChange={e => setNewEducation({ ...newEducation, school: e.target.value })}
            />
            <input
              type="text"
              placeholder="Degree"
              value={newEducation.degree}
              onChange={e => setNewEducation({ ...newEducation, degree: e.target.value })}
            />
            <input
              type="text"
              placeholder="Score"
              value={newEducation.score}
              onChange={e => setNewEducation({ ...newEducation, score: e.target.value })}
            />
            <button onClick={handleSaveEducation}>Add Education</button>
          </div>
        )}
      </section>

      <CodingStatus />

      {/* Tools & Skills */}
      <section id="tools-skills" className="tools-skills-section">
        <div className="tools-skills-container">
          <h2>Tools & Skills</h2>
          <div className="skills-tools-grid">
            {/* Tools Column */}
            <div className="column">
              <h3>Tools</h3>
              <div className="cards">
                {tools.map((tool, index) => (
                  <div className="mini-card" key={tool} data-aos="fade-right" data-aos-delay={index * 100}>
                    {tool}
                  </div>
                ))}
              </div>
              {editMode && (
                <div className="add-form">
                  <input
                    type="text"
                    placeholder="New Tool"
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                  />
                  <button onClick={handleAddTool}>Add Tool</button>
                </div>
              )}
            </div>

            {/* Skills Column */}
            <div className="column">
              <h3>Skills</h3>
              <div className="cards">
                {skills.map((skill, index) => (
                  <div className="mini-card" key={skill} data-aos="fade-right" data-aos-delay={index * 100}>
                    {skill}
                  </div>
                ))}
              </div>
              {editMode && (
                <div className="add-form">
                  <input
                    type="text"
                    placeholder="New Skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <button onClick={handleAddSkill}>Add Skill</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer with anchor for contact */}
      <div id="footer-contact">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
