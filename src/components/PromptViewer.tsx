import React, { useState } from 'react';
import { Copy, Check, Sparkles, Filter, FileText } from 'lucide-react';
import { FILM_SCENES } from '../data/scenes';

interface PromptViewerProps {
  currentSceneId: number;
  onSelectScene: (id: number) => void;
}

export const PromptViewer: React.FC<PromptViewerProps> = ({ currentSceneId, onSelectScene }) => {
  const [condensedMode, setCondensedMode] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('');

  const handleCopySingle = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleCopyAll = () => {
    const allText = FILM_SCENES.map(s => {
      return `### Scene ${s.id}: ${s.title.split(': ')[1]} (00:${s.startTime.toString().padStart(2, '0')} - 00:${(s.startTime + 4).toString().padStart(2, '0')})\n${condensedMode ? s.condensedPrompt : s.fullPrompt}\n`;
    }).join('\n');

    navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const filteredScenes = FILM_SCENES.filter(s =>
    s.title.toLowerCase().includes(filterText.toLowerCase()) ||
    s.visualSummary.toLowerCase().includes(filterText.toLowerCase()) ||
    s.audioDescription.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="bg-[#1f1c19] border border-[#3b342e] rounded-xl p-5 shadow-xl text-[#ded6c9] flex flex-col h-full">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#352f29]">
        <div>
          <h3 className="text-base font-bold text-[#f5ecd9] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#b44637]" />
            15 Scene Prompts & Script
          </h3>
          <p className="text-xs text-[#8e8273] mt-0.5">
            15 clips • 4 seconds each • 60s total continuous film • 16:9 ratio
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5">
          {/* Condensed vs Full prompt toggle */}
          <button
            onClick={() => setCondensedMode(!condensedMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all ${
              condensedMode
                ? 'bg-[#b44637]/20 border-[#b44637] text-[#e89b8f]'
                : 'bg-[#292420] border-[#3f3830] text-[#a99e8e] hover:bg-[#352f2a]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{condensedMode ? 'Condensed Prompts (50% concise)' : 'Full Detailed Prompts'}</span>
          </button>

          {/* Copy All Button */}
          <button
            onClick={handleCopyAll}
            className="px-3 py-1.5 rounded-lg bg-[#2e2924] hover:bg-[#3d3731] border border-[#483f35] text-xs font-semibold text-[#f0e6d5] flex items-center gap-1.5 transition-colors"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">All Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy All 15</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="pt-3 pb-2 flex items-center gap-2">
        <div className="relative flex-1">
          <Filter className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#73685a]" />
          <input
            type="text"
            placeholder="Search scenes by action, audio, or setting..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full bg-[#171412] border border-[#332c25] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#dcd2c4] placeholder-[#6b6053] focus:outline-none focus:border-[#b44637]"
          />
        </div>
        <span className="text-[11px] font-mono text-[#827667]">
          {filteredScenes.length} / 15 scenes
        </span>
      </div>

      {/* Scenes List */}
      <div className="overflow-y-auto space-y-3.5 pr-1 mt-2 max-h-[520px]">
        {filteredScenes.map((scene) => {
          const isSelected = scene.id === currentSceneId;
          const promptText = condensedMode ? scene.condensedPrompt : scene.fullPrompt;

          return (
            <div
              key={scene.id}
              onClick={() => onSelectScene(scene.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#29231e] border-[#b44637] shadow-lg ring-1 ring-[#b44637]/40'
                  : 'bg-[#181614] border-[#2e2822] hover:border-[#453c33] hover:bg-[#1d1a18]'
              }`}
            >
              {/* Scene Top Info */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono font-bold ${
                    isSelected ? 'bg-[#b44637] text-white' : 'bg-[#2a241f] text-[#bcae9c]'
                  }`}>
                    {scene.id}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#ebdcc8]">
                      {scene.title}
                    </h4>
                    <span className="text-[10px] font-mono text-[#8a7e70]">
                      00:{scene.startTime.toString().padStart(2, '0')} - 00:{(scene.startTime + 4).toString().padStart(2, '0')} (4.0s) • {scene.cameraShot}
                    </span>
                  </div>
                </div>

                {/* Copy button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopySingle(scene.id, promptText);
                  }}
                  title="Copy Prompt"
                  className="p-1.5 rounded-lg bg-[#27221d] hover:bg-[#383129] text-[#bdae9c] hover:text-white transition-colors"
                >
                  {copiedId === scene.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Prompt Text Block */}
              <div className="bg-[#12100e] border border-[#26201a] rounded-lg p-2.5 text-xs text-[#cfc4b3] font-serif leading-relaxed select-text">
                {promptText}
              </div>

              {/* Audio & Palette Badges */}
              <div className="flex flex-wrap items-center gap-2 mt-2.5 text-[10px] font-mono">
                <span className="bg-[#241e19] text-[#bca891] px-2 py-0.5 rounded border border-[#382f26]">
                  Sound: {scene.audioDescription}
                </span>
                <span className="bg-[#241e19] text-[#9db3a1] px-2 py-0.5 rounded border border-[#382f26]">
                  Palette: {scene.paletteDescription}
                </span>
                {scene.characterPose.view !== 'none' && (
                  <span className="bg-[#241e19] text-[#dca69f] px-2 py-0.5 rounded border border-[#382f26]">
                    Villager: {scene.characterPose.view} • {scene.characterPose.expression}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
