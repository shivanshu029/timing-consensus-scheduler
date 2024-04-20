import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AddSlot from './AddSlot';
import Dashboard from './Dashboard';
import CheckSlot from './CheckSlot';
import reportWebVitals from './reportWebVitals';
import LoginPage from './LoginPage'
import ResetPassword from './ResetPassword'
import SignUpPage from './SignUpPage';
import BookFacility from './BookFacility';
import ValidateEmail from './ValidateEmail';

import{
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const Router=createBrowserRouter([
  {
      path: "/",
      element:<App/>,
  },
  {
    path: "BookFacility",
    element:<BookFacility/>,
  },
  {
    path: "SignUpPage",
    element:<SignUpPage/>,
  },
  {
    path: "LoginPage",
    element:<LoginPage/>,
  },
  {
    path: "AddSlot",
    element:<AddSlot/>,
  },
  {
    path: "Dashboard",
    element:<Dashboard/>,
  },
  {
    path: "CheckSlot",
    element:<CheckSlot/>,
  },
  {
    path: "ResetPassword",
    element:<ResetPassword/>,
  },
  {
    path: "ValidateEmail",
    element:<ValidateEmail/>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
