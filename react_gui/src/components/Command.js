import React, { useState } from "react";

const Command = (props) => {
  const [value, setValue] = useState("select value");

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (!(value === "select value")) {
      props.onSubmit(value);
    }
    setValue("select value");
  };

  return (
    <div className="w-full py-6 pb-8 flex justify-evenly">
      <div className="relative inline-block">
        <button
          type="button"
          className={`px-4 py-2 text-white ${
            value === "select value" ? "bg-blue-700" : "bg-green-700"
          } ${
            value === "select value"
              ? "hover:bg-blue-800"
              : "hover:bg-green-800"
          } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center`}
          onClick={toggleDropdown}
        >
          {value}
        </button>
        {isOpen && (
          <div className="origin-top-right absolute left-100 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <ul
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <li>
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setValue("1");
                    closeDropdown();
                  }}
                >
                  Option 1
                </a>
              </li>
              <li>
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setValue("2");
                    closeDropdown();
                  }}
                >
                  Option 2
                </a>
              </li>
              <li>
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setValue("3");
                    closeDropdown();
                  }}
                >
                  Option 3
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <button className="bg-blue-700" onClick={handleSubmit}>
        send
      </button>
    </div>
  );
};

export default Command;
