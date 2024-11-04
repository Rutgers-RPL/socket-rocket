import React,{useState} from "react";

const Port = () => {
  const [input, setInput] = useState("");

  const clear = () => {
    setInput("");
  };
  return (
    <div
      className="flex items-center my-4 
      border-2 rounded-md relative z-50 w-96 bg-white 
      border-neutral-200 "
    >
      <input
        type="text"
        value={input}
        className="w-full px-4 py-2 focus:outline-none rounded-md"
        placeholder="Search port"
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyDown={(event)=>{
          if(event.key ==="Enter"){
            {/*LOGIC TO CONNECT TO PORT HERE*/}
          }
        }}
      />
    </div>
  );
};

export default Port;
