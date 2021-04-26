import mapboxgl from "mapbox-gl";
import { createPopUp } from "./MyPopUp.js";
import { themes } from "../themes.js";

const mapbox = mapboxgl
const accesssToken = 'pk.eyJ1Ijoiem95ZWFoIiwiYSI6ImNrbGF2Z2NpdzAweW0ycG1qbGhqNDdueDcifQ.ShZVfutCPoCi0KpnNd8MfQ';

mapbox.accessToken = accesssToken;

const maxBounds = new mapboxgl.LngLatBounds(
    new mapboxgl.LngLat(1.9494690347100914, 48.72558904516876),
    new mapboxgl.LngLat(2.9588379311948927, 49.08799874088703)
);

const options = {
    container: "map",
    style : 'mapbox://styles/zoyeah/cklavutgp0ui917qrpn3hp51g/draft',
    center: [2.3580232, 48.935773],
    minZoom: 11,
    maxZoom: 22,
    maxBounds: maxBounds
}

export const map = new mapboxgl.Map(options);


export function createMap() {
    return new Promise((resolve) => {
        map.on("load", function () {
            for (const key in themes) {
                map.on("click", key, (e) => {
                    map.setLayoutProperty(key, "visibility", "visible");
                    createPopUp(e.features[0], themes[key].color, key);
                })
            }
            resolve();
        });
    })  
}