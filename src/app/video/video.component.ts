import { AfterViewInit, Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import * as Hls from 'hls.js';
import * as videojs from 'video.js';

import { ServerStatusService } from '../../api/server-status/server-status.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, AfterViewInit {
  @Input() src: string;

  constructor(private elementRef: ElementRef, private zone: NgZone, private serverStatus: ServerStatusService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.serverStatus.get().subscribe(_serverStatus => {
        if (!this.src.startsWith('http'))
          if (typeof _serverStatus.private_ip !== 'undefined' && location.hostname !== 'localhost')
            this.src = `${location.protocol}//${_serverStatus.private_ip}/api/stream/${this.src}`;
          else if (location.hostname === 'localhost')
            this.src = `${location.protocol}//${location.host}/api/stream/${this.src}`;
        const video = this.elementRef.nativeElement.querySelector('player')
          || document.getElementById('player') as HTMLVideoElement;

        const player = videojs('example-video');
        player.play();

        if (Hls.isSupported()) {
          const hls = new Hls();
          // 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'
          hls.loadSource(this.src);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            // document.getElementById('player')['src'] = URL.createObjectURL(this.src);
            video.play();
          });
        }
      }
    );
  }
}
