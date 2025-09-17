import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/model/entities/article';
import { ILang } from 'src/app/model/entities/lang.interface';
import { IWords } from 'src/app/model/entities/words.interface';
import { CAppService } from 'src/app/services/app.service';

@Component({
  selector: 'the-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.scss'],
})
export class CArticleComponent {
  @Input() public article: IArticle;

  constructor(private appService: CAppService) {}

  get words(): IWords {
    return this.appService.words;
  }
  get lang(): ILang {
    return this.appService.lang.value;
  }

  openArticle() {
    // this.appService.popupArticleActive = true;
    // this.appService.selectedArticle = this.article;
  }
}
