import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { CAppService } from 'src/app/services/app.service';
import { CPopupComponent } from '../popup.component';

@Component({
  selector: 'popup-article',
  templateUrl: 'popup-article.component.html',
  styleUrls: ['../../../styles/popups.scss', '../../../styles/telegraph.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CPopupArticleComponent
  extends CPopupComponent
  implements OnInit, OnChanges
{
  get title(): string {
    return (
      this.appService.selectedArticle?.title[this.lang.slug] ||
      this.appService.selectedArticle?.name[this.lang.slug]
    );
  }
  get description(): string {
    return this.appService.selectedArticle?.description[this.lang.slug];
  }

  constructor(
    public override appService: CAppService,
    protected router: Router
  ) {
    super(appService);
  }

  public override onClose(): void {
    super.onClose();
    this.router.navigate([this.appService.lang.value.slug]);
    this.appService.selectedArticle = null;
    this.appService.initSEO();
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    if (this.active) {
      this.initSEO();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['active'] && this.active) {
      this.initSEO();
    }
  }

  private initSEO(): void {
    this.appService.setTitle(this.title);
    this.appService.setMeta('name', 'description', this.description);
  }
}
