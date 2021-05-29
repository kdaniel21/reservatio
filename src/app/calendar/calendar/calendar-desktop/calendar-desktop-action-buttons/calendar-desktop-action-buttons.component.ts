import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { TuiDay } from '@taiga-ui/cdk'
import { addDays, isPast } from 'date-fns'
import { combineLatest, Observable, Subject, merge } from 'rxjs'
import { map, take, takeUntil, tap } from 'rxjs/operators'
import { AuthStateService } from 'src/app/auth/auth-state.service'
import { CalendarService } from '../../calendar.service'

@Component({
  selector: 'app-calendar-desktop-action-buttons',
  templateUrl: './calendar-desktop-action-buttons.component.html',
  styleUrls: ['./calendar-desktop-action-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDesktopActionButtonsComponent implements OnInit, OnDestroy {
  @Input() numOfDisplayedDays: number = 7

  private readonly destroyComponent$ = new Subject<void>()

  private readonly selectedTimePeriod$ = this.calendarService.selectedTimePeriod$
  readonly selectedTuiDay$ = this.selectedTimePeriod$.pipe(
    map(({ startDate }) => TuiDay.fromLocalNativeDate(startDate))
  )

  readonly isAllowedToGoBackInTime$: Observable<boolean> = combineLatest([
    this.selectedTimePeriod$,
    this.authStateService.isAdmin$,
  ]).pipe(
    map(([selectedTimePeriod, isAdmin]) => {
      const previousEndDate = addDays(selectedTimePeriod.startDate, -1)
      const isInPast = isPast(previousEndDate)
      return !isInPast || isAdmin
    })
  )

  readonly customSettingsForm = this.formBuilder.group({
    locations: this.formBuilder.group({
      tableTennis: [true],
      badminton: [true],
    }),
    startDate: [],
  })

  private readonly updateFormAction$ = merge(
    this.selectedTimePeriod$.pipe(map(({ startDate }) => ({ startDate: TuiDay.fromLocalNativeDate(startDate) }))),
    this.calendarService.selectedLocations$.pipe(map(locations => ({ locations })))
  ).pipe(tap(val => this.customSettingsForm.patchValue(val, { emitEvent: false })))

  private readonly updateLocationAction$ = this.customSettingsForm.controls.locations.valueChanges.pipe(
    tap(selectedLocation => this.calendarService.setLocations(selectedLocation))
  )
  private readonly updateSelectedTimeAction$ = this.customSettingsForm.controls.startDate.valueChanges.pipe(
    map((tuiStartDate: TuiDay) => tuiStartDate.toLocalNativeDate()),
    tap(startDate => this.calendarService.setTimePeriod(startDate, addDays(startDate, this.numOfDisplayedDays - 1))),
    tap(() => this.toggleExpand())
  )

  isExpanded = false

  constructor(
    private readonly calendarService: CalendarService,
    private readonly authStateService: AuthStateService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    merge(this.updateFormAction$, this.updateLocationAction$, this.updateSelectedTimeAction$)
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe()
  }

  onNext() {
    this.selectedTimePeriod$.pipe(take(1)).subscribe({
      next: selectedTimePeriod => {
        const newStartDate = addDays(selectedTimePeriod.startDate, this.numOfDisplayedDays)
        const newEndDate = addDays(newStartDate, this.numOfDisplayedDays - 1)
        this.calendarService.setTimePeriod(newStartDate, newEndDate)
      },
    })
  }

  onPrevious() {
    this.selectedTimePeriod$.pipe(take(1)).subscribe({
      next: selectedTimePeriod => {
        const newStartDate = addDays(selectedTimePeriod.startDate, this.numOfDisplayedDays * -1)
        const newEndDate = addDays(newStartDate, this.numOfDisplayedDays - 1)
        this.calendarService.setTimePeriod(newStartDate, newEndDate)
      },
    })
  }

  onCalendarDateSelect(selectedTuiDate: TuiDay) {
    this.customSettingsForm.patchValue({ startDate: selectedTuiDate })
  }

  onSelectToday() {
    this.customSettingsForm.patchValue({ startDate: TuiDay.fromLocalNativeDate(new Date()) })
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded
  }

  ngOnDestroy() {
    this.destroyComponent$.next()
    this.destroyComponent$.complete()
  }
}
