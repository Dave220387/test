import { Component, OnInit  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as fromServicesShared from '@shared/services';

@Component({
  selector: 'calendar-app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  providers: [fromServicesShared.UtilsService]
})
export class HeaderComponent implements OnInit {
  constructor (
    public translate: TranslateService
  ) { }

  ngOnInit() { }

  changeLang(lang) {
    this.translate.use(lang);
  }
}
 