import { Component, OnInit } from '@angular/core';
import { CAppService } from 'src/app/services/app.service';

@Component({
  selector: '404-page',
  templateUrl: '404.page.html',
  styleUrls: ['404.page.scss'],
})
export class C404Page implements OnInit {
  constructor(private appService: CAppService) {}

  ngOnInit(): void {}
}
