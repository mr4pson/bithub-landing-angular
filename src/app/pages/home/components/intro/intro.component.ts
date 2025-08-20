import { Component } from "@angular/core";
import { cfg } from "src/app/app.config";
import { ILang } from "src/app/model/entities/lang.interface";
import { IWords } from "src/app/model/entities/words.interface";
import { CAppService } from "src/app/services/app.service";

@Component({
    selector: "home-intro",
    templateUrl: "intro.component.html",
    styleUrl: "intro.component.scss",
})
export class CIntroComponent {
    constructor(private appService: CAppService) {}

    get lang(): ILang {return this.appService.lang.value;}
    get words(): IWords {return this.appService.words;}
    get mainsiteUrl(): string {return `${cfg.mainsiteUrl}/${this.lang.slug}`;}
    get videoUrl(): string {return this.appService.files["video"]?.fileurl;}
}