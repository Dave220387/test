import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'calendar-app-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  public year: string = '';

  constructor() {
    this.year = moment().format('YYYY');
  }
}
 