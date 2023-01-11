# IgniteUI XPLAT Utilities

This repository provides utility scripts for managing cross-platform repositories such as generating download files for samples browser.

## Clone Repositories

Clone the following repositories on the same level as this repository.

- [igniteui-angular-examples](https://github.com/IgniteUI/igniteui-angular-examples/tree/vnext)
- [igniteui-blazor-examples](https://github.com/IgniteUI/igniteui-blazor-examples/tree/vnext)
- [igniteui-react-examples](https://github.com/IgniteUI/igniteui-react-examples/tree/vnext)
- [igniteui-wc-examples](https://github.com/IgniteUI/igniteui-wc-examples/tree/vnext)


## Prepare Samples

Follow readme file in [Blazor Samples Browser](https://github.com/IgniteUI/igniteui-blazor-examples/tree/vnext/browser) to build it locally:

- open [IgBlazorSamples.Gulp](https://github.com/IgniteUI/igniteui-blazor-examples/tree/vnext/browser/IgBlazorSamples.Gulp) folder in VS Code
- run `gulp updateBrowser` in terminal window

Above gulp script will transform individual blazor samples as pages and copy them to the [browser](https://github.com/IgniteUI/igniteui-blazor-examples/tree/vnext/browser/IgBlazorSamples.Client/Pages) folder.

NOTE: There is no need to build Angular, React, or WebComponents browsers.

## Run Scripts

Run these scripts to generate download files for sample browsers and output them to:
`./output/download-files/` 

```
gulp generateDownloadFilesForAngular
```

```
gulp generateDownloadFilesForBlazor
```

```
gulp generateDownloadFilesForReact
```

```
gulp generateDownloadFilesForWC
```

## Send Zip files to RE

Zip up each folder in `/output/download-zip` folder and send zip files to RE team so they can update download links for the sample browsers:

- igniteui-angular-examples 
- igniteui-blazor-examples 
- igniteui-react-examples 
- igniteui-wc-examples 

<!--

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <body>
        <a target="_blank" href="https://www.infragistics.com/webcomponents-demos/samples/charts/data-chart-bar-chart-multiple-sources" rel="noopener noreferrer">
            <img height="40px" style="border-radius: 0rem; max-width: 100%;" alt="Run Sample" src="https://github.com/IgniteUI/igniteui-blazor-examples/raw/vnext/templates/sample/images/button-run.png"/>
        </a>
    </body>
</html>

## Instructions

To set up this project locally, execute these commands:

```
git clone https://github.com/IgniteUI/igniteui-wc-examples.git
cd ./igniteui-wc-examples
cd ../samples/charts/data-chart/bar-chart-multiple-sources
```

open above folder in VS Code or type:
```
code .
```

In terminal window, run:

```
npm install
npm run start
```

Then open http://localhost:4200/ in your browser


## Learn More

To learn more about **Ignite UI for Web Components**, check out the [Web Components documentation](https://infragistics.com/webcomponentssite/components/general-getting-started.html). -->
