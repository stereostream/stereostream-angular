import { WebrtcModule } from './webrtc.module';

describe('WebrtcModule', () => {
  let webrtcModule: WebrtcModule;

  beforeEach(() => {
    webrtcModule = new WebrtcModule();
  });

  it('should create an instance', () => {
    expect(webrtcModule).toBeTruthy();
  });
});
