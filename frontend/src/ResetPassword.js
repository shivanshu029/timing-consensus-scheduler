import React, { useState } from "react";
import { useLocation } from "react-router";
import Layout from "./Layout";
import { Button,TextField } from "@mui/material";

function ResetPassword() {
  const location = useLocation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const Email = location.state;
  console.log("EMAIL: ", Email);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emailString = Email.id.toString();
    const email = emailString;
    const slotParams = { email, oldPassword, newPassword };
  
    try{
    // Send a POST request to the server to change the password
    const response = await fetch("http://localhost:8080/api/v1/slots/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slotParams),
    });
      const data = await response.json();
      if (response.ok) {
        alert("Password changed successfully.");
      } else {
        alert(data.message);
      }
    }catch(error) {
        alert("There was an error changing the password.");
    }
  };
  

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
      <div style={{ backgroundColor: 'white',opacity:'60%',borderRadius:'10px', padding: '50px',marginLeft:'530px',marginTop: '125px',width: '325px', height: '200px' }}>
        <TextField
        label="Old Password"
        type="password"
        onChange={(e) => setOldPassword(e.target.value)}
        margin="normal"
        style={{ marginTop:'6px',width: '300px', height: '40px' }}
      />
      <TextField
        label="New Password"
        type="password"
        onChange={(e) => setNewPassword(e.target.value)}
        margin="normal"
        style={{ marginTop:'40px',width: '300px', height: '40px' }}
      />
        <br />
        <br />
        <Button type="submit" value="Change Password" variant="contained" color="primary"style={{ marginTop:'20px',width: '300px', height: '40px' }}>Change Password</Button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </Layout>
  );
}

export default ResetPassword;
