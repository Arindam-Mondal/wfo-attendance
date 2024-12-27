import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {environment} from '../environments/environment';

// const firebaseConfig = {
//   apiKey: import.meta.env["NG_APP_FB_API_KEY"],
//   authDomain: import.meta.env["NG_APP_FB_AUTH_DOMAIN"],
//   projectId: import.meta.env["NG_APP_FB_PROJECT_ID"],
//   storageBucket: import.meta.env["NG_APP_FB_STORAGE_BUCKET"],
//   messagingSenderId: import.meta.env["NG_APP_FB_MESSAGING_SENDER_ID"],
//   appId: import.meta.env["NG_APP_FB_APP_ID"]
// };

const firebaseConfig = {
  apiKey: environment.apiKey,
  authDomain: environment.authDomain,
  projectId: environment.projectId,
  storageBucket: environment.storageBucket,
  messagingSenderId: environment.messagingSenderId,
  appId: environment.appId,
};


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(()=> getAuth())
  ]
};
