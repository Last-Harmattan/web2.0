import Peer, { DataConnection } from 'peerjs';

/**
 * @class PeerJSService - handling and encapsulating basic PeerJS logic
 * @member peer - current Peer used for the connection to other Peers
 * @member connection - connection Object of the currently connected Peer
 * @member onConnected - callback function, called when connectionstatus changed
 * @member onMessageReceived - callback fnction, called when a message from another peer is received
 * @member onPeerOpened - callback function, called when the peer is opened and the id is available
 */
export class PeerJSService {
  peer: Peer | null = null;

  /**
   * creates a new Peer and sets the callback functions
   */
  public openNewPeer(
    onPeerOpened: (id: string) => void,
    onDisconnected: () => void,
    onConnected: (connection: DataConnection) => void
  ) {
    this.destroyPeer();
    this.peer = new Peer(undefined, { debug: 2 });
    this.peer.on('open', onPeerOpened);
    this.peer.on('disconnected', onDisconnected);
    this.peer.on('close', onDisconnected);
    this.peer.on('connection', onConnected);
  }

  /**
   * establishes connection to another Peer
   * @param id - PeerJS-ID of another Peer
   */
  public connectToForeignPeer(id: string): DataConnection | null {
    if (this.peer == null) {
      console.log('You have to open a Peer first!');
      return null;
    }

    return this.peer.connect(id);
  }

  /**
   * destoyes peer and removes the reference
   */
  public destroyPeer() {
    this.peer?.destroy();
    this.peer = null;
  }
}
