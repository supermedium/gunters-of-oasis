AFRAME.registerComponent('teleport-refresh', {
  play: function () {
    var i;
    var teleportEntities;
    setTimeout(() => {
      teleportEntities = document.querySelectorAll('a-entity[teleport-controls]');
      for (i = 0; i < teleportEntities.length; i++) {
        teleportEntities[i].components['teleport-controls'].refreshMeshes();
      }
    }, 250);
  }
});
