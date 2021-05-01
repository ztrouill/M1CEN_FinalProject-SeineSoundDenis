import { themes } from "../../themes.js"
import { map } from "../../map/MyMap.js"

const responsiveFilters = require("./myResponsiveFilters.js");
const tabletMobile = window.innerWidth <= 1000 ? true : false;

function createElements() {
    const container = document.createElement("div");
    const background = document.createElement("div");

    container.id = "filters-container";
    background.id = "filters-background";
    background.className = "filter-init-pos filter-out";

    for (const key in themes) {
        const filterContainer = document.createElement("div");
        const checkBox = document.createElement("input");
        const textThemes = document.createElement("div");

        container.appendChild(filterContainer);
        filterContainer.appendChild(checkBox);
        filterContainer.appendChild(textThemes);

        filterContainer.className = "filter-component";

        checkBox.type = "checkbox";
        checkBox.name = key;
        checkBox.className = "filter-checkbox";
        checkBox.checked = false;

        textThemes.innerHTML = themes[key].name;
        textThemes.style.color = themes[key].color;

        container.append
    }

    background.append(container);
    document.querySelector("#utils").append(background);
}

function createEvents() {
    const filters = document.querySelectorAll(".filter-checkbox");

    for (let i = 0; i < filters.length; i++) {
        filters[i].addEventListener("click", () => {
            const nameLayer = Object.keys(themes)[i]
            const visibility = filters[i].checked;// map.getLayoutProperty(nameLayer, "visibility");
            const citiesLayer = "Other_Big_Cities";

            if (map.getLayoutProperty(citiesLayer, "visibility") === "visible")
                map.setLayoutProperty(citiesLayer, "visibility", "none");
            if (!visibility)
                map.setLayoutProperty(nameLayer, "visibility", "none");
            else
                map.setLayoutProperty(nameLayer, "visibility", "visible");
        })
    }
}

export function showFiltersOnStart() {
    if (!tabletMobile) {
        const filters = document.querySelector("#filters-background");
        filters.classList.add("filter-in");
        setTimeout(() => {
            filters.classList.remove("filter-init-pos");
            filters.classList.remove("filter-out");
        }, 1500);
    }

    else {
        setTimeout(() => {
            responsiveFilters.toggleFilterButton(document.querySelector("#show-filters"));
        }, 1000)

    }
}

export function toggleFilter() {
    const filters = document.querySelector("#filters-background");

    filters.classList.toggle("filter-in");
    filters.classList.toggle("filter-out");
}

export function createFilters() {
    createElements();
    createEvents();
    if (tabletMobile)
        responsiveFilters.createResponsiveFilters();
}