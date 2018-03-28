/**
 * Portal. Modified from link component.
 */
AFRAME.registerComponent('oasis-portal', {
  schema: {
    backgroundColor: {default: 'red', type: 'color'},
    borderColor: {default: 'white', type: 'color'},
    highlighted: {default: false},
    highlightedColor: {default: '#24CAFF', type: 'color'},
    href: {default: ''},
    image: {type: 'asset'},
    on: {default: 'click'},
    title: {default: ''},
    titleColor: {default: 'white', type: 'color'},
    visualAspectEnabled: {default: true}
  },

  init: function () {
    this.navigate = this.navigate.bind(this);
    this.initVisualAspect();
  },

  update: function (oldData) {
    var data = this.data;
    var el = this.el;
    var backgroundColor;
    var strokeColor;

    backgroundColor = data.highlighted ? data.highlightedColor : data.backgroundColor;
    strokeColor = data.highlighted ? data.highlightedColor : data.borderColor;
    el.setAttribute('material', 'backgroundColor', backgroundColor);
    el.setAttribute('material', 'strokeColor', strokeColor);

    if (!data.image || oldData.image === data.image) { return; }

    el.setAttribute('material', 'pano',
                    typeof data.image === 'string' ? data.image : data.image.src);
  },

  play: function () {
    this.el.addEventListener(this.data.on, this.navigate);
  },

  initVisualAspect: function () {
    var el = this.el;
    var textEl;

    if (!this.data.visualAspectEnabled) { return; }

    textEl = this.textEl = this.textEl || document.createElement('a-entity');

    // Set portal.
    el.setAttribute('geometry', {primitive: 'circle', radius: 1.0, segments: 36});
    el.setAttribute('material', {shader: 'oasisPortal', pano: this.data.image, side: 'double'});
  },

  navigate: function () {
    window.location = this.data.href;
  }
});

/* eslint-disable */
AFRAME.registerShader('oasisPortal', {
  schema: {
    borderEnabled: {default: 1.0, type: 'int', is: 'uniform'},
    backgroundColor: {default: 'red', type: 'color', is: 'uniform'},
    pano: {type: 'map', is: 'uniform'},
    strokeColor: {default: 'white', type: 'color', is: 'uniform'}
  },

  vertexShader: require('./shaders/oasisPortalVertex.glsl'),

  fragmentShader: require('./shaders/oasisPortalFragment.glsl')
});
/* eslint-enable */
