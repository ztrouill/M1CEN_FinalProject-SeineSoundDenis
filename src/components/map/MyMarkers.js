import { map } from "./MyMap.js"
import { createPopUp } from "./MyPopUp.js"


export function createMarkers() {
    console.log(map)
    let markers = [];


    const features = map.queryRenderedFeatures({ layers: ['poi-lieux-de-cultes'] });
    for (let i = 0; i < features.length; i++) {
        let el = document.createElement("img");
        el.src = require("../../assets/poi.svg");
        el.style.width = 40 + "px";
        el.style.height = 40 + "px";

        
    
            //         el.src = require("../../assets/basilique.png");
        //         el.id = "poi-svg-element";
        //         el.style.width = 100 + "px";
        //         el.style.height = 150 + "px";
        // }

            console.log(el);
            let marker = new mapboxgl.Marker(el).setLngLat(features[i].geometry.coordinates)
                .addTo(map);

            markers.push(marker);
        }
        return markers;
    }