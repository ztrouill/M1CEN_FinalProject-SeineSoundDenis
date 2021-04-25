function createSocialMedia(tab, color) {
    const icons = [
        "fab fa-linkedin-in",
        "fab fa-facebook-square",
        "fab fa-instagram"
    ]

    const container = document.createElement("div");
    container.className = "after-social-media-container";

    for (let i = 0; i < icons.length; i++) {
        const icon = document.createElement('i');
        icon.className = icons[i];
        icon.style.color = color;
        container.appendChild(icon);
    }

    tab.append(container);
}

function createContent(tab) {
    const text = {
        intro: "Seine-Sound-Denis est un projet sur le temps long !",
        content:
            `Les paysages sonores de la <span style="white-space: nowrap;">Seine-Saint-Denis</span> en 2024 seront mis en ligne ici pendant et à l’issue des Jeux Olympiques 2024.
            <br/><br/>
            En attendant, suivez-nous et participez à la vie de <span style="white-space: nowrap;">Seine-Sound-Denis</span> sur les réseaux sociaux !`
    }

    const intro = document.createElement("div");
    const content = document.createElement("div");

    intro.className = "after-intro";
    content.className = "after-content";

    intro.innerHTML = text.intro;
    content.innerHTML = text.content;

    tab.append(intro);
    tab.append(content);
}

function createElements(color) {    
    const container = document.createElement("div");
    container.id = "after-container";
    container.className = "tab-close";

    for (let i = 0; i < 2; i++) {
        const tab = document.createElement("div");
        const titleContainer = document.createElement("div");
        const title = document.createElement("div");
        const arrowUp = document.createElement("img");

        if (i == 0) {
            const logoJO = document.createElement("img");
            const textLogoContainer = document.createElement("div");

            logoJO.src = require("/src/assets/logo_jo.svg");
            title.innerHTML = "2024";
            textLogoContainer.id = "text-logo-after";

            textLogoContainer.append(title);
            textLogoContainer.append(logoJO);
            titleContainer.append(textLogoContainer);
        }
        else {
            title.innerHTML = "Et après ?";
            titleContainer.append(title);
        }

        title.className = "after-title";
        tab.className = "after-tab";
        titleContainer.className = "after-title-container";
        arrowUp.src = require("/src/assets/up.svg");
        arrowUp.className = "arrow-up";

        titleContainer.append(arrowUp);
        tab.append(titleContainer);

        createContent(tab, color);
        createSocialMedia(tab, color);

        container.append(tab);
    }

    document.querySelector("#left-container").append(container);
}

function toggleBefore(tab, arrowUp) {
    const container = document.querySelector("#left-container");
    const trackList = document.querySelector("#track-list-container"); 
    const year = document.querySelector("#year-container");

    if (!trackList.classList.contains("fade-out")) {
        trackList.classList.toggle("fade-out");
        year.classList.toggle("fade-out");
    }
    else {
        trackList.classList.toggle("fade-in");
        year.classList.toggle("fade-in");
    }

    
    setTimeout(() => {
        container.classList.toggle("left-after");
        toggleTab();
        container.classList.toggle("left-before");
        trackList.classList.toggle("hide");
        year.classList.toggle("hide");
        tab.classList.add("show-tab");
        arrowUp.classList.add("rotate-arrow-down");
        tab.classList.remove("replace-tab");
    }, 750);
}

function toggleTab() {
    const afterContainer = document.querySelector("#after-container");
    const tab = document.querySelectorAll(".after-tab");
   afterContainer.classList.toggle("tab-close");
   afterContainer.classList.toggle("tab-open");

    for (let i = 0; i < tab.length; i++)
        tab[i].classList.toggle("replace-tab");

}

function showTab(tab, arrow) {
    tab.classList.add("show-tab");
    arrow.classList.add("rotate-arrow-down");
}

function hideTab(tab, arrowUp) {
    tab.classList.toggle("show-tab");
    arrowUp.classList.toggle("rotate-arrow-down");
    tab.classList.toggle("hide-tab");
    arrowUp.classList.toggle("rotate-arrow-up");
}

function createEvent() {
    const arrowUp = document.querySelectorAll(".arrow-up");
    const tab = document.querySelectorAll(".after-tab");
    const container = document.querySelector("#after-container");

    for (let i = 0; i < arrowUp.length; i++) {
        arrowUp[i].addEventListener("click", (e) => {
            if (!document.querySelector(".show-tab")) {
                toggleBefore(tab[i], arrowUp[i]);
                // if (e.target == arrowUp[i]) {
                //     tab[i].classList.add("show-tab");
                //     arrowUp[i].classList.add("rotate-arrow-down");
                // }
            }
            // else {
            //     console.log(e.target.classList);
            //     if (!e.target.classList.contains("rotate-arrow-down")) {
            //        if (i == 0)
            //             hideTab(tab[1], arrowUp[1]);
            //        else
            //             hideTab(tab[0], arrowUp[0]);
            //         showTab(tab[i], arrowUp[i]);
            //     }
            //     else {
            //         hideTab(tab[i], arrowUp[i]);
            //     }
            // }
        });
    }
}

export default function createAfterTab(color) {
    createElements(color);
    createEvent();
}