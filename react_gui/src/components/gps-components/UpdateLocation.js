import { icon } from "leaflet";
import React, {memo} from "react";
import { Marker } from "react-leaflet";

const customIcon = icon( {
    iconUrl: 'spaceship.png',
    iconSize:     [40, 40], // size of the icon
    // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor

})

const UpdateLocation = ({ latitude, longitude }) => {
    


    return (
        <Marker 
        icon={customIcon}
        position={[latitude, longitude]}
        />
    )

}

export default memo(UpdateLocation);