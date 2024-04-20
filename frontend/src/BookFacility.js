import React, { useState, useEffect } from "react";
import Layout from "./Layout";
//import { useLocation } from 'react-router';

function BookFacility() {
  const [date, setDate] = useState("");
  const [email, setFacilityEmail] = useState();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [startTime, setStartTime] = useState();
  const [slotsArray, setSlotsArray] = useState([]);
  const memberType = "Facility";
  //const location = useLocation();

  useEffect(() => {
    if (email && date) {
      // Fetch available slots for the selected email and date
      fetch(
        `http://localhost:8080/api/v1/slots/getSlots?emails=${email}&date=${date}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Extract the start times from the fetched data
          const startTimes = data.map((slot) => slot.startTime);
          setAvailableSlots(startTimes);
        });
    }
  }, [email, date]);

  console.log("availableSlots: ", availableSlots)

  const handleChange = (e) => {
    const value = e.target.value;       // selected slot start time
    console.log("selectedSlot: ", value, "Type: ", typeof selectedSlot);
    const isChecked = e.target.checked;
    if (isChecked) {
      // Check if the selected slot is available
      if (availableSlots.length > 0 && availableSlots.includes(value)) {
        setStartTime(value);
        setSlotsArray([...slotsArray, { startTime }]);
        console.log("slotsArray: ", slotsArray)
      } else {
        alert(`${value} is not available`);
      }
    } else {
        setSlotsArray(slotsArray.filter((slot) => slot.startTime !== value));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("email: ",email,"date: ", date);
    console.log("slotsArray: ", slotsArray);

    slotsArray.forEach((slot) => {
        const { startTime } = slot;
        
        const slotParams = { date, startTime, memberType, email };
  
        fetch("http://localhost:8080/api/v1/slots/editSlotEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(slotParams),
        })
          .then(() => {
            console.log("Facility booked for:", slotParams);
          })
          .catch((error) => {
            console.error("Error adding facility to slot:", error);
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
        <th style={{ width: '20%', textAlign: 'center'}}></th>
            <th style={{ width: '38%', fontSize: '3em', color: 'BLUE' }}>BOOK YOUR FACILITY</th>
        </tr>

        </thead>
        <tbody>
          <tr  >
          
            <td style={{ fontSize: '1.5em', color: 'blue'}}>
              <label>Emails:</label>
              <input type="text" onChange={(e) => setFacilityEmail(e.target.value)} style={{ fontSize: '1.5em', color: 'black', marginLeft: '10px',marginTop: '20px' }} />
              <label>Pick date:</label>
              <input type="date" onChange={(e) => setDate(e.target.value)} style={{ fontSize: '1.5em', color: 'black', marginLeft: '10px',marginTop: '20px' }} /></td>
            <td style={{ verticalAlign: 'centre' }}>

            </td>
            
              <td style={{ marginLeft:'-100px' , marginTop:'-200px'}}></td>
              <td>
              
              <div style={{ display: 'flex', alignItems: 'left', marginTop: '50px' }}>
               <input type="checkbox" name="startTime" value="9:00:00" onChange={handleChange} style={{ marginTop: '16px', marginLeft: '-200px', width: '20px', height: '20px' }} />
                <label style={{ fontSize: '1.6em', color: 'blue',marginTop: '10px',marginLeft: '15px' }}>9:00-10:00</label>
                </div>

              <div style={{ display: 'flex', alignItems: 'left', marginTop: '25px' }}>
              <input type="checkbox" name="startTime" value="10:00:00" onChange={handleChange} style={{ marginTop: '16px', marginLeft: '-200px',width: '20px', height: '20px' }} />
               <label style={{ fontSize: '1.6em', color: 'blue',marginTop: '10px',marginLeft: '15px' }}>10:00-11:00</label>
                </div>

                  <div style={{ display: 'flex', alignItems: 'left',marginTop: '25px' }}>
                    <input type="checkbox" name="startTime" value="11:00:00" onChange={handleChange} style={{ marginTop: '16px', marginLeft: '-200px',width: '20px', height: '20px' }} />
                    <label style={{ fontSize: '1.6em', color: 'blue',marginTop: '10px',marginLeft: '15px' }}>11:00-12:00</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'left',marginTop: '25px' }}>
                    <input type="checkbox" name="startTime" value="12:00:00" onChange={handleChange} style={{ marginTop: '16px', marginLeft: '-200px',width: '20px', height: '20px' }} />
                    <label style={{ fontSize: '1.6em', color: 'blue',marginTop: '10px',marginLeft: '15px' }}>12:00-1:00</label>
                  </div>
               
                </td>
                <td>
               
                <div style={{ display: 'flex', alignItems: 'right',marginLeft: '100px',marginTop: '20px' }}>
                  
                  </div> 
                  <div style={{ display: 'flex', alignItems: 'left',marginTop: '1px'  }}>
                  <input type="checkbox" name="startTime" value="13:00:00" onChange={handleChange} style={{ marginTop: '102px', marginLeft: '-20px', width: '20px', height: '20px' }} />
                  <label style={{ fontSize: '1.6em', color: 'blue',marginTop: '102px',marginLeft: '15px' }}>1:00-2:00</label>
                  </div>
                 
                  <div style={{ display: 'flex', alignItems: 'left',marginTop: '12px'  }}>
                  <input type="checkbox" name="startTime" value="14:00:00" onChange={handleChange} style={{ marginTop: '30px', marginLeft: '-20px', width: '20px', height: '20px' }} />
                  <label style={{ fontSize: '1.6em', color: 'blue',marginTop: '22px',marginLeft: '15px' }}>2:00-3:00</label>
                  </div>
               
                  <div style={{ display: 'flex', alignItems: 'left',marginTop: '12px'  }}>
                    <input type="checkbox" name="startTime" value="15:00:00" onChange={handleChange} style={{ marginTop: '30px', marginLeft: '-20px',width: '20px', height: '20px' }} />
                    <label style={{ fontSize: '1.6em', color: 'blue',marginTop: '22px',marginLeft: '15px' }}>3:00-4:00</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'left',marginTop: '12px'  }}>
                    <input type="checkbox" name="startTime" value="16:00:00" onChange={handleChange} style={{ marginTop: '30px', marginLeft: '-20px',width: '20px', height: '20px' }} />
                    <label style={{ fontSize: '1.6em', color: 'blue',marginTop: '22px',marginLeft: '15px' }}>4:00-5:00</label>
                  </div>
                  
                  
              </td>
              
            </tr>
          </tbody>
        </table>
        <br />
        <input type="submit" value="Book Facility" style={{ fontSize: "1.5em", backgroundColor: "blue", color: "white", borderRadius: "10px", padding: "20px 40px", marginTop: "50px", marginLeft: "20px"}} />

      </form>
    </div>
    </Layout>
  );
}

export default BookFacility;
