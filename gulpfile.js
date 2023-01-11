let gulp = require('gulp');
let del = require('del');
let es = require('event-stream');
let fs = require('fs.extra');
let path = require('path');
let flatten = require('gulp-flatten');

function log(msg) {
    console.log('>> ' + msg);
}
// console.log('loaded');

let configs = {

    angular: {
        repoName: "igniteui-angular-examples",
        downloadFiles: [
             '../igniteui-angular-examples/**/*.*',
        //   '../igniteui-angular-examples/**/*.json',
        //   '../igniteui-angular-examples/browser/**/*.*',
        //   '../igniteui-angular-examples/samples/**/*.json',
        //   '../igniteui-angular-examples/samples/**/maps/**/*.json',
            '!../igniteui-angular-examples/browser/**/code-viewer/**/*.*',  // skip auto-generated files by SB
            '!../igniteui-angular-examples/browser/**/samples/**/*.*',      // skip auto-generated files by SB
            '!../igniteui-angular-examples/samples/**/package-lock.json',
            '!../igniteui-angular-examples/porting/**/*.*',
            '!../igniteui-angular-examples/**/*.bat',
            '!../igniteui-angular-examples/**/.angular/**/*.*',
            '!../igniteui-angular-examples/**/.git/**/*',
            '!../igniteui-angular-examples/**/.github/**/*',
            '!../igniteui-angular-examples/**/.vscode/**/*.*',
            '!../igniteui-angular-examples/**/dist/**/*.*',
            '!../igniteui-angular-examples/**/output/**/*.*',
            '!../igniteui-angular-examples/**/node_modules/**/*.*',
        ],
    },

    react: {
        repoName: "igniteui-react-examples",
        downloadFiles: [
             '../igniteui-react-examples/**/*.*',
          // '../igniteui-react-examples/**/*.json',
          // '../igniteui-react-examples/browser/**/*.*',
          // '../igniteui-react-examples/samples/**/*.json',
          // '../igniteui-react-examples/samples/**/maps/**/*.json',
            '!../igniteui-react-examples/browser/**/code-viewer/**/*.*',  // skip auto-generated files by SB
            '!../igniteui-react-examples/browser/**/samples/**/*.*',      // skip auto-generated files by SB
            '!../igniteui-react-examples/samples/**/package-lock.json',
            '!../igniteui-react-examples/**/*.bat',
            '!../igniteui-react-examples/**/.git/**/*',
            '!../igniteui-react-examples/**/.github/**/*',
            '!../igniteui-react-examples/**/.vscode/**/*.*',
            '!../igniteui-react-examples/**/dist/**/*.*',
            '!../igniteui-react-examples/**/output/**/*.*',
            '!../igniteui-react-examples/**/node_modules/**/*.*',
        ],
    },

    wc: {
        repoName: "igniteui-wc-examples",
        downloadFiles: [
             '../igniteui-wc-examples/**/*.*',
          // '../igniteui-wc-examples/**/*.json',
          // '../igniteui-wc-examples/browser/**/*.*',
          // '../igniteui-wc-examples/samples/**/*.json',
          // '../igniteui-wc-examples/samples/**/maps/**/*.json',
            '!../igniteui-wc-examples/browser/**/code-viewer/**/*.*',  // skip auto-generated files by SB
            '!../igniteui-wc-examples/browser/**/samples/**/*.*',      // skip auto-generated files by SB
            '!../igniteui-wc-examples/samples/**/package-lock.json',
            '!../igniteui-wc-examples/**/*.bat',
            '!../igniteui-wc-examples/**/.git/**/*',
            '!../igniteui-wc-examples/**/.github/**/*',
            '!../igniteui-wc-examples/**/.vscode/**/*.*',
            '!../igniteui-wc-examples/**/dist/**/*.*',
            '!../igniteui-wc-examples/**/output/**/*.*',
            '!../igniteui-wc-examples/**/node_modules/**/*.*',
        ],
    },

    blazor: {
        repoName: "igniteui-blazor-examples",
        downloadFiles: [
            '../igniteui-blazor-examples/**/*.*',
        //  '../igniteui-blazor-examples/**/App.razor',
           '!../igniteui-blazor-examples/README.md',
           '!../igniteui-blazor-examples/browser/IgBlazorSamples.Server/**/*.*',
           '!../igniteui-blazor-examples/browser/IgBlazorSamples.Gulp/**/*.*',
           '!../igniteui-blazor-examples/browser/**/code-viewer/**/*.*',  // skip auto-generated files by SB
           '!../igniteui-blazor-examples/samples/**/*.*',   // excluding individual samples
           '!../igniteui-blazor-examples/research/**/*.*',
           '!../igniteui-blazor-examples/tests/**/*.*',
           '!../igniteui-blazor-examples/templates/**/*.*',
           '!../igniteui-blazor-examples/**/*.bat',
           '!../igniteui-blazor-examples/**/.git/**/*',
           '!../igniteui-blazor-examples/**/.github/**/*',
           '!../igniteui-blazor-examples/**/.vs/**/*.*',
           '!../igniteui-blazor-examples/**/.vscode/**/*.*',
           '!../igniteui-blazor-examples/**/bin/**/*.*',
           '!../igniteui-blazor-examples/**/obj/**/*.*',
           '!../igniteui-blazor-examples/**/dist/**/*.*',
           '!../igniteui-blazor-examples/**/output/**/*.*',
           '!../igniteui-blazor-examples/**/node_modules/**/*.*',
        ],
    },
};

function generateDownloadFiles(cb, platform) {

    var config = configs[platform];
    var outputPath = "./output/download-files/" + config.repoName;
    del.sync(outputPath + "/**/*.*", {force:true});
    del.sync(outputPath + "/*.*", {force:true});
    del.sync(outputPath, {force:true});

    console.log("generating download files for " + platform + " samples browser ...");

    var counter = 1;
    gulp.src(config.downloadFiles, {base: './'}) //, {base: './'}
    .pipe(es.map(function(file, fileCB) {
        counter++;
        // console.log(file.dirname + '\\' + file.basename);
        fileCB(null, file);
    }))
    // .pipe(flatten({ "includeParents": 1 }))
    .pipe(gulp.dest('./output/download-files/' + platform))
    .on("end", function() {
        console.log('generated ' + counter + ' files in ' + outputPath);

        if (platform === "blazor") {
            del.sync(outputPath + "/browser/IgBlazorSamples.Server/**/*.*", {force:true});
            del.sync(outputPath + "/browser/IgBlazorSamples.Server", {force:true});
            del.sync(outputPath + "/browser/IgBlazorSamples.Gulp/**/*.*", {force:true});
            del.sync(outputPath + "/browser/IgBlazorSamples.Gulp", {force:true});
            del.sync(outputPath + "/research/**/*.*", {force:true});
            del.sync(outputPath + "/research", {force:true});
            del.sync(outputPath + "/tests/**/*.*", {force:true});
            del.sync(outputPath + "/tests", {force:true});
        }
        cb();
    });
} exports.generateDownloadFiles = generateDownloadFiles;

// run this script to generate download files for react sample browser
function generateDownloadFilesForReact(cb) {
    generateDownloadFiles(cb, "react");
} exports.generateDownloadFilesForReact = generateDownloadFilesForReact;

// run this script to generate download files for angular sample browser
function generateDownloadFilesForAngular(cb) {
    generateDownloadFiles(cb, "angular");
} exports.generateDownloadFilesForAngular = generateDownloadFilesForAngular;

// run this script to generate download files for angular sample browser
function generateDownloadFilesForWC(cb) {
    generateDownloadFiles(cb, "wc");
} exports.generateDownloadFilesForWC = generateDownloadFilesForWC;

// run this script to generate download files for angular sample browser
function generateDownloadFilesForBlazor(cb) {
    generateDownloadFiles(cb, "blazor");

    // del.sync("./output/download-files/igniteui-blazor-examples/browser/IgBlazorSamples.Server/**/*.*", {force:true});
    // del.sync("./output/download-files/igniteui-blazor-examples/browser/IgBlazorSamples.Server", {force:true});

    cb();
} exports.generateDownloadFilesForBlazor = generateDownloadFilesForBlazor;


function cleanupSamplesPackageLock(cb) {

    del.sync("../" + configs.wc.repoName + "/samples/**/package-lock.json", {force:true});
    del.sync("../" + configs.react.repoName + "/samples/**/package-lock.json", {force:true});
    del.sync("../" + configs.angular.repoName + "/samples/**/package-lock.json", {force:true});
    cb();

} exports.cleanupSamplesPackageLock = cleanupSamplesPackageLock;

function cleanupSamplesPackageModules(cb) {

    del.sync("../" + configs.wc.repoName + "/samples/**/node_modules/**/*.*", {force:true});
    del.sync("../" + configs.wc.repoName + "/samples/**/node_modules", {force:true});

    del.sync("../" + configs.react.repoName + "/samples/**/node_modules/**/*.*", {force:true});
    del.sync("../" + configs.react.repoName + "/samples/**/node_modules", {force:true});

    del.sync("../" + configs.angular.repoName + "/samples/**/node_modules/**/*.*", {force:true});
    del.sync("../" + configs.angular.repoName + "/samples/**/node_modules", {force:true});
    cb();

} exports.cleanupSamplesPackageModules = cleanupSamplesPackageModules;


function cleanupSamplesOutput(cb) {

    var folders = [".git", ".github", ".vs", ".vscode", "dist", "output", "bin", "obj"];

    for (const name of folders) {

        del.sync("../" + configs.wc.repoName + "/samples/**/" + name + "/**/*.*", {force:true});
        del.sync("../" + configs.wc.repoName + "/samples/**/" + name + "", {force:true});

        del.sync("../" + configs.react.repoName + "/samples/**/" + name + "/**/*.*", {force:true});
        del.sync("../" + configs.react.repoName + "/samples/**/" + name + "", {force:true});

        del.sync("../" + configs.angular.repoName + "/samples/**/" + name + "/**/*.*", {force:true});
        del.sync("../" + configs.angular.repoName + "/samples/**/" + name + "", {force:true});

        del.sync("../" + configs.blazor.repoName + "/samples/**/" + name + "/**/*.*", {force:true});
        del.sync("../" + configs.blazor.repoName + "/samples/**/" + name + "", {force:true});
    }

    cb();

} exports.cleanupSamplesOutput = cleanupSamplesOutput;

exports.cleanupSamples = cleanupSamples = gulp.series(
    cleanupSamplesPackageLock,
    cleanupSamplesPackageModules,
    cleanupSamplesOutput,
);