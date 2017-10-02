import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { WebrtcModule } from '../webrtc/webrtc.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialImportModule } from '../material-import/material-import.module';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
import { ChatModule } from '../chat/chat.module';

@NgModule({
  imports: [
    CommonModule, RouterModule, RouterModule.forChild(dashboardRoutes),
    FlexLayoutModule, ObserversModule, PlatformModule,
    MaterialImportModule,
    WebrtcModule,
    ChatModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule {}
