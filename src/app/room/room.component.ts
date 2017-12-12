import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { WebrtcService } from '../webrtc/webrtc.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements AfterViewInit {
  name: string;
  sanitize = this.sanitizer.bypassSecurityTrustUrl;
  webcams: string[] = [];
  stream0 = false;
  stream1 = false;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              public webrtcService: WebrtcService) {
    this.route.url.subscribe(
      seg => this.name = seg[1].path
    );
  }

  ngAfterViewInit() {

  }

  addWebcam() {
    this.webcams.push(`webcam${this.webcams.length}`);
  }

  delWebcam(name: string) {
    const ex = this.webcams.lastIndexOf(name);
    if (ex > -1) this.webcams.splice(ex, 1);
  }
}
