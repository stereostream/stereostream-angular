export class Webrtc {
  private startTime: number;
  private localStream: MediaStream;
  /* so we know it's active [publicly]: */
  pc1: RTCPeerConnection;
  private pc2: RTCPeerConnection;
  private offerOptions: RTCOfferOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  };

  constructor(private localVideo: HTMLVideoElement,
              private remoteVideo: HTMLVideoElement) {
    this.localStream = localVideo.srcObject;
    /*
    const startButton = document.getElementById('startButton');
    const callButton = document.getElementById('callButton');
    const hangupButton = document.getElementById('hangupButton');
    callButton.disabled = true;
    hangupButton.disabled = true;
    startButton.onclick = start;
    callButton.onclick = call;
    hangupButton.onclick = hangup;
    */

    this.localVideo.addEventListener('loadedmetadata', function() {
      console.info('Local video videoWidth: ' + this.videoWidth +
        'px,  videoHeight: ' + this.videoHeight + 'px');
    });

    this.remoteVideo.addEventListener('loadedmetadata', function() {
      console.info('Remote video videoWidth: ' + this.videoWidth +
        'px,  videoHeight: ' + this.videoHeight + 'px');
    });

    this.remoteVideo['onresize'] = () => {
      this.trace('Remote video size changed to ' +
        this.remoteVideo.videoWidth + 'x' + this.remoteVideo.videoHeight);
      // We'll use the first onresize callback as an indication that video has started
      // playing out.
      if (this.startTime) {
        const elapsedTime = window.performance.now() - this.startTime;
        this.trace('Setup time: ' + elapsedTime.toFixed(3) + 'ms');
        this.startTime = null;
      }
    };
  }

  public call() {
    /*callButton.disabled = true;
    hangupButton.disabled = false;*/
    this.trace('Starting call');
    this.startTime = window.performance.now();
    const videoTracks = this.localStream.getVideoTracks();
    const audioTracks = this.localStream.getAudioTracks();
    if (videoTracks.length > 0) {
      this.trace('Using video device: ' + videoTracks[0].label);
    }
    if (audioTracks.length > 0) {
      this.trace('Using audio device: ' + audioTracks[0].label);
    }
    const servers = null;
    this.pc1 = new RTCPeerConnection(servers);
    this.trace('Created local peer connection object pc1');
    this.pc1.onicecandidate = e => this.onIceCandidate(this.pc1, e);
    // Add pc2 to global scope so it's accessible from the browser console
    this.pc2 = new RTCPeerConnection(servers);
    this.trace('Created remote peer connection object pc2');
    this.pc2.onicecandidate = e => this.onIceCandidate(this.pc2, e);
    this.pc1.oniceconnectionstatechange = e => this.onIceStateChange(this.pc1, e);
    this.pc2.oniceconnectionstatechange = e => this.onIceStateChange(this.pc2, e);
    this.pc2.onaddstream = this.gotRemoteStream.bind(this);

    this.pc1.addStream(this.localStream);
    this.trace('Added local stream to pc1');

    this.trace('pc1 createOffer start');
    this.pc1.createOffer(
      this.onCreateOfferSuccess.bind(this),
      this.onCreateSessionDescriptionError.bind(this),
      this.offerOptions
    );
  }

  public hangup() {
    this.trace('Ending call');
    console.info('hangup::this =', this, ';');
    /* tslint:disable:no-unused-expression */
    this.pc1.close();
    this.pc2.close();
    this.pc1 = null;
    this.pc2 = null;
    /*hangupButton.disabled = true;
    callButton.disabled = false;*/
  }

  private getName(pc: RTCPeerConnection): 'pc1' | 'pc2' {
    return pc === this.pc1 ? 'pc1' : 'pc2';
  }

  private getOtherPc(pc: RTCPeerConnection): RTCPeerConnection {
    return pc === this.pc1 ? this.pc2 : this.pc1;
  }

  private onCreateSessionDescriptionError(error: DOMError) {
    this.trace('Failed to create session description: ' + error.toString());
  }

  private onSetLocalSuccess(pc: RTCPeerConnection) {
    this.trace(this.getName(pc) + ' setLocalDescription complete');
  }

  private onSetRemoteSuccess(pc: RTCPeerConnection) {
    this.trace(this.getName(pc) + ' setRemoteDescription complete');
  }

  private onCreateAnswerSuccess(desc: RTCSessionDescription) {
    this.trace('Answer from pc2:\n' + desc.sdp);
    this.trace('pc2 setLocalDescription start');
    this.pc2.setLocalDescription(desc).then(
      () => this.onSetLocalSuccess(this.pc2),
      this.onSetSessionDescriptionError
    );
    this.trace('pc1 setRemoteDescription start');
    this.pc1.setRemoteDescription(desc).then(
      () => this.onSetRemoteSuccess(this.pc1),
      this.onSetSessionDescriptionError
    );
  }

  private onIceCandidate(pc: RTCPeerConnection, event: RTCPeerConnectionIceEvent) {
    if (event.candidate) {
      this.getOtherPc(pc)
        .addIceCandidate(new RTCIceCandidate(event.candidate))
        .then(() => this.onAddIceCandidateSuccess(pc),
          err => this.onAddIceCandidateError(pc, err));
      this.trace(this.getName(pc) + ' ICE candidate: \n' + event.candidate.candidate);
    }
  }

  private onCreateOfferSuccess(desc: RTCSessionDescription) {
    this.trace('Offer from pc1\n' + desc.sdp);
    this.trace('pc1 setLocalDescription start');
    this.pc1.setLocalDescription(desc).then(
      () => this.onSetLocalSuccess(this.pc1),
      this.onSetSessionDescriptionError
    );
    this.trace('pc2 setRemoteDescription start');
    this.pc2.setRemoteDescription(desc).then(
      () => this.onSetRemoteSuccess(this.pc2),
      this.onSetSessionDescriptionError
    );
    this.trace('pc2 createAnswer start');
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    this.pc2.createAnswer().then(
      this.onCreateAnswerSuccess.bind(this),
      this.onCreateSessionDescriptionError.bind(this)
    );
  }

  private onSetSessionDescriptionError(error: DOMError) {
    this.trace('Failed to set session description: ' + error.toString());
  }

  private gotRemoteStream(e: MediaStreamEvent) {
    // Add remoteStream to global scope so it's accessible from the browser console
    this.remoteVideo.srcObject = e.stream;
    this.trace('pc2 received remote stream');
  }

  private onAddIceCandidateSuccess(pc: RTCPeerConnection) {
    this.trace(this.getName(pc) + ' addIceCandidate success');
  }

  private onAddIceCandidateError(pc: RTCPeerConnection, error: DOMError) {
    this.trace(this.getName(pc) + ' failed to add ICE Candidate: ' + error.toString());
  }

  private onIceStateChange(pc: RTCPeerConnection, event: Event) {
    if (pc) {
      this.trace(this.getName(pc) + ' ICE state: ' + pc.iceConnectionState);
      console.log('ICE state change event: ', event);
    }
  }

  private trace(text: string) {
    if (text[text.length - 1] === '\n') {
      text = text.substring(0, text.length - 1);
    }
    if (window.performance) {
      const now = (window.performance.now() / 1000).toFixed(3);
      console.log(now + ': ' + text);
    } else {
      console.log(text);
    }
  }

  /*
  public start = () => {
    this.trace('Requesting local stream');
    // startButton.disabled = true;
    navigator
      .mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then(this.gotStream)
      .catch(e => alert('getUserMedia() error: ' + e.name)
      );
  };
  */
}
