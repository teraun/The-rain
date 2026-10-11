import React, { useState, useEffect, useRef } from 'react';
import { FilmPlayer } from './components/FilmPlayer';
import { Timeline } from './components/Timeline';
import { PromptViewer } from './components/PromptViewer';
import { CharacterSheetModal } from './components/CharacterSheetModal';
import { FILM_SCENES, TOTAL_FILM_DURATION, getSceneForTime, getSceneIndexForTime } from './data/scenes';
import { PlaybackSpeed } from './types/film';
import { diegeticAudio } from './audio/diegeticSynth';
import { Film, UserCheck, Layers, Sparkles, Volume2, Info } from 'lucide-react';

export default function App() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.75);
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [isCharSheetOpen, setIsCharSheetOpen] = useState<boolean>(false);

  const lastFrameTimeRef = useRef<number>(performance.now());
  const animFrameRef = useRef<number | null>(null);

  const currentSceneIndex = getSceneIndexForTime(currentTime);
  const currentScene = getSceneForTime(currentTime);

  // Playback Loop
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    lastFrameTimeRef.current = performance.now();

    const updatePlayhead = (now: number) => {
      const deltaSec = (now - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = now;

      setCurrentTime((prev) => {
        const next = prev + deltaSec * speed;
        if (next >= TOTAL_FILM_DURATION) {
          if (isLooping) {
            return 0;
          } else {
            setIsPlaying(false);
            return TOTAL_FILM_DURATION;
          }
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(updatePlayhead);
    };

    animFrameRef.current = requestAnimationFrame(updatePlayhead);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, speed, isLooping]);

  const handlePlayPause = () => {
    diegeticAudio.init();
    setIsPlaying((prev) => !prev);
  };

  const handleSeek = (time: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_FILM_DURATION, time));
    setCurrentTime(clamped);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handlePrevScene = () => {
    const prevIdx = Math.max(0, currentSceneIndex - 1);
    setCurrentTime(prevIdx * 4.0);
  };

  const handleNextScene = () => {
    const nextIdx = Math.min(FILM_SCENES.length - 1, currentSceneIndex + 1);
    setCurrentTime(nextIdx * 4.0);
  };

  const handleToggleMute = () => {
    const muted = diegeticAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    diegeticAudio.setVolume(vol);
    if (vol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleSelectSceneById = (id: number) => {
    const scene = FILM_SCENES.find((s) => s.id === id);
    if (scene) {
      setCurrentTime(scene.startTime);
    }
  };

  return (
    <div className="min-h-screen bg-[#13110f] text-[#ded6c9] font-sans flex flex-col selection:bg-[#b44637] selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-[#2d2822] bg-[#1a1714] px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#b44637] flex items-center justify-center text-white shadow-md">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-[#f5ebd9] tracking-tight">
              The Rain of Silver Fish
            </h1>
            <p className="text-xs text-[#9d9080] font-mono">
              60s Hand-Inked 2D Animated Film • 15 Clips (4.0s Each) • 16:9
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setIsCharSheetOpen(true)}
            className="px-3.5 py-1.5 rounded-lg bg-[#27221d] hover:bg-[#383129] border border-[#3f372e] text-xs font-semibold text-[#f0e5d4] flex items-center gap-1.5 transition-all shadow-sm"
          >
            <UserCheck className="w-4 h-4 text-[#b44637]" />
            <span>Character Sheet Reference</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Cinema Player & Timeline */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* 16:9 Film Player Canvas */}
          <FilmPlayer
            currentTime={currentTime}
            isPlaying={isPlaying}
            isMuted={isMuted}
            onOpenCharacterSheet={() => setIsCharSheetOpen(true)}
            onTogglePlay={handlePlayPause}
          />

          {/* Interactive Timeline Scrubber (0s to 60s) */}
          <Timeline
            currentTime={currentTime}
            isPlaying={isPlaying}
            isMuted={isMuted}
            volume={volume}
            speed={speed}
            isLooping={isLooping}
            onPlayPause={handlePlayPause}
            onSeek={handleSeek}
            onRestart={handleRestart}
            onPrevScene={handlePrevScene}
            onNextScene={handleNextScene}
            onToggleMute={handleToggleMute}
            onVolumeChange={handleVolumeChange}
            onSpeedChange={setSpeed}
            onToggleLoop={() => setIsLooping(!isLooping)}
          />

          {/* Film Visual Style & Continuity Card */}
          <div className="bg-[#1c1916] border border-[#332c25] rounded-xl p-4 text-xs text-[#a99c8b] space-y-2">
            <div className="flex items-center justify-between text-[#d8cab7] font-bold">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#b44637]" />
                Film Continuity & Production Specs
              </span>
              <span className="text-[10px] font-mono text-[#8c8071]">
                Fixed Master Style
              </span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every clip features identical <strong>thick rough black ink outlines</strong>, a <strong>desaturated earthy palette</strong> (warm cream, tan, sage, slate), fine <strong>horizontal scanlines</strong>, <strong>paper-grain texture overlay</strong>, and a soft <strong>dark vignette</strong>, ensuring all 15 clips cut together seamlessly as one 60-second film.
            </p>
          </div>
        </div>

        {/* Right 5 Columns: Scene Prompts & Script Inspector */}
        <div className="lg:col-span-5 flex flex-col">
          <PromptViewer
            currentSceneId={currentScene?.id ?? 1}
            onSelectScene={handleSelectSceneById}
          />
        </div>
      </main>

      {/* Character Sheet Reference Modal */}
      <CharacterSheetModal
        isOpen={isCharSheetOpen}
        onClose={() => setIsCharSheetOpen(false)}
      />
    </div>
  );
}
