import { Component, ChangeDetectionStrategy, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { WINDOW } from '@ng-web-apis/common'
import { CalendarEventTitleFormatter, CalendarWeekViewComponent } from 'angular-calendar'
import { addDays } from 'date-fns'
import { fromEvent, merge, Observable } from 'rxjs'
import { distinctUntilChanged, map, mapTo, startWith, take, takeUntil, tap } from 'rxjs/operators'
import { AngularCalendarUtilsService, ReservationCalendarEvent } from '../../angular-calendar-utils.service'
import { CalendarService } from '../calendar.service'
import { CustomEventTitleFormatter } from '../../angular-calendar-utils/custom-event-title-formatter'
import { ReservationDetailsService } from '../calendar-reservation-details/reservation-details.service'
import { TuiDestroyService } from '@taiga-ui/cdk'

@Component({
  selector: 'app-calendar-desktop',
  templateUrl: './calendar-desktop.component.html',
  styleUrls: ['./calendar-desktop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: CalendarEventTitleFormatter, useClass: CustomEventTitleFormatter },
    ReservationDetailsService,
    TuiDestroyService,
  ],
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
  readonly isLoading$ = this.calendarService.loader.isLoading$
  readonly errorMessage$ = this.calendarService.retryHandler.message$

  readonly reservationCalendarEvents$: Observable<ReservationCalendarEvent[]> = this.calendarService.reservations$.pipe(
    map(reservations => reservations.map(this.angularCalendarUtils.convertReservationToCalendarEvent)),
  )

  @ViewChild(CalendarWeekViewComponent, { read: ElementRef }) calendar: ElementRef<Element>

  private readonly scrollToTopAction$: Observable<void> = this.selectedTimePeriod$.pipe(
    tap(() => this.calendar?.nativeElement?.scrollTo({ top: 0 })),
    mapTo(void 0),
  )

  constructor(
    private readonly elementRef: ElementRef,
    @Inject(WINDOW) private readonly window: Window,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly calendarService: CalendarService,
    private readonly angularCalendarUtils: AngularCalendarUtilsService,
    private readonly destroy$: TuiDestroyService,
  ) {}

  ngOnInit(): void {
    merge(this.scrollToTopAction$).pipe(takeUntil(this.destroy$)).subscribe()

    this.initStartDateFromRoute()
  }

  initStartDateFromRoute(): void {
    const startDateString = this.route.snapshot.queryParamMap.get('startDate')
    const selectedTimePeriodStartDate = startDateString ? new Date(startDateString) : new Date()
    this.numOfDisplayedDays$.pipe(take(1)).subscribe({
      next: displayedNumOfDays => {
        const newEndDate = addDays(selectedTimePeriodStartDate, displayedNumOfDays - 1)
        this.calendarService.setTimePeriod(selectedTimePeriodStartDate, newEndDate)
      },
    })
  }

  onSelectTimeToEdit(time: Date): void {
    this.router.navigate(['/', 'create'], { queryParams: { startTime: time.toISOString() } })
  }

  onRetry(): void {
    this.calendarService.retryHandler.retryAfterError()
  }
}
