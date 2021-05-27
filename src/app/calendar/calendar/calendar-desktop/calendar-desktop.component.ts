import { Component, ChangeDetectionStrategy, ElementRef, Inject, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { WINDOW } from '@ng-web-apis/common'
import { CalendarEventTitleFormatter } from 'angular-calendar'
import { addDays, format } from 'date-fns'
import { combineLatest, fromEvent, Observable } from 'rxjs'
import { distinctUntilChanged, map, startWith, take, tap } from 'rxjs/operators'
import { AngularCalendarUtilsService } from '../../angular-calendar-utils.service'
import { CalendarService } from '../calendar.service'
import { CustomEventTitleFormatterService } from './custom-event-title-formatter.service'

@Component({
  selector: 'app-calendar-desktop',
  templateUrl: './calendar-desktop.component.html',
  styleUrls: ['./calendar-desktop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CalendarEventTitleFormatter, useClass: CustomEventTitleFormatterService }],
})
export class CalendarDesktopComponent implements OnInit {
  private readonly DAY_WIDTH_PX = 120

  readonly displayedNumOfDays$: Observable<number> = fromEvent(this.window, 'resize').pipe(
    startWith(''),
    map(() => this.elementRef.nativeElement.offsetWidth),
    map(hostElementWidth => {
      const maxAmountToDisplay = Math.floor(hostElementWidth / this.DAY_WIDTH_PX)
      return Math.min(maxAmountToDisplay, 7)
    }),
    distinctUntilChanged()
  )

  readonly selectedTimePeriod$ = this.calendarService.selectedTimePeriod$.pipe(
    tap(selectedTimePeriod => {
      const { startDate } = selectedTimePeriod
      this.router.navigate([], { queryParams: { startDate: format(startDate, 'YYYY-MM-DD') } })
    })
  )

  readonly reservationCalendarEvents$ = this.calendarService.reservations$.pipe(
    map(reservations => reservations.map(this.angularCalendarUtils.convertReservationToCalendarEvent))
  )

  constructor(
    private readonly elementRef: ElementRef,
    @Inject(WINDOW) private readonly window: Window,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly calendarService: CalendarService,
    private readonly angularCalendarUtils: AngularCalendarUtilsService
  ) {}

  ngOnInit() {
    this.initStartDateFromRoute()
  }

  initStartDateFromRoute() {
    const startDateString = this.route.snapshot.queryParamMap.get('startDate')
    const selectedTimePeriodStartDate = startDateString ? new Date(startDateString) : new Date()
    this.displayedNumOfDays$.pipe(take(1)).subscribe({
      next: displayedNumOfDays => {
        const newEndDate = addDays(selectedTimePeriodStartDate, displayedNumOfDays - 1)
        this.calendarService.setTimePeriod(selectedTimePeriodStartDate, newEndDate)
      },
    })
  }

  onNext() {
    combineLatest([this.selectedTimePeriod$, this.displayedNumOfDays$])
      .pipe(take(1))
      .subscribe({
        next: ([selectedTimePeriod, displayedNumOfDays]) => {
          const newStartDate = addDays(selectedTimePeriod.startDate, displayedNumOfDays)
          const newEndDate = addDays(newStartDate, displayedNumOfDays - 1)
          this.calendarService.setTimePeriod(newStartDate, newEndDate)
        },
      })
  }

  onPrevious() {
    combineLatest([this.selectedTimePeriod$, this.displayedNumOfDays$])
      .pipe(take(1))
      .subscribe({
        next: ([selectedTimePeriod, displayedNumOfDays]) => {
          const newStartDate = addDays(selectedTimePeriod.startDate, displayedNumOfDays * -1)
          const newEndDate = addDays(newStartDate, displayedNumOfDays - 1)
          this.calendarService.setTimePeriod(newStartDate, newEndDate)
        },
      })
  }
}
