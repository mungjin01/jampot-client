import type { WebSocket as WsSocket } from 'ws';

type Peer = { ws: WsSocket; name: string; role: string };

export class PeerManager {
  private peers = new Map<string, Peer>();

  add(id: string, peer: Peer) {
    this.peers.set(id, peer);
  }

  remove(id: string) {
    this.peers.delete(id);
  }

  getAllSummaries() {
    return [...this.peers.entries()].map(([id, p]) => ({
      id,
      name: p.name,
      role: p.role,
    }));
  }

  broadcast(type: string, data: any) {
    for (const [, peer] of this.peers) {
      peer.ws.send(JSON.stringify({ type, data }));
    }
  }

  get entries() {
    return this.peers.entries();
  }
}
