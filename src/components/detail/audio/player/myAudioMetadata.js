export function createTime(){
    const audioInfoContainer = document.querySelector("#info-audio-container");
    const timeContainer = document.createElement("div");
    const time = {
        currentTime: document.createElement("span"),
        slash: document.createElement("span"),
        duration: document.createElement("span")
    };

    timeContainer.id = "time-container";

    time.currentTime.id = "current-time";
    time.duration.id = "duration";
    time.slash.id = "time-slash";

    time.slash.innerHTML = "/";

    audioInfoContainer.appendChild(timeContainer);

    for (let i = 0; i < Object.values(time).length; i++)
        timeContainer.appendChild(Object.values(time)[i]);
}

export function createTitle(name) {
    let titleContainer = document.createElement("div");
    let title = document.createElement("span");

    titleContainer.id = "title-sound-track";
    
    title.innerHTML = name;
    title.id = "title-name-track";
    titleContainer.append(title);
    document.querySelector("#player-container").prepend(titleContainer);
}

export function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if (minutes <= 9)
        minutes = `0${parseInt(minutes)}`;

    if (seconds < 10)
        seconds = `0${parseInt(seconds)}`;

    return `${minutes}:${seconds}`
}

export function getCurrentTime(timestamp) {
    let el = document.querySelector("#current-time");
    const audio = document.querySelector("audio");
    let currentTime = audio.currentTime;
    
    el.innerHTML = formatTime(currentTime);
    
    let req = requestAnimationFrame(getCurrentTime);
  
    if (audio.paused)
      cancelAnimationFrame(req);
}

export function createMetaData(name) {  
    createTitle(name);
    createTime();
}