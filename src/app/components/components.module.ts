import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CHeaderComponent } from './header/header.component';
import { CMenuMainComponent } from './menus/menu-main/menu-main.component';
import { CMenuLangsComponent } from './menus/menu-langs/menu-langs.component';
import { CPanelLangsComponent } from './panels/panel-langs/panel-langs.component';
import { RouterModule } from '@angular/router';
import { CPanelMobComponent } from './panels/panel-mob/panel-mob.component';
import { CFooterComponent } from './footer/footer.component';
import { CUpperComponent } from './upper/upper.component';
import { CPopupErrorComponent } from './popups/popup-error/popup-error.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    CHeaderComponent,
    CFooterComponent,
    CMenuMainComponent,
    CMenuLangsComponent,
    CPanelLangsComponent,
    CPanelMobComponent,
    CUpperComponent,
    CPopupErrorComponent,
  ],
  exports: [
    CHeaderComponent,
    CFooterComponent,
    CMenuMainComponent,
    CMenuLangsComponent,
    CPanelLangsComponent,
    CPanelMobComponent,
    CUpperComponent,
    CPopupErrorComponent,
  ],
})
export class CComponentsModule {}
