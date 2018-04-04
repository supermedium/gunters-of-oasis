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

## Gunters of OASIS - Global VR Hunt for the Egg

> Hundreds of generated worlds, among one lies a golden egg. The first to find it inherits half a hundred dollars, and the OASIS.

Itching for the OASIS? In a week, we've built an OASIS. As in Ready Player One,
we've hidden a golden egg among hundreds of generated worlds. The first Gunters
(egg hunters) that find the egg will literally inherit half a hundred dollars,
and the OASIS. These gunters will have their names cemented on the leaderboard,
and get access to the source code for which we will implement a few of their
desired feature requests, defining the future of the OASIS.

But it won't be easy. The OASIS is a large expanse. You'll need to hunt hard
and hunt smart. Perhaps even form a clan. You won't be the only ones hunting
out there. The OASIS is multiplayer, you might run into fellow gunters out
there in the wild.

You won't be able to do it empty-handed either. We've hidden tools and
power-ups that will guide you on the quest to the egg. On your journey, we've
scattered a bunch of easter eggs (of the figurative sense) throughout the
worlds, but we won't spoil what they are. You'll just have to stumble upon them
yourselves.

Ready to hunt? We've linked to the OASIS hunt on Supermedium, the browser for
the VR Internet. Download Supermedium on Steam or from our homepage, gear up in
a headset, and start looking!

### An OASIS on the Web

Supermedium is a virtual reality browser to access fully VR content published
on the Web. While it's extremely early, we've placed our bet a large portion of
the OASIS in the future will be based on the Web. It's open, it's distributed,
it's connected, anyone can create worlds that are instantly accessible. We're
today exploring what a fully VR Internet would look like in the future with a
usable VR browser application.

In the OASIS canon, there are 27 sectors consisting of multitudes of zones.
Today on the Web, there are a couple dozen websites that make up the majority
of Web content and access (YouTube, Reddit, Facebook, Wikipedia). In the
future, there will be the VR equivalent of those properties. Each with
consistent UX within that sector. The sectors of the VR Internet will be
countries, separated partitions with their own rules and customs, but together
making up a larger world.

Already, there are VR sites accessible via links in VR from Supermedium, not
published or controlled by us, that we access via URL and load in seconds. This
toy OASIS we've built is just another portal, but opens up into hundreds of
interconnecting worlds. As you go from portal to portal, you are literally
jumping to webpage to webpage.

### Building a Toy OASIS

We built this in about a week using A-Frame, a web framework for building VR
apps, which we created. We've made VR development as easy as web development,
this coming from a web developer. We wrote procedurally generated worlds with
multitudes of parameters, and pregenerated them in Node.

The most fun part was dropping in tons of cute little easter eggs scattered
throughout the worlds. We won't spoil what they are, but hopefully they'll give
you a nice surprise or chuckle as you stumble upon them. It's also extremely
fun to code randomly and spawn hundreds of worlds. We have a seeded random
function that is fun to abuse.

The lucky few to find the egg will be included in part of next iterations of
the OASIS, and once the High Five have been established, we'll fully open
source the project.
