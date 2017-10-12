import { Injectable } from '@angular/core';
import * as io_client from 'socket.io-client';
import * as moment from 'moment';

import { AuthService } from '../../api/auth/auth.service';
import { RoomService } from '../../api/room/room.service';

@Injectable()
export class ChatService {
  io: any /*SocketIOClientStatic*/;

  constructor(private roomService: RoomService) {
    this.io = io_client() as any;
  }

  init(room: string) {
    this.io.on('connection', socket => {
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
    this.io.on('chat message', (msg) => {
      const [date, user, content] = msg.split('\t') as [string, string, string];
      this.roomService.rooms[room].log.unshift({ date: moment(new Date(date)), user, content });
    });
  }

  sendMessage(room: string, msg: string) {
    msg.replace('\t', '    ');
    this.io.emit('chat message', `${AuthService.getAccessToken()}\t${room}\t${msg}`);
  }

  /*sendBlob(room: string, blob: Blob) {
    this.io.emit('video', [room, blob]);
  }*/
}
