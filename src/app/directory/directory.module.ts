import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DirectoryComponent } from './directory.component';
import { DirectoryService } from './directory.service';
import { dirRoutes } from './directory.routes';
import { MaterialImportModule } from '../material-import/material-import.module';

@NgModule({
  imports: [
    CommonModule, RouterModule, RouterModule.forChild(dirRoutes),
    MaterialImportModule
  ],
  providers: [DirectoryService],
  declarations: [DirectoryComponent],
  exports: [DirectoryComponent]
})
export class DirectoryModule {}
