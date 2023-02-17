import { TestBed } from '@angular/core/testing';
import { v4 as uuidv4 } from 'uuid';

import { CalendarService } from './calendar.service';
import { recordatorio } from '@interfaces/recordatorio';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarService);
  });

  it('Creacion de Recordatorio', () => {
    expect(service).toBeTruthy();
  });

  it('crear nuevo recordatorio', () => {
    service.recordatorio = {
      id: uuidv4(),
      text: 'Txt 1',
      dateTime: new Date(),
      color: '#31B550',
      city: 'Quito',
    };
    spyOn(service, 'recordatorio');
    service.create(service.recordatorio);
    expect(service.recordatorio.id).toBeDefined();
    expect(service.recordatorio.text.length).toBeLessThanOrEqual(30);
    expect(service.recordatorio.city.length).toBeLessThanOrEqual(30);
  });

  it('Editar recordatorio', () => {
    const recordatorios = [{
      id: uuidv4(),
      text: 'Texto de muestra',
      dateTime: new Date(),
      color: '#31B550',
      city: 'Quito',
    }];
    service.recordatorios = recordatorios;
    const recordatorioToEdit = {
      id: service.recordatorios[0].id,
      text: 'Text update',
      dateTime: service.recordatorios[0].dateTime,
      color: service.recordatorios[0].color,
      city: service.recordatorios[0].city,
    }
    spyOn(service, 'recordatorios');
    service.edit(recordatorioToEdit);
    expect(service.recordatorios[0].text).toContain(recordatorios[0].text);
  });

  it('Borrar recordatorio', () => {
    const recordatorios = [{
      id: uuidv4(),
      text: 'Texto de muestra',
      dateTime: new Date(),
      color: '#31B550',
      city: 'Quito',
    }];
    service.recordatorios = recordatorios;
    spyOn(service, 'recordatorios');
    service.delete(service.recordatorios[0].id);
    expect(service.recordatorios.length).toBeLessThan(recordatorios.length);
  });
});
