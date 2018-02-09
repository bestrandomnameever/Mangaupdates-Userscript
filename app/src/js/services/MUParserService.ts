import { Manga } from "../classes/Manga";
import axios from "axios";
import { MUHttpService } from "./MUHttpService";

export module MUParserService {
    /**
     * getMangaWithId
     */
    export function getMangaWithId(id: string): Promise<Manga> {
        return MUHttpService.getHTMLMangaWithId(id)
            .then(HTML => {
                const manga = new Manga(id);

                manga.title = HTML.getElementsByClassName("releasestitle")[0].textContent;

                const descriptionElement = getElementWithHeader("Description",HTML);
                manga.description = notAvailableIfNull(descriptionElement.textContent);

                return manga;
            })
    }

    function getElementWithHeader(headerText: string, htmlDoc: Element): Element {
        const elements = htmlDoc.getElementsByClassName("sCat");
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            if(el.textContent === headerText) {
                return el.nextElementSibling;
            }
        }
        return null;
    }

    function notAvailableIfNull(value:string): string {
        if(value != null) {
            return value;
        }else {
            return "Not available";
        }
    }
}