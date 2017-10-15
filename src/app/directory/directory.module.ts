import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { MaterialImportModule } from '../material-import/material-import.module';
import { DirectoryComponent } from './directory.component';
import { DirectoryService } from './directory.service';
import { dirRoutes } from './directory.routes';

@NgModule({
  imports: [
    CommonModule, RouterModule, RouterModule.forChild(dirRoutes), HttpModule,
    MaterialImportModule
  ],
  providers: [DirectoryService],
  declarations: [DirectoryComponent],
  exports: [DirectoryComponent]
})
export class DirectoryModule {}
