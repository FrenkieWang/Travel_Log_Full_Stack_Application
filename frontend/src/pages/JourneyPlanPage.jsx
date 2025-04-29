import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HOST_URL = 'http://localhost:5000';
const JOURNEY_API_URL = `${HOST_URL}/journeyPlan`;

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

function JourneyPlanPage() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [activities, setActivities] = useState(['']);
  const [locations, setLocations] = useState(['']);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = () => {
    axios.get(`${HOST_URL}/user/current`, { headers: { Authorization: token } })
      .then(user => {
        const planIds = JSON.parse(user.data.journeyPlans);

        axios.get(JOURNEY_API_URL, { headers: { Authorization: token } })
          .then(journey => {            
            const myPlans = journey.data.filter(plan => planIds.includes(plan.id));

            const cleaned = myPlans.map(plan => ({
              ...plan,
              locations: JSON.parse(plan.locations),
              activities: JSON.parse(plan.activities)
            }));
            setPlans(cleaned);
          });
      })
      .catch(error => console.error(error));
  };
  
  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleListChange = (type, index, value) => {
    const list = type === 'activities' ? [...activities] : [...locations];
    list[index] = value;
    type === 'activities' ? setActivities(list) : setLocations(list);
  };

  const addListInput = type => {
    type === 'activities'
      ? setActivities([...activities, ''])
      : setLocations([...locations, '']);
  };

  const removeListInput = (type, index) => {
    const list = type === 'activities' ? [...activities] : [...locations];
    list.splice(index, 1);
    type === 'activities' ? setActivities(list) : setLocations(list);
  };

  const clearForm = () => {
    setForm({ name: '', startDate: '', endDate: '', description: '' });
    setActivities(['']);
    setLocations(['']);
    setEditingId(null);
  };

  const validate = () => {
    if (
      !form.name ||
      !form.startDate ||
      !form.endDate ||
      !form.description ||
      locations.filter(l => l.trim() !== '').length === 0 ||
      activities.filter(a => a.trim() !== '').length === 0
    ) {
      alert('Please fill in all fields, and ensure at least one location and one activity.');
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

  const createPlan = () => {
    if (!validate()) return;

    const data = {
      ...form,
      activities: activities.filter(a => a.trim() !== ''),
      locations: locations.filter(l => l.trim() !== '')
    };

    axios.post(JOURNEY_API_URL, data, { headers: { Authorization: token } })
      .then(response => {
        const userId = localStorage.getItem('userId');
        const planId = response.data.id;
        return axios.post(`${HOST_URL}/user/addJourneyPlan`, { userId, planId });
      })
      .then(() => {
        clearForm();
        fetchPlans();
      })
      .catch(error => console.error(error));
  };

  const editPlan = plan => {
    setForm({
      name: plan.name,
      startDate: plan.startDate.slice(0, 10),
      endDate: plan.endDate.slice(0, 10),
      description: plan.description
    });
    setActivities(plan.activities || []);
    setLocations(plan.locations || []);
    setEditingId(plan.id);
  };

  const updatePlan = () => {
    if (!validate()) return;

    const data = {
      ...form,
      activities: activities.filter(a => a.trim() !== ''),
      locations: locations.filter(l => l.trim() !== '')
    };

    axios.put(`${JOURNEY_API_URL}/${editingId}`, data, {headers: { Authorization: token }})
      .then(() => {
        clearForm();
        fetchPlans();
      })
      .catch(error => console.error(error));
  };

  const deletePlan = id => {
    axios.delete(`${JOURNEY_API_URL}/${id}`, {headers: { Authorization: token }})
      .then(() => {
        const userId = localStorage.getItem('userId');
        return axios.post(`${HOST_URL}/user/removeJourneyPlan`, { userId, planId: id });
      })
      .then(() => fetchPlans())
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Journey Plan Manager</h1>
      <Link to="/home">⬅ Back to Home</Link>
      <hr />

      <h3>{editingId ? 'Edit Journey Plan' : 'Create Journey Plan'}</h3>
      <div>
        <label><strong>Plan Name: &nbsp;</strong></label>
        <input name="name" placeholder="Plan Name" value={form.name} onChange={handleChange} required />
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
        <label><strong>Description: &nbsp;</strong></label>
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      </div>
      <div>
        <h4>Locations:</h4>
        {locations.map((loc, i) => (
          <div key={i}>
            <input value={loc} onChange={e => handleListChange('locations', i, e.target.value)} />
            <button type="button" onClick={() => removeListInput('locations', i)} disabled={locations.length === 1}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addListInput('locations')}>+ Add Location</button>
      </div>

      <div>
        <h4>Activities:</h4>
        {activities.map((act, i) => (
          <div key={i}>
            <input value={act} onChange={e => handleListChange('activities', i, e.target.value)} />
            <button type="button" onClick={() => removeListInput('activities', i)} disabled={activities.length === 1}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addListInput('activities')}>+ Add Activity</button>
      </div>

      <br />
      {editingId ? (
        <button onClick={updatePlan}>Update Plan</button>
      ) : (
        <button onClick={createPlan}>Create Plan</button>
      )}

      <h2>All Your Journey Plans</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Start - End</th>
            <th>Locations</th>
            <th>Activities</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>{plan.id}</td>
              <td>{plan.name}</td>
              <td>{plan.startDate?.slice(0, 10)} ~ {plan.endDate?.slice(0, 10)}</td>
              <td>{plan.locations.join(', ')}</td>
              <td>{plan.activities.join(', ')}</td>
              <td>{plan.description}</td>
              <td>
                <button onClick={() => editPlan(plan)}>Edit</button>
                <button onClick={() => deletePlan(plan.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default JourneyPlanPage;
