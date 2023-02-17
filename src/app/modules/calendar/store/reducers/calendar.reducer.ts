import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromActions from '../actions/calendar.actions';

export function CalendarReducer(state = fromStore.initialState, action: fromActions.CalendarActions): fromStore.CalendarState {
    switch (action.type) {
      case fromActions.ActionTypes.GetReminders: {
        return { ...state, ...{
          isLoading: true,
        }};
      }

      case fromActions.ActionTypes.SetReminders: {
        return { ...state, ...{
          isLoading: false,
          reminders: action.payload
        }};
      }

      case fromActions.ActionTypes.CreateReminder: {
        return { ...state, ...{
          isLoading: true,
        }};
      }
      case fromActions.ActionTypes.CreateReminderSuccess: {
        return { ...state, ...{
          isLoading: false,
        }};
      }

      case fromActions.ActionTypes.CreateReminderFailed: {
        return { ...state, ...{
          isLoading: false,
        }};
      }

      default: {
        return state;
      }
  }
}

const exportLoading = (state: fromStore.CalendarState) => state.isLoading;
const exportReminders = (state: fromStore.CalendarState) => state.reminders;
const selectCalendarState = createFeatureSelector<fromStore.CalendarState>('calendar');

export const getLoading = createSelector(selectCalendarState, exportLoading);
export const getReminders = createSelector(selectCalendarState, exportReminders);
 