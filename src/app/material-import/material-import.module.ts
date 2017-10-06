import { NgModule } from '@angular/core';

import { MdCommonModule } from '@angular/material/core';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdFormFieldModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdLineModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdSelectModule,
  MdSidenavModule,
  MdSnackBarModule,
  MdToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [
    MdCommonModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdDialogModule,
    MdFormFieldModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdLineModule,
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdSelectModule,
    MdSidenavModule,
    MdSnackBarModule,
    MdToolbarModule
  ],
  exports: [
    MdCommonModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdDialogModule,
    MdFormFieldModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdLineModule,
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdSelectModule,
    MdSidenavModule,
    MdSnackBarModule,
    MdToolbarModule
  ]
})
export class MaterialImportModule {
}
