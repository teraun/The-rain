import { SceneData } from '../types/film';

export const FILM_SCENES: SceneData[] = [
  {
    id: 1,
    title: "Scene 1: The Dry Road",
    subtitle: "The Villager's Stride",
    startTime: 0,
    duration: 4,
    cameraShot: "Medium wide shot, locked camera",
    paletteDescription: "Muted tan, sage, cream",
    audioDescription: "Distant wind and footsteps on dry dirt",
    visualSummary: "Villager walks left to right along a dusty tropical village dirt street flanked by mud huts under afternoon sun.",
    fullPrompt: "A 4-second hand-inked 2D animated clip in 16:9 aspect ratio. The stick figure villager with a large round white head, small oval black eyes, loose ink hair strokes, a brick-red long-sleeved shirt, navy blue trousers rolled up at the ankles, brown sandals, and a wide-brimmed straw hat walks slowly from left to right along a dusty dirt street in a rural tropical village under a warm, dry afternoon sun. Simple mud-brick huts with tin roofs line the road. Medium wide shot. Hand-inked 2D illustrated animation with thick, slightly rough black ink outlines of varying weight. Backgrounds in a desaturated, muted earthy palette of tan, sage, and cream. Fine horizontal scanline and paper-grain texture overlay across the frame with a soft dark vignette at the edges. Audio is diegetic ambient sound only — no voice, no music, only distant wind and footsteps on dry dirt. Locked camera shot. No character changes, no text, no watermark.",
    condensedPrompt: "4s 16:9 2D hand-inked animation. Stick figure villager (straw hat, brick-red shirt, navy rolled trousers, sandals) walks left to right along dusty tropical village road past mud-brick huts under warm sun. Earthy tan/sage palette, rough ink outlines, scanline/grain texture, vignette. Locked medium-wide shot. Diegetic footsteps on dry dirt and distant breeze. No text.",
    characterPose: {
      view: 'side',
      expression: 'neutral',
      pose: 'walking'
    }
  },
  {
    id: 2,
    title: "Scene 2: Gathering Storm",
    subtitle: "Looking to the Sky",
    startTime: 4,
    duration: 4,
    cameraShot: "Medium low-angle view, locked camera",
    paletteDescription: "Dusty gray, sage, dark slate",
    audioDescription: "Distant rolling thunder and gusting wind",
    visualSummary: "Villager pauses in village center, looking upward with concern at heavy dark storm clouds swelling over green hills.",
    fullPrompt: "A 4-second hand-inked 2D animated clip in 16:9 aspect ratio. The stick figure villager in brick-red shirt, navy trousers, straw hat, and sandals stands in the village center, looking upward at dark storm clouds rolling heavily over the distant hills. Shot is a medium low-angle view highlighting the darkening sky. Hand-inked 2D illustrated animation with thick slightly rough black ink outlines. Background shows low green hills and humble village rooftops under looming storm clouds. Desaturated muted earthy palette of dusty gray, sage, and dark slate. Fine horizontal scanline and paper-grain texture overlay with a soft dark vignette at the edges. Audio is diegetic ambient sound only — distant rolling thunder and gusting wind. Camera stays locked. No character warping, no text, no watermark.",
    condensedPrompt: "4s 16:9 2D hand-inked animation. Stick figure villager stands in village center looking up at ominous storm clouds rolling over green hills. Slate gray and sage palette, rough ink outlines, scanline/paper grain, vignette. Locked medium low-angle shot. Ambient rolling thunder and gusting wind.",
    characterPose: {
      view: 'three-quarter',
      expression: 'concerned',
      pose: 'looking-up'
    }
  },
  {
    id: 3,
    title: "Scene 3: Barricading the Door",
    subtitle: "Torrential Downpour",
    startTime: 8,
    duration: 4,
    cameraShot: "Medium shot from outside looking at doorway, locked camera",
    paletteDescription: "Gray rain, dark wood, wet earth",
    audioDescription: "Loud steady rainfall and a heavy wooden door latching shut",
    visualSummary: "Heavy rain pounds the muddy yard as the villager quickly pulls the rustic wooden doorway shut from within.",
    fullPrompt: "A 4-second hand-inked 2D animated clip in 16:9 aspect ratio. Heavy rain pours outside down onto a dirt yard. The camera is framed looking from outside toward a rustic wooden doorway, where the stick figure villager in brick-red shirt and straw hat hastily pulls a dark wooden door closed from within. Medium shot. Hand-inked 2D illustrated animation with thick rough black ink outlines. Flat muted background palette of gray rain, dark wood, and wet earth. Fine horizontal scanline and paper-grain texture overlay with a soft dark vignette at the edges. Audio is diegetic ambient sound only — loud, steady rainfall and a heavy wooden door latching shut. Camera stays locked. No text, no watermark.",
    condensedPrompt: "4s 16:9 2D hand-inked animation. Heavy torrential rain pours onto dirt yard as stick figure villager quickly shuts rustic wooden hut door from inside. Dark wood and wet earth palette, rough ink outlines, paper grain, vignette. Locked medium shot. Ambient pounding rain and heavy door latch shut.",
    characterPose: {
      view: 'front',
      expression: 'concerned',
      pose: 'standing'
    }
  },
  {
    id: 4,
    title: "Scene 4: Through the Slats",
    subtitle: "Watching the Deluge",
    startTime: 12,
    duration: 4,
    cameraShot: "Close-up profile shot, locked camera",
    paletteDescription: "Warm brown earth walls, cool gray rainy light",
    audioDescription: "Muffled torrential rain drumming against wood and earth",
    visualSummary: "Inside the dim mud hut, villager peers curiously through narrow shutter slats while rain streaks down exterior window.",
    fullPrompt: "A 4-second hand-inked 2D animated clip in 16:9 aspect ratio. Interior view inside a dimly lit rustic mud hut. The stick figure villager in brick-red shirt and straw hat stands at a small wooden shuttered window, peering out through a narrow gap between the wooden slats while rain streaks down the exterior pane. Close-up profile shot. Hand-inked 2D illustrated animation with thick black ink outlines. Muted indoor palette of warm brown earth walls and cool gray rainy light filtering through the shutters. Fine horizontal scanline overlay with soft vignette. Audio is diegetic ambient sound only — muffled torrential rain drumming against wood and earth. Locked camera. No text, no watermark.",
    condensedPrompt: "4s 16:9 2D hand-inked animation. Dim mud hut interior. Stick figure villager in profile peers out through wooden window shutter slats as rain streaks the pane. Earth brown and cool rain light, rough ink outlines, scanlines, vignette. Locked close-up profile. Muffled ambient rain drumming on walls.",
    characterPose: {
      view: 'side',
      expression: 'concerned',
      pose: 'standing'
    }
  },
  {
    id: 5,
    title: "Scene 5: Golden Clearance",
    subtitle: "Stepping into Sunlight",
    startTime: 16,
    duration: 4,
    cameraShot: "Medium wide shot, locked camera",
    paletteDescription: "Soft yellow sunlight, muddy ground, parting slate clouds",
    audioDescription: "Dripping water from eaves and birds beginning to chirp",
    visualSummary: "Rain subsides and golden sun breaks through parting clouds. Villager opens door and steps onto soaked mud.",
    fullPrompt: "A 4-second hand-inked 2D animated clip in 16:9 aspect ratio. Exterior shot of rain ending. Golden sunlight cuts through parting dark clouds over the wet village street. The stick figure villager in brick-red shirt, navy trousers, straw hat, and sandals opens the dark wooden front door of the hut and steps out onto the soaked earth. Medium wide shot. Hand-inked 2D illustrated animation with thick rough black ink outlines. Muted earthy palette with soft yellow sunlight breaking over muddy ground. Fine scanline and paper-grain texture overlay with soft vignette. Audio is diegetic ambient sound only — dripping water from eaves and birds beginning to chirp. Locked camera. No text, no watermark.",
    condensedPrompt: "4s 16:9 2D hand-inked animation. Rain ends as golden sunbeams pierce parting clouds. Stick figure villager opens wooden door and steps onto wet soil. Warm sunlight and muted wet earth palette, rough ink outlines, scanlines, vignette. Locked medium-wide shot. Ambient dripping eaves and initial bird chirps.",
    characterPose: {
      view: 'three-quarter',
      expression: 'neutral',
      pose: 'walking'
    }
  },
  {
    id: 6,
    title: "Scene 6: The Unbelievable Sight",
    subtitle: "Fishes in the Puddles",
    startTime: 20,
    duration: 4,
    cameraShot: "High-angle medium shot looking down at ground, locked camera",
    paletteDescription: "Desaturated silver, muted brown mud, sage grass",
    audioDescription: "Wet splashing, soft flopping of fish in mud, squelching footsteps",
    visualSummary: "Villager halts in utter surprise, staring down at dozens of glistening silver fish flopping in fresh mud puddles.",
    fullPrompt: "A 4-second hand-inked 2D animated clip in 16:9 aspect ratio. The stick figure villager in brick-red shirt, navy trousers, straw hat, and sandals walks down the muddy village pathway, stopping abruptly and looking down in utter surprise. High-angle medium shot looking down at the ground where dozens of small, glistening silver fish flap gently in fresh mud puddles. Hand-inked 2D illustrated animation with thick black ink outlines. Palette of desaturated silver, muted brown mud, and sage grass. Fine scanline and paper-grain texture overlay with vignette. Audio is diegetic ambient sound only — wet splashing, soft flopping of fish in mud, and squelching footsteps. Locked camera. No text, no watermark.",
    condensedPrompt: "4s 16:9 2D hand-inked animation. High-angle view. Stick figure villager halts in disbelief, looking down at dozens of small silver fish flopping in fresh mud puddles along the path. Silver, wet mud, and sage palette, rough ink lines, scanlines, vignette. Ambient squelching mud and fish flopping.",
    characterPose: {
      view: 'three-quarter',
      expression: 'surprised',
      pose: 'standing'
    }
  },
  {
    id: 7,
    title: "Scene 7: Sea of Silver",
    subtitle: "The Village Square",
    startTime: 24,
    duration: 4,
    cameraShot: "Wide establishing shot, slow camera push-in",
    paletteDescription: "Tan, slate gray, desaturated green, glinting silver",
    audioDescription: "Quiet wind rustling leaves and distant soft splashing",
    visualSummary: "Vast panoramic village square blanketed in thousands of tiny silver fish. Villager stands small in center frame.",
    fullPrompt: "A 4-second hand-inked 2D animated clip in 16:9 aspect ratio. Wide panoramic view across the village square after the storm. Thousands of tiny silver fish cover the wet mud roads and grass fields between houses. The stick figure villager in brick-red shirt and straw hat stands small in the center frame, looking across the vast field of fish. Wide establishing shot. Hand-inked 2D illustrated animation with thick ink outlines. Muted earthy palette of tan, slate gray, and desaturated green. Fine scanline and paper-grain overlay with dark vignette edges. Audio is diegetic ambient sound only — quiet wind rustling leaves and distant soft splashing. Slow camera push-in. No text, no watermark.",
    condensedPrompt: "4s 16:9 2D hand-inked animation. Wide panorama of village square covered in thousands of tiny glistening silver fish across roads and fields. Stick figure villager stands small at center. Tan, slate, and sage palette, rough ink outlines, scanlines, vignette. Slow push-in. Ambient wind and distant splashes.",
    characterPose: {
      view: 'back',
      expression: 'surprised',
      pose: 'standing'
    }
  },
  {
    id: 8,
    title: "Scene 8: Living Raindrops",
    subtitle: "Glistening Scales",
    startTime: 28,
    duration: 4,
    cameraShot: "Extreme close-up, locked camera (no characters)",
    paletteDescription: "Cool gray water, wet brown earth, dull silver scales",
    audioDescription: "Delicate water splashes and wet mud movement",
    visualSummary: "Extreme close-up of shallow puddle where several small silver fish with glistening scales wriggle and flap.",
    fullPrompt: "A 4-second hand-inked 2D animated clip in 16:9 aspect ratio. Extreme close-up of a shallow, muddy rain puddle on the ground. Several small silver fish with glistening scales wriggle and flap softly in two inches of murky water. Hand-inked 2D illustrated animation with thick black outlines. Palette of cool gray water, wet brown earth, and dull silver scales. Fine horizontal scanline and paper-grain texture overlay with dark vignette. Audio is diegetic ambient sound only — delicate water splashes and wet mud movement. Locked camera shot. No characters in frame, no text, no watermark.",
    condensedPrompt: "4s 16:9 2D hand-inked animation. Extreme close-up of murky rain puddle. Several small silver fish wriggle softly in shallow water. Murky brown, cool gray, and silver scale palette, rough ink linework, scanlines, vignette. Locked camera. Ambient water splashes and mud movement.",
    characterPose: {
      view: 'none',
      expression: 'neutral',
      pose: 'none'
    }
  },
  {
    id: 9,
    title: "Scene 9: The Old Chronicle",
    subtitle: "Sky-Fish Legend",
    startTime: 32,
    duration: 4,
    cameraShot: "Close-up shot, locked camera",
    paletteDescription: "Warm parchment, deep sepia, muted wood tones",
    audioDescription: "Crisp rustle of turning paper and room tone",
    visualSummary: "Close-up of leather-bound village record book. Hand-inked illustration of fish raining from clouds as hand turns page.",
    fullPrompt: "A 4-second hand-inked 2D animated clip in 16:9 aspect ratio. Close-up shot of an open, ancient leather-bound record book resting on a dark wooden table in a dimly lit village office. A simple hand-inked illustration on the page depicts fish falling from clouds. A hand holding an ink pen slowly turns the aged paper page. Hand-inked 2D illustrated animation with thick outlines. Palette of warm parchment, deep sepia, and muted wood tones. Fine horizontal scanline and paper-grain overlay with soft dark vignette. Audio is diegetic ambient sound only — crisp rustle of turning paper and room tone. Locked camera shot. No text, no watermark.",
    condensedPrompt: "4s 16:9 2D hand-inked animation. Close-up of open antique book on wooden desk. Inked drawing shows fish falling from storm clouds. Stick hand turns aged page. Parchment, sepia, and dark wood palette, rough ink outlines, scanlines, vignette. Locked camera. Ambient paper rustle and quiet room tone.",
    characterPose: {
      view: 'side',
      expression: 'weary',
      pose: 'sitting'
    }
  },
  {
    id: 10,
    title: "Scene 10: Origin in the Sea",
    subtitle: "The Waterspout Vortex",
    startTime: 36,
    duration: 4,
    cameraShot: "Wide shot, locked camera (no characters)",
    paletteDescription: "Deep navy blue, slate gray, dark seafoam",
    audioDescription: "Roaring wind and ocean waves churning",
    visualSummary: "Dramatic stormy ocean horizon. A massive dark swirling waterspout column connects clouds to sea, lifting ocean spray.",
    fullPrompt: "A 4-second hand-inked 2D animated clip in 16:9 aspect ratio. Wide shot of a dramatic dark ocean horizon under a stormy gray sky. A tall, swirling dark waterspout column stretches down from the thunderclouds, touching the ocean surface and churning up spray. Hand-inked 2D illustrated animation with thick black ink outlines. Muted palette of deep navy blue, slate gray, and dark seafoam. Fine horizontal scanline and paper-grain texture overlay with dark vignette. Audio is diegetic ambient sound only — roaring wind and ocean waves churning. Locked camera. No characters, no text, no watermark.",
    condensedPrompt: "4s 16:9 2D hand-inked animation. Wide stormy ocean horizon. Tall swirling waterspout connects dark thunderclouds to churning sea surface. Deep navy, slate gray, and seafoam palette, rough ink linework, scanlines, vignette. Locked camera. Ambient roaring wind and surging waves.",
    characterPose: {
      view: 'none',
      expression: 'neutral',
      pose: 'none'
    }
  },
  {
    id: 11,
    title: "Scene 11: Flight Across the Ridge",
    subtitle: "Cloud Migration",
    startTime: 40,
    duration: 4,
    cameraShot: "High-altitude wide shot, slow push forward",
    paletteDescription: "Desaturated mountain sage, dark cloud gray, muted ochre",
    audioDescription: "High-altitude mountain wind blowing softly",
    visualSummary: "High altitude view of cloud carrying lifted sea life drifting across vast green peaks toward inland valley.",
    fullPrompt: "A 4-second hand-inked 2D animated clip in 16:9 aspect ratio. High-altitude wide shot showing a dark storm cloud moving slowly over a vast green mountain range toward a inland valley village far from the sea. Hand-inked 2D illustrated animation with thick rough ink outlines. Palette of desaturated mountain sage, dark cloud gray, and muted ochre earth. Fine horizontal scanline overlay with soft vignette. Audio is diegetic ambient sound only — high-altitude mountain wind blowing softly. Camera moves in a very slow push forward. No text, no watermark.",
    condensedPrompt: "4s 16:9 2D hand-inked animation. High-altitude panorama. Heavy storm cloud drifts across rugged mountain peaks toward a distant inland valley. Sage green, stormy gray, and ochre palette, rough ink outlines, scanlines, vignette. Slow push-in. Soft high-altitude wind audio.",
    characterPose: {
      view: 'none',
      expression: 'neutral',
      pose: 'none'
    }
  },
  {
    id: 12,
    title: "Scene 12: Scientific Wonder",
    subtitle: "Researcher and Villager",
    startTime: 44,
    duration: 4,
    cameraShot: "Medium shot, locked camera",
    paletteDescription: "Muted sage, mud brown, researcher gray, brick red",
    audioDescription: "Quiet country ambient wind and distant birds",
    visualSummary: "Stick figure researcher in gray jacket inspects fish with magnifying glass; villager leans forward curiously.",
    fullPrompt: "A 4-second hand-inked 2D animated clip in 16:9 aspect ratio. Medium shot of a stick figure researcher with a large round white head, wearing a gray jacket, holding a magnifying glass and crouching by a puddle to examine a small silver fish. The main villager character in brick-red shirt and straw hat stands nearby, leaning forward curiously. Hand-inked 2D illustrated animation with thick black outlines. Palette of muted sage, mud brown, and gray. Fine scanline and paper-grain overlay with soft dark vignette. Audio is diegetic ambient sound only — quiet country ambient wind and distant birds. Locked camera shot. No text, no watermark.",
    condensedPrompt: "4s 16:9 2D hand-inked animation. Researcher stick figure crouches with magnifying glass inspecting fish in puddle; straw-hat villager leans forward curiously. Sage, gray, and mud palette, rough ink outlines, scanlines, vignette. Locked medium shot. Ambient breeze and distant birds.",
    characterPose: {
      view: 'three-quarter',
      expression: 'neutral',
      pose: 'standing'
    }
  },
  {
    id: 13,
    title: "Scene 13: Charting the Path",
    subtitle: "Tracing the River",
    startTime: 48,
    duration: 4,
    cameraShot: "Over-the-shoulder medium shot, locked camera",
    paletteDescription: "Desaturated parchment, earthy tan, navy",
    audioDescription: "Soft paper rustle and gentle breeze",
    visualSummary: "Villager sits on wooden bench with map on knees, tracing finger from river to coast, shaking head in thought.",
    fullPrompt: "A 4-second hand-inked 2D animated clip in 16:9 aspect ratio. Over-the-shoulder medium shot. The stick figure villager in brick-red shirt and straw hat sits on a wooden bench, looking down at a simple hand-drawn map of the region resting on his knees. His stick figure hand traces a line from a winding river to the coast, shaking his head slightly in thought. Hand-inked 2D illustrated animation with thick outlines. Palette of desaturated parchment, earthy tan, and navy. Fine scanline and paper-grain overlay with vignette. Audio is diegetic ambient sound only — soft paper rustle and gentle breeze. Locked camera. No text, no watermark.",
    condensedPrompt: "4s 16:9 2D hand-inked animation. Over-the-shoulder view. Stick figure villager sits on wooden bench tracing route from river to coast on map resting on knees, pondering. Parchment and earthy tan palette, rough ink linework, scanlines, vignette. Locked shot. Ambient paper rustle and breeze.",
    characterPose: {
      view: 'three-quarter',
      expression: 'concerned',
      pose: 'sitting'
    }
  },
  {
    id: 14,
    title: "Scene 14: Gathering the Bounty",
    subtitle: "Into the Wicker Basket",
    startTime: 52,
    duration: 4,
    cameraShot: "Medium wide shot, locked camera",
    paletteDescription: "Wet mud, wicker tan, brick-red, desaturated silver",
    audioDescription: "Water sloshing, mud squelching, and wicker creaking",
    visualSummary: "Villager squats in shallow puddle, carefully lifting a flopping silver fish from mud into a woven wicker basket.",
    fullPrompt: "A 4-second hand-inked 2D animated clip in 16:9 aspect ratio. Medium wide shot. The stick figure villager in brick-red shirt, navy trousers, straw hat, and sandals squats down in a shallow puddle, using his hands to carefully lift a small silver fish from the mud into a woven wicker basket. Hand-inked 2D illustrated animation with thick rough ink outlines. Muted palette of wet mud, wicker tan, brick-red, and desaturated silver. Fine horizontal scanline and paper-grain texture overlay with soft vignette. Audio is diegetic ambient sound only — water sloshing, mud squelching, and wicker creaking. Locked camera. No text, no watermark.",
    condensedPrompt: "4s 16:9 2D hand-inked animation. Stick figure villager squats in puddle, gently lifting small silver fish from mud into wicker basket. Mud brown, wicker tan, and brick-red palette, rough ink outlines, scanlines, vignette. Locked medium-wide shot. Ambient water sloshing, squelching mud, creaking wicker.",
    characterPose: {
      view: 'three-quarter',
      expression: 'resolved',
      pose: 'crouching'
    }
  },
  {
    id: 15,
    title: "Scene 15: Evening Horizon",
    subtitle: "The Film Closes",
    startTime: 56,
    duration: 4,
    cameraShot: "Wide closing shot, locked camera",
    paletteDescription: "Sunset cream, dusty gray, sage, pale tan",
    audioDescription: "Gentle evening crickets and soft wind",
    visualSummary: "Cleared pale sunset sky above village. Villager stands in profile at road edge, hands at sides, gazing peacefully.",
    fullPrompt: "A 4-second hand-inked 2D animated clip in 16:9 aspect ratio. Wide closing shot. The storm clouds have cleared, leaving a pale evening sky above the village. The stick figure villager in brick-red shirt, navy trousers, straw hat, and sandals stands in profile at the edge of the dirt road, looking out silently across the village horizon with his hands resting calmly at his sides. Hand-inked 2D illustrated animation with thick black ink outlines. Palette of muted sunset cream, dusty gray, sage, and pale tan. Fine horizontal scanline and paper-grain texture overlay with dark vignette. Audio is diegetic ambient sound only — gentle evening crickets and soft wind. Camera stays completely locked. No text, no watermark.",
    condensedPrompt: "4s 16:9 2D hand-inked animation. Wide closing shot. Clear sunset sky over village. Stick figure villager stands in profile at dirt road edge, hands at sides, gazing serenely at horizon. Muted sunset cream, dusty sage, and tan palette, rough ink outlines, scanlines, vignette. Locked shot. Ambient evening crickets and soft wind.",
    characterPose: {
      view: 'side',
      expression: 'resolved',
      pose: 'standing'
    }
  }
];

export const TOTAL_FILM_DURATION = 60.0;

export function getSceneIndexForTime(time: number): number {
  if (!Number.isFinite(time) || time <= 0) return 0;
  if (time >= TOTAL_FILM_DURATION) return FILM_SCENES.length - 1;
  const index = Math.floor(time / 4.0);
  return Math.max(0, Math.min(FILM_SCENES.length - 1, index));
}

export function getSceneForTime(time: number): SceneData {
  const index = getSceneIndexForTime(time);
  return FILM_SCENES[index] ?? FILM_SCENES[0];
}
