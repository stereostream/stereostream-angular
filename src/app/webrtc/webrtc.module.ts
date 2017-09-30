import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialImportModule } from '../material-import/material-import.module';
import { WebrtcComponent } from './webrtc.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialImportModule
  ],
  declarations: [WebrtcComponent],
  exports: [WebrtcComponent]
})
export class WebrtcModule { }
