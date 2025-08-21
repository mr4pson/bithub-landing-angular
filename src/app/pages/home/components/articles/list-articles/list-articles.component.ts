import { Component, OnInit } from '@angular/core';
import { IArticle } from 'src/app/model/entities/article';
import { ILang } from 'src/app/model/entities/lang.interface';
import { IWords } from 'src/app/model/entities/words.interface';
import { CAppService } from 'src/app/services/app.service';
import { CArticleRepository } from 'src/app/services/repositories/article.repository';

@Component({
  selector: 'list-articles',
  templateUrl: 'list-articles.component.html',
  styleUrls: ['list-articles.component.scss'],
})
export class CListArticlesComponent implements OnInit {
  public articles: IArticle[];
  public loading: boolean = false;

  constructor(
    private appService: CAppService,
    private articleRepository: CArticleRepository
  ) {}

  get words(): IWords {
    return this.appService.words;
  }
  get lang(): ILang {
    return this.appService.lang.value;
  }

  ngOnInit(): void {
    this.initArticles();
  }

  private async initArticles(): Promise<void> {
    try {
      this.loading = true;
      const data = await this.articleRepository.loadChunk(0, 1000, 'id', 1, {
        is_for_landing: true,
      });
      this.articles = data.data;
      this.loading = false;
    } catch (err) {
      this.appService.notifyError(err);
    }
  }
}
