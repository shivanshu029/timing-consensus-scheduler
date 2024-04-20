import React from "react";
import AppBar from "./Appbar1";

const Layout1 = ({ children }) => {
  return (
    <div>
      <AppBar />
      {children}
    </div>
  );
};

export default Layout1;
