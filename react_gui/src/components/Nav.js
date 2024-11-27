import React, {useState, useEffect} from "react";


const Navbar = ( { data, webSocket } ) => {
    // console.log(data['numDataPoints']);
    // function sendMessage() {
    //   if(webSocket != null) {
    //      webSocket.send('hiii');

    //   }
    // }

    function getTime() {
      const now = new Date();
  
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
  
      return `${hours}:${minutes}:${seconds}`;
    }

    const [currTime, setCurrTime] = useState(getTime());

    useEffect(()=>{
      const interval = setInterval(() => {
        setCurrTime(getTime());
      }, 1000)
  
      return () => clearInterval(interval);
    }, [])

    return(
        <nav className="bg-sky-950 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/RRPLLogo.png" alt="Logo" className="flex h-10 w-50" />

            {/* <button onClick={sendMessage} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Button</button> */}
          </div>
          <div className="flex items-center space-x-4">
              <h1 className="text-sky-100 text-right">Current Time: {currTime}</h1>
              <h1 className="text-sky-100 text-right">Data Points: {data['numDataPoints']}</h1>

          </div>
          <div className="flex items-center space-x-4">
          <h1 className="text-sky-100 text-right">Connection Status: { data['connection'] ? 'Connected' : 'Disconnected' }</h1>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;