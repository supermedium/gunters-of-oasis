# gunters-of-oasis

Gunters (Egg Hunters) of OASIS (Open and Super Immersive Simulation).

A hunt for a golden egg hidden among hundreds of procedurally generated worlds.
Whoever finds the egg gets partial control over the OASIS and a cash prize,
following the plot of Ready Player One.

Contains video game related easter eggs throughout the world, and hints to help
guide towards the egg.

## Development

Run server.

```
npm install
npm run start
```

Generate OASIS. Template of sectors at `src/index.html` and generator at
`generator/index.js`.

```
npm run regenerate
```

### Adding a Easter Egg or Zone Property

In `generator/index.js`, add to `ZONE_PROPERTIES` the name of the egg or
property, and the percent chance a zone would have that.

In `src/index.html`, add an if statement with respective name of property `{%
if myZoneProperty %} ... {% endif %}`.

For example, if we want one out of thirty zones to have Mario:

```js
ZONE_PROPERTIES = {
  // ...
  mario: 1 / 30
};
```

```html
{% if mario %}
  <a-entity id="mario" gltf-model="mario.gltf" position="0 0 -10"></a-entity>
{% endif %}
```
