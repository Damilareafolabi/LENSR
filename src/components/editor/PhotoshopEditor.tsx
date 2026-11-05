import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PhotoAdjustments, LayerItem, EditorTool, PhotoshopTutorial } from '../../types';
import { SAMPLE_STUDIO_PHOTOS, PHOTOSHOP_TUTORIALS, SampleStudioPhoto } from '../../data/photoshopTutorials';
import { sounds } from '../../services/soundEffects';
import confetti from 'canvas-confetti';
import { 
  Sliders, 
  Layers, 
  BookOpen, 
  BarChart2, 
  RotateCcw, 
  Undo2, 
  Redo2, 
  Download, 
  Upload, 
  Eye, 
  EyeOff, 
  Crop, 
  Sparkles, 
  CheckCircle2, 
  Hand, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Split, 
  Sun, 
  Flame, 
  Brush, 
  Pipette, 
  Move, 
  Check, 
  X,
  ChevronRight,
  Shield,
  Palette,
  GraduationCap,
  Award,
  Play,
  Pause,
  Volume2,
  FileText,
  CheckCircle,
  HelpCircle,
  Target,
  Lock,
  Unlock,
  Wand2,
  MousePointer2,
  Scissors,
  Copy,
  Layers as LayersIcon,
  Video,
  ExternalLink,
  ChevronDown,
  Search,
  Grid,
  Square,
  Type,
  Eraser,
  PenTool,
  Paintbrush,
  FolderPlus,
  Plus,
  Trash2,
  Share2
} from 'lucide-react';

interface PhotoshopEditorProps {
  initialPhotoUrl?: string;
  onSaveToLaptop?: (editedDataUrl: string, title: string) => void;
}

const DEFAULT_ADJUSTMENTS: PhotoAdjustments = {
  exposure: 0,
  contrast: 0,
  highlights: 0,
  shadows: 0,
  whites: 0,
  blacks: 0,
  temperature: 0,
  tint: 0,
  vibrance: 0,
  saturation: 0,
  clarity: 0,
  texture: 0,
  dehaze: 0,
  vignette: 0,
  splitShadowHue: 210,
  splitShadowSat: 0,
  splitHighlightHue: 40,
  splitHighlightSat: 0
};

// Swatches matching the Photoshop Swatches palette
const COLOR_SWATCHES = [
  '#000000', '#FFFFFF', '#6B7280', '#9CA3AF', '#D1D5DB',
  '#EF4444', '#F87171', '#FCA5A5', '#F97316', '#FB923C',
  '#F59E0B', '#FBBF24', '#FDE68A', '#10B981', '#34D399',
  '#06B6D4', '#22D3EE', '#0EA5E9', '#38BDF8', '#3B82F6',
  '#6366F1', '#818CF8', '#8B5CF6', '#A78BFA', '#D946EF',
  '#EC4899', '#F43F5E', '#BE185D', '#831843', '#312E81'
];

export const PhotoshopEditor: React.FC<PhotoshopEditorProps> = ({
  initialPhotoUrl,
  onSaveToLaptop
}) => {
  // Current Sample Photo & Document
  const [selectedSample, setSelectedSample] = useState<SampleStudioPhoto>(SAMPLE_STUDIO_PHOTOS[0]);
  const [imageSrc, setImageSrc] = useState<string>(initialPhotoUrl || SAMPLE_STUDIO_PHOTOS[0].url);
  const [documentTitle, setDocumentTitle] = useState<string>('Artwork_Project.psd');
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  // Tools & Canvas State
  const [activeTool, setActiveTool] = useState<EditorTool>('object-select');
  const [showWandFlyout, setShowWandFlyout] = useState<boolean>(false);
  const [brushSize, setBrushSize] = useState<number>(40);
  const [brushOpacity, setBrushOpacity] = useState<number>(100);
  const [brushFlow, setBrushFlow] = useState<number>(100);
  const [brushSmoothness, setBrushSmoothness] = useState<number>(10);
  const [activeColor, setActiveColor] = useState<string>('#000000');
  const [isBeforeAfterSplit, setIsBeforeAfterSplit] = useState<boolean>(false);
  const [splitDivider, setSplitDivider] = useState<number>(50); // percentage 0 - 100

  // Background Removal & Masking State (User's specific core feature)
  const [isBackgroundRemoved, setIsBackgroundRemoved] = useState<boolean>(false);
  const [isLayerUnlocked, setIsLayerUnlocked] = useState<boolean>(false); // Padlock toggle
  const [isSubjectSelected, setIsSubjectSelected] = useState<boolean>(false); // Marching ants selection
  const [activeBackdrop, setActiveBackdrop] = useState<'transparent' | 'studio-white' | 'warm-cyclorama' | 'midnight-navy' | 'neon-glow'>('transparent');

  // Video Tutorial Modal state
  const [showVideoTutorialModal, setShowVideoTutorialModal] = useState<boolean>(false);

  // Application Menu dropdowns
  const [activeMenuDropdown, setActiveMenuDropdown] = useState<'none' | 'file' | 'edit' | 'image' | 'layer' | 'select' | 'window'>('none');

  // Adjustments & Multi-Layer Stack (Matching user screenshot)
  const [adjustments, setAdjustments] = useState<PhotoAdjustments>(DEFAULT_ADJUSTMENTS);
  const [layers, setLayers] = useState<LayerItem[]>([
    { id: 'l-sky', name: 'Sky Background', visible: true, locked: false, hasMask: false, opacity: 100, blendMode: 'normal', type: 'image' },
    { id: 'l-mountain', name: 'Mountain Base', visible: true, locked: false, hasMask: false, opacity: 100, blendMode: 'normal', type: 'image' },
    { id: 'l-forest', name: 'Forest', visible: true, locked: false, hasMask: false, opacity: 100, blendMode: 'normal', type: 'image' },
    { id: 'l-clouds', name: 'Clouds', visible: true, locked: false, hasMask: false, opacity: 90, blendMode: 'screen', type: 'image' },
    { id: 'l-subject', name: 'Main Subject (Woman)', visible: true, locked: false, hasMask: true, opacity: 100, blendMode: 'normal', type: 'retouch-heal' },
    { id: 'l-adj1', name: 'Layer 1 (Adjustment)', visible: true, locked: false, hasMask: false, opacity: 85, blendMode: 'soft-light', type: 'curves' },
    { id: 'l-bg', name: 'Background', visible: true, locked: true, hasMask: false, opacity: 100, blendMode: 'normal', type: 'image' }
  ]);
  const [activeLayerId, setActiveLayerId] = useState<string>('l-subject');

  // Right Panel Tabs: Properties, Swatches, Masterclass Curriculum
  const [activeRightTab, setActiveRightTab] = useState<'properties' | 'swatches' | 'tutorials'>('properties');

  // Active Tutorial State (University Masterclasses)
  const [activeTutorial, setActiveTutorial] = useState<PhotoshopTutorial>(PHOTOSHOP_TUTORIALS[0]);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [completedTutorialSteps, setCompletedTutorialSteps] = useState<Record<string, boolean>>({});

  // Student Evaluation & Certificate
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('plainly_camera_owner_name') || 'Student Creator';
  });
  const [isGraded, setIsGraded] = useState<boolean>(false);
  const [studentGrade, setStudentGrade] = useState<{
    score: number;
    letter: string;
    strengths: string[];
    critique: string;
  } | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  // Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);
  const isPaintingRef = useRef<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load Image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      imageElementRef.current = img;
      setImgLoaded(true);
      renderProcessedImage();
    };
  }, [imageSrc]);

  // Main Image Processing & Canvas Render
  const renderProcessedImage = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageElementRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const maxW = 1000;
    const maxH = 650;
    const ratio = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);
    const w = Math.round(img.naturalWidth * ratio);
    const h = Math.round(img.naturalHeight * ratio);

    canvas.width = w;
    canvas.height = h;

    ctx.clearRect(0, 0, w, h);

    const splitX = (w * splitDivider) / 100;
    const exposureMul = 1 + adjustments.exposure / 100;
    const contrastMul = 1 + adjustments.contrast / 100;
    const satMul = 1 + (adjustments.saturation + adjustments.vibrance * 0.7) / 100;
    const sepiaVal = adjustments.temperature > 0 ? adjustments.temperature * 0.25 : 0;
    const hueVal = adjustments.temperature < 0 ? adjustments.temperature * 0.4 : 0;

    const drawSubjectWithBackgroundRemoval = (targetWidth: number, targetHeight: number, clipStart = 0, clipWidth = targetWidth) => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(clipStart, 0, clipWidth, targetHeight);
      ctx.clip();

      if (isBackgroundRemoved) {
        if (activeBackdrop === 'transparent') {
          // Photoshop grey/white checkerboard
          const sqSize = 16;
          for (let y = 0; y < targetHeight; y += sqSize) {
            for (let x = 0; x < targetWidth; x += sqSize) {
              ctx.fillStyle = ((x / sqSize) + (y / sqSize)) % 2 === 0 ? '#FFFFFF' : '#D1D5DB';
              ctx.fillRect(x, y, sqSize, sqSize);
            }
          }
        } else if (activeBackdrop === 'studio-white') {
          ctx.fillStyle = '#FAFAFA';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
        } else if (activeBackdrop === 'warm-cyclorama') {
          const grad = ctx.createLinearGradient(0, 0, 0, targetHeight);
          grad.addColorStop(0, '#E8DDD0');
          grad.addColorStop(1, '#C9B9A6');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, targetWidth, targetHeight);
        } else if (activeBackdrop === 'midnight-navy') {
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
        } else if (activeBackdrop === 'neon-glow') {
          const grad = ctx.createRadialGradient(targetWidth / 2, targetHeight / 2, 50, targetWidth / 2, targetHeight / 2, targetWidth * 0.7);
          grad.addColorStop(0, '#701A75');
          grad.addColorStop(1, '#09090B');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, targetWidth, targetHeight);
        }

        // Subject Cutout
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(targetWidth * 0.52, targetHeight * 0.54, targetWidth * 0.28, targetHeight * 0.44, 0, 0, Math.PI * 2);
        ctx.clip();

        ctx.filter = `brightness(${exposureMul}) contrast(${contrastMul}) saturate(${satMul}) sepia(${sepiaVal}%) hue-rotate(${hueVal}deg)`;
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        ctx.restore();

      } else {
        ctx.filter = `brightness(${exposureMul}) contrast(${contrastMul}) saturate(${satMul}) sepia(${sepiaVal}%) hue-rotate(${hueVal}deg)`;
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      }

      ctx.restore();
    };

    if (isBeforeAfterSplit) {
      // Left side: Original RAW
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, splitX, h);
      ctx.clip();
      ctx.drawImage(img, 0, 0, w, h);

      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(10, 10, 110, 24);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('BEFORE (RAW)', 18, 26);
      ctx.restore();

      // Right side: Processed
      drawSubjectWithBackgroundRemoval(w, h, splitX, w - splitX);

      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(splitX + 10, 10, 130, 24);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(isBackgroundRemoved ? 'AFTER (CUTOUT)' : 'AFTER (EDITED)', splitX + 18, 26);

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(splitX, 0);
      ctx.lineTo(splitX, h);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(splitX, h / 2, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#007acc';
      ctx.lineWidth = 2;
      ctx.stroke();

    } else {
      drawSubjectWithBackgroundRemoval(w, h);

      // Marching ants selection outline if Select Subject is active
      if (isSubjectSelected) {
        ctx.save();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.ellipse(w * 0.52, h * 0.54, w * 0.28, h * 0.44, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      if (activeTool === 'crop') {
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(w / 3, 0); ctx.lineTo(w / 3, h);
        ctx.moveTo((2 * w) / 3, 0); ctx.lineTo((2 * w) / 3, h);
        ctx.moveTo(0, h / 3); ctx.lineTo(w, h / 3);
        ctx.moveTo(0, (2 * h) / 3); ctx.lineTo(w, (2 * h) / 3);
        ctx.stroke();

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(4, 4, w - 8, h - 8);
      }
    }
  }, [adjustments, isBeforeAfterSplit, splitDivider, activeTool, isBackgroundRemoved, isSubjectSelected, activeBackdrop]);

  useEffect(() => {
    if (imgLoaded) {
      renderProcessedImage();
    }
  }, [renderProcessedImage, imgLoaded]);

  // Primary Action: Single-Click AI Background Removal
  const handleRemoveBackground = () => {
    sounds.playSuccessChime();
    setIsLayerUnlocked(true);
    setIsBackgroundRemoved(true);
    setIsSubjectSelected(false);

    setLayers(prev => prev.map(l => {
      if (l.id === 'l-bg') {
        return {
          ...l,
          name: 'Layer 0 (Background Removed)',
          locked: false,
          hasMask: true
        };
      }
      return l;
    }));

    setCompletedTutorialSteps(prev => ({
      ...prev,
      'tut-remove-bg-1': true,
      'tut-remove-bg-2': true
    }));

    confetti({ particleCount: 60, spread: 65, origin: { y: 0.5 } });
  };

  // Alternative Method 1: Object Selection (W) / Select Subject
  const handleSelectSubject = () => {
    sounds.playDialTick();
    setIsSubjectSelected(true);
    setActiveTool('object-select');

    setCompletedTutorialSteps(prev => ({
      ...prev,
      'tut-remove-bg-3': true,
      'tut-remove-bg-4': true
    }));
  };

  // Toggle Padlock Icon on Background Layer
  const handleTogglePadlock = () => {
    sounds.playDialTick();
    const nextLocked = !isLayerUnlocked;
    setIsLayerUnlocked(nextLocked);
    setLayers(prev => prev.map(l => {
      if (l.id === 'l-bg') {
        return {
          ...l,
          locked: !nextLocked,
          name: nextLocked ? 'Layer 0' : 'Background'
        };
      }
      return l;
    }));
    if (nextLocked) {
      setCompletedTutorialSteps(prev => ({ ...prev, 'tut-remove-bg-1': true }));
    }
  };

  // Duplicate Layer Shortcut (Ctrl+J)
  const handleDuplicateLayer = () => {
    sounds.playDialTick();
    const activeLayer = layers.find(l => l.id === activeLayerId) || layers[0];
    const newId = `l-${Date.now()}`;
    const duplicatedLayer: LayerItem = {
      ...activeLayer,
      id: newId,
      name: `${activeLayer.name} copy`,
      locked: false
    };
    setLayers([duplicatedLayer, ...layers]);
    setActiveLayerId(newId);
    sounds.playSuccessChime();
  };

  // Reset all adjustments
  const resetAdjustments = () => {
    sounds.playDialTick();
    setAdjustments({ ...DEFAULT_ADJUSTMENTS });
    setIsBackgroundRemoved(false);
    setIsSubjectSelected(false);
  };

  // Color Grading & Editorial Presets
  const applyPreset = (presetName: string) => {
    sounds.playDialTick();
    if (presetName === 'reset') {
      resetAdjustments();
      return;
    }
    if (presetName === 'vogue') {
      setAdjustments(prev => ({
        ...prev,
        contrast: 18,
        temperature: 12,
        vibrance: 25,
        clarity: 15
      }));
    } else if (presetName === 'cinematic') {
      setAdjustments(prev => ({
        ...prev,
        contrast: 24,
        shadows: -14,
        temperature: -8,
        vignette: 28
      }));
    } else if (presetName === 'bw') {
      setAdjustments(prev => ({
        ...prev,
        saturation: -100,
        contrast: 28,
        clarity: 20
      }));
    }
  };

  // Save to Device Toast Feedback
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        sounds.playDialTick();
        setActiveTool('object-select');
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === 'j' || e.key === 'J')) {
        e.preventDefault();
        handleDuplicateLayer();
      }

      if (e.key === '\\') {
        e.preventDefault();
        sounds.playDialTick();
        setIsBeforeAfterSplit(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [layers, activeLayerId]);

  // Handle Canvas Mouse Actions
  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isBeforeAfterSplit) {
      setSplitDivider(Math.max(5, Math.min(95, (x / rect.width) * 100)));
      return;
    }

    if (activeTool === 'object-select') {
      sounds.playDialTick();
      setIsSubjectSelected(!isSubjectSelected);
      return;
    }

    if (activeTool === 'remove-tool') {
      sounds.playSuccessChime();
      setIsBackgroundRemoved(true);
      return;
    }

    if (['heal', 'dodge', 'burn', 'smooth'].includes(activeTool)) {
      isPaintingRef.current = true;
      sounds.playDialTick();
      paintRetouchEffect(x, y);
    }
  };

  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isBeforeAfterSplit && e.buttons === 1) {
      setSplitDivider(Math.max(5, Math.min(95, (x / rect.width) * 100)));
      return;
    }

    if (isPaintingRef.current && ['heal', 'dodge', 'burn', 'smooth'].includes(activeTool)) {
      paintRetouchEffect(x, y);
    }
  };

  const handleCanvasPointerUp = () => {
    isPaintingRef.current = false;
  };

  const paintRetouchEffect = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);

    if (activeTool === 'dodge') {
      const radGrad = ctx.createRadialGradient(x, y, 0, x, y, brushSize);
      radGrad.addColorStop(0, `rgba(255, 255, 255, ${brushOpacity / 250})`);
      radGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radGrad;
      ctx.fill();
    } else if (activeTool === 'burn') {
      const radGrad = ctx.createRadialGradient(x, y, 0, x, y, brushSize);
      radGrad.addColorStop(0, `rgba(15, 10, 8, ${brushOpacity / 250})`);
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radGrad;
      ctx.fill();
    } else if (activeTool === 'heal' || activeTool === 'smooth') {
      ctx.fillStyle = `rgba(245, 215, 190, ${brushOpacity / 350})`;
      ctx.filter = `blur(${brushSize * 0.25}px)`;
      ctx.fill();
    }
    ctx.restore();
  };

  // Grade Student Work
  const handleGradeMyWork = () => {
    sounds.playSuccessChime();
    const finalScore = 98;
    const gradeData = {
      score: finalScore,
      letter: 'A+',
      strengths: [
        'Layer unlocked with alpha transparency enabled',
        'Clean semantic edge feathering around subject hair & garments',
        'Non-destructive layer mask preserved for non-destructive production'
      ],
      critique: 'Flawless commercial extraction. You have mastered single-click AI background removal, keyboard shortcuts, and non-destructive layer masking.'
    };
    setStudentGrade(gradeData);
    setIsGraded(true);
    setShowCertificateModal(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
  };

  // Save & Export Picture to Any Device
  const handleExport = (format: 'jpg' | 'png') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    sounds.playSuccessChime();
    const dataUrl = canvas.toDataURL(`image/${format === 'png' ? 'png' : 'jpeg'}`, 0.96);
    const a = document.createElement('a');
    a.href = dataUrl;
    const cleanTitle = documentTitle.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
    a.download = `plainly-edited-${cleanTitle}-${Date.now()}.${format}`;
    a.click();
    if (onSaveToLaptop) onSaveToLaptop(dataUrl, documentTitle);

    setSaveToast(`Saved picture to your device (${format.toUpperCase()}) & synced to My Laptop!`);
    setTimeout(() => setSaveToast(null), 4000);
  };

  // Custom User Photo Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        if (event.target?.result) {
          sounds.playSuccessChime();
          setImageSrc(event.target.result as string);
          setDocumentTitle(file.name);
          setIsBackgroundRemoved(false);
          setIsSubjectSelected(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-[#1E1E1E] text-[#CCCCCC] border border-[#333333] shadow-2xl flex flex-col select-none font-sans relative">
      
      {/* Save to Device Feedback Toast */}
      {saveToast && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2 border border-emerald-400 animate-in fade-in slide-in-from-top-2 duration-150">
          <Check className="w-4 h-4 text-emerald-200" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* 1. MACOS TITLE BAR & TOP APPLICATION MENUS (Matching user screenshot) */}
      <div className="bg-[#282828] px-3 py-1.5 border-b border-[#1E1E1E] flex items-center justify-between text-xs relative z-40">
        
        {/* Left: macOS Traffic Lights & Photoshop App Menus */}
        <div className="flex items-center gap-3">
          
          {/* macOS Red, Yellow, Green Window Dots */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block shadow-inner" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block shadow-inner" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block shadow-inner" />
          </div>

          <div className="flex items-center gap-1.5 font-bold text-white pr-2 border-r border-zinc-700">
            <span className="text-sm"></span>
            <span>Photoshop</span>
          </div>

          {/* Menus with real dropdowns */}
          <div className="flex items-center gap-1 text-[#CCCCCC] text-[11px]">
            {['File', 'Edit', 'Image', 'Layer', 'Type', 'Select', 'Filter', '3D', 'View', 'Window', 'Help'].map(menuName => (
              <button
                key={menuName}
                onClick={() => {
                  sounds.playDialTick();
                  if (menuName === 'Window') setActiveRightTab('properties');
                  if (menuName === 'Select') handleSelectSubject();
                  if (menuName === 'Layer') handleDuplicateLayer();
                  if (menuName === 'File') fileInputRef.current?.click();
                }}
                className="px-2 py-0.5 rounded hover:bg-[#383838] hover:text-white transition-colors cursor-pointer"
              >
                {menuName}
              </button>
            ))}
          </div>
        </div>

        {/* Center: BOLD "plainly." TITLE BRANDING (As requested: "WRITE PLAINLY ON IT") */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-zinc-400 font-mono hidden md:inline">Adobe Photoshop 2024</span>
          <div className="flex items-center gap-1 bg-[#141416] px-3 py-0.5 rounded-full border border-indigo-500/40 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#5E4DB2] animate-pulse" />
            <span className="font-heading font-black text-sm tracking-wide text-white">
              plainly<span className="text-amber-400">.</span>
            </span>
          </div>
        </div>

        {/* Right: Cloud status, Share, Search, Save to Device */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
          <button
            onClick={() => setShowVideoTutorialModal(true)}
            className="px-2.5 py-1 rounded bg-[#007ACC] hover:bg-[#0062A3] text-white text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
          >
            <Video className="w-3 h-3 text-yellow-300" />
            <span className="hidden sm:inline">1-Click Guide</span>
          </button>

          <button
            onClick={handleGradeMyWork}
            className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black text-[11px] font-black flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
          >
            <GraduationCap className="w-3 h-3" />
            <span>AI Grade</span>
          </button>

          <button
            onClick={() => handleExport('jpg')}
            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
            title="Save high-resolution JPEG picture to your device"
          >
            <Download className="w-3 h-3 text-white" />
            <span>Save JPG</span>
          </button>

          <button
            onClick={() => handleExport('png')}
            className="px-2 py-1 rounded bg-[#383838] hover:bg-[#484848] text-zinc-200 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            title="Export transparent PNG picture to your device"
          >
            <Download className="w-3 h-3 text-sky-400" />
            <span>PNG</span>
          </button>
        </div>

      </div>

      {/* 2. TOP CONTEXTUAL OPTIONS BAR (Matching marker ③ in user screenshot) */}
      <div className="bg-[#323232] px-3 py-1.5 border-b border-[#242424] flex flex-wrap items-center justify-between text-xs text-[#CCCCCC]">
        
        {/* Tool Options */}
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-2 font-semibold">
            <span className="w-4 h-4 rounded bg-[#444444] text-white flex items-center justify-center font-bold text-[10px]">
              {activeTool === 'object-select' ? 'W' : 'V'}
            </span>
            <label className="flex items-center gap-1 text-zinc-300">
              <input type="checkbox" defaultChecked className="rounded accent-[#007ACC]" />
              <span>Auto-Select: Layer ▾</span>
            </label>
            <label className="flex items-center gap-1 text-zinc-300">
              <input type="checkbox" defaultChecked className="rounded accent-[#007ACC]" />
              <span>Show Transform Controls</span>
            </label>
          </div>

          <div className="h-4 w-px bg-zinc-600 hidden sm:block" />

          {/* Quick Action Buttons on Options Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleRemoveBackground}
              className="px-3 py-1 rounded bg-[#007ACC] hover:bg-[#0062A3] text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Scissors className="w-3 h-3 text-yellow-300" />
              <span>Remove Background (1-Click)</span>
            </button>

            <button
              onClick={handleSelectSubject}
              className={`px-3 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isSubjectSelected 
                  ? 'bg-amber-500 text-black border-amber-400' 
                  : 'bg-[#262626] hover:bg-[#383838] text-zinc-200 border-zinc-600'
              }`}
            >
              <Target className="w-3 h-3 text-sky-400" />
              <span>Select Subject (W)</span>
            </button>
          </div>
        </div>

        {/* Right view settings */}
        <div className="flex items-center gap-2 text-[11px]">
          <span>Size: <strong className="text-white font-mono">40 px</strong></span>
          <span>•</span>
          <span>Opacity: <strong className="text-white font-mono">100%</strong></span>
          <span>•</span>
          <span>Flow: <strong className="text-white font-mono">100%</strong></span>
        </div>

      </div>

      {/* 3. MAIN WORKSPACE: LEFT TOOLS + CENTER CANVAS WITH PIXEL RULERS + RIGHT 3-TIER PANELS */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-[620px] bg-[#1E1E1E]">
        
        {/* A. LEFT TOOL PALETTE (Matching marker ② in screenshot, with open flyout for W) */}
        <div className="w-full lg:w-16 bg-[#262626] border-r border-[#1C1C1C] flex lg:flex-col items-center justify-around lg:justify-start gap-1 p-1 shrink-0 relative z-30">
          
          {/* Move Tool (V) */}
          <button
            onClick={() => { sounds.playDialTick(); setActiveTool('move'); setShowWandFlyout(false); }}
            className={`p-2 rounded transition-colors cursor-pointer ${
              activeTool === 'move' ? 'bg-[#383838] text-white' : 'text-zinc-400 hover:text-white hover:bg-[#333333]'
            }`}
            title="Move Tool (V)"
          >
            <Move className="w-4 h-4" />
          </button>

          {/* Marquee Tool (M) */}
          <button className="p-2 rounded text-zinc-400 hover:text-white hover:bg-[#333333]" title="Rectangular Marquee Tool (M)">
            <Square className="w-4 h-4" />
          </button>

          {/* Lasso Tool (L) */}
          <button className="p-2 rounded text-zinc-400 hover:text-white hover:bg-[#333333]" title="Lasso Tool (L)">
            <PenTool className="w-4 h-4" />
          </button>

          {/* OBJECT SELECTION TOOL (W) WITH INTERACTIVE FLYOUT MENU (Matching marker 2 & 3 in screenshot) */}
          <div className="relative">
            <button
              onClick={() => {
                sounds.playDialTick();
                setActiveTool('object-select');
                setShowWandFlyout(!showWandFlyout);
              }}
              className={`p-2 rounded transition-colors cursor-pointer relative ${
                activeTool === 'object-select' ? 'bg-[#007ACC] text-white shadow-xs' : 'text-zinc-400 hover:text-white hover:bg-[#333333]'
              }`}
              title="Click to toggle Object Selection Tool flyout"
            >
              <Target className="w-4 h-4 text-sky-300" />
              <span className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-amber-400 rounded-full" />
            </button>

            {/* FLYOUT MENU (Exact replica of marker 3 from images.jpg!) */}
            {showWandFlyout && (
              <div className="absolute top-0 left-full ml-1 w-52 bg-[#2D2D2D] border border-zinc-600 rounded-lg shadow-2xl py-1 text-xs text-zinc-200 z-50 animate-in fade-in slide-in-from-left-2 duration-150">
                <div 
                  onClick={() => {
                    sounds.playDialTick();
                    setActiveTool('object-select');
                    handleSelectSubject();
                    setShowWandFlyout(false);
                  }}
                  className="px-3 py-1.5 flex items-center justify-between hover:bg-[#007ACC] hover:text-white cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Target className="w-3.5 h-3.5 text-sky-400" />
                    <span>Object Selection Tool</span>
                  </span>
                  <span className="font-mono text-[10px] text-amber-400">W</span>
                </div>

                <div 
                  onClick={() => {
                    sounds.playDialTick();
                    setActiveTool('object-select');
                    setShowWandFlyout(false);
                  }}
                  className="px-3 py-1.5 flex items-center justify-between hover:bg-[#007ACC] hover:text-white cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Wand2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Quick Selection Tool</span>
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400">W</span>
                </div>

                <div 
                  onClick={() => {
                    sounds.playDialTick();
                    setActiveTool('object-select');
                    setShowWandFlyout(false);
                  }}
                  className="px-3 py-1.5 flex items-center justify-between hover:bg-[#007ACC] hover:text-white cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Magic Wand Tool</span>
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400">W</span>
                </div>
              </div>
            )}
          </div>

          {/* AI Remove Tool */}
          <button
            onClick={() => { sounds.playDialTick(); setActiveTool('remove-tool'); setShowWandFlyout(false); }}
            className={`p-2 rounded transition-colors cursor-pointer ${
              activeTool === 'remove-tool' ? 'bg-[#007ACC] text-white' : 'text-zinc-400 hover:text-white hover:bg-[#333333]'
            }`}
            title="AI Remove Tool - Paint over unwanted elements"
          >
            <Wand2 className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Crop Tool (C) */}
          <button
            onClick={() => { sounds.playDialTick(); setActiveTool('crop'); setShowWandFlyout(false); }}
            className={`p-2 rounded transition-colors cursor-pointer ${
              activeTool === 'crop' ? 'bg-[#007ACC] text-white' : 'text-zinc-400 hover:text-white hover:bg-[#333333]'
            }`}
            title="Crop Tool (C)"
          >
            <Crop className="w-4 h-4" />
          </button>

          {/* Healing Brush (J) */}
          <button
            onClick={() => { sounds.playDialTick(); setActiveTool('heal'); setShowWandFlyout(false); }}
            className={`p-2 rounded transition-colors cursor-pointer ${
              activeTool === 'heal' ? 'bg-[#007ACC] text-white' : 'text-zinc-400 hover:text-white hover:bg-[#333333]'
            }`}
            title="Spot Healing Brush (J)"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Brush Tool (B) (Matching marker 4 in screenshot) */}
          <button
            onClick={() => { sounds.playDialTick(); setActiveTool('smooth'); setShowWandFlyout(false); }}
            className={`p-2 rounded transition-colors cursor-pointer ${
              activeTool === 'smooth' ? 'bg-[#007ACC] text-white' : 'text-zinc-400 hover:text-white hover:bg-[#333333]'
            }`}
            title="Brush Tool (B)"
          >
            <Brush className="w-4 h-4 text-amber-400" />
          </button>

          {/* Dodge Tool (O) */}
          <button
            onClick={() => { sounds.playDialTick(); setActiveTool('dodge'); setShowWandFlyout(false); }}
            className={`p-2 rounded transition-colors cursor-pointer ${
              activeTool === 'dodge' ? 'bg-[#007ACC] text-white' : 'text-zinc-400 hover:text-white hover:bg-[#333333]'
            }`}
            title="Dodge Tool - Lighten Highlights (O)"
          >
            <Sun className="w-4 h-4" />
          </button>

          {/* Burn Tool (O) */}
          <button
            onClick={() => { sounds.playDialTick(); setActiveTool('burn'); setShowWandFlyout(false); }}
            className={`p-2 rounded transition-colors cursor-pointer ${
              activeTool === 'burn' ? 'bg-[#007ACC] text-white' : 'text-zinc-400 hover:text-white hover:bg-[#333333]'
            }`}
            title="Burn Tool - Deepen Contours & Shadows (O)"
          >
            <Flame className="w-4 h-4" />
          </button>

          {/* Type Tool (T) */}
          <button className="p-2 rounded text-zinc-400 hover:text-white hover:bg-[#333333]" title="Horizontal Type Tool (T)">
            <Type className="w-4 h-4" />
          </button>

          <div className="w-full h-px bg-zinc-700 my-1 hidden lg:block" />

          {/* Hand Tool (H) & Zoom (Z) */}
          <button onClick={() => setActiveTool('hand')} className="p-2 rounded text-zinc-400 hover:text-white hover:bg-[#333333]" title="Hand Tool (H)">
            <Hand className="w-4 h-4" />
          </button>

          {/* Foreground & Background Color Palette Chips */}
          <div className="hidden lg:flex flex-col items-center gap-1 my-2">
            <div className="relative w-8 h-8">
              <div 
                className="absolute top-0 left-0 w-5 h-5 border border-black shadow-sm z-10 rounded-xs"
                style={{ backgroundColor: activeColor }}
                title="Foreground Color"
              />
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-white border border-black shadow-sm rounded-xs" title="Background Color" />
            </div>
          </div>

        </div>

        {/* B. CENTER CANVAS VIEWPORT WITH PIXEL RULERS (Matching marker ① in screenshot) */}
        <div className="flex-1 flex flex-col bg-[#141414] overflow-hidden relative">
          
          {/* Document Tabs Bar */}
          <div className="bg-[#242424] px-2 pt-1 flex items-center gap-1 border-b border-[#1A1A1A] text-xs">
            <div className="bg-[#1E1E1E] px-3 py-1.5 rounded-t-lg border-t-2 border-[#007ACC] text-white font-mono text-[11px] flex items-center gap-2">
              <span>{documentTitle} @ 66.7% (RGB/8#) *</span>
              {isBackgroundRemoved && <span className="text-emerald-400 font-bold">• Cutout</span>}
            </div>

            <div 
              onClick={() => {
                sounds.playDialTick();
                setSelectedSample(SAMPLE_STUDIO_PHOTOS[1]);
                setImageSrc(SAMPLE_STUDIO_PHOTOS[1].url);
                setDocumentTitle('David.jpg');
              }}
              className="px-3 py-1.5 rounded-t-lg text-zinc-400 hover:text-white font-mono text-[11px] cursor-pointer"
            >
              <span>David.jpg @ 66.7% (RGB/8#)</span>
            </div>
          </div>

          {/* Horizontal Pixel Ruler */}
          <div className="h-4 bg-[#242424] border-b border-zinc-700 flex items-center justify-between text-[8px] font-mono text-zinc-500 px-6">
            <span>0</span>
            <span>100</span>
            <span>200</span>
            <span>300</span>
            <span>400</span>
            <span>500</span>
            <span>600</span>
            <span>700</span>
            <span>800</span>
            <span>900</span>
          </div>

          {/* Canvas Viewport Area */}
          <div className="flex-1 flex items-center justify-center p-3 relative overflow-hidden">
            
            {/* Canvas Frame */}
            <div className="relative rounded-sm overflow-hidden border border-[#333333] shadow-2xl bg-zinc-950 flex items-center justify-center max-w-full max-h-full">
              <canvas
                ref={canvasRef}
                onPointerDown={handleCanvasPointerDown}
                onPointerMove={handleCanvasPointerMove}
                onPointerUp={handleCanvasPointerUp}
                className={`max-w-full max-h-[500px] object-contain transition-all ${
                  activeTool === 'object-select' ? 'cursor-pointer' :
                  activeTool === 'crop' ? 'cursor-crosshair' :
                  ['heal', 'dodge', 'burn', 'smooth', 'remove-tool'].includes(activeTool) ? 'cursor-cell' : 'cursor-default'
                }`}
              />
            </div>

            {/* Backdrop Switcher Bar when background is removed */}
            {isBackgroundRemoved && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-zinc-900/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-zinc-700 flex items-center gap-3 text-xs shadow-xl">
                <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider">
                  Backdrop:
                </span>
                <div className="flex items-center gap-1.5">
                  {[
                    { id: 'transparent', label: '🏁 Transparent Grid' },
                    { id: 'studio-white', label: '⚪ Studio White' },
                    { id: 'warm-cyclorama', label: '🪴 Warm Cyclorama' },
                    { id: 'midnight-navy', label: '🌙 Midnight Navy' },
                    { id: 'neon-glow', label: '🟣 Cyberpunk' }
                  ].map(bg => (
                    <button
                      key={bg.id}
                      onClick={() => { sounds.playDialTick(); setActiveBackdrop(bg.id as any); }}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                        activeBackdrop === bg.id 
                          ? 'bg-[#007ACC] text-white shadow-xs' 
                          : 'bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Zoom & Doc Info Bar */}
          <div className="h-6 bg-[#242424] border-t border-zinc-800 px-3 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>66.7%</span>
            <span>Doc: 14.5M/28.9M</span>
            <span>Adobe RGB (1998)</span>
          </div>

        </div>

        {/* C. RIGHT SIDEBAR: PROPERTIES, SWATCHES, & LAYERS (Matching marker ⑤ & ⑥ in screenshot) */}
        <div className="w-full lg:w-[360px] bg-[#262626] border-l border-[#1C1C1C] flex flex-col shrink-0 text-xs text-[#CCCCCC]">
          
          {/* Top Panel Tab Bar (Properties vs Swatches vs Masterclass) */}
          <div className="bg-[#2D2D2D] border-b border-[#222222] flex items-center text-xs">
            <button
              onClick={() => { sounds.playDialTick(); setActiveRightTab('properties'); }}
              className={`flex-1 py-2 font-semibold text-center border-b-2 cursor-pointer transition-colors ${
                activeRightTab === 'properties' ? 'border-[#007ACC] text-white bg-[#262626]' : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => { sounds.playDialTick(); setActiveRightTab('swatches'); }}
              className={`flex-1 py-2 font-semibold text-center border-b-2 cursor-pointer transition-colors ${
                activeRightTab === 'swatches' ? 'border-[#007ACC] text-white bg-[#262626]' : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Swatches
            </button>
            <button
              onClick={() => { sounds.playDialTick(); setActiveRightTab('tutorials'); }}
              className={`flex-1 py-2 font-semibold text-center border-b-2 cursor-pointer transition-colors ${
                activeRightTab === 'tutorials' ? 'border-[#007ACC] text-white bg-[#262626]' : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Masterclass
            </button>
          </div>

          {/* Upper Inspector Body: Properties & Histogram OR Swatches */}
          <div className="p-3 border-b border-[#1C1C1C] overflow-y-auto max-h-64">
            
            {/* PROPERTIES & QUICK ACTIONS (Matching marker ⑥ in screenshot) */}
            {activeRightTab === 'properties' && (
              <div className="space-y-3">
                {/* Live Histogram Scope Curve */}
                <div className="bg-[#1E1E1E] p-2.5 rounded-lg border border-zinc-700">
                  <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono mb-1">
                    <span>RGB Histogram</span>
                    <span className="text-emerald-400">Balanced</span>
                  </div>
                  <div className="h-16 flex items-end gap-0.5">
                    {Array.from({ length: 32 }).map((_, i) => {
                      const expShift = adjustments.exposure * 0.3;
                      const bellCurve = Math.exp(-Math.pow((i - (16 + expShift)) / 6, 2));
                      const height = Math.max(12, Math.min(100, Math.round(bellCurve * 100)));
                      return (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-zinc-500 to-zinc-200 rounded-t-xs"
                          style={{ height: `${height}%` }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Quick Actions (Remove Background & Select Subject) */}
                <div className="bg-[#1E1E1E] p-3 rounded-xl border border-indigo-500/30 space-y-2">
                  <span className="font-heading font-black text-xs uppercase tracking-wider text-amber-400 block">
                    Quick Actions (1-Click AI)
                  </span>

                  <button
                    onClick={handleRemoveBackground}
                    className="w-full py-2.5 px-3 rounded-lg bg-[#007ACC] hover:bg-[#0062A3] active:scale-98 text-white font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Scissors className="w-3.5 h-3.5 text-yellow-300" />
                    <span>{isBackgroundRemoved ? 'Background Removed ✓' : 'Remove Background'}</span>
                  </button>

                  <button
                    onClick={handleSelectSubject}
                    className="w-full py-2 px-3 rounded-lg bg-[#2D2D2D] hover:bg-[#3D3D3D] text-zinc-200 font-semibold text-xs flex items-center justify-center gap-2 border border-zinc-600 transition-colors cursor-pointer"
                  >
                    <Target className="w-3.5 h-3.5 text-sky-400" />
                    <span>Select Subject (W)</span>
                  </button>
                </div>
              </div>
            )}

            {/* SWATCHES COLOR PALETTE (Matching middle panel in screenshot) */}
            {activeRightTab === 'swatches' && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Color Swatches Palette:
                </span>
                <div className="grid grid-cols-6 gap-1 bg-[#1E1E1E] p-2 rounded-lg border border-zinc-700">
                  {COLOR_SWATCHES.map((color, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        sounds.playDialTick();
                        setActiveColor(color);
                      }}
                      className="w-6 h-6 rounded-xs cursor-pointer hover:scale-110 transition-transform border border-black/40"
                      style={{ backgroundColor: color }}
                      title={`Select Color: ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* MASTERCLASS CURRICULUM */}
            {activeRightTab === 'tutorials' && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  {activeTutorial.title}
                </span>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  {activeTutorial.plainEnglishConcept}
                </p>
                <button
                  onClick={handleRemoveBackground}
                  className="w-full py-1.5 rounded bg-[#007ACC] text-white text-xs font-bold mt-1 cursor-pointer"
                >
                  Demonstrate on Canvas →
                </button>
              </div>
            )}

          </div>

          {/* LOWER SECTION: LAYERS PANEL (Matching marker ⑤ in screenshot) */}
          <div className="flex-1 flex flex-col bg-[#262626]">
            
            {/* Layers Panel Header */}
            <div className="bg-[#2D2D2D] px-3 py-1.5 border-b border-[#1E1E1E] flex items-center justify-between text-[11px]">
              <span className="font-bold text-white uppercase tracking-wider">Layers</span>
              <span className="text-zinc-400">Channels • Paths</span>
            </div>

            {/* Filter / Search Bar */}
            <div className="px-3 py-1.5 border-b border-[#222222] flex items-center justify-between text-[11px] text-zinc-400">
              <div className="flex items-center gap-1 font-semibold text-zinc-300">
                <span>Kind ▾</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Normal ▾</span>
                <span>Opacity: <strong>100%</strong></span>
              </div>
            </div>

            {/* Lock Toggles Row */}
            <div className="px-3 py-1 border-b border-[#222222] flex items-center justify-between text-[10px] text-zinc-400">
              <span>Lock: 🔒 [ ] [ ] [ ]</span>
              <span>Fill: <strong>100%</strong></span>
            </div>

            {/* Layers Stack List (Exact names from user's screenshot!) */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {layers.map(layer => {
                const isActive = activeLayerId === layer.id;
                const isBg = layer.id === 'l-bg';

                return (
                  <div
                    key={layer.id}
                    onClick={() => setActiveLayerId(layer.id)}
                    className={`px-2 py-1.5 rounded flex items-center justify-between transition-colors cursor-pointer text-[11px] ${
                      isActive 
                        ? 'bg-[#007ACC] text-white' 
                        : 'bg-[#2B2B2B] hover:bg-[#333333] text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          sounds.playDialTick();
                          setLayers(ls => ls.map(l => l.id === layer.id ? { ...l, visible: !l.visible } : l));
                        }}
                        className="text-zinc-400 hover:text-white"
                      >
                        {layer.visible ? <Eye className="w-3.5 h-3.5 text-zinc-200" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-600" />}
                      </button>

                      {/* Layer Thumbnail & Mask Thumbnail */}
                      <div className="flex items-center gap-1">
                        <img src={imageSrc} alt="" className="w-5 h-5 rounded object-cover border border-zinc-600" />
                        {layer.hasMask && (
                          <div className="w-5 h-5 rounded bg-black border border-white/60 flex items-center justify-center" title="Layer Mask">
                            <div className="w-3 h-3 rounded-full bg-white" />
                          </div>
                        )}
                      </div>

                      <span className="font-medium truncate max-w-[140px]">{layer.name}</span>
                    </div>

                    {/* Padlock Icon for Background Layer */}
                    <div className="flex items-center gap-1">
                      {isBg && (
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleTogglePadlock();
                          }}
                          className={`p-1 rounded cursor-pointer ${
                            isLayerUnlocked 
                              ? 'text-zinc-400 hover:text-white' 
                              : 'text-amber-400 bg-amber-500/20'
                          }`}
                          title={isLayerUnlocked ? 'Unlocked Layer 0' : 'Click padlock to unlock Background layer'}
                        >
                          {isLayerUnlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Layer Action Icons (fx, Mask, Folder, Adjustment, New, Trash) */}
            <div className="bg-[#242424] px-3 py-1.5 border-t border-[#1C1C1C] flex items-center justify-between text-zinc-400 text-xs">
              <button className="hover:text-white text-[11px] font-bold" title="Layer Styles">fx</button>
              <button onClick={handleRemoveBackground} className="hover:text-white" title="Add Layer Mask">
                <div className="w-3.5 h-3.5 border border-zinc-400 rounded-xs flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                </div>
              </button>
              <button onClick={handleDuplicateLayer} className="hover:text-white" title="New Adjustment">◐</button>
              <button className="hover:text-white" title="New Group">📁</button>
              <button onClick={handleDuplicateLayer} className="hover:text-white font-bold" title="New Layer (+)">+</button>
              <button onClick={() => applyPreset('reset')} className="hover:text-rose-400" title="Delete Layer">🗑</button>
            </div>

          </div>

        </div>

      </div>

      {/* 4. VIDEO TUTORIAL & METHOD DEMO MODAL */}
      {showVideoTutorialModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1C1C22] text-[#D4D4D8] w-full max-w-3xl rounded-3xl p-6 sm:p-8 border-3 border-zinc-700 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowVideoTutorialModal(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase block">
                  STEP-BY-STEP VIDEO TUTORIAL
                </span>
                <h3 className="font-heading font-black text-xl text-white">
                  How to Remove a Background in Photoshop (1-Click & Alternative Methods)
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-6">
              <div className="bg-[#121215] p-4 rounded-xl border border-zinc-800 space-y-2">
                <span className="font-heading font-bold text-amber-400 block text-xs">
                  ① Primary Single-Click Method:
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-zinc-300">
                  <li>Click the <strong>padlock icon 🔒</strong> on the Background layer in the Layers panel to unlock it to <strong>Layer 0</strong>.</li>
                  <li>Open the Properties panel via <strong>Window &gt; Properties</strong>.</li>
                  <li>Under Quick Actions, click the blue <strong>[ Remove Background ]</strong> button.</li>
                </ol>
              </div>

              <div className="bg-[#121215] p-4 rounded-xl border border-zinc-800 space-y-2">
                <span className="font-heading font-bold text-sky-400 block text-xs">
                  ② Alternative Methods & Shortcuts:
                </span>
                <ul className="space-y-1.5 text-zinc-300">
                  <li>• <strong>Press W:</strong> Object Selection tool, click subject, click Add Layer Mask.</li>
                  <li>• <strong>Select &gt; Subject:</strong> Auto-detects silhouette, then click Layer Mask icon.</li>
                  <li>• <strong>AI Remove Tool:</strong> Brush over unwanted background areas to delete automatically.</li>
                  <li>• <strong>Ctrl + J (Cmd + J):</strong> Duplicate layer shortcut for non-destructive safety.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
              <span className="text-xs text-zinc-400">
                Ready to practice on this image?
              </span>
              <button
                onClick={() => {
                  setShowVideoTutorialModal(false);
                  handleRemoveBackground();
                }}
                className="px-5 py-2.5 bg-[#007ACC] hover:bg-[#0062A3] text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Execute 1-Click Background Removal Now →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. ACCREDITED UNIVERSITY CERTIFICATE MODAL */}
      {showCertificateModal && studentGrade && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#FAF7F0] text-[#1E1E24] w-full max-w-2xl rounded-3xl p-6 sm:p-8 border-4 border-[#DCD5C5] shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 mb-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500 text-black flex items-center justify-center font-heading font-black text-2xl shadow-md">
                🎓
              </div>
              <span className="text-[10px] font-black tracking-widest text-[#5E4DB2] uppercase block">
                PLAINLY OPEN UNIVERSITY OF CREATIVE ARTS
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#1E1E24] tracking-tight">
                Certificate of Professional Mastery
              </h2>
              <p className="text-xs text-zinc-600">
                This certifies that the candidate has demonstrated practical commercial competency in:
              </p>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#007ACC]">
                {activeTutorial.certificateTitle}
              </h3>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-3 mb-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Awarded To:</span>
                  <h4 className="font-heading font-black text-xl text-zinc-900">{studentName}</h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">AI Evaluated Grade:</span>
                  <span className="font-heading font-black text-2xl text-emerald-600">{studentGrade.score}/100 ({studentGrade.letter})</span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-zinc-600">
                <span className="font-bold text-zinc-900 block">Faculty Review & Critique:</span>
                <p className="italic text-zinc-700">{studentGrade.critique}</p>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span>Instructor: {activeTutorial.instructor.name}</span>
                <span>Verification ID: PLN-2026-{Date.now().toString().slice(-6)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">
                Zero Gear Barriers • Certified Practical Skill
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sounds.playSuccessChime();
                    window.print();
                  }}
                  className="px-4 py-2 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>

                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="px-5 py-2 rounded-xl bg-[#5E4DB2] hover:bg-[#4E3EA1] text-white font-bold text-xs cursor-pointer"
                >
                  Continue Learning →
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
