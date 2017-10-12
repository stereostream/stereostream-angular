import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesPipe } from './times.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TimesPipe],
  exports: [TimesPipe]
})
export class TimesModule {}
