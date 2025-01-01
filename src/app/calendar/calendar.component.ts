import {Component, computed, inject, signal} from '@angular/core';
import {DatePipe, NgClass, NgForOf} from '@angular/common';
import {AuthService} from '../service/auth.service';
import {CalenderFirebaseService} from '../service/calender-firebase.service';
import {WfoAttendance} from '../model/calendar.interface';

@Component({
  selector: 'app-calendar',
  imports: [
    NgClass,
    DatePipe,
    NgForOf
  ],
  templateUrl: './calendar.component.html',
  standalone: true,
  styleUrl: './calendar.component.css'
})
export class CalendarComponent{

  currentDate = signal<Date>(new Date());
  attendance = signal<WfoAttendance[]>([]);
  showLoader = signal<boolean>(false);

  readonly authService: AuthService = inject(AuthService);
  readonly calendarFirebaseService = inject(CalenderFirebaseService);

  calendarDays: Date[] = [];
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  ngOnInit(): void {
    this.generateCalendarDays();
    this.showLoader.set(true);
    this.calendarFirebaseService.getWfoAttendanceByUsername(this.authService.getCurrentUser()?.email ?? '')
      .subscribe({
        next: (wfoAttendanceArray) => {
          this.attendance.set(wfoAttendanceArray);
          this.showLoader.set(false);
        },
        error: (error) => {
          this.showLoader.set(false);
        }
      });
  }

  generateCalendarDays() {
    const year = this.currentDate().getFullYear();
    const month = this.currentDate().getMonth();

    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Start from the last few days of previous month if necessary
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    // Generate 42 days (6 weeks) to ensure we have enough dates
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      this.calendarDays.push(date);
    }
  }


  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentDate().getMonth();
  }

  updateCurrentMonth(index: number) {
    this.currentDate().setMonth(this.currentDate().getMonth()+index);
    this.currentDate.set(new Date(this.currentDate()));
    this.calendarDays =[]
    this.generateCalendarDays();
  }

  updateWfoAttendance(date: Date) {
    const dateString = date.toLocaleDateString('en-IN');
    const wfoAttendanceId = this.getWfoAttendanceId(date)
    if(wfoAttendanceId) {
      this.showLoader.set(true);
      this.calendarFirebaseService.removeWfoDate(wfoAttendanceId).subscribe({
        next : () => {
          //Delete the date from the attendance array and then return
          const filteredAttendance = this.attendance().filter(attendanceDate =>
            attendanceDate.id !== wfoAttendanceId
          );
          this.attendance.set(filteredAttendance);
          this.showLoader.set(false);
        },
        error: (error) => this.showLoader.set(false)
      });
      return;
    }

    //Add the WfoAttendance here
    const strDate = dateString.split("/");
    const day: number = parseInt(strDate[0]);
    const month: number = parseInt(strDate[1]);
    const year: number = parseInt(strDate[2]);

    const wfoAttendance: WfoAttendance = {id: '', day: day, month: month, year: year, username: this.authService.getCurrentUser()?.email ?? ''};

    this.showLoader.set(true);
    this.calendarFirebaseService.addWfoDate(wfoAttendance)
      .subscribe({
        next: (addedWfoAttendanceId) => {
          const updatedAttendance = this.attendance().map(dt=>dt);
          updatedAttendance.push({...wfoAttendance, id: addedWfoAttendanceId});
          this.attendance.set(updatedAttendance);
          this.showLoader.set(false);
        },
        error: (error) => this.showLoader.set(false)
      });
  }

  wasWorkingFromOffice(date: Date): boolean {
    return !!this.getWfoAttendanceId(date);
  }

  getWfoAttendanceId(date: Date) {
    const dateString = date.toLocaleDateString('en-IN');
    const wfoAttendance = this.attendance().find(dt => (dt.day + "/" + dt.month + "/" + dt.year) === dateString);
    return wfoAttendance?.id;
  }

  getNoOfDaysCompleted = computed(() => {
    const currentYear = this.currentDate().getFullYear(); // Get the current year
    const currentMonth = this.currentDate().getMonth(); // Get the current month (0-based index, 0 = January, 11 = December)

    return this.attendance().filter((attendanceDate: WfoAttendance) => {

      const {day, month, year} = attendanceDate;

      // Note: month is 0-based in JavaScript Date
      return year === currentYear && month - 1 === currentMonth;
    }).length;
  });

}
