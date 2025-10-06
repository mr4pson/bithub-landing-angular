import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { CAppComponent } from './app.component';
import { CAppModule } from './app.module';

@NgModule({
  imports: [ServerModule, CAppModule],
  bootstrap: [CAppComponent],
})
export class AppServerModule {}
