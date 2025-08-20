import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CAppRoutingModule } from './app-routing.module';
import { CAppComponent } from './app.component';
import { RouteReuseStrategy } from '@angular/router';
import { CAppRouteReuseStrategy } from './strategies/app.routereusestrategy';
import { CHomeModule } from './pages/home/home.module';
import { CServicesModule } from './services/services.module';
import { HttpClientModule } from '@angular/common/http';
import { CComponentsModule } from './components/components.module';
import { CSafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [CSafePipe, CAppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CAppRoutingModule,
    CServicesModule,
    CComponentsModule,
    CHomeModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CAppRouteReuseStrategy },
  ],
  bootstrap: [CAppComponent],
})
export class CAppModule {}
