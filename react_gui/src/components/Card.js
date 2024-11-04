import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md flex justify-center items-center h-96">
      {children}
    </div>
  );
};

export default Card;
