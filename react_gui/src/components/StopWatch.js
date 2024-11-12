import React, { useEffect, useState } from "react";


const StopWatch = ({ timeWhenConnected }) => {

    const [time, setTime] = useState({'hours': '00', 'minute': '00', 'seconds': '00'})

    function convertTime(milliseconds) {
		let seconds = Math.floor((milliseconds / 1000) % 60);
		let minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
		let hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
		return {
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};	
	}

    useEffect(() => {
        let timeElapsed = Date.now() - timeWhenConnected;
        setTime(convertTime(timeElapsed))
    }, [timeWhenConnected]);


    return (
        <div className="bg-gray-800 p-4 rounded shadow-md flex justify-center items-center h-96">
            { time['hours'] }
        </div>
    )
}

export default StopWatch;