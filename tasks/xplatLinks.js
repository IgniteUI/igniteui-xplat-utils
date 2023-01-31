let gulp = require('gulp');
let del = require('del');
let es = require('event-stream');
let fs = require('fs.extra');
let path = require('path');
let flatten = require('gulp-flatten');

function log(msg) {
    console.log('>> ' + msg);
}

var platforms = [
  {
    name:  'angular',
    apiLocalized: false,
    apiSite: 'https://staging.infragistics.com/products/ignite-ui-angular/api/docs/typescript/latest/',
    apiBuild: '',

    docSite: 'https://staging.infragistics.com/products/ignite-ui-angular/angular/components/charts/chart-overview',
    docBuildEN: 'http://tfs.infragistics.local:8080/tfs/Engineering/IgInternalApplicationsGit/IgInternalApplicationsGit%20Team/_build/index?context=allDefinitions&path=%5C&definitionId=1812&_a=completed',
    docBuildJP: 'http://tfs.infragistics.local:8080/tfs/Engineering/IgInternalApplicationsGit/IgInternalApplicationsGit%20Team/_build/index?context=allDefinitions&path=%5C&definitionId=1813&_a=completed',

    smpLocalized: true,
    smpBrowser: 'https://staging.infragistics.com/angular-demos-dv/samples',
    smpGithub: 'https://github.com/IgniteUI/igniteui-angular-examples/tree/vnext',
    smpBuild: 'http://tfs.infragistics.local:8080/tfs/Engineering/IgInternalApplicationsGit/IgInternalApplicationsGit%20Team/_build/index?context=allDefinitions&path=%5C&definitionId=2430&_a=completed',
  },
  {
    name:  'blazor',
    apiLocalized: false,
    apiSite: 'https://staging.infragistics.com/blazor/docs/api/api/index.html',
    apiBuild: 'http://tfs.infragistics.local:8080/tfs/Engineering/IgInternalApplicationsGit/IgInternalApplicationsGit%20Team/_build/index?context=allDefinitions&path=%5C&definitionId=2376&_a=completed',

    docSite: 'https://staging.infragistics.com/products/ignite-ui-blazor/blazor/components/charts/chart-overview',
    docBuildEN: 'http://tfs.infragistics.local:8080/tfs/Engineering/IgInternalApplicationsGit/IgInternalApplicationsGit%20Team/_build/index?context=allDefinitions&path=%5C&definitionId=2130&_a=completed',
    docBuildJP: 'http://tfs.infragistics.local:8080/tfs/Engineering/IgInternalApplicationsGit/IgInternalApplicationsGit%20Team/_build/index?context=allDefinitions&path=%5C&definitionId=2131&_a=completed',

    smpLocalized: true,
    smpBrowser: 'https://staging.infragistics.com/blazor-client/',
    smpGithub: 'https://github.com/IgniteUI/igniteui-blazor-examples/tree/vnext',
    smpBuild: 'http://tfs.infragistics.local:8080/tfs/Engineering/IgInternalApplicationsGit/IgInternalApplicationsGit%20Team/_build/index?context=allDefinitions&path=%5C&definitionId=2127&_a=completed',
  },
  {
    name: 'react',
    apiLocalized: false,
    apiSite: 'https://staging.infragistics.com/products/ignite-ui-react/api/docs/typescript/latest/',
    apiBuild: '',
    docSite: 'https://staging.infragistics.com/products/ignite-ui-react/react/components/charts/chart-overview',
    docBuildEN: 'http://tfs.infragistics.local:8080/tfs/Engineering/IgInternalApplicationsGit/IgInternalApplicationsGit%20Team/_build/index?context=allDefinitions&path=%5C&definitionId=1780&_a=completed',
    docBuildJP: 'http://tfs.infragistics.local:8080/tfs/Engineering/IgInternalApplicationsGit/IgInternalApplicationsGit%20Team/_build/index?context=allDefinitions&path=%5C&definitionId=1782&_a=completed',

    smpLocalized: true,
    smpBrowser: 'https://staging.infragistics.com/react-demos/samples',
    smpGithub: 'https://github.com/IgniteUI/igniteui-react-examples/tree/vnext',
    smpBuild: 'http://tfs.infragistics.local:8080/tfs/Engineering/IgInternalApplicationsGit/IgInternalApplicationsGit%20Team/_build/index?context=allDefinitions&path=%5C&definitionId=2074&_a=completed',
  },
  {
    name:  'wc',
    apiLocalized: false,
    apiSite: 'https://staging.infragistics.com/products/ignite-ui-web-components/api/docs/typescript/latest/',
    apiBuild: '',

    docSite: 'https://staging.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/chart-overview',
    docBuildEN: 'http://tfs.infragistics.local:8080/tfs/Engineering/IgInternalApplicationsGit/IgInternalApplicationsGit%20Team/_build/index?context=allDefinitions&path=%5C&definitionId=1784&_a=completed',
    docBuildJP: 'http://tfs.infragistics.local:8080/tfs/Engineering/IgInternalApplicationsGit/IgInternalApplicationsGit%20Team/_build/index?context=allDefinitions&path=%5C&definitionId=1785&_a=completed',

    smpLocalized: true,
    smpBrowser: 'https://staging.infragistics.com/webcomponents-demos/samples/index',
    smpGithub: 'https://github.com/IgniteUI/igniteui-wc-examples/tree/vnext',
    smpBuild: 'http://tfs.infragistics.local:8080/tfs/Engineering/IgInternalApplicationsGit/IgInternalApplicationsGit%20Team/_build/index?context=allDefinitions&path=%5C&definitionId=1972&_a=completed',
  },
];

function toJP(url) {
  return url.replace('staging.','jp.staging.');
}

function generate(cb) {

  // This table list links to XPLAT docs and samples for all platform, environments and locals.

    // var css = fs.readFileSync('./tasks/xplatLinks.css').toString();

    var table = '';
    // table += ' <style> \n' + css + '\n </style> \n\n';

    table += ' | Platform    | Local  | API        | Docs | Samples |\n';
    table += ' | ----------- | ------ | ---------- | ---- | ------- |\n';

    var enLocal = '<span class="tLocal">EN</span>';
    var jpLocal = '<span class="tLocal">JP</span>';

    var span = ' - '; //<span style="width: 1rem">-</span>';
    var br = '<br/>';
    for (const platform of platforms) {

      table += ' | ' +  platform.name.toUpperCase() + ' ' + br;
      table += ' | ';
      table += enLocal;
      table += ' | ';
      table += '[STAG](' + platform.apiSite + ') ' + span;
      table += '[PROD](' + platform.apiSite.replace('staging.','') + ')' + br;
      table += ' | ';
      table += '[STAG](' + platform.docSite + ') ' + span;
      table += '[PROD](' + platform.docSite.replace('staging.','') + ') ' + span;
      table += '[BUILD](' + platform.docBuildEN + ') ' + br;
      table += ' | ';
      table += '[STAG](' + platform.smpBrowser + ') ' + span;
      table += '[PROD](' + platform.smpBrowser.replace('staging.','') + ') ' + span;
      table += '[BUILD](' + platform.smpBuild + ') ' + span;
      table += '[GIT](' + platform.smpGithub + ')' + br;
      table += ' |\n';

      table += ' | ' + br;
      table += ' | ';
      table += jpLocal;
      table += ' | ';
      if (platform.apiLocalized) {
        table += '[STAG](' + toJP(platform.apiSite) + ') - ' + span;
        table += '[PROD](' + toJP(platform.apiSite).replace('staging.','') + ')' + br;
      }
      table += ' | ';
      table += '[STAG](' + (platform.docSite) + ') ' + span;
      table += '[PROD](' + (platform.docSite).replace('staging.','') + ') ' + span;
      table += '[BUILD](' + platform.docBuildJP + ') ' + br;
      table += ' | ';
      if (platform.smpLocalized) {
        table += '[STAG](' + platform.smpBrowser + ') ' + span;
        table += '[PROD](' + platform.smpBrowser.replace('staging.','') + ') ';
      }
      // table += span;
      // table += '[BUILD](' + platform.smpBuild + ') ' + span;
      // table += '[GIT](' + platform.smpGithub + ')' + br;
      table += ' |\n';

      // table += ' | ' +  platform.name + ' ' + br;

      // table += ' | ';
      // table += enLocal;
      // table += '[STAG](' + platform.apiSite + ') - ' + span;
      // table += '[PROD](' + platform.apiSite.replace('staging.','') + ')' + br;
      // table += jpLocal;

      // table += ' | ';
      // table += enLocal;
      // table += '[STAG](' + platform.docSite + ') - ' + span;
      // table += '[PROD](' + platform.docSite.replace('staging.','') + ') - ' + span;
      // table += '[BUILD](' + platform.docBuildEN + ') ' + br;

      // table += jpLocal;
      // table += '[STAG](' + platform.docSite + ') - ' + span;
      // table += '[PROD](' + platform.docSite.replace('staging.','') + ') - ' + span;
      // table += '[BUILD](' + platform.docBuildJP + ') ' + br;

      // table += ' | ';
      // table += enLocal;
      // table += '[STAG](' + platform.smpBrowser + ') - ' + span;
      // table += '[PROD](' + platform.smpBrowser.replace('staging.','') + ') - ' + span;
      // table += '[BUILD](' + platform.smpBuild + ') - ' + span;
      // table += '[GIT](' + platform.smpGithub + ')' + br;
      // table += jpLocal;

      // table += ' |\n';

    }
    // console.log(table);
    //console.log('generating download files for ' + platform + ' samples browser ...');

    var outputPath = './LINKS.md'
    fs.writeFileSync(outputPath, table);
    cb();
} exports.generate = generate;
