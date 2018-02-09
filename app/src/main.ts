const dev = true;
import { PageInit } from "./js/pageInit";
import { ReleasesBuilder } from "./js/pagebuilders/ReleasesBuilder";

PageInit.initPage(dev).then(() => {
    const builder = new ReleasesBuilder();
});