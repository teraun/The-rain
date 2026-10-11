export interface SceneData {
  id: number;
  title: string;
  subtitle: string;
  startTime: number; // in seconds
  duration: number; // exactly 4.0 seconds
  cameraShot: string;
  paletteDescription: string;
  audioDescription: string;
  visualSummary: string;
  fullPrompt: string;
  condensedPrompt: string;
  characterPose: {
    view: 'front' | 'three-quarter' | 'side' | 'back' | 'none';
    expression: 'neutral' | 'concerned' | 'surprised' | 'weary' | 'resolved';
    pose: 'standing' | 'walking' | 'sitting' | 'looking-up' | 'turning-away' | 'crouching' | 'none';
  };
}

export type PlaybackSpeed = 0.5 | 1 | 1.25 | 1.5 | 2;
