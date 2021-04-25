import { themes } from "./themes.js"
import { map } from "./map/MyMap.js"
 
function createElements() {
    const container = document.createElement("div");
    container.id = "filters-container";

    for (const key in themes) {
        const filterContainer = document.createElement("div");
        const checkBox = document.createElement("input");
        const textThemes = document.createElement("div");

        container.appendChild(filterContainer);
        filterContainer.appendChild(checkBox);
        filterContainer.appendChild(textThemes);

        filterContainer.className = "filter-component";

        checkBox.type = "checkbox";
        checkBox.name = key;//.layer;
        checkBox.className = "filter-checkbox";
        checkBox.checked = true;

        textThemes.innerHTML = themes[key].name;
        textThemes.style.color = themes[key].color;
    }

    document.querySelector("#app").prepend(container);
}

function createEvents() {
    const filters = document.querySelectorAll(".filter-checkbox");

    for (let i = 0; i < filters.length; i++) {
        filters[i].addEventListener("click", () => {
            const nameLayer = themes[i].layer;
            console.log(nameLayer);
            const mapLayer = map.getLayer(nameLayer);
            
            console.log(mapLayer)

            const visibility = filters[i].checked;// map.getLayoutProperty(nameLayer, "visibility");
            

            console.log(visibility)
            if (!visibility)
                map.setLayoutProperty(nameLayer, "visibility", "none");
            else
                map.setLayoutProperty(nameLayer, "visibility", "visible");
        })
    }
}

export default function createFilters() {
    createElements();
    createEvents();
}