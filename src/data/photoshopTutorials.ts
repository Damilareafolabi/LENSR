import { PhotoshopTutorial } from '../types';

export interface SampleStudioPhoto {
  id: string;
  name: string;
  tagline: string;
  category: 'Full-Body Fashion' | 'Beauty Portrait' | 'Editorial Duo' | 'Group Studio' | 'Creative Pose';
  url: string;
  description: string;
  recommendedTutorialId: string;
  cameraExif: {
    lens: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
}

export const SAMPLE_STUDIO_PHOTOS: SampleStudioPhoto[] = [
  {
    id: 'artwork-mountain',
    name: 'Artwork_Project: Mountain Sunset & River',
    tagline: 'Multi-layer composite with pine forest, clouds & sky',
    category: 'Creative Pose',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85',
    description: 'Exact Photoshop 2024 reference project: practice multi-layer masking, background replacement, and color grading.',
    recommendedTutorialId: 'tut-remove-bg',
    cameraExif: {
      lens: '24-70mm f/2.8 G Master',
      aperture: 'f/8.0',
      shutter: '1/250s',
      iso: 'ISO 100'
    }
  },
  {
    id: 'studio-1',
    name: 'Studio Model: High-Fashion Athletic Pose',
    tagline: 'Full-length side profile on neutral warm cyclorama',
    category: 'Full-Body Fashion',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    description: 'Perfect for practicing full-body dodge & burn contouring, backdrop gradient cleanup, and editorial magazine cropping.',
    recommendedTutorialId: 'tut-dodge-burn',
    cameraExif: {
      lens: '85mm f/1.4 Art',
      aperture: 'f/5.6',
      shutter: '1/160s',
      iso: 'ISO 100'
    }
  },
  {
    id: 'studio-2',
    name: 'Editorial Beauty: High-Fashion Melanin Glow',
    tagline: 'Clean studio lighting with rich skin texture',
    category: 'Beauty Portrait',
    url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=85',
    description: 'Ideal for frequency separation, blemish retouching without pore loss, and luxury split-toning color grades.',
    recommendedTutorialId: 'tut-freq-sep',
    cameraExif: {
      lens: '105mm Macro f/2.8',
      aperture: 'f/8.0',
      shutter: '1/200s',
      iso: 'ISO 100'
    }
  },
  {
    id: 'studio-3',
    name: 'Editorial Duo: Contrast in White & Black',
    tagline: 'Two models in studio harmony with lace & cutout textiles',
    category: 'Editorial Duo',
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85',
    description: 'Practice dynamic range control: keeping white lace texture visible while keeping black garments rich and deep.',
    recommendedTutorialId: 'tut-editorial-color',
    cameraExif: {
      lens: '70-200mm f/2.8',
      aperture: 'f/7.1',
      shutter: '1/160s',
      iso: 'ISO 100'
    }
  },
  {
    id: 'studio-4',
    name: 'Cinematic Anamorphic Film Portrait',
    tagline: 'Moody cinematic rim lighting with deep shadows',
    category: 'Creative Pose',
    url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85',
    description: 'Master Hollywood 2.39:1 letterboxing, teal/orange film emulation, and shadow contrast preservation.',
    recommendedTutorialId: 'tut-film-cinema',
    cameraExif: {
      lens: '35mm Cine Prime',
      aperture: 'f/2.0',
      shutter: '1/50s (180°)',
      iso: 'ISO 800'
    }
  },
  {
    id: 'studio-5',
    name: 'Group Fashion: Silk, Sheer & Satin Harmony',
    tagline: 'Trio in deep burgundy, emerald green, and black',
    category: 'Group Studio',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85',
    description: 'Great for color harmonization, selective hue saturation, and cinematic 16:9 editorial banners.',
    recommendedTutorialId: 'tut-magazine-crop',
    cameraExif: {
      lens: '50mm f/1.2',
      aperture: 'f/4.0',
      shutter: '1/160s',
      iso: 'ISO 200'
    }
  }
];

export const PHOTOSHOP_TUTORIALS: PhotoshopTutorial[] = [
  {
    id: 'tut-remove-bg',
    title: 'One-Click Background Removal & AI Masking Masterclass',
    subtitle: 'Unlock Layer with Padlock Icon, Properties Quick Actions, and Pro Shortcuts (W & Ctrl+J)',
    badge: 'Essential Pro Skill',
    level: 'Beginner',
    instructor: {
      name: 'Professor Elena Rostova',
      title: 'Senior Commercial Retoucher & Masking Lead',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80'
    },
    learningObjectives: [
      'Unlock the Background layer by clicking the padlock icon to enable alpha transparency',
      'Execute single-click AI background removal via the Properties Quick Actions panel',
      'Master the 4 alternative methods: Object Selection (W), Select > Subject, AI Remove Tool, and Layer Masking',
      'Use the non-destructive Duplicate Layer shortcut (Ctrl+J / Cmd+J) to protect original pixel data'
    ],
    plainEnglishConcept: 'In Photoshop, an unopened image is locked down like a painted brick wall—it cannot have transparent glass or see-through holes. Clicking the padlock icon unlocks it into "Layer 0", granting full transparency support. Then, Photoshop’s neural engine analyzes your photo, isolates your subject, and applies a non-destructive Layer Mask. The background disappears instantly, revealing the iconic transparent checkerboard pattern!',
    whyProfessionalsUseIt: 'Every commercial product catalog, eCommerce store, movie poster, and fashion composite begins with clean subject isolation. Using layer masks ensures you never permanently delete pixels—if you ever need to restore stray hairs or clothing folds, you simply paint white on the mask!',
    videoLecture: {
      title: 'Module 1: The Step-by-Step Anatomy of 1-Click Background Removal',
      duration: '14 min lecture + Interactive Workbench',
      keyMoments: [
        { time: '01:30', topic: 'Why the padlock icon on Background blocks transparency' },
        { time: '04:15', topic: 'Window > Properties Quick Actions: Click [ Remove Background ]' },
        { time: '07:50', topic: 'Shortcut W: Object Selection tool with live bounding box' },
        { time: '11:10', topic: 'Select > Subject & creating a non-destructive Layer Mask' },
        { time: '13:20', topic: 'Duplicate Layer shortcut (Ctrl+J / Cmd+J) for safe workflows' }
      ]
    },
    certificateTitle: 'Certified Commercial Extraction & Masking Specialist',
    steps: [
      {
        stepNumber: 1,
        toolName: 'Unlock Layer via Padlock Icon 🔒 (or Ctrl+J / Cmd+J)',
        instruction: 'Click the padlock icon next to the "Background" layer in the Layers panel (or press Ctrl+J / Cmd+J to duplicate). This converts the locked canvas into "Layer 0", unlocking the alpha channel for transparency.',
        plainEnglishTip: 'If the padlock is locked, Photoshop won\'t let you punch transparent holes! Clicking the lock icon opens the door.',
        whyProUsesIt: 'A locked Background layer cannot have an alpha transparency channel.',
        visualScience: 'Initializes a 32-bit RGBA pixel buffer enabling transparency values from 0 to 255.',
        activeTool: 'move'
      },
      {
        stepNumber: 2,
        toolName: 'Window > Properties & Click [ Remove Background ]',
        instruction: 'Open the Properties panel on the right (via Window > Properties), and under Quick Actions, click the blue [ Remove Background ] button. The background vanishes, replaced by transparent checkerboard!',
        plainEnglishTip: 'Photoshop\'s Adobe Sensei AI identifies the person or product and cuts the background out in one second.',
        whyProUsesIt: 'Saves 15 to 20 minutes of painstaking manual pen-tool clipping path tracing.',
        visualScience: 'Deep convolutional neural network calculates foreground probability masks with 1.5px sub-pixel edge feathering.',
        activeTool: 'object-select'
      },
      {
        stepNumber: 3,
        toolName: 'Alternative Shortcut: Object Selection (W) & Layer Mask',
        instruction: 'Press W to grab the Object Selection tool. Click your subject, then click the Add Layer Mask icon (the rectangle with a circle inside) at the bottom-right of the Layers panel.',
        plainEnglishTip: 'Pressing W is the fastest shortcut when you have multiple people and only want to cut out one of them!',
        whyProUsesIt: 'Provides selective manual control over individual people or items in a multi-subject scene.',
        activeTool: 'object-select'
      },
      {
        stepNumber: 4,
        toolName: 'Select > Subject & AI Remove Tool Cleanup',
        instruction: 'Go to Select > Subject from the top application menu bar. If any stray background fragments remain, select the AI Remove Tool from the toolbar to paint over and vanish them.',
        plainEnglishTip: 'Non-destructive masks mean black conceals and white reveals. You can always paint back any hair or edge details!',
        whyProUsesIt: 'Industry-standard non-destructive workflow guarantees clients can change backdrops at any stage.',
        activeTool: 'remove-tool'
      }
    ]
  },
  {
    id: 'tut-freq-sep',
    title: 'High-End Beauty Retouching (Frequency Separation Masterclass)',
    subtitle: 'Smooth skin tone gradients while preserving 100% natural pore texture',
    badge: 'Industry Standard',
    level: 'Fashion Editorial',
    instructor: {
      name: 'Professor Elena Rostova',
      title: 'Senior Vogue & Harper’s Bazaar Retoucher',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80'
    },
    learningObjectives: [
      'Deconstruct an image into high-frequency spatial texture and low-frequency color waves',
      'Heal temporary skin blemishes without creating plastic blur artifacts',
      'Balance skin tone transitions across jawlines and foreheads with non-destructive feathering',
      'Deliver magazine-ready skin that looks completely natural under high-resolution print zoom'
    ],
    plainEnglishConcept: 'Your human eye perceives two separate things in a photograph: (1) Texture (tiny skin pores, fine hair, cloth weaves) and (2) Color & Tone (the broad light gradients, cheek redness, and shadows). Traditional blurring erases both, turning human faces into fake wax dolls. Frequency Separation mathematically separates the texture onto one layer and the color onto another, so you can paint smooth lighting gradients underneath while keeping every single pore completely crisp!',
    whyProfessionalsUseIt: 'Every commercial cover of Vogue, GQ, Vanity Fair, and Elle mandates Frequency Separation. Art directors reject plasticized blurring instantly. Authentic texture preservation is the boundary between amateur smartphone filters and high-paying professional photography.',
    videoLecture: {
      title: 'Module 1: The Spatial Frequency Separation Theory & Practice',
      duration: '18 min lecture + Hands-on Lab',
      keyMoments: [
        { time: '02:15', topic: 'Why blurring skin ruins commercial editorial value' },
        { time: '06:40', topic: 'Setting Gaussian Radius based on sensor megapixel pitch' },
        { time: '11:20', topic: 'Using the Spot Healing Brush only on the Texture Layer' },
        { time: '15:45', topic: 'Soft-Light tone blending and avoiding muddy contours' }
      ]
    },
    certificateTitle: 'Certified Commercial Editorial Retoucher (Level 1)',
    steps: [
      {
        stepNumber: 1,
        toolName: 'Micro-Texture & Clarity Harmonization',
        instruction: 'Dial Texture to +16 and Clarity to -8. This boosts micro-pore edge contrast while gently feathering aggressive tonal transitions across the cheekbones.',
        plainEnglishTip: 'Never blur texture! Keep pores crisp while letting broad lighting transitions roll gently across the face.',
        whyProUsesIt: 'Establishes a balanced optical foundation before manual retouching strokes are painted.',
        visualScience: 'High-pass spatial filtering isolates frequencies above 8 cycles per millimeter, where fine skin pores reside.',
        suggestedAdjustments: { texture: 16, clarity: -8 },
        activeTool: 'smooth'
      },
      {
        stepNumber: 2,
        toolName: 'Precision Spot Healing (J)',
        instruction: 'Select the Spot Healing Brush tool. Tap gently on small temporary blemishes, stray background dust, or tiny flyaway hairs.',
        plainEnglishTip: 'Keep your brush diameter only 15% larger than the mark. Let the content-aware algorithm sample neighboring healthy skin texture.',
        whyProUsesIt: 'Removes distracting temporary imperfections while preserving permanent features like birthmarks and facial structure.',
        visualScience: 'Synthesizes patch texture from surrounding pixel neighborhoods using Markov random field sampling.',
        activeTool: 'heal'
      },
      {
        stepNumber: 3,
        toolName: 'Healthy Melanin Blood Flow & Warmth Calibration',
        instruction: 'Set Temperature to +10 and Tint to +5. Studio strobe flash tubes frequently run cool (5600K–6000K), which can make rich melanin skin look grey or muted.',
        plainEnglishTip: 'Warmth brings life and blood flow back into the portrait. Rich chocolate and caramel tones thrive with gentle warmth.',
        whyProUsesIt: 'Studio flashes can wash out skin vitality; warming the white balance reproduces natural hemoglobin glow under studio lights.',
        visualScience: 'Shifts the correlated color temperature (CCT) towards 5200K, enhancing the warm spectrum in dark skin tones.',
        suggestedAdjustments: { temperature: 10, tint: 5 }
      },
      {
        stepNumber: 4,
        toolName: 'Edge Falloff Vignette for Editorial Focus',
        instruction: 'Add a subtle 18% Vignette. This gently draws the viewer’s eye inward from the frame borders directly to the model’s gaze.',
        plainEnglishTip: 'The human eye always seeks the brightest, sharpest part of an image. Darkening outer corners forces immediate eye contact.',
        whyProUsesIt: 'Prevents the eye from wandering off the edges of magazine spreads and billboard posters.',
        visualScience: 'Mimics natural cos⁴ optical lens barrel illumination falloff.',
        suggestedAdjustments: { vignette: 18 }
      }
    ]
  },
  {
    id: 'tut-dodge-burn',
    title: 'Dodge & Burn: Sculpting Dimension with Light Masterclass',
    subtitle: 'Digital makeup contouring that sculpts cheekbones, jawlines, and sparkling eye catchlights',
    badge: 'Masterclass',
    level: 'Masterclass',
    instructor: {
      name: 'Professor Marcus Sterling',
      title: 'Master Darkroom Printer & Fashion Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80'
    },
    learningObjectives: [
      'Master historical darkroom dodging and burning principles adapted for 16-bit digital workflows',
      'Carve realistic 3D volume into two-dimensional studio portraiture',
      'Sculpt cheekbones, slim facial contours, and strengthen jawline definition with light falloff',
      'Ignite pupil catchlights to make eyes sparkle with emotional depth'
    ],
    plainEnglishConcept: 'In the classic analog darkroom, "Dodging" meant physically holding a circular piece of cardboard on a wire to block light from reaching the photo paper, making that area lighter. "Burning" meant cutting a hole in cardboard to expose an area to extra light, making it darker. In modern digital photography, Dodge & Burn acts like invisible light makeup: bright highlights bring features forward towards the camera, while deep shadows push receding contours back.',
    whyProfessionalsUseIt: 'Studio strobes often flatten facial depth into a uniform plane. Dodge & Burn is the true secret behind the dramatic, sculpted Hollywood and Parisian fashion aesthetics where faces appear three-dimensionally carved from marble.',
    videoLecture: {
      title: 'Module 2: Sculpting 3D Anatomical Volume with Micro-Dodge & Burn',
      duration: '22 min lecture + Interactive Workbench',
      keyMoments: [
        { time: '03:10', topic: 'Anatomy of facial light planes: T-zone, zygomatic arches, and jawline' },
        { time: '08:45', topic: 'Setting Dodge flow to 1%-3% for invisible, seamless blending' },
        { time: '14:20', topic: 'Burning the sub-mental triangle and hollows of the cheeks' },
        { time: '19:00', topic: 'Enhancing iris luminance without creating radioactive alien eyes' }
      ]
    },
    certificateTitle: 'Certified Fashion Lighting Sculptor (Level 2)',
    steps: [
      {
        stepNumber: 1,
        toolName: 'Dodge Highlights: Lifting High Facial Planes (O)',
        instruction: 'Select the Dodge Tool. Paint smooth strokes along the high bridge of the nose, the tops of both cheekbones, and the center of the forehead.',
        plainEnglishTip: 'Think of this as high-end liquid highlighter makeup. Light brings bone structure forward into the room.',
        whyProUsesIt: 'Establishes clear specular highlights that simulate a high-end beauty dish light source.',
        visualScience: 'Increases luminance (L* in CIELAB space) without shifting hue or chromatic saturation.',
        activeTool: 'dodge'
      },
      {
        stepNumber: 2,
        toolName: 'Burn Contours: Deepening Shadow Planes (O)',
        instruction: 'Switch to the Burn Tool. Sweep gently along the hollow directly underneath the cheekbone, down the neck shadow, and along the lower jaw.',
        plainEnglishTip: 'Shadows create structure and slimming drama. A gentle burn along the jawline separates the chin crisply from the neck.',
        whyProUsesIt: 'Creates sharp separation between the face and the neck, cleaning up double-chin shadows or soft jawlines.',
        visualScience: 'Compresses midtone values towards the lower quartile of the luminance histogram.',
        activeTool: 'burn'
      },
      {
        stepNumber: 3,
        toolName: 'S-Curve Midtone Contrast Cementation',
        instruction: 'Increase Contrast to +20 and lower Shadows to -10. This cements your sculpted light strokes so they blend into an authoritative, magazine-grade finish.',
        plainEnglishTip: 'Dodging and burning thrives when midtone contrast is bold and confident. Flat midtones make retouching look milky.',
        whyProUsesIt: 'Locks in the contrast ratio established during dodging and burning for consistent print reproduction.',
        suggestedAdjustments: { contrast: 20, shadows: -10 }
      }
    ]
  },
  {
    id: 'tut-editorial-color',
    title: 'Vogue Melanin Color Grading & Skin Harmony Masterclass',
    subtitle: 'How commercial fashion retouchers achieve rich bronze skin and clean neutral backgrounds',
    badge: 'Color Science',
    level: 'Fashion Editorial',
    instructor: {
      name: 'Amara Okafor',
      title: 'Commercial Colorist & Art Director',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80'
    },
    learningObjectives: [
      'Master the color theory of dark skin tones: bronze, chocolate, caramel, and mahogany',
      'Neutralize yellow jaundice or green fluorescent cast in studio strobes',
      'Implement complementary split-toning (warm champagne highlights + cool slate shadows)',
      'Balance dark fabric textures against rich skin tones without clipping blacks'
    ],
    plainEnglishConcept: 'Amateur photos usually just take whatever colors came out of the camera. Professional editorial photography is built on rigorous color science. For rich melanin skin tones, we intentionally separate the highlights from the shadows: we infuse warm champagne gold into the high skin highlights, keep midtones rich in bronze chocolate, and keep the deep shadows clean and neutral so black clothing never looks faded or washed out.',
    whyProfessionalsUseIt: 'Global fashion houses (Gucci, Balmain, Fenty) hire colorists specifically because digital camera sensors struggle with melanin skin under commercial strobes. Mastering this unlocks commercial advertising contracts.',
    videoLecture: {
      title: 'Module 3: Commercial Color Science for Melanin Skin Tones',
      duration: '24 min lecture + Color Grade Sandbox',
      keyMoments: [
        { time: '04:00', topic: 'Why RGB cameras struggle with dark skin underexposure' },
        { time: '09:30', topic: 'Lifting shadows +25 while anchoring blacks at -15' },
        { time: '14:50', topic: 'Why Vibrance protects skin tones while Saturation destroys them' },
        { time: '19:40', topic: 'The champagne gold / deep navy split-toning formula' }
      ]
    },
    certificateTitle: 'Certified Commercial Colorist & Melanin Skin Specialist',
    steps: [
      {
        stepNumber: 1,
        toolName: 'Dynamic Shadow Lift & True Black Anchor',
        instruction: 'Set Shadows to +26 and Blacks to -14. This opens up the delicate woven textures in dark garments while keeping the core deepest shadows richly grounded.',
        plainEnglishTip: 'Never let dark outfits turn into a muddy black silhouette! Open the shadows so folds and lace stay visible, then lock down the blacks.',
        whyProUsesIt: 'Ensures the full dynamic range of the camera sensor is utilized without crushing dark clothing into flat black voids.',
        suggestedAdjustments: { shadows: 26, blacks: -14 }
      },
      {
        stepNumber: 2,
        toolName: 'Vibrance Boost with Skin-Tone Protection',
        instruction: 'Set Vibrance to +24 and Saturation to -4. Vibrance boosts muted colors while automatically protecting skin tones from turning fluorescent orange.',
        plainEnglishTip: 'Pro retouchers almost always pick Vibrance over Saturation. Saturation turns human skin into radioactive carrots; Vibrance keeps it glowing and natural.',
        whyProUsesIt: 'Selectively saturates undersaturated background pixels while applying a mathematical dampening curve to warm skin-tone hues.',
        suggestedAdjustments: { vibrance: 24, saturation: -4 }
      },
      {
        stepNumber: 3,
        toolName: 'Champagne Gold Split-Toning Grade',
        instruction: 'Set Split Highlights Hue to 38 (warm golden champagne) with Saturation 16, and Shadows Hue to 215 (subtle slate blue) with Saturation 8.',
        plainEnglishTip: 'The classic Hollywood warm highlight / cool shadow split. It creates immediate three-dimensional visual depth.',
        whyProUsesIt: 'Creates complementary color separation that mimics high-budget cinematic 35mm film stock.',
        suggestedAdjustments: { splitHighlightHue: 38, splitHighlightSat: 16, splitShadowHue: 215, splitShadowSat: 8 }
      }
    ]
  },
  {
    id: 'tut-film-cinema',
    title: 'Cinematic Filmmaking & Anamorphic 2.39:1 Emulation',
    subtitle: 'The Hollywood director’s guide to letterboxing, motivated lighting, and film color palette',
    badge: 'Cinematography',
    level: 'Fashion Editorial',
    instructor: {
      name: 'Director David K. Vance',
      title: 'Cinematographer & ASC Associate Member',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80'
    },
    learningObjectives: [
      'Understand the historical 2.39:1 Cinemascope anamorphic aspect ratio and widescreen composition',
      'Apply motivated film contrast curves with lifted toe shadows and rolled-off shoulder highlights',
      'Master the Kodak Vision3 film color matrix (teal/cyan shadows with warm skin highlights)',
      'Frame cinematic eye-trace across widescreen aspect ratios'
    ],
    plainEnglishConcept: 'Cinema does not look like video. Video is sharp, harsh, and literal. Cinema is emotional, textured, and moody. Filmmakers achieve this with three distinct tools: (1) Widescreen Anamorphic 2.39:1 letterboxing that lets human eyes breathe horizontally, (2) Lifted film shadow toes so blacks feel soft and velvety like celluloid film, and (3) Color palettes where shadows lean into rich cinematic teal while skin tones stay warmly grounded.',
    whyProfessionalsUseIt: 'Directors, cinematographers, and music video colorists earn top industry rates by giving digital video the timeless, expensive feel of 35mm Hollywood film.',
    videoLecture: {
      title: 'Module 4: Hollywood Anamorphic Composition & 35mm Celluloid Emulation',
      duration: '26 min lecture + Film Grade Workbench',
      keyMoments: [
        { time: '03:15', topic: 'Why 2.39:1 widescreen changes how actors interact in a frame' },
        { time: '08:30', topic: 'The 180-degree shutter rule for organic cinematic motion cadence' },
        { time: '14:45', topic: 'Emulating Kodak Vision3 500T film curve and highlight roll-off' },
        { time: '21:10', topic: 'Applying atmospheric dehaze and edge falloff' }
      ]
    },
    certificateTitle: 'Certified Cinematic Colorist & Film Director',
    steps: [
      {
        stepNumber: 1,
        toolName: 'Anamorphic Crop & Rule of Thirds Eyeline (C)',
        instruction: 'Select the Crop Tool. Tighten the horizontal framing to place the subject’s leading eye on the upper horizontal cinematic line.',
        plainEnglishTip: 'In cinema, the actor’s eye line must always sit along the top third of the frame. This anchors the emotional conversation with the audience.',
        whyProUsesIt: 'Matches standard Hollywood theatrical framing conventions across anamorphic lenses.',
        activeTool: 'crop'
      },
      {
        stepNumber: 2,
        toolName: 'Film Stock Matte Curve & Contrast Roll-off',
        instruction: 'Set Contrast to +24, Highlights to -18, and Shadows to +15. This gently compresses the extreme ends of the histogram to mimic soft organic celluloid film.',
        plainEnglishTip: 'Digital sensors clip harshly when they hit pure white. Celluloid film gently rolls off into creamy highlights.',
        whyProUsesIt: 'Replicates the characteristic D-log-H sensitometric curve of motion picture negative film.',
        suggestedAdjustments: { contrast: 24, highlights: -18, shadows: 15 }
      },
      {
        stepNumber: 3,
        toolName: 'Hollywood Teal & Amber Color Matrix',
        instruction: 'Set Split Shadow Hue to 195 (deep teal) with Saturation 18, and Split Highlight Hue to 42 (amber gold) with Saturation 14.',
        plainEnglishTip: 'Teal and orange sit directly opposite each other on the color wheel. This creates maximum visual punch and separates actors from backgrounds.',
        whyProUsesIt: 'The undisputed color grading standard of modern Hollywood cinema (Blade Runner 2049, Skyfall, Dune).',
        suggestedAdjustments: { splitShadowHue: 195, splitShadowSat: 18, splitHighlightHue: 42, splitHighlightSat: 14 }
      }
    ]
  },
  {
    id: 'tut-magazine-crop',
    title: 'Editorial Magazine Cover Composition & 4:5 Framing Masterclass',
    subtitle: 'Transforming wide raw captures into intimate editorial magazine covers',
    badge: 'Art Direction',
    level: 'Beginner',
    instructor: {
      name: 'Claire Beauchamp',
      title: 'Magazine Creative Director & Layout Editor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80'
    },
    learningObjectives: [
      'Master the standard 4:5 vertical editorial aspect ratio used across print magazines and Instagram',
      'Align facial features along power nodes to provide "look room" and negative space for headlines',
      'Prevent awkward limb amputations by cropping midway between joints',
      'Direct visual hierarchy towards the subject’s expression with targeted edge vignetting'
    ],
    plainEnglishConcept: 'Taking the photo is only half the battle. How you crop and frame it determines whether it looks like an accidental family snapshot or an expensive magazine cover. Magazine art directors never crop through a human joint (never through knees, ankles, or wrists). They crop midway through thighs or mid-torso, align the eyes with the top golden intersection points, and leave generous negative space above the head for the magazine title masthead!',
    whyProfessionalsUseIt: 'High-end publications (Vogue, GQ, TIME) mandate strict aspect ratios and compositional rules so text headlines and typography can harmonize with the photography.',
    videoLecture: {
      title: 'Module 5: Art Direction, Golden Ratio, and Editorial Cropping',
      duration: '16 min lecture + Layout Sandbox',
      keyMoments: [
        { time: '02:30', topic: 'Why 4:5 vertical framing commands the highest viewer retention' },
        { time: '06:15', topic: 'The golden rule: never crop through knees, elbows, or wrists' },
        { time: '10:40', topic: 'Creating "look room" and breathing space for magazine mastheads' },
        { time: '13:50', topic: 'Adding a 25% edge vignette to anchor viewer focus' }
      ]
    },
    certificateTitle: 'Certified Editorial Art Director & Cover Specialist',
    steps: [
      {
        stepNumber: 1,
        toolName: 'Crop Tool: Mid-Thigh 4:5 Vertical Framing (C)',
        instruction: 'Activate the Crop Tool. Tighten the frame to crop in from mid-thigh up to just above the hair, keeping the subject confidently centered or slightly offset.',
        plainEnglishTip: 'Never crop through ankles or knees! Always crop halfway along limbs for natural, flattering proportions.',
        whyProUsesIt: 'Conforms to print cover layouts and maximizes vertical screen estate on modern mobile displays.',
        activeTool: 'crop'
      },
      {
        stepNumber: 2,
        toolName: 'Leading Eye Alignment on Upper Power Point',
        instruction: 'Align the model’s leading eye directly on the upper-right or upper-left intersection dot of the Rule of Thirds grid.',
        plainEnglishTip: 'This gives the subject natural "look room" across the page, making the portrait feel calm, confident, and intentional.',
        whyProUsesIt: 'Immediately directs the viewer’s attention along the natural human eye-tracking diagonal.',
        activeTool: 'crop'
      },
      {
        stepNumber: 3,
        toolName: 'Optical Edge Vignetting for Intimacy',
        instruction: 'Dial Vignette to 25%. This darkens the corners by one-third stop, steering the reader’s eye directly to the model’s gaze.',
        plainEnglishTip: 'A good vignette should be felt, not consciously noticed. It keeps the viewer from scrolling past.',
        whyProUsesIt: 'Subtly frames the subject without introducing distracting artificial borders.',
        suggestedAdjustments: { vignette: 25 }
      }
    ]
  }
];
