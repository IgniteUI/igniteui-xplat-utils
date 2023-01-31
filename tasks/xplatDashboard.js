let gulp = require('gulp');
let del = require('del');
let es = require('event-stream');
let fs = require('fs.extra');
let path = require('path');
const request = require('request');
// const fetch = require('fetch');

function fetchRepo(cb){
    let url = "https://api.github.com/repos/IgniteUI/igniteui-react-examples/git/trees/vnext?recursive=1";
    // let url = "https://static.infragistics.com/xplatform/data/stocks/stockAmazon.json";
    // let response = fetch(url);
    // let jsonData = response.json();

    request(url, function(error, response, body) {
        console.log(response);

        if (!error && response.statusCode == 200) {
            // let jsonData = response.toJSON();
            // console.log(jsonData);

            // console.log(response);
            // fs.writeFileSync('./src/xplatDashboard.json', response);
        }

        if (error) {
            console.log("ERROR");
            console.log(error);

        }

    });
    cb();
}

exports.fetchRepo = fetchRepo;
