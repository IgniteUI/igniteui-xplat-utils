let gulp = require('gulp');
let del = require('del');
let es = require('event-stream');
let fs = require('fs.extra');
let path = require('path');
let flatten = require('gulp-flatten');

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
        // '!../igniteui-blazor-examples/README.md',
           '!../igniteui-blazor-examples/browser/IgBlazorSamples.Server/**/*.*',
        //    '!../igniteui-blazor-examples/browser/IgBlazorSamples.Gulp/**/*.*',
           '!../igniteui-blazor-examples/browser/**/code-viewer/**/*.*',  // skip auto-generated files by SB
        // '!../igniteui-blazor-examples/samples/**/*.*',   // excluding individual samples
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

function generateDownloadFilesFor(cb, platform) {

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
            // del.sync(outputPath + "/browser/IgBlazorSamples.Gulp/**/*.*", {force:true});
            // del.sync(outputPath + "/browser/IgBlazorSamples.Gulp", {force:true});
            del.sync(outputPath + "/research/**/*.*", {force:true});
            del.sync(outputPath + "/research", {force:true});
            del.sync(outputPath + "/tests/**/*.*", {force:true});
            del.sync(outputPath + "/tests", {force:true});
        }
        cb();
    });
} // exports.generateDownloadFilesFor = generateDownloadFilesFor;

// run this script to generate download files for react sample browser
function generateDownloadFilesForReact(cb) {
    generateDownloadFilesFor(cb, "react");
} exports.generateDownloadFilesForReact = generateDownloadFilesForReact;

// run this script to generate download files for angular sample browser
function generateDownloadFilesForAngular(cb) {
    generateDownloadFilesFor(cb, "angular");
} exports.generateDownloadFilesForAngular = generateDownloadFilesForAngular;

// run this script to generate download files for angular sample browser
function generateDownloadFilesForWC(cb) {
    generateDownloadFilesFor(cb, "wc");
} exports.generateDownloadFilesForWC = generateDownloadFilesForWC;

// run this script to generate download files for angular sample browser
function generateDownloadFilesForBlazor(cb) {
    generateDownloadFilesFor(cb, "blazor");

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

    var folders = [".git", ".github", ".angular", ".vs", ".vscode", "dist", "output", "bin", "obj"];

    for (const name of folders) {

        // del.sync("../" + configs.wc.repoName + "/samples/**/" + name + "/**/*.*", {force:true});
        // del.sync("../" + configs.wc.repoName + "/samples/**/" + name + "", {force:true});

        // del.sync("../" + configs.react.repoName + "/samples/**/" + name + "/**/*.*", {force:true});
        // del.sync("../" + configs.react.repoName + "/samples/**/" + name + "", {force:true});

        del.sync("../" + configs.angular.repoName + "/samples/**/" + name + "/**/*.*", {force:true});
        del.sync("../" + configs.angular.repoName + "/samples/**/" + name + "", {force:true});

        // del.sync("../" + configs.blazor.repoName + "/samples/**/" + name + "/**/*.*", {force:true});
        // del.sync("../" + configs.blazor.repoName + "/samples/**/" + name + "", {force:true});
    }

    cb();

} exports.cleanupSamplesOutput = cleanupSamplesOutput;


function getRelative(filePath) {
    var relative = filePath.split("igniteui-xplat-")[1];
    relative = "../igniteui-xplat-" + relative;
    relative = relative.split("\\").join("/");
    return relative;
}
function verifyXplatJSON(cb) {

    console.log("verifying ...");

    var jsonFiles = [
        '../igniteui-xplat-examples/**/*.json',
        // '../igniteui-xplat-examples/**/data-chart/**/*.json',
        // '../igniteui-xplat-examples/**/grid/**/*.json',
        //  '../igniteui-xplat-examples/**/*.json',
        '!../igniteui-xplat-examples/tests/**/*.json',
        '!../**/sandbox.config.json',
        '!../**/tsconfig.json',
        '!../**/package*.json',
    ];
    var counter = 1;

    var requirements = [
        { target: '"type": "WebGrid"', modules: ["grids/WebGridModule"]},
        { target: '"type": "PropertyEditorPanel"', modules: ["layouts/PropertyEditorPanelModule", "withDescriptions"]},
        { target: '"type": "WebGridAvatarCellTemplate"', modules: ["webinputs/WebAvatarModule"]},
        { target: '"type": "WebGridPinHeaderTemplate"', modules: ["webinputs/WebBadgeModule"]},
        { target: '"type": "Legend"', modules: ["charts/LegendModule"]},
        { target: '"type": "DataLegend"', modules: ["charts/DataLegendModule"]},
        { target: '"type": "CategoryXAxis"', modules: ["charts/DataChartCategoryModule"]},
        { target: '"type": "CategoryYAxis"', modules: ["charts/DataChartCategoryModule"]},

        { target: '"type": "DataToolTipLayer"', modules: ["charts/DataChartInteractivityModule"]},
       // NumericRadiusAxis"', modules: ["DataChartRadialCoreModule"]},
        { target: '"type": "CategoryAngleAxis"', modules: ["charts/DataChartRadialModule", "charts/DataChartRadialCoreModule"]},

      //  DataChart"', modules: ["charts/DataChartCoreModule"]},
        { target: '"type": "BubbleSeries"', modules: ["charts/DataChartScatterModule", "charts/DataChartScatterCoreModule"]},
        { target: '"type": "Scatter.*Series"', modules: ["charts/DataChartScatterModule", "charts/DataChartScatterCoreModule"]},

        { target: '"type": "CategoryChart"', modules: ["charts/CategoryChartModule"]},

    //    'abbreviateLargeNumbers": true' "charts/NumberAbbreviatorModule"
    ];
   // var requiredComponents = Object.keys(requiredModules);

    gulp.src(jsonFiles, {base: './'}) //, {base: './'}
    .pipe(es.map(function(file, fileCB) {
        counter++;
        var jsonPath = getRelative(file.dirname) + '\\' + file.basename;
        //jsonPath = jsonPath.replace("", "");
       // console.log(jsonPath);

       let json = file.contents.toString();
        if (jsonPath.includes("bubble")) {
            //var regex = /"type":."Scatter.*Series"/gm
            //var regex = '/"type":."Bubble.*Series"/gm';
            var regex = new RegExp('"type":."Bubble.*Series"', "gm");
            //var regex = /"type":."Bubble3.*Series"/gm
       //     console.log(json.match(regex));
        }

        for (const req of requirements) {
            //var type = '"type": ""' + component + '"';
          //  var type = req.target; //'"' + component + '"';
            var regex = new RegExp(req.target, "gm");
            if (json.match(regex)) {
                //var modules = requiredModules[component];
              //  console.log(jsonPath + " " + req.modules.join(','));
                for (const module of req.modules) {
                    if (!json.includes(module)) {
                        //console.log("Missing " + module + " in " + jsonPath);
                        console.log(jsonPath + " - MISSING " + module);
                    }
                }
            }

        }

        var jsonLines = json.split("\n");

        var changeFile = false;
        for (let i = 0; i < jsonLines.length; i++) {
            let line = jsonLines[i];
            let crrnLineEndWitComma = line.trim().endsWith(',');
            let crrnLineHasTab = line.includes('\t');
            if (crrnLineHasTab) {
                line = line.split('\t').join('  ');
                jsonLines[i] = line;
                //fileChanged = true;
                console.log(jsonPath + ":" + i + " << has a tab");
                changeFile = true;
            }
            let next = i + 1 < jsonLines.length ? i + 1 : i;
            let nextLine = jsonLines[next].trim();
            let nextLineIsClosing = nextLine === '}' || nextLine === ']';
            if (nextLineIsClosing && crrnLineEndWitComma) {
                //jsonLines[i] = jsonLines[i].replace(',','');
                //fileChanged = true;
                console.log(jsonPath + ":" + next + " << has an extra comma");
            }
        }

        if (changeFile) {
            json = jsonLines.join("\n");
            fs.writeFileSync(jsonPath, json);
            // cb();
        }

        // "layouts/PropertyEditorPanelModule"
        fileCB(null, file);
    }))
    // .pipe(flatten({ "includeParents": 1 }))
    //.pipe(gulp.dest('./output/download-files/' + platform))
    .on("end", function() {
       // console.log('generated ' + counter + ' files');

        cb();
    });
} exports.verifyXplatJSON = verifyXplatJSON;
