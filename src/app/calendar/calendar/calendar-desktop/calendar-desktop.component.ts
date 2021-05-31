import { Component, ChangeDetectionStrategy, ElementRef, Inject, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WINDOW } from '@ng-web-apis/common'
import { CalendarEventTitleFormatter } from 'angular-calendar'
import { addDays } from 'date-fns'
import { fromEvent, Observable } from 'rxjs'
import { distinctUntilChanged, map, startWith, take } from 'rxjs/operators'
import { AngularCalendarUtilsService } from '../../angular-calendar-utils.service'
import { CalendarService } from '../calendar.service'
import { CustomEventTitleFormatter } from '../../angular-calendar-utils/custom-event-title-formatter'
import { ReservationDetailsService } from '../calendar-reservation-details/reservation-details.service'

@Component({
  selector: 'app-calendar-desktop',
  templateUrl: './calendar-desktop.component.html',
  styleUrls: ['./calendar-desktop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CalendarEventTitleFormatter, useClass: CustomEventTitleFormatter }, ReservationDetailsService],
})
export class CalendarDesktopComponent implements OnInit {
  private readonly DAY_WIDTH_PX = 140

  readonly numOfDisplayedDays$: Observable<number> = fromEvent(this.window, 'resize').pipe(
    startWith(''),
    map(() => this.elementRef.nativeElement.offsetWidth),
    map(hostElementWidth => {
      const maxAmountToDisplay = Math.floor(hostElementWidth / this.DAY_WIDTH_PX)
      return Math.min(maxAmountToDisplay, 7)
    }),
    distinctUntilChanged(),
  )

  readonly selectedTimePeriod$ = this.calendarService.selectedTimePeriod$

  readonly reservationCalendarEvents$ = this.calendarService.reservations$.pipe(
    map(reservations => reservations.map(this.angularCalendarUtils.convertReservationToCalendarEvent)),
  )

  constructor(
    private readonly elementRef: ElementRef,
    @Inject(WINDOW) private readonly window: Window,
    private readonly route: ActivatedRoute,
    private readonly calendarService: CalendarService,
    private readonly angularCalendarUtils: AngularCalendarUtilsService,
  ) {}

  ngOnInit() {
    this.initStartDateFromRoute()
  }

  initStartDateFromRoute() {
    const startDateString = this.route.snapshot.queryParamMap.get('startDate')
    const selectedTimePeriodStartDate = startDateString ? new Date(startDateString) : new Date()
    this.numOfDisplayedDays$.pipe(take(1)).subscribe({
      next: displayedNumOfDays => {
        const newEndDate = addDays(selectedTimePeriodStartDate, displayedNumOfDays - 1)
        this.calendarService.setTimePeriod(selectedTimePeriodStartDate, newEndDate)
      },
    })
  }
}
