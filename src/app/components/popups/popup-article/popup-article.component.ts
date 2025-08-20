import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { CAppService } from 'src/app/services/app.service';
import { CPopupComponent } from '../popup.component';
import { IArticle } from 'src/app/model/entities/article';

@Component({
  selector: 'popup-article',
  templateUrl: 'popup-article.component.html',
  styleUrls: ['../../../styles/popups.scss', '../../../styles/telegraph.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CPopupArticleComponent extends CPopupComponent {
  constructor(
    public override appService: CAppService,
    protected router: Router
  ) {
    super(appService);
  }

  public override onClose(): void {
    super.onClose();
    this.appService.selectedArticle = null;
  }
}
