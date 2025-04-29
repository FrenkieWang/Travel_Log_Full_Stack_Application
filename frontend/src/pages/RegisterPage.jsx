import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 

const HOST_URL = process.env.REACT_APP_HOST_URL || 'http://localhost:5000';

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    address: ''
  });

  const navigate = useNavigate();

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post(`${HOST_URL}/user/register`, form)
      .then(response => {
        alert(response.data);
        navigate('/');
      })
      .catch(error => alert(error.response.data));
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password (min 8 chars)" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p><Link to="/">Go Back to Login Page</Link></p>
    </div>
  );
};

export default RegisterPage;