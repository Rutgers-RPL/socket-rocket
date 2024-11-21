import React, { useEffect, useState } from "react";
import Navbar from "./Nav.js"
import useSocket from "../hooks/useSocket.js";
import Chart from "./Chart.js"
import Card from "./Card.js";
import Header from "./Header.js";
import Details from "./Details.js";
import ChartLayout from "./ChartLayout.js";
import StopWatch from "./StopWatch.js";
import GPS from "./GPS.js";

const Dashboard = () => {
  const { data, isConnect, webSocket } = useSocket('ws://localhost:8765');

  const [formattedData, setFormattedData] = useState({});

  const [timeWhenConnected, setTimeWhenConnected] = useState(null);

  const [numDataPoints, setNumDataPoints] = useState(0);

  // const [batteryDelta, setBatteryDelta] = useState(0);

  // const [refreshRate, setRefreshRate] = useState(0);

  // const [latitude, setLatitude] = useState(0);

  // const [longitude, setLongitude] = useState(0);

  const batteryCharges=[];


  function calculateBatteryDelta(batteryDeltaArr) {
      let delta=batteryDeltaArr[batteryDeltaArr.length-1]-batteryDeltaArr[0];
    
			if(batteryDeltaArr.length > 10) {
				batteryDeltaArr.shift();
			}
      return delta;
  }


  useEffect(() => {
    if(isConnect && !timeWhenConnected) {
      setTimeWhenConnected(timeWhenConnected)
    }

    if(!isConnect) {
      setTimeWhenConnected(null);
    }

    if(data){
      setFormattedData((prevFormattedData) => {
        let tempFormat = {...prevFormattedData};
        Object.keys(data).forEach((key) => {
          if (!tempFormat[key]) {
            tempFormat[key] = [];
          }
          tempFormat[key].push(data[key])
        })
        setNumDataPoints(numDataPoints + 1);
        batteryCharges.push(data["main_voltage_v"]);   
        console.log(batteryCharges);     
        return tempFormat; 
      });
  } 
  }, [data, isConnect]);

  

  // <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
  //   //     <Header port="need to fix" />
  //   //   </div>
    //   <div className="md:col-span-2 row-span-4">
    //     <ChartLayout data=""/>
    //   </div>
    //   <div>
    //     <Card>Overview</Card>
    //   </div>
    //   <div className="row-span-2 l:row-span-3">
    //     <Details
    //       details={{
    //         status: "good",
    //         time: "1029102390123",
    //         battery: "5",
    //         pressure: "10",
    //         temp: "40",
    //         latitude: "1",
    //         longitude: "1",
    //       }}
    //     />
    //   </div>

  return (
    <main>
          <Navbar data={{'connection': isConnect, 'numDataPoints': numDataPoints, "batteryAvgChange": batteryCharges.length >10 ? calculateBatteryDelta(batteryCharges) : '0'}} webSocket={webSocket} />
          <div className="grid grid-flow-row grid-cols-4 bg-gray-900 h-screen">
          
            <div className="border-double border-r-4 border-sky-500 col-span-3 grid grid-cols-2 h-full overflow-auto">
              <div className="col-span-2 grid grid-cols-2 gap-4 p-4 ">
                <div className="col-span-2">
                  <GPS data={{'latitude': formattedData['latitude'], 'longitude': formattedData['longitude']}}/>
                </div>
                <Chart title='Acceleration' data={formattedData["acceleration"]} />
                <Chart title='Velocity'  data={formattedData['velocity']} />
                <Chart title='Position'  data={formattedData['position']} />
                <Chart title='Barometric Altitude'  data={formattedData['barometer_hMSL_m']} />
                <Chart title='Z Acceleration' data={formattedData['z_acceleration']}/>
                  {/* <StopWatch timeWhenConnected={timeWhenConnected} /> */}
              </div>
            </div>
            <div className="col-span-1 gap-4 p-4">
            <Details
            data={formattedData}
          />
            </div>
            
          </div>
    </main>
  );
};

export default Dashboard;
