import type {
  RtpParameters,
  MediaKind,
  DtlsParameters,
  RtpCapabilities,
} from 'mediasoup/node/lib/types';

export type Message =
  | { type: 'join'; userInfo: { id: string; name: string; role: string } }
  | { type: 'getRouterRtpCapabilities' }
  | { type: 'createTransport' }
  | { type: 'connectTransport'; dtlsParameters: DtlsParameters }
  | {
      type: 'produce';
      userId: string;
      kind: MediaKind;
      rtpParameters: RtpParameters;
    }
  | { type: 'createRecvTransport' }
  | { type: 'connectRecvTransport'; dtlsParameters: DtlsParameters }
  | { type: 'consume'; userId: string; rtpCapabilities: RtpCapabilities };
