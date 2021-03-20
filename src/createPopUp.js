function flyToDestination(map, coordinates) {
    const options = {
        center: coordinates,
        zoom: 20,
        pitch: 90
    }

    map.flyTo(options);
}

export default function createPopUp(map, feature) {
    console.log("hola")

    const description =  feature.properties.description;
    const coordinates =  feature.geometry.coordinates;


    const paragraphe = window.document.createElement("p");
    const button = window.document.createElement("button");

    paragraphe.innerHTML = description;
    button.innerHTML = "Visiter";

    paragraphe.appendChild(button);

    button.addEventListener("click", function(){
        flyToDestination(map, coordinates);
    });

    return paragraphe;
}