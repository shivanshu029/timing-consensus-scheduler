import React from "react";
import AppBar from "./components/Appbar";

const Layout = ({ children }) => {
  return (
    <div>
      <AppBar />
      {children}
    </div>
  );
};

export default Layout;
