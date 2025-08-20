import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CAppModule } from './app/app.module';

platformBrowserDynamic()
    .bootstrapModule(CAppModule)
    .catch(err => console.error(err));
