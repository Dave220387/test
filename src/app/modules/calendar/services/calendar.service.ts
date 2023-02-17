import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Reminder } from '@interfaces/reminder';
import * as fromStore from '@calendar/store';

@Injectable()
export class CalendarService {
  public reminders$: Observable<any>;
  public reminders: Array<Reminder> = [];
  public reminder: Reminder;

  constructor(
    private _store: Store<fromStore.CalendarState>,
  ) {
    this.reminders$ = this._store.pipe(select(fromStore.getReminders));
    this.reminders$.subscribe((reminders) => {
      if (reminders) {
        this.reminders = reminders;
      }
    });
  }

  create(data: Reminder): Observable<any> {
    return of(data);
  }

  edit(data: Reminder): Observable<any> {
    return of(data);
  }

  list(): Observable<Reminder[]> {
    return of(this.reminders);
  }

  delete(reminderId: string): Observable<any> {
    return of(reminderId);
  }
}
 