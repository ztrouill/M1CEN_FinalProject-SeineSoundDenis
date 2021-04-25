import "./index.scss"
import { createMap } from './components/map/MyMap.js'
import createDetail from "./components/detail/myDetail.js"
import createFilters from "./components/filters.js"
import { importFiles } from "./importFiles.js"

export const files = importFiles();

// Peut etre faire l'audioprocessing ?
createMap();
createFilters();
//document.querySelector("#app").prepend(container);
//createDetail();