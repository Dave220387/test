import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as ramda from 'ramda';

import * as fromServicesShared from '@shared/services';

@Component({
  selector: 'calendar-app-layout',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./layout.component.scss'],
  templateUrl: './layout.component.html',
  providers: [fromServicesShared.UtilsService]
})
export class LayoutComponent implements OnInit {
  public currentPath: string = '';
  public titlePage: string = '';

  constructor(
    public router: Router,
    private _title: Title,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');

    this.router.events.pipe(
      filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentPath = event.urlAfterRedirects;
      this.titlePage = this.formatTitlePage(this.currentPath);
      this._title.setTitle(`${this.titlePage} - Calendar App`);
    });
  }

  ngOnInit() { }

  formatTitlePage(path: any) {
    path = ramda.last(path.split('/'));
    path = path.replace(/[_-]/g, ' ');
    path = path.split(' ');
    path.forEach((word: any, index: number) => {
      path[index] = word.charAt(0).toUpperCase() + word.slice(1)
    });
    path = path.join(' ');

    return path;
  }
}
 