import React from "react";


const Navbar = ( { data } ) => {
    return(
        <nav className="bg-sky-950 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/RRPLLogo.png" alt="Logo" className="h-10 w-50" />
          </div>
        </div>
      </nav>
    );
}

export default Navbar;