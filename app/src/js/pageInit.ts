import axios from 'axios';

export module PageInit {
    const base = "https://www.mangaupdates.com/";
    export const old = document.createElement("div");
    export const main = document.createElement("main");

    export function initPage(inDev: boolean) {
        getOldHTMLTextPromise(inDev)
            .then((oldHTMLText) => {
                //Delete old body
                document.body.innerHTML = "";
                //Create elements to host old(invisible) and new html
                old.id = "old";
                old.innerHTML = oldHTMLText;

                document.body.appendChild(old);
                document.body.appendChild(main);
            })
    }

    function getOldHTMLTextPromise(inDev: boolean): Promise<string> {
        if (inDev) {
            return loadHTMLFromUrl("releases.html");
        } else {
            return loadHTMLFromPage()
        }
    }

    function loadHTMLFromPage(): Promise<string> {
        return new Promise<string>(() => {
            return document.getElementById("centered").innerHTML;
        });
    }

    function loadHTMLFromUrl(pageUrl: string): Promise<string> {
        return axios({
            method: 'get',
            baseURL: base,
            url: pageUrl
        }).then((res) => {
            const tmpElem = document.createElement('div');
            tmpElem.innerHTML = res.data;
            return tmpElem.querySelector("div#centered").innerHTML;
        });
    }
}