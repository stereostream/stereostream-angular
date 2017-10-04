import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/last';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  name: string;

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe(
      seg => this.name = seg[1].path
    );
  }

  ngOnInit() {}
}
