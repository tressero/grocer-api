import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export function getBaseUrl() {
  return "https://grocer-np.ochsner.me/api/";
  // return "http://localhost:5165"
  if (environment.production) {
    return document.getElementsByTagName('base')[0].href + "/api/";
  } else {
    return document.getElementsByTagName('base')[0].href;
  }
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.log(err));
