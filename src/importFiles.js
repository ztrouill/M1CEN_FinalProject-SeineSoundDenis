function importAll(r) {
    let files = {};

    r.keys().map((item) => {
       files[item.replace("./", "")] = item.replace("./", "");// r(item);
    });
    
    return files;
}

function importTitles(r) {
    let titles = {};

    r.keys().map((item) => {
        titles[item.replace("./", "")] = r(item);
    });
    
    return titles;
}

function parseImg(res, files) {
    for (const key in res) {
        if (!res[key]["img"])
            res[key]["img"] = {};

        for (const file in files) {
            const path = file.split("/")[1];
            const dir = file.split("/")[0];
            if (path == "img" && key === dir) {
                const fileName = file.split("/")[2];
                res[key]["img"][fileName] = files[file];
            }
        }
    }
}
// https://dev.to/pldg/lazy-load-images-with-webpack-5e80
function parseSound(res, files) {
    const soundTitle = importTitles(require.context("./assets/content/", true, /\.json$/));

    console.log(soundTitle);
    for (const key in res) {
        if (!res[key]["son"])
            res[key]["son"] = {};
        for (const file in files) {
            const type = file.split("/")[1];
            const dir = file.split("/")[0];
            if (type === "son" && key === dir) {
                let fileName = soundTitle[`${key}/content.json`];
                let index = file.split("/")[2];
                index.split(".")[0];
                index = parseInt(index);
                fileName = fileName[index];
                res[key]["son"][fileName] = files[file];
            }
        }
    }
}

function parseFiles(files) {
    let res = {}; 
    
    for (const file in files) {
        const path = file.split("/")[0];
        if (!res[path])
            res[path] = {};
    }

    parseImg(res, files);
    parseSound(res, files);

    console.log(res);

    return res;
}

export function importFiles() {
    const files = importAll(require.context("./assets/content/", true, /\.(png|jpe?g|svg|mp3|wav)$/));//(importAll(require.context(`/src/assets/places/${path}/img/`, false, /\.(png|jpe?g|svg)$/));
    const parsedFiles = parseFiles(files);

    return parsedFiles;
}