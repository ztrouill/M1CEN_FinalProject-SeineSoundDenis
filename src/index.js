import "./index.scss"
import { createMap } from './components/map/MyMap.js'
import { importFiles } from "./importFiles.js"
import { createUtils } from "./components/utils/myUtils"

export const files = importFiles();

createUtils();

createMap()
    .then(() => {
        const filters = document.querySelector("#filters-container");
        console.log("hola")
        filters.classList.add("filter-in");
        setTimeout(() => {
            filters.classList.remove("filter-init-pos");
        }, 1500);
    })