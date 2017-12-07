import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RoomService } from '../../api/room/room.service';
import { ChatModule } from '../chat/chat.module';
import { WebrtcModule } from '../webrtc/webrtc.module';
import { MaterialImportModule } from '../material-import/material-import.module';
import { WebrtcService } from '../webrtc/webrtc.service';
import { RoomComponent } from './room.component';
import { roomRoutes } from './room.routes';
import { PairsModule } from '../pairs/pairs.module';
import { VideoModule } from '../video/video.module';

@NgModule({
  imports: [
    CommonModule, RouterModule, RouterModule.forChild(roomRoutes),
    FlexLayoutModule,
    PairsModule,
    MaterialImportModule,
    WebrtcModule, ChatModule, VideoModule
  ],
  providers: [RoomService, WebrtcService],
  declarations: [RoomComponent]
})
export class RoomModule {}
