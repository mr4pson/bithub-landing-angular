import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'test-page',
  styleUrl: 'test.page.scss',
  templateUrl: 'test.page.html',
})
export class CTestPage implements OnInit {
  ngOnInit(): void {
    console.log('test init');
  }
}
