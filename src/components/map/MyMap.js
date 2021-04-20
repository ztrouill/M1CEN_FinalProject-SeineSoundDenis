import mapboxgl from "mapbox-gl";
import { createMarkers } from "./MyMarkers.js"
import { createPopUp } from "./MyPopUp.js";

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
    const layers = [ // Penser à changer ici
        {
            "name": "apprentissages-loisirs",
            "color": "#79D9B6"
        },
        {
            "name": "arts-et-artisanat",
            "color": "#9DA7D7"
        },
        {
            "name": "lieux-de-culte",
            "color": "#4BADB1"
        },
        {
            "name": "transports-travail-commerces",
            "color": "#F3B99A"
        }
    ];
    console.log("wolrd")

    map.on("load", function () {

        for (let i = 0; i < layers.length; i++)
            map.on("click", layers[i].name, (e) => {
                console.log(e.features[0].layer.paint["text-color"]);
                console.log(e.features[0]);
                map.setLayoutProperty(layers[i].name, "visibility", "visible");
                createPopUp(e.features[0], layers[i].color);
            })
        // let markers = createMarkers();
        // let popup = createPopUp(markers);
    });
}