import { AfterViewInit, Component, Input } from '@angular/core';

import { AlertsService } from '../alerts/alerts.service';

@Component({
  selector: 'app-webrtc',
  templateUrl: './webrtc.component.html',
  styleUrls: ['./webrtc.component.css']
})
export class WebrtcComponent implements AfterViewInit {
  /*@Input() audioSource;
  @Input() videoSource;*/
  @Input() video: HTMLVideoElement;
  selectedCam: string;
  selectedMic: string;
  cams: MediaDeviceInfo[] = [];
  mics: MediaDeviceInfo[] = [];
  mediaDeviceInfos: MediaDeviceInfo[] = [];
  deviceId2Label: {[index: string]: string} = {};
  deviceId2Device: {[index: string]: MediaDeviceInfo} = {};


  constructor(private alertsService: AlertsService) { }

  ngAfterViewInit() {
    /*const videoElement = document.querySelector('video');
    const audioSelect = document.querySelector('select#audioSource');
    const videoSelect = document.querySelector('select#videoSource');*/

    navigator.mediaDevices
      .enumerateDevices()
      .then(this.gotDevices.bind(this))
      // .then(this.getStream.bind(this))
      .catch(this.alertsService.add.bind(this.alertsService));

    /*audioSelect.onchange = getStream;
    videoSelect.onchange = getStream;*/

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
    console.info('deviceInfos =', deviceInfos, ';');
    /*
    for (let i = 0; i !== deviceInfos.length; ++i) {
      const deviceInfo = deviceInfos[i];
      const option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === 'audioinput') {
        option.text = deviceInfo.label ||
          'microphone ' + (audioSelect.length + 1);
        audioSelect.appendChild(option);
      } else if (deviceInfo.kind === 'videoinput') {
        option.text = deviceInfo.label || 'camera ' +
          (videoSelect.length + 1);
        videoSelect.appendChild(option);
      } else {
        console.log('Found some other kind of source/device: ', deviceInfo);
      }
    }
    */
  }

  getStream() {
    /*const constraints = {
      audio: {
        optional: [{
          sourceId: this.selectedMic
        }]
      },
      video: {
        optional: [{
          sourceId: this.selectedCam
        }]
      }
    };*/

    const mic: MediaDeviceInfo = this.deviceId2Device[this.selectedMic];
    const cam: MediaDeviceInfo = this.deviceId2Device[this.selectedCam];
    console.info('getStream::mic =', mic, ';');
    console.info('getStream::cam =', cam, ';');
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

    /*if (window.stream) {
      window
        .stream
        .getTracks()
        .forEach(track => {
          track.stop();
        });
    }

    const constraints = {
      audio: {
        optional: [{
          sourceId: audioSelect.value
        }]
      },
      video: {
        optional: [{
          sourceId: videoSelect.value
        }]
      }
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(this.gotStream)
      .catch(this.alertsService.add.bind(this.alertsService));
    */
  }

  gotStream(stream: MediaStream) {
    this.video.srcObject = stream;
    /*window.stream = stream; // make stream available to console
    videoElement.srcObject = stream;*/
  }
}
