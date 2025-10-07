import { enableProdMode } from '@angular/core';
import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import express from 'express';
import { join } from 'path';
import { AppServerModule } from './src/app/app.server.module';
import { environment } from 'src/environments/environment';

if (environment.production) {
  enableProdMode();
}

export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = 'index';

  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // Serve sitemap.xml and robots.txt from the project root
  server.get(['/sitemap.xml', '/robots.txt'], (req, res) => {
    const fileName = req.path.substring(1); // remove leading '/'
    res.sendFile(join(process.cwd(), fileName));
  });

  server.get('*', (req, res) => {
    res.render('index.html', { req });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4205;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();

// export * from './src/main.server';
