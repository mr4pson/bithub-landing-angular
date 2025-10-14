import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { C404Page } from './page/404.page';

let routes = RouterModule.forChild([{ path: '', component: C404Page }]);

@NgModule({
  imports: [CommonModule, RouterModule, routes],
  declarations: [C404Page],
  exports: [C404Page],
})
export class C404Module {}
