import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CArticleRepository } from 'src/app/services/repositories/article.repository';
import { IArticle } from 'src/app/model/entities/article';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticleResolver implements Resolve<IArticle> {
  constructor(private articleRepository: CArticleRepository) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IArticle> | Promise<IArticle> | IArticle {
    const slug = route.paramMap.get('slug');
    // console.log(route.paramMap, 12313123);
    return slug ? this.articleRepository.loadOne(slug) : null;
  }
}
