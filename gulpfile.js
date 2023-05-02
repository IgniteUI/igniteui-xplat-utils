let gulp = require('gulp');
let del = require('del');
let es = require('event-stream');
let fs = require('fs.extra');
let path = require('path');
let flatten = require('gulp-flatten');

var xplatLinks = require('./tasks/xplatLinks.js')

exports.generateLinks = generateLinks = gulp.series(
    xplatLinks.generate,
);

// var xplatDashboard = require('./tasks/xplatDashboard.js')
// exports.fetchRepo = fetchRepo = gulp.series(
//     xplatDashboard.fetchRepo,
// );

var xs = require('./tasks/xplatSamples.js')

exports.generateDownloadFilesForAngular = xs.generateDownloadFilesForAngular
exports.generateDownloadFilesForBlazor  = xs.generateDownloadFilesForBlazor
exports.generateDownloadFilesForReact   = xs.generateDownloadFilesForReact
exports.generateDownloadFilesForWC      = xs.generateDownloadFilesForWC

// generate download files for al platforms
exports.generateDownloadFiles = gulp.series(
    xs.generateDownloadFilesForAngular,
    xs.generateDownloadFilesForBlazor,
    xs.generateDownloadFilesForReact,
    xs.generateDownloadFilesForWC,
);

exports.cleanupSamplesPackageLock    = xs.cleanupSamplesPackageLock;
exports.cleanupSamplesPackageModules = xs.cleanupSamplesPackageModules;
exports.cleanupSamplesOutput         = xs.cleanupSamplesOutput;

exports.cleanupSamples = gulp.series(
    xs.cleanupSamplesPackageLock,
    xs.cleanupSamplesPackageModules,
    xs.cleanupSamplesOutput,
);

exports.verifyXplatJSON = xs.verifyXplatJSON;


exports.test = function(cb) {

    var str = `
    C:\WORK\code-generation-library/WebGridChangeOnYearPercentTemplate/Angular.ts MISSING 'WebGridChangeOnYearPercentTemplate'
`;

    console.log(str);

    cb();
}