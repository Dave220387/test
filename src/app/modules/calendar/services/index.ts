import { CalendarService } from './calendar.service';
import { WeatherService } from './weather.service';

export const services: any[] = [
  CalendarService,
  WeatherService
];

export * from './calendar.service';
export * from './weather.service';
 