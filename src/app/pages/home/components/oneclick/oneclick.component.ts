import { Component } from "@angular/core";
import { ILang } from "src/app/model/entities/lang.interface";
import { IWords } from "src/app/model/entities/words.interface";
import { CAppService } from "src/app/services/app.service";

@Component({
    selector: "home-oneclick",
    templateUrl: "oneclick.component.html",
    styleUrl: "oneclick.component.scss",
})
export class COneclickComponent {
    constructor(private appService: CAppService) {}

    get lang(): ILang {return this.appService.lang.value;}
    get words(): IWords {return this.appService.words;}
}
