import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { WebrtcModule } from '../webrtc/webrtc.module';

@NgModule({
  imports: [
    CommonModule, RouterModule, RouterModule.forChild(dashboardRoutes),
    WebrtcModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
