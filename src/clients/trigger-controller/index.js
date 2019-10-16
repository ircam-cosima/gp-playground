import '@babel/polyfill';
import '@wessberg/pointer-events';
import { Client } from '@soundworks/core/client';
import TriggerControllerExperience from './TriggerControllerExperience';

const config = window.soundworksConfig;
// initalize all clients at once for emulated clients
const platformServices = new Set();

async function init($container, index) {
  try {
    const client = new Client();

    // -------------------------------------------------------------------
    // register services
    // -------------------------------------------------------------------

    // client.register('file-system', serviceFileSystemFactory, {}, []);
    // client.register('audio-buffer-loader', serviceAudioBufferLoaderFactory, {}, []);

    // -------------------------------------------------------------------
    // launch application
    // -------------------------------------------------------------------

    await client.init(config);

    const experience = new TriggerControllerExperience(client, config, $container);
    // store platform service to be able to call all `onUserGesture` at once
    if (experience.platform) {
      platformServices.add(experience.platform);
    }
    // remove loader and init default views for the services
    document.body.classList.remove('loading');

    await client.start();
    experience.start();

    // minimalistic, non subtle QoS
    client.socket.addListener('close', () => {
      setTimeout(() => window.location.reload(true), 2000);
    });

    if (config.env.type === 'production') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          window.location.reload(true);
        }
      }, false);
    }
  } catch(err) {
    console.error(err);
  }
}

window.addEventListener('load', async () => {
  // -------------------------------------------------------------------
  // bootstrapping
  // -------------------------------------------------------------------
  const $container = document.querySelector('#container');
  // this allows to emulate multiple clients in the same page
  // to facilitate development and testing
  // ...be careful in production...
  const numClients = config.env.type === 'production' ? 1 : 1;

  if (numClients > 1) {
    for (let i = 0; i < numClients; i++) {
      const $div = document.createElement('div');
      $div.classList.add('emulate');
      $container.appendChild($div);

      init($div, i);
    }

    if (platformServices.size > 0) {
      const $initPlatform = document.createElement('div');
      $initPlatform.classList.add('init-platform');
      $initPlatform.textContent = 'resume all';

      function initPlatforms(e) {
        platformServices.forEach(service => service.onUserGesture(e));
        $initPlatform.remove();
      }

      $initPlatform.addEventListener('touchend', initPlatforms);
      $initPlatform.addEventListener('mouseup', initPlatforms);

      document.body.appendChild($initPlatform);
    }
  } else {
    init($container, 0);
  }
});
