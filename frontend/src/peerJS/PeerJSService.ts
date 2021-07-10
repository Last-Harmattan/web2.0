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
  connection: DataConnection | null = null; // für den Prototypen gibt es nur eine Connection allerdings wären mehrere nicht nur möglich sondern auch empfehlenswert

  onConnected: (connected: boolean) => void;
  onMessageReceived: (data: string) => void;
  onPeerOpened: (id: string) => void;

  constructor(
    onConnected: (connected: boolean) => void,
    onMessageReceived: (data: string) => void,
    onPeerOpened: (id: string) => void
  ) {
    this.onConnected = onConnected;
    this.onMessageReceived = onMessageReceived;
    this.onPeerOpened = onPeerOpened;
  }

  /**
   * opens a new peer when there is no one currently open
   */
  public openPeer() {
    if (this.peer == null) {
      this.openNewPeer();
    }
  }

  /**
   * establishes connection to another Peer
   * @param id - PeerJS-ID of another Peer
   */
  public connectToPeer(id: string) {
    if (this.peer == null) {
      this.openNewPeer();
    } else {
      this.closeConnection();
    }

    this.peer?.on('connection', this.onPeerConnected);
    this.peer?.connect(id);
  }

  /**
   * sends a message to the currently connected peer
   * @param message - sting message to be sent to connected peer
   */
  public sendMessage(message: string) {
    this.connection?.send(message);
  }

  public isConnected(): boolean {
    return this.connection != null;
  }

  /**
   * creates a new Peer and sets the callback functions
   */
  private openNewPeer() {
    this.clearAll();
    this.peer = new Peer(undefined, { debug: 2 });
    this.peer.on('open', this.onPeerOpened!!);
    this.peer.on('disconnected', this.onPeerDisconnected);
  }

  /**
   * handles a newly established connections to other peers
   * @param connection - Connection to newly connected peer
   */
  private onPeerConnected(connection: DataConnection) {
    console.log('Peer Connected: ', connection.peer);

    this.connection = connection;
    this.connection.on('data', this.onDataReceived);

    this.onConnected?.(true);
  }

  /**
   * handles incoming mesages from the connected Peer
   * @param data - string data sent by the connected Peer
   */
  private onDataReceived(data: string) {
    console.log('Data received: ', data);

    this.onMessageReceived?.(data);
  }

  /**
   * handles disconnecting Peers
   */
  private onPeerDisconnected() {
    // eine Reconnection wäre schöner aber für den Prototypen genügt dies
    this.clearAll();
    this.onConnected?.(false);
  }

  /**
   * clears all Properties of this class regarding PeerJS
   */
  private clearAll() {
    this.destroyPeer();
    this.closeConnection();
  }

  /**
   * closes the connection and removes the reference
   */
  private closeConnection() {
    this.connection?.close();
    this.connection = null;
  }

  /**
   * destoyes peer and removes the reference
   */
  private destroyPeer() {
    this.peer?.destroy();
    this.peer = null;
  }
}
