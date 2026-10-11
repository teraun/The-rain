import React, { useRef, useEffect, useState } from 'react';
import { Maximize2, Minimize2, Camera, Sliders, Volume2, VolumeX } from 'lucide-react';
import { FILM_SCENES, getSceneForTime } from '../data/scenes';
import { renderFilmScene } from '../engine/sceneRenderers';
import { diegeticAudio } from '../audio/diegeticSynth';

interface FilmPlayerProps {
  currentTime: number;
  isPlaying: boolean;
  isMuted: boolean;
  onOpenCharacterSheet: () => void;
  onTogglePlay: () => void;
}

export const FilmPlayer: React.FC<FilmPlayerProps> = ({
  currentTime,
  isPlaying,
  isMuted,
  onOpenCharacterSheet,
  onTogglePlay,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [snapshotFeedback, setSnapshotFeedback] = useState<boolean>(false);

  const currentScene = getSceneForTime(currentTime);
  const sceneTime = ((currentTime % 4.0) + 4.0) % 4.0;

  // Render canvas frame whenever currentTime changes or animates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw active scene
    renderFilmScene(currentScene?.id ?? 1, {
      ctx,
      width: canvas.width,
      height: canvas.height,
      sceneTime,
      globalTime: currentTime,
    });
  }, [currentTime, currentScene?.id, sceneTime, showOverlays]);

  // Audio sync
  useEffect(() => {
    if (isPlaying && !isMuted) {
      diegeticAudio.init();
      diegeticAudio.playSceneSound(currentScene?.id ?? 1);
    } else {
      diegeticAudio.stop();
    }
  }, [isPlaying, isMuted, currentScene?.id]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const takeSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `scene_${currentScene?.id ?? 1}_frame_${currentTime.toFixed(1)}s.png`;
    a.click();
    setSnapshotFeedback(true);
    setTimeout(() => setSnapshotFeedback(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-[#141210] rounded-2xl overflow-hidden border border-[#3e3730] shadow-2xl flex flex-col ${
        isFullscreen ? 'w-screen h-screen rounded-none border-none' : ''
      }`}
    >
      {/* 16:9 Cinema Aspect Ratio Viewport */}
      <div
        className="relative w-full aspect-video bg-[#1a1714] cursor-pointer group flex items-center justify-center overflow-hidden"
        onClick={onTogglePlay}
      >
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="w-full h-full object-contain block select-none"
        />

        {/* Top Floating Cinema HUD */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 via-black/30 to-transparent flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center space-x-3 pointer-events-auto">
            <span className="bg-[#b44637] text-white font-mono font-bold text-xs px-2.5 py-1 rounded shadow">
              Scene {currentScene?.id ?? 1} / 15
            </span>
            <div className="text-white drop-shadow">
              <h2 className="text-sm font-bold tracking-wide">{currentScene?.title ?? 'Scene'}</h2>
              <span className="text-[11px] font-mono text-zinc-300">
                {currentScene?.cameraShot ?? ''}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                takeSnapshot();
              }}
              title="Export high-res 16:9 PNG frame"
              className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-white text-xs font-medium flex items-center gap-1.5 backdrop-blur-md border border-white/20 transition-all"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{snapshotFeedback ? 'Saved!' : 'Snapshot Frame'}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenCharacterSheet();
              }}
              title="Inspect Stick Figure Villager Character Sheet"
              className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-[#f5ebd9] text-xs font-medium backdrop-blur-md border border-white/20 transition-all"
            >
              Character Sheet
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              className="p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Bottom Floating Subtitle / Cue Card */}
        <div className="absolute bottom-4 left-6 right-6 pointer-events-none flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/75 backdrop-blur-md text-[#eedfc8] text-xs px-4 py-2 rounded-xl border border-white/15 max-w-xl text-center shadow-lg">
            <span className="text-[#e29385] font-semibold">Action:</span> {currentScene?.visualSummary ?? ''}
            <div className="text-[10px] text-zinc-400 mt-0.5 font-mono">
              Ambient Diegetic: {currentScene?.audioDescription ?? ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
