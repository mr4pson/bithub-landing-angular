import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IResponse } from 'src/app/model/dto/response.interface';
import { ISettings } from 'src/app/model/entities/settings.interface';
import { IWords } from 'src/app/model/entities/words.interface';
import { ILang } from 'src/app/model/entities/lang.interface';
import { cfg } from 'src/app/app.config';
import { IFiles } from 'src/app/model/entities/files.interface';
import { IAward } from '../model/entities/award.interface';
import { IGetList } from '../model/dto/getlist.interface';
import { IArticle } from '../model/entities/article';
import { IReadingUpdate } from '../model/dto/reading.update';

@Injectable()
export class CDataService {
  constructor(private http: HttpClient) {}

  public settingsAll(): Observable<IResponse<ISettings>> {
    return this.post('settings/all');
  }

  public langsAll(): Observable<IResponse<ILang[]>> {
    return this.post('langs/all');
  }

  public wordsAll(): Observable<IResponse<IWords>> {
    return this.post(`words/all`);
  }

  public filesAll(): Observable<IResponse<IFiles>> {
    return this.post('files/all');
  }

  public awardsAll(): Observable<IResponse<IAward[]>> {
    return this.post('awards/all');
  }

  public articlesChunk(dto: IGetList): Observable<IResponse<IArticle[]>> {
    return this.post('articles/chunk', dto);
  }
  public articlesOne(slug: string): Observable<IResponse<IArticle>> {
    return this.post(`articles/one/${slug}`);
  }
  public articlesUpdateReading(
    dto: IReadingUpdate
  ): Observable<IResponse<void>> {
    return this.post('articles/update-reading', dto);
  }

  private post(url: string, body: any = null): Observable<any> {
    return this.http.post(`${cfg.apiUrl}/${url}`, body);
  }
}
