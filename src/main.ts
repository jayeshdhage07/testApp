import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'zone.js';
import 'zone.js/testing';
import '@cypress/code-coverage/support';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
