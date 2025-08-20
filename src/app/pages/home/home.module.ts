import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CHomePage } from './page/home.page';
import { CIntroComponent } from './components/intro/intro.component';
import { COneclickComponent } from './components/oneclick/oneclick.component';
import { CGramComponent } from './components/gram/gram.component';
import { CMomentComponent } from './components/moment/moment.component';
import { CTeamComponent } from './components/team/team.component';
import { CAwardsComponent } from './components/awards/awards.component';
import { CEcoComponent } from './components/eco/eco.component';
import { CContactsComponent } from './components/contacts/contacts.component';
import { CHowComponent } from './components/how/how.component';
import { CListArticlesComponent } from './components/articles/list-articles/list-articles.component';
import { CArticleComponent } from './components/articles/article/article.component';
import { CPopupArticleComponent } from 'src/app/components/popups/popup-article/popup-article.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    CHomePage,
    CIntroComponent,
    COneclickComponent,
    CGramComponent,
    CMomentComponent,
    CTeamComponent,
    CAwardsComponent,
    CEcoComponent,
    CContactsComponent,
    CHowComponent,
    CListArticlesComponent,
    CArticleComponent,
    CPopupArticleComponent,
  ],
  exports: [CHomePage],
})
export class CHomeModule {}
