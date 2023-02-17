import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import * as fromServicesShared from '@shared/services';

@Injectable()
export class WeatherService {
  public _apiUrl: string = '';

  constructor(
    private _http: HttpClient,
    private _utils: fromServicesShared.UtilsService,
  ) {
    this._apiUrl = environment.apiWeatherUrl;
  }

  getWeatherInformation(city: string) {
    return this._http.get(`${this._apiUrl}/forecast/daily?q=${city.toLowerCase()}&appid=${environment.apiKey}`)
      .pipe(
        catchError(this._utils.handleErrorHttp)
      );
  }
}
 