import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RoomService } from '../../api/room/room.service';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  inputMsg = '';
  room: string;
  user: string;

  constructor(private route: ActivatedRoute,
              private chatService: ChatService,
              public roomService: RoomService) {
    this.route.url.subscribe(seg => this.room = seg[1].path);
    this.user = localStorage.getItem('user');
  }

  ngOnInit() {
    this.roomService
      .get(this.room)
      .subscribe(() => this.chatService.init(this.room));
  }

  sendMessage(): void {
    /* tslint:disable:no-unused-expression */
    this.room && this.inputMsg && this.chatService.sendMessage(this.room, this.inputMsg);
    this.inputMsg = '';
  }
}
