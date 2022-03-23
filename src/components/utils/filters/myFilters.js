import { themes } from "../../themes.js"
import { map } from "../../map/MyMap.js"

const responsiveFilters = require("./myResponsiveFilters.js");
const tabletMobile = window.innerWidth <= 1000 ? true : false;

export function startAnimation() {
    const filtersContainer = document.querySelectorAll(".filters-container");
    const mobile = filtersContainer[0].children;
    const desktop = filtersContainer[1].children;
    const citiesLayer = "Other_Big_Cities";

    for (let i = 0; i < mobile.length; i++) {
        setTimeout(() => {
            const checkboxM = mobile[i].children[0];
            const checkboxD = desktop[i].children[0];
            const nameLayer = Object.keys(themes)[i];

            checkboxD.checked = true;
            checkboxM.checked = true;
            if (map.getLayoutProperty(citiesLayer, "visibility") === "visible")
                map.setLayoutProperty(citiesLayer, "visibility", "none");
            map.setLayoutProperty(nameLayer, "visibility", "visible");
        }, 2500 * i)
    }
}

function createElements(device) {
    const container = document.createElement("div");
    const background = document.createElement("div");

    container.className = "filters-container";
    background.id = `filters-${device}`;
    background.className = `filter-init-pos filter-out filters-background`;

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

    if (device === "mobile")
        responsiveFilters.createResponsiveFilters();
}

function toggleLayer(i, checkbox) {
    const nameLayer = Object.keys(themes)[i]
    const visibility = checkbox.checked;
    const citiesLayer = "Other_Big_Cities";

    if (map.getLayoutProperty(citiesLayer, "visibility") === "visible")
        map.setLayoutProperty(citiesLayer, "visibility", "none");
    if (!visibility)
        map.setLayoutProperty(nameLayer, "visibility", "none");
    else
        map.setLayoutProperty(nameLayer, "visibility", "visible");
}

function createEvents() {
    const filtersContainer = document.querySelectorAll(".filters-container");
    const mobile = filtersContainer[0].children;
    const desktop = filtersContainer[1].children;

    for (let i = 0; i < mobile.length; i++) {   
        const checkboxM = mobile[i].children[0];
        const checkboxD = desktop[i].children[0];
       
        checkboxM.addEventListener("click", () => {
          toggleLayer(i, checkboxM);      
        });
        checkboxM.addEventListener("change", () => {
            checkboxD.checked = checkboxM.checked;
        });

        checkboxD.addEventListener("click", () => {
            toggleLayer(i, checkboxD);      
        });
        checkboxD.addEventListener("change", () => {
            checkboxM.checked = checkboxD.checked;
        });
    }
}

export function showFiltersOnStart() {
    const filters = document.querySelector("#filters-desktop");

    filters.classList.add("filter-in");
    filters.classList.remove("filter-init-pos");
    filters.classList.remove("filter-out");
    
    responsiveFilters.toggleFilterButton(document.querySelector("#show-filters"));
}

export function toggleFilter() {
    const filters = document.querySelector("#filters-desktop");
    filters.classList.toggle("filter-in");
//    setTimeout(() => {
        filters.classList.toggle("filter-init-pos");
        filters.classList.toggle("filter-out");
  //  }, 1500);
    
    responsiveFilters.toggleFilterButton(document.querySelector("#show-filters"));
}

export function createFilters() {
    createElements("mobile");
    createElements("desktop");

    createEvents();
}