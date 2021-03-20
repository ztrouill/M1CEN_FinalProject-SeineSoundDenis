import mapboxgl from "maplibre-gl";
//import { createPopUp, flyToDestination } from "./createPopUp.js"

const maxBounds = new mapboxgl.LngLatBounds(
    new mapboxgl.LngLat(1.9494690347100914, 48.72558904516876),
    new mapboxgl.LngLat(2.9588379311948927, 49.08799874088703)
);


const options = {
    container: "mapContainer",
    style : 'mapbox://styles/zoyeah/cklavutgp0ui917qrpn3hp51g',
    center: [2.3580232, 48.935773],
    minZoom: 10,
    maxZoom: 22,
    maxBounds: maxBounds
}

const accesssToken = 'pk.eyJ1Ijoiem95ZWFoIiwiYSI6ImNrbGF2Z2NpdzAweW0ycG1qbGhqNDdueDcifQ.ShZVfutCPoCi0KpnNd8MfQ';

function flyToDestination(map, coordinates) {
    const options = {
        center: coordinates,
        zoom: 20,
        pitch: 90
    }

    map.flyTo(options);
}

function turnAround(map, timestamp) {
    console.log("turn map")
        // clamp the rotation between 0 -360 degrees
        // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
        map.rotateTo((timestamp / 200) % 360, { duration: 0 });
        // Request the next frame of the animation.
        requestAnimationFrame(turnAround);
}

function createPopUp(map, feature) {
    console.log("hola")

    const description =  feature.properties.description;
    const coordinates =  feature.geometry.coordinates;


    const paragraphe = window.document.createElement("p");
    const button = window.document.createElement("a");

    paragraphe.innerHTML = description;
    button.innerHTML = "Visiter";
    paragraphe.appendChild(button);

    button.addEventListener("click", function(){
        flyToDestination(map, coordinates);
       // turnAround(map, 0)
    });

    return paragraphe;
}

export function createMap() {

    let accesssToken = 'pk.eyJ1Ijoiem95ZWFoIiwiYSI6ImNrbGF2Z2NpdzAweW0ycG1qbGhqNDdueDcifQ.ShZVfutCPoCi0KpnNd8MfQ';
    let mapbox = mapboxgl;
    mapbox.accessToken = accesssToken;

  
    const map = new mapboxgl.Map(options);

    return map;
}

export function createMarkers(map) {
    
    const features = map.queryRenderedFeatures( {layers: ['poi-lieux-de-cultes']});
    console.log("len ="+ features.length)       
    for (let i = 0; i < features.length; i++) {
       //  let el = document.createElement("img ");
       // Ici changer la feature si on veut essayer de mettre des poi stylés
       console.log("loop") //  el.className = "marker";
       //  el.style.width = 40 + "px";
       //  el.style.height = 40 + "px";
       const content = createPopUp(map, features[i]) 
       console.log("after content")
       let el = document.createElement("img");
        el.src = require("./assets/poi.svg");
        el.style.width = 40 + "px";
        el.style.height = 40 + "px";
       const popup = new mapboxgl.Popup()
                                .setDOMContent(content)
                                .setLngLat(features[i].geometry.coordinates); 
        let marker = new mapboxgl.Marker(el)
                    .setLngLat(features[i].geometry.coordinates)
                    .addTo(map);

        
        marker.getElement().addEventListener("click", function() {
            marker.setPopup(popup);

            //document.getElementsByClassName('button')[0].addEventListener("load", function() {
              //  document.querySelector('.button').addEventListener('click', function() {
               // console.log("hello");
               // })
            //})
        });
   }
}