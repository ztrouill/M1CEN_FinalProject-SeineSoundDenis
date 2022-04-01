function importAll(r) {
    let files = {};

    r.keys().map((item) => {
       files[item.replace("./", "")] = item.replace("./", "");// r(item);
    });
    
    return files;
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

function parseSound(res, files) {
    for (const key in res) {
        if (!res[key]["son"])
            res[key]["son"] = {};
        for (const file in files) {
            const type = file.split("/")[1];
            const dir = file.split("/")[0];
            if (type === "son" && key === dir) {
                let fileName = file.split("/")[2];
                fileName = fileName.split(".")[0];
                res[key]["son"][fileName] = files[file];
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

    return res;
}

export function importFiles() {
    const files = importAll(require.context("./assets/content/", true, /\.(png|jpe?g|svg|mp3|wav)$/));
    const parsedFiles = parseFiles(files);

    return parsedFiles;
}