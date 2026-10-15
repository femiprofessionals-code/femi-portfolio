# Brief: Femi seated in the room (for an image-to-video generator)

I can't generate photorealistic people or video in this environment. Femi generates the clip, and I lock it to the room, keep only the area around the person, loop it seamlessly and put it live per light, exactly as with the skies.

## Inputs
- **Start frame:** `start-{morning|golden|night}-16x9.png` (1920×1080), or the 3:2 versions. These are the room exactly as on the site now, so the clip lines up with it.
- **Identity reference:** `reference-portrait.webp` (the portrait from the About page), or any photo Femi prefers.

## Where to sit
**Recommended: the right end of the sofa**, angled slightly toward the room.
- The paintings, name, captions and the flip interaction all stay clear.
- The bench is directly under the paintings: a seated person's head would cover the company captions.

## Prompt (adapt per light)
> Photorealistic. The same apartment exactly as in the image; nothing in the room changes. A Black man in his early thirties, Femi Falade (see reference), sits relaxed on the right end of the cream sofa, wearing a tailored navy suit with an open-collared white shirt. He sits naturally with one arm resting on the sofa arm and occasionally glances toward the city window. His movement is subtle and calm: slow breathing, a small head turn, a hand settling. **Locked-off tripod camera: no camera movement, no zoom, no pan.** Lighting and shadows match the room (morning daylight / golden hour sun / night lamps). Clouds outside drift slowly in one direction.

Adjust the description of Femi (age, clothing, hair) to match the reference photo.

Negative prompt: camera movement, zoom, dolly, parallax, flicker, morphing objects, extra people, changes to the paintings, the wall or the furniture, text, logos.

## Settings
- **Resolution and length:** 1080p or higher, 8–10 s, 24 fps.
- **Loop:** the same pose at the start and the end if the tool offers it. This makes a seamless loop much easier.
- **Lights:** one clip per light (morning, golden, night). Start with the light you like most.

## What happens next
1. **Lock** every frame to the wall plane: `lock-clip.py`. The wall residual should be ≤ 1 px.
2. **Composite** only the region around the person (and their shadow on the sofa) over the sharp still, feathered. The rest of the room stays the still, so nothing slides.
3. **Exposure:** match it to the still frame by frame, as `sky4.py` does.
4. **Loop:** a crossfade at a calm moment.
5. **Ship** per light, plus a static frame from the clip for reduced motion and Save-Data.

## Note
The person in the clip will be a generated likeness of Femi. It's Femi's call whether the site says so anywhere (for example in the About page's credits). The pack's rule against mislabelling media still applies.
