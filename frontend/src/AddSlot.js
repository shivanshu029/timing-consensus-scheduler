import React from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import Layout from "./Layout";
import './AddSlot.css';
function AddSlot() {
  const location = useLocation();
  const [slotsArray, setSlotsArray] = useState([]); // stores starttimes
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const memberType = "User"; // replace with the actual member type
  const Email = location.state; // replace with the actual member email
  console.log("EMAIL: ", Email);

  const handleChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    console.log(value, checked);
    if (checked) {
      setStartTime(value);
      setSlotsArray([...slotsArray, { startTime }]);
    } else {
      setSlotsArray(slotsArray.filter((e) => e !== value));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Slot Array : " + slotsArray);

    slotsArray.forEach((slot) => {
      const { startTime } = slot;
      // convert email to string
      const emailString = Email.id.toString();
      const email = emailString;
      console.log("Email String: ", emailString);
      const slotParams = { date, startTime, memberType, email };

      fetch("http://localhost:8080/api/v1/slots/editSlotEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slotParams),
      })
        .then(() => {
          console.log("Member added to slot:", slotParams);
        })
        .catch((error) => {
          console.error("Error adding member to slot:", error);
        });
    });
  };
  return (
    <Layout>
   <div>
    <style>
        {`
        body {
          background-color: #d4e6f6;
        }
        `}
      </style>
 
    <form onSubmit={handleSubmit}>
      <table style={{ width: '90%',height: '100%' }}>
        
        <thead >
        <tr>
        <th style={{ width: '20%', textAlign: 'center' }}></th>
            <th style={{ width: '45%', fontSize: '3em', color: 'BLUE'}}>BOOK YOUR SLOT</th>
        </tr>

        </thead>
        <tbody>
          <tr  >
          
            <td style={{ fontSize: '1.5em', color: 'blue'}}>
              <label>Pick Date:</label>
              <input type="date" onChange={(e) => setDate(e.target.value)} style={{ fontSize: '1.5em', color: 'black', marginLeft: '100px',marginTop: '20px' }} />
            </td>
            <td style={{ verticalAlign: 'centre' }}></td>
            
              <td style={{ marginLeft:'-100px' }}></td>
              <td>
              <th style={{ width: '60%', fontSize: '3em', color: 'BLUE', textAlign: 'center' }}>SLOT LIST</th>
              <div style={{ display: 'flex', alignItems: 'left', marginTop: '50px' }}>
               <input type="checkbox" name="startTime" value="9:00:00" onChange={handleChange} style={{ marginTop: '16px', marginLeft: '-100px', width: '20px', height: '20px' }} />
                <label style={{ fontSize: '1.6em', color: 'blue',marginTop: '10px',marginLeft: '15px' }}>9:00-10:00</label>
                </div>

              <div style={{ display: 'flex', alignItems: 'left', marginTop: '25px' }}>
              <input type="checkbox" name="startTime" value="10:00:00" onChange={handleChange} style={{ marginTop: '16px', marginLeft: '-100px',width: '20px', height: '20px' }} />
               <label style={{ fontSize: '1.6em', color: 'blue',marginTop: '10px',marginLeft: '15px' }}>10:00-11:00</label>
                </div>

                  <div style={{ display: 'flex', alignItems: 'left',marginTop: '25px' }}>
                    <input type="checkbox" name="startTime" value="11:00:00" onChange={handleChange} style={{ marginTop: '16px', marginLeft: '-100px',width: '20px', height: '20px' }} />
                    <label style={{ fontSize: '1.6em', color: 'blue',marginTop: '10px',marginLeft: '15px' }}>11:00-12:00</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'left',marginTop: '25px' }}>
                    <input type="checkbox" name="startTime" value="12:00:00" onChange={handleChange} style={{ marginTop: '16px', marginLeft: '-100px',width: '20px', height: '20px' }} />
                    <label style={{ fontSize: '1.6em', color: 'blue',marginTop: '10px',marginLeft: '15px' }}>12:00-1:00</label>
                  </div>
               
                </td>
                <td>
               
                <div style={{ display: 'flex', alignItems: 'right',marginLeft: '100px',marginTop: '20px' }}>
                  
                  </div> 
                  <div style={{ display: 'flex', alignItems: 'left',marginTop: '12px'  }}>
                  <input type="checkbox" name="startTime" value="13:00:00" onChange={handleChange} style={{ marginTop: '100px', marginLeft: '-100px', width: '20px', height: '20px' }} />
                  <label style={{ fontSize: '1.6em', color: 'blue',marginTop: '95px',marginLeft: '15px' }}>1:00-2:00</label>
                  </div>
                 
                  <div style={{ display: 'flex', alignItems: 'left',marginTop: '12px'  }}>
                  <input type="checkbox" name="startTime" value="14:00:00" onChange={handleChange} style={{ marginTop: '30px', marginLeft: '-100px', width: '20px', height: '20px' }} />
                  <label style={{ fontSize: '1.6em', color: 'blue',marginTop: '22px',marginLeft: '15px' }}>2:00-3:00</label>
                  </div>
               
                  <div style={{ display: 'flex', alignItems: 'left',marginTop: '12px'  }}>
                    <input type="checkbox" name="startTime" value="15:00:00" onChange={handleChange} style={{ marginTop: '30px', marginLeft: '-100px',width: '20px', height: '20px' }} />
                    <label style={{ fontSize: '1.6em', color: 'blue',marginTop: '22px',marginLeft: '15px' }}>3:00-4:00</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'left',marginTop: '12px'  }}>
                    <input type="checkbox" name="startTime" value="16:00:00" onChange={handleChange} style={{ marginTop: '30px', marginLeft: '-100px',width: '20px', height: '20px' }} />
                    <label style={{ fontSize: '1.6em', color: 'blue',marginTop: '22px',marginLeft: '15px' }}>4:00-5:00</label>
                  </div>
                  
                  
              </td>
              
            </tr>
          </tbody>
        </table>
        <br />
        <input type="submit" value="Add Slot" style={{ fontSize: "1.5em", backgroundColor: "blue", color: "white", borderRadius: "10px", padding: "20px 40px", marginTop: "50px", marginLeft: "20px"}} />

      </form>
    </div>
    </Layout>
  );
}

export default AddSlot;





