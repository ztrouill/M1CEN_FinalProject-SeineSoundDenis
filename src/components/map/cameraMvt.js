import { map } from "./MyMap";

export function goBack() {
    const options = {
        center: [2.4671998611368906, 48.91107134952631],
        zoom: 11,
        pitch: 0
    }

    map.flyTo(options);
}

export function flyToDestination(coordinates, zoom, pitch) {
    const options = {
        center: coordinates,
        zoom: 20,
        pitch: 80
    }
    map.flyTo(options);
}

export function turnAround() {
    map.easeTo({
        bearing: map.getBearing() - 10,
        duration: 3000,
        easing: x => x
    });

    requestAnimationFrame(turnAround);
}