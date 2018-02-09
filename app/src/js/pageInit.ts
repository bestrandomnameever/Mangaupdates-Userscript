import axios from 'axios';
import { MUHttpService } from './services/MUHttpService';

export module PageInit {
    const base = "https://www.mangaupdates.com/";

    export function initPage(inDev: boolean): Promise<void> {
        return getOldHTMLTextPromise(inDev)
            .then((oldHTML) => {
                //Delete old body
                document.body.innerHTML = "";
                //Create elements to host old(invisible) and new html
                const main = document.createElement("main");

                oldHTML.id = "old";
                main.id = "main";

                document.body.appendChild(oldHTML);
                document.body.appendChild(main);
            });
    }

    function getOldHTMLTextPromise(inDev: boolean): Promise<Element> {
        if (inDev) {
            return MUHttpService.loadReleasesPage();
        } else {
            return loadHTMLFromPage()
        }
    }

    function loadHTMLFromPage(): Promise<Element> {
        return new Promise<Element>(() => {
            return MUHttpService.createElementFromHTMLString(document.getElementById("centered").innerHTML);
        });
    }
}