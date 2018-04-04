AFRAME.registerComponent('solidsnake', {
  init: function () {
    var el = this.el;
    var data = this.data;
    var item;;
    var snake;;

    item = document.createElement('a-entity');
    item.classList.add('solidsnake');
    item.setAttribute('obj-model', {
      obj: utils.assetPath('assets/models/box/box.obj')
    });
    item.setAttribute('material', {color: 'brown', metalness: 0, roughness: 1, side: 'double'});
    item.setAttribute('shadow', '');
    item.object3D.position.set(
      window.utils.random(205) * 10,
      0,
      window.utils.random(206) * 10
    );
    item.setAttribute('touchable', '');
    item.object3D.lookAt(0, 0, 0);
    item.addEventListener('object3dset', () => {
      item.object3D.mesh = item.getObject3D('mesh');
      item.setAttribute('animation__touched', {
        dur: 750,
        easing: 'easeOutQuad',
        from: 0,
        property: 'object3D.mesh.rotation.x',
        startEvents: 'touched',
        to: -1 * Math.PI / 2.5
      });
      item.setAttribute('animation__touched2', {
        dur: 750,
        easing: 'easeOutQuad',
        from: 0,
        property: 'object3D.mesh.position.z',
        startEvents: 'touched',
        to: -1
      });
      item.setAttribute('animation__touched3', {
        dur: 750,
        easing: 'easeOutQuad',
        from: 0,
        property: 'object3D.mesh.position.y',
        startEvents: 'touched',
        to: 0.5
      });
    });
    el.appendChild(item);

    snake = document.createElement('a-entity');
    snake.setAttribute('obj-model', {
      obj: utils.assetPath('assets/models/snake/Mesh_Cobra.obj'),
      mtl: utils.assetPath('assets/models/snake/Mesh_Cobra.mtl')
    });
    snake.object3D.position.copy(item.object3D.position);
    snake.object3D.position.y += 0.3;
    snake.object3D.scale.set(0.02, 0.02, 0.02)
    snake.object3D.rotation.y += Math.PI;
    el.appendChild(snake);

    item.addEventListener('touched', () => {
      var audio;
      audio = new Audio(utils.assetPath('assets/audio/alert.wav'));
      audio.volume = 0.5;
      audio.play();
    });
  }
});
