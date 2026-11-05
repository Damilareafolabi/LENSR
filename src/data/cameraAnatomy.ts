import { CameraPartAnatomy } from '../types';

export const CAMERA_ANATOMY_PARTS: CameraPartAnatomy[] = [
  {
    id: 'lens-elements',
    name: 'Lens Elements (Glass Optics)',
    category: 'Optics',
    plainEnglishDesc: 'Curved pieces of high-purity glass that gather light from the world and bend it so it focuses into a razor-sharp image.',
    howItWorks: 'Multiple convex and concave glass lenses work together to cancel out color fringing (chromatic aberration) and barrel distortion.',
    howToUseIt: 'Rotate the zoom ring on the barrel to bring distant subjects closer, and turn the focus ring to lock focus onto your subject.',
    position3D: [0, 0, 2.2],
    diagramReferenceKey: 'images_b65484ed.jpg',
    diagramLabel: 'Lens Elements (Internal cross-section)'
  },
  {
    id: 'aperture-iris',
    name: 'Aperture (Iris Diaphragm)',
    category: 'Optics',
    plainEnglishDesc: 'An expandable circular window inside the lens that acts just like the pupil in your human eye.',
    howItWorks: 'Overlapping curved metal blades open wide (f/1.4, f/1.8) to let in huge amounts of light and blur the background, or close down (f/11, f/22) for infinite sharpness from front to back.',
    howToUseIt: 'Use the Main Dial on top of the camera. Lower f-number = blurry background portrait; Higher f-number = sharp landscape.',
    position3D: [0, 0, 1.4],
    diagramReferenceKey: 'images_b65484ed.jpg',
    diagramLabel: 'Aperture (Adjustable iris)'
  },
  {
    id: 'reflex-mirror',
    name: 'Reflex Mirror & Relay',
    category: 'Sensor & Mechanics',
    plainEnglishDesc: 'A 45-degree mirror that bounces light up into your eye so you see the exact real world with zero delay.',
    howItWorks: 'When you are framing, the mirror reflects light upward through the pentaprism to the viewfinder. When you press the shutter, it flips up in 1/50th of a second so light hits the sensor.',
    howToUseIt: 'Automatic! You hear the signature mechanical "clack-clack" click as the mirror flips up and drops back down.',
    position3D: [0, 0, 0.4],
    diagramReferenceKey: 'images_b65484ed.jpg',
    diagramLabel: 'Mirror (45° angle)'
  },
  {
    id: 'digital-sensor',
    name: 'Electronic CMOS Sensor',
    category: 'Sensor & Mechanics',
    plainEnglishDesc: 'The digital "film" — a silicon chip packed with millions of tiny microscopic light buckets (pixels) that turn photons into pixels.',
    howItWorks: 'Each pixel absorbs photons, creating an electrical charge converted by an analog-to-digital processor into colors (Red, Green, Blue Bayer filter array).',
    howToUseIt: 'Adjust the ISO setting. ISO 100 delivers pristine, clean photos in daylight. ISO 3200 amplifies low-light signals for night shots.',
    position3D: [0, 0, -0.3],
    diagramReferenceKey: 'images_b65484ed.jpg',
    diagramLabel: 'Electronic sensor (CMOS focal plane)'
  },
  {
    id: 'viewfinder',
    name: 'Optical Viewfinder & Pentaprism',
    category: 'Viewing & Display',
    plainEnglishDesc: 'The optical window you press your eye against to frame your composition without any sun glare or screen reflections.',
    howItWorks: 'A 5-sided glass prism (pentaprism) flips the upside-down image bounced from the reflex mirror right-side up so your eye sees normal orientation.',
    howToUseIt: 'Look through the soft rubber eyecup. Use the tiny diopter adjustment dial next to it if you wear glasses!',
    position3D: [0, 1.1, -0.6],
    diagramReferenceKey: 'images_460197b9.jpg',
    diagramLabel: 'Viewfinder & Diopter adjustment'
  },
  {
    id: 'shutter-release',
    name: 'Shutter Release Button',
    category: 'Controls & Dials',
    plainEnglishDesc: 'The main button under your right index finger that takes the picture.',
    howItWorks: 'Has two distinct pressure steps: press halfway down to lock autofocus and meter the light (you hear a beep), then press all the way to take the shot.',
    howToUseIt: 'Hold your breath gently and squeeze smoothly rather than jabbing to avoid camera shake blur.',
    position3D: [1.3, 1.1, 0.4],
    diagramReferenceKey: 'images_0933edbb.jpg',
    diagramLabel: 'Shutter Button (Two-stage)'
  },
  {
    id: 'mode-dial',
    name: 'Mode Dial (Auto, P, Tv, Av, M)',
    category: 'Controls & Dials',
    plainEnglishDesc: 'The round notched wheel that tells the camera how much control you want.',
    howItWorks: 'Auto = camera guesses everything. Av / A = you pick the aperture/blur, camera picks shutter speed. Tv / S = you pick shutter speed to freeze motion. M = you are the master of all settings!',
    howToUseIt: 'Turn the dial on the top left/right plate until your desired shooting mode clicks into place.',
    position3D: [-1.2, 1.25, -0.2],
    diagramReferenceKey: 'images_0933edbb.jpg',
    diagramLabel: 'Mode Dial (Shooting modes)'
  },
  {
    id: 'main-dial',
    name: 'Main Control Dial',
    category: 'Controls & Dials',
    plainEnglishDesc: 'The ribbed wheel right behind the shutter button used to quickly flick between shutter speeds and f-stop values.',
    howItWorks: 'Rotary digital encoder that increments or decrements exposure values in 1/3-stop steps.',
    howToUseIt: 'Flick left or right with your index finger while keeping your eye glued to the viewfinder.',
    position3D: [1.1, 1.2, 0.2],
    diagramReferenceKey: 'images_0933edbb.jpg',
    diagramLabel: 'Main Dial'
  },
  {
    id: 'rear-lcd',
    name: 'Rear Live LCD Screen',
    category: 'Viewing & Display',
    plainEnglishDesc: 'The 3-inch high-resolution screen on the back for reviewing your shots, checking exposure histograms, and framing video.',
    howItWorks: 'Displays live feed direct from the sensor in Live View mode, along with optical telemetry (shutter speed, f-number, ISO, battery, shots remaining).',
    howToUseIt: 'Press the Quick "Q" or Menu button to change settings, or press the Play button to review your captured photos.',
    position3D: [0, 0, -1.15],
    diagramReferenceKey: 'images_460197b9.jpg',
    diagramLabel: 'LCD Display Screen (Data & Live view)'
  },
  {
    id: 'hot-shoe',
    name: 'Flash Hot Shoe',
    category: 'Controls & Dials',
    plainEnglishDesc: 'The metal bracket with electrical pins on top of the viewfinder used to mount external Speedlite flashes or wireless transmitters.',
    howItWorks: 'Contains sync contacts that fire high-voltage flash bursts in sync with the mechanical shutter curtain opening.',
    howToUseIt: 'Slide your flash into the metal rails until it clicks, then tighten the locking wheel.',
    position3D: [0, 1.45, -0.4],
    diagramReferenceKey: 'images_0933edbb.jpg',
    diagramLabel: 'Flash Hot Shoe & Sync contacts'
  }
];

export const DIAGRAM_REFERENCES = [
  {
    id: 'cross-section',
    title: 'DSLR Internal Cross-Section & Optical Light Path',
    imageSrc: '/assets/aistudio/images_b65484ed.jpg',
    description: 'Shows the path of light entering through the lens elements, passing the aperture iris, bouncing off the reflex mirror into the viewfinder, and reaching the digital sensor.',
    keyParts: ['Viewfinder', 'Data display', 'Shutter release', 'Electronic sensor', 'Aperture', 'Lens Elements']
  },
  {
    id: 'front-nomenclature',
    title: 'Front & Side Nomenclature & Terminals',
    imageSrc: '/assets/aistudio/images_47f7aaab.jpg',
    description: 'Labels every exterior control: Shutter button, Main Dial, Mode Dial, Lens Mount, Lens Release button, Remote control & HDMI terminals.',
    keyParts: ['Mode Dial', 'Shutter button', 'Main Dial', 'Lens mount', 'Mirror', 'Remote terminal']
  },
  {
    id: 'rear-controls',
    title: 'Rear LCD & Button Navigation',
    imageSrc: '/assets/aistudio/images_460197b9.jpg',
    description: 'Details the rear layout: Viewfinder eyepiece, LCD data screen, Exposure parameters (P 1/40 F4.0 ISO 400), Quick dial, ISO, AF, WB buttons.',
    keyParts: ['Viewfinder', 'LCD Screen', 'ISO button', 'AF button', 'WB button', 'Dioptric knob']
  },
  {
    id: 'top-controls',
    title: 'Top Plate & Hot Shoe Layout',
    imageSrc: '/assets/aistudio/images_0933edbb.jpg',
    description: 'Top-down perspective: Flash hot shoe, Mode Dial, Main Dial, Shutter release button, Flash button, Autofocus switch.',
    keyParts: ['Flash hot shoe', 'Mode Dial', 'Main Dial', 'Shutter Button', 'Speaker', 'AF/MF switch']
  },
  {
    id: 'infographic-parts',
    title: 'Parts & Functions Educational Infographic',
    imageSrc: '/assets/aistudio/images_3b2c15b2.jpg',
    description: 'Visual breakdown explaining the functional purpose of Focusing screen, Digital sensor, Shutter curtain, Display, and Aperture blades.',
    keyParts: ['Digital Sensor', 'Focusing Screen', 'Shutter', 'Aperture', 'Zoom Elements']
  }
];
