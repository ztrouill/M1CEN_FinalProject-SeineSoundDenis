export function createSocialMedia(tab, color) {
    const social = {
        linkedin: {
            url: "https://linkedin.fr",
            icon: "fab fa-linkedin-in"
        },
        facebook: {
            url: "https://facebook.fr",
            icon: "fab fa-facebook-square"
        },
        instagram: {
            url: "https://instagram.fr",
            icon: "fab fa-instagram" 
        }
    }

    const container = document.createElement("div");
    container.className = "after-social-media-container";

    for (const media in social) {
        const link = document.createElement("a");
        const icon = document.createElement("i");
        
        link.href = social[media].url;
        icon.className = social[media].icon;
        icon.style.color = color;
        
        link.appendChild(icon);
        container.appendChild(link);
    }

    tab.append(container);
}

export function createContent(tab) {
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

            logoJO.src = require("../../../assets/logo_jo.svg");
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
        arrowUp.src = require("../../../assets/up.svg");
        arrowUp.className = "arrow-up";

        titleContainer.append(arrowUp);
        tab.append(titleContainer);

        createContent(tab, color);
        createSocialMedia(tab, color);

        container.append(tab);
    }

    document.querySelector("#left-container").append(container);
}

function toggleUpContent() {
    const trackList = document.querySelector("#track-list-container-desktop");
    const year = document.querySelector("#year-container");

    trackList.classList.toggle("fade-in");
    year.classList.toggle("fade-in");
    trackList.classList.toggle("fade-out");
    year.classList.toggle("fade-out");
}

function openTab(tab, arrow) {
    tab.classList.add("show-tab");
    arrow.classList.add("rotate-arrow-down");
    tab.classList.remove("closed-tab");
    arrow.classList.remove("rotate-arrow-up");
}

function closeTab(tab, arrow) {
    tab.classList.remove("show-tab");
    arrow.classList.remove("rotate-arrow-down");
    tab.classList.add("closed-tab");
    arrow.classList.add("rotate-arrow-up");
}

function createEvent() {
    const arrow = document.querySelectorAll(".arrow-up");
    const tab = document.querySelectorAll(".after-tab");
    const container = document.querySelector("#after-container");

    for (let i = 0; i < arrow.length; i++) {
        arrow[i].addEventListener("click", (e) => {
            if (!document.querySelector(".show-tab")) {
                toggleUpContent();
                openTab(tab[i], arrow[i]);
            }
            else {
                if (!e.target.classList.contains("rotate-arrow-down")) {
                    if (i == 0)
                        closeTab(tab[1], arrow[1]);
                    else
                        closeTab(tab[0], arrow[0]);
                    openTab(tab[i], arrow[i]);
                }
                else {
                    closeTab(tab[i], arrow[i]);
                    toggleUpContent();
                }
            }
        });
    }
}

export default function createFutureTabs(color) {
    createElements(color);
    createEvent();
}