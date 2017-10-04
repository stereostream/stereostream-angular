/*
*  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

import { HTMLVideoElement, IOfferOptions, RTCPeerConnection } from '../../polyfills.d';

export class WebRtcStreamer {
  stream: /*CaptureStream*/ any;

  pc1: RTCPeerConnection;
  pc2: RTCPeerConnection;
  offerOptions: IOfferOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  };

  startTime: number;

  constructor(private leftVideo: HTMLVideoElement,
              private rightVideo: HTMLVideoElement) {
    // Video tag capture must be set up after video tracks are enumerated.
    this.leftVideo.oncanplay = this.maybeCreateStream;
    if (this.leftVideo.readyState >= 3) {  // HAVE_FUTURE_DATA
      // Video is already ready to play, this.call this.maybeCreateStream in case oncanplay
      // fired before we registered the event handler.
      this.maybeCreateStream();
    }

    this.leftVideo.play();

    this.rightVideo.onloadedmetadata = () => {
      console.info('Remote video videoWidth: ' + this.rightVideo.videoWidth +
        'px,  videoHeight: ' + this.rightVideo.videoHeight + 'px');
    };

    this.rightVideo.onresize = () => {
      console.info('Remote video size changed to ' +
        this.rightVideo.videoWidth + 'x' + this.rightVideo.videoHeight);
      // We'll use the first onresize this.callback as an indication that
      // video has started playing out.
      if (this.startTime) {
        const elapsedTime = window.performance.now() - this.startTime;
        console.info('Setup time: ' + elapsedTime.toFixed(3) + 'ms');
        this.startTime = null;
      }
    };
  }

  maybeCreateStream() {
    if (this.stream) {
      return;
    }
    if (this.leftVideo.captureStream) {
      this.stream = this.leftVideo.captureStream();
      console.log('Captured this.stream from this.leftVideo with captureStream',
        this.stream);
      this.call();
    } else if (this.leftVideo.mozCaptureStream) {
      this.stream = this.leftVideo.mozCaptureStream();
      console.log('Captured this.stream from this.leftVideo with mozCaptureStream()',
        this.stream);
      this.call();
    } else {
      console.info('captureStream() not supported');
    }
  }

  call() {
    console.info('Starting this.call');
    this.startTime = window.performance.now();
    const videoTracks = this.stream.getVideoTracks();
    const audioTracks = this.stream.getAudioTracks();
    if (videoTracks.length > 0) {
      console.info('Using video device: ' + videoTracks[0].label);
    }
    if (audioTracks.length > 0) {
      console.info('Using audio device: ' + audioTracks[0].label);
    }
    const servers = null;
    this.pc1 = new RTCPeerConnection(servers) as any;
    console.info('Created local peer connection object this.pc1');
    this.pc1.onicecandidate = e => this.onIceCandidate(this.pc1, e);
    this.pc2 = new RTCPeerConnection(servers) as any;
    console.info('Created remote peer connection object this.pc2');
    this.pc2.onicecandidate = e => this.onIceCandidate(this.pc2, e);
    this.pc1.oniceconnectionstatechange = e => this.onIceStateChange(this.pc1, e);
    this.pc2.oniceconnectionstatechange = e => this.onIceStateChange(this.pc2, e);
    this.pc2.ontrack = this.gotRemoteStream;

    this.stream.getTracks().forEach(track =>
      this.pc1.addTrack(track, this.stream)
    );
    console.info('Added local this.stream to this.pc1');

    console.info('this.pc1 createOffer start');
    this.pc1.createOffer(
      this.onCreateOfferSuccess,
      this.onCreateSessionDescriptionError,
      this.offerOptions
    );
  }

  onCreateSessionDescriptionError(error) {
    console.info('Failed to create session description: ' + error.toString());
  }

  onCreateOfferSuccess(desc) {
    console.info('Offer from this.pc1\n' + desc.sdp);
    console.info('this.pc1 setLocalDescription start');
    this.pc1.setLocalDescription(
      desc,
      () => this.onSetLocalSuccess(this.pc1),
      this.onSetSessionDescriptionError
    );
    console.info('this.pc2 setRemoteDescription start');
    this.pc2.setRemoteDescription(
      desc,
      () => this.onSetRemoteSuccess(this.pc2),
      this.onSetSessionDescriptionError);
    console.info('this.pc2 createAnswer start');
    // Since the 'remote' side has no media this.stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    this.pc2.createAnswer(
      this.onCreateAnswerSuccess,
      this.onCreateSessionDescriptionError
    );
  }

  onSetLocalSuccess(pc) {
    console.info(this.getName(pc) + ' setLocalDescription complete');
  }

  onSetRemoteSuccess(pc) {
    console.info(this.getName(pc) + ' setRemoteDescription complete');
  }

  onSetSessionDescriptionError(error) {
    console.info('Failed to set session description: ' + error.toString());
  }

  gotRemoteStream(event) {
    if (this.rightVideo.srcObject !== event.this.streams[0]) {
      this.rightVideo.srcObject = event.this.streams[0];
      console.log('this.pc2 received remote this.stream', event);
    }
  }

  onCreateAnswerSuccess(desc) {
    console.info('Answer from this.pc2:\n' + desc.sdp);
    console.info('this.pc2 setLocalDescription start');
    this.pc2.setLocalDescription(
      desc,
      () => this.onSetLocalSuccess(this.pc2),
      this.onSetSessionDescriptionError
    );
    console.info('this.pc1 setRemoteDescription start');
    this.pc1.setRemoteDescription(
      desc,
      () => this.onSetRemoteSuccess(this.pc1),
      this.onSetSessionDescriptionError
    );
  }

  onIceCandidate(pc, event) {
    this.getOtherPc(pc).addIceCandidate(event.candidate)
      .then(
        () => this.onAddIceCandidateSuccess(pc),
        err => this.onAddIceCandidateError(pc, err)
      );
    console.info(this.getName(pc) + ' ICE candidate: \n' + (event.candidate ?
      event.candidate.candidate : '(null)'));
  }

  onAddIceCandidateSuccess(pc) {
    console.info(this.getName(pc) + ' addIceCandidate success');
  }

  onAddIceCandidateError(pc, error) {
    console.info(this.getName(pc) + ' failed to add ICE Candidate: ' + error.toString());
  }

  onIceStateChange(pc, event) {
    if (pc) {
      console.info(this.getName(pc) + ' ICE state: ' + pc.iceConnectionState);
      console.log('ICE state change event: ', event);
    }
  }

  getName(pc) {
    return (pc === this.pc1) ? 'this.pc1' : 'this.pc2';
  }

  getOtherPc(pc) {
    return (pc === this.pc1) ? this.pc2 : this.pc1;
  }
}
