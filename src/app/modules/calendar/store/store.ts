import { Reminder } from '@interfaces/reminder';

export interface CalendarState {
  isLoading: boolean;
  reminders?: Array<Reminder>;
}

export const initialState: CalendarState = {
  isLoading: false
};
 