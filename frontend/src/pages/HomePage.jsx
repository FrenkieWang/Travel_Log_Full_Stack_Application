import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HOST_URL = 'http://localhost:5000';
const JOURNEY_API_URL = `${HOST_URL}/journeyPlan`;
const TRAVEL_API_URL = `${HOST_URL}/travelLog`;

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userPlanNames, setUserPlanNames] = useState([]);
  const [userTravelLogTitles, setUserTravelLogTitles] = useState([]);
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    // Get Current User
    axios.get(`${HOST_URL}/user/current`, { headers: { Authorization: token } })
      .then(user => {
        setUser(user.data);

        // Get User's JourneyPlans' names
        let planIds = JSON.parse(user.data.journeyPlans);
        axios.get(JOURNEY_API_URL, { headers: { Authorization: token } })
          .then(journey => {
            const idSet = new Set(planIds.map(id => id.toString()));
            const names = journey.data
              .filter(plan => idSet.has(plan.id.toString()))
              .map(plan => plan.name);
            setUserPlanNames(names);
          });

        // Get User's TravelLogs' names
        let logIds = JSON.parse(user.data.travelLogs);
        axios.get(TRAVEL_API_URL, { headers: { Authorization: token } })
          .then(travel => {
            const idSet = new Set(logIds.map(id => id.toString()));
            const titles = travel.data
              .filter(log => idSet.has(log.id.toString()))
              .map(log => log.title);
              setUserTravelLogTitles(titles);
          });
      })
      .catch(error => {
        console.error(error);
        localStorage.removeItem('token');
        navigate('/');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleAddressUpdate = () => {
    const token = localStorage.getItem('token');
    if (!newAddress.trim()) {
      alert('Please enter a new address.');
      return;
    }

    axios.post(`${HOST_URL}/user/updateAddress`, { newAddress }, { headers: { Authorization: token } })
      .then(response => {
        alert(response.data);
        setUser(prevUser => ({ ...prevUser, address: newAddress }));
        setNewAddress('');
      })
      .catch(error => {
        console.error(error);
        alert(error.response?.data || 'Error updating address');
      });
  };

  if (!user) return <div>User does not exist</div>;

  const { username, email, address } = user;

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Address:</strong> {address}</p>

      <label>Update your address:</label>
      <input
        type="text"
        placeholder="Enter new address"
        value={newAddress}
        onChange={event => setNewAddress(event.target.value)}
      />
      <button onClick={handleAddressUpdate}>Update Address</button>

      <h3>Your Travel Logs:</h3>
      <ul>
        {
          userTravelLogTitles.length > 0
            ? userTravelLogTitles.map((title, index) => <li key={index}>{title}</li>)
            : <li>Empty</li>
        }
      </ul>
      <h3>Your Journey Plans:</h3>
      <ul>
        {
          userPlanNames.length > 0
            ? userPlanNames.map((name, index) => <li key={index}>{name}</li>)
            : <li>Empty</li>
        }
      </ul>

      <button onClick={() => navigate('/journey-plans')} style={{ marginTop: '20px' }}>
        View My Journey Plans
      </button>

      <button onClick={() => navigate('/travel-logs')} style={{ marginTop: '20px' }}>
        View My Travel Logs
      </button>

      <br /><br />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
