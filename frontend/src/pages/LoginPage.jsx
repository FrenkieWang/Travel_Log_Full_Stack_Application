import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const HOST_URL = import.meta.env.VITE_HOST_URL || 'http://localhost:5000';

const LoginPage = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post(`${HOST_URL}/user/login`, form)
      .then(response => {
        const token = response.data; // header.payload.signature
        localStorage.setItem('token', token);

        // Parse token to get userId
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64)); // base64 String -> JSON String
        localStorage.setItem('userId', payload.id); 

        navigate('/home');
      })
      .catch(error => alert(error.response.data));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>

      <p><Link to="/register">Register an account</Link></p>
    </div>
  );
};

export default LoginPage;