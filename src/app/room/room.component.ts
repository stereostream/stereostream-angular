import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/last';
import { WebrtcService } from '../webrtc/webrtc.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  name: string;

  constructor(private route: ActivatedRoute,
              protected webrtcService: WebrtcService) {
    this.route.url.subscribe(
      seg => this.name = seg[1].path
    );
  }
}
