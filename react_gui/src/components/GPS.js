import React, { useEffect, useRef, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import UpdateMapSettings from "./gps-components/UpdateMapSettings";
import UpdateLocation from "./gps-components/UpdateLocation";





const GPS = ({data}) => {
    const [center, setCenter] = useState([0,0]);
    const [minZoom, setMinzoom] = useState(null);
    const [maxZoom, setMaxzoom] = useState(null);
    const [maxBounds, setMaxbounds] = useState(null)
    const [zoomLevel, setZoomlevel] = useState(13);
    const [currPos, setCurrPos] = useState(center); //[lat, long]

    //this parses the tiles.json file, which contains boundaries, zoomlevels, and center for the Tiles folder
    useEffect(() => {
      const jsonFile = fetch('/Tiles/tiles.json')
      .then(res => res.text()) //tiles.json contains comments, so convert contents into text to be deleted later
      .then((tilesText) => {

        if(tilesText)
        { 
          const deletedComments = tilesText.replace(/\/\/.*$/gm, "").trim(); //return contents of tiles.json without the comments

          const tilesOptions = JSON.parse(deletedComments); //convert the contents into a json object
          console.log(tilesOptions);
          setCenter([tilesOptions['center'][1], tilesOptions['center'][0]])
          setMinzoom(tilesOptions['minzoom'])
          setMaxzoom(tilesOptions['maxzoom'])
          setMaxbounds( [
              [tilesOptions["bounds"][1], tilesOptions["bounds"][0]],
              [tilesOptions["bounds"][3], tilesOptions["bounds"][2]]
          ])
          setZoomlevel(tilesOptions["center"][2]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }, [])

    useEffect(() => {
      setCurrPos([data['latitude']? data['latitude'].slice(-1): center[0], data['longitude']? data['longitude'].slice(-1): center[1]])
    }, [data['latitude'], data['longitude']]);

        
    return(
        <div className="bg-gray-800 p-4 rounded shadow-md flex justify-center items-center h-96">
        <MapContainer 
        center={center} 
        zoom={zoomLevel} 
        minZoom={minZoom}
        maxBounds={maxBounds}
        maxZoom={maxZoom}
        scrollWheelZoom={true} 
        style={ {height:'100%', width: '100%'}}
        >            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="/Tiles/{z}/{x}/{y}.png"
            />
            {/* <LocationMarker /> */}
            <UpdateMapSettings
            center={center}
            zoomLevel={zoomLevel}
            maxBounds={maxBounds}
            minZoom={minZoom}
            maxZoom={maxZoom}/>
            <UpdateLocation 
            latitude={currPos[0]}
            longitude={currPos[1]} 
            />
        </MapContainer>
    </div>
    )


}

export default GPS;