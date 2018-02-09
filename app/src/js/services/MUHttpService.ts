import axios, {AxiosRequestConfig, AxiosPromise} from "axios";
import { HttpConstants } from "../constants/HttpConstants";
import { Manga } from "../classes/Manga";

export module MUHttpService {
    export function getHTMLMangaWithId(id: string): Promise<Element> {
        return axios({
            method: "get",
            baseURL: HttpConstants.baseUrlMangaUpdates,
            url: HttpConstants.seriesDetailPage,
            params: {
                id: id
            }
        }).then(res => {
            console.log([res.status, res.statusText]);
            const doc = createElementFromHTMLString(res.data);
            return doc;
        }).catch(err => {
            //Algemenere oplossing voor alle http methodes voor een max aantal keer te herproberen of excpetion gooien
            return getHTMLMangaWithId(id);
        });
    }

    export function loadReleasesPage(page:number = 1, 
        perPage: number = 25, 
        orderBy: ReleasesOrderOptions = ReleasesOrderOptions.Date, 
        orderAsc: boolean = false): Promise<Element> {
            return axios({
                method: 'get',
                baseURL: HttpConstants.baseUrlMangaUpdates,
                url: HttpConstants.releasesPage,
                params: {
                    page: page.toString(),
                    perpage: perPage.toString(),
                    act: "archive",
                    asc: orderAsc ? 'asc' : 'desc',
                    orderby: orderBy
                }
            }).then((res) => {
                const doc = createElementFromHTMLString(res.data);
                return doc;
            });
    }

    // function transformSrcAttrToDataAttr(element:Element) {
    //     Array.from(element.querySelectorAll("[src]")).forEach(el => {
    //         el.setAttribute('data-src', el.getAttribute('src'));
    //         el.setAttribute('src', "");
    //     });
    // }

    export function createElementFromHTMLString(HTML:string, replaceSrcWithData:boolean = true) {
        const tmpElem = document.createElement('div');
        if(replaceSrcWithData) {
            tmpElem.innerHTML = transformSrcAttrToDataAttr(HTML);;
        }else {
            tmpElem.innerHTML = HTML;
        }
        const element = document.createElement('div');
        element.innerHTML = tmpElem.querySelector("div#centered").innerHTML;
        return element;
    }

    function transformSrcAttrToDataAttr(html: string): string {
        const fixed = html.replace(new RegExp("src=", "g"), "data-src=");
        return fixed;
    }

    enum ReleasesOrderOptions {
        Title = 'title',
        Date = 'date',
        Volume = 'vol',
        Chapter = 'chap',
        Groups = 'groups'
    }
}