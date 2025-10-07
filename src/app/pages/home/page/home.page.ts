import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CAppService } from 'src/app/services/app.service';
import { CDataService } from 'src/app/services/data.service';
import { CArticleRepository } from 'src/app/services/repositories/article.repository';

@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class CHomePage implements OnInit {
  get popupArticleActive(): boolean {
    return this.appService.popupArticleActive;
  }
  set popupArticleActive(v: boolean) {
    this.appService.popupArticleActive = v;
  }

  constructor(
    private appService: CAppService,
    private route: ActivatedRoute,
    private dataService: CDataService,
    private articleRepository: CArticleRepository // @Inject(DOCUMENT) private document: Document, // private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      const slug = params.get('slug');

      if (slug) {
        // Загружаем статью по slug и открываем popup
        if (!this.dataService.articles.length) {
          const data = await this.articleRepository.loadChunk(
            0,
            1000,
            'id',
            1,
            {
              slug,
            }
          );
          this.dataService.articles = data.data;
        }

        this.appService.selectedArticle = this.dataService.articles.find(
          (article) => article.slug === slug
        );
        this.popupArticleActive = true;
        // this.updateCanonicalLink(
        //   this.appService.selectedArticle.canonical[
        //     this.appService.lang.value.slug
        //   ]
        // );
      } else {
        this.popupArticleActive = false;
        this.appService.selectedArticle = null;
      }
    });
  }

  // private updateCanonicalLink(newCanonicalUrl: string) {
  //   const canonicalLink = this.document.querySelector('link[rel="canonical"]');
  //   const metaDes = this.document.querySelector('meta[name="description"]');
  //   console.log('canonical link', canonicalLink);
  //   if (canonicalLink) {
  //     console.log('Canonical tag updated', canonicalLink);
  //     this.renderer.setAttribute(canonicalLink, 'href', newCanonicalUrl);
  //   }
  // }
}
