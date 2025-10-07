import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CHomePage } from './pages/home/page/home.page';
import { CTestModule } from './pages/test/test.module';
// import { ArticleResolver } from './services/resolvers/article.resolver';

const routes: Routes = [
  { path: '', component: CHomePage, data: { mark: 'home' } }, // mark for reuse
  { path: 'ru', pathMatch: 'full', redirectTo: '/' },
  { path: ':lang', component: CHomePage, data: { mark: 'home' } }, // mark for reuse
  {
    path: 'articles/:slug',
    component: CHomePage,
    data: { popupArticle: true },
    // resolve: { article: ArticleResolver },
  },
  {
    path: ':lang/articles/:slug',
    component: CHomePage,
    data: { popupArticle: true },
    // resolve: { article: ArticleResolver },
  },
  { path: ':lang/test', loadChildren: () => CTestModule },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CAppRoutingModule {}
