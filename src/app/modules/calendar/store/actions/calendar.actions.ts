import { Action } from '@ngrx/store';

export enum ActionTypes {
  CreateReminder = '[Calendar] CreateReminder',
  CreateReminderSuccess = '[Calendar] CreateReminderSuccess',
  CreateReminderFailed = '[Calendar] CreateReminderFailed',
  EditReminder = '[Calendar] EditReminder',
  EditReminderSuccess = '[Calendar] EditReminderSuccess',
  EditReminderFailed = '[Calendar] EditReminderFailed',
  DeleteReminder = '[Calendar] DeleteReminder',
  DeleteReminderSuccess = '[Calendar] DeleteReminderSuccess',
  DeleteReminderFailed = '[Calendar] DeleteReminderFailed',
  GetReminders = '[Calendar] GetReminders',
  SetReminders = '[Calendar] SetReminders',
}
 
export class CreateReminder implements Action {
  readonly type = ActionTypes.CreateReminder;

  constructor(public payload: any) {}
}
export class CreateReminderSuccess implements Action {
  readonly type = ActionTypes.CreateReminderSuccess;

  constructor(public payload: any) {}
}
export class CreateReminderFailed implements Action {
  readonly type = ActionTypes.CreateReminderFailed;

  constructor(public payload: any) {}
}

export class EditReminder implements Action {
  readonly type = ActionTypes.EditReminder;

  constructor(public payload: any) {}
}
export class EditReminderSuccess implements Action {
  readonly type = ActionTypes.EditReminderSuccess;

  constructor(public payload: any) {}
}
export class EditReminderFailed implements Action {
  readonly type = ActionTypes.EditReminderFailed;

  constructor(public payload: any) {}
}

export class DeleteReminder implements Action {
  readonly type = ActionTypes.DeleteReminder;

  constructor(public payload: any) {}
}
export class DeleteReminderSuccess implements Action {
  readonly type = ActionTypes.DeleteReminderSuccess;

  constructor(public payload: any) {}
}
export class DeleteReminderFailed implements Action {
  readonly type = ActionTypes.DeleteReminderFailed;

  constructor(public payload: any) {}
}

export class GetReminders implements Action {
  readonly type = ActionTypes.GetReminders;
}
export class SetReminders implements Action {
  readonly type = ActionTypes.SetReminders;

  constructor(public payload: any) {}
}

export type CalendarActions =
  | CreateReminder
  | CreateReminderSuccess
  | CreateReminderFailed
  | EditReminder
  | EditReminderSuccess
  | EditReminderFailed
  | DeleteReminder
  | DeleteReminderSuccess
  | DeleteReminderFailed
  | GetReminders
  | SetReminders;
