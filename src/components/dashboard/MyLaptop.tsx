import React, { useState } from 'react';
import { CapturedPhoto } from '../../types';
import { sounds } from '../../services/soundEffects';
import confetti from 'canvas-confetti';
import { 
  Laptop, 
  Sparkles, 
  Camera, 
  Download, 
  Trash2, 
  Share2, 
  Trophy, 
  CheckCircle2, 
  Palette, 
  Sliders, 
  Plus, 
  Smile,
  Shield,
  Layers,
  Calendar
} from 'lucide-react';

interface MyLaptopProps {
  capturedPhotos: CapturedPhoto[];
  onOpenEditorWithPhoto?: (photoUrl: string) => void;
  onOpenVirtualCamera?: () => void;
}

export const MyLaptop: React.FC<MyLaptopProps> = ({
  capturedPhotos,
  onOpenEditorWithPhoto,
  onOpenVirtualCamera
}) => {
  const [tinyWins, setTinyWins] = useState<string[]>([
    'I framed my first portrait using the Rule of Thirds!',
    'I balanced the camera exposure meter to 0 EV without math.',
    'I tested Frequency Separation on studio portrait skin.',
    'I learned what an f-stop actually does inside the lens.'
  ]);
  const [newWinText, setNewWinText] = useState<string>('');

  const handleAddTinyWin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWinText.trim()) return;
    sounds.playSuccessChime();
    confetti({ particleCount: 30, spread: 45, origin: { y: 0.6 } });
    setTinyWins(prev => [newWinText.trim(), ...prev]);
    setNewWinText('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#FAF7F0] p-6 sm:p-8 rounded-3xl border-2 border-[#E2DDD3] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-widest text-[#5E4DB2] uppercase bg-[#5E4DB2]/10 px-3 py-1 rounded-full">
              MY PERSONAL LAPTOP
            </span>
            <span className="text-xs text-[#6B6B78]">Workspace & Learning Log</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl text-[#1E1E24]">
            My Creative Studio & Saved Pictures
          </h2>
          <p className="text-xs sm:text-sm text-[#52525B]">
            <strong>Photography:</strong> You don't need to own a camera to start. Our virtual camera lets you capture, edit and save your pictures to any device — all in one platform.
          </p>
        </div>

        <button
          onClick={() => { sounds.playShutterClick(); if (onOpenVirtualCamera) onOpenVirtualCamera(); }}
          className="px-4 py-2.5 bg-[#5E4DB2] hover:bg-[#4E3EA1] text-white font-bold text-xs rounded-2xl shadow-sm flex items-center gap-2 transition-all active:scale-95 shrink-0"
        >
          <Camera className="w-4 h-4 text-yellow-300" />
          <span>Shoot New Photo (3D AR) →</span>
        </button>
      </div>

      {/* Grid: Sticky Notes Tiny Wins + Captured Photos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Tiny Wins Yellow Sticky Note Board */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#FEF9C3] p-6 rounded-3xl border-2 border-[#FDE047] shadow-sticker relative rotate-[-0.5deg]">
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold tracking-wider text-amber-800 uppercase flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-amber-700" />
                <span>TODAY'S TINY WINS</span>
              </span>
              <span className="text-xs text-amber-800 font-bold">{tinyWins.length} celebrated</span>
            </div>

            <p className="text-xs text-amber-900 leading-relaxed mb-4">
              "Small steps for curious humans. That's you. A skill is built one tiny 5-minute win at a time."
            </p>

            {/* Wins list */}
            <div className="space-y-2 mb-4 max-h-64 overflow-y-auto pr-1">
              {tinyWins.map((win, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-amber-200/80 text-xs font-semibold text-amber-950 flex items-start gap-2 shadow-2xs"
                >
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{win}</span>
                </div>
              ))}
            </div>

            {/* Add Win Form */}
            <form onSubmit={handleAddTinyWin} className="flex gap-2">
              <input
                type="text"
                placeholder="Log a tiny win you achieved today..."
                value={newWinText}
                onChange={e => setNewWinText(e.target.value)}
                className="flex-1 bg-white/90 px-3 py-1.5 rounded-xl border border-amber-300 text-xs text-amber-950 placeholder:text-amber-700/60 focus:outline-hidden focus:border-amber-600"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Log It
              </button>
            </form>

          </div>

          {/* Quick Stats Badge */}
          <div className="bg-white p-5 rounded-3xl border-2 border-[#E5DFD3] shadow-sm space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#1E1E24] flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#5E4DB2]" />
              <span>Learning Milestones</span>
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#FAF7F0] p-3 rounded-2xl border border-[#E2DDD3]">
                <span className="text-zinc-500 block text-[11px]">Photos Framed</span>
                <strong className="text-xl font-bold text-[#5E4DB2]">{capturedPhotos.length}</strong>
              </div>
              <div className="bg-[#FAF7F0] p-3 rounded-2xl border border-[#E2DDD3]">
                <span className="text-zinc-500 block text-[11px]">Average Score</span>
                <strong className="text-xl font-bold text-emerald-600">
                  {capturedPhotos.length > 0 
                    ? Math.round(capturedPhotos.reduce((a, b) => a + b.scores.overall, 0) / capturedPhotos.length) 
                    : 94}%
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Captured Photos & Photoshop Files */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-6 rounded-3xl border-2 border-[#E5DFD3] shadow-sm space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-[#1E1E24]">
                  My Photo Roll & Retouch Projects
                </h3>
                <p className="text-xs text-[#6B6B78]">
                  Frames captured through the 3D Virtual AR Camera & ready for Photoshop
                </p>
              </div>

              <span className="text-xs font-bold text-[#5E4DB2] bg-[#5E4DB2]/10 px-2.5 py-1 rounded-full">
                {capturedPhotos.length} Captured
              </span>
            </div>

            {capturedPhotos.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-[#DCD5C5] bg-[#FAF7F0]">
                <Camera className="w-10 h-10 text-[#5E4DB2] mx-auto mb-2 opacity-60" />
                <h4 className="font-bold text-sm text-[#1E1E24]">No captured shots yet</h4>
                <p className="text-xs text-[#6B6B78] mt-1 max-w-sm mx-auto">
                  Click "Take a Camera" to hold our virtual 3D DSLR, look through the AR viewfinder, and snap your first photo!
                </p>
                <button
                  onClick={() => { sounds.playShutterClick(); if (onOpenVirtualCamera) onOpenVirtualCamera(); }}
                  className="mt-4 px-4 py-2 bg-[#5E4DB2] hover:bg-[#4E3EA1] text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Hold Camera & Shoot Now →
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {capturedPhotos.map(photo => (
                  <div
                    key={photo.id}
                    className="rounded-2xl overflow-hidden border border-[#DCD5C5] bg-zinc-950 flex flex-col justify-between group shadow-sm"
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-black">
                      <img
                        src={photo.imageDataUrl}
                        alt="Captured frame"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-black/75 px-2 py-0.5 rounded-md text-[10px] font-bold text-emerald-400">
                        {photo.scores.overall}/100 Score
                      </div>
                    </div>

                    <div className="p-3 bg-white text-xs space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                        <span>f/{photo.settings.aperture} • {photo.settings.shutterSpeed}s</span>
                        <span>ISO {photo.settings.iso}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-zinc-100">
                        <button
                          onClick={() => {
                            sounds.playDialTick();
                            if (onOpenEditorWithPhoto) onOpenEditorWithPhoto(photo.imageDataUrl);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#007ACC] hover:bg-[#0062A3] text-white font-bold text-[11px] flex items-center gap-1.5"
                        >
                          <Sliders className="w-3 h-3" />
                          <span>Edit in Photoshop</span>
                        </button>

                        <a
                          href={photo.imageDataUrl}
                          download={`plainly-capture-${photo.id}.jpg`}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1 transition-colors shadow-xs"
                          title="Save picture to this device"
                        >
                          <Download className="w-3 h-3 text-white" />
                          <span>Save to Device</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
