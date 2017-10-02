import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  inputMsg = '';
  received: ChatService['received'] = [];

  constructor(private chatService: ChatService) {
    this.received = this.chatService.received;
  }

  ngOnInit() {
  }

  sendMessage(): void {
    /* tslint:disable:no-unused-expression */
    this.inputMsg && this.chatService.sendMessage(this.inputMsg);
    this.inputMsg = '';
  }
}
