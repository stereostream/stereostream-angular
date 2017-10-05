import { AfterViewInit, Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlertsService } from '../alerts/alerts.service';

// import * as Peer from 'simple-peer';
// import 'rtcmulticonnection-v3/dist/RTCMultiConnection';

declare const MediaRecorder: any;

interface IRTCMultiConnection {
  socketURL: string;
  session: {audio: boolean, video: boolean};
  sdpConstraints: {mandatory: {OfferToReceiveAudio: boolean, OfferToReceiveVideo: boolean}};
  onstream: (event: Event) => void;
  open: (roomid: string) => void;
  join: (roomid: string) => void;
}

@Component({
  selector: 'app-webrtc',
  templateUrl: './webrtc.component.html',
  styleUrls: ['./webrtc.component.css']
})
export class WebrtcComponent implements AfterViewInit {
  @Input() name: string;
  @ViewChildren('webcam') webcam: QueryList<ElementRef>;
  @ViewChild('broadcast') broadcast: HTMLDivElement;
  stream = HTMLVideoElement['srcObject'];

  selectedCam: string;
  selectedMic: string;
  cams: MediaDeviceInfo[] = [];
  mics: MediaDeviceInfo[] = [];
  mediaDeviceInfos: MediaDeviceInfo[] = [];
  deviceId2Label: {[index: string]: string} = {};
  deviceId2Device: {[index: string]: MediaDeviceInfo} = {};
  recorder: any /* MediaRecorder */;

  room: string;

  /* peer: Peer.Instance;
  targetpeer: any;
  outgoing: string;
  incoming: string;

  connection: IRTCMultiConnection;
  openRtcRoomToggle = true;
  joinRtcRoomToggle = true;
  */

  constructor(private route: ActivatedRoute,
              private alertsService: AlertsService/*,
              private chatService: ChatService,
              private serverStatusService: ServerStatusService*/) {
    this.route.url.subscribe(seg => this.room = seg[1].path);
  }

  /*sub(ev) {
    ev.preventDefault();
    this.peer.signal(JSON.stringify({ incoming: this.incoming }));
  }
  */

  ngAfterViewInit() {
    /*
    this.peer = new Peer({ initiator: location.hash === '#1', trickle: false });
    this.peer.on('error', err => { console.log('error', err); });

    this.peer.on('signal', data => {
      console.log('SIGNAL', JSON.stringify(data));
      this.outgoing = JSON.stringify(data);
    });

    this.peer.on('connect', () => {
      console.log('CONNECT');
      this.peer.send('whatever' + Math.random());
    });

    this.peer.on('data', data => {
      console.log('data: ' + data);
    });

    const RTCMultiConnection: (roomid?: string, forceOptions?) => void = window['RTCMultiConnection'];
    this.connection = new RTCMultiConnection(*/
    /*this.room*/
    /*);
        this.serverStatusService.get().subscribe(serverStatus => {
          this.connection.socketURL = `${location.protocol}//${serverStatus.private_ip}/`;
          this.connection.session = {
            audio: true,
            video: true
          };

          this.connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
          };

          this.connection.onstream = (event: Event & {mediaElement: HTMLVideoElement}) => {
            this.broadcast.appendChild(event.mediaElement);
          };
        });
        */

    navigator.mediaDevices
      .enumerateDevices()
      .then(this.gotDevices.bind(this))
      .catch(this.alertsService.add.bind(this.alertsService));
  }

  /*openRtcRoom() {
    this.openRtcRoomToggle = false;
    this.connection.open(this.room);
  }

  joinRtcRoom() {
    this.joinRtcRoomToggle = false;
    this.connection.join(this.room);
  }*/

  gotDevices(deviceInfos: MediaDeviceInfo[]) {
    this.mediaDeviceInfos = deviceInfos;
    this.mediaDeviceInfos.forEach(device => {
        if (device.kind === 'audioinput')
          this.mics.push(device);
        else if (device.kind === 'videoinput')
          this.cams.push(device);
        else
          console.warn(`Unexpected: ${JSON.stringify(device)}`);
        this.deviceId2Label[device.deviceId] = {
          audioinput: `microphone: ${device.deviceId}`,
          videoinput: `camera: ${device.deviceId}`
        }[device.kind] || `[${device.kind}]: ${device.groupId} - ${device.deviceId}`;
        this.deviceId2Device[device.deviceId] = device;
      }
    );
  }

  getStream() {
    const mic: MediaDeviceInfo = this.deviceId2Device[this.selectedMic];
    const cam: MediaDeviceInfo = this.deviceId2Device[this.selectedCam];
    const constraints: MediaStreamConstraints = {
      audio: {
        advanced: [{
          deviceId: mic.deviceId,
          groupId: mic.groupId
        }]
      },
      video: {
        advanced: [{
          deviceId: cam.deviceId,
          groupId: cam.groupId
        }]
      }
    };

    navigator
      .mediaDevices
      .getUserMedia(constraints)
      .then(this.gotStream.bind(this))
      .catch(this.alertsService.add.bind(this.alertsService));
  }

  startRecord() {
    this.recorder = new MediaRecorder(this.stream);
    this.recorder.start();
  }

  stopRecord() {
    this.recorder.ondataavailable = e => {
      const ul = document.getElementById('ul');
      ul.style.display = 'block';
      const a = document.createElement('a'),
        li = document.createElement('li');
      a.download = `${Date.now() / 1000}.${this.name}.RecordedVideo.webm`;
      a.href = URL.createObjectURL(e.data);
      a.textContent = a.download;
      li.appendChild(a);
      ul.appendChild(li);
    };
    this.recorder.stop();
  }

  gotStream(stream: HTMLVideoElement['srcObject']) {
    // this.showWebcam = true;
    this.stream = stream;
    this.webcam.changes.subscribe(() =>
      (this.webcam.first.nativeElement as HTMLVideoElement).srcObject = stream
    );
  }
}
