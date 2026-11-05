import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { CameraSettings, ARGuides, CapturedPhoto, CameraMission } from '../../types';
import { sounds } from '../../services/soundEffects';
import { 
  Camera, 
  Grid, 
  Eye, 
  Sun, 
  Sliders, 
  Check, 
  Sparkles, 
  Maximize, 
  Download, 
  RotateCw, 
  Tv, 
  Target, 
  Video, 
  VideoOff, 
  Trophy,
  ArrowRight,
  Share2,
  X,
  Volume2,
  AlertTriangle,
  RotateCcw,
  Compass,
  Play,
  Upload,
  UserCheck,
  SwitchCamera,
  Edit3,
  Battery,
  HardDrive,
  Award,
  Palette
} from 'lucide-react';

interface VirtualARViewfinderProps {
  onPhotoCaptured?: (photo: CapturedPhoto) => void;
  onExit?: () => void;
  onOpenInPhotoshop?: (photoUrl: string) => void;
}

const APERTURE_OPTIONS = [1.4, 1.8, 2.8, 4.0, 5.6, 8.0, 11, 16, 22];
const SHUTTER_OPTIONS = [
  { label: '1/4000', sec: 1/4000 },
  { label: '1/2000', sec: 1/2000 },
  { label: '1/1000', sec: 1/1000 },
  { label: '1/500',  sec: 1/500 },
  { label: '1/250',  sec: 1/250 },
  { label: '1/125',  sec: 1/125 },
  { label: '1/60',   sec: 1/60 },
  { label: '1/30',   sec: 1/30 },
  { label: '1/15',   sec: 1/15 },
  { label: '1/4',    sec: 1/4 },
  { label: '1/2',    sec: 0.5 },
  { label: '1"',     sec: 1.0 },
];
const ISO_OPTIONS = [100, 200, 400, 800, 1600, 3200, 6400];
const FOCAL_OPTIONS = [18, 24, 35, 50, 85, 135, 200];

// High-resolution photographic people & scene environments
const PHOTO_ENVIRONMENTS = [
  {
    id: 'studio-portrait',
    name: 'Editorial Studio Portrait',
    tag: 'Fashion Cyclorama',
    backgroundUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85',
    subject: 'High-fashion model in studio light',
    recommendedFocal: 85,
    recommendedAperture: 1.8,
    isPeople: true
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour Melanin Glow',
    tag: 'Natural Backlight',
    backgroundUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1400&q=85',
    subject: 'Warm rim lighting & golden flare',
    recommendedFocal: 50,
    recommendedAperture: 2.8,
    isPeople: true
  },
  {
    id: 'editorial-duo',
    name: 'Editorial Duo in Harmony',
    tag: 'Studio Portrait',
    backgroundUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85',
    subject: 'Two models with contrasting textures',
    recommendedFocal: 70,
    recommendedAperture: 2.8,
    isPeople: true
  },
  {
    id: 'tokyo-street',
    name: 'Tokyo Neon Street People',
    tag: 'Candid Low-Light',
    backgroundUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=85',
    subject: 'Wet reflections & neon bokeh',
    recommendedFocal: 35,
    recommendedAperture: 1.4,
    isPeople: false
  },
  {
    id: 'action-sports',
    name: 'Skater in Mid-Air Action',
    tag: 'Action Freeze',
    backgroundUrl: 'https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?auto=format&fit=crop&w=1400&q=85',
    subject: 'Rapid urban skateboarding motion',
    recommendedFocal: 50,
    recommendedAperture: 4.0,
    isPeople: true
  }
];

const MISSIONS: CameraMission[] = [
  {
    id: 'm1',
    title: 'Mission 1: The Portrait Pop',
    subtitle: 'Creamy Background Separation',
    difficulty: 'Beginner',
    plainEnglishGoal: 'Dial the aperture to f/1.8 or f/2.8 to melt the distracting background into silky bokeh blur.',
    whyItMatters: 'A wide aperture makes your friend pop out like an expensive magazine cover without needing a $3,000 camera.',
    targetSettings: { apertureRange: [1.4, 2.8] },
    rewardBadge: 'Bokeh Master'
  },
  {
    id: 'm2',
    title: 'Mission 2: Cinematic 2.39:1 Framing',
    subtitle: 'The Hollywood Anamorphic Look',
    difficulty: 'Beginner',
    plainEnglishGoal: 'Switch the Aspect Mask to Cinemascope (2.39:1) and turn on the Rule of Thirds.',
    whyItMatters: 'Widescreen letterboxing immediately draws the viewer into a theater-like cinematic experience.',
    targetSettings: { recommendedGuide: 'ruleOfThirds' },
    rewardBadge: 'Cinema Director'
  },
  {
    id: 'm3',
    title: 'Mission 3: Freezing Fast Action',
    subtitle: 'Stopping Time in Mid-Air',
    difficulty: 'Intermediate',
    plainEnglishGoal: 'Set shutter speed to 1/1000s or faster to freeze rapid movement without any motion blur.',
    whyItMatters: 'Essential for sports, pets, jumping kids, and flying moments.',
    targetSettings: { shutterRange: [0.0001, 0.001] },
    rewardBadge: 'Action Tracker'
  }
];

export const VirtualARViewfinder: React.FC<VirtualARViewfinderProps> = ({
  onPhotoCaptured,
  onExit,
  onOpenInPhotoshop
}) => {
  // DSLR Physical View Mode: 'viewfinder' (looking into the rubber eyepiece) vs 'live-view' (on rear LCD screen)
  const [dslrViewMode, setDslrViewMode] = useState<'viewfinder' | 'live-view'>('viewfinder');

  // Camera Settings
  const [settings, setSettings] = useState<CameraSettings>({
    aperture: 2.8,
    shutterSpeed: '1/250',
    shutterSeconds: 1/250,
    iso: 400,
    focalLength: 50,
    focusDistance: 3,
    evCompensation: 0
  });

  // Shooting Mode Dial (M, Av, Tv, P, Auto)
  const [shootingMode, setShootingMode] = useState<'M' | 'Av' | 'Tv' | 'P' | 'Auto'>('M');

  // AR Overlays
  const [guides, setGuides] = useState<ARGuides>({
    ruleOfThirds: true,
    goldenSpiral: false,
    leadingLines: false,
    centerCross: false,
    aspectMask: 'none',
    focusPeaking: false,
    histogram: true
  });

  // User's Personal Camera Ownership & Custom Engraving State (persisted in localStorage)
  const [cameraOwnerName, setCameraOwnerName] = useState<string>(() => {
    return localStorage.getItem('plainly_camera_owner_name') || "STUDENT EOS-1D PRO";
  });
  const [isEditingCameraName, setIsEditingCameraName] = useState<boolean>(false);
  const [tempCameraName, setTempCameraName] = useState<string>(cameraOwnerName);

  // Mechanical Shutter Actuations Counter (persisted in localStorage)
  const [shutterCount, setShutterCount] = useState<number>(() => {
    const saved = localStorage.getItem('plainly_camera_shutter_count');
    return saved ? parseInt(saved, 10) : 18;
  });

  // Photographic Environment & Real-World Camera State
  const [currentEnvIndex, setCurrentEnvIndex] = useState<number>(0);
  const [useWebcam, setUseWebcam] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [webcamActive, setWebcamActive] = useState<boolean>(false);
  const [customUserImage, setCustomUserImage] = useState<string | null>(null);
  const [customImageName, setCustomImageName] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Autofocus lock state (half-press)
  const [isAfLocked, setIsAfLocked] = useState<boolean>(false);
  const [afPointsActive, setAfPointsActive] = useState<boolean>(false);

  // Handshake & Panning simulation
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Shutter action state
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [lastPhoto, setLastPhoto] = useState<CapturedPhoto | null>(null);
  const [showPlaybackReview, setShowPlaybackReview] = useState<boolean>(false);
  const [activeMissionIndex, setActiveMissionIndex] = useState<number>(0);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [isExportingWatermark, setIsExportingWatermark] = useState<boolean>(false);

  // Main Photographic Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const envImageRef = useRef<HTMLImageElement | null>(null);

  const activeEnv = PHOTO_ENVIRONMENTS[currentEnvIndex];

  // Save camera name
  const handleSaveCameraName = () => {
    const trimmed = tempCameraName.trim() || "STUDENT EOS-1D PRO";
    setCameraOwnerName(trimmed);
    localStorage.setItem('plainly_camera_owner_name', trimmed);
    setIsEditingCameraName(false);
  };

  // Preload Environment or Custom Photographic Image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = customUserImage || activeEnv.backgroundUrl;
    img.onload = () => {
      envImageRef.current = img;
    };
  }, [activeEnv.backgroundUrl, customUserImage]);

  // Webcam stream management with front/back camera switching
  useEffect(() => {
    if (useWebcam) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }

      navigator.mediaDevices?.getUserMedia({ 
        video: { 
          facingMode: facingMode, 
          width: { ideal: 1920 }, 
          height: { ideal: 1080 } 
        } 
      })
        .then(stream => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setWebcamActive(true);
          }
        })
        .catch(err => {
          console.warn('Camera feed not accessible, falling back to simulated environment', err);
          setUseWebcam(false);
          setWebcamActive(false);
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
      setWebcamActive(false);
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [useWebcam, facingMode]);

  // Handle uploading ANY custom photo of people or objects to practice framing
  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomUserImage(event.target.result as string);
          setCustomImageName(file.name);
          setUseWebcam(false);
          sounds.playDialTick();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate Exposure EV Meter reading
  const evValue = (() => {
    const baseLux = 8.6;
    const f = settings.aperture;
    const t = settings.shutterSeconds;
    const iso = settings.iso;
    const sceneEv = Math.log2((f * f) / t) - Math.log2(iso / 100);
    const diff = baseLux - sceneEv + settings.evCompensation;
    return Math.max(-3, Math.min(3, Math.round(diff * 10) / 10));
  })();

  // Handshake warning check (shutter speed slower than 1 / focal length)
  const isHandshakeWarning = settings.shutterSeconds > 1 / settings.focalLength;

  // Real-time Canvas Render with True Optical Physics
  useEffect(() => {
    if (useWebcam && webcamActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let t = 0;

    const renderFrame = () => {
      t += 0.02;
      const w = canvas.width = 1200;
      const h = canvas.height = 800;

      // Handheld breathing micro-shake
      const breatheX = Math.sin(t * 1.8) * 2;
      const breatheY = Math.cos(t * 1.4) * 2;
      const totalX = panOffset.x + breatheX;
      const totalY = panOffset.y + breatheY;

      ctx.save();
      ctx.clearRect(0, 0, w, h);

      // Depth of Field calculation (f/1.4 = large creamy blur, f/16 = sharp)
      const bokehBlurRadius = Math.max(0, (3.8 - settings.aperture * 0.22) * (settings.focalLength / 50));
      const exposureBrightness = 1 + evValue * 0.25;

      const img = envImageRef.current;
      if (img && img.complete) {
        // Zoom crop according to focal length (50mm baseline)
        const zoomFactor = settings.focalLength / 50;
        const cropW = w / zoomFactor;
        const cropH = h / zoomFactor;
        const cropX = Math.max(0, Math.min(img.naturalWidth - cropW, (img.naturalWidth - cropW) / 2 - totalX * 0.5));
        const cropY = Math.max(0, Math.min(img.naturalHeight - cropH, (img.naturalHeight - cropH) / 2 - totalY * 0.5));

        // 1. Draw Background with Optical Bokeh Blur
        ctx.save();
        if (bokehBlurRadius > 0.5) {
          ctx.filter = `blur(${bokehBlurRadius * 3}px) brightness(${exposureBrightness})`;
        } else {
          ctx.filter = `brightness(${exposureBrightness})`;
        }
        ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, w, h);
        ctx.restore();

        // 2. Realistic Bokeh Highlight Discs in out-of-focus background
        if (settings.aperture <= 2.8) {
          ctx.save();
          const orbCount = 12;
          for (let i = 0; i < orbCount; i++) {
            const ox = ((i * 197.3) % w) + totalX * 0.2;
            const oy = ((i * 123.7) % (h * 0.75)) + totalY * 0.2;
            const orad = (22 + (i % 4) * 16) * (bokehBlurRadius * 0.6 + 0.5);

            ctx.beginPath();
            ctx.arc(ox, oy, orad, 0, Math.PI * 2);
            ctx.fillStyle = i % 2 === 0 ? 'rgba(254, 215, 170, 0.28)' : 'rgba(251, 146, 60, 0.2)';
            ctx.fill();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.stroke();
          }
          ctx.restore();
        }

        // 3. Crisp Subject Foreground (keeps person sharp while background blurs)
        if (!customUserImage && (currentEnvIndex === 0 || currentEnvIndex === 1 || currentEnvIndex === 2)) {
          ctx.save();
          ctx.filter = `brightness(${exposureBrightness})`;
          ctx.beginPath();
          ctx.ellipse(w * 0.55 + totalX, h * 0.52 + totalY, 230, 320, 0, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, w, h);
          ctx.restore();
        }

        // 4. Shutter Motion Blur Simulation if shutter is slow (>= 1/30s)
        if (settings.shutterSeconds >= 1 / 30) {
          ctx.save();
          const blurTrails = Math.min(8, Math.round(settings.shutterSeconds * 60));
          ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
          for (let b = 1; b <= blurTrails; b++) {
            ctx.drawImage(canvas, b * 3, 0, w, h, 0, 0, w, h);
          }
          ctx.restore();
        }

      } else {
        ctx.fillStyle = '#1c1c20';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#888894';
        ctx.font = '14px sans-serif';
        ctx.fillText('Powering up optical lens elements...', w / 2 - 120, h / 2);
      }

      // 5. Sensor Noise Grain at High ISO (ISO >= 1600)
      if (settings.iso >= 1600) {
        const grainIntensity = (settings.iso / 6400) * 0.16;
        ctx.fillStyle = `rgba(255, 255, 255, ${grainIntensity})`;
        for (let g = 0; g < 1400; g++) {
          ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
        }
      }

      // 6. Focus Peaking Overlay (Green edge highlights)
      if (guides.focusPeaking) {
        ctx.save();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.strokeRect(w * 0.45, h * 0.35, 160, 240);
        ctx.restore();
      }

      ctx.restore();
      animId = requestAnimationFrame(renderFrame);
    };

    animId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(animId);
  }, [currentEnvIndex, settings, panOffset, evValue, guides.focusPeaking, useWebcam, webcamActive, customUserImage]);

  // Two-Stage Shutter: Half-Press (Autofocus Lock)
  const handleHalfPressAF = () => {
    sounds.playFocusBeep();
    setIsAfLocked(true);
    setAfPointsActive(true);
    setTimeout(() => setAfPointsActive(false), 600);
  };

  // Full-Press: Shutter Release & Photo Capture
  const handleShutterRelease = useCallback(() => {
    sounds.playShutterClick(settings.shutterSeconds);
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 250);

    // Increment persistent shutter count odometer
    setShutterCount(prev => {
      const nextCount = prev + 1;
      localStorage.setItem('plainly_camera_shutter_count', nextCount.toString());
      return nextCount;
    });

    let capturedUrl = '';
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 1200;
    tempCanvas.height = 800;
    const tctx = tempCanvas.getContext('2d')!;

    if (useWebcam && videoRef.current && webcamActive) {
      tctx.drawImage(videoRef.current, 0, 0, 1200, 800);
    } else if (canvasRef.current) {
      tctx.drawImage(canvasRef.current, 0, 0, 1200, 800);
    }
    capturedUrl = tempCanvas.toDataURL('image/jpeg', 0.95);

    const hasThirds = guides.ruleOfThirds;
    const isApertureGood = settings.aperture <= 2.8;
    const isExposureBalanced = Math.abs(evValue) <= 0.7;

    const compScore = hasThirds ? 96 : 80;
    const expScore = isExposureBalanced ? 98 : Math.max(50, 100 - Math.abs(evValue) * 20);
    const focusScore = isApertureGood ? 97 : 85;
    const overallScore = Math.round((compScore + expScore + focusScore) / 3);

    const critique: CapturedPhoto['critique'] = {
      summary: overallScore >= 90 
        ? 'Breathtaking capture! Superb subject framing and silky background separation.' 
        : 'Solid composition! A small aperture or shutter adjustment will give you that professional edge.',
      strengths: [
        isApertureGood ? `Creamy f/${settings.aperture} bokeh melts the background into silk` : 'Deep field sharpness across the shot',
        hasThirds ? 'Subject aligned with the optical Rule of Thirds power nodes' : 'Subject centered',
        isExposureBalanced ? 'Balanced 0 EV exposure meter' : `Exposure reading ${evValue > 0 ? `+${evValue}` : evValue} EV`
      ],
      plainEnglishTip: !isApertureGood 
        ? 'Tip: Spin the Main Dial to f/1.8 to blur the background so your subject pops like an expensive portrait!'
        : !hasThirds
        ? 'Tip: Turn on the Rule of Thirds grid and place the eyes right on the top-right intersection dot.'
        : 'Tip: Outstanding shot! Click "Open in Photoshop Retouching Studio" below to polish skin tones and dodge & burn!'
    };

    const newPhoto: CapturedPhoto = {
      id: `photo-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      imageDataUrl: capturedUrl,
      environment: useWebcam 
        ? `Live World AR (${facingMode === 'user' ? 'Selfie' : 'Front'})` 
        : customUserImage 
        ? `Custom Photo (${customImageName || 'Loaded Scene'})`
        : activeEnv.name,
      settings: { ...settings },
      aspectRatio: guides.aspectMask,
      scores: {
        composition: compScore,
        exposure: Math.round(expScore),
        focus: focusScore,
        overall: overallScore
      },
      critique
    };

    setLastPhoto(newPhoto);
    setShowPlaybackReview(true);

    if (onPhotoCaptured) {
      onPhotoCaptured(newPhoto);
    }

    // Check active mission validation
    const currentMission = MISSIONS[activeMissionIndex];
    if (currentMission && !completedMissions.includes(currentMission.id)) {
      let isSuccess = false;
      if (currentMission.id === 'm1' && settings.aperture <= 2.8) isSuccess = true;
      if (currentMission.id === 'm2' && guides.aspectMask === 'cinemascope') isSuccess = true;
      if (currentMission.id === 'm3' && settings.shutterSeconds <= 1/1000) isSuccess = true;

      if (isSuccess) {
        sounds.playSuccessChime();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        setCompletedMissions(prev => [...prev, currentMission.id]);
      }
    }
  }, [
    settings, 
    guides, 
    evValue, 
    activeEnv, 
    useWebcam, 
    facingMode, 
    webcamActive, 
    customUserImage, 
    customImageName, 
    activeMissionIndex, 
    completedMissions, 
    onPhotoCaptured
  ]);

  // Export photo with luxury Hasselblad/Leica-style EXIF watermark footer
  const handleExportWatermarkedPhoto = () => {
    if (!lastPhoto) return;
    setIsExportingWatermark(true);

    const canvas = document.createElement('canvas');
    const photoImg = new Image();
    photoImg.crossOrigin = 'anonymous';
    photoImg.src = lastPhoto.imageDataUrl;
    photoImg.onload = () => {
      canvas.width = 1200;
      canvas.height = 920; // 800 photo + 120 luxury white matte footer
      const ctx = canvas.getContext('2d')!;

      // Draw photo
      ctx.drawImage(photoImg, 0, 0, 1200, 800);

      // Draw clean gallery matte footer
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 800, 1200, 120);

      // Top thin divider
      ctx.strokeStyle = '#E5E5E5';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(40, 800);
      ctx.lineTo(1160, 800);
      ctx.stroke();

      // Left metadata: Camera name + "Personal Virtual DSLR"
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
      ctx.fillText(`Shot on ${cameraOwnerName}`, 40, 846);

      ctx.fillStyle = '#6B7280';
      ctx.font = '14px system-ui, -apple-system, sans-serif';
      ctx.fillText('Plainly Optical Studio • You must not buy an expensive camera to be a real photographer', 40, 874);

      // Right metadata: EXIF telemetry badge
      ctx.textAlign = 'right';
      ctx.fillStyle = '#111827';
      ctx.font = '600 18px monospace';
      ctx.fillText(`${lastPhoto.settings.focalLength}mm  f/${lastPhoto.settings.aperture}  ${lastPhoto.settings.shutterSpeed}s  ISO ${lastPhoto.settings.iso}`, 1160, 846);

      ctx.fillStyle = '#5E4DB2';
      ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
      ctx.fillText(`FRAMING SCORE: ${lastPhoto.scores.overall}/100 ★ BOKEH DEPTH: ${lastPhoto.scores.focus}%`, 1160, 874);

      // Trigger download
      const watermarkedUrl = canvas.toDataURL('image/jpeg', 0.96);
      const a = document.createElement('a');
      a.href = watermarkedUrl;
      a.download = `${cameraOwnerName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-capture-${Date.now()}.jpg`;
      a.click();
      setIsExportingWatermark(false);
      sounds.playSuccessChime();
    };
  };

  // Save pristine high-resolution picture directly to any device
  const handleSavePictureToDevice = () => {
    if (!lastPhoto) return;
    sounds.playSuccessChime();
    const a = document.createElement('a');
    a.href = lastPhoto.imageDataUrl;
    a.download = `plainly-camera-capture-${Date.now()}.jpg`;
    a.click();
  };

  // Keyboard shortcut listener: Space = AF half-press, Enter = Shutter Click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        handleHalfPressAF();
      } else if (e.code === 'Enter') {
        e.preventDefault();
        handleShutterRelease();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleShutterRelease]);

  // Drag Panning in 3D Scene
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    setPanOffset({
      x: Math.max(-280, Math.min(280, e.clientX - dragStartRef.current.x)),
      y: Math.max(-180, Math.min(180, e.clientY - dragStartRef.current.y))
    });
  };
  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="w-full flex flex-col items-center select-none font-sans space-y-4">
      
      {/* 1. EMPOWERING ACCESSIBILITY MANIFESTO BANNER */}
      <div className="w-full max-w-5xl bg-gradient-to-r from-[#211E30] via-[#1A1824] to-[#141418] border-2 border-[#5E4DB2]/50 rounded-3xl p-4 sm:p-5 shadow-lg text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Your Personal Virtual Camera
            </span>
            <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
              // NO $3,500 GEAR REQUIRED
            </span>
          </div>
          <h3 className="font-heading font-black text-lg sm:text-xl text-zinc-100">
            <span className="text-amber-400 font-extrabold mr-1">Photography:</span> You don't need to own a camera to start. Our virtual camera lets you capture, edit and save your pictures to any device — all in one platform.
          </h3>
          <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
            Framing, light, and visual emotion belong to your mind, not a $3,500 plastic body. Point this camera at real people with your live webcam, load any photo from your phone, and practice optical composition instantly.
          </p>
        </div>

        {/* Shutter count badge & owner name */}
        <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 bg-[#0E0E12] px-4 py-2.5 rounded-2xl border border-zinc-700">
          <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
            <Award className="w-4 h-4 text-amber-400" />
            <span>ACTUATIONS: <strong>{shutterCount}</strong></span>
          </div>
          <span className="text-[10px] text-zinc-400 font-sans">
            Personal Shutter Odometer
          </span>
        </div>
      </div>

      {/* 2. INTERACTIVE MISSION GUIDANCE BAR (Matching attached reference image) */}
      {(() => {
        const activeMission = MISSIONS[activeMissionIndex];
        const isCurrentMissionAchieved = (() => {
          if (activeMission.id === 'm1') return settings.aperture <= 2.8;
          if (activeMission.id === 'm2') return guides.aspectMask === 'cinemascope';
          if (activeMission.id === 'm3') return settings.shutterSeconds <= 1 / 1000;
          return false;
        })();
        const isCompleted = completedMissions.includes(activeMission.id) || isCurrentMissionAchieved;

        return (
          <div className="w-full max-w-5xl bg-[#18181E] border border-zinc-700/80 rounded-2xl p-3 sm:px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-black text-indigo-400 text-xs">
                    {activeMission.title}:
                  </span>
                  <span className="text-zinc-200">
                    {activeMission.plainEnglishGoal}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  Why it matters: {activeMission.whyItMatters}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              {isCompleted ? (
                <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center gap-1.5 animate-pulse">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Goal Achieved!</span>
                </div>
              ) : (
                <div className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-400 border border-zinc-700 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>Adjust Controls</span>
                </div>
              )}

              <button
                onClick={() => {
                  sounds.playDialTick();
                  setActiveMissionIndex((activeMissionIndex + 1) % MISSIONS.length);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Next Mission</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })()}

      {/* 2. REALISTIC PHYSICAL DSLR CAMERA BODY CASING */}
      <div className="w-full max-w-5xl rounded-[40px] bg-gradient-to-b from-[#2B2B32] via-[#1E1E23] to-[#141418] p-4 sm:p-7 border-4 border-[#3D3D48] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden">
        
        {/* Subtle camera leatherette grip texture */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* TOP CAMERA SHOULDER / HOT SHOE / CUSTOM ENGRAVING PLATE */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-zinc-800/80 pb-3 mb-4 text-xs text-zinc-300 relative z-10 gap-3">
          
          {/* Top Left: Mode Dial & View Switcher */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 bg-[#121215] px-2.5 py-1.5 rounded-2xl border border-zinc-700 shadow-inner">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Mode:</span>
              {(['M', 'Av', 'Tv', 'P', 'Auto'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => { sounds.playDialTick(); setShootingMode(mode); }}
                  className={`px-2 py-0.5 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                    shootingMode === mode ? 'bg-amber-500 text-black shadow-xs' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* View Mode Switcher: Optical Eyepiece vs Rear LCD Live View */}
            <div className="flex items-center gap-1 bg-[#121215] p-1 rounded-xl border border-zinc-700">
              <button
                onClick={() => { sounds.playDialTick(); setDslrViewMode('viewfinder'); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  dslrViewMode === 'viewfinder' ? 'bg-[#5E4DB2] text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                👁️ Eyepiece
              </button>
              <button
                onClick={() => { sounds.playDialTick(); setDslrViewMode('live-view'); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  dslrViewMode === 'live-view' ? 'bg-[#5E4DB2] text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                📺 LCD
              </button>
            </div>
          </div>

          {/* Top Center: Hot Shoe & User's Custom Engraved Camera Nameplate */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-2 bg-gradient-to-r from-zinc-600 via-zinc-400 to-zinc-600 rounded-t-sm shadow-inner" />
            
            {isEditingCameraName ? (
              <div className="flex items-center gap-1 mt-0.5">
                <input
                  type="text"
                  value={tempCameraName}
                  onChange={e => setTempCameraName(e.target.value)}
                  maxLength={24}
                  className="bg-black text-amber-400 px-2 py-0.5 rounded text-xs font-mono border border-amber-500 outline-none w-36 text-center"
                  autoFocus
                />
                <button
                  onClick={handleSaveCameraName}
                  className="p-1 bg-emerald-600 text-white rounded text-[10px] hover:bg-emerald-500"
                >
                  <Check className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => { setTempCameraName(cameraOwnerName); setIsEditingCameraName(true); }}
                className="flex items-center gap-1.5 cursor-pointer group mt-0.5"
                title="Click to engrave your own name on this camera body"
              >
                <span className="font-heading font-black tracking-widest text-zinc-300 group-hover:text-amber-400 text-xs uppercase transition-colors">
                  {cameraOwnerName}
                </span>
                <Edit3 className="w-3 h-3 text-zinc-500 group-hover:text-amber-400" />
              </div>
            )}
            <span className="text-[9px] text-zinc-500 font-mono tracking-widest">MADE FOR CREATORS</span>
          </div>

          {/* Top Right: Shutter Release & Main Dial Wheel */}
          <div className="flex items-center gap-2.5">
            
            {/* Main Dial Wheel (Ratchet click) */}
            <div className="flex items-center gap-1 bg-[#121215] px-2 py-1 rounded-xl border border-zinc-700">
              <span className="text-[10px] text-zinc-400 font-mono">DIAL</span>
              <button
                onClick={() => {
                  sounds.playDialTick();
                  const idx = APERTURE_OPTIONS.indexOf(settings.aperture);
                  const nextAperture = APERTURE_OPTIONS[(idx + 1) % APERTURE_OPTIONS.length];
                  setSettings(s => ({ ...s, aperture: nextAperture }));
                }}
                className="w-7 h-7 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 border border-zinc-600 text-zinc-200 flex items-center justify-center font-bold text-xs hover:border-amber-400 transition-colors shadow-xs cursor-pointer"
                title="Rotate Main Dial (Changes Aperture Iris)"
              >
                ↻
              </button>
            </div>

            {/* REALISTIC TWO-STAGE SHUTTER RELEASE BUTTON */}
            <div className="flex items-center gap-2">
              <button
                onMouseDown={handleHalfPressAF}
                onClick={handleShutterRelease}
                className="group relative px-5 py-2 rounded-2xl bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-500 hover:from-white hover:to-zinc-300 active:scale-95 text-zinc-950 font-heading font-black text-xs tracking-wider border-2 border-zinc-300 shadow-[0_4px_12px_rgba(0,0,0,0.6)] cursor-pointer flex items-center gap-2"
                title="Click to Shoot (or Hold Spacebar for AF Lock)"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-red-600 group-hover:bg-red-500 animate-pulse" />
                <span>SHUTTER BUTTON</span>
              </button>
            </div>

          </div>
        </div>

        {/* MIDDLE SECTION: CAMERA VIEWFINDER / LCD SCREEN WITH AUTHENTIC BEZEL */}
        <div className="relative w-full rounded-3xl overflow-hidden bg-black border-4 border-[#121216] shadow-2xl flex items-center justify-center">
          
          {/* Shutter White Flash Effect */}
          {isFlashing && (
            <div className="absolute inset-0 z-50 bg-white animate-shutter-flash pointer-events-none" />
          )}

          {/* Camera Viewport Canvas */}
          <div 
            className={`relative w-full h-[460px] sm:h-[520px] overflow-hidden cursor-crosshair ${
              dslrViewMode === 'viewfinder' 
                ? 'rounded-[28px] ring-12 ring-black/90' 
                : 'rounded-xl'
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* Live Camera Feed OR High-Res Photographic Canvas */}
            {useWebcam ? (
              <video
                ref={videoRef}
                playsInline
                muted
                className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
              />
            ) : (
              <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
              />
            )}

            {/* CINEMATIC ANAMORPHIC LETTERBOX MASK (2.39:1 Cinemascope) */}
            {guides.aspectMask === 'cinemascope' && (
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-20">
                <div className="w-full h-[14%] bg-black/95 border-b border-zinc-800 flex items-center justify-center">
                  <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-mono">2.39:1 Cinemascope Anamorphic</span>
                </div>
                <div className="w-full h-[14%] bg-black/95 border-t border-zinc-800" />
              </div>
            )}

            {/* RULE OF THIRDS AR GRID WITH RED GOLDEN NODES */}
            {guides.ruleOfThirds && (
              <div className="absolute inset-0 pointer-events-none z-10 grid grid-cols-3 grid-rows-3">
                <div className="border-r border-b border-white/40 relative">
                  <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rounded-full border-2 border-red-500 bg-red-500/40 shadow-sm" />
                </div>
                <div className="border-r border-b border-white/40 relative">
                  <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rounded-full border-2 border-red-500 bg-red-500/40 shadow-sm" />
                </div>
                <div className="border-b border-white/40" />
                
                <div className="border-r border-b border-white/40 relative">
                  <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rounded-full border-2 border-red-500 bg-red-500/40 shadow-sm" />
                </div>
                <div className="border-r border-b border-white/40 relative">
                  <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rounded-full border-2 border-red-500 bg-red-500/40 shadow-sm" />
                </div>
                <div className="border-b border-white/40" />
                
                <div className="border-r border-white/40" />
                <div className="border-r border-white/40" />
                <div />
              </div>
            )}

            {/* AUTHENTIC 9-POINT RED AUTOFOCUS RETICLE */}
            <div className="absolute inset-0 pointer-events-none z-15 flex items-center justify-center">
              <div className={`transition-all duration-150 ${afPointsActive || isAfLocked ? 'scale-105' : 'scale-100'}`}>
                <div className={`w-14 h-14 border-2 rounded-xs flex items-center justify-center ${
                  afPointsActive ? 'border-red-500 bg-red-500/25 shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'border-red-500/60'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${afPointsActive ? 'bg-red-500 shadow-md shadow-red-500' : 'bg-red-500/70'}`} />
                </div>
              </div>
            </div>

            {/* Handshake Warning Icon if Shutter is too slow */}
            {isHandshakeWarning && (
              <div className="absolute top-4 right-4 z-20 bg-rose-950/80 border border-rose-500 text-rose-300 px-3 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>HANDSHAKE WARNING (Slow {settings.shutterSpeed}s)</span>
              </div>
            )}

            {/* Top Left Live Status Pill */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2">
              <div className="bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10 text-[10px] text-zinc-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{useWebcam ? `LIVE AR LENS (${facingMode === 'user' ? 'Selfie' : 'World'})` : customUserImage ? 'CUSTOM LOADED SCENE' : 'VIRTUAL OPTICS'}</span>
              </div>
              <div className="bg-black/60 backdrop-blur-xs px-2 py-1 rounded-lg border border-white/10 text-[10px] text-zinc-400">
                Drag to Frame (360°)
              </div>
            </div>

            {/* AUTHENTIC GREEN LED OPTICAL TELEMETRY BAR (Inside Viewfinder) */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 bg-black/90 backdrop-blur-md px-5 sm:px-7 py-2 rounded-2xl border border-zinc-700/80 shadow-2xl flex items-center gap-3 sm:gap-6 text-emerald-400 font-mono text-xs sm:text-sm tracking-wider">
              
              {/* Shutter Speed */}
              <div className="flex flex-col items-center">
                <span className="font-bold text-emerald-300">{settings.shutterSpeed}</span>
                <span className="text-[8px] text-zinc-500 font-sans uppercase">SEC</span>
              </div>

              {/* Aperture F-stop */}
              <div className="flex flex-col items-center">
                <span className="font-bold text-emerald-300">F{settings.aperture.toFixed(1)}</span>
                <span className="text-[8px] text-zinc-500 font-sans uppercase">IRIS</span>
              </div>

              {/* ISO Gain */}
              <div className="flex flex-col items-center">
                <span className="font-bold text-emerald-300">ISO {settings.iso}</span>
                <span className="text-[8px] text-zinc-500 font-sans uppercase">GAIN</span>
              </div>

              {/* Exposure Meter [-2..-1..0..+1..+2] */}
              <div className="hidden sm:flex flex-col items-center">
                <div className="flex items-center gap-1 text-[11px]">
                  <span>-2</span>
                  <span>-1</span>
                  <span className={`px-1 py-0.2 rounded ${Math.abs(evValue) <= 0.3 ? 'bg-emerald-500 text-black font-bold' : 'text-emerald-300'}`}>0</span>
                  <span>+1</span>
                  <span>+2</span>
                </div>
                <span className="text-[8px] text-zinc-400 uppercase font-sans">
                  EV: {evValue > 0 ? `+${evValue}` : evValue}
                </span>
              </div>

              {/* AF Lock Indicator Dot */}
              <div className="flex flex-col items-center">
                <span className={`text-base ${isAfLocked ? 'text-emerald-400' : 'text-zinc-600'}`}>●</span>
                <span className="text-[8px] text-zinc-500 font-sans uppercase">AF-OK</span>
              </div>

              {/* Focal Length */}
              <div className="flex flex-col items-center">
                <span className="font-bold text-emerald-300">{settings.focalLength}mm</span>
                <span className="text-[8px] text-zinc-500 font-sans uppercase">LENS</span>
              </div>

              {/* Battery & Shots Remaining */}
              <div className="hidden md:flex flex-col items-center text-zinc-400">
                <span className="text-emerald-400 font-bold">[ 999 ]</span>
                <span className="text-[8px] text-zinc-500 font-sans uppercase">RAW+L</span>
              </div>

            </div>

          </div>

        </div>

        {/* 3. REAR CAMERA SCENE & LIVE AR SWITCHER (SNAP PEOPLE OR ANYTHING) */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          
          {/* Left: Real-World AR & Scene Selectors */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider shrink-0">
              Snap Scene:
            </span>

            {/* Live Camera AR Button */}
            <button
              onClick={() => {
                sounds.playDialTick();
                setCustomUserImage(null);
                setUseWebcam(true);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 cursor-pointer ${
                useWebcam
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-xs'
                  : 'bg-[#151518] text-zinc-300 border-zinc-700 hover:text-white hover:border-zinc-500'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-emerald-400" />
              <span>Snap Real People (Live AR)</span>
            </button>

            {/* Camera Flip (Front/Back) */}
            {useWebcam && (
              <button
                onClick={() => {
                  sounds.playDialTick();
                  setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
                }}
                className="px-2.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title="Flip between selfie camera and front/environment lens"
              >
                <SwitchCamera className="w-3.5 h-3.5 text-amber-400" />
                <span>Flip Lens ({facingMode === 'user' ? 'Selfie' : 'World'})</span>
              </button>
            )}

            {/* Upload Any Custom Photo of People or Objects */}
            <label className="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 cursor-pointer bg-[#151518] text-zinc-300 border-zinc-700 hover:text-white hover:border-zinc-500">
              <Upload className="w-3.5 h-3.5 text-sky-400" />
              <span>Load Any Photo / Person</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleCustomPhotoUpload}
                className="hidden"
              />
            </label>

            {/* Presets (Studio Fashion, Melanin Glow, Tokyo Street, etc.) */}
            {PHOTO_ENVIRONMENTS.map((env, idx) => (
              <button
                key={env.id}
                onClick={() => {
                  sounds.playDialTick();
                  setUseWebcam(false);
                  setCustomUserImage(null);
                  setCurrentEnvIndex(idx);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                  !useWebcam && !customUserImage && currentEnvIndex === idx
                    ? 'bg-[#5E4DB2] text-white border-indigo-400 shadow-xs'
                    : 'bg-[#151518] text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                <span>{env.name.split('(')[0]}</span>
              </button>
            ))}
          </div>

          {/* Right: Physical DSLR Buttons (Rule of Thirds, Cinema Mask, Playback) */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            
            <button
              onClick={() => {
                sounds.playDialTick();
                setGuides(g => ({ ...g, ruleOfThirds: !g.ruleOfThirds }));
              }}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                guides.ruleOfThirds
                  ? 'bg-[#5E4DB2] text-white border-indigo-500'
                  : 'bg-[#151518] text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Rule of Thirds</span>
            </button>

            <button
              onClick={() => {
                sounds.playDialTick();
                setGuides(g => ({
                  ...g,
                  aspectMask: g.aspectMask === 'none' ? 'cinemascope' : 'none'
                }));
              }}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                guides.aspectMask === 'cinemascope'
                  ? 'bg-amber-600 text-white border-amber-500'
                  : 'bg-[#151518] text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>2.39:1 Cinema</span>
            </button>

            {/* Instant Playback Button [ > ] on camera back */}
            <button
              onClick={() => {
                sounds.playDialTick();
                if (lastPhoto) setShowPlaybackReview(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Review Last Shot on Screen"
            >
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              <span>Playback [ &gt; ]</span>
            </button>

          </div>

        </div>

        {/* 4. BOTTOM QUICK-ADJUST CONSOLE: APERTURE, SHUTTER, ISO, FOCAL LENGTH */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          
          {/* Aperture (f-stop) Dial */}
          <div className="bg-[#121215] p-2.5 rounded-2xl border border-zinc-800">
            <div className="flex justify-between items-center mb-1 font-semibold">
              <span className="text-zinc-400">Aperture Iris</span>
              <span className="text-amber-400 font-mono font-bold">f/{settings.aperture}</span>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              {APERTURE_OPTIONS.map(f => (
                <button
                  key={f}
                  onClick={() => {
                    sounds.playDialTick();
                    setSettings(s => ({ ...s, aperture: f }));
                  }}
                  className={`px-2 py-1 rounded-lg text-xs font-mono font-bold shrink-0 transition-all cursor-pointer ${
                    settings.aperture === f
                      ? 'bg-amber-500 text-black shadow-xs'
                      : 'bg-zinc-800/80 text-zinc-400 hover:text-white'
                  }`}
                >
                  f/{f}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">
              {settings.aperture <= 2.8 ? '✨ Creamy portrait bokeh' : '🏔️ Deep landscape sharpness'}
            </p>
          </div>

          {/* Shutter Speed Dial */}
          <div className="bg-[#121215] p-2.5 rounded-2xl border border-zinc-800">
            <div className="flex justify-between items-center mb-1 font-semibold">
              <span className="text-zinc-400">Shutter Duration</span>
              <span className="text-sky-400 font-mono font-bold">{settings.shutterSpeed}s</span>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              {SHUTTER_OPTIONS.slice(0, 7).map(item => (
                <button
                  key={item.label}
                  onClick={() => {
                    sounds.playDialTick();
                    setSettings(s => ({ ...s, shutterSpeed: item.label, shutterSeconds: item.sec }));
                  }}
                  className={`px-2 py-1 rounded-lg text-xs font-mono font-bold shrink-0 transition-all cursor-pointer ${
                    settings.shutterSpeed === item.label
                      ? 'bg-sky-500 text-black shadow-xs'
                      : 'bg-zinc-800/80 text-zinc-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">
              {settings.shutterSeconds <= 1/500 ? '⚡ Freeze rapid action' : '🌊 Smooth motion flow'}
            </p>
          </div>

          {/* ISO Sensor Gain */}
          <div className="bg-[#121215] p-2.5 rounded-2xl border border-zinc-800">
            <div className="flex justify-between items-center mb-1 font-semibold">
              <span className="text-zinc-400">ISO Sensitivity</span>
              <span className="text-emerald-400 font-mono font-bold">{settings.iso}</span>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              {ISO_OPTIONS.map(isoVal => (
                <button
                  key={isoVal}
                  onClick={() => {
                    sounds.playDialTick();
                    setSettings(s => ({ ...s, iso: isoVal }));
                  }}
                  className={`px-2 py-1 rounded-lg text-xs font-mono font-bold shrink-0 transition-all cursor-pointer ${
                    settings.iso === isoVal
                      ? 'bg-emerald-500 text-black shadow-xs'
                      : 'bg-zinc-800/80 text-zinc-400 hover:text-white'
                  }`}
                >
                  {isoVal}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">
              {settings.iso <= 400 ? '💎 Pristine zero grain' : '🌙 Night sensitivity gain'}
            </p>
          </div>

          {/* Focal Length (Zoom) */}
          <div className="bg-[#121215] p-2.5 rounded-2xl border border-zinc-800">
            <div className="flex justify-between items-center mb-1 font-semibold">
              <span className="text-zinc-400">Focal Length (Zoom)</span>
              <span className="text-purple-400 font-mono font-bold">{settings.focalLength}mm</span>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              {FOCAL_OPTIONS.map(fl => (
                <button
                  key={fl}
                  onClick={() => {
                    sounds.playDialTick();
                    setSettings(s => ({ ...s, focalLength: fl }));
                  }}
                  className={`px-2 py-1 rounded-lg text-xs font-mono font-bold shrink-0 transition-all cursor-pointer ${
                    settings.focalLength === fl
                      ? 'bg-purple-500 text-white shadow-xs'
                      : 'bg-zinc-800/80 text-zinc-400 hover:text-white'
                  }`}
                >
                  {fl}mm
                </button>
              ))}
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">
              {settings.focalLength >= 85 ? '🔭 Flattering portrait compression' : '👁️ Natural human eye'}
            </p>
          </div>

        </div>

      </div>

      {/* 5. INSTANT REAR LCD PLAYBACK MODAL (With AI Composition Coaching Critique & Luxury Export) */}
      {showPlaybackReview && lastPhoto && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF7F0] text-[#1E1E24] w-full max-w-2xl rounded-3xl p-6 border-2 border-[#DCD5C5] shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            
            <button
              onClick={() => setShowPlaybackReview(false)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <h3 className="font-heading font-bold text-xl text-[#1E1E24]">
                Instant DSLR Playback & AI Coach Critique
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              
              {/* Photo Preview with EXIF overlay */}
              <div className="rounded-2xl overflow-hidden border border-zinc-300 shadow-md bg-black relative">
                <img
                  src={lastPhoto.imageDataUrl}
                  alt="Captured frame"
                  className="w-full h-56 object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/80 px-2.5 py-1.5 rounded-xl text-white font-mono text-[10px] flex justify-between">
                  <span>f/{lastPhoto.settings.aperture} • {lastPhoto.settings.shutterSpeed}s</span>
                  <span>ISO {lastPhoto.settings.iso} • {lastPhoto.settings.focalLength}mm</span>
                </div>
              </div>

              {/* Composition Scores & Coaching Feedback */}
              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-2xl border border-zinc-200 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Framing Score</span>
                    <h4 className="font-heading font-black text-2xl text-[#5E4DB2]">
                      {lastPhoto.scores.overall}/100
                    </h4>
                  </div>
                  <div className="text-right text-xs text-zinc-600">
                    <p>Composition: <strong className="text-zinc-900">{lastPhoto.scores.composition}%</strong></p>
                    <p>Exposure: <strong className="text-zinc-900">{lastPhoto.scores.exposure}%</strong></p>
                    <p>Bokeh Depth: <strong className="text-zinc-900">{lastPhoto.scores.focus}%</strong></p>
                  </div>
                </div>

                <div className="bg-[#F0ECE1] p-3 rounded-2xl text-xs space-y-1.5 border border-[#DCD5C5]">
                  <span className="font-bold text-[#5E4DB2] block">Coach Summary:</span>
                  <p className="text-zinc-700 leading-relaxed">{lastPhoto.critique.summary}</p>
                  <p className="text-[#5E4DB2] font-semibold mt-1">{lastPhoto.critique.plainEnglishTip}</p>
                </div>
              </div>
            </div>

            {/* Actions: Save Raw, Export Watermarked, Send to Photoshop */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-200 pt-4 gap-3">
              <span className="text-xs text-zinc-500">
                Shot on <strong>{cameraOwnerName}</strong> • Actuation #{shutterCount}
              </span>

              <div className="flex flex-wrap items-center gap-2">
                
                {/* Save Picture directly to Device (JPG) */}
                <button
                  onClick={handleSavePictureToDevice}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  title="Save high-resolution captured picture directly to your phone, tablet, or laptop"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  <span>Save to Device (JPG)</span>
                </button>

                {/* Download Luxury Watermarked Frame */}
                <button
                  onClick={handleExportWatermarkedPhoto}
                  disabled={isExportingWatermark}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  title="Exports with luxury EXIF print matte proving you took this shot!"
                >
                  <Award className="w-3.5 h-3.5 text-black" />
                  <span>{isExportingWatermark ? 'Exporting...' : 'Print Matte'}</span>
                </button>

                {/* Send to Photoshop Retouching Studio */}
                {onOpenInPhotoshop && (
                  <button
                    onClick={() => {
                      setShowPlaybackReview(false);
                      onOpenInPhotoshop(lastPhoto.imageDataUrl);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#007ACC] hover:bg-[#0062A3] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Edit in Photoshop</span>
                  </button>
                )}

                {/* Back to shooting */}
                <button
                  onClick={() => setShowPlaybackReview(false)}
                  className="px-4 py-2 rounded-xl bg-[#5E4DB2] hover:bg-[#4E3EA1] text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Next Shot →
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
