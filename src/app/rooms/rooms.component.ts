import { Component, OnInit } from '@angular/core';

import { RoomService } from '../../api/room/room.service';
import { IRoom } from '../../api/room/room.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: IRoom[];
  name = '';

  constructor(private router: Router,
              private roomService: RoomService) { }

  ngOnInit() {
    this.roomService
      .getAll()
      .map(rooms => rooms.rooms)
      .subscribe(rooms => this.rooms = rooms);
  }

  addRoom() {
    /* tslint:disable:no-unused-expression */
    this.name && this.name.length > 1 && this.roomService
      .set(this.name)
      .subscribe(_ =>
        this.router
          .navigate(['/room', this.name])
          .then(() => {})
      );
  }
}
