import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { Reminder } from '@interfaces/reminder';
import * as fromServicesShared from '@shared/services';
import * as fromStore from '@calendar/store';

@Component({
  selector: 'calendar-app-calendar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public isLoading$: Observable<boolean>;

  public titleCalendar: string = '';
  public calendar: Array<any> = [];
  public daysOfWeek = [];

  public reminders$: Observable<any>;
  public reminders: Array<Reminder>;
  public reminderForm: UntypedFormGroup;

  constructor(
    private _store: Store<fromStore.CalendarState>,
    private _formBuilder: UntypedFormBuilder,
    private _utils: fromServicesShared.UtilsService,
    public translate: TranslateService
  ) {
    this.isLoading$ = this._store.pipe(select(fromStore.getLoading));

    this.reminderForm = this._formBuilder.group({
      id: ['', Validators.required],
      text: ['', [Validators.required, Validators.maxLength(30)]],
      dateTime: ['', Validators.required],
      color: ['', Validators.required],
      city: ['', Validators.required],
    });

    this.reminders$ = this._store.pipe(select(fromStore.getReminders));
    this.reminders$.subscribe((reminders) => {
      if (reminders) {
        this.reminders = reminders;
        this.calendar = [];
        this.createCalendar(this.reminders);
      }
    });
  }

  ngOnInit() {
    this.titleCalendar = moment().format('MMMM');
    this.daysOfWeek = moment.weekdays();
    this._store.dispatch(new fromStore.GetReminders());
  }

  createCalendar(reminders: Array<Reminder>) {
    const startWeek = moment().startOf('month').week();
    const endWeek = moment().endOf('month').add('1', 'week').week();

    for (let week = startWeek; week < endWeek; week++) {
      this.calendar.push({
        week: week,
        days: Array(7).fill(0).map((n, i) => {
          const date = moment().week(week).startOf('week').clone().add(n + i, 'day');

          const remindersOfThisDay = [];
          reminders.forEach((reminder: Reminder) => {
            if (moment(reminder.dateTime).isSame(date)) {
              remindersOfThisDay.push(reminder);
            }
          });

          return {
            date: date,
            currentMonth: moment().isSame(date, 'month'),
            remindersOfThisDay: remindersOfThisDay,
          }
        })
      })
    }
  }

  createReminder(event: any, day: any) {
    if (event.target.classList.value.includes('reminder')) {
      return false;
    }
    this.reminderForm.patchValue({
      id: uuidv4(),
      dateTime: new Date(moment(day.date).format('MM/DD/YYYY'))
    });

    const content: any = {
      width: '550px',
      data: {  
        title: this.translate.instant('reminder-modal-form-title'),
        confirm: true,
        form: [
          {
            name: 'text',
            label: this.translate.instant('reminder-modal-form-text-label'),
            type: 'text',
            required: true,
            maxLength: 30,
            errorMessage: this.translate.instant('form-field-required-error'),
          },
          {
            name: 'dateTime',
            label: this.translate.instant('reminder-modal-form-date-label'),
            type: 'date',
            required: true,
            errorMessage: this.translate.instant('form-field-required-error'),
          },
          {
            name: 'color',
            label: this.translate.instant('reminder-modal-form-color-label'),
            type: 'color',
            required: true,
            errorMessage: this.translate.instant('form-field-required-error'),
          },
          {
            name: 'city',
            label: this.translate.instant('reminder-modal-form-city-label'),
            type: 'text',
            required: true,
            errorMessage: this.translate.instant('form-field-required-error'),
          },
        ],
        model: this.reminderForm.value,
        formElement: this.reminderForm,
        onChange: (model: any) => {
          this.reminderForm.patchValue(model);
        },
      },
      onClose: (result: any) => {
        if (result.action) {
          this._store.dispatch(new fromStore.CreateReminder(this.reminderForm.value));
        }
        this.reminderForm.reset();
      },
    }
    this._utils.showDialog(content);
  }
}
 