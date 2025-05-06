import type {
  RtpParameters,
  MediaKind,
  DtlsParameters,
  RtpCapabilities,
} from 'mediasoup/node/lib/types';

export type Message =
  | { type: 'join'; userInfo: { id: string; name: string; role: string } }
  | { type: 'getRouterRtpCapabilities'; userId: string }
  | { type: 'createTransport'; userId: string }
  | { type: 'connectTransport'; userId: string; dtlsParameters: DtlsParameters }
  | {
      type: 'produce';
      userId: string;
      kind: MediaKind;
      rtpParameters: RtpParameters;
    }
  | {
      type: 'connectRecvTransport';
      userId: string;
      dtlsParameters: DtlsParameters;
    }
  | { type: 'createRecvTransport'; userId: string }
  | { type: 'consume'; userId: string; rtpCapabilities: RtpCapabilities };
