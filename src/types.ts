export type ActiveTab = 'university' | 'camera' | 'editor' | 'discovery' | 'blog' | 'laptop';

export type CameraViewMode = '3d-inspect' | 'viewfinder-ar' | 'anatomy-guide';

export type EditorTool = 'move' | 'crop' | 'object-select' | 'remove-tool' | 'heal' | 'dodge' | 'burn' | 'smooth' | 'eyedropper' | 'hand' | 'zoom';

export interface PhotoAdjustments {
  exposure: number;       // -100 to 100
  contrast: number;       // -100 to 100
  highlights: number;     // -100 to 100
  shadows: number;        // -100 to 100
  whites: number;         // -100 to 100
  blacks: number;         // -100 to 100
  temperature: number;    // -100 (cool) to +100 (warm)
  tint: number;           // -100 (green) to +100 (magenta)
  vibrance: number;       // -100 to 100
  saturation: number;     // -100 to 100
  clarity: number;        // -100 to 100
  texture: number;        // -100 to 100
  dehaze: number;         // -100 to 100
  vignette: number;       // 0 to 100
  splitShadowHue: number; // 0 to 360
  splitShadowSat: number; // 0 to 100
  splitHighlightHue: number; // 0 to 360
  splitHighlightSat: number; // 0 to 100
}

export interface LayerItem {
  id: string;
  name: string;
  visible: boolean;
  locked?: boolean;
  hasMask?: boolean;
  opacity: number; // 0 to 100
  blendMode: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'color' | 'luminosity';
  type: 'image' | 'curves' | 'color-grade' | 'retouch-heal' | 'dodge-burn' | 'vignette' | 'mask';
}

export interface PhotoshopTutorial {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  level: 'Beginner' | 'Fashion Editorial' | 'Masterclass';
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  learningObjectives: string[];
  plainEnglishConcept: string;
  whyProfessionalsUseIt: string;
  videoLecture: {
    title: string;
    duration: string;
    keyMoments: { time: string; topic: string }[];
  };
  certificateTitle: string;
  steps: {
    stepNumber: number;
    toolName: string;
    instruction: string;
    plainEnglishTip: string;
    whyProUsesIt?: string;
    visualScience?: string;
    suggestedAdjustments?: Partial<PhotoAdjustments>;
    activeTool?: EditorTool;
  }[];
}

export type SimulatedEnvironment = 'portrait' | 'cyberpunk' | 'architecture' | 'wildlife';

export interface CameraSettings {
  aperture: number;       // e.g. 1.8, 2.8, 4.0, 5.6, 8.0, 16, 22
  shutterSpeed: string;   // e.g. "1/4000", "1/1000", "1/250", "1/60", "1/15", "1/2"
  shutterSeconds: number; // numeric value for calculations
  iso: number;            // 100, 200, 400, 800, 1600, 3200, 6400
  focalLength: number;    // 18, 24, 35, 50, 85, 135, 200
  focusDistance: number;  // 0.5m to 20m (or infinity)
  evCompensation: number; // -3.0 to +3.0
}

export interface ARGuides {
  ruleOfThirds: boolean;
  goldenSpiral: boolean;
  leadingLines: boolean;
  centerCross: boolean;
  aspectMask: 'none' | 'cinemascope' | '16:9' | '4:3' | '1:1' | '9:16';
  focusPeaking: boolean;
  histogram: boolean;
}

export interface CapturedPhoto {
  id: string;
  timestamp: string;
  imageDataUrl: string;
  environment: string;
  settings: CameraSettings;
  aspectRatio: string;
  scores: {
    composition: number; // 0 - 100
    exposure: number;    // 0 - 100
    focus: number;       // 0 - 100
    overall: number;     // 0 - 100
  };
  critique: {
    summary: string;
    strengths: string[];
    plainEnglishTip: string;
  };
}

export interface CameraMission {
  id: string;
  title: string;
  subtitle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Cinematic Pro';
  plainEnglishGoal: string;
  whyItMatters: string;
  targetSettings: {
    apertureRange?: [number, number];
    shutterRange?: [number, number];
    isoMax?: number;
    recommendedFocalLength?: number;
    recommendedGuide?: keyof ARGuides;
  };
  rewardBadge: string;
  isCompleted?: boolean;
}

export interface CameraPartAnatomy {
  id: string;
  name: string;
  category: 'Optics' | 'Sensor & Mechanics' | 'Controls & Dials' | 'Viewing & Display';
  plainEnglishDesc: string;
  howItWorks: string;
  howToUseIt: string;
  position3D: [number, number, number];
  diagramReferenceKey: string;
  diagramLabel: string;
}

export interface OpenCourse {
  id: string;
  category: 'Cybersecurity' | 'Photography' | 'Cinematography' | 'AI & Coding' | 'Computer Science' | 'Design';
  resourceType: 'Lesson Plan' | 'Textbook' | 'Presentation' | 'Course' | 'Interactive Lab' | 'Guide';
  title: string;
  simpleExplanation: string;
  providerDescription: string;
  provider: string;
  license: string;
  licenseUrl: string;
  originalUrl: string;
  steps: {
    stepNumber: number;
    title: string;
    actionableGuide: string;
    estimatedMinutes: number;
    tinyWin: string;
  }[];
  plainlyPracticeTarget: 'camera' | 'security-sandbox' | 'coding-sandbox';
  isAutoDiscovered?: boolean;
  dateDiscovered: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  plainEnglishSummary: string;
  content: string;
  actionableTakeaways: string[];
  viewsCount: number;
  likesCount: number;
  tags: string[];
}
