import { Component, OnInit } from "@angular/core";
import { IAward } from "src/app/model/entities/award.interface";
import { ILang } from "src/app/model/entities/lang.interface";
import { IWords } from "src/app/model/entities/words.interface";
import { CAppService } from "src/app/services/app.service";
import { CAwardRepository } from "src/app/services/repositories/award.repository";

@Component({
    selector: "home-awards",
    templateUrl: "awards.component.html",
    styleUrl: "awards.component.scss",    
})
export class CAwardsComponent implements OnInit {
    public awards: IAward[] = null;
    
    constructor(
        private appService: CAppService,
        private awardRepository: CAwardRepository,
    ) {}

    get lang(): ILang {return this.appService.lang.value;}
    get words(): IWords {return this.appService.words;}

    ngOnInit(): void {
        this.initAwards();
    }

    private async initAwards(): Promise<void> {
        try {
            this.awards = await this.awardRepository.loadAll();
        } catch (err) {
            this.appService.notifyError(err);
        }
    }
}