import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Layout1 from './layout1';
import "./components/LoginPage.css";


const API_URL = 'http://localhost:8080/api/v1/slots/login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/Dashboard",{state : {id : email, token: data.token}})
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('An error occurred while logging in');
    }
  };

  return (
    <Layout1>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ backgroundColor: 'white',opacity:'93%',borderRadius:'10px', padding: '50px',marginLeft:'50px',marginTop: '125px',width: '325px', height: '200px' }}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        style={{ marginTop:'6px',width: '300px', height: '40px' }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        style={{ marginTop:'40px',width: '300px', height: '40px' }}
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: 35 }}>
        Login
      </Button>
      </div>
    </form>
    </Layout1>
  );
};

export default Login;
