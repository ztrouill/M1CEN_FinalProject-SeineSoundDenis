import { map } from "./MyMap";

export function goBack() {
    const options = {
        center: [2.3580232, 48.935773],
        zoom: 11,
        pitch: 0
    }

    map.flyTo(options);
}

export function flyToDestination(coordinates) {
    const options = {
        center: coordinates,
        zoom: 20,
        pitch: 80,
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