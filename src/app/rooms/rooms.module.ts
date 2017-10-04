import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { RoomService } from '../../api/room/room.service';
import { MaterialImportModule } from '../material-import/material-import.module';
import { roomsRoutes } from './rooms.routes';
import { RoomsComponent } from './rooms.component';

@NgModule({
  imports: [
    CommonModule, RouterModule, RouterModule.forChild(roomsRoutes), FormsModule,
    MaterialImportModule
  ],
  providers: [RoomService],
  declarations: [RoomsComponent],
  exports: [RoomsComponent]
})
export class RoomsModule {}
