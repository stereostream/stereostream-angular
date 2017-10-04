export interface HTMLVideoElement {
  onresize: () => void;
  oncanplay: () => void;
  readyState: number;
  play: () => void;
  onloadedmetadata: () => void;
  videoHeight: number;
  videoWidth: number;
  captureStream?: () => void;
  mozCaptureStream?: () => void;
  srcObject: /*stream*/ any;
}

export interface RTCPeerConnection {
  ontrack: (event: any) => void;
  addTrack: (event: any, stream: any) => void;
  onicecandidate: (event: any) => void;
  oniceconnectionstatechange: (event: any) => void;
  createOffer: (onCreateOfferSuccess: (desc) => void,
                onCreateSessionDescriptionError: (error) => void,
                offerOptions: IOfferOptions) => void;
  setLocalDescription: (desc,
                        onSetSessionDescriptionError: (error) => void,
                        lazyOnSetLocalSuccess: (error) => void | (() => (pc) => () => void)) => void;
  setRemoteDescription: (desc,
                        onSetSessionDescriptionError: (error) => void,
                        lazyOnSetRemoteSuccess: (error) => void | (() => (pc) => () => void)) => void;
  createAnswer: (onCreateAnswerSuccess: (desc) => void,
                 onCreateSessionDescriptionError: (error) => void) => void;
  addIceCandidate: (candidate: RTCIceCandidate['candidate']) => Promise<any>;
}

export interface IOfferOptions {
  offerToReceiveAudio: number;
  offerToReceiveVideo: number;
}
