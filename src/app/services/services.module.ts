import { NgModule } from '@angular/core';
import { CAppService } from './app.service';
import { CDataService } from './data.service';
import { CLangRepository } from './repositories/lang.repository';
import { CSettingRepository } from './repositories/setting.repository';
import { CWordRepository } from './repositories/word.repository';
import { CFileRepository } from './repositories/file.repository';
import { CAwardRepository } from './repositories/award.repository';
import { CArticleRepository } from './repositories/article.repository';

@NgModule({
  declarations: [],
  exports: [],
  providers: [
    // services
    CAppService,
    CDataService,
    // repo
    CSettingRepository,
    CLangRepository,
    CWordRepository,
    CFileRepository,
    CAwardRepository,
    CArticleRepository,
  ],
})
export class CServicesModule {}
