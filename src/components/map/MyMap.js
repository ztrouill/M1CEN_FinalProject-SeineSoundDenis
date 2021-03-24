import mapboxgl from "mapbox-gl";
import { createMarkers } from "./MyMarkers.js"
import { extrudeBuildings } from "../../extrudeBuilding.js"
import { createPopUp } from "./MyPopUp.js";

const mapbox = mapboxgl
const accesssToken = 'pk.eyJ1Ijoiem95ZWFoIiwiYSI6ImNrbGF2Z2NpdzAweW0ycG1qbGhqNDdueDcifQ.ShZVfutCPoCi0KpnNd8MfQ';

mapbox.accessToken = accesssToken;

const maxBounds = new mapboxgl.LngLatBounds(
    new mapboxgl.LngLat(1.9494690347100914, 48.72558904516876),
    new mapboxgl.LngLat(2.9588379311948927, 49.08799874088703)
);

const options = {
    container: "mapContainer",
    style : 'mapbox://styles/zoyeah/cklavutgp0ui917qrpn3hp51g/draft',
    center: [2.3580232, 48.935773],
    minZoom: 10,
    maxZoom: 22,
    maxBounds: maxBounds
}

export const map = new mapboxgl.Map(options);


export function createMap() {
    map.on("load", function () {
        let markers = createMarkers();
        let popup = createPopUp(markers);
        
       // extrudeBuildings();
    });
}