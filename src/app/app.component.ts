import { Component } from '@angular/core';
import {CalendarComponent} from './calendar/calendar.component';

@Component({
  selector: 'app-root',
  imports: [CalendarComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wfo-attendance';
}
