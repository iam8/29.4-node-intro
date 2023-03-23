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

    const htmlData = await axios.get(url);
    console.log(htmlData.data);
}


// const path = process.argv[2];

// if (path) {
//     cat(path);
// }

webCat("http://google.com");
