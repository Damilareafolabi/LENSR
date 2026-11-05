import React from 'react';
import { sounds } from '../../services/soundEffects';
import { 
  Camera, 
  Shield, 
  Code, 
  Sliders, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  BookOpen, 
  Laptop, 
  Smile, 
  Compass,
  Layers,
  Heart,
  Award,
  Video,
  Eye,
  Maximize2,
  Tv
} from 'lucide-react';

interface UniversityHubProps {
  onOpenVirtualCamera: () => void;
  onOpenPhotoshop: () => void;
  onOpenDiscovery: () => void;
  onOpenBlog: () => void;
  onOpenLaptop: () => void;
}

export const UniversityHub: React.FC<UniversityHubProps> = ({
  onOpenVirtualCamera,
  onOpenPhotoshop,
  onOpenDiscovery,
  onOpenBlog,
  onOpenLaptop
}) => {
  return (
    <div className="space-y-12 select-none">
      
      {/* 1. HERO SECTION WITH INTERACTIVE CLICKABLE DSLR CAMERA */}
      <section className="bg-[#FAF7F0] pt-8 pb-10 px-6 sm:px-10 rounded-3xl border-2 border-[#E5DFD3] shadow-sm relative overflow-hidden">
        
        {/* Subtle decorative sticker note */}
        <div className="hidden xl:block absolute top-6 right-8 bg-[#FEF9C3] p-4 rounded-2xl border border-[#FDE047] shadow-sticker rotate-2 max-w-[200px] z-20">
          <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider block mb-1">
            TODAY'S TINY WIN 😊
          </span>
          <p className="font-heading font-bold text-xs text-amber-950 leading-snug">
            I framed my first portrait with creamy f/1.8 bokeh without spending a dime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Brand Copy & Actions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-500 font-bold text-sm">✦</span>
              <span className="text-xs font-extrabold tracking-widest text-[#5E4DB2] uppercase">
                YOUR FREE, PRACTICAL LEARNING UNIVERSITY
              </span>
            </div>

            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#1E1E24] tracking-tight leading-[1.08]">
              Learn a skill.<br />Build a future.
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-xl">
              Explore professional photography, filmmaking, Photoshop retouching, and cybersecurity—taught with real university masterclasses, plain English, and practical virtual equipment anyone can hold.
            </p>

            <div className="pt-2 space-y-4">
              <span className="text-xs font-semibold text-[#1E1E24] block">
                Free to learn. Zero gear barrier. Competing with the world’s top academies.
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => { sounds.playShutterClick(); onOpenVirtualCamera(); }}
                  className="px-6 py-3.5 bg-[#5E4DB2] hover:bg-[#4E3EA1] active:scale-95 text-white font-heading font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-yellow-300" />
                  <span>Take a Camera (Hold in 3D AR) ↓</span>
                </button>

                <button
                  onClick={() => { sounds.playDialTick(); onOpenPhotoshop(); }}
                  className="px-6 py-3.5 bg-white hover:bg-[#F2ECE1] text-[#1E1E24] border-2 border-[#DCD5C5] font-heading font-bold text-sm rounded-2xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sliders className="w-4 h-4 text-[#007ACC]" />
                  <span>Photoshop Masterclass ↗</span>
                </button>

                <button
                  onClick={() => { sounds.playDialTick(); onOpenDiscovery(); }}
                  className="px-3 py-3 text-xs font-bold text-[#5E4DB2] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Browse 70+ Auto Courses →</span>
                </button>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-2 pt-3 text-xs text-[#6B6B78]">
              <span className="flex items-center gap-1 text-base">😊 🪴 💻</span>
              <span>Small steps for curious humans. That's you.</span>
            </div>
          </div>

          {/* Right Column: CLICKABLE PHYSICAL DSLR CAMERA CARD (As requested by user!) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div 
              onClick={() => {
                sounds.playShutterClick();
                onOpenVirtualCamera();
              }}
              className="group relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#2B2B32] via-[#1E1E23] to-[#141418] p-5 border-3 border-[#3D3D48] shadow-2xl hover:shadow-[0_20px_50px_rgba(94,77,178,0.35)] transition-all duration-300 hover:scale-[1.03] cursor-pointer"
              title="Click this DSLR camera to hold it and shoot in AR!"
            >
              {/* Top plate badge */}
              <div className="flex items-center justify-between text-xs text-zinc-300 pb-2 mb-2 border-b border-zinc-700/80">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>PLAINLY VIRTUAL OPTICS</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-md">
                  CLICK TO HOLD
                </span>
              </div>

              {/* Realistic DSLR Camera Image Asset */}
              <div className="relative rounded-2xl overflow-hidden bg-black/40 p-2 flex items-center justify-center">
                <img 
                  src="/public/assets/aistudio/images_18a9a6c5.jpg" 
                  alt="Professional DSLR Camera" 
                  className="w-full h-56 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                />

                {/* Hotspot callout: Shutter */}
                <div className="absolute top-6 left-12 bg-black/75 backdrop-blur-xs border border-white/20 px-2 py-0.5 rounded-lg text-[9px] text-white flex items-center gap-1 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span>Shutter Button</span>
                </div>

                {/* Hotspot callout: Lens */}
                <div className="absolute bottom-6 right-8 bg-black/75 backdrop-blur-xs border border-white/20 px-2 py-0.5 rounded-lg text-[9px] text-white flex items-center gap-1 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>50mm f/1.8 Iris</span>
                </div>
              </div>

              {/* Action Banner */}
              <div className="mt-3 bg-gradient-to-r from-[#5E4DB2] to-[#483994] p-3 rounded-2xl text-white flex items-center justify-between group-hover:from-indigo-600 group-hover:to-purple-700 transition-colors shadow-sm">
                <div>
                  <h4 className="font-heading font-black text-xs uppercase tracking-wider">
                    Click to Pick Up This Camera
                  </h4>
                  <p className="text-[10px] text-zinc-200 mt-0.5">
                    Opens AR Viewfinder • Snap real people & practice framing
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

            </div>

            <span className="text-[11px] text-[#6B6B78] mt-2 font-medium text-center">
              👆 Click the camera above to step directly into the optical AR simulator
            </span>

          </div>

        </div>

        {/* Feature Banner across bottom of Hero */}
        <div className="mt-8 pt-5 border-t border-[#EAE5D9] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-[#52525B]">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold">✿</span>
            <span>LEARN AT YOUR OWN PACE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-indigo-600 font-bold">✿</span>
            <span>100% FREE ACCREDITED PRACTICALS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-600 font-bold">✿</span>
            <span>NO EXPENSIVE GEAR REQUIRED</span>
          </div>
        </div>

      </section>

      {/* 2. SPECIAL ACCESSIBILITY CALLOUT: "CAN'T AFFORD A CAMERA? CLICK THIS DSLR" */}
      <section className="bg-gradient-to-r from-zinc-900 to-[#18181B] text-white p-6 sm:p-8 rounded-3xl border-2 border-zinc-700 shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 font-bold text-[10px] uppercase tracking-wider">
                Democratized Creative Education
              </span>
              <span className="text-xs text-zinc-400">Competing with World Academies</span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white leading-snug">
              <span className="text-amber-400">Photography:</span> You don't need to own a camera to start. Our virtual camera lets you capture, edit and save your pictures to any device — all in one platform.
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
              Light, visual emotion, and composition live in your mind, not a $3,500 plastic body. Use our virtual DSLR to point your live phone or webcam at real people, dial f/1.8 for creamy bokeh, send your shot straight to Photoshop for 1-click background removal and color grading, then save your high-res picture to any device.
            </p>

            {/* 3-Step Seamless Workflow */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-xs">
                <span className="text-amber-400 font-bold block text-[11px]">1. CAPTURE</span>
                <span className="text-zinc-200 text-[11px]">AR 3D Camera • Live webcam or scenes</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-xs">
                <span className="text-sky-400 font-bold block text-[11px]">2. EDIT</span>
                <span className="text-zinc-200 text-[11px]">Photoshop Studio • 1-click AI removal</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-xs">
                <span className="text-emerald-400 font-bold block text-[11px]">3. SAVE TO DEVICE</span>
                <span className="text-zinc-200 text-[11px]">Instant download to phone, tablet & PC</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => { sounds.playShutterClick(); onOpenVirtualCamera(); }}
                className="px-5 py-3 rounded-2xl bg-[#5E4DB2] hover:bg-[#4E3EA1] text-white font-heading font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-yellow-300" />
                <span>1. Capture with Virtual Camera (AR) →</span>
              </button>

              <button
                onClick={() => { sounds.playDialTick(); onOpenPhotoshop(); }}
                className="px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-heading font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-[#38bdf8]" />
                <span>2. Edit in Photoshop Studio →</span>
              </button>
            </div>
          </div>

          {/* Mini Interactive Camera Trigger */}
          <div className="md:col-span-4 flex justify-center">
            <div 
              onClick={() => { sounds.playShutterClick(); onOpenVirtualCamera(); }}
              className="bg-black/60 p-4 rounded-2xl border border-zinc-700 text-center space-y-2 cursor-pointer hover:border-amber-400 transition-colors group"
            >
              <img 
                src="/public/assets/aistudio/images_18a9a6c5.jpg" 
                alt="Hold Virtual DSLR" 
                className="w-36 h-28 object-contain mx-auto group-hover:scale-105 transition-transform"
              />
              <span className="text-[11px] font-mono text-amber-400 font-bold block">
                [ 📷 CLICK TO SNAP PEOPLE IN AR ]
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. PRACTICAL SKILL TRACKS & UNIVERSITY MASTERCLASSES */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#5E4DB2]">
              STRUCTURED UNIVERSITY MASTERCLASSES
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#1E1E24] mt-1">
              Real Teaching Format with Practical Workbenches
            </h2>
          </div>
          <p className="text-xs text-[#6B6B78] max-w-sm">
            Not shallow overviews. Step-by-step masterclasses with verified AI grading, interactive sandboxes, and professional certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Class 1: Virtual 3D Photography */}
          <div className="bg-white p-6 rounded-3xl border-2 border-[#E5DFD3] shadow-card-hover flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#5E4DB2]/10 text-[#5E4DB2] flex items-center justify-center font-bold">
                <Camera className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#5E4DB2] uppercase tracking-wider">
                  Complete Photographic Suite
                </span>
                <h3 className="font-heading font-bold text-xl text-[#1E1E24] group-hover:text-[#5E4DB2] transition-colors">
                  Digital Photography & Virtual DSLR
                </h3>
              </div>

              <p className="text-xs text-[#52525B] leading-relaxed font-medium">
                <strong>Photography:</strong> You don't need to own a camera to start. Our virtual camera lets you capture, edit and save your pictures to any device — all in one platform.
              </p>

              <div className="bg-[#FAF7F0] p-3 rounded-xl border border-[#E2DDD3] text-xs space-y-1">
                <strong className="text-[#1E1E24] block">In plain English:</strong>
                <p className="text-zinc-600">How to make your friends look stunning without spending thousands on gear.</p>
              </div>
            </div>

            <button
              onClick={() => { sounds.playShutterClick(); onOpenVirtualCamera(); }}
              className="mt-5 w-full py-2.5 px-4 bg-[#5E4DB2] hover:bg-[#4E3EA1] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <span>Hold Camera & Practice →</span>
            </button>
          </div>

          {/* Class 2: Photoshop Retouching Studio */}
          <div className="bg-white p-6 rounded-3xl border-2 border-[#E5DFD3] shadow-card-hover flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#007ACC]/10 text-[#007ACC] flex items-center justify-center font-bold">
                <Sliders className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#007ACC] uppercase tracking-wider">
                  Real Editorial Software
                </span>
                <h3 className="font-heading font-bold text-xl text-[#1E1E24] group-hover:text-[#007ACC] transition-colors">
                  Photoshop Editorial Retouching
                </h3>
              </div>

              <p className="text-xs text-[#52525B] leading-relaxed">
                Work in an authentic Photoshop editing suite. Master Frequency Separation for pristine skin texture, Dodge & Burn portrait contouring, and Vogue melanin color grading.
              </p>

              <div className="bg-[#FAF7F0] p-3 rounded-xl border border-[#E2DDD3] text-xs space-y-1">
                <strong className="text-[#1E1E24] block">In plain English:</strong>
                <p className="text-zinc-600">Digital makeup and lighting polish that keeps authentic skin pores 100% natural.</p>
              </div>
            </div>

            <button
              onClick={() => { sounds.playDialTick(); onOpenPhotoshop(); }}
              className="mt-5 w-full py-2.5 px-4 bg-[#007ACC] hover:bg-[#0062A3] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <span>Launch Photoshop Studio →</span>
            </button>
          </div>

          {/* Class 3: Cinematography & Filmmaking */}
          <div className="bg-white p-6 rounded-3xl border-2 border-[#E5DFD3] shadow-card-hover flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Tv className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                  Hollywood Filmmaking
                </span>
                <h3 className="font-heading font-bold text-xl text-[#1E1E24] group-hover:text-amber-600 transition-colors">
                  Cinematography & 2.39:1 Framing
                </h3>
              </div>

              <p className="text-xs text-[#52525B] leading-relaxed">
                Directing the visual frame: master three-point lighting, motivated light sources, anamorphic letterboxing, and the 180-degree shutter motion rule.
              </p>

              <div className="bg-[#FAF7F0] p-3 rounded-xl border border-[#E2DDD3] text-xs space-y-1">
                <strong className="text-[#1E1E24] block">In plain English:</strong>
                <p className="text-zinc-600">Why movies feel deep and emotional while phone video feels flat and cheap.</p>
              </div>
            </div>

            <button
              onClick={() => { sounds.playDialTick(); onOpenVirtualCamera(); }}
              className="mt-5 w-full py-2.5 px-4 bg-zinc-900 hover:bg-black text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <span>Practice Cinematic Framing →</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
