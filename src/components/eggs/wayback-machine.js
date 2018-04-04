/**
 * Power up that lets you see which portals you've visited already.
 */
AFRAME.registerComponent('wayback-machine', {
  init: function () {
    var el;

    if (localStorage.getItem('waybackmachine') === 'true') { return; }

    el = document.createElement('a-entity');

    el.classList.add('waybackMachine');

    el.setAttribute('obj-model', {
      obj: utils.assetPath('assets/models/waybackmachine/model.obj'),
      mtl: utils.assetPath('assets/models/waybackmachine/materials.mtl')
    });

    el.setAttribute('item', {
      message: `You got a Wayback Machine! Zones you've previously visited are now highlighted in purple.`,
      storeAs: 'waybackmachine'
    });

    el.object3D.position.set(
      window.utils.random(200) * 10,
      1.6,
      window.utils.random(201) * 10
    );

    this.el.appendChild(el);
  }
});
