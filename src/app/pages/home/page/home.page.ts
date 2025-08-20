import { Component } from '@angular/core';
import { CAppService } from 'src/app/services/app.service';

@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class CHomePage {
  get popupLoginActive(): boolean {
    return this.appService.popupLoginActive;
  }
  set popupLoginActive(v: boolean) {
    this.appService.popupLoginActive = v;
  }

  constructor(private appService: CAppService) {}
}
