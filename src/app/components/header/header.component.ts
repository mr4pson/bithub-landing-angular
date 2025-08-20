import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CAppService } from "../../services/app.service";
import { ILang } from "src/app/model/entities/lang.interface";
import { IWords } from "src/app/model/entities/words.interface";
import { cfg } from "src/app/app.config";

@Component({
    selector: "the-header",
    templateUrl: "header.component.html",
    styleUrls: ["header.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CHeaderComponent implements OnInit {
    public panelLangsActive: boolean = false; 
    public panelMobActive: boolean = false;
    public headerSolid: boolean = false;

    constructor(private appService: CAppService) {}

    get lang(): ILang {return this.appService.lang.value;}
    get words(): IWords {return this.appService.words;}
    get mainsiteUrl(): string {return `${cfg.mainsiteUrl}/${this.lang.slug}`;}

    ngOnInit(): void {
        this.appService.win.addEventListener("scroll", this.onScroll.bind(this));
    }

    public onTogglePanel(name: string, event: PointerEvent): void {        
        event.stopPropagation();
        this[`panel${name}Active`] = !this[`panel${name}Active`];
    }    

    private onScroll(): void {
        this.headerSolid = this.appService.win.scrollTop > 100;
    }
}