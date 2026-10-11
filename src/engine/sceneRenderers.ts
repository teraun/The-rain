import { drawStickVillager } from './characterRenderer';

export interface SceneRenderContext {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  sceneTime: number; // 0.0 to 4.0
  globalTime: number; // 0.0 to 60.0
}

// Inked textured background helper
function drawTexturedPaperBackground(ctx: CanvasRenderingContext2D, width: number, height: number, baseColor = '#ede5d4', gradColor = '#dfd3be') {
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, baseColor);
  grad.addColorStop(1, gradColor);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
}

// Hand-drawn fish helper
export function drawInkSilverFish(ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1.0, angle = 0, flopOffset = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);

  const wiggle = Math.sin(flopOffset * Math.PI * 2) * 4;

  // Fish body
  ctx.beginPath();
  ctx.moveTo(-16, 0);
  ctx.quadraticCurveTo(-6, -7, 8, -4);
  ctx.quadraticCurveTo(16 + wiggle * 0.3, 0, 8, 4);
  ctx.quadraticCurveTo(-6, 7, -16, 0);
  ctx.fillStyle = '#b0b8c2';
  ctx.fill();
  ctx.lineWidth = 2.0;
  ctx.strokeStyle = '#1a1a1a';
  ctx.stroke();

  // Silver shine highlight
  ctx.beginPath();
  ctx.ellipse(-2, -2, 7, 2, -0.2, 0, Math.PI * 2);
  ctx.fillStyle = '#e8ecf0';
  ctx.fill();

  // Tail fin
  ctx.beginPath();
  ctx.moveTo(8, -2);
  ctx.lineTo(20 + wiggle, -9);
  ctx.lineTo(16 + wiggle * 0.8, 0);
  ctx.lineTo(20 + wiggle, 9);
  ctx.lineTo(8, 2);
  ctx.closePath();
  ctx.fillStyle = '#9ca4af';
  ctx.fill();
  ctx.stroke();

  // Eye
  ctx.beginPath();
  ctx.arc(-11, -1.5, 1.2, 0, Math.PI * 2);
  ctx.fillStyle = '#111';
  ctx.fill();

  ctx.restore();
}

// Universal Overlay: fine scanlines & paper grain & soft dark vignette
export function drawFilmTextureOverlay(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // 1. Horizontal Scanlines
  ctx.fillStyle = 'rgba(25, 20, 15, 0.04)';
  for (let y = 0; y < height; y += 4) {
    ctx.fillRect(0, y, width, 1.2);
  }

  // 2. Soft Dark Vignette
  const radius = Math.max(width, height) * 0.72;
  const vignette = ctx.createRadialGradient(
    width / 2, height / 2, radius * 0.35,
    width / 2, height / 2, radius
  );
  vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
  vignette.addColorStop(0.7, 'rgba(30, 25, 20, 0.15)');
  vignette.addColorStop(1, 'rgba(15, 10, 5, 0.45)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
}

// ==================== SCENE 1 ====================
// Villager walks slowly L to R along dusty dirt street in rural tropical village under warm afternoon sun.
export function renderScene1({ ctx, width, height, sceneTime }: SceneRenderContext) {
  drawTexturedPaperBackground(ctx, width, height, '#f2ebd9', '#e6dbc4');

  // Sun in upper sky
  ctx.beginPath();
  ctx.arc(width * 0.78, height * 0.22, 42, 0, Math.PI * 2);
  ctx.fillStyle = '#fce7b2';
  ctx.fill();
  ctx.strokeStyle = '#d4b76a';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Distant warm hills
  ctx.beginPath();
  ctx.moveTo(0, height * 0.55);
  ctx.quadraticCurveTo(width * 0.35, height * 0.48, width * 0.65, height * 0.54);
  ctx.quadraticCurveTo(width * 0.85, height * 0.50, width, height * 0.56);
  ctx.lineTo(width, height * 0.65);
  ctx.lineTo(0, height * 0.65);
  ctx.fillStyle = '#c7be9f';
  ctx.fill();
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Mud-brick huts on sides
  // Left hut
  ctx.fillStyle = '#bfa585';
  ctx.fillRect(-20, height * 0.44, width * 0.26, height * 0.26);
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(-20, height * 0.44, width * 0.26, height * 0.26);
  // Tin roof
  ctx.beginPath();
  ctx.moveTo(-30, height * 0.44);
  ctx.lineTo(width * 0.12, height * 0.36);
  ctx.lineTo(width * 0.28, height * 0.44);
  ctx.closePath();
  ctx.fillStyle = '#8f9da8';
  ctx.fill();
  ctx.stroke();

  // Right hut
  ctx.fillStyle = '#b89d7d';
  ctx.fillRect(width * 0.76, height * 0.42, width * 0.28, height * 0.28);
  ctx.strokeRect(width * 0.76, height * 0.42, width * 0.28, height * 0.28);
  // Tin roof
  ctx.beginPath();
  ctx.moveTo(width * 0.72, height * 0.42);
  ctx.lineTo(width * 0.88, height * 0.34);
  ctx.lineTo(width + 30, height * 0.42);
  ctx.closePath();
  ctx.fillStyle = '#99a6b0';
  ctx.fill();
  ctx.stroke();

  // Dusty Dirt Road
  ctx.beginPath();
  ctx.moveTo(0, height * 0.62);
  ctx.lineTo(width, height * 0.62);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.fillStyle = '#d0bea0';
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#222';
  ctx.beginPath();
  ctx.moveTo(0, height * 0.62);
  ctx.lineTo(width, height * 0.62);
  ctx.stroke();

  // Character walking L to R
  // 4s duration: moves from 20% to 75% width
  const progress = sceneTime / 4.0;
  const charX = width * (0.2 + progress * 0.55);
  const charY = height * 0.82;

  drawStickVillager(ctx, {
    x: charX,
    y: charY,
    scale: 1.35,
    view: 'side',
    expression: 'neutral',
    pose: 'walking',
    walkProgress: progress * 4.0,
  });
}

// ==================== SCENE 2 ====================
// Village center, looking upward at dark storm clouds rolling heavily over distant hills.
export function renderScene2({ ctx, width, height, sceneTime }: SceneRenderContext) {
  // Darkening sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
  skyGrad.addColorStop(0, '#363d47');
  skyGrad.addColorStop(0.6, '#6b7582');
  skyGrad.addColorStop(1, '#a6b0b5');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, height);

  const t = sceneTime;

  // Dark rolling clouds (animated billowing)
  ctx.fillStyle = '#2c323c';
  ctx.strokeStyle = '#181b20';
  ctx.lineWidth = 3.5;
  for (let i = 0; i < 6; i++) {
    const cx = (i * 240 + t * 25) % (width + 300) - 100;
    const cy = height * 0.18 + Math.sin(t * 1.5 + i) * 15;
    ctx.beginPath();
    ctx.arc(cx, cy, 140, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // Distant green hills
  ctx.beginPath();
  ctx.moveTo(0, height * 0.62);
  ctx.quadraticCurveTo(width * 0.4, height * 0.52, width, height * 0.60);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.fillStyle = '#617158';
  ctx.fill();
  ctx.strokeStyle = '#1c221a';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Village center ground
  ctx.beginPath();
  ctx.moveTo(0, height * 0.74);
  ctx.lineTo(width, height * 0.74);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.fillStyle = '#8a7966';
  ctx.fill();
  ctx.stroke();

  // Low-angle perspective: Character looking up
  drawStickVillager(ctx, {
    x: width * 0.48,
    y: height * 0.88,
    scale: 1.6,
    view: 'three-quarter',
    expression: 'concerned',
    pose: 'looking-up',
    walkProgress: t * 0.5,
  });
}

// ==================== SCENE 3 ====================
// Heavy rain pours outside down onto dirt yard. Villager hastily pulls wooden door closed from within.
export function renderScene3({ ctx, width, height, sceneTime }: SceneRenderContext) {
  drawTexturedPaperBackground(ctx, width, height, '#b0a799', '#8c8376');

  // Muddy yard
  ctx.fillStyle = '#645345';
  ctx.fillRect(0, height * 0.7, width, height * 0.3);

  // Doorway frame (rustic wood)
  const doorW = width * 0.36;
  const doorH = height * 0.68;
  const doorX = width * 0.32;
  const doorY = height * 0.16;

  // Outer mud wall
  ctx.fillStyle = '#9b846e';
  ctx.fillRect(0, 0, width, height);
  // Door cutout interior (dark inside)
  ctx.fillStyle = '#1c1712';
  ctx.fillRect(doorX, doorY, doorW, doorH);

  // Character inside closing door
  const closeProgress = Math.min(1.0, sceneTime / 2.2);
  const doorAngle = 1.0 - closeProgress; // open to closed

  // Villager standing inside doorway
  drawStickVillager(ctx, {
    x: doorX + doorW * 0.55,
    y: doorY + doorH - 30,
    scale: 1.3,
    view: 'front',
    expression: 'concerned',
    pose: 'standing',
    armAction: 'shutter',
    actionProgress: closeProgress,
  });

  // Dark wooden door swinging shut
  ctx.save();
  ctx.translate(doorX, doorY);
  ctx.beginPath();
  const currentDoorWidth = doorW * (0.2 + (1.0 - doorAngle) * 0.8);
  ctx.rect(0, 0, currentDoorWidth, doorH);
  ctx.fillStyle = '#4a3828';
  ctx.fill();
  ctx.lineWidth = 4.0;
  ctx.strokeStyle = '#18120c';
  ctx.stroke();

  // Wood planks on door
  ctx.lineWidth = 2.0;
  for (let p = 1; p < 4; p++) {
    const px = currentDoorWidth * (p / 4);
    ctx.beginPath();
    ctx.moveTo(px, 0);
    ctx.lineTo(px, doorH);
    ctx.stroke();
  }
  // Wooden door latch
  ctx.fillStyle = '#222';
  ctx.fillRect(currentDoorWidth - 25, doorH * 0.5 - 10, 18, 20);
  ctx.restore();

  // Doorway frame trim
  ctx.lineWidth = 6.0;
  ctx.strokeStyle = '#32261a';
  ctx.strokeRect(doorX, doorY, doorW, doorH);

  // Heavy pouring rain outside (diagonal streaks)
  ctx.strokeStyle = 'rgba(215, 230, 245, 0.45)';
  ctx.lineWidth = 2.2;
  const seed = Math.floor(sceneTime * 30);
  for (let r = 0; r < 80; r++) {
    const rx = ((r * 37 + seed * 43) % width);
    const ry = ((r * 53 + seed * 89) % height);
    ctx.beginPath();
    ctx.moveTo(rx, ry);
    ctx.lineTo(rx - 15, ry + 45);
    ctx.stroke();
  }
}

// ==================== SCENE 4 ====================
// Interior view inside dimly lit mud hut. Villager stands at wooden shuttered window peering through narrow gap.
export function renderScene4({ ctx, width, height, sceneTime }: SceneRenderContext) {
  // Dim interior earthy walls
  const wallGrad = ctx.createLinearGradient(0, 0, width, height);
  wallGrad.addColorStop(0, '#382a20');
  wallGrad.addColorStop(1, '#231913');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, width, height);

  // Shuttered window in center-right
  const winX = width * 0.48;
  const winY = height * 0.18;
  const winW = width * 0.38;
  const winH = height * 0.58;

  // Rainy exterior light through slats
  ctx.fillStyle = '#83919e';
  ctx.fillRect(winX, winY, winW, winH);

  // Rain streaks on exterior glass
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 2.0;
  for (let s = 0; s < 25; s++) {
    const sx = winX + (s * 23 + sceneTime * 15) % winW;
    const sy = winY + (s * 31 + sceneTime * 50) % winH;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx - 4, sy + 30);
    ctx.stroke();
  }

  // Wooden shutter slats (horizontal slats with gap in middle)
  ctx.fillStyle = '#4c3523';
  ctx.strokeStyle = '#18110b';
  ctx.lineWidth = 3.0;

  const slatCount = 9;
  const slatH = winH / slatCount;
  for (let i = 0; i < slatCount; i++) {
    // Gap around index 4 (eye level)
    if (i === 4) continue;
    const sy = winY + i * slatH;
    ctx.fillRect(winX, sy, winW, slatH * 0.85);
    ctx.strokeRect(winX, sy, winW, slatH * 0.85);
  }

  // Window frame
  ctx.lineWidth = 8.0;
  ctx.strokeStyle = '#2d1e13';
  ctx.strokeRect(winX, winY, winW, winH);

  // Villager in close-up profile peering through the gap
  drawStickVillager(ctx, {
    x: width * 0.35,
    y: height * 0.84,
    scale: 2.1,
    view: 'side',
    expression: 'concerned',
    pose: 'standing',
    walkProgress: sceneTime * 0.2,
  });
}

// ==================== SCENE 5 ====================
// Exterior shot of rain ending. Golden sunlight cuts through parting dark clouds. Villager opens door & steps out.
export function renderScene5({ ctx, width, height, sceneTime }: SceneRenderContext) {
  // Parting sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
  skyGrad.addColorStop(0, '#535b67');
  skyGrad.addColorStop(0.5, '#b4bebe');
  skyGrad.addColorStop(1, '#e8e2c8');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, height);

  // Golden Sunbeams cutting through
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(width * 0.2, 0);
  ctx.lineTo(width * 0.65, height);
  ctx.lineTo(width * 0.88, height);
  ctx.lineTo(width * 0.35, 0);
  ctx.fillStyle = 'rgba(255, 235, 160, 0.28)';
  ctx.fill();
  ctx.restore();

  // Wet village street
  ctx.fillStyle = '#7a6a57';
  ctx.fillRect(0, height * 0.68, width, height * 0.32);
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 3.0;
  ctx.beginPath();
  ctx.moveTo(0, height * 0.68);
  ctx.lineTo(width, height * 0.68);
  ctx.stroke();

  // Water reflections / puddles on mud
  ctx.fillStyle = 'rgba(200, 220, 235, 0.45)';
  ctx.beginPath();
  ctx.ellipse(width * 0.35, height * 0.82, 90, 16, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.ellipse(width * 0.72, height * 0.86, 120, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Mud hut on left with open door
  ctx.fillStyle = '#a68b70';
  ctx.fillRect(-20, height * 0.26, width * 0.32, height * 0.44);
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 4.0;
  ctx.strokeRect(-20, height * 0.26, width * 0.32, height * 0.44);

  // Open doorway (interior dark)
  ctx.fillStyle = '#1e1812';
  ctx.fillRect(width * 0.08, height * 0.36, width * 0.15, height * 0.34);

  // Villager stepping out onto wet earth
  const walkStep = Math.min(1.0, sceneTime / 3.0);
  const charX = width * (0.16 + walkStep * 0.28);

  drawStickVillager(ctx, {
    x: charX,
    y: height * 0.82,
    scale: 1.35,
    view: 'three-quarter',
    expression: 'neutral',
    pose: 'walking',
    walkProgress: walkStep * 2.0,
  });

  // Eaves dripping water
  const dripY = (sceneTime * 280) % 60;
  ctx.beginPath();
  ctx.arc(width * 0.1, height * 0.26 + dripY, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#c5d8ea';
  ctx.fill();
}

// ==================== SCENE 6 ====================
// Villager walking down muddy pathway, stops abruptly and looks down in utter surprise at silver fish in puddles.
export function renderScene6({ ctx, width, height, sceneTime }: SceneRenderContext) {
  // High-angle ground view
  drawTexturedPaperBackground(ctx, width, height, '#b4a287', '#938166');

  // Sage grass patches along sides
  ctx.fillStyle = '#657458';
  ctx.beginPath();
  ctx.ellipse(width * 0.1, height * 0.3, width * 0.18, height * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.ellipse(width * 0.9, height * 0.5, width * 0.22, height * 0.25, 0, 0, Math.PI * 2);
  ctx.fill();

  // Fresh Mud Puddles (high angle perspective)
  const puddleColors = ['#5e6c78', '#546370', '#637382'];
  const puddles = [
    { x: width * 0.42, y: height * 0.65, rx: 110, ry: 48 },
    { x: width * 0.68, y: height * 0.76, rx: 85, ry: 38 },
    { x: width * 0.25, y: height * 0.82, rx: 70, ry: 32 },
  ];

  puddles.forEach((p, idx) => {
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, p.rx, p.ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = puddleColors[idx % puddleColors.length];
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#28211b';
    ctx.stroke();
  });

  // Small glistening silver fish flapping in puddles
  const fishList = [
    { x: width * 0.39, y: height * 0.64, angle: 0.3, scale: 0.9 },
    { x: width * 0.45, y: height * 0.66, angle: -0.5, scale: 0.8 },
    { x: width * 0.42, y: height * 0.62, angle: 1.2, scale: 0.85 },
    { x: width * 0.66, y: height * 0.74, angle: -0.2, scale: 0.95 },
    { x: width * 0.71, y: height * 0.77, angle: 0.8, scale: 0.85 },
    { x: width * 0.24, y: height * 0.81, angle: -0.6, scale: 0.9 },
  ];

  fishList.forEach((f, idx) => {
    const flop = sceneTime * 3.5 + idx * 1.5;
    drawInkSilverFish(ctx, f.x, f.y, f.scale, f.angle + Math.sin(flop) * 0.3, flop);
  });

  // Stick figure villager halts and looks down in surprise
  // Stride stops at t = 1.0s
  const isStopping = sceneTime > 1.0;
  const charX = width * 0.5;
  const charY = height * 0.45;

  drawStickVillager(ctx, {
    x: charX,
    y: charY,
    scale: 1.45,
    view: 'three-quarter',
    expression: isStopping ? 'surprised' : 'neutral',
    pose: isStopping ? 'standing' : 'walking',
    walkProgress: isStopping ? 0 : sceneTime * 2.0,
  });
}

// ==================== SCENE 7 ====================
// Wide panoramic view across village square after storm. Thousands of tiny silver fish cover roads. Slow camera push-in.
export function renderScene7({ ctx, width, height, sceneTime }: SceneRenderContext) {
  // Slow camera push-in scale (1.0 to 1.08)
  const pushIn = 1.0 + (sceneTime / 4.0) * 0.08;
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.scale(pushIn, pushIn);
  ctx.translate(-width / 2, -height / 2);

  // Pale sky
  drawTexturedPaperBackground(ctx, width, height, '#d8dfde', '#c2cbcc');

  // Distant houses in square
  ctx.fillStyle = '#8f816d';
  for (let h = 0; h < 5; h++) {
    const hx = width * (0.05 + h * 0.22);
    ctx.fillRect(hx, height * 0.38, width * 0.12, height * 0.14);
    ctx.strokeRect(hx, height * 0.38, width * 0.12, height * 0.14);
    // Roofs
    ctx.beginPath();
    ctx.moveTo(hx - 10, height * 0.38);
    ctx.lineTo(hx + width * 0.06, height * 0.32);
    ctx.lineTo(hx + width * 0.12 + 10, height * 0.38);
    ctx.closePath();
    ctx.fillStyle = '#5c6570';
    ctx.fill();
    ctx.stroke();
  }

  // Vast village square field & roads
  ctx.fillStyle = '#8c7d67';
  ctx.fillRect(0, height * 0.52, width, height * 0.48);
  ctx.lineWidth = 3.0;
  ctx.strokeStyle = '#222';
  ctx.beginPath();
  ctx.moveTo(0, height * 0.52);
  ctx.lineTo(width, height * 0.52);
  ctx.stroke();

  // Thousands of tiny glistening silver fish across the ground
  ctx.fillStyle = '#c7d2de';
  ctx.strokeStyle = '#1e242b';
  ctx.lineWidth = 1.0;
  const fishCount = 140;
  for (let i = 0; i < fishCount; i++) {
    const fx = (i * 97) % width;
    const fy = height * 0.54 + ((i * 61) % (height * 0.44));
    const glint = Math.sin(sceneTime * 4 + i) * 1.5;
    ctx.beginPath();
    ctx.ellipse(fx, fy, 4 + glint, 1.8, (i * 0.7) % Math.PI, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // Villager standing small in center frame looking out
  drawStickVillager(ctx, {
    x: width * 0.5,
    y: height * 0.78,
    scale: 0.95, // small in wide establishing shot
    view: 'back',
    expression: 'surprised',
    pose: 'standing',
  });

  ctx.restore();
}

// ==================== SCENE 8 ====================
// Extreme close-up of shallow muddy rain puddle. Several small silver fish with glistening scales wriggle and flap.
export function renderScene8({ ctx, width, height, sceneTime }: SceneRenderContext) {
  // Murky puddle background
  const grad = ctx.createRadialGradient(
    width / 2, height / 2, 40,
    width / 2, height / 2, width * 0.6
  );
  grad.addColorStop(0, '#556371');
  grad.addColorStop(0.6, '#463c32');
  grad.addColorStop(1, '#2c241c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Water ripple rings
  ctx.strokeStyle = 'rgba(215, 230, 245, 0.35)';
  ctx.lineWidth = 2.0;
  for (let r = 0; r < 4; r++) {
    const radius = ((sceneTime * 65 + r * 70) % 260) + 15;
    ctx.beginPath();
    ctx.ellipse(width * 0.48, height * 0.52, radius, radius * 0.45, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Muddy pebbles / earth around edge
  ctx.fillStyle = '#3a2e22';
  for (let p = 0; p < 12; p++) {
    const px = (p * 150) % width;
    const py = (p * 85) % (height * 0.25) + (p % 2 === 0 ? 0 : height * 0.75);
    ctx.beginPath();
    ctx.arc(px, py, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // Several detailed silver fish in close-up
  const fish = [
    { x: width * 0.46, y: height * 0.52, scale: 2.8, angle: -0.2, speed: 4.5 },
    { x: width * 0.32, y: height * 0.62, scale: 2.2, angle: 0.4, speed: 5.0 },
    { x: width * 0.64, y: height * 0.44, scale: 2.4, angle: 1.1, speed: 4.0 },
    { x: width * 0.58, y: height * 0.68, scale: 1.8, angle: -0.8, speed: 6.0 },
  ];

  fish.forEach((f, idx) => {
    const flop = sceneTime * f.speed + idx * 2.0;
    drawInkSilverFish(ctx, f.x, f.y, f.scale, f.angle + Math.sin(flop) * 0.25, flop);
  });
}

// ==================== SCENE 9 ====================
// Ancient leather-bound record book resting on dark wooden table in dimly lit village office. Inked illustration of fish falling from clouds. Stick hand turns page.
export function renderScene9({ ctx, width, height, sceneTime }: SceneRenderContext) {
  // Dark rustic wooden table
  ctx.fillStyle = '#2d2116';
  ctx.fillRect(0, 0, width, height);

  // Desk wood planks
  ctx.strokeStyle = '#18110b';
  ctx.lineWidth = 3.0;
  for (let y = 0; y < height; y += 75) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Ancient Leather Book
  const bookX = width * 0.2;
  const bookY = height * 0.14;
  const bookW = width * 0.6;
  const bookH = height * 0.72;

  // Leather binding edge
  ctx.fillStyle = '#4c2d1b';
  ctx.fillRect(bookX - 18, bookY - 10, bookW + 36, bookH + 20);
  ctx.lineWidth = 4.0;
  ctx.strokeStyle = '#180e07';
  ctx.strokeRect(bookX - 18, bookY - 10, bookW + 36, bookH + 20);

  // Parchment Pages (Left page & Right page)
  ctx.fillStyle = '#eadebe';
  ctx.fillRect(bookX, bookY, bookW, bookH);
  ctx.lineWidth = 3.0;
  ctx.strokeStyle = '#222';
  ctx.strokeRect(bookX, bookY, bookW, bookH);

  // Center seam
  const seamX = bookX + bookW / 2;
  ctx.beginPath();
  ctx.moveTo(seamX, bookY);
  ctx.lineTo(seamX, bookY + bookH);
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Left Page: Ancient Inked Drawing of Fish falling from storm clouds
  const cloudX = bookX + bookW * 0.25;
  const cloudY = bookY + bookH * 0.3;
  ctx.fillStyle = '#8f9da8';
  ctx.beginPath();
  ctx.arc(cloudX, cloudY, 35, 0, Math.PI * 2);
  ctx.arc(cloudX - 25, cloudY + 8, 26, 0, Math.PI * 2);
  ctx.arc(cloudX + 25, cloudY + 6, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#111';
  ctx.stroke();

  // Inked fish falling downward under cloud
  for (let f = 0; f < 5; f++) {
    const fx = cloudX - 30 + f * 16;
    const fy = cloudY + 45 + (f % 2) * 22;
    drawInkSilverFish(ctx, fx, fy, 0.7, 0.7, 0);
  }

  // Ancient inked script lines on right page
  ctx.strokeStyle = '#3a342c';
  ctx.lineWidth = 2.0;
  for (let line = 0; line < 8; line++) {
    const ly = bookY + 40 + line * 26;
    ctx.beginPath();
    ctx.moveTo(seamX + 25, ly);
    ctx.lineTo(bookX + bookW - 35, ly);
    ctx.stroke();
  }

  // Hand holding ink pen turning aged paper page
  const pageTurn = Math.min(1.0, sceneTime / 3.0);
  const handX = bookX + bookW * (0.85 - pageTurn * 0.2);
  const handY = bookY + bookH * (0.75 - pageTurn * 0.1);

  // Stick hand
  ctx.beginPath();
  ctx.arc(handX, handY, 12, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 3.0;
  ctx.strokeStyle = '#111';
  ctx.stroke();

  // Arm sleeve entering from right
  ctx.beginPath();
  ctx.moveTo(width + 20, handY + 40);
  ctx.lineTo(handX, handY);
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#b44637';
  ctx.stroke();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#111';
  ctx.stroke();

  // Ink pen held in hand
  ctx.save();
  ctx.translate(handX, handY);
  ctx.rotate(-0.6);
  ctx.fillStyle = '#222';
  ctx.fillRect(-3, -25, 6, 35);
  ctx.restore();
}

// ==================== SCENE 10 ====================
// Dramatic dark ocean horizon under stormy gray sky. Tall swirling waterspout column touches ocean, churning spray.
export function renderScene10({ ctx, width, height, sceneTime }: SceneRenderContext) {
  // Dark stormy ocean sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.6);
  skyGrad.addColorStop(0, '#1c222b');
  skyGrad.addColorStop(1, '#3b4756');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, height * 0.6);

  // Stormy sea
  const seaGrad = ctx.createLinearGradient(0, height * 0.6, 0, height);
  seaGrad.addColorStop(0, '#233242');
  seaGrad.addColorStop(1, '#151e28');
  ctx.fillStyle = seaGrad;
  ctx.fillRect(0, height * 0.6, width, height * 0.4);

  // Heavy ocean waves
  ctx.strokeStyle = 'rgba(180, 205, 225, 0.4)';
  ctx.lineWidth = 2.5;
  for (let w = 0; w < 6; w++) {
    const wy = height * (0.64 + w * 0.06);
    ctx.beginPath();
    ctx.moveTo(0, wy);
    for (let x = 0; x < width; x += 40) {
      const waveH = Math.sin(x * 0.03 + sceneTime * 5 + w) * 9;
      ctx.lineTo(x, wy + waveH);
    }
    ctx.stroke();
  }

  // The Waterspout Column
  const spoutX = width * 0.52 + Math.sin(sceneTime * 2.0) * 15;
  const spoutTopW = 140;
  const spoutBotW = 48;
  const spoutTopY = height * 0.05;
  const spoutBotY = height * 0.65;

  ctx.save();
  // Funnel gradient
  const spoutGrad = ctx.createLinearGradient(spoutX - spoutTopW, 0, spoutX + spoutTopW, 0);
  spoutGrad.addColorStop(0, 'rgba(40, 50, 62, 0.85)');
  spoutGrad.addColorStop(0.5, 'rgba(20, 28, 36, 0.95)');
  spoutGrad.addColorStop(1, 'rgba(40, 50, 62, 0.85)');

  ctx.beginPath();
  ctx.moveTo(spoutX - spoutTopW / 2, spoutTopY);
  ctx.quadraticCurveTo(spoutX - 30, height * 0.35, spoutX - spoutBotW / 2, spoutBotY);
  ctx.lineTo(spoutX + spoutBotW / 2, spoutBotY);
  ctx.quadraticCurveTo(spoutX + 30, height * 0.35, spoutX + spoutTopW / 2, spoutTopY);
  ctx.closePath();
  ctx.fillStyle = spoutGrad;
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#12171e';
  ctx.stroke();

  // Swirling vortex texture rings inside spout
  for (let v = 0; v < 8; v++) {
    const vy = spoutTopY + v * 38;
    const curW = spoutTopW - (v / 8) * (spoutTopW - spoutBotW);
    const waveShift = Math.sin(sceneTime * 10 + v) * 12;
    ctx.beginPath();
    ctx.ellipse(spoutX + waveShift, vy, curW * 0.45, 6, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(200, 220, 240, 0.35)';
    ctx.lineWidth = 2.0;
    ctx.stroke();
  }

  // Churning ocean spray at base
  ctx.fillStyle = 'rgba(220, 235, 250, 0.65)';
  ctx.beginPath();
  ctx.ellipse(spoutX, spoutBotY, 80, 24, 0, 0, Math.PI * 2);
  ctx.fill();

  // Lifted fish silhouettes inside spray & column
  for (let f = 0; f < 6; f++) {
    const fx = spoutX - 30 + (f * 18 + sceneTime * 20) % 60;
    const fy = spoutBotY - 30 - f * 35;
    drawInkSilverFish(ctx, fx, fy, 0.7, sceneTime * 4 + f, 0);
  }

  ctx.restore();
}

// ==================== SCENE 11 ====================
// High-altitude wide shot showing dark storm cloud moving slowly over green mountain range toward inland valley.
export function renderScene11({ ctx, width, height, sceneTime }: SceneRenderContext) {
  // Slow camera push forward (1.0 to 1.06)
  const push = 1.0 + (sceneTime / 4.0) * 0.06;
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.scale(push, push);
  ctx.translate(-width / 2, -height / 2);

  // Pale high-altitude sky
  drawTexturedPaperBackground(ctx, width, height, '#d0d8d4', '#bac3bd');

  // Background Mountain Peaks (Layer 1)
  ctx.fillStyle = '#7a887b';
  ctx.beginPath();
  ctx.moveTo(0, height * 0.55);
  ctx.lineTo(width * 0.25, height * 0.38);
  ctx.lineTo(width * 0.5, height * 0.52);
  ctx.lineTo(width * 0.75, height * 0.34);
  ctx.lineTo(width, height * 0.48);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.fill();
  ctx.lineWidth = 3.0;
  ctx.strokeStyle = '#222';
  ctx.stroke();

  // Foreground Mountain Peaks (Layer 2)
  ctx.fillStyle = '#566657';
  ctx.beginPath();
  ctx.moveTo(0, height * 0.65);
  ctx.lineTo(width * 0.35, height * 0.48);
  ctx.lineTo(width * 0.65, height * 0.68);
  ctx.lineTo(width, height * 0.54);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.fill();
  ctx.stroke();

  // Inland Valley far in distance
  ctx.fillStyle = '#9e8c6f';
  ctx.fillRect(width * 0.55, height * 0.58, width * 0.25, height * 0.1);

  // Heavy Dark Storm Cloud moving slowly L to R
  const cloudX = width * (0.28 + (sceneTime / 4.0) * 0.22);
  const cloudY = height * 0.26;
  ctx.fillStyle = '#39424c';
  ctx.beginPath();
  ctx.arc(cloudX, cloudY, 80, 0, Math.PI * 2);
  ctx.arc(cloudX - 60, cloudY + 12, 60, 0, Math.PI * 2);
  ctx.arc(cloudX + 65, cloudY + 14, 65, 0, Math.PI * 2);
  ctx.arc(cloudX + 130, cloudY + 20, 48, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#1b2026';
  ctx.stroke();

  ctx.restore();
}

// ==================== SCENE 12 ====================
// Stick figure researcher in gray jacket with magnifying glass crouches by puddle examining fish; villager leans curiously.
export function renderScene12({ ctx, width, height, sceneTime }: SceneRenderContext) {
  drawTexturedPaperBackground(ctx, width, height, '#e2dcce', '#cfc6b5');

  // Ground and puddle
  ctx.fillStyle = '#7a6a57';
  ctx.fillRect(0, height * 0.68, width, height * 0.32);
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 3.0;
  ctx.beginPath();
  ctx.moveTo(0, height * 0.68);
  ctx.lineTo(width, height * 0.68);
  ctx.stroke();

  // Puddle with silver fish
  ctx.fillStyle = '#5a6875';
  ctx.beginPath();
  ctx.ellipse(width * 0.42, height * 0.78, 90, 28, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  drawInkSilverFish(ctx, width * 0.42, height * 0.78, 1.4, 0.2, sceneTime * 2);

  // Researcher stick figure (gray jacket, round white head, crouching with magnifying glass)
  const resX = width * 0.34;
  const resY = height * 0.72;

  // Researcher Crouch body (gray jacket #5a646e)
  ctx.save();
  ctx.translate(resX, resY);

  // Legs
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-20, 25);
  ctx.lineTo(5, 30);
  ctx.stroke();

  // Gray torso
  ctx.fillStyle = '#56616e';
  ctx.fillRect(-15, -35, 30, 35);
  ctx.strokeRect(-15, -35, 30, 35);

  // Arm holding magnifying glass forward
  ctx.beginPath();
  ctx.moveTo(10, -25);
  ctx.lineTo(38, -5);
  ctx.stroke();

  // Magnifying Glass
  ctx.beginPath();
  ctx.arc(46, -3, 14, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(215, 235, 255, 0.4)';
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#111';
  ctx.stroke();

  // Head
  ctx.beginPath();
  ctx.arc(0, -56, 22, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#111';
  ctx.stroke();

  // Face looking down focused
  ctx.fillStyle = '#111';
  ctx.beginPath();
  ctx.arc(6, -56, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // Villager in straw hat leaning forward curiously
  drawStickVillager(ctx, {
    x: width * 0.62,
    y: height * 0.72,
    scale: 1.35,
    view: 'three-quarter',
    expression: 'neutral',
    pose: 'standing',
  });
}

// ==================== SCENE 13 ====================
// Over-the-shoulder medium shot. Villager on wooden bench looking down at hand-drawn regional map on knees, tracing line from river to coast.
export function renderScene13({ ctx, width, height, sceneTime }: SceneRenderContext) {
  // Rustic room & bench background
  drawTexturedPaperBackground(ctx, width, height, '#d5cbba', '#beb3a0');

  // Wooden bench
  ctx.fillStyle = '#594432';
  ctx.fillRect(width * 0.1, height * 0.65, width * 0.8, height * 0.28);
  ctx.lineWidth = 4.0;
  ctx.strokeStyle = '#1c150e';
  ctx.strokeRect(width * 0.1, height * 0.65, width * 0.8, height * 0.28);

  // Hand-drawn Map resting on knees
  const mapX = width * 0.36;
  const mapY = height * 0.42;
  const mapW = width * 0.42;
  const mapH = height * 0.36;

  ctx.save();
  ctx.translate(mapX, mapY);
  ctx.rotate(0.04);

  // Parchment paper
  ctx.fillStyle = '#ede3cc';
  ctx.fillRect(0, 0, mapW, mapH);
  ctx.lineWidth = 3.0;
  ctx.strokeStyle = '#1a1918';
  ctx.strokeRect(0, 0, mapW, mapH);

  // Ocean coastline on right of map
  ctx.fillStyle = '#8ca2b4';
  ctx.beginPath();
  ctx.moveTo(mapW * 0.7, 0);
  ctx.quadraticCurveTo(mapW * 0.62, mapH * 0.5, mapW * 0.75, mapH);
  ctx.lineTo(mapW, mapH);
  ctx.lineTo(mapW, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Winding river line from village to coast
  ctx.strokeStyle = '#43617a';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(mapW * 0.15, mapH * 0.45);
  ctx.quadraticCurveTo(mapW * 0.35, mapH * 0.2, mapW * 0.5, mapH * 0.5);
  ctx.quadraticCurveTo(mapW * 0.58, mapH * 0.68, mapW * 0.68, mapH * 0.5);
  ctx.stroke();

  // Village marker dot
  ctx.fillStyle = '#b44637';
  ctx.beginPath();
  ctx.arc(mapW * 0.15, mapH * 0.45, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Villager stick finger tracing river to coast
  const traceProg = Math.min(1.0, sceneTime / 3.2);
  const fingerX = mapW * (0.15 + traceProg * 0.53);
  const fingerY = mapH * 0.45 + Math.sin(traceProg * Math.PI) * -15;

  ctx.beginPath();
  ctx.arc(fingerX, fingerY, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#111';
  ctx.stroke();

  ctx.restore();

  // Villager in over-the-shoulder view
  drawStickVillager(ctx, {
    x: width * 0.32,
    y: height * 0.72,
    scale: 1.6,
    view: 'three-quarter',
    expression: 'concerned',
    pose: 'sitting',
    armAction: 'trace-map',
  });
}

// ==================== SCENE 14 ====================
// Villager squats in shallow puddle lifting small silver fish into woven wicker basket.
export function renderScene14({ ctx, width, height, sceneTime }: SceneRenderContext) {
  drawTexturedPaperBackground(ctx, width, height, '#bfae95', '#a4937a');

  // Wet mud ground & puddle
  ctx.fillStyle = '#675543';
  ctx.fillRect(0, height * 0.62, width, height * 0.38);
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 3.0;
  ctx.beginPath();
  ctx.moveTo(0, height * 0.62);
  ctx.lineTo(width, height * 0.62);
  ctx.stroke();

  // Shallow puddle
  ctx.fillStyle = '#576674';
  ctx.beginPath();
  ctx.ellipse(width * 0.5, height * 0.76, 160, 42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Woven Wicker Basket
  const basketX = width * 0.68;
  const basketY = height * 0.68;
  ctx.fillStyle = '#bfa168';
  ctx.beginPath();
  ctx.ellipse(basketX, basketY, 44, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(basketX - 44, basketY, 88, 48);
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#292015';
  ctx.stroke();

  // Wicker cross-hatch lines
  ctx.lineWidth = 2.0;
  for (let b = -40; b <= 40; b += 16) {
    ctx.beginPath();
    ctx.moveTo(basketX + b, basketY);
    ctx.lineTo(basketX + b, basketY + 48);
    ctx.stroke();
  }

  // Fish already inside basket
  drawInkSilverFish(ctx, basketX - 10, basketY + 18, 0.8, -0.4, 0);

  // Fish being lifted in hands
  const liftProgress = Math.min(1.0, sceneTime / 3.0);
  const fishLiftX = width * (0.42 + liftProgress * 0.2);
  const fishLiftY = height * (0.76 - Math.sin(liftProgress * Math.PI) * 0.14);

  drawInkSilverFish(ctx, fishLiftX, fishLiftY, 1.1, Math.sin(sceneTime * 6) * 0.2, sceneTime * 4);

  // Villager squatting
  drawStickVillager(ctx, {
    x: width * 0.38,
    y: height * 0.74,
    scale: 1.45,
    view: 'three-quarter',
    expression: 'resolved',
    pose: 'crouching',
    actionProgress: liftProgress,
  });
}

// ==================== SCENE 15 ====================
// Wide closing shot. Clear sunset sky. Villager in profile at dirt road edge, looking across horizon, hands at sides.
export function renderScene15({ ctx, width, height, sceneTime }: SceneRenderContext) {
  // Pale sunset cream & soft lavender sky
  const sunsetGrad = ctx.createLinearGradient(0, 0, 0, height * 0.7);
  sunsetGrad.addColorStop(0, '#e5d7c8');
  sunsetGrad.addColorStop(0.5, '#ebd8b6');
  sunsetGrad.addColorStop(1, '#f7ead4');
  ctx.fillStyle = sunsetGrad;
  ctx.fillRect(0, 0, width, height * 0.7);

  // Low gentle evening sun
  ctx.beginPath();
  ctx.arc(width * 0.78, height * 0.44, 48, 0, Math.PI * 2);
  ctx.fillStyle = '#fce5af';
  ctx.fill();
  ctx.lineWidth = 2.0;
  ctx.strokeStyle = '#c4aa6b';
  ctx.stroke();

  // Distant serene village roofs & palm trees
  ctx.fillStyle = '#7a7667';
  ctx.beginPath();
  ctx.moveTo(0, height * 0.58);
  ctx.quadraticCurveTo(width * 0.4, height * 0.54, width, height * 0.56);
  ctx.lineTo(width, height * 0.7);
  ctx.lineTo(0, height * 0.7);
  ctx.fill();
  ctx.lineWidth = 3.0;
  ctx.strokeStyle = '#222';
  ctx.stroke();

  // Village huts silhouettes
  ctx.fillStyle = '#59554a';
  for (let i = 0; i < 4; i++) {
    const hx = width * (0.45 + i * 0.14);
    ctx.fillRect(hx, height * 0.53, 35, 24);
  }

  // Dirt road in foreground
  ctx.fillStyle = '#b3a186';
  ctx.fillRect(0, height * 0.68, width, height * 0.32);
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(0, height * 0.68);
  ctx.lineTo(width, height * 0.68);
  ctx.stroke();

  // Villager standing calmly in profile looking out across the sunset horizon
  drawStickVillager(ctx, {
    x: width * 0.28,
    y: height * 0.82,
    scale: 1.45,
    view: 'side',
    expression: 'resolved',
    pose: 'standing',
    walkProgress: sceneTime * 0.1,
  });
}

// Main Dispatcher
export function renderFilmScene(sceneId: number, renderCtx: SceneRenderContext) {
  switch (sceneId) {
    case 1: renderScene1(renderCtx); break;
    case 2: renderScene2(renderCtx); break;
    case 3: renderScene3(renderCtx); break;
    case 4: renderScene4(renderCtx); break;
    case 5: renderScene5(renderCtx); break;
    case 6: renderScene6(renderCtx); break;
    case 7: renderScene7(renderCtx); break;
    case 8: renderScene8(renderCtx); break;
    case 9: renderScene9(renderCtx); break;
    case 10: renderScene10(renderCtx); break;
    case 11: renderScene11(renderCtx); break;
    case 12: renderScene12(renderCtx); break;
    case 13: renderScene13(renderCtx); break;
    case 14: renderScene14(renderCtx); break;
    case 15: renderScene15(renderCtx); break;
    default: renderScene1(renderCtx); break;
  }

  // Always apply authentic Hand-Inked Texture Overlay (scanlines + dark vignette + paper grain)
  drawFilmTextureOverlay(renderCtx.ctx, renderCtx.width, renderCtx.height);
}
