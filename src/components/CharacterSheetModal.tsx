import React, { useRef, useEffect, useState } from 'react';
import { X, Copy, Check, Eye } from 'lucide-react';
import { drawStickVillager } from '../engine/characterRenderer';

interface CharacterSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterSheetModal: React.FC<CharacterSheetModalProps> = ({ isOpen, onClose }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [previewPose, setPreviewPose] = useState<'standing' | 'walking' | 'sitting' | 'looking-up' | 'turning-away'>('walking');
  const [previewExpr, setPreviewExpr] = useState<'neutral' | 'concerned' | 'surprised' | 'weary' | 'resolved'>('neutral');
  const [previewView, setPreviewView] = useState<'front' | 'three-quarter' | 'side' | 'back'>('three-quarter');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Palette tokens
  const palette = [
    { name: 'Straw Hat', hex: '#C6AA73', role: 'Wide-brimmed hat with band' },
    { name: 'Shirt', hex: '#B44637', role: 'Brick-red long-sleeved shirt' },
    { name: 'Trousers', hex: '#32445A', role: 'Navy blue rolled-up trousers' },
    { name: 'Sandals', hex: '#6D4527', role: 'Brown strapped sandals' },
    { name: 'Head & Skin', hex: '#FFFFFF', role: 'Round white head & bare feet' },
    { name: 'Ink Outlines', hex: '#181716', role: 'Thick rough black ink outlines' },
    { name: 'Parchment', hex: '#EDE5D4', role: 'Warm desaturated paper base' },
    { name: 'Silver Fish', hex: '#B0B8C2', role: 'Glistening wet silver scales' },
  ];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const render = () => {
      step += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Warm paper background
      ctx.fillStyle = '#ede5d4';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Scanline pattern
      ctx.fillStyle = 'rgba(20, 15, 10, 0.04)';
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 1.2);
      }

      // Draw character
      drawStickVillager(ctx, {
        x: canvas.width / 2,
        y: canvas.height * 0.76,
        scale: 1.6,
        view: previewView,
        expression: previewExpr,
        pose: previewPose,
        walkProgress: step,
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isOpen, previewPose, previewExpr, previewView]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#24211e] border border-[#4a423a] text-[#ded6c9] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3d3732] bg-[#1d1a17]">
          <div>
            <h2 className="text-lg font-bold text-[#f5ebd9] flex items-center gap-2">
              <span>Stick Figure Villager</span>
              <span className="text-xs bg-[#b44637] text-white px-2 py-0.5 rounded font-mono font-normal">
                Character Reference Sheet
              </span>
            </h2>
            <p className="text-xs text-[#9d9283] mt-0.5">
              100% visual consistency reference across all 15 scenes of the film.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#2e2a25] hover:bg-[#3d3732] text-[#c9bfae] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top: Live Interactive Character Viewport + Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#1a1714] p-5 rounded-xl border border-[#38322c]">
            {/* Left Canvas Preview */}
            <div className="flex flex-col items-center">
              <div className="relative border-2 border-[#453c33] rounded-lg overflow-hidden shadow-inner">
                <canvas
                  ref={canvasRef}
                  width={340}
                  height={320}
                  className="block bg-[#ede5d4]"
                />
                <div className="absolute top-2 left-2 bg-[#181614]/80 text-[#cbbfae] px-2 py-0.5 rounded text-[10px] font-mono">
                  16:9 Inked Character Model
                </div>
              </div>
              <span className="text-[11px] text-[#8c8172] mt-2 font-mono">
                {previewView.toUpperCase()} • {previewExpr.toUpperCase()} • {previewPose.toUpperCase()}
              </span>
            </div>

            {/* Right: Interactive Configuration Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#c4b5a0] block mb-1.5 uppercase tracking-wide">
                  1. View Angle
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['front', 'three-quarter', 'side', 'back'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setPreviewView(v)}
                      className={`px-3 py-1.5 text-xs rounded font-medium capitalize transition-all ${
                        previewView === v
                          ? 'bg-[#b44637] text-white font-bold'
                          : 'bg-[#292420] text-[#a89d8d] hover:bg-[#36302a]'
                      }`}
                    >
                      {v === 'three-quarter' ? 'Three-Quarter' : v} View
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#c4b5a0] block mb-1.5 uppercase tracking-wide">
                  2. Expression
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(['neutral', 'concerned', 'surprised', 'weary', 'resolved'] as const).map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setPreviewExpr(ex)}
                      className={`px-2.5 py-1 text-xs rounded capitalize transition-all ${
                        previewExpr === ex
                          ? 'bg-[#b44637] text-white font-bold'
                          : 'bg-[#292420] text-[#a89d8d] hover:bg-[#36302a]'
                      }`}
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#c4b5a0] block mb-1.5 uppercase tracking-wide">
                  3. Key Pose
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(['standing', 'walking', 'sitting', 'looking-up', 'turning-away'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPreviewPose(p)}
                      className={`px-2.5 py-1 text-xs rounded capitalize transition-all ${
                        previewPose === p
                          ? 'bg-[#b44637] text-white font-bold'
                          : 'bg-[#292420] text-[#a89d8d] hover:bg-[#36302a]'
                      }`}
                    >
                      {p.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Color Palette Specification */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#bcae9c] mb-3">
              Fixed Film Palette Tokens (Consistent across scenes 1–15)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {palette.map((item) => (
                <div
                  key={item.hex}
                  onClick={() => handleCopyHex(item.hex)}
                  className="bg-[#1b1815] border border-[#38312a] hover:border-[#b44637] p-2.5 rounded-xl cursor-pointer transition-all hover:scale-105 group"
                >
                  <div className="flex items-center space-x-2.5 mb-1.5">
                    <div
                      className="w-6 h-6 rounded-md shadow border border-black/20"
                      style={{ backgroundColor: item.hex }}
                    />
                    <span className="text-xs font-semibold text-[#f0e6d6] group-hover:text-white">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8c8071]">
                    <span>{item.hex}</span>
                    {copiedHex === item.hex ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <p className="text-[10px] text-[#786e61] mt-1 line-clamp-1">
                    {item.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Character Identity Rules */}
          <div className="bg-[#1d1a17] border border-[#3b342d] rounded-xl p-4 text-xs text-[#a89c8c] space-y-2">
            <h4 className="font-bold text-[#eedfc8] flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#b44637]" />
              Invariable Character Continuity Rules
            </h4>
            <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
              <li><strong>Head:</strong> Large round white head, small vertical oval black eyes, thin eyebrows, loose ink hair strands.</li>
              <li><strong>Headwear:</strong> Wide-brimmed woven straw hat (#C6AA73) with darker hat band.</li>
              <li><strong>Top:</strong> Brick-red long-sleeved shirt (#B44637) with loose relaxed fit and shallow V-neck notch.</li>
              <li><strong>Bottom:</strong> Navy blue trousers (#32445A) rolled up at the ankles exposing white shins.</li>
              <li><strong>Footwear:</strong> Brown leather sandals (#6D4527) with front foot strap.</li>
              <li><strong>Post-Production:</strong> Thick rough black ink outlines (#181716), fine horizontal scanlines, paper-grain overlay, and dark corner vignette.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#3d3732] bg-[#1d1a17] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#b44637] hover:bg-[#97382c] text-white text-xs font-semibold"
          >
            Close Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
