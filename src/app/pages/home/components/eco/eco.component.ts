import { Component } from "@angular/core";
import { cfg } from "src/app/app.config";
import { ILang } from "src/app/model/entities/lang.interface";
import { IWords } from "src/app/model/entities/words.interface";
import { CAppService } from "src/app/services/app.service";

@Component({
    selector: "home-eco",
    templateUrl: "eco.component.html",
    styleUrl: "eco.component.scss",
})
export class CEcoComponent {
    constructor(private appService: CAppService) {}

    get lang(): ILang {return this.appService.lang.value;}
    get words(): IWords {return this.appService.words;}
    get mainsiteUrl(): string {return `${cfg.mainsiteUrl}/${this.lang.slug}`;}
}