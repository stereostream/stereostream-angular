import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DirectoryComponent } from './directory.component';
import { DirectoryService } from './directory.service';
import { dirRoutes } from './directory.routes';

@NgModule({
  imports: [
    CommonModule, RouterModule, RouterModule.forChild(dirRoutes)
  ],
  providers: [DirectoryService],
  declarations: [DirectoryComponent],
  exports: [DirectoryComponent]
})
export class DirectoryModule {}
