import React, { memo } from "react";
import { useMap } from 'react-leaflet'


const UpdateMapSettings =  ({ center, zoomLevel, maxBounds, minZoom, maxZoom } ) => { 

    const map = useMap();
    
    map.setView(center, zoomLevel);
  
    map.setMaxBounds(maxBounds);
    map.setMinZoom(minZoom);
    map.setMaxZoom(maxZoom);
  
}

export default memo(UpdateMapSettings);