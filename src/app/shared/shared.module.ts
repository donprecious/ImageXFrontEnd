import { StoreModule } from '@ngrx/store';

import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatLabel} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { UppyAngularModule } from 'uppy-angular';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClientJsonpModule } from '@angular/common/http';
import * as appStore from '../redux/store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('root', appStore.approotReducer ),
  ],
  exports : [
    HttpClientJsonpModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    UppyAngularModule,
    FormsModule,
    MatSelectModule,
    MultiSelectModule,
    MatAutocompleteModule
    // MaterialComponentModuleModule

  ]
})
export class SharedModule { }
