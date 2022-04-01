import "./index.scss"
import { startMapAnim, initMap } from './components/map/MyMap.js'
import { importFiles } from "./importFiles.js"
import { startIntro } from "./components/intro/intro";

const loader = require("./components/utils/myLoader.js");
const utils = require("./components/utils/myUtils.js");
const filters = require("./components/utils/filters/myFilters.js");

export const files = importFiles();

loader.createLoader();
initMap();
window.addEventListener("load", () => {
    startIntro()
    .then(() => {
            loader.toggleLoader(true);
            document.querySelector('#video-container').remove();
            utils.createUtils();
            startMapAnim()
                .then(() => {
                    loader.toggleLoader(false);
                    utils.toggleUtils(true);

                    setTimeout(() => {
                        filters.startAnimation();
                    }, 1000)
                });
    })
});