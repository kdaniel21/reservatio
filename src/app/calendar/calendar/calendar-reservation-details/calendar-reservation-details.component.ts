import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-calendar-reservation-details',
  templateUrl: './calendar-reservation-details.component.html',
  styleUrls: ['./calendar-reservation-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarReservationDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
