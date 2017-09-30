import { AfterViewInit, Component, Input } from '@angular/core';

import { AlertsService } from '../alerts/alerts.service';

@Component({
  selector: 'app-webrtc',
  templateUrl: './webrtc.component.html',
  styleUrls: ['./webrtc.component.css']
})
export class WebrtcComponent implements AfterViewInit {
  @Input() videoSrcObject: HTMLVideoElement['srcObject'];
  selectedCam: string;
  selectedMic: string;
  cams: MediaDeviceInfo[] = [];
  mics: MediaDeviceInfo[] = [];
  mediaDeviceInfos: MediaDeviceInfo[] = [];
  deviceId2Label: {[index: string]: string} = {};
  deviceId2Device: {[index: string]: MediaDeviceInfo} = {};


  constructor(private alertsService: AlertsService) { }

  ngAfterViewInit() {
    navigator.mediaDevices
      .enumerateDevices()
      .then(this.gotDevices.bind(this))
      .catch(this.alertsService.add.bind(this.alertsService));

  }

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

  gotStream(stream: HTMLVideoElement['srcObject']) {
    this.videoSrcObject = stream;
  }
}
