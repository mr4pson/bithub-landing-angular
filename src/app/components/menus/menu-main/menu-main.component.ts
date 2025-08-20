import { Component } from "@angular/core";
import { CAppService } from "src/app/services/app.service";
import { ILang } from "src/app/model/entities/lang.interface";
import { IWords } from "src/app/model/entities/words.interface";
import { Router } from "@angular/router";

@Component({
    selector: "menu-main",
    templateUrl: "menu-main.component.html",
    styleUrls: ["menu-main.component.scss"],
})
export class CMenuMainComponent {
    public items: string[] = ["about", "results", "how", "contacts"];
    
    constructor(
        private appService: CAppService,
        private router: Router,
    ) {}

    get lang(): ILang {return this.appService.lang.value;}
    get words(): IWords {return this.appService.words;}    

    public async onMenuClick(block: string): Promise<void> {
        this.router.navigateByUrl(`/${this.lang.slug}`);
        const element = await this.appService.getElementById(`home-${block}`);
        this.appService.win.scrollTo({top: element.offsetTop - this.appService.headerOffset, behavior: "smooth"});
    }
}