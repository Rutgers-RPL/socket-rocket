import React, { useState } from "react";
import Card from "./Card.js";

const Details = ({data}) => {

  /* Write function calculations needed here */
  batteryDeltaArr = [];
  const [batteryAvgChange, setBatteryAvgChange] = useState(0)

  const detailsList = {
    "Time": data['time_us'] ? data['time_us'].slice(-1): 'N/A',
    "Battery": batteryAvgChange,
    "Temperature": data['temperature_c']? data['temperature_c'].slice(-1): 'N/A',
    "Latitude": data['latitude']? data['latitude'].slice(-1): 'N/A',
    "Longitude": data['longitude']? data['longitude'].slice(-1): 'N/A',
  };

  function calculateAverageChange(arr) {
		let difference = 0;
		difference = arr[arr.length - 1] - arr[0];
		return Math.round((difference / (0.1*arr.length)) * 1000) / 1000 ;
		
	}

  useState(() => {
    batteruDeltaArr = [...batteryDeltaArr, data['main_voltage_v'].slice(-1)]

    if (batteryDeltaArr.length > 10) {
      batteryDeltaArr.shift();
    }

    setBatteryAvgChange(calculateAverageChange(batteryDeltaArr));

  }, [data['main_voltage_v']])



  return (
    <Card>
      <ul className="w-full h-full flex flex-col justify between divide-y-1 text-sky-100">
        {Object.keys(detailsList).map((item) => {
          return (
            <li key={item} className="flex-1 flex justify-between items-center">
              <span>{item}</span>
              <span>{detailsList[item]}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default Details;
