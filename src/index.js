function requireAll (req) { req.keys().forEach(req); }

require('./utils');

require('aframe-animation-component');
require('aframe-event-set-component');
require('aframe-layout-component');
require('aframe-look-at-component');
require('aframe-proxy-event-component');
require('aframe-randomizer-components');
require('aframe-slice9-component');
require('aframe-teleport-controls');

requireAll(require.context('./components/', true, /\.js$/));

window.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('a-scene').dataset.isHome === 'true') {
    navigator.serviceWorker.register('serviceWorker.js');
  } else {
    navigator.serviceWorker.register('../serviceWorker.js');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  initSubscribeForm();
});

/**
 * Init XHR handler to subscribe.
 */
function initSubscribeForm () {
  const form = document.querySelector('form');
  if (!form) { return; }

  const button = form.querySelector('.submit');
  const input = form.querySelector('input[type="email"]');
  const newsletterHeader = document.querySelector('#subscribeForm > h2');

  let originalHeaderText = '';
  if (newsletterHeader) {
    originalHeaderText = newsletterHeader.innerHTML;
  }

  form.addEventListener('submit', evt => {
    evt.preventDefault();

    // supermedium/superchimp
    const xhr = new XMLHttpRequest();
    let endpoint = 'http://localhost:5000/mail/subscribe';
    if (process.env.NODE_ENV === 'production') {
      endpoint = 'https://supermedium.com/mail/subscribe';
    }
    xhr.open('POST', endpoint);

    xhr.addEventListener('load', () => {
      if (parseInt(xhr.status, 10) !== 200) {
        window.location.href = 'https://supermedium/subscribe/';
      }
      if (button) {
        button.disabled = true;
        button.innerHTML = 'Subscribed!';
      }
      if (newsletterHeader) {
        newsletterHeader.innerHTML = 'Successfully subscribed, thank you!';
      }
    });

    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify({
      email: document.querySelector('[name="email"]').value,
      source: 'gunters'
    }));

    return false;
  });

  if (button) {
    input.addEventListener('keydown', () => {
      if (button.hasAttribute('disabled')) {
        button.innerHTML = 'Subscribe';
        button.removeAttribute('disabled');
      }
      if (newsletterHeader && originalHeaderText) {
        newsletterHeader.innerHTML = originalHeaderText;
      }
    });
  }
}
