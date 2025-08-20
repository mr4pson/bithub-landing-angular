import { Injectable } from '@angular/core';
import { CDataService } from '../data.service';
import { IAward } from 'src/app/model/entities/award.interface';

@Injectable()
export class CAwardRepository {    
    constructor(private dataService: CDataService) {}

    public loadAll(): Promise<IAward[]> {        
        return new Promise((resolve, reject) =>             
            this.dataService
                .awardsAll()
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(res.data) : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }    
}
