import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { Reminder } from '@interfaces/reminder';
import * as fromServicesShared from '@shared/services';
import * as fromActionsShared from '@shared/store';
import * as fromServices from '../../services';
import * as fromStore from '../store';
import * as fromActions from '../actions/calendar.actions';
import * as fromReducer from '../reducers/calendar.reducer';
 
@Injectable()
export class CalendarEffects {
  public reminderCreated$: Observable<any>;
  public reminders$: Observable<any>;
  public reminders: Array<Reminder> = [];

  getReminders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.GetReminders),
      map((action: fromActions.GetReminders) => action),
      exhaustMap(() => {
        return this._service.list().pipe(
          map((response: any) => new fromActions.SetReminders(response)),
          catchError(error => of(new fromActionsShared.ErrorAlert(error)))
        )
      })
    )
  });

  createReminder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.CreateReminder),
      map((action: fromActions.CreateReminder) => action.payload),
      exhaustMap((reminder: Reminder) => {
        return this._service.create(reminder).pipe(
          map((response: any) => new fromActions.CreateReminderSuccess({
            reminder: response,
            message: this.translate.instant('reminder-create-message-success')
          })),
          catchError(error => of(new fromActions.CreateReminderFailed(this.translate.instant('reminder-create-message-failed'))))
        )
      })
    )
  });

  createReminderSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.CreateReminderSuccess),
      map((action: fromActions.CreateReminderSuccess) => action.payload),
      tap((response: any) => {
        const lastsReminders = this.reminders.concat(response.reminder);
        this._store.dispatch(new fromActions.SetReminders(lastsReminders));

        const content = {
          width: '350px',
          data: {
            title: 'Alert',
            message: response.message,
            alert: true
          }
        }
        this._utils.showDialog(content);
      })
    )
  }, { dispatch: false });

  createReminderFailed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.CreateReminderFailed),
      map((action: fromActions.CreateReminderFailed) => action.payload),
      tap((response: any) => {
        const content = {
          width: '350px',
          data: {
            title: 'Alert',
            message: response,
            alert: true
          }
        }
        this._utils.showDialog(content);
      })
    )
  }, { dispatch: false });

  editReminder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.EditReminder),
      map((action: fromActions.EditReminder) => action.payload),
      exhaustMap((reminder: Reminder) => {
        return this._service.edit(reminder).pipe(
          map((response: any) => new fromActions.EditReminderSuccess({
            reminder: response,
            message: this.translate.instant('reminder-edit-message-success')
          })),
          catchError(error => of(new fromActions.EditReminderFailed(this.translate.instant('reminder-edit-message-failed'))))
        )
      })
    )
  });

  editReminderSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.EditReminderSuccess),
      map((action: fromActions.EditReminderSuccess) => action.payload),
      tap((response: any) => {
        const remindersClone = this.reminders.map(reminder => {
          if (reminder.id === response.reminder.id) {
            return {
              id: reminder.id,
              text: response.reminder.text,
              dateTime: response.reminder.dateTime,
              color: response.reminder.color,
              city: response.reminder.city,
            }
          } else {
            return reminder;
          }
        });
        this._store.dispatch(new fromActions.SetReminders(remindersClone));

        const content = {
          width: '350px',
          data: {
            title: 'Alert',
            message: response.message,
            alert: true
          }
        }
        this._utils.showDialog(content);
      })
    )
  }, { dispatch: false });

  editReminderFailed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.EditReminderFailed),
      map((action: fromActions.EditReminderFailed) => action.payload),
      tap((response: any) => {
        const content = {
          width: '350px',
          data: {
            title: 'Alert',
            message: response,
            alert: true
          }
        }
        this._utils.showDialog(content);
      })
    )
  }, { dispatch: false });

  deleteReminder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.DeleteReminder),
      map((action: fromActions.DeleteReminder) => action.payload),
      exhaustMap((reminderId: string) => {
        return this._service.delete(reminderId).pipe(
          map((response: any) => new fromActions.DeleteReminderSuccess({
            reminderId: response,
            message: this.translate.instant('reminder-delete-message-success')
          })),
          catchError(error => of(new fromActions.DeleteReminderFailed(this.translate.instant('reminder-delete-message-failed'))))
        )
      })
    )
  });

  deleteReminderSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.DeleteReminderSuccess),
      map((action: fromActions.DeleteReminderSuccess) => action.payload),
      tap((response: any) => {
        const indexToDelete = this.reminders.findIndex( reminder => reminder.id === response.reminderId);
        const remindersClone = this.reminders.slice();
        remindersClone.splice(indexToDelete, 1);
        this._store.dispatch(new fromActions.SetReminders(remindersClone));

        const content = {
          width: '350px',
          data: {
            title: 'Alert',
            message: response.message,
            alert: true
          }
        }
        this._utils.showDialog(content);
      })
    )
  }, { dispatch: false });

  deleteReminderFailed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.DeleteReminderFailed),
      map((action: fromActions.DeleteReminderFailed) => action.payload),
      tap((response: any) => {
        const content = {
          width: '350px',
          data: {
            title: 'Alert',
            message: response,
            alert: true
          }
        }
        this._utils.showDialog(content);
      })
    )
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private _service: fromServices.CalendarService,
    private _utils: fromServicesShared.UtilsService,
    private _store: Store<fromStore.CalendarState>,
    public translate: TranslateService
  ) {
    this.reminders$ = this._store.pipe(select(fromReducer.getReminders));
    this.reminders$.subscribe((reminders) => {
      if (reminders) {
        this.reminders = reminders;
      }
    });
  }
}
