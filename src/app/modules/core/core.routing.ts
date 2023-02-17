import { Routes, RouterModule } from '@angular/router';

import * as fromComponents from './components';

export const routes: Routes = [
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },
  {
    path: 'calendar',
    loadChildren: () => import('src/app/modules/calendar/calendar.module').then(m => m.CalendarModule)
  },
  { path: '**', component: fromComponents.ErrorComponent },
];

export const CoreRouting = RouterModule.forRoot(routes);
 