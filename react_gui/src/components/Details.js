import React from "react";
import Card from "./Card.js";

const Details = ({details}) => {
  const detailsList = {
    status: "status",
    time: "time_us",
    battery: "main_voltage_v",
    pressure: "barometer_hMSL_m",
    temp: "temperature_c",
    latitude: "latitude_degrees",
    longitude: "longitude_degrees",
  };
  /* Write function calculations needed here */

  return (
    <Card>
      <ul className="w-full h-full flex flex-col justify between divide-y-1">
        {Object.keys(detailsList).map((item) => {
          return (
            <li key={item} className="flex-1 flex justify-between items-center">
              <span>{detailsList[item]}</span>
              <span>{details[item]}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default Details;
