import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ListItemButton } from '@mui/material';

export default function Appbar() {
  const [loggedIn, setLoggedIn] = useState(true); // assuming the user is initially logged in
  const navigate=useNavigate();
  const location=useLocation();
  const handleLogout = () => {
    // perform any necessary logout actions here, such as clearing the user's session or local storage
    setLoggedIn(false); // update the state to reflect that the user is now logged out
    navigate("/LoginPage",{state:location.state});
  };
  const handleReset = () => {
    navigate("/ResetPassword",{state:location.state});
  };

  const [open, setOpen] = useState(false); // state to control the open/closed state of the sidepane

  const toggleDrawer = (open) => (event) => {
    // toggle the open/closed state of the sidepane based on the click event
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };
  const handleAddSlot = () => {
    navigate("/AddSlot",{state:location.state});
  };
  const handleCheckSlot = () => {
    navigate("/CheckSlot",{state:location.state});
  };
  const handleDashboard = () => {
    navigate("/Dashboard",{state:location.state});
  };
  const handleBookFacility = () => {
    navigate("/BookFacility",{state:location.state});
  };
  const sidepaneContent = (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItem button>
          <ListItemButton onClick={handleAddSlot}>Add Slot</ListItemButton>
        </ListItem>
      </List><Divider />
      <List>
        <ListItem button>
        <ListItemButton onClick={handleCheckSlot}>Check Slot</ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
        <ListItemButton onClick={handleDashboard}>Dashboard</ListItemButton>
        </ListItem></List><Divider />
        <List>
        <ListItem button>
        <ListItemButton onClick={handleBookFacility}>Book Facility</ListItemButton>
        </ListItem></List><Divider />
        <List>
        <ListItem button>
        <ListItemButton onClick={handleReset} color="inherit">Reset Password</ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)} // open the sidepane when the menu icon is clicked
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Schedular App
          </Typography>
          <Button onClick={handleLogout} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)} // close the sidepane when the user clicks outside of it
      >
        {sidepaneContent}
      </Drawer>
    </Box>
  );
}
