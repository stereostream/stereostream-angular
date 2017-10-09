import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RoomService } from '../../api/room/room.service';
import { RoomComponent } from './room.component';
import { roomRoutes } from './room.routes';
import { ChatModule } from '../chat/chat.module';
import { WebrtcModule } from '../webrtc/webrtc.module';
import { MaterialImportModule } from '../material-import/material-import.module';
import { WebrtcService } from '../webrtc/webrtc.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule, RouterModule, RouterModule.forChild(roomRoutes),
    FlexLayoutModule,
    MaterialImportModule,
    WebrtcModule, ChatModule
  ],
  providers: [RoomService, WebrtcService],
  declarations: [RoomComponent]
})
export class RoomModule {}
