export interface CharacterDrawOptions {
  x: number;
  y: number;
  scale?: number;
  view?: 'front' | 'three-quarter' | 'side' | 'back';
  expression?: 'neutral' | 'concerned' | 'surprised' | 'weary' | 'resolved';
  pose?: 'standing' | 'walking' | 'sitting' | 'looking-up' | 'turning-away' | 'crouching';
  walkProgress?: number; // 0 to 1
  armAction?: 'none' | 'shutter' | 'lift-fish' | 'trace-map' | 'curious';
  actionProgress?: number;
}

export function drawStickVillager(ctx: CanvasRenderingContext2D, opts: CharacterDrawOptions) {
  const {
    x,
    y,
    scale = 1.0,
    view = 'front',
    expression = 'neutral',
    pose = 'standing',
    walkProgress = 0,
    armAction = 'none',
    actionProgress = 0,
  } = opts;

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Palette Constants matching reference
  const INK = '#181716';
  const SKIN = '#ffffff';
  const SHIRT = '#b44637';
  const SHIRT_SHADOW = '#97382c';
  const PANTS = '#32445a';
  const PANTS_CUFF = '#223040';
  const HAT = '#c6aa73';
  const HAT_BAND = '#8d7041';
  const SANDAL = '#6d4527';

  // Breathing / subtle idle bob
  const idleBob = Math.sin(walkProgress * Math.PI * 4) * 2;
  const isWalking = pose === 'walking';
  const walkBob = isWalking ? Math.abs(Math.sin(walkProgress * Math.PI * 2)) * -6 : idleBob;

  // Render character by pose & view
  if (pose === 'crouching') {
    drawCrouchingPose(ctx, { INK, SKIN, SHIRT, SHIRT_SHADOW, PANTS, PANTS_CUFF, HAT, HAT_BAND, SANDAL, expression, armAction, actionProgress });
  } else if (pose === 'sitting') {
    drawSittingPose(ctx, { INK, SKIN, SHIRT, SHIRT_SHADOW, PANTS, PANTS_CUFF, HAT, HAT_BAND, SANDAL, expression, armAction, actionProgress });
  } else if (view === 'back') {
    drawBackView(ctx, { INK, SKIN, SHIRT, SHIRT_SHADOW, PANTS, PANTS_CUFF, HAT, HAT_BAND, SANDAL, walkBob });
  } else if (view === 'side') {
    drawSideView(ctx, { INK, SKIN, SHIRT, SHIRT_SHADOW, PANTS, PANTS_CUFF, HAT, HAT_BAND, SANDAL, expression, pose, walkProgress, walkBob, armAction });
  } else if (view === 'three-quarter') {
    drawThreeQuarterView(ctx, { INK, SKIN, SHIRT, SHIRT_SHADOW, PANTS, PANTS_CUFF, HAT, HAT_BAND, SANDAL, expression, pose, walkProgress, walkBob, armAction, actionProgress });
  } else {
    // Front View
    drawFrontView(ctx, { INK, SKIN, SHIRT, SHIRT_SHADOW, PANTS, PANTS_CUFF, HAT, HAT_BAND, SANDAL, expression, pose, walkBob, armAction });
  }

  ctx.restore();
}

function drawRoughPath(ctx: CanvasRenderingContext2D, points: [number, number][], fill?: string, stroke?: string, lineWidth = 3.5) {
  if (points.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function drawHat(ctx: CanvasRenderingContext2D, cx: number, cy: number, brimWidth: number, angle = 0, colors: Record<string, string>) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);

  // Brim (wide oval shape)
  ctx.beginPath();
  ctx.ellipse(0, 0, brimWidth / 2, 11, 0, 0, Math.PI * 2);
  ctx.fillStyle = colors.HAT;
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = colors.INK;
  ctx.stroke();

  // Crown (dome)
  ctx.beginPath();
  ctx.ellipse(0, -9, brimWidth * 0.28, 14, 0, Math.PI, 0);
  ctx.fillStyle = colors.HAT;
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = colors.INK;
  ctx.stroke();

  // Hat Band
  ctx.beginPath();
  ctx.ellipse(0, -6, brimWidth * 0.27, 4, 0, 0, Math.PI);
  ctx.strokeStyle = colors.HAT_BAND;
  ctx.lineWidth = 3.0;
  ctx.stroke();

  ctx.restore();
}

function drawHairStrokes(ctx: CanvasRenderingContext2D, hx: number, hy: number, count = 3, colors: Record<string, string>) {
  ctx.strokeStyle = colors.INK;
  ctx.lineWidth = 2.2;
  for (let i = 0; i < count; i++) {
    ctx.beginPath();
    ctx.moveTo(hx + i * 4 - 6, hy);
    ctx.quadraticCurveTo(hx + i * 6 - 8, hy - 10 - i * 3, hx + i * 8 - 4, hy - 14 - i * 2);
    ctx.stroke();
  }
}

function drawExpressionFace(ctx: CanvasRenderingContext2D, hx: number, hy: number, expression: string, view: 'front' | 'three-quarter' | 'side', colors: Record<string, string>) {
  ctx.fillStyle = colors.INK;
  ctx.strokeStyle = colors.INK;
  ctx.lineWidth = 2.6;

  if (view === 'side') {
    const eyeX = hx + 10;
    const eyeY = hy - 2;
    if (expression === 'surprised') {
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 4.5, 0, Math.PI * 2);
      ctx.fill();
      // Round O mouth
      ctx.beginPath();
      ctx.arc(hx + 18, hy + 10, 3.5, 0, Math.PI * 2);
      ctx.stroke();
    } else if (expression === 'concerned') {
      ctx.beginPath();
      ctx.ellipse(eyeX, eyeY, 3, 4.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Sad brow
      ctx.beginPath();
      ctx.moveTo(eyeX - 4, eyeY - 8);
      ctx.lineTo(eyeX + 5, eyeY - 6);
      ctx.stroke();
      // Downturned mouth
      ctx.beginPath();
      ctx.arc(hx + 14, hy + 12, 6, Math.PI * 1.1, Math.PI * 1.8);
      ctx.stroke();
    } else {
      // Neutral
      ctx.beginPath();
      ctx.ellipse(eyeX, eyeY, 2.5, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(hx + 12, hy + 8);
      ctx.lineTo(hx + 19, hy + 8);
      ctx.stroke();
    }
    return;
  }

  // Front & Three-Quarter Views
  const eyeOffset = view === 'three-quarter' ? 4 : 0;
  const leftEyeX = hx - 11 + eyeOffset;
  const rightEyeX = hx + 11 + eyeOffset;
  const eyesY = hy - 3;

  switch (expression) {
    case 'concerned':
      // Arched sad brows
      ctx.beginPath();
      ctx.moveTo(leftEyeX - 6, eyesY - 7);
      ctx.lineTo(leftEyeX + 5, eyesY - 11);
      ctx.moveTo(rightEyeX - 5, eyesY - 11);
      ctx.lineTo(rightEyeX + 6, eyesY - 7);
      ctx.stroke();
      // Eyes
      ctx.beginPath();
      ctx.ellipse(leftEyeX, eyesY, 3, 4.5, 0, 0, Math.PI * 2);
      ctx.ellipse(rightEyeX, eyesY, 3, 4.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Frown mouth
      ctx.beginPath();
      ctx.arc(hx + eyeOffset, hy + 14, 8, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
      break;

    case 'surprised':
      // High brows
      ctx.beginPath();
      ctx.arc(leftEyeX, eyesY - 10, 6, Math.PI * 1.1, Math.PI * 1.9);
      ctx.arc(rightEyeX, eyesY - 10, 6, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
      // Big round eyes
      ctx.beginPath();
      ctx.arc(leftEyeX, eyesY, 4, 0, Math.PI * 2);
      ctx.arc(rightEyeX, eyesY, 4, 0, Math.PI * 2);
      ctx.fill();
      // Open O mouth
      ctx.beginPath();
      ctx.ellipse(hx + eyeOffset, hy + 10, 4, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'weary':
      // Weary brows and eyelids
      ctx.beginPath();
      ctx.moveTo(leftEyeX - 6, eyesY - 7);
      ctx.lineTo(leftEyeX + 6, eyesY - 6);
      ctx.moveTo(rightEyeX - 6, eyesY - 6);
      ctx.lineTo(rightEyeX + 6, eyesY - 7);
      ctx.stroke();
      // Slit eyes
      ctx.beginPath();
      ctx.ellipse(leftEyeX, eyesY, 3.5, 2, 0, 0, Math.PI * 2);
      ctx.ellipse(rightEyeX, eyesY, 3.5, 2, 0, 0, Math.PI * 2);
      ctx.fill();
      // Under-eye lines
      ctx.beginPath();
      ctx.arc(leftEyeX, eyesY + 5, 5, 0.2, Math.PI * 0.8);
      ctx.arc(rightEyeX, eyesY + 5, 5, 0.2, Math.PI * 0.8);
      ctx.stroke();
      // Straight tired mouth
      ctx.beginPath();
      ctx.moveTo(hx - 7 + eyeOffset, hy + 9);
      ctx.lineTo(hx + 7 + eyeOffset, hy + 9);
      ctx.stroke();
      break;

    case 'resolved':
      // Determined angled brows
      ctx.beginPath();
      ctx.moveTo(leftEyeX - 6, eyesY - 10);
      ctx.lineTo(leftEyeX + 6, eyesY - 6);
      ctx.moveTo(rightEyeX - 6, eyesY - 6);
      ctx.lineTo(rightEyeX + 6, eyesY - 10);
      ctx.stroke();
      // Focused eyes
      ctx.beginPath();
      ctx.ellipse(leftEyeX, eyesY, 2.8, 3.8, 0, 0, Math.PI * 2);
      ctx.ellipse(rightEyeX, eyesY, 2.8, 3.8, 0, 0, Math.PI * 2);
      ctx.fill();
      // Firm line mouth
      ctx.beginPath();
      ctx.moveTo(hx - 6 + eyeOffset, hy + 8);
      ctx.lineTo(hx + 6 + eyeOffset, hy + 8);
      ctx.stroke();
      break;

    case 'neutral':
    default:
      // Calm brows
      ctx.beginPath();
      ctx.moveTo(leftEyeX - 5, eyesY - 8);
      ctx.lineTo(leftEyeX + 5, eyesY - 8);
      ctx.moveTo(rightEyeX - 5, eyesY - 8);
      ctx.lineTo(rightEyeX + 5, eyesY - 8);
      ctx.stroke();
      // Calm eyes
      ctx.beginPath();
      ctx.ellipse(leftEyeX, eyesY, 2.8, 4.2, 0, 0, Math.PI * 2);
      ctx.ellipse(rightEyeX, eyesY, 2.8, 4.2, 0, 0, Math.PI * 2);
      ctx.fill();
      // Gentle smile
      ctx.beginPath();
      ctx.arc(hx + eyeOffset, hy + 7, 6, 0.2, Math.PI * 0.8);
      ctx.stroke();
      break;
  }
}

function drawFrontView(ctx: CanvasRenderingContext2D, c: any) {
  const { INK, SKIN, SHIRT, PANTS, PANTS_CUFF, HAT, SANDAL, expression, walkBob } = c;
  const hy = -92 + walkBob;

  // Legs & Pants
  drawRoughPath(ctx, [[-15, -40], [-18, 0], [-10, 0], [-8, -40]], PANTS, INK, 3.5);
  drawRoughPath(ctx, [[8, -40], [10, 0], [18, 0], [15, -40]], PANTS, INK, 3.5);

  // Rolled Cuffs
  drawRoughPath(ctx, [[-21, -4], [-8, -4], [-8, 2], [-21, 2]], PANTS_CUFF, INK, 2.5);
  drawRoughPath(ctx, [[8, -4], [21, -4], [21, 2], [8, 2]], PANTS_CUFF, INK, 2.5);

  // Bare Ankles & Sandals
  drawRoughPath(ctx, [[-16, 2], [-16, 12], [-11, 12], [-11, 2]], SKIN, INK, 2.0);
  drawRoughPath(ctx, [[11, 2], [11, 12], [16, 12], [16, 2]], SKIN, INK, 2.0);

  // Brown Sandals
  drawRoughPath(ctx, [[-22, 11], [-6, 11], [-6, 16], [-22, 16]], SANDAL, INK, 2.5);
  drawRoughPath(ctx, [[6, 11], [22, 11], [22, 16], [6, 16]], SANDAL, INK, 2.5);

  // Torso & Shirt
  drawRoughPath(ctx, [[-22, -80 + walkBob], [22, -80 + walkBob], [25, -36 + walkBob], [-25, -36 + walkBob]], SHIRT, INK, 3.5);

  // Shirt V-neck notch
  drawRoughPath(ctx, [[-5, -80 + walkBob], [0, -70 + walkBob], [5, -80 + walkBob]], undefined, INK, 2.5);

  // Arms (Long sleeves)
  drawRoughPath(ctx, [[-22, -76 + walkBob], [-30, -42 + walkBob], [-23, -42 + walkBob], [-16, -70 + walkBob]], SHIRT, INK, 3.0);
  drawRoughPath(ctx, [[22, -76 + walkBob], [30, -42 + walkBob], [23, -42 + walkBob], [16, -70 + walkBob]], SHIRT, INK, 3.0);

  // Hands
  drawRoughPath(ctx, [[-27, -42 + walkBob], [-27, -34 + walkBob]], undefined, INK, 3.0);
  drawRoughPath(ctx, [[27, -42 + walkBob], [27, -34 + walkBob]], undefined, INK, 3.0);

  // Head
  ctx.beginPath();
  ctx.arc(0, hy, 26, 0, Math.PI * 2);
  ctx.fillStyle = SKIN;
  ctx.fill();
  ctx.lineWidth = 3.8;
  ctx.strokeStyle = INK;
  ctx.stroke();

  // Face Expression
  drawExpressionFace(ctx, 0, hy, expression, 'front', c);

  // Hair
  drawHairStrokes(ctx, -10, hy - 22, 3, c);

  // Straw Hat
  drawHat(ctx, 0, hy - 20, 86, 0, c);
}

function drawThreeQuarterView(ctx: CanvasRenderingContext2D, c: any) {
  const { INK, SKIN, SHIRT, PANTS, PANTS_CUFF, SANDAL, expression, pose, walkBob, armAction } = c;
  const hy = -92 + walkBob;
  const isLookingUp = pose === 'looking-up';
  const headAngle = isLookingUp ? -0.22 : 0;

  // Legs & Trousers
  drawRoughPath(ctx, [[-12, -40], [-14, 0], [-6, 0], [-3, -40]], PANTS, INK, 3.5);
  drawRoughPath(ctx, [[5, -40], [8, 0], [16, 0], [14, -40]], PANTS, INK, 3.5);

  // Cuffs
  drawRoughPath(ctx, [[-16, -4], [-4, -4], [-4, 2], [-16, 2]], PANTS_CUFF, INK, 2.5);
  drawRoughPath(ctx, [[6, -4], [18, -4], [18, 2], [6, 2]], PANTS_CUFF, INK, 2.5);

  // Sandals
  drawRoughPath(ctx, [[-18, 11], [-3, 11], [-3, 16], [-18, 16]], SANDAL, INK, 2.5);
  drawRoughPath(ctx, [[7, 11], [22, 11], [22, 16], [7, 16]], SANDAL, INK, 2.5);

  // Torso
  drawRoughPath(ctx, [[-20, -80 + walkBob], [18, -80 + walkBob], [22, -36 + walkBob], [-20, -36 + walkBob]], SHIRT, INK, 3.5);

  // Arms
  if (armAction === 'shutter') {
    // Reaching forward to close door/shutter
    drawRoughPath(ctx, [[10, -74 + walkBob], [36, -60 + walkBob]], undefined, INK, 4.0);
  } else {
    drawRoughPath(ctx, [[-20, -76 + walkBob], [-26, -40 + walkBob]], undefined, INK, 3.5);
    drawRoughPath(ctx, [[15, -76 + walkBob], [22, -40 + walkBob]], undefined, INK, 3.5);
  }

  // Head
  ctx.save();
  ctx.translate(2, hy);
  ctx.rotate(headAngle);

  ctx.beginPath();
  ctx.arc(0, 0, 26, 0, Math.PI * 2);
  ctx.fillStyle = SKIN;
  ctx.fill();
  ctx.lineWidth = 3.8;
  ctx.strokeStyle = INK;
  ctx.stroke();

  drawExpressionFace(ctx, 0, 0, expression, 'three-quarter', c);
  drawHairStrokes(ctx, -8, -22, 3, c);
  drawHat(ctx, -2, -20, 84, -0.05, c);
  ctx.restore();
}

function drawSideView(ctx: CanvasRenderingContext2D, c: any) {
  const { INK, SKIN, SHIRT, PANTS, PANTS_CUFF, SANDAL, expression, pose, walkProgress, walkBob, armAction } = c;
  const hy = -92 + walkBob;
  const isWalking = pose === 'walking';

  // Walk cycle angles
  const legSwing = isWalking ? Math.sin(walkProgress * Math.PI * 2) * 24 : 0;
  const armSwing = isWalking ? Math.sin(walkProgress * Math.PI * 2) * -22 : 0;

  // Back Leg
  ctx.save();
  ctx.translate(0, -38);
  ctx.rotate((-legSwing * Math.PI) / 180);
  drawRoughPath(ctx, [[-6, 0], [-10, 38], [-2, 38], [2, 0]], PANTS, INK, 3.5);
  drawRoughPath(ctx, [[-12, 34], [0, 34], [0, 40], [-12, 40]], PANTS_CUFF, INK, 2.5);
  drawRoughPath(ctx, [[-14, 46], [6, 46], [6, 52], [-14, 52]], SANDAL, INK, 2.5);
  ctx.restore();

  // Torso
  drawRoughPath(ctx, [[-12, -80 + walkBob], [12, -80 + walkBob], [14, -36 + walkBob], [-10, -36 + walkBob]], SHIRT, INK, 3.5);

  // Front Leg
  ctx.save();
  ctx.translate(0, -38);
  ctx.rotate((legSwing * Math.PI) / 180);
  drawRoughPath(ctx, [[-4, 0], [6, 38], [14, 38], [4, 0]], PANTS, INK, 3.5);
  drawRoughPath(ctx, [[4, 34], [16, 34], [16, 40], [4, 40]], PANTS_CUFF, INK, 2.5);
  drawRoughPath(ctx, [[2, 46], [22, 46], [22, 52], [2, 52]], SANDAL, INK, 2.5);
  ctx.restore();

  // Arm
  ctx.save();
  ctx.translate(0, -74 + walkBob);
  if (armAction === 'shutter') {
    ctx.rotate(0.8);
  } else {
    ctx.rotate((armSwing * Math.PI) / 180);
  }
  drawRoughPath(ctx, [[-5, 0], [4, 34]], undefined, INK, 4.0);
  ctx.restore();

  // Head
  ctx.beginPath();
  ctx.arc(4, hy, 26, 0, Math.PI * 2);
  ctx.fillStyle = SKIN;
  ctx.fill();
  ctx.lineWidth = 3.8;
  ctx.strokeStyle = INK;
  ctx.stroke();

  drawExpressionFace(ctx, 4, hy, expression, 'side', c);
  drawHairStrokes(ctx, -6, hy - 22, 3, c);
  drawHat(ctx, 2, hy - 20, 80, -0.08, c);
}

function drawBackView(ctx: CanvasRenderingContext2D, c: any) {
  const { INK, SKIN, SHIRT, PANTS, PANTS_CUFF, SANDAL, walkBob } = c;
  const hy = -92 + walkBob;

  // Legs
  drawRoughPath(ctx, [[-16, -40], [-18, 0], [-10, 0], [-8, -40]], PANTS, INK, 3.5);
  drawRoughPath(ctx, [[8, -40], [10, 0], [18, 0], [16, -40]], PANTS, INK, 3.5);
  drawRoughPath(ctx, [[-20, -4], [-8, -4], [-8, 2], [-20, 2]], PANTS_CUFF, INK, 2.5);
  drawRoughPath(ctx, [[8, -4], [20, -4], [20, 2], [8, 2]], PANTS_CUFF, INK, 2.5);
  drawRoughPath(ctx, [[-20, 11], [-6, 11], [-6, 16], [-20, 16]], SANDAL, INK, 2.5);
  drawRoughPath(ctx, [[6, 11], [20, 11], [20, 16], [6, 16]], SANDAL, INK, 2.5);

  // Torso
  drawRoughPath(ctx, [[-22, -80 + walkBob], [22, -80 + walkBob], [24, -36 + walkBob], [-24, -36 + walkBob]], SHIRT, INK, 3.5);
  drawRoughPath(ctx, [[-22, -76 + walkBob], [-28, -40 + walkBob]], undefined, INK, 3.5);
  drawRoughPath(ctx, [[22, -76 + walkBob], [28, -40 + walkBob]], undefined, INK, 3.5);

  // Back of head & hair
  ctx.beginPath();
  ctx.arc(0, hy, 26, 0, Math.PI * 2);
  ctx.fillStyle = SKIN;
  ctx.fill();
  ctx.lineWidth = 3.8;
  ctx.strokeStyle = INK;
  ctx.stroke();

  drawHairStrokes(ctx, -10, hy - 16, 4, c);
  // Full hat dome and brim from back
  drawHat(ctx, 0, hy - 20, 88, 0, c);
}

function drawSittingPose(ctx: CanvasRenderingContext2D, c: any) {
  const { INK, SKIN, SHIRT, PANTS, PANTS_CUFF, SANDAL, expression, armAction } = c;
  const hy = -76;

  // Thighs (horizontal)
  drawRoughPath(ctx, [[-8, -34], [24, -34], [22, -22], [-8, -22]], PANTS, INK, 3.5);
  // Lower legs (downwards)
  drawRoughPath(ctx, [[14, -22], [14, 10], [22, 10], [22, -22]], PANTS, INK, 3.5);
  drawRoughPath(ctx, [[12, 6], [24, 6], [24, 12], [12, 12]], PANTS_CUFF, INK, 2.5);
  drawRoughPath(ctx, [[12, 18], [28, 18], [28, 24], [12, 24]], SANDAL, INK, 2.5);

  // Torso
  drawRoughPath(ctx, [[-16, -68], [12, -68], [10, -28], [-14, -28]], SHIRT, INK, 3.5);

  // Hands on knees or tracing map
  if (armAction === 'trace-map') {
    drawRoughPath(ctx, [[0, -60], [26, -30], [32, -24]], undefined, INK, 3.2);
  } else {
    drawRoughPath(ctx, [[-4, -60], [16, -30]], undefined, INK, 3.2);
  }

  // Head
  ctx.beginPath();
  ctx.arc(0, hy, 25, 0, Math.PI * 2);
  ctx.fillStyle = SKIN;
  ctx.fill();
  ctx.lineWidth = 3.8;
  ctx.strokeStyle = INK;
  ctx.stroke();

  drawExpressionFace(ctx, 0, hy, expression, 'three-quarter', c);
  drawHairStrokes(ctx, -8, hy - 20, 3, c);
  drawHat(ctx, -2, hy - 18, 80, -0.08, c);
}

function drawCrouchingPose(ctx: CanvasRenderingContext2D, c: any) {
  const { INK, SKIN, SHIRT, PANTS, PANTS_CUFF, SANDAL, expression, actionProgress = 0 } = c;
  const hy = -52;

  // Folded legs
  drawRoughPath(ctx, [[-18, -18], [12, -18], [16, 0], [-16, 0]], PANTS, INK, 3.5);
  drawRoughPath(ctx, [[-20, 2], [-6, 2], [-6, 8], [-20, 8]], PANTS_CUFF, INK, 2.5);
  drawRoughPath(ctx, [[-22, 10], [-4, 10], [-4, 16], [-22, 16]], SANDAL, INK, 2.5);
  drawRoughPath(ctx, [[6, 10], [24, 10], [24, 16], [6, 16]], SANDAL, INK, 2.5);

  // Torso hunched forward
  drawRoughPath(ctx, [[-18, -48], [12, -48], [16, -16], [-14, -16]], SHIRT, INK, 3.5);

  // Arms reaching down to mud / basket
  const armReachY = -10 + Math.sin(actionProgress * Math.PI) * 8;
  drawRoughPath(ctx, [[-2, -42], [14, armReachY], [26, armReachY]], undefined, INK, 3.5);

  // Head tilted down
  ctx.save();
  ctx.translate(0, hy);
  ctx.rotate(0.2);

  ctx.beginPath();
  ctx.arc(0, 0, 24, 0, Math.PI * 2);
  ctx.fillStyle = SKIN;
  ctx.fill();
  ctx.lineWidth = 3.8;
  ctx.strokeStyle = INK;
  ctx.stroke();

  drawExpressionFace(ctx, 0, 0, expression, 'three-quarter', c);
  drawHat(ctx, 0, -18, 80, 0.15, c);
  ctx.restore();
}
