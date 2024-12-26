import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CalendarComponent} from './calendar/calendar.component';
import {loginCanActivateGuard} from './guard/login.guard';
import {AuthGuard} from '@angular/fire/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'calendar', component: CalendarComponent, canActivate:[AuthGuard] },
];
