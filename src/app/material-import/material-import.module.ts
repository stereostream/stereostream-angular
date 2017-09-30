import { NgModule } from '@angular/core';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdCommonModule,
  MdDialogModule,
  MdFormFieldModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdProgressBarModule,
  MdSidenavModule,
  MdSelectModule,
  MdSnackBarModule,
  MdToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MdCommonModule,
    MdAutocompleteModule, MdButtonModule, MdCardModule, MdCheckboxModule,
    MdDialogModule, MdFormFieldModule, MdGridListModule, MdIconModule,
    MdInputModule, MdMenuModule, MdProgressBarModule, MdSidenavModule,
    MdSelectModule, MdSnackBarModule, MdToolbarModule
  ],
  exports: [
    MdCommonModule,
    MdAutocompleteModule, MdButtonModule, MdCardModule, MdCheckboxModule,
    MdDialogModule, MdFormFieldModule, MdGridListModule, MdIconModule,
    MdInputModule, MdMenuModule, MdProgressBarModule, MdSidenavModule,
    MdSelectModule, MdSnackBarModule, MdToolbarModule
  ]
})
export class MaterialImportModule {
}
