
<script>
    import * as L from "leaflet";
    import * as tiles from "../tiles/tiles.json"
    import { onMount, afterUpdate } from "svelte";
    import GeoRasterLayer from "georaster-layer-for-leaflet";
    import parseGeoraster from "georaster";


    export let data = {};
    
    var map
    var osm;
    var sat;
    var marker;
    var mapElem;

    function updatePosition() {
        let lat = data.latitude_degrees[data.latitude_degrees.length-1];
        let lng = data.longitude_degrees[data.longitude_degrees.length-1];
        let latLng = L.latLng(lat, lng);
        marker.setLatLng(latLng);
    }
    
    onMount(() => {

        map = L.map(mapElem, {
            minZoom: tiles["minzoom"],
            maxZoom: tiles["maxzoom"],
            center: [tiles.center[1], tiles["center"][0]],
            zoom: tiles["center"][2],
            maxBounds: [
                [tiles["bounds"][1], tiles["bounds"][0]],
                [tiles["bounds"][3], tiles["bounds"][2]]
            ],
            
        })

        var overlayControl = L.control.layers().addTo(map);
        let url_to_geotiff_file = "src/LAADS_[@-74.5,40.5,14.0z].tif";

        fetch(url_to_geotiff_file)
        .then(response => response.arrayBuffer())
            .then(arrayBuffer => {
                parseGeoraster(arrayBuffer).then(georaster => {
                //console.log("georaster:", georaster);
                    sat = new GeoRasterLayer({
                        georaster: georaster,
                        opacity: 0.7,
                        resolution: 256 // optional parameter for adjusting display resolution
                    })
                    osm = L.tileLayer('src/tiles/{z}/{x}/{y}.png', {
                                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            }).addTo(map);
                            
                    overlayControl.addBaseLayer(sat, "Sattelite");
                    overlayControl.addBaseLayer(osm, "OSM");
            })
           
        });
        marker = L.marker([tiles["center"][1], tiles["center"][0]]).addTo(map);
        
    })

    afterUpdate(() => {
        if(Object.keys(data).length != 0) {
            updatePosition();
        }

    })


</script>



<div class="map" bind:this={mapElem} style="width: 590px; height: 450px;">
</div>