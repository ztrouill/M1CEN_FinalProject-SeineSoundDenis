import "./index.scss"
import { createMap } from './components/map/MyMap.js'
import { importFiles } from "./importFiles.js"
import { createUtils } from "./components/utils/myUtils"
const filters = require("./components/utils/filters/myFilters.js");

export const files = importFiles();
const tabletMobile = window.innerWidth <= 1000 ? true : false;

createUtils();

createMap()
    .then(() => {
        filters.showFiltersOnStart();
    })