function filterData(audioBuffer) { // Réduction du nombre de data 
    const rawData = audioBuffer.getChannelData(0); // Récupération uniquemenet du canal gauche
    const samples = 80; //Ici voir combien on veut avoir de "barres" // Valeur peut etre à modifier
    const blockSize = Math.floor(rawData.length / samples);
    let filteredData = [];

    for (let i = 0; i < samples; i++) {
        let blockStart = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++)
            sum += Math.abs(rawData[blockStart + j]);
        filteredData.push(sum / blockSize);
    }

    return filteredData;
}

function normalize(data) {
    const multiplier = Math.pow(Math.max(...data), -1);

    return data.map(n => n * multiplier);
}

export function getAudioData(file, name, content) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    let audioData = null;
    return new Promise((resolve) => {
        fetch(file)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(function(audioBuffer) {
            const filteredData = filterData(audioBuffer);
            audioData = normalize(filteredData)
            sessionStorage.setItem(name, JSON.stringify(audioData));
            resolve(audioData);
        })
    });
}