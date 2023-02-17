import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as fromCore from '@core/index';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    fromCore.CoreModule,
  ],
  bootstrap: [fromCore.LayoutComponent]
})
export class AppModule { }
  