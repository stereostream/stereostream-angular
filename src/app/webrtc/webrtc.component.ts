import { AfterViewInit, Component, Input } from '@angular/core';

import { AlertsService } from '../alerts/alerts.service';

@Component({
  selector: 'app-webrtc',
  templateUrl: './webrtc.component.html',
  styleUrls: ['./webrtc.component.css']
})
export class WebrtcComponent implements AfterViewInit {
  @Input() audioSource;
  @Input() videoSource;
  selectedValue: any;
  @Input() mediaDeviceInfos: MediaDeviceInfo[] = [];


  constructor(private alertsService: AlertsService) { }

  ngAfterViewInit() {
    /*const videoElement = document.querySelector('video');
    const audioSelect = document.querySelector('select#audioSource');
    const videoSelect = document.querySelector('select#videoSource');*/

    navigator.mediaDevices
      .enumerateDevices()
      .then(this.gotDevices.bind(this))
      .then(this.getStream.bind(this))
      .catch(this.alertsService.add.bind(this.alertsService));

    /*audioSelect.onchange = getStream;
    videoSelect.onchange = getStream;*/

  }

  gotDevices(deviceInfos) {
    this.mediaDeviceInfos = deviceInfos;
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

  gotStream(stream) {
    /*window.stream = stream; // make stream available to console
    videoElement.srcObject = stream;*/
  }
}
