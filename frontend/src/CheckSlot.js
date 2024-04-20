import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import './CheckSlot.css';
import { TextField,Button } from "@mui/material";
// import { useLocation } from 'react-router';

function CheckSlot() {
  const [date, setDate] = useState("");
  const [emails, setEmails] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  // const location = useLocation();

  useEffect(() => {
    if (emails && date) {
      // Fetch available slots for the selected name and date
      fetch(
        `http://localhost:8080/api/v1/slots/getSlots?emails=${emails}&date=${date}`)
        .then((response) => response.json())
        .then((data) => setAvailableSlots(data));
    }
  }, [emails, date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(emails, date);
    if (emails && date) {
      // Fetch available slots for the selected name and date
      console.log("memberIds", emails, "date", date);
      fetch(
        `http://localhost:8080/api/v1/slots/getSlots?emails=${emails}&date=${date}`
      ) // no cors
        .then((response) => response.json())
        .then((data) => setAvailableSlots(data));
      console.log("availableSlots", availableSlots);
    } else {
      setAvailableSlots([]);
    }
  };

  return (
    <Layout>
    <div>
 
    
  
    
    
  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
 


  <div style={{ backgroundColor: 'white',opacity:'80%',borderRadius:'10px', padding: '50px',marginTop: '125px',width: '325px', height: '350px' }}>
   <div style={{marginBottom:'50px'}}>
  <label style={{ fontSize: '3em', color: 'blue',marginBottom: '10px',marginLeft: '15px' }}>CHECK SLOT</label>
  
  </div>
<TextField 
 
  label="Name"
  type="text"
  onChange={(e) => setEmails(e.target.value)}
  margin="normal"
  style={{ marginTop:'6px',width: '300px', height: '40px' }}
/>
<div style={{padding: '5px',marginTop: '1px'}}></div>
<TextField
  type="date"
  onChange={(e) => setDate(e.target.value)}
  margin="normal"
  style={{ marginTop:'20px',width: '300px', height: '40px' }}
/>
<div style={{padding: '10px',marginTop:'50px'}}></div>
<Button type="submit" variant="contained" color="primary" style={{ fontSize: "1.5em",marginTop: 16,backgroundColor: "blue",color: "white",padding: "8px 16px" }}>


  SUBMIT
</Button>
</div>

 
  </form>
 
    {availableSlots.length > 0 && (
      <div>
        <h2>Available Slots:</h2>
        <ul>
          {availableSlots.map((slot) => (
            <li key={slot.id}>{slot.startTime}</li>
          ))}
        </ul>
      </div>
    )}
  </div></Layout>
  );
}

export default CheckSlot;
