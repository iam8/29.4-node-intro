// Ioana A Mititean
// Exercise 29.4 - Node Intro

const fs = require('fs');
const axios = require("axios");


function cat(path) {

    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        console.log(data);
    })
}


async function webCat(url) {

    let htmlData;

    try {
        htmlData = await axios.get(url);
    } catch (error) {
        console.log(error.cause);
        process.exit(1);
    }

    console.log(htmlData.data);
}


const pathOrUrl = process.argv[2];

if (pathOrUrl) {
    let isValidUrl;

    // Determine if arg is a valid URL (pattern)
    try {
        new URL(pathOrUrl);
        isValidUrl = true;
    } catch (error) {
        isValidUrl = false;
    }

    isValidUrl ? webCat(pathOrUrl) : cat(pathOrUrl);
}
