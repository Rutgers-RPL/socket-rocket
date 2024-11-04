import React from "react";

const Chart = ({ title }) => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md flex justify-center items-center h-96">
        <div class="text-blue-300">{ title }</div>
    </div>
  );
};

export default Chart;
