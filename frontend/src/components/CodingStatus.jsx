import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CodingStatus.css';
import { useEditMode } from './EditModeContext';
import { API_BASE_URL } from '../config';

const CodingStatus = () => {
  const [statusList, setStatusList] = useState([]);
  const [newEntry, setNewEntry] = useState({
    platform: '',
    username: '',
    profileLink: '',
    problemSolved: '',
    rank: '',
    stars: '',
  });
  const [editingId, setEditingId] = useState(null);
  const { editMode } = useEditMode();

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = () => {
    axios.get(`${API_BASE_URL}/api/coding-stats`)
      .then(res => setStatusList(res.data))
      .catch(err => console.error("Error fetching coding status", err));
  };

  const handleInputChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (editingId) {
      axios.put(`${API_BASE_URL}/api/coding-stats/${editingId}`, newEntry)
        .then(() => {
          setEditingId(null);
          setNewEntry({ platform: '', username: '', profileLink: '', problemSolved: '', rank: '', stars: '' });
          fetchStatus();
        });
    } else {
      axios.post(`${API_BASE_URL}/api/coding-stats/add`, newEntry)
        .then(() => {
          setNewEntry({ platform: '', username: '', profileLink: '', problemSolved: '', rank: '', stars: '' });
          fetchStatus();
        });
    }
  };

  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setNewEntry({
      platform: entry.platform,
      username: entry.username,
      profileLink: entry.profileLink,
      problemSolved: entry.problemSolved,
      rank: entry.rank,
      stars: entry.stars
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      axios.delete(`${API_BASE_URL}/api/coding-stats/${id}`)
        .then(() => fetchStatus());
    }
  };

  return (
    <div className="coding-status-section">
      <h2>Coding Platform Stats</h2>

      {/* ADD/EDIT FORM */}
      {editMode && (
        <div className="form-container">
          <input type="text" name="platform" placeholder="Platform" value={newEntry.platform} onChange={handleInputChange} />
          <input type="text" name="username" placeholder="Username" value={newEntry.username} onChange={handleInputChange} />
          <input type="text" name="profileLink" placeholder="Profile Link" value={newEntry.profileLink} onChange={handleInputChange} />
          <input type="number" name="problemSolved" placeholder="Problems Solved" value={newEntry.problemSolved} onChange={handleInputChange} />
          <input type="text" name="rank" placeholder="Rank" value={newEntry.rank} onChange={handleInputChange} />
          <input type="number" name="stars" placeholder="Stars" value={newEntry.stars} onChange={handleInputChange} />

          <button onClick={handleAddOrUpdate}>
            {editingId ? 'Update Entry' : 'Add Entry'}
          </button>
        </div>
      )}

      {/* CARD VIEW */}
      <div className="coding-cards">
        {statusList.map((status) => (
          <div key={status._id} className="coding-card">
            <div className="card-left">
              <h3>{status.platform}</h3>
              <p><strong>Username:</strong> {status.username}</p>
              <p><strong>Problems Solved:</strong> {status.problemSolved}</p>
              <p><strong>Rank:</strong> {status.rank}</p>
              <p><strong>Stars:</strong> ⭐ {status.stars}</p>
              <a href={status.profileLink} target="_blank" rel="noopener noreferrer" className="profile-btn">View Profile</a>
              {editMode && (
                <div className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEdit(status)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(status._id)}>Delete</button>
                </div>
              )}
            </div>
            <div className="card-right">
              <img
                src={
                  status.platform.toLowerCase() === "leetcode"
                    ? require('../assets/leetcode.jpg')
                    : status.platform.toLowerCase() === "hackerrank"
                    ? require('../assets/hackerrank.jpg')
                    : status.platform.toLowerCase() === "geeksforgeeks"
                    ? require('../assets/geeksforgeeks.jpg')
                    : require('../assets/leetcode.jpg') // fallback
                }
                alt={status.platform}
                className="platform-logo"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodingStatus;
