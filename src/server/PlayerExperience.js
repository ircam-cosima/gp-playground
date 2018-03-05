import { Experience } from 'soundworks/server';

// server-side 'player' experience.
class PlayerExperience extends Experience {
  constructor(clientType, store, comm) {
    super(clientType);

    this.store = store;
    this.comm = comm;

    this.checkin = this.require('checkin');
    this.audioBufferManager = this.require('audio-buffer-manager');
  }

  start() {
    this.store.addListener('update-player-file', player => {
      this.send(player.client, 'update-file', player.toJSON());
    });
  }

  enter(client) {
    super.enter(client);

    const player = this.store.createPlayer(client);
    this.send(client, 'setup', player.toJSON());

    this.receive(client, 'file-loaded', uuid => {
      this.store.setFileLoaded(uuid);
    });
  }

  exit(client) {
    super.exit(client);

    this.store.deletePlayer(client);
  }
}

export default PlayerExperience;