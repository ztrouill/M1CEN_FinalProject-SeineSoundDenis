import mapboxgl from "mapbox-gl";
import { createPopUp } from "./MyPopUp.js";
import { themes } from "../themes.js";
import { toggleFilterButton } from "../utils/filters/myResponsiveFilters.js";

const mapbox = mapboxgl
const accesssToken = 'pk.eyJ1Ijoiem95ZWFoIiwiYSI6ImNrbGF2Z2NpdzAweW0ycG1qbGhqNDdueDcifQ.ShZVfutCPoCi0KpnNd8MfQ';
const center = [2.4671998611368906, 48.91107134952631];
mapbox.accessToken = accesssToken;

const mobile = window.innerHeight > window.innerWidth ? true : false;

const boundsMobile = new mapboxgl.LngLatBounds(
    new mapboxgl.LngLat(2.2672786084438883, 48.68057157132225),
    new mapboxgl.LngLat(2.6219384890110575, 49.16391038102961)
);


const destkop = new mapboxgl.LngLatBounds(
    new mapboxgl.LngLat(2.05101548730795, 48.76433151235997),
    new mapboxgl.LngLat(2.8761296673371533, 49.03857181031432)
);

const goToBounds = mobile ? boundsMobile : destkop;


const maxBounds = new mapboxgl.LngLatBounds(
    new mapboxgl.LngLat(1.990696473640753, 48.74986158641394),
    new mapboxgl.LngLat(2.923870961000887, 49.060990429165486)
);


const options = {
    container: "map",
    style : 'mapbox://styles/zoyeah/cklavutgp0ui917qrpn3hp51g/draft',
    center: center,
    minZoom: 4,
    maxZoom: 22,
}

export const map = new mapboxgl.Map(options);

export function toggleMapControlers() {
    const container = document.querySelector(".mapboxgl-control-container");

    container.classList.toggle("fade-in");
    container.classList.toggle("fade-out");
}

export function createMap() {
    return new Promise((resolve) => {
        map.on("load", function () {
            for (const key in themes)
                map.setLayoutProperty(key, "visibility", "none");
            map.setLayoutProperty("Other_Big_Cities", "visibility", "none");
            map.setLayoutProperty("villes-limitrophes", "visibility", "none");
            map.setLayoutProperty("ssd-roads", "visibility", "none");
            map.setLayoutProperty("ssd-natural", "visibility", "none");
           // map.addControl(new mapboxgl.NavigationControl());
            document.querySelector(".mapboxgl-control-container").classList.add("fade-in");
            // All tiles is loaded ?
          
            setTimeout(() => {
                map.fitBounds(goToBounds);
            }, 750);
            map.once("zoomend", () => {
                map.setLayoutProperty("Other_Big_Cities", "visibility", "visible");
                map.setLayoutProperty("villes-limitrophes", "visibility", "visible");
                map.setLayoutProperty("ssd-roads", "visibility", "visible");
                map.setLayoutProperty("ssd-natural", "visibility", "visible");


                map.setMaxBounds(map.getBounds());
                map.setMinZoom(map.getZoom());
                for (const key in themes) {
                    map.on("click", key, (e) => {
                        if (document.querySelector("#show-filters"))
                            toggleFilterButton(document.querySelector("#show-filters"));
                        toggleMapControlers();
                        createPopUp(e.features[0], themes[key].color, key);
                    })
                }
                resolve();
            })
        });
    })  
}