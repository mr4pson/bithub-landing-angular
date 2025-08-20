import { Component } from "@angular/core";
import { ILang } from "src/app/model/entities/lang.interface";
import { IWords } from "src/app/model/entities/words.interface";
import { CAppService } from "src/app/services/app.service";

@Component({
    selector: "home-moment",
    templateUrl: "moment.component.html",
    styleUrl: "moment.component.scss",
})
export class CMomentComponent {
    constructor(private appService: CAppService) {}

    get lang(): ILang {return this.appService.lang.value;}
    get words(): IWords {return this.appService.words;}
}
