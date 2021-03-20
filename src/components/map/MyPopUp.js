import { map }  from "./MyMap.js"
import { launchSound } from "../sound/myWave.js"

function turnAround() {     
    map.easeTo({
        bearing: map.getBearing() - 10,
        duration: 3000,
        easing: x => x 
        });
        
    requestAnimationFrame(turnAround);
}

function flyToDestination(coordinates) {
    const options = {
        center: coordinates,
        zoom: 20,
        pitch: 80,
    }

    map.flyTo(options);
}

function createDOMElement(feature) {
    const description =  feature.properties.description;
    const coordinates =  feature.geometry.coordinates;


    const paragraphe = window.document.createElement("p");
    const button = window.document.createElement("a");

    paragraphe.innerHTML = description;
    button.innerHTML = "Visiter";
    button.className = "cta-listen"

    paragraphe.appendChild(button);

    button.addEventListener("click", function(){
        flyToDestination(coordinates);
        map.on("zoomend", function() {
            console.log("hello")
            console.log("maps =  " + map + "options = " + map.getBearing())
            
            turnAround(0);
        })
          
    });

    return paragraphe
}

export function createPopuUp(feature) {

    let popup = new mapboxgl.Popup().setDOMContent(createDOMElement(feature, popup))
                                .setLngLat(feature.geometry.coordinates);

    let ctaListen = document.querySelector("cta-listen")
    return popup;
}

export function createPopUp(markers) {
    const features = map.queryRenderedFeatures( {layers: ['poi-lieux-de-cultes']});
    let popup = [];

    for (let i = 0; i < features.length; i++) {
        let pop = new mapboxgl.Popup({closeOnClick : true}).setDOMContent(createDOMElement(features[i]))
        .setLngLat(features[i].geometry.coordinates);
        console.log("markers = " + markers[i])
        markers[i].getElement().addEventListener("click", function() {
            console.log("Hello")
            markers[i].setPopup(pop);
           pop.on("open", function() {
               document.querySelector(".cta-listen").addEventListener("click", function() {
                   pop.addClassName("hide");
                   launchSound();
               })
           })
        })
        popup.push(pop);
    }

    return popup;
}