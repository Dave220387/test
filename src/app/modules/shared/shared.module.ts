import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MccColorPickerModule} from 'material-community-components/color-picker';

import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import * as fromPipes from './pipes';
import * as fromServices from './services';
import * as fromComponents from './components'

const ComponentsMaterial = [
  MatFormFieldModule, MatAutocompleteModule, MatCheckboxModule, 
  MatDatepickerModule, MatNativeDateModule, MatInputModule, MatRadioModule, 
  MatSelectModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, 
  MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule, 
  MatButtonToggleModule
];
 
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MomentModule,
        MccColorPickerModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        ...ComponentsMaterial,
    ],
    declarations: [
        ...fromComponents.components,
        ...fromPipes.pipes,
    ],
    exports: [
        ...ComponentsMaterial,
        ...fromComponents.components,
        ...fromPipes.pipes,
    ],
    providers: [
        ...fromServices.services,
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'auto' } },
        { provide: MAT_DATE_LOCALE, useValue: 'en-EN' },
    ]
})

export class SharedModule {}
