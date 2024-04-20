import React, { useState } from 'react';
import { TextField, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Layout1 from './layout1';
import "./components/LoginPage.css";

const API_URL = 'http://localhost:8080/api/v1/slots/signup';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [memberType, setMemberType] = useState('');
  const [name, setName] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false); // state for drawer
  const navigate = useNavigate();

  const handleTransfer = () => {
    navigate("/LoginPage");
  };

  const handleStudentClick = () => {
    setDrawerOpen(false);
    setMemberType('student');
  };

  const handleStaffClick = () => {
    setDrawerOpen(false);
    setMemberType('staff');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, memberType  })
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/Dashboard", { state: { id: email, token: data.token } })
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('An error occurred while logging in');
    }
  };

  return (
    <Layout1>
      {/* Drawer component */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          {/* Student button */}
          <ListItem button onClick={handleStudentClick}>
            <ListItemText primary="Student" />
          </ListItem>
          {/* Staff button */}
          <ListItem button onClick={handleStaffClick}>
            <ListItemText primary="Staff" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white',opacity:'93%',borderRadius:'10px', padding: '50px',marginLeft:'50px',marginTop: '125px',width: '325px', height: '400px' }}>
      <TextField
          label="Name"
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          style={{ marginTop:'6px',width: '300px', height: '40px' }}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          style={{ marginTop:'24px',width: '300px', height: '40px' }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          style={{ marginTop:'34px',width: '300px', height: '40px' }}
        />
        {/* Button to open the drawer */}
        <Button onClick={() => setDrawerOpen(true)} color="primary" style={{ marginTop:'20px',width: '300px', height: '40px' }}>
          Register As
        </Button>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop:'15px',width: '300px', height: '40px' }}>
          SignUp
        </Button>
        
        {/* Button to navigate to the login page */}
        
        <Button onClick={handleTransfer} color="primary" style={{ marginTop:'30px',width: '300px', height: '40px' }}>
          Login Page
        </Button>
        <label style={{ marginTop:'10px',width: '300px', height: '40px' }}>Already Registered ?</label>
        </div>
      </form>
    </Layout1>
  );
};


export default SignUp;