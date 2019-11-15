AFRAME.registerComponent('oasis-audio', {
  schema: {
    isHome: {type: 'string'},
    zoneSong: {type: 'string'}
  },

  init: function () {
    var audio;
    var data = this.data;
    var el = this.el;
    var isPlaying;
    var song;

    document.addEventListener('click', () => {
      if (isPlaying) { return; }
      play();
      isPlaying = true;
    });
    play();

    function play () {
      if (data.isHome) {
        song = utils.assetPath('assets/audio/worldinmyeyes.mp3');
      } else if (el.hasAttribute('upsidedown')) {
        song = 'https://supermedium.github.io/oasis-audio/egg/strangerthings.mp3';
      } else {
        song = data.zoneSong;
      }

      if (audio) { audio.pause(); }
      audio = new Audio(song);
      audio.volume = 0.5;
      audio.loop = true;
      audio.play();
    }
  }
});
