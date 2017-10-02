import { Injectable } from '@angular/core';
import * as io_client from 'socket.io-client';
import * as moment from 'moment';

import { AuthService } from '../../api/auth/auth.service';

@Injectable()
export class ChatService {
  io: any /*SocketIOClientStatic*/;
  public received: Array<{date: moment.Moment, user: string, content: string}> = [];

  constructor() {
    this.io = io_client() as any;
    this.io.on('connection', socket => {
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
    this.io.on('chat message', (msg) => {
      const [date, user, content] = msg.split('\t');
      this.received.push({ date: moment(new Date(date)), user, content });
    });
  }

  sendMessage(msg: string) {
    msg.replace('\t', '    ');
    this.io.emit('chat message', `${AuthService.getAccessToken()}\t${msg}`);
  }
}
