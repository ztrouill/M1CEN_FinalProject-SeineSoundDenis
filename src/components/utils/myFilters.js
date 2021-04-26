import { themes } from "../themes.js"
import { map } from "../map/MyMap.js"
 
function createElements() {
    const container = document.createElement("div");
    container.id = "filters-container";
    container.className = "filter-init-pos";

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
        checkBox.checked = true;

        textThemes.innerHTML = themes[key].name;
        textThemes.style.color = themes[key].color;
    }

    document.querySelector("#utils").append(container);
}

function createEvents() {
    const filters = document.querySelectorAll(".filter-checkbox");

    for (let i = 0; i < filters.length; i++) {
        filters[i].addEventListener("click", () => {
            const nameLayer = Object.keys(themes)[i]
            const visibility = filters[i].checked;// map.getLayoutProperty(nameLayer, "visibility");
            
            if (!visibility)
                map.setLayoutProperty(nameLayer, "visibility", "none");
            else
                map.setLayoutProperty(nameLayer, "visibility", "visible");
        })
    }
}

export function toggleFilter() {
    const filters = document.querySelector("#filters-container");

    filters.classList.toggle("filter-in");
    filters.classList.toggle("filter-out");
}

export function createFilters() {
    createElements();
    createEvents();
}