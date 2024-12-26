import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAgiUQMR35KT89wp_2uHK_SdIdXbfKaixg",
  authDomain: "wfo-attendance-3b5d6.firebaseapp.com",
  projectId: "wfo-attendance-3b5d6",
  storageBucket: "wfo-attendance-3b5d6.firebasestorage.app",
  messagingSenderId: "358140993256",
  appId: "1:358140993256:web:b166287f661caee353335d"
};


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(()=> getAuth())
  ]
};
