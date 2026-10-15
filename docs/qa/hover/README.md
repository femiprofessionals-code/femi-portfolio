# Wall text centred and larger; hover light on the paintings (Femi, 15 Oct)

## Identity
- **Centring:** the identity block is centred on the three paintings: zone `[448, 124, 600, 186]`, centre x 748, which is the paintings' centre. Measured at 1920 and 1366, the name and intro centres equal the paintings' centre to the pixel.
- **Size:** the name goes from 4 → 5.1 cqw, the eyebrow from .74 → .92 cqw, and the intro from 1.2 → 1.5 cqw, balanced over 2 lines. "AI-enabled" never breaks across a line. The block still clears the picture lights.
- **Contrast** (rendered pixels): eyebrow 5.8–11.7, name 7.0–11.5, intro 6.7–7.7.

## Hover / keyboard focus
Hovering or focusing any painting, or the map, changes three things:
- **Picture light:** that painting's picture light warms up. A warm cone from the lamp is added with `screen`, so it brightens the room's own pixels: the painting, its frame and the wall below.
- **Painting:** the painting brightens slightly (`brightness 1.13`).
- **Glass glare:** a soft glare drifts once across the artwork (1.4 s).

Other details:
- The map has the same effect, with a soft ambient light, because it has no lamp.
- **Reduced motion:** no glare, no transitions.
- Hover is detected with `:has()`, so no JavaScript is needed.
- `night-hover-sequence.jpg` shows rest → glare mid-sweep → settled.

Map caption contrast after softening its wash: 4.75–12.4.
