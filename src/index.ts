import '@webcomponents/custom-elements/custom-elements.min';
import '@webcomponents/custom-elements/src/native-shim.js';
// import "./assets/css/Scrollbars.css";

//TODO move to utils
import { platforms } from "./platforms";

export class Sample {


    private _bind: () => void;

    constructor() {

        this._bind = () => {

        }
        this._bind();


        this.getSamples().then((samples: any) => {
            console.log("getSamples");
            // console.log(samples);
        });
    }

    public async getSamples(): Promise<any> {

        var samplesDatabase: any = {}; //: any[] = [];
        var platformsTotal = 0;
        for (const plat of platforms) {

            if (plat.name === "angular") continue;

            platformsTotal++;
            // var igrSamples = this.getRepoFiles("IgniteUI/igniteui-react-examples", "vnext", "samples/", "package.json");
            // var igcSamples = this.getRepoFiles("IgniteUI/igniteui-wc-examples", "vnext", "samples/", "package.json");
            var files = await this.getRepoFiles(plat.smpGithubName, "vnext", "samples/", plat.smpGithubFile);

            var samplesCount = 0;
            for (let info of files) {
                // file.path: "samples/maps/geo-map/overview/App.razor"    // Angular, React, WC
                // file.path: "samples/maps/geo-map/overview/package.json" // Blazor
                var file = (info as any);
                // console.log("'" + file.path + "'");

                var path: string = file.path;

                var route: string = file.path.replace("/App.razor", "");
                route = route.replace("/package.json", "");
                route = route.replace("samples/", "");
                var slashN = route.lastIndexOf("/");
                route = route.substring(0, slashN) + '-' + route.substring(slashN + 1);

                // if (samplesCount > 3) {
                //     break;
                // }
                // console.log(route);

                if (samplesDatabase[route] === undefined) {
                    samplesDatabase[route] = {};
                    samplesDatabase[route].platforms = [];

                    var slash1 = route.indexOf("/");
                    samplesDatabase[route].group = route.substring(0, slash1);
                    samplesDatabase[route].component = route.substring(slash1 + 1, slashN);
                }

                // samplesDatabase[route].path = path;
                samplesDatabase[route].platforms.push(plat.name);
                samplesCount++;
            }

            // break;

        }

        var samplesMissing = [];
        var samplesKeys = Object.keys(samplesDatabase);

        console.log("samplesKeys " + samplesKeys.length);

        for (let key of samplesKeys) {

            // console.log(key);
            var sample = samplesDatabase[key];
            if (sample.platforms.length < platformsTotal) {
                sample.route = key;
                samplesMissing.push(sample);
            }
        }

        console.log("samplesMissing " + samplesMissing.length);
        // console.log(samplesMissing);
        console.log(samplesMissing[0]);

        return new Promise<any>((resolve, reject) => {
            resolve(samplesDatabase);
        });

    }

    public async getRepoFiles(repoName: string, repoBranch: string, filePath: string, fileName: string): Promise<[]> {
    // public getRepoFiles(repoName: string, repoBranch: string, filePath: string, fileName: string): any[] {

        var files: any[] = [];
        var repo = await this.getRepo(repoName, repoBranch);
        // this.getRepo(repoName, repoBranch).then((repo: any) => {
            console.log(repoName);
            // mode: "100644"
            // type: "blob"
            // size: 1140
            // path: "samples/maps/geo-map/overview/package.json"
            // sha: "bde7aa727d59c7d12e359ce9e9daee3dda5272b5"
            // url: "https://api.github.com/repos/IgniteUI/igniteui-react-examples/git/blobs/bde7aa727d59c7d12e359ce9e9daee3dda5272b5"
            for (const file of repo.tree) {
                if (file.path &&
                    file.path.indexOf(filePath) >= 0 &&
                    file.path.indexOf(fileName) >= 0) {
                    files.push(file);
                }
            }
            // console.log(files);
            console.log(files.length);
            // console.log(repo.tree.length);
            // return files;
        // });
        // return files;
        return new Promise<any>((resolve, reject) => {
            resolve(files);
        });
    }

    public async getRepo(repoName: string, repoBranch: string): Promise<any> {
        // let url = "https://api.github.com/repos/IgniteUI/igniteui-react-examples/git/trees/vnext?recursive=1";
        let url = "https://api.github.com/repos/" + repoName + "/git/trees/" + repoBranch + "?recursive=1";
        console.log(url);

        let response = await fetch(url);
        // console.log("response");
        let jsonData = await response.json();
        // console.log("jsonData");

        return new Promise<any>((resolve, reject) => {
            resolve(jsonData);
        });
    }

    public getRepoTree(repoName: string, repoBranch: string): any[] {
        var tree: any[] = [];
        this.getRepo(repoName, repoBranch).then((repo: any) => {
            // console.log("getRepoTree");
            tree = repo.tree as any[];
        });
        return tree;
    }

}

new Sample();

document.querySelectorAll(".nav-link").forEach(nav => {
    // let anchor = nav as HTMLAnchorElement;
    // anchor.innerHTML = "&#9472;   " + anchor.innerText;
    // anchor.onclick = (ev) => {
    //     let navPath = anchor.getAttribute("data-nav") as string;
    //     // Router.instance.navigateTo(navPath);

    //     return false;
    // }
});

document.querySelectorAll(".nav-component").forEach(element => {
    // let navComponent = element as HTMLElement;
    // navComponent.innerHTML = "&#10148; " + navComponent.innerText;
    // let navList = document.getElementById(navComponent.id + "-list");
    // navComponent.innerText += " (" + navList.children.length + ")";

    // toggleVisibility(navList, false);
    // navComponent.onclick = (ev) => {
    //     let state = navList.getAttribute("state") as string;
    //     toggleVisibility(navList, state !== "expanded");
    //     // if (state === "expanded") {
    //     //     console.log("nav onclick collapse ");
    //     //     navList.setAttribute("state", "collapsed");
    //     //     navList.setAttribute("style", "display: none;");
    //     //     // navComponent.innerText = "+ " + navText
    //     // } else {
    //     //     console.log("nav onclick expanded ");
    //     //     navList.setAttribute("state", "expanded");
    //     //     navList.setAttribute("style", "display: block;");
    //     //     // navComponent.innerText = "- " + navText Visibility
    //     // }
    //     return false;
    // }
});

function toggleVisibility(element: HTMLElement, isVisible: boolean) {

    element.setAttribute("state", isVisible ? "expanded" : "collapsed");
    element.setAttribute("style", isVisible ? "display: block;" : "display: none;");
}
