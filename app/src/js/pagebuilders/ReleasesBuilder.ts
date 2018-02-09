import axios from "axios";
import { MUParserService } from "../services/MUParserService";

export class ReleasesBuilder {

    private oldDoc = document.getElementById("old");
    private ids: Array<string>;

    constructor() {
        this.ids = Array.from(this.oldDoc.querySelectorAll("td a[title='Series Info']")).map(el => {
            return el.getAttribute("href").split("?id=")[1]
        });

        this.ids.forEach(id => {
            MUParserService.getMangaWithId(id)
                .then(manga => {
                    console.log(manga);
                })
        })
    }
}