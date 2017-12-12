import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertComponent, AdvertDialogComponent } from './advert.component';
import { MaterialImportModule } from '../material-import/material-import.module';


@NgModule({
  imports: [
    CommonModule, MaterialImportModule
  ],
  declarations: [
    AdvertDialogComponent, AdvertComponent
  ],
  entryComponents: [
    AdvertDialogComponent
  ],
  exports: [AdvertComponent]
})
export class AdvertModule {}
