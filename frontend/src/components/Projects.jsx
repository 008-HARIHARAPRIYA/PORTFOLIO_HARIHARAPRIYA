import React, { useEffect, useState } from 'react';
import '../styles/Projects.css';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useEditMode } from './EditModeContext';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: '',
    video: '',
    githubLink: '',
    deployLink: '',
  });
  const [editingId, setEditingId] = useState(null);
  const { editMode } = useEditMode();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios.get('http://localhost:5000/api/projects')
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      images: formData.images.split(',') // comma-separated image URLs
    };

    if (editingId) {
      axios.put(`http://localhost:5000/api/projects/${editingId}`, payload)
        .then(() => {
          fetchProjects();
          setEditingId(null);
          setFormData({ title: '', description: '', images: '', video: '', githubLink: '', deployLink: '' });
        });
    } else {
      axios.post('http://localhost:5000/api/projects', payload)
        .then(() => {
          fetchProjects();
          setFormData({ title: '', description: '', images: '', video: '', githubLink: '', deployLink: '' });
        });
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      images: project.images.join(','),
      video: project.video,
      githubLink: project.githubLink,
      deployLink: project.deployLink,
    });
    setEditingId(project._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      axios.delete(`http://localhost:5000/api/projects/${id}`)
        .then(() => fetchProjects());
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const getDriveVideoEmbedUrl = (url) => {
    const match = url.match(/\/d\/(.+?)\//);
    return match && match[1] ? `https://drive.google.com/file/d/${match[1]}/preview` : null;
  };

  return (
    <div className="projects-container">
      <h1>My Projects</h1>

      {/* 📝 Add/Update Form */}
      {editMode && (
        <form onSubmit={handleSubmit} className="project-form">
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input name="images" placeholder="Image URLs (comma separated)" value={formData.images} onChange={handleChange} />
          <input name="video" placeholder="Google Drive Video URL" value={formData.video} onChange={handleChange} />
          <input name="githubLink" placeholder="GitHub Link" value={formData.githubLink} onChange={handleChange} />
          <input name="deployLink" placeholder="Live Demo Link" value={formData.deployLink} onChange={handleChange} />
          <button type="submit">{editingId ? 'Update' : 'Add'} Project</button>
        </form>
      )}

      {/* 💻 Project Cards */}
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project, index) => (
          <div key={index} className="project-card">
            <h2>{project.title}</h2>
            <p>{project.description}</p>

            {project.images && Array.isArray(project.images) && (
              <Slider {...sliderSettings}>
                {project.images.map((img, i) => (
                  <div key={i}><img src={img} alt={`Slide ${i}`} className="project-image" /></div>
                ))}
              </Slider>
            )}

            {project.video && getDriveVideoEmbedUrl(project.video) && (
              <div className="project-video-wrapper">
                <iframe
                  src={getDriveVideoEmbedUrl(project.video)}
                  width="100%"
                  height="360"
                  allow="autoplay"
                  allowFullScreen
                  title="Project Video"
                />
              </div>
            )}

            <div className="project-links">
              {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>}
              {project.deployLink && <a href={project.deployLink} target="_blank" rel="noopener noreferrer">Live Demo</a>}
            </div>

            {/* ✏️ Edit & 🗑️ Delete */}
            {editMode && (
              <div className="project-actions">
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button onClick={() => handleDelete(project._id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Projects;
