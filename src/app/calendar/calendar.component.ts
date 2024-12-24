import {Component, computed, signal} from '@angular/core';
import {DatePipe, NgClass, NgForOf} from '@angular/common';

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
  attendance = signal<string[]>([]);

  calendarDays: Date[] = [];
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  ngOnInit(): void {
    this.generateCalendarDays();

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

    if(this.wasWorkingFromOffice(date)) {
      //Delete the date from the attendance array and then return
      const filteredAttendance = this.attendance().filter(attendanceDate =>
        attendanceDate !== dateString
      );
      this.attendance.set(filteredAttendance);
      return;
    }
    const updatedAttendance = this.attendance().map(dt=>dt);
    updatedAttendance.push(dateString);
    this.attendance.set(updatedAttendance);
  }

  wasWorkingFromOffice(date: Date): boolean {
    const dateString = date.toLocaleDateString('en-IN');
    return !!this.attendance().find(dt => dt === dateString);
  }

  getNoOfDaysCompleted = computed(() => {
    const currentYear = this.currentDate().getFullYear(); // Get the current year
    const currentMonth = this.currentDate().getMonth(); // Get the current month (0-based index, 0 = January, 11 = December)

    return this.attendance().filter((attendanceDate: string) => {
      // Split the date string into components
      const [day, month, year] = attendanceDate.split('/').map(Number);

      // Note: month is 0-based in JavaScript Date
      return year === currentYear && month - 1 === currentMonth;
    }).length;
  });

}
