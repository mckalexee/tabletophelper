import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  loadGTag();
}

function loadGTag() {
  (function (d, script) {
    script = d.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.onload = function () {
      // remote script has loaded
    };
    script.src = '/gtag.js';
    d.getElementsByTagName('head')[0].appendChild(script);
  }(document));
}



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
