import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HOST_URL = process.env.REACT_APP_HOST_URL || 'http://localhost:5000';
const TRAVEL_API_URL = `${HOST_URL}/travelLog`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;

  th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: center;
  }
`;

function TravelLogPage() {
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    postDate: ''
  });
  const [tags, setTags] = useState(['']);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = () => {
    axios.get(`${HOST_URL}/user/current`, { headers: { Authorization: token } })
      .then(user => {
        const logIds = JSON.parse(user.data.travelLogs);

        axios.get(TRAVEL_API_URL, { headers: { Authorization: token } })
          .then(travel => {            
            const myLogs = travel.data.filter(log => logIds.includes(log.id));

            const cleaned = myLogs.map(log => ({
              ...log,
              tags: JSON.parse(log.tags)
            }));
            setLogs(cleaned);
          });
      })
      .catch(error => console.error(error));
  };

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleTagChange = (index, value) => {
    const list = [...tags];
    list[index] = value;
    setTags(list);
  };

  const addTagInput = () => {
    setTags([...tags, '']);
  };

  const removeTagInput = index => {
    const list = [...tags];
    list.splice(index, 1);
    setTags(list);
  };

  const clearForm = () => {
    setForm({title: '', description: '', startDate: '', endDate: '', postDate: ''});
    setTags(['']);
    setEditingId(null);
  };

  const validate = () => {
    if (
      !form.title ||
      !form.description ||
      !form.startDate ||
      !form.endDate ||
      !form.postDate ||
      tags.filter(tag => tag.trim() !== '').length === 0
    ) {
      alert('Please fill in all fields, and ensure at least one tag.');
      return false;
    }
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    if (start > end) {
      alert('Start date must be before or equal to end date.');
      return false;
    }
    return true;
  };

  const createLog = () => {
    if (!validate()) return;
    const data = {
      ...form,
      tags: tags.filter(tag => tag.trim() !== '')
    };

    axios.post(TRAVEL_API_URL, data, { headers: { Authorization: token } })
      .then(response => {
        const userId = localStorage.getItem('userId');
        const logId = response.data.id;
        return axios.post(`${HOST_URL}/user/addTravelLog`, { userId, logId });
      })
      .then(() => {
        clearForm();
        fetchLogs();
      })
      .catch(error => console.error(error));
  };

  const editLog = log => {
    setForm({
      title: log.title,
      description: log.description,
      startDate: log.startDate.slice(0, 10),
      endDate: log.endDate.slice(0, 10),
      postDate: log.postDate.slice(0, 10)
    });
    setTags(log.tags || []);
    setEditingId(log.id);
  };

  const updateLog = () => {
    if (!validate()) return;
    const data = {
      ...form,
      tags: tags.filter(tag => tag.trim() !== '')
    };

    axios.put(`${TRAVEL_API_URL}/${editingId}`, data, { headers: { Authorization: token } })
      .then(() => {
        clearForm();
        fetchLogs();
      })
      .catch(error => console.error(error));
  };

  const  deleteLog = id => {
    axios.delete(`${TRAVEL_API_URL}/${id}`, {headers: { Authorization: token }})
      .then(() => {
        const userId = localStorage.getItem('userId');
        return axios.post(`${HOST_URL}/user/removeTravelLog`, { userId, logId: id });
      })
      .then(() => fetchLogs())
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Travel Log Manager</h1>
      <Link to="/home">⬅ Back to Home</Link>
      <hr />

      <h3>{editingId ? 'Edit Travel Log' : 'Create Travel Log'}</h3>
      <div>
        <label><strong>Title: &nbsp;</strong></label>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      </div>
      <div>
        <label><strong>Description: &nbsp;</strong></label>
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      </div>
      <div>
        <label><strong>Start Date: &nbsp;</strong></label>
        <input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
      </div>
      <div>
        <label><strong>End Date: &nbsp;</strong></label>
        <input name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
      </div>
      <div>
        <label><strong>Post Date: &nbsp;</strong></label>
        <input name="postDate" type="date" value={form.postDate} onChange={handleChange} required />
      </div>

      <div>
        <h4>Tags:</h4>
        {tags.map((tag, i) => (
          <div key={i}>
            <input value={tag} onChange={e => handleTagChange(i, e.target.value)} />
            <button type="button" onClick={() => removeTagInput(i)} disabled={tags.length === 1}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addTagInput}>+ Add Tag</button>
      </div>

      <br />
      {editingId ? (
        <button onClick={updateLog}>Update Log</button>
      ) : (
        <button onClick={createLog}>Create Log</button>
      )}

      <h2>All Your Travel Logs</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Start - End</th>
            <th>Post Date</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.title}</td>
              <td>{log.description}</td>
              <td>{log.startDate?.slice(0, 10)} ~ {log.endDate?.slice(0, 10)}</td>
              <td>{log.postDate?.slice(0, 10)}</td>
              <td>{Array.isArray(log.tags) ? log.tags.join(', ') : ''}</td>
              <td>
                <button onClick={() => editLog(log)}>Edit</button>
                <button onClick={() => deleteLog(log.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TravelLogPage;
