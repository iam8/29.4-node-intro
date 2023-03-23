// Ioana A Mititean
// Exercise 29.4 - Node Intro

const fs = require('fs');
const axios = require("axios");


// HELPERS ----------------------------------------------------------------------------------------

/** Return true if the given string is a valid URL; false otherwise. */
function isValidUrl(string) {

    try {
        new URL(string);
        return true;
    } catch {
        return false;
    }
}


/** Fetch and return the HTML data from the given URL. */
async function getHtmlData(url) {

    let htmlData;

    try {
        htmlData = await axios.get(url);
    } catch (error) {
        console.log(`Error fetching ${url}: ${error.cause}`);
        process.exit(1);
    }

    return htmlData;
}


/** Write to outFilePath if given; otherwise print data to console. */
function handleOutput(data, outFilePath) {
    if (outFilePath) {

        fs.writeFile(outFilePath, data, "utf8", function(err) {
            if (err) {
                console.log(`Couldn't write to ${outFilePath}: ${err}`);
                process.exit(1);
            }
        });

    } else {
        console.log(data);
    }
}

// ------------------------------------------------------------------------------------------------


// CAT FUNCTIONS ----------------------------------------------------------------------------------

/** Read data from the file at the given path.
 * - Write the data to the file at outFilePath if argument given.
 * - Otherwise, print the data to console.
 */
function cat(path, outFilePath) {

    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log(`Couldn't read ${path}: ${err}`);
            process.exit(1);
        }

        handleOutput(data, outFilePath);
    });
}


/** Fetch the HTML data from the given URL.
 * - Write the data to the file at outFilePath if argument given.
 * - Otherwise, print the data to console.
 */
async function webCat(url, outFilePath) {

    const htmlData = await getHtmlData(url);
    handleOutput(htmlData.data, outFilePath);
}

// ------------------------------------------------------------------------------------------------


// MAIN -------------------------------------------------------------------------------------------

const args = process.argv.slice(2);

let outFile;
let pathOrUrl;

if (args[0] == "--out") {

    outFile = args[1];
    pathOrUrl = args[2];

} else {

    pathOrUrl = args[0];
}

if (pathOrUrl) {
    isValidUrl(pathOrUrl) ? webCat(pathOrUrl, outFile) : cat(pathOrUrl, outFile);
}
