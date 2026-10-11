import React from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Volume2, VolumeX, Repeat } from 'lucide-react';
import { FILM_SCENES, TOTAL_FILM_DURATION, getSceneForTime, getSceneIndexForTime } from '../data/scenes';
import { PlaybackSpeed } from '../types/film';

interface TimelineProps {
  currentTime: number;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  speed: PlaybackSpeed;
  isLooping: boolean;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onRestart: () => void;
  onPrevScene: () => void;
  onNextScene: () => void;
  onToggleMute: () => void;
  onVolumeChange: (vol: number) => void;
  onSpeedChange: (speed: PlaybackSpeed) => void;
  onToggleLoop: () => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  currentTime,
  isPlaying,
  isMuted,
  volume,
  speed,
  isLooping,
  onPlayPause,
  onSeek,
  onRestart,
  onPrevScene,
  onNextScene,
  onToggleMute,
  onVolumeChange,
  onSpeedChange,
  onToggleLoop,
}) => {
  const currentSceneIndex = getSceneIndexForTime(currentTime);
  const currentScene = getSceneForTime(currentTime);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(parseFloat(e.target.value));
  };

  return (
    <div className="bg-[#24211e] border border-[#3d3732] rounded-xl p-4 shadow-xl text-[#ded6c9]">
      {/* 15 Scene Markers Bar */}
      <div className="relative mb-3">
        {/* Scrubber Track */}
        <div className="relative h-4 bg-[#181614] rounded-lg overflow-hidden flex border border-[#3d3732]">
          {FILM_SCENES.map((scene, idx) => {
            const isCurrent = idx === currentSceneIndex;
            const isPassed = currentTime > (idx + 1) * 4.0;
            return (
              <button
                key={scene.id}
                onClick={() => onSeek(idx * 4.0)}
                title={`Jump to ${scene.title}`}
                className={`flex-1 h-full border-r border-[#2d2823] transition-all relative group ${
                  isCurrent
                    ? 'bg-[#b44637]/35 ring-1 ring-[#b44637] inset-0'
                    : isPassed
                    ? 'bg-[#3d3732]'
                    : 'bg-[#181614] hover:bg-[#2c2621]'
                }`}
              >
                <span className="sr-only">{scene.title}</span>
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold text-[#b5a896] group-hover:text-white">
                  {scene.id}
                </span>
              </button>
            );
          })}

          {/* Progress fill */}
          <div
            className="absolute top-0 bottom-0 left-0 bg-[#b44637]/40 pointer-events-none transition-all duration-75"
            style={{ width: `${(currentTime / TOTAL_FILM_DURATION) * 100}%` }}
          />

          {/* Playhead thumb indicator */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#f4ebd0] shadow-md pointer-events-none transition-all duration-75"
            style={{ left: `${(currentTime / TOTAL_FILM_DURATION) * 100}%` }}
          />
        </div>

        {/* Input Range Slider overlay for fine dragging */}
        <input
          type="range"
          min="0"
          max={TOTAL_FILM_DURATION}
          step="0.05"
          value={currentTime}
          onChange={handleScrubberChange}
          aria-label="Timeline Scrubber"
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-4"
        />
      </div>

      {/* Primary Timeline Controls & Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Left: Playback buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onRestart}
            title="Restart Film"
            className="p-2 rounded-lg bg-[#2f2b26] hover:bg-[#3d3732] text-[#c9bfae] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onPrevScene}
            title="Previous Scene (4s back)"
            className="p-2 rounded-lg bg-[#2f2b26] hover:bg-[#3d3732] text-[#c9bfae] transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={onPlayPause}
            title={isPlaying ? "Pause" : "Play Film"}
            className="px-4 py-2 rounded-lg bg-[#b44637] hover:bg-[#97382c] text-white font-semibold flex items-center space-x-1.5 shadow-md transition-all active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span className="text-xs">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span className="text-xs">Play 60s Film</span>
              </>
            )}
          </button>
          <button
            onClick={onNextScene}
            title="Next Scene (4s forward)"
            className="p-2 rounded-lg bg-[#2f2b26] hover:bg-[#3d3732] text-[#c9bfae] transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleLoop}
            title={isLooping ? "Loop On" : "Loop Off"}
            className={`p-2 rounded-lg transition-colors ${
              isLooping ? 'bg-[#b44637]/30 text-[#e89b8f]' : 'bg-[#2f2b26] text-[#8e8477]'
            }`}
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Current Scene Title & Timecode */}
        <div className="flex flex-col items-center justify-center text-center px-2">
          <div className="text-xs font-mono font-medium text-[#c4b6a1]">
            <span className="text-[#e29385] font-bold">Scene {currentScene?.id ?? 1} of 15:</span> {currentScene?.title ? currentScene.title.split(': ')[1] : ''}
          </div>
          <div className="text-[11px] font-mono text-[#8a7f72] flex items-center gap-2">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>01:00.0</span>
            <span className="bg-[#1b1917] px-1.5 py-0.5 rounded text-[10px] text-[#c5b8a5]">
              {(currentTime % 4.0).toFixed(1)}s in scene
            </span>
          </div>
        </div>

        {/* Right: Audio Volume & Speed */}
        <div className="flex items-center space-x-3">
          {/* Speed Pills */}
          <div className="flex items-center bg-[#1b1917] rounded-lg p-0.5 border border-[#38322c]">
            {([0.5, 1, 1.5, 2] as PlaybackSpeed[]).map((spd) => (
              <button
                key={spd}
                onClick={() => onSpeedChange(spd)}
                className={`px-2 py-1 text-[11px] font-mono rounded transition-colors ${
                  speed === spd
                    ? 'bg-[#b44637] text-white font-bold'
                    : 'text-[#8a7f72] hover:text-[#ded6c9]'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-1.5 bg-[#1b1917] px-2 py-1 rounded-lg border border-[#38322c]">
            <button
              onClick={onToggleMute}
              title={isMuted ? "Unmute Diegetic Audio" : "Mute Diegetic Audio"}
              className="text-[#c9bfae] hover:text-white"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-[#e27365]" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-16 h-1.5 accent-[#b44637] cursor-pointer"
              title="Diegetic Ambient Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
