import React, { useState } from "react";
import Card from "./Card.js";
import { ResponsiveContainer, AreaChart, Area, Tooltip,XAxis,YAxis } from "recharts";
const Chart = ({ title }) => {
  const details = {
    status: "good",
    time: "1029102390123",
    battery: "5",
    pressure: "10",
    temp: "40",
    latitude: "1",
    longitude: "1",
  };
  const [data, setData] = useState(details);
  const [filter, setFilter] = useState(title);

  const formatData = () => {};
  return (
    <Card>
      <ResponsiveContainer>
        <AreaChart data={formatData(data)}>
          <Area
            type="montone"
            dataKey="value" 
            stroke="#312e81"
            fillOpacity={1}
            strokeWidth={0.5}
          />
          <Tooltip/>
          <XAxis dataKey={"time"}/>
          <YAxis domain={["dataMin","dataMax"]}/>
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
