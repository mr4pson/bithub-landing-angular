import { Injectable } from '@angular/core';
import { IPage } from 'src/app/model/entities/page';
import { CDataService } from '../data.service';

@Injectable()
export class CPageRepository {
  constructor(private dataService: CDataService) {}

  public loadOne(slug: string): Promise<IPage> {
    return new Promise((resolve, reject) =>
      this.dataService.pagesOne(slug).subscribe({
        next: (res) =>
          res.statusCode === 200 ? resolve(res.data) : reject(res.statusCode),
        error: (err) => reject(err.message),
      })
    );
  }
}
