import React from "react";
import Port from "./Port.js"
const Header = ({ port }) => {
  return (
    <div className="xl:ps-32">
      <h1 className="text-5xl">RRPL GUI- LISTENING ON PORT: {port}</h1>
      <Port/>
    </div>
  );
};

export default Header;
