import React, { useEffect, useId, useState } from "react";
import {
    AxisScrollStrategies,
		lightningChart,
    Themes,
} from "@lightningchart/lcjs";


//Charting logic: set up chart, create a lineseries for the list, append points to the lineseries
const Chart = ({ title, data }) => {

  if (!data) {
    data = []
  }
  const id = useId()
  const [chart, setChart] = useState(undefined);
  const [lineSeries, setSeries] = useState(undefined)


  //create a lineseries for the list
  useEffect(() => {
    if (!chart) return;
    
    if(!lineSeries){ 
      console.log('yo')
      const series = chart.addLineSeries( {
      dataPattern: {
        pattern: 'ProgressiveX',
        // regularProgressiveStep: true,
      }
       })
      series.setName(title)
      setSeries(series)  
    }

    // return () => {
    //   if(!lineSeries) return;
    //   lineSeries.dispose();
    // }

  }, [data?.length, chart])


  //append a point to the chart
  useEffect(() => {
    if(!lineSeries || !data) return;
    // console.log(data)
    lineSeries.add({
      x: lineSeries.getPointAmount() + 1, //num of existing points in the graph + 1
      y: data[data.length - 1] //data point
    })
    // if(!lineSeries) {
    //   lineSeries.getDefaultAxisX.onScaleChange((start, end) => {
    //     if(end - start > 400) {
    //       lineSeries.axisX.setInterval(end - 400, end)
    //     }
    //   })
    // }
    
  }, [lineSeries, data.length, chart])


  //chart set up
  useEffect( () => {
    const chart = lightningChart(
      {
      license: "0002-n3Kei2+JqP3mbgcisdTOqyUYkI9dKwBznrJ7kaTi8nYLPWlsFq7MjLj6N0CRKnGEhitt1MItFk92rt167zJjsqiu-MEUCIDmZsdNiMy4uw/r8V7eEl10rvnW8OF+DmWC7itAAEChIAiEA2cNQHKBUzKVR56eimH17WbRLSvoAhWAI7IMSB0PCUyg=",
      licenseInformation: {
        appTitle: "LightningChart JS Trial",
        company: "LightningChart Ltd."
    },

    })
                  .ChartXY({ container: id, theme:Themes.cyberSpace })
                  .setTitle(title)
                  
    // if (showLegend) legendbox = chart.addLegendBox().add(chart);
    chart.getDefaultAxisX()
          .setScrollStrategy(AxisScrollStrategies.progressive)
          .setInterval({
            start: 0,
            end: 400,
            stopAxisAfter: false,
          })
    
    setChart(chart);
    
    return () => {
      chart.dispose();
    }
  }, [id])


  return (
    <div className="bg-gray-800 p-4 rounded shadow-md flex justify-center items-center h-96">
      <div className="size-full" id={id} />
    </div>
  );
};

export default Chart;
