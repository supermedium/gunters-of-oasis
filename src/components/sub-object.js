/**
 * Pull a submesh out of a model file.
 */
AFRAME.registerComponent('sub-object', {
  schema: {
    from: {default: '', type: 'selector'},
    name: {default: ''}
  },

  init: function () {
    var el = this.el;
    var data = this.data;

    data.from.addEventListener('model-loaded', evt => {
      var model;
      var subset;
      model = evt.detail.model;
      subset = model.getObjectByName(data.name);
      if (!subset){
        console.error("Sub-object", data.name, "not found in #"+data.from.id);
        return;
      }
      el.setObject3D('mesh', subset.clone());
      el.emit('subobjectloaded', el.getObject3D('mesh'));
    });
  }
});
