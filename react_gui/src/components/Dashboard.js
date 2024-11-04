import React from "react";
import Navbar from "./Nav.js"
import Chart from "./Chart.js"
import Card from "./Card.js";
import Header from "./Header.js";
import Details from "./Details.js";
import ChartLayout from "./ChartLayout.js";
const Dashboard = () => {
  return (
    // <div
    //   className="h-screen grid grid-cols-1 
    // md:grid-cols-2 xl:grid-cols-3 grid-rows-8 
    // md:grid-rows-7 xl:grid-rows-5 auto-rows-fr 
    // gap-6 p-10 font-oxanium"
    // >
    //   <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
    //     <Header port="need to fix" />
    //   </div>
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
    // </div>

    <main>
        <Navbar />
        <div className="grid grid-cols-2">

          <div className="col-span-2 grid grid-cols-2 gap-4 p-4 bg-gray-900 min-h-screen">
            <Chart title="Chart 1" />
            <Chart title="Chart 2" />
            <Chart title="Chart 3" />
            <Chart title="Chart 4" />
          </div>

          <div></div>



        </div>


        

    </main>

   


    


  );
};

export default Dashboard;
