import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Certifications.css';
import { useEditMode } from './EditModeContext';
import { API_BASE_URL } from '../config';

const Certifications = () => {
  const [certs, setCerts] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    provider: '',
    description: '',
    issuedDate: '',
    proof: ''
  });
  const [editId, setEditId] = useState(null);
  const { editMode } = useEditMode();

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = () => {
    axios.get(`${API_BASE_URL}/api/certifications`)
      .then(res => setCerts(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editId) {
      axios.put(`${API_BASE_URL}/api/certifications/${editId}`, formData)
        .then(() => {
          fetchCertifications();
          setEditId(null);
          setFormData({ type: '', provider: '', description: '', issuedDate: '', proof: '' });
        });
    } else {
      axios.post(`${API_BASE_URL}/api/certifications/add`, formData)
        .then(() => {
          fetchCertifications();
          setFormData({ type: '', provider: '', description: '', issuedDate: '', proof: '' });
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${API_BASE_URL}/api/certifications/${id}`)
      .then(() => fetchCertifications());
  };

  const handleEdit = (cert) => {
    setFormData({
      type: cert.type || '',
      provider: cert.provider || '',
      description: cert.description || '',
      issuedDate: cert.issuedDate ? cert.issuedDate.slice(0, 10) : '',
      proof: cert.proof || ''
    });
    setEditId(cert._id);
  };

  const getDriveImageUrl = (url) => {
    if (!url) return '';
    // Try to extract file id from various Google Drive URL formats
    let fileId = null;
    // Format: /file/d/FILE_ID/
    let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) fileId = match[1];
    // Format: ?id=FILE_ID
    if (!fileId) {
      match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (match && match[1]) fileId = match[1];
    }
    // Format: /uc?id=FILE_ID
    if (!fileId) {
      match = url.match(/\/uc\?id=([a-zA-Z0-9_-]+)/);
      if (match && match[1]) fileId = match[1];
    }
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    return url; // fallback to original url
  };

  return (
    <div className="certifications-page">
      <h2 className="cert-page-title">🎓 Certifications & Achievements</h2>

      {editMode && (
        <form className="cert-form" onSubmit={handleSubmit}>
          <input name="type" placeholder="Type" value={formData.type} onChange={handleChange} required />
          <input name="provider" placeholder="Provider" value={formData.provider} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input name="issuedDate" type="date" value={formData.issuedDate} onChange={handleChange} required />
          <input name="proof" placeholder="Image URL" value={formData.proof} onChange={handleChange} />
          <button type="submit">{editId ? 'Update' : 'Add'} Certification</button>
        </form>
      )}

      <div className="cert-grid">
        {certs.map(cert => (
          <div key={cert._id} className="cert-card">
            <div className="cert-left">
              <h3>{cert.type}</h3>
              <p><strong>Provider:</strong> {cert.provider}</p>
              <p><strong>Description:</strong> {cert.description}</p>
              <p><strong>Date:</strong> {new Date(cert.issuedDate).toDateString()}</p>
              {editMode && (
                <div className="cert-actions">
                  <button onClick={() => handleEdit(cert)}>Edit</button>
                  <button onClick={() => handleDelete(cert._id)}>Delete</button>
                </div>
              )}
            </div>
            {cert.proof && (
              <div className="cert-right">
                <a
                  href={cert.proof}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-image-link"
                  style={{ display: 'inline-block', marginTop: '10px', color: '#1976d2', textDecoration: 'underline' }}
                >
                  View Image
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
