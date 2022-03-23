import { createSocialMedia } from "../detail/futurTab/myFuturTab.js";

const portrait = window.innerWidth <= window.innerHeight ? true : false;

const menu = [
    {
        title: "À propos",
        content: `Qu’est-ce-que <span class="italic">Seine-Sound-Denis</span> ?
                Créée par un groupe d’étudiants de l’Université Paris 8,
                cette interface permet de <span class="regular">découvrir la Seine-Saint-Denis à travers des créations sonores</span> sur les différents lieux d’un département en pleine transformation en vue des <span class="regular">Jeux Olympiques de 2024</span>.
                <br/><br/>
                Divisée en 4 catégories, “Transports, travail, commerces”, “Art et artisanat”, “Lieux de culte”
                et “Apprentissage et loisirs”, ces lieux sont répertoriés sur la <span class="regular">carte interactive</span>.
                En cliquant sur chacun d’entre eux, vous pouvez écouter les compositions crées par nos équipes. 
                <br/><br/>
                En mêlant témoignages, sons d’ambiance ou musiques,
                ces créations sonores ont pour ambition de retracer les transformations de la Seine-Saint-Denis
                <span class="regular">avant</span> (aujourd’hui en 2021), <span class="regular">pendant</span> (en 2024) et <span class="regular">après</span> les Jeux Olympiques.
                `
    },
    {
        title: "Contact",
        content: `Envie de valoriser vos endroits préférés de la Seine-Saint-Denis ?
        Laissez un message vocal sur notre boîte vocale ! (Limité à 1 minute)
        <br/>
        <span class="regular">
            Messagerie vocale : 01 87 20 93 00
        </span>
        <br/><br/>
        Une question ? Une proposition ? Un sentiment à partager ? N’hésitez pas à contacter notre équipe par mail ou via nos réseaux sociaux.
        <br/>
        <span class="regular">
            E-mail : seinesounddenis@gmail.com
        </span>
        `
    },
    {
        title: "Mentions légales",
        content: `En cas de litige pouvant naître concernant <span class="regular">seinesounddenis.fr</span>, le site relève de la juridiction exclusive du Tribunal de Grande Instance de Paris, et le droit applicable est le droit français.
        <br/><br/>
        <span class="regular>Editeur :</span> SARL Seine Sound Denis<br/>
        2, Rue de la Liberté 93200 Saint-Denis
        <br/><br/>
        <span class="regular>Directeurs de la publication :</span> Marie Bardelot, Zoé Trouillet-Bodet, Artem Arutiunian, Antoine Pittilloni, Laurie Alaoua
        <br/><br/>
        Pour toute réclamation, merci d’écrire à <span class="regular">seinesounddenis@gmail.com</span>.
        `
    }
]

function toggleMenuPage(bg) {
    bg.classList.toggle("fade-in");
    bg.classList.toggle("fade-out");
}

function createPage(i) {
    const container = document.createElement("div");
    const background = document.createElement("div");
    const title = document.createElement("div");
    const content = document.createElement("div");
    const closeContainer = document.createElement("div");
    const icon = document.createElement("i");

    background.className = "background-menu-page fade-out";
    title.className = "title-menu-page";
    content.className = "content-menu-page";
    container.className = "container-menu-page";
    closeContainer.className = "close-menu-page";
    icon.className = "close-page-icon far fa-times-circle";

    title.innerHTML = menu[i].title;
    content.innerHTML = menu[i].content;
    
    closeContainer.append(icon);
    container.append(closeContainer);
    container.append(title);
    container.append(content);

    if (menu[i].title === "Contact")
        createSocialMedia(container, "#EAE2DD");

    background.append(container);
    document.querySelector("#utils").append(background);

    setTimeout(() => {
        toggleMenuPage(background);
    }, 100)

    closeContainer.addEventListener("click", () => {
        toggleMenuPage(background);
        setTimeout(() => {
            background.remove();
        }, 600)
    //    if (portrait) {
            // const nav = document.querySelector("#menu");

            // nav.classList.toggle("menu-start-position");
            // nav.classList.toggle("menu-in");
            // nav.classList.toggle("menu-out");
            // c

            // document.querySelector("#open-menu-container").classList.toggle("fade-in");
            // document.querySelector("#open-menu-container").classList.toggle("fade-out");
      //  }
    })
}

function createCloseButton() {
    const container = document.createElement("div");
    const icon = document.createElement("i");

    icon.className = "close-menu-icon far fa-times-circle";
    container.className = "fade-out";
    container.id = "close-menu-container";
    container.append(icon);
    document.querySelector("#menu").append(container);

    return container;
}

function createOpenButton() {
    const container = document.createElement("div");
    const icon = document.createElement("i");

    icon.className = "open-menu-icon fas fa-ellipsis-h";
    container.id = "open-menu-container";

    container.className = "fade-in";
    container.append(icon);
    document.querySelector("#utils").append(container);

    return container;
}

function createNav() {
    const container = document.createElement("div");
    const fade = portrait ? "fade-out" : "";
    container.id = "menu";
    container.className = `menu-start-position menu-out ${fade}`;

    for (let i = 0; i < menu.length; i++) {
        const menuEl = document.createElement("div");
        menuEl.className = "menu-element";

        menuEl.innerHTML = menu[i].title;
        container.append(menuEl);
        menuEl.addEventListener("click", () => {
            createPage(i);

            if (portrait) {
                container.classList.toggle("fade-out");
                container.classList.toggle("fade-in");
            }
        });
    }

    document.querySelector("#utils").append(container);

    return container;
}

function toggleNav(nav, isOpening) {
    const delay = (!isOpening && portrait) ? 500 : 0;

    setTimeout(() => {
        nav.classList.toggle("menu-start-position");
        nav.classList.toggle("menu-in");
        nav.classList.toggle("menu-out");
    }, delay);
    

    if (portrait) {
        nav.classList.toggle("fade-in");
        nav.classList.toggle("fade-out");
    }
}

function toggleButton(open, close, isOpening) {
    const timeOpen = isOpening ? 500 : 0;
    const timeClose = isOpening ? 0 : 500;

    setTimeout(() => {
        open.classList.toggle("fade-in");
        open.classList.toggle("fade-out");
    }, timeClose);
    
    setTimeout(() => {
        close.classList.toggle("fade-in");
        close.classList.toggle("fade-out");
    }, timeOpen);
}

export function createMenu() {
    const nav = createNav();
    const close = createCloseButton();
    const open = createOpenButton();

    open.addEventListener("click", () => {
        toggleButton(open, close, true);
        toggleNav(nav, true);
    });

    close.addEventListener("click", () => {
        toggleButton(open, close, false);
        toggleNav(nav, false);
    });

}