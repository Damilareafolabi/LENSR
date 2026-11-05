export interface UniversityCourse {
  id: string;
  title: string;
  specialization: string;
  partner: string;
  partnerLogoText: string;
  partnerBadgeColor: string;
  rating: number;
  enrolledLearners: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'All Levels';
  category: 'Photography & Film' | 'Photoshop & Retouching' | 'Cybersecurity' | 'AI & Tech' | 'Health & Science' | 'Business & Life';
  plainEnglishSummary: string;
  whatYouWillBuild: string;
  aiTeacher: {
    name: string;
    title: string;
    avatar: string;
    teachingStyle: string;
    greeting: string;
  };
  practiceRoom: {
    type: 'camera' | 'photoshop' | 'security' | 'coding' | 'habits';
    name: string;
    description: string;
  };
  syllabus: {
    week: number;
    title: string;
    plainEnglishLesson: string;
    handsOnPractice: string;
    tinyWin: string;
  }[];
}

export const UNIVERSITY_CATALOG: UniversityCourse[] = [
  {
    id: 'course-photo-mastery',
    title: 'Professional Photography & Cinematic Composition Specialization',
    specialization: 'Visual Arts Master Track',
    partner: 'California Institute of the Arts',
    partnerLogoText: 'CalArts',
    partnerBadgeColor: '#7C3AED',
    rating: 4.9,
    enrolledLearners: '420,890',
    duration: '4 weeks (2-3 hrs/wk)',
    level: 'Beginner',
    category: 'Photography & Film',
    plainEnglishSummary: "You don't need to own a camera to start. Our virtual camera lets you capture, edit and save your pictures to any device — all in one platform.",
    whatYouWillBuild: 'A 5-photo portfolio shot in our interactive 3D DSLR simulator with verified composition critique.',
    aiTeacher: {
      name: 'Professor Maya Lin',
      title: 'Director of Photography & Fellow',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
      teachingStyle: 'Vivid visual analogies, friendly, zero technical intimidation.',
      greeting: "Hi there! I believe you don't need a single piece of expensive gear to create breathtaking art. Let's practice with our 3D camera!"
    },
    practiceRoom: {
      type: 'camera',
      name: '3D Virtual DSLR & AR Viewfinder',
      description: 'Hold a simulated camera in 3D AR, adjust aperture & shutter dials in real time, and snap photos with composition coaching.'
    },
    syllabus: [
      {
        week: 1,
        title: 'Holding the Camera & Seeing Light',
        plainEnglishLesson: 'Learn what the reflex mirror and sensor do inside the camera body, and how light direction shapes faces.',
        handsOnPractice: 'Rotate the 3D DSLR to inspect internal lens elements and the reflex mirror.',
        tinyWin: 'I inspected all internal DSLR parts!'
      },
      {
        week: 2,
        title: 'Aperture & The Creamy Bokeh Magic',
        plainEnglishLesson: 'Why smaller numbers like f/1.8 mean a wide window that blurs backgrounds, while f/16 keeps landscapes sharp.',
        handsOnPractice: 'Dial aperture to f/1.8 in the AR Viewfinder and capture a portrait with background blur.',
        tinyWin: 'I captured my first creamy portrait!'
      },
      {
        week: 3,
        title: 'Shutter Speed & Freezing Fast Action',
        plainEnglishLesson: 'Opening the shutter for 1/1000s freezes flying birds; leaving it open for 1s creates silky motion trails.',
        handsOnPractice: 'Capture the flying falcon environment at 1/2000s without any motion blur.',
        tinyWin: 'I froze high-speed motion in mid-air.'
      },
      {
        week: 4,
        title: 'The Rule of Thirds & Hollywood Framing',
        plainEnglishLesson: 'Why placing people off-center creates dynamic visual energy and how to frame 2.39:1 Cinemascope widescreen.',
        handsOnPractice: 'Align subject eyes with the upper-third intersection dots using the AR composition grid.',
        tinyWin: 'I earned my Photography Master Specialization badge!'
      }
    ]
  },
  {
    id: 'course-photoshop-pro',
    title: 'High-End Fashion & Editorial Retouching Masterclass',
    specialization: 'Digital Darkroom Professional',
    partner: 'Editorial Arts Institute',
    partnerLogoText: 'Editorial Arts',
    partnerBadgeColor: '#0284C7',
    rating: 4.9,
    enrolledLearners: '284,100',
    duration: '3 weeks (2 hrs/wk)',
    level: 'All Levels',
    category: 'Photoshop & Retouching',
    plainEnglishSummary: 'Learn high-end beauty skin retouching using Frequency Separation, digital makeup contouring with Dodge & Burn, and Vogue melanin color grading.',
    whatYouWillBuild: '3 commercial-grade magazine retouches processed inside our authentic Photoshop editing interface.',
    aiTeacher: {
      name: 'Elena Rostova',
      title: 'Lead Commercial Retoucher',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
      teachingStyle: 'Hands-on, precision-focused, celebrates natural skin texture.',
      greeting: "Welcome! We never turn models into plastic wax. I'll show you how Vogue retouchers preserve natural pores while polishing light."
    },
    practiceRoom: {
      type: 'photoshop',
      name: 'Photoshop Studio Suite',
      description: 'Full dark-themed editing suite with adjustment layers, frequency separation, spot healing, and split-screen comparison.'
    },
    syllabus: [
      {
        week: 1,
        title: 'Frequency Separation Demystified',
        plainEnglishLesson: 'Split image data into texture (pores) and tone (color). Clean up temporary marks without disturbing underlying gradients.',
        handsOnPractice: 'Use the Spot Healing Brush (J) on studio portraits to clean blemishes while leaving pores 100% untouched.',
        tinyWin: 'I completed my first authentic frequency separation!'
      },
      {
        week: 2,
        title: 'Dodge & Burn: Sculpting with Light',
        plainEnglishLesson: 'Use light like digital contour makeup to lift cheekbones, sharpen jawlines, and ignite catchlights in the eyes.',
        handsOnPractice: 'Apply the Dodge Tool on forehead/cheek highlights and the Burn Tool on jaw contours.',
        tinyWin: 'I sculpted a 3D portrait using light.'
      },
      {
        week: 3,
        title: 'Editorial Melanin Color Grading',
        plainEnglishLesson: 'Color harmonization: warm golden highlights, chocolate bronze skin tones, and cool neutral backdrops.',
        handsOnPractice: 'Dial the Split-Toning highlight to champagne gold and add subtle corner vignetting.',
        tinyWin: 'I created an editorial cover-ready grade!'
      }
    ]
  },
  {
    id: 'course-cinematography-mastery',
    title: 'Hollywood Cinematography & Anamorphic Filmmaking Specialization',
    specialization: 'Director of Photography Master Track',
    partner: 'National Film & Cinematic Arts Institute',
    partnerLogoText: 'Cinematic Arts',
    partnerBadgeColor: '#D97706',
    rating: 4.95,
    enrolledLearners: '348,920',
    duration: '4 weeks (2-3 hrs/wk)',
    level: 'All Levels',
    category: 'Photography & Film',
    plainEnglishSummary: 'Master the visual grammar of motion pictures: three-point lighting ratios, 2.39:1 Cinemascope widescreen framing, the 180-degree shutter cadence, and mood-driven color palettes.',
    whatYouWillBuild: 'A complete cinematic mood reel graded with Kodak Vision3 film curves in our Photoshop Darkroom and framed in the AR Viewfinder.',
    aiTeacher: {
      name: 'Director David K. Vance',
      title: 'ASC Associate Member & Director of Photography',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
      teachingStyle: 'Visual storyteller, emotional lighting architect, practical film set veteran.',
      greeting: "Welcome to filmmaking! A camera only records what light reveals. I will show you how to shape shadows so every shot feels like Hollywood cinema."
    },
    practiceRoom: {
      type: 'camera',
      name: '3D AR Viewfinder & 2.39:1 Cinema Mask',
      description: 'Practice widescreen 2.39:1 framing, test shutter speeds for 180-degree motion cadence, and frame actors with leading lines.'
    },
    syllabus: [
      {
        week: 1,
        title: 'Three-Point Lighting & Motivated Light',
        plainEnglishLesson: 'Key Light (shapes the face), Fill Light (softens shadows), and Rim/Hair Light (peels the actor off the dark wall).',
        handsOnPractice: 'Frame a model using high-contrast side lighting in the AR Viewfinder.',
        tinyWin: 'I mastered the classic Hollywood triangle lighting!'
      },
      {
        week: 2,
        title: 'The 2.39:1 Cinemascope Widescreen Language',
        plainEnglishLesson: 'Why widescreen aspect ratios allow characters to breathe horizontally and create epic negative space.',
        handsOnPractice: 'Activate the 2.39:1 Anamorphic letterbox mask and position the actor along the golden third.',
        tinyWin: 'I framed my first widescreen movie shot.'
      },
      {
        week: 3,
        title: 'The 180-Degree Shutter Rule',
        plainEnglishLesson: 'Double the frame rate: shooting at 24fps requires a 1/50s shutter speed for organic, dreamlike motion cadence.',
        handsOnPractice: 'Set shutter to 1/60s on fast action in the simulator to evaluate motion blur trails.',
        tinyWin: 'I calibrated cinematic motion cadence.'
      },
      {
        week: 4,
        title: 'Film Emulation & Color Temperature Grading',
        plainEnglishLesson: 'Separating 3200K warm tungsten practical lamps from cool 5600K moonlight for dynamic color depth.',
        handsOnPractice: 'Apply the Hollywood Teal & Amber split-grade in the Photoshop Studio.',
        tinyWin: 'I earned my Hollywood Cinematography Certificate!'
      }
    ]
  },
  {
    id: 'course-cybersecurity-google',
    title: 'Cybersecurity Professional Certificate & Incident Defense',
    specialization: 'Security Architecture Track',
    partner: 'Global Security Consortium',
    partnerLogoText: 'Security Hub',
    partnerBadgeColor: '#059669',
    rating: 4.8,
    enrolledLearners: '512,400',
    duration: '4 weeks (3 hrs/wk)',
    level: 'Beginner',
    category: 'Cybersecurity',
    plainEnglishSummary: 'Learn how hackers trick people with phishing, how network firewalls guard ports, and how to defend real systems without writing scary code.',
    whatYouWillBuild: 'A complete incident response playbook and hardened multi-factor authentication security system.',
    aiTeacher: {
      name: 'Inspector Sarah Chen',
      title: 'Senior Incident Response Architect',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
      teachingStyle: 'Pragmatic, detective-like, focused on human habits over obscure theory.',
      greeting: "Hello! Hackers don't break windows; they knock and ask for passwords. I'll teach you how to lock every entrance."
    },
    practiceRoom: {
      type: 'security',
      name: 'Network Defense Simulator',
      description: 'Audit simulated networks, test password entropy, and analyze phishing headers in a safe sandbox.'
    },
    syllabus: [
      {
        week: 1,
        title: 'The CIA Security Triad in Plain English',
        plainEnglishLesson: 'Confidentiality (keeping secrets secret), Integrity (keeping data untouched), and Availability (keeping servers running).',
        handsOnPractice: 'Identify 3 vulnerable open ports on a simulated company server.',
        tinyWin: 'I understood the core rule of cybersecurity.'
      },
      {
        week: 2,
        title: 'Social Engineering & Phishing Traps',
        plainEnglishLesson: 'How attackers fake bank alerts, urgent customs fees, and CEO emails to manipulate human fear.',
        handsOnPractice: 'Audit 5 suspicious email headers and flag the fake spoofed domains.',
        tinyWin: 'I spotted 5 disguised phishing emails.'
      },
      {
        week: 3,
        title: 'Cryptography, Hashes & 2FA',
        plainEnglishLesson: 'How SHA-256 creates unique digital fingerprints and why SMS codes can be hijacked while app keys cannot.',
        handsOnPractice: 'Hash passwords and test brute-force resistance time.',
        tinyWin: 'I verified cryptographic hash safety.'
      }
    ]
  },
  {
    id: 'course-ai-python',
    title: 'Practical AI & Machine Learning for Curious Humans',
    specialization: 'Artificial Intelligence Foundations',
    partner: 'Stanford Online Initiative',
    partnerLogoText: 'Stanford',
    partnerBadgeColor: '#B91C1C',
    rating: 4.9,
    enrolledLearners: '680,200',
    duration: '5 weeks (3-4 hrs/wk)',
    level: 'Beginner',
    category: 'AI & Tech',
    plainEnglishSummary: 'Demystify artificial intelligence. Learn how neural networks learn patterns, how LLMs predict the next word, and how to build helpful automated tools.',
    whatYouWillBuild: 'A personalized automated knowledge assistant and pattern predictor.',
    aiTeacher: {
      name: 'Dr. Marcus Vance',
      title: 'AI Research Fellow',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
      teachingStyle: 'Friendly whiteboard sketches, zero intimidating math, outcome-driven.',
      greeting: "Hey! AI is not magic; it is simply statistics wrapped in clean code. Let me show you how it works in plain human words."
    },
    practiceRoom: {
      type: 'coding',
      name: 'AI Playground & Logic Lab',
      description: 'Test prompts, inspect model reasoning, and experiment with code scripts with real-time AI guidance.'
    },
    syllabus: [
      {
        week: 1,
        title: 'How Computers Learn from Experience',
        plainEnglishLesson: 'Supervised learning: showing a computer 1,000 pictures of apples so it recognizes the 1,001st.',
        handsOnPractice: 'Train a basic classification model in the visual sandbox.',
        tinyWin: 'I trained my first machine learning model!'
      },
      {
        week: 2,
        title: 'Language Models: The Infinite Word Game',
        plainEnglishLesson: 'How modern models calculate token probabilities and why clear prompt framing changes everything.',
        handsOnPractice: 'Craft structured few-shot prompts to automate customer support sorting.',
        tinyWin: 'I built an automated text sorter.'
      }
    ]
  },
  {
    id: 'course-fullstack-dev',
    title: 'Full-Stack Web Development & Cloud Applications',
    specialization: 'Software Engineering Career Track',
    partner: 'IBM Skills Network',
    partnerLogoText: 'IBM Skills',
    partnerBadgeColor: '#1E40AF',
    rating: 4.8,
    enrolledLearners: '390,400',
    duration: '6 weeks (3 hrs/wk)',
    level: 'All Levels',
    category: 'AI & Tech',
    plainEnglishSummary: 'Build real web apps from scratch. HTML is the skeleton, CSS is the wardrobe, and JavaScript is the muscles and brain.',
    whatYouWillBuild: 'A responsive full-stack web application with cloud deployment.',
    aiTeacher: {
      name: 'Devon Patel',
      title: 'Staff Software Architect',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
      teachingStyle: 'Hands-on coding, builds intuition before syntax, emphasizes clean UX.',
      greeting: "Hello! If you can write a recipe, you can code software. Let's build something real together."
    },
    practiceRoom: {
      type: 'coding',
      name: 'Interactive Code Sandbox',
      description: 'Live code editor with instant browser preview and step-by-step guidance.'
    },
    syllabus: [
      {
        week: 1,
        title: 'HTML & CSS: The Visual Blueprint',
        plainEnglishLesson: 'Arranging boxes on a screen and making them look clean and modern.',
        handsOnPractice: 'Style a responsive profile card with flexbox and shadows.',
        tinyWin: 'I created my first custom web layout!'
      }
    ]
  },
  {
    id: 'course-wellbeing-yale',
    title: 'The Science of Well-Being & Peak Focus Habits',
    specialization: 'Human Potential & Psychology',
    partner: 'Yale University Institute',
    partnerLogoText: 'Yale',
    partnerBadgeColor: '#0F766E',
    rating: 4.9,
    enrolledLearners: '950,000',
    duration: '3 weeks (1-2 hrs/wk)',
    level: 'Beginner',
    category: 'Business & Life',
    plainEnglishSummary: 'What psychological science actually says about happiness, focus, and overcoming procrastination without relying on sheer willpower.',
    whatYouWillBuild: 'A daily deep-work routine and habit tracking scorecard.',
    aiTeacher: {
      name: 'Dr. Laurie Vance',
      title: 'Cognitive Science Professor',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
      teachingStyle: 'Compassionate, grounded in empirical data, warm and uplifting.',
      greeting: "Welcome! Our minds trick us into believing that more stuff brings happiness. Let's explore what the scientific research actually proves."
    },
    practiceRoom: {
      type: 'habits',
      name: 'Focus & Reflection Chamber',
      description: 'Interactive habit builder with cognitive reframing tools and daily momentum counters.'
    },
    syllabus: [
      {
        week: 1,
        title: 'Misconceptions About Happiness',
        plainEnglishLesson: 'Why human brains adapt to good news quickly (hedonic adaptation) and how to reset perspective.',
        handsOnPractice: 'Log 3 small micro-moments of gratitude in the practice log.',
        tinyWin: 'I practiced active gratitude re-centering.'
      }
    ]
  }
];
