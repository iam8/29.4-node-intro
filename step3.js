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


function catWrite(path, outFilePath) {

    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        fs.writeFile(outFilePath, data, "utf8", function(err) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
        })
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


async function webCatWrite(url, outFilePath) {

    let htmlData;

    try {
        htmlData = await axios.get(url);
    } catch (error) {
        console.log(error.cause);
        process.exit(1);
    }

    fs.writeFile(outFilePath, htmlData.data, "utf8", function(err) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    })
}


function isValidUrl(string) {

    // Determine if the given string is a valid URL pattern

    try {
        new URL(string);
        return true;
    } catch {
        return false;
    }
}


// Retrieve relevant args from command line
const args = process.argv.slice(2);

let outFile;
let pathOrUrl;

if (args.length > 0) {

    if (args[0] == "--out") {
        outFile = args[1];
        pathOrUrl = args[2];

        if (outFile && pathOrUrl) {

            // Write to output file
            isValidUrl(pathOrUrl) ? webCatWrite(pathOrUrl, outFile) : catWrite(pathOrUrl, outFile);
        }
    } else {

        pathOrUrl = args[0];

        // Just display output (no file writing)
        isValidUrl(pathOrUrl) ? webCat(pathOrUrl) : cat(pathOrUrl);
    }
}

// Tests

// Failures
// node step3.js
// node step3.js --out
// node step3.js --out output.txt
// node step3.js --out output.txt fhsdjh
// node step3.js --out outputweb2.txt https://googlehsjdhsj.com
// node step3.js onefsdfs.txt
// node step3.js https://googleshdjshdjs.com


// Successes
// node step3.js --out output.txt one.txt
// node step3.js --out outputweb.txt https://google.com
// node step3.js one.txt
// node step3.js https://google.com
