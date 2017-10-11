import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { WebrtcService } from '../webrtc/webrtc.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  name: string;
  sanitize = this.sanitizer.bypassSecurityTrustUrl;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              public webrtcService: WebrtcService) {
    this.route.url.subscribe(
      seg => this.name = seg[1].path
    );
  }
}
