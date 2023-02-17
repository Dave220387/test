import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromReducers from './reducers/calendar.reducer';
import * as fromEffects from './effects/calendar.effects';
import * as fromServices from '../services';

@NgModule({
  imports: [
    StoreModule.forFeature('calendar', fromReducers.CalendarReducer),
    EffectsModule.forFeature([fromEffects.CalendarEffects]),
  ],
  providers: [...fromServices.services]
})
export class CalendarStoreModule { }
 