import React from "react";
import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import {useState} from 'react'
import Layout from "./Layout";

function Dashboard() {
  const navigate = useNavigate();
  const location=useLocation();
    console.log(location.state);
  function handleAddSlotClick() {
    navigate("/AddSlot",{state:location.state});
  }

  function handleCheckSlotClick() {
    navigate("/CheckSlot",{state:location.state});
  }

  function handleCheckSlotClick() {
    navigate("/BookFacility",{state:location.state});
  }

  return (
    <Layout>
    <style>
        {`
        body {
          background-color: #d4e6f6;
        }
        `}
      </style>
      

      
      <div>
  <h1 style={{fontSize: '3em', color: 'BLUE'}}>Welcome to BITS Scheduler</h1>
  <button onClick={handleAddSlotClick} style={{marginRight: '400px',fontSize: "1.5em", backgroundColor: "blue", color: "white", borderRadius: "10px", padding: "20px 40px", marginTop: "70px", marginLeft: "-150px"}}>Add Slot</button>
  <button onClick={handleCheckSlotClick} style={{marginRight: "400px",fontSize: "1.5em", backgroundColor: "blue", color: "white", borderRadius: "10px", padding: "20px 40px", marginTop: "70px", marginLeft: "-150px"}}>Check Slot</button>
  <button onClick={handleCheckSlotClick} style={{marginRight: '-170px',fontSize: "1.5em", backgroundColor: "blue", color: "white", borderRadius: "10px", padding: "20px 40px", marginTop: "70px", marginLeft: "-150px"}}>Book Facility</button>
</div></Layout>
  );
}

export default Dashboard;
