import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../../api/user/user.service';
import { MaterialImportModule } from '../material-import/material-import.module';
import { AlertsService } from '../alerts/alerts.service';
import { UserCrudDialogComponent } from './user-crud-dialog/user-crud.dialog.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { AdminComponent } from './admin.component';
import { adminRoutes } from './admin.routes';

@NgModule({
  imports: [
    CommonModule, CdkTableModule, MatTableModule, FormsModule,
    ReactiveFormsModule, RouterModule, RouterModule.forChild(adminRoutes),
    MaterialImportModule
  ],
  declarations: [UserCrudDialogComponent, UsersAdminComponent, AdminComponent],
  providers: [AlertsService, UserService],
  entryComponents: [UserCrudDialogComponent]
})
export class AdminModule {}
