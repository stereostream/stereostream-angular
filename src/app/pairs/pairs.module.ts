import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PairsPipe } from './pairs.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PairsPipe],
  exports: [PairsPipe]
})
export class PairsModule {}
