import React from "react";


const Navbar = ( { data, webSocket } ) => {

    // function sendMessage() {
    //   if(webSocket != null) {
    //      webSocket.send('hiii');

    //   }
    // }

    return(
        <nav className="bg-sky-950 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/RRPLLogo.png" alt="Logo" className="h-10 w-50" />
            <h1 className="text-sky-100">Connection Status: { data['connection'] ? 'Connected' : 'Disconnected' }</h1>
            <h1 className="text-sky-100">Data Points: {data['numDatapoints']}</h1>
            {/* <h1 className="text-sky-100">Battery Delta: {data["batteryAvgChange"]}</h1> */}
            {/* <h1 className="text-sky-100">Refresh Rate: {refreshRate}</h1>
            <h1 className="text-sky-100">latitude: {latitude}</h1> */}
            {/* <h1 className="text-sky-100">longitude: {longitude}</h1> */}

            {/* <button onClick={sendMessage} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Button</button> */}
          </div>

        </div>
      </nav>
    );
}

export default Navbar;