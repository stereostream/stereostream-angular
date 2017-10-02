import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';
import { MaterialImportModule } from '../material-import/material-import.module';


@NgModule({
  imports: [
    CommonModule, FormsModule,
    MaterialImportModule
  ],
  providers: [ChatService],
  declarations: [ChatComponent],
  exports: [ChatComponent]
})
export class ChatModule {}
