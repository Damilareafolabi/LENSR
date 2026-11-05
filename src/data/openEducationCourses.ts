import { OpenCourse } from '../types';

export const INITIAL_OPEN_COURSES: OpenCourse[] = [
  // --- CYBERSECURITY (Directly matching user prompt specifications) ---
  {
    id: 'cyber-1',
    category: 'Cybersecurity',
    resourceType: 'Lesson Plan',
    title: 'Ethical Hacking: Network Security and Penetration Testing',
    simpleExplanation: 'In simple words: This is about finding the unlocked windows in a computer system before bad guys do, so you can lock them up tight.',
    providerDescription: 'A complete hands-on curriculum covering scanning, reconnaissance, Wi-Fi defense, and vulnerability auditing using simulated ethical test environments.',
    provider: 'ALG Commons',
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    originalUrl: 'https://oer.galileo.usg.edu/compsci-collections/ethical-hacking',
    dateDiscovered: '2026-11-04',
    plainlyPracticeTarget: 'security-sandbox',
    steps: [
      {
        stepNumber: 1,
        title: 'Learn how computers say hello',
        actionableGuide: 'Discover IP addresses and ports like house numbers and doors. Learn what a firewall is by seeing how it blocks unknown guests.',
        estimatedMinutes: 15,
        tinyWin: 'I identified how my home Wi-Fi protects my phone!'
      },
      {
        stepNumber: 2,
        title: 'Run a friendly network scan',
        actionableGuide: 'Use a safe command line tool to see what devices are currently awake on your network.',
        estimatedMinutes: 20,
        tinyWin: 'I mapped out my local network safely.'
      },
      {
        stepNumber: 3,
        title: 'Spotting easy security traps',
        actionableGuide: 'Inspect common default passwords (like admin/admin) and why keeping software updated prevents 90% of attacks.',
        estimatedMinutes: 15,
        tinyWin: 'I changed all default router passwords.'
      },
      {
        stepNumber: 4,
        title: 'Drafting your first security report',
        actionableGuide: 'Write a 1-page friendly checklist for friends or family on how to safeguard their email and banking.',
        estimatedMinutes: 20,
        tinyWin: 'I created a family cyber safety checklist!'
      }
    ]
  },
  {
    id: 'cyber-2',
    category: 'Cybersecurity',
    resourceType: 'Lesson Plan',
    title: 'CYBR 2106: Introduction to Information Security',
    simpleExplanation: 'In simple words: This is about keeping people, accounts, phones and computers safer against phishing, scams, and data leaks.',
    providerDescription: 'Foundational undergraduate course published by ALG Commons covering the CIA triad (Confidentiality, Integrity, Availability), cryptography basics, and risk management.',
    provider: 'ALG Commons',
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    originalUrl: 'https://oer.galileo.usg.edu/compsci-collections/cybr2106',
    dateDiscovered: '2026-11-04',
    plainlyPracticeTarget: 'security-sandbox',
    steps: [
      {
        stepNumber: 1,
        title: 'The Golden Triangle of Security (C-I-A)',
        actionableGuide: 'Understand why keeping secrets secret (Confidentiality), keeping data unchanged (Integrity), and keeping servers online (Availability) is the heart of all IT.',
        estimatedMinutes: 10,
        tinyWin: 'I understand what the CIA security triad means.'
      },
      {
        stepNumber: 2,
        title: 'How passwords and 2FA work',
        actionableGuide: 'Set up an authenticator app and learn why SMS codes can be hijacked while app keys cannot.',
        estimatedMinutes: 15,
        tinyWin: 'I activated hardware/app 2FA on my main email.'
      },
      {
        stepNumber: 3,
        title: 'Spotting fake phishing emails',
        actionableGuide: 'Examine header spoofing and suspicious link URLs to recognize scams instantly.',
        estimatedMinutes: 15,
        tinyWin: 'I spotted 3 disguised phishing tricks.'
      },
      {
        stepNumber: 4,
        title: 'Encryption in plain words',
        actionableGuide: 'See how public and private keys allow two people who have never met to whisper safely across the internet.',
        estimatedMinutes: 20,
        tinyWin: 'I encrypted my first test message with PGP.'
      }
    ]
  },
  {
    id: 'cyber-3',
    category: 'Cybersecurity',
    resourceType: 'Lesson Plan',
    title: 'Information Security Concepts and Administration (KSU)',
    simpleExplanation: 'In simple words: How real companies set rules so employees don’t accidentally delete databases or hand over passwords.',
    providerDescription: 'Course syllabus and instructional materials developed at Kennesaw State University covering enterprise security policies, incident response plans, and auditing.',
    provider: 'ALG Commons',
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    originalUrl: 'https://oer.galileo.usg.edu/compsci-collections/ksu-infosec',
    dateDiscovered: '2026-11-04',
    plainlyPracticeTarget: 'security-sandbox',
    steps: [
      {
        stepNumber: 1,
        title: 'Access rules: who gets the keys?',
        actionableGuide: 'Learn the Principle of Least Privilege: giving team members only the exact keys they need for their job.',
        estimatedMinutes: 15,
        tinyWin: 'I set up role-based folders.'
      },
      {
        stepNumber: 2,
        title: 'Backups that actually work',
        actionableGuide: 'The 3-2-1 backup rule: 3 copies, 2 different media types, 1 offsite.',
        estimatedMinutes: 15,
        tinyWin: 'I tested an automated cloud backup.'
      },
      {
        stepNumber: 3,
        title: 'Creating an Incident Plan',
        actionableGuide: 'What do you do if your computer gets locked by ransomware? Step 1: Unplug the network cord!',
        estimatedMinutes: 20,
        tinyWin: 'I wrote a 5-step emergency plan.'
      }
    ]
  },
  {
    id: 'cyber-4',
    category: 'Cybersecurity',
    resourceType: 'Textbook',
    title: 'Information Security (LibreTexts Open Text)',
    simpleExplanation: 'In simple words: A complete open book breaking down encryption, hashes, digital certificates, and firewalls in plain language.',
    providerDescription: 'Comprehensive open textbook from LibreTexts covering cryptographic algorithms, network protocol vulnerabilities, and privacy defense.',
    provider: 'LibreTexts',
    license: 'Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    originalUrl: 'https://eng.libretexts.org/Bookshelves/Computer_Science/Information_Security',
    dateDiscovered: '2026-11-04',
    plainlyPracticeTarget: 'security-sandbox',
    steps: [
      {
        stepNumber: 1,
        title: 'Hashes: The Digital Fingerprint',
        actionableGuide: 'Try hashing words online with SHA-256 to see why even changing a comma creates a completely different 64-character hash.',
        estimatedMinutes: 15,
        tinyWin: 'I verified my first file download hash!'
      },
      {
        stepNumber: 2,
        title: 'Digital Certificates and HTTPS',
        actionableGuide: 'Look at the green padlock in your browser to inspect SSL certificate validity and certificate authorities.',
        estimatedMinutes: 10,
        tinyWin: 'I inspected an SSL certificate.'
      }
    ]
  },
  {
    id: 'cyber-5',
    category: 'Cybersecurity',
    resourceType: 'Presentation',
    title: 'Cybersecurity Fundamentals (kyber)',
    simpleExplanation: 'In simple words: Clean visual slides explaining how malware spreads and how modern phone chips protect fingerprints and facial IDs.',
    providerDescription: 'Open educational presentation series created by Finnish educators detailing secure digital citizenship and system hardening.',
    provider: 'Finnish Library of Open Educational Resources',
    license: 'Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    originalUrl: 'https://aoe.fi/#/materiaali/cybersecurity-kyber',
    dateDiscovered: '2026-11-04',
    plainlyPracticeTarget: 'security-sandbox',
    steps: [
      {
        stepNumber: 1,
        title: 'Secure Enclaves on Phones',
        actionableGuide: 'Learn how your phone stores biometric keys in an isolated hardware chip that the main OS cannot touch.',
        estimatedMinutes: 10,
        tinyWin: 'I learned why phone biometrics are safe.'
      }
    ]
  },
  {
    id: 'cyber-6',
    category: 'Cybersecurity',
    resourceType: 'Presentation',
    title: 'Lecture 10: Information Security. Beware of the facets',
    simpleExplanation: 'In simple words: Discover how social engineering tricks people into giving up passwords without any code or hacking needed.',
    providerDescription: 'Interactive open lecture slides by twillo illustrating real-world human-factor breaches, impersonation tactics, and cognitive defenses.',
    provider: 'twillo',
    license: 'Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    originalUrl: 'https://www.twillo.de/edu-sharing/components/render/lecture-10-infosec',
    dateDiscovered: '2026-11-04',
    plainlyPracticeTarget: 'security-sandbox',
    steps: [
      {
        stepNumber: 1,
        title: 'The Art of Pretexting',
        actionableGuide: 'Understand how attackers pretend to be IT support to ask for an urgent verification code.',
        estimatedMinutes: 15,
        tinyWin: 'I know how to challenge unexpected verification requests.'
      }
    ]
  },
  {
    id: 'cyber-7',
    category: 'Cybersecurity',
    resourceType: 'Course',
    title: 'Network and Computer Security (MIT 6.858)',
    simpleExplanation: 'In simple words: MIT’s world-famous course showing how computer memory works and how buffer overflows can be prevented.',
    providerDescription: 'Comprehensive video lectures, course notes, and lab assignments from MIT OpenCourseWare detailing operating system security boundaries.',
    provider: 'MIT Learn',
    license: 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    originalUrl: 'https://ocw.mit.edu/courses/6-858-computer-systems-security-spring-2014/',
    dateDiscovered: '2026-11-04',
    plainlyPracticeTarget: 'security-sandbox',
    steps: [
      {
        stepNumber: 1,
        title: 'How Programs Run in Memory',
        actionableGuide: 'Look at the stack and heap in plain English: like piles of paper on an office desk.',
        estimatedMinutes: 20,
        tinyWin: 'I grasped memory safety concepts.'
      }
    ]
  },
  {
    id: 'cyber-8',
    category: 'Cybersecurity',
    resourceType: 'Textbook',
    title: 'Practical Cybersecurity for Employees',
    simpleExplanation: 'In simple words: A zero-nonsense guidebook for everyday workers on keeping company spreadsheets, customer data, and laptops secure.',
    providerDescription: 'Published open guidebook via Pressbooks Directory with checklists for remote work safety, public Wi-Fi VPNs, and data hygiene.',
    provider: 'Pressbooks Directory',
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    originalUrl: 'https://pressbooks.directory/practical-cybersecurity-for-employees',
    dateDiscovered: '2026-11-04',
    plainlyPracticeTarget: 'security-sandbox',
    steps: [
      {
        stepNumber: 1,
        title: 'Public Wi-Fi Hygiene',
        actionableGuide: 'Never enter bank credentials on open coffee shop networks without a verified VPN tunnel.',
        estimatedMinutes: 10,
        tinyWin: 'I secured my mobile browsing.'
      }
    ]
  },

  // --- PHOTOGRAPHY & CINEMATOGRAPHY (Virtual 3D Camera / AR Integration) ---
  {
    id: 'photo-1',
    category: 'Photography',
    resourceType: 'Course',
    title: 'Digital Photography: The Anatomy of Light, Aperture & Lenses',
    simpleExplanation: 'In simple words: Learn how glass curved into lens elements bends light through an adjustable iris (aperture) to paint photos onto a digital sensor chip.',
    providerDescription: 'Open educational course covering camera optics, aperture mechanisms, depth of field physics, and sensor sensitivity. Integrates with the Plainly 3D Virtual Camera.',
    provider: 'Open Education Arts Alliance',
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    originalUrl: 'https://opened.org/courses/digital-photography-optics',
    dateDiscovered: '2026-11-04',
    plainlyPracticeTarget: 'camera',
    steps: [
      {
        stepNumber: 1,
        title: 'Hold the Virtual 3D DSLR',
        actionableGuide: 'Click "Take a Camera" to hold our simulated 3D DSLR. Spin the camera around to inspect the front lens barrel and rear viewfinder.',
        estimatedMinutes: 10,
        tinyWin: 'I held a virtual DSLR in 3D!'
      },
      {
        stepNumber: 2,
        title: 'Open the Aperture to f/1.8 for Creamy Blur',
        actionableGuide: 'Switch to the AR Viewfinder. Dial the aperture down to f/1.8 to see the background turn into soft butter while the subject stays crystal sharp.',
        estimatedMinutes: 15,
        tinyWin: 'I mastered portrait depth of field.'
      },
      {
        stepNumber: 3,
        title: 'Freeze fast movement with Shutter Speed',
        actionableGuide: 'Switch the shutter from 1/60 to 1/2000s to freeze water droplets or flying birds in mid-air with zero motion blur.',
        estimatedMinutes: 15,
        tinyWin: 'I froze high-speed motion.'
      },
      {
        stepNumber: 4,
        title: 'Exploded Camera Anatomy Inspection',
        actionableGuide: 'Drag the 3D Exploded Slider to 100% to see the pentaprism, reflex mirror, and CMOS sensor separate in mid-air.',
        estimatedMinutes: 10,
        tinyWin: 'I inspected all internal DSLR components.'
      }
    ]
  },
  {
    id: 'photo-2',
    category: 'Cinematography',
    resourceType: 'Lesson Plan',
    title: 'Cinematography & Framing: The Rules Hollywood Directors Use',
    simpleExplanation: 'In simple words: Stop placing people in the dead center! Learn the Rule of Thirds, Leading Lines, and Golden Ratio to make video look like a movie.',
    providerDescription: 'Film school syllabus breaking down visual composition, aspect ratios (2.39:1 Anamorphic vs 16:9), eyelines, and dynamic camera angles with real-time AR practice.',
    provider: 'Global Film OER Index',
    license: 'Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    originalUrl: 'https://film-oer.edu/cinematography-framing',
    dateDiscovered: '2026-11-04',
    plainlyPracticeTarget: 'camera',
    steps: [
      {
        stepNumber: 1,
        title: 'Turn on the Rule of Thirds Overlay',
        actionableGuide: 'In our 3D Viewfinder, enable the 3x3 grid. Line up the subject’s eyes on the top-right intersection dot.',
        estimatedMinutes: 10,
        tinyWin: 'I framed my first rule-of-thirds portrait!'
      },
      {
        stepNumber: 2,
        title: 'Apply the 2.39:1 Cinemascope Mask',
        actionableGuide: 'Turn on the cinematic letterbox overlay to see how widescreen anamorphic framing creates instant theatrical immersion.',
        estimatedMinutes: 10,
        tinyWin: 'I composed a 2.39:1 cinematic shot.'
      },
      {
        stepNumber: 3,
        title: 'Leading Lines & Horizon Placement',
        actionableGuide: 'Use roads, hallways, or fences to guide the viewer’s eye straight toward the focal subject.',
        estimatedMinutes: 15,
        tinyWin: 'I captured a perspective leading-line shot.'
      }
    ]
  },
  {
    id: 'photo-3',
    category: 'Photography',
    resourceType: 'Guide',
    title: 'The Exposure Triangle in Plain English (No Math)',
    simpleExplanation: 'In simple words: Think of a photo as filling a bucket with water. Aperture is how wide the pipe is, Shutter is how long the valve stays open, and ISO is how big the bucket is.',
    providerDescription: 'Intuitive beginner guide explaining the three pillars of photography: Aperture, Shutter Speed, and ISO with zero confusing jargon.',
    provider: 'ALG Commons',
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    originalUrl: 'https://oer.galileo.usg.edu/arts-collections/exposure-triangle',
    dateDiscovered: '2026-11-04',
    plainlyPracticeTarget: 'camera',
    steps: [
      {
        stepNumber: 1,
        title: 'Aperture: The Window Size',
        actionableGuide: 'A smaller f-number (like f/1.8) means a huge wide window that lets in tons of light and blurs the background.',
        estimatedMinutes: 10,
        tinyWin: 'I understand what f-stops mean.'
      },
      {
        stepNumber: 2,
        title: 'Shutter: The Window Blinds',
        actionableGuide: 'Opening for 1/1000th of a second freezes the world. Opening for 1 second captures light trails.',
        estimatedMinutes: 10,
        tinyWin: 'I adjusted shutter duration.'
      },
      {
        stepNumber: 3,
        title: 'ISO: The Sensor Amplifier',
        actionableGuide: 'Keep it at 100 on sunny days for clean crisp photos. Bump it to 3200 at night, but expect a little digital grain.',
        estimatedMinutes: 10,
        tinyWin: 'I balanced the exposure meter to zero.'
      }
    ]
  },

  // --- CODING & CREATIVE SKILLS ---
  {
    id: 'code-1',
    category: 'AI & Coding',
    resourceType: 'Interactive Lab',
    title: 'Python for Curious Beginners: Automating Boring Stuff',
    simpleExplanation: 'In simple words: Teaching your laptop how to rename 500 messy files, sort downloads, or scrape recipes automatically.',
    providerDescription: 'Practical coding curriculum from OpenStax Tech emphasizing hands-on scripts over dry theory, using plain English variable names and real projects.',
    provider: 'OpenStax Tech',
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    originalUrl: 'https://openstax.org/details/books/python-for-beginners',
    dateDiscovered: '2026-11-04',
    plainlyPracticeTarget: 'coding-sandbox',
    steps: [
      {
        stepNumber: 1,
        title: 'Variables: Labeled Kitchen Jars',
        actionableGuide: 'Store numbers and words inside variables like ingredients in pantry jars.',
        estimatedMinutes: 15,
        tinyWin: 'I wrote my first working Python script!'
      },
      {
        stepNumber: 2,
        title: 'Loops: Repeat Without Getting Tired',
        actionableGuide: 'Make your computer repeat a greeting 100 times in 0.001 seconds.',
        estimatedMinutes: 15,
        tinyWin: 'I ran my first automated loop.'
      }
    ]
  },
  {
    id: 'code-2',
    category: 'Design',
    resourceType: 'Course',
    title: 'Visual Design Fundamentals: Space, Contrast & Type',
    simpleExplanation: 'In simple words: How to make posters, websites, and flyers look clean and expensive instead of crowded and messy.',
    providerDescription: 'Design thinking and layout fundamentals course covering white space, typographic scales, color harmonies, and visual hierarchy.',
    provider: 'LibreTexts Arts',
    license: 'Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    originalUrl: 'https://human.libretexts.org/Bookshelves/Art/Visual_Design_Fundamentals',
    dateDiscovered: '2026-11-04',
    plainlyPracticeTarget: 'coding-sandbox',
    steps: [
      {
        stepNumber: 1,
        title: 'White Space is Not Empty Space',
        actionableGuide: 'Learn why breathing room around headlines makes readers feel relaxed and focused.',
        estimatedMinutes: 15,
        tinyWin: 'I decluttered a sample landing page.'
      }
    ]
  }
];
