import React from "react";
import Card from "./Card.js";
import ChartRow from "./ChartRow.js";
import Chart from "./Chart.js";
const ChartLayout = ({ data }) => {
  return (
    <Card>
        <div className="grid grid-cols-2">
          <div className="col-span-2 grid grid-cols-2 gap-4 p-4 bg-gray-900 min-h-screen">
            <Chart title='Acceleration' data={data["acceleration"]} />
            <Chart title='Velocity'  data={data['velocity']} />
            <Chart title='Position'  data={data['position']} />
            <Chart title='Barometric Altitude'  data={data['barometer_hMSL_m']} />
            <Chart title='Z Acceleration' data={data['z_acceleration']}/>
            {/* <StopWatch timeWhenConnected={timeWhenConnected} /> */}
          </div>
        </div>
    </Card>
  );
};

export default ChartLayout;
