import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForNumberDirective } from './fornumber.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ForNumberDirective],
  exports: [ForNumberDirective]
})
export class ForNumberModule {}
