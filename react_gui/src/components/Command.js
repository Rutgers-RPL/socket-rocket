import React, { useState } from "react";

const Command = ({webSocket, data}) => {

  const [msg, setMsg] = useState("");

  const inputChange = (e) => {
    setMsg(e.target.value);
  }

  const handleSubmit = () => {
    if(msg.trim() !== "") {
      console.log(msg);

      if (webSocket != null) {
        webSocket.send(msg)
      }
      
      setMsg("");
    }
  }

  const cameraSubmit = () => {
    if (webSocket != null) {
        webSocket.send("FIRE");
    }
  }

  // Determine button color based on status
  const isStatusActive = data?.status === 1;
  const cameraButtonClass = isStatusActive 
    ? "rounded bg-green-500 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-green-950 focus:shadow-none active:bg-green-950 hover:bg-green-950 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    : "rounded bg-red-500 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-red-950 focus:shadow-none active:bg-red-950 hover:bg-red-950 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";

  return (
    <div className="w-full max-w-sm min-w-[200px] ">
    <div className="relative">
      <input 
        type="text" 
        value={msg}
        className="w-full bg-transparent placeholder:text-slate-400 text-sky-100 text-sm border border-slate-200 rounded-md pl-3 pr-32 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Command" 
        onChange={inputChange}
      />
      <div className="absolute right-1 top-1 flex space-x-1">
        <button
          className="rounded bg-sky-500 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-sky-950 focus:shadow-none active:bg-sky-950 hover:bg-sky-950 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handleSubmit}
        >
          Send
        </button>
        <button
          className={cameraButtonClass}
          type="button"
          onClick={cameraSubmit}
        >
          Camera
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default Command;