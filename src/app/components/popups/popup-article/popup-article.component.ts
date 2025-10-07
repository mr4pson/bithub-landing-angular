import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    public override appService: CAppService,
    protected router: Router,
    private route: ActivatedRoute
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
    // this.route.data.subscribe((data) => {
    //   if (data['article']) {
    //     this.appService.selectedArticle = data['article'];
    //     this.appService.popupArticleActive = true;
    //     this.initSEO();
    //   }
    // });
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
    this.appService.setTitle(this.appService.articleTitle);
    this.appService.setMeta(
      'name',
      'description',
      this.appService.articleDescription
    );
  }
}
