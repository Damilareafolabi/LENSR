import { BlogPost } from '../types';

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'no-expensive-camera-needed',
    title: "Why You Don't Need a $3,500 Camera to Shoot Pro Photos",
    subtitle: "The secret is light direction, composition grids, and understanding aperture — not spending thousands on gear.",
    category: 'Photography',
    readTime: '4 min read',
    date: 'November 4, 2026',
    author: {
      name: 'Maya Lin',
      role: 'Cinematographer & Plainly Educator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80'
    },
    plainEnglishSummary: 'Cameras are just light-tight boxes with a hole. An expensive camera cannot fix bad framing or ugly lighting. If you understand how to place your subject near a window and align them with the Rule of Thirds, a basic phone or virtual practice will beat a $5,000 rig in auto mode every single time.',
    content: `
### The Great Gear Myth

When beginners look at award-winning photos, they usually ask: *"What camera took that?"* 
That's like eating a five-star meal and asking the chef what stove they used!

A camera has only one single job: to open a tiny curtain and let light hit a sensor for a fraction of a second. Whether that sensor sits inside a $6,000 cinema beast or a virtual simulator like Plainly, the **rules of visual geometry do not change**.

---

### 1. The Rule of Thirds is Your Free Upgrade

The human eye hates dead-center subjects in casual portraits — it feels like a mugshot or passport photo. 

- Slice your frame into a 3x3 grid (like a tic-tac-toe board).
- Place your subject’s dominant eye right on one of the upper intersection points.
- Instantly, your photo feels intentional, dynamic, and cinematic.

---

### 2. Large Aperture = Creamy Backgrounds (The Bokeh Trick)

Want that dreamy, blurred background where your subject pops off the screen?
In plain English: set your camera to **Aperture Priority (Av)** and dial the f-number to the smallest number possible (like **f/1.8** or **f/2.8**). 

The wider the iris opens, the thinner your slice of focus becomes. Everything behind your subject melts into soft, creamy shapes.

---

### 3. Move the Subject, Don't Buy a Flash

The best light source in the world is 100% free: **a large window at a 45-degree angle**.
Turn your subject towards the window so one side of their face is softly illuminated, while the other side has gentle, cinematic shadow. 
Congratulations: you just created Hollywood Rembrandt lighting without spending a single dime.
    `,
    actionableTakeaways: [
      'Turn on the Rule of Thirds grid in your camera or Plainly AR Viewfinder.',
      'Always shoot portrait subjects near side window light, never under harsh ceiling bulbs.',
      'Use a wide aperture (f/1.8 to f/2.8) to separate your subject from busy backgrounds.',
      'Practice framing shots in the Plainly 3D Virtual Camera before taking real-world photos.'
    ],
    viewsCount: 14280,
    likesCount: 1845,
    tags: ['Photography', 'Beginner Guide', 'Composition', 'Bokeh', 'Zero Gear Budget']
  },
  {
    id: 'blog-2',
    slug: 'cybersecurity-for-everyday-humans',
    title: 'Cybersecurity for Everyday Humans: 7 Rules to Never Get Hacked',
    subtitle: 'No complex terminal commands or nerd jargon. Just plain common-sense rules that keep your money and identity safe.',
    category: 'Cybersecurity',
    readTime: '5 min read',
    date: 'November 2, 2026',
    author: {
      name: 'Dr. Tariq Vance',
      role: 'Open Security Researcher',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80'
    },
    plainEnglishSummary: 'Hackers almost never "break through firewalls" like in movies. They simply knock on the front door and trick someone into handing over the keys. These 7 habits stop 99% of digital threats instantly.',
    content: `
### How People Actually Get Hacked

Movies show hackers in hoodies rapidly typing green text on black screens while alarms flash red. 

In reality? A hacker sends a text message saying: *"Your package delivery was delayed, click here to pay $1.50 customs fee."*
Someone clicks, enters their password, and that's it. No genius code. Just plain trickery.

Here are the 7 unbreakable rules:

---

#### Rule 1: Use a Password Manager
Never remember passwords. A human brain cannot generate or remember 40 unique 16-character strings like \`#9vP$2xK!mQ8#\`. Use an open password manager to generate random passwords.

#### Rule 2: App-Based Two-Factor Authentication (2FA)
SMS verification codes can be intercepted by SIM-swapping. Use an authenticator app (Google Authenticator, Bitwarden) that generates rotating 6-digit codes stored locally on your device.

#### Rule 3: The 10-Second Panic Pause
Every phishing scam relies on artificial urgency: *"Your bank account will be suspended in 15 minutes!"*
Whenever a message demands immediate action, take a 10-second breath. Real banks and tax agencies never demand immediate wire transfers via text message.

#### Rule 4: Always Keep Updates Turned On
Software updates aren't just new emojis. They patch security holes that hackers found last week. Keep auto-updates enabled on your phone and laptop.
    `,
    actionableTakeaways: [
      'Download an authenticator app and enable 2FA on your primary email today.',
      'Check if your email has been exposed in historical breaches on public safety registries.',
      'Turn on automatic operating system updates.',
      'Never click SMS links claiming urgent package deliveries or banking locks.'
    ],
    viewsCount: 22890,
    likesCount: 3120,
    tags: ['Cybersecurity', 'Privacy', 'Password Safety', 'Phishing Defense']
  },
  {
    id: 'blog-3',
    slug: 'rule-of-thirds-cheat-sheet',
    title: 'The Rule of Thirds Cheat Sheet: How Hollywood Frames Every Scene',
    subtitle: 'The simple geometric secret that turns boring snapshots into breathtaking cinematic frames.',
    category: 'Cinematography',
    readTime: '3 min read',
    date: 'October 29, 2026',
    author: {
      name: 'Maya Lin',
      role: 'Cinematographer & Plainly Educator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80'
    },
    plainEnglishSummary: 'When you look at an image, your eyes naturally scan the intersection points of a 3x3 grid before looking at the center. Placing key elements like eyes, horizons, and doorways along these lines creates visual tension and harmony.',
    content: `
### Why Symmetry is Often Boring

When you place everything in the dead center, the viewer's eye has nowhere to travel. The image feels static, like a security camera snapshot.

The **Rule of Thirds** gives the eye a journey:
1. Two horizontal lines and two vertical lines create **4 golden intersection points**.
2. Put the subject's face on the right vertical line, looking towards the open space on the left.
3. This "lead room" or "look room" tells the viewer's brain that the subject has thoughts, curiosity, and space to breathe.

---

### Framing Horizons
- **Dramatic Sky?** Put the horizon along the bottom third line. Give 2/3 of the frame to the clouds and sunlight.
- **Dramatic Ocean or Ground?** Put the horizon along the top third line. Give 2/3 of the frame to the reflections and textures below.
- **Never cut your frame in half** right across the middle unless you are doing a deliberate Wes Anderson symmetrical reflection!
    `,
    actionableTakeaways: [
      'Always give your subject "look room" — space in the direction their eyes are looking.',
      'Align the horizon on the upper third or lower third, never dead center.',
      'Use the Plainly AR Viewfinder grid to build muscle memory before going outside.'
    ],
    viewsCount: 18910,
    likesCount: 2450,
    tags: ['Cinematography', 'Film School', 'Rule of Thirds', 'Visual Storytelling']
  },
  {
    id: 'blog-4',
    slug: 'exposure-triangle-without-math',
    title: 'The Exposure Triangle in Plain English (No Math Required)',
    subtitle: 'Think of taking a photo like filling a glass with water from a kitchen tap.',
    category: 'Photography',
    readTime: '4 min read',
    date: 'October 25, 2026',
    author: {
      name: 'Liam Croft',
      role: 'Camera Technician & Mentor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80'
    },
    plainEnglishSummary: 'Aperture is the size of the tap. Shutter speed is how long the tap is turned on. ISO is how thirsty your cup is. If you balance them, you get a clean, perfectly exposed photograph with zero frustration.',
    content: `
### The Kitchen Tap Analogy

Most photography websites bombard you with equations: *"inverse square law"*, *"f-stop ratios"*, *"lux values"*. Forget all of that.

Imagine you are trying to fill a water glass right to the rim:

1. **Aperture (f-stop)**: The width of your faucet pipe.
   - Turned wide open (\`f/1.8\`): Water gushes in fast! (And the background blurs)
   - Pinched narrow (\`f/16\`): Water drips slowly. (Everything is in focus)

2. **Shutter Speed (seconds)**: How many seconds you leave the faucet running.
   - Quick flash (\`1/1000s\`): Stops water droplets frozen in mid-air.
   - Long stream (\`1/2s\`): Water turns into a silky, smooth blur.

3. **ISO (sensor sensitivity)**: The size of the glass.
   - \`ISO 100\`: A sturdy, crystal-clear glass. Pristine quality.
   - \`ISO 6400\`: A tiny thimble that fills instantly in the dark, but it splashes and creates noisy speckles (grain).

---

### How to Practice Right Now
Hop into Plainly's **Virtual 3D DSLR**. Dial the aperture from \`f/1.8\` up to \`f/16\` and notice how the live exposure meter tells you when the frame is balanced!
    `,
    actionableTakeaways: [
      'Start in Aperture Priority mode (Av/A) to control blur without worrying about shutter math.',
      'Keep ISO at 100 outdoors and only raise it when shooting indoors or at night.',
      'Check the Exposure Meter: keep the marker at 0 for natural, balanced light.'
    ],
    viewsCount: 31200,
    likesCount: 4210,
    tags: ['Exposure Triangle', 'Aperture', 'Shutter Speed', 'ISO', 'Photography Basics']
  }
];

export function generateTrendingArticle(topic: string, category: string): BlogPost {
  const cleanTopic = topic.trim() || 'Visual Storytelling for Beginners';
  const slug = cleanTopic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  return {
    id: `blog-gen-${Date.now()}`,
    slug,
    title: `${cleanTopic}: The Plain-English Breakdown`,
    subtitle: 'How to understand this concept in 5 minutes with practical examples and zero academic jargon.',
    category,
    readTime: '4 min read',
    date: 'Just now (Auto-Generated Guide)',
    author: {
      name: 'Plainly AI Curriculum Engine',
      role: 'Automated Education Indexer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80'
    },
    plainEnglishSummary: `A crystal-clear, fluff-free guide explaining ${cleanTopic}. Cut through confusing textbook terminology with real-world analogies, step-by-step action plans, and instant hands-on practice.`,
    content: `
### What is ${cleanTopic}? (In Normal Words)

When you read textbooks or university syllabi about **${cleanTopic}**, you usually encounter pages of dense academic theory that makes simple concepts feel intimidating.

Here is the truth: at its core, this is simply about building useful things and understanding how systems behave.

---

### 3 Rules to Remember:
1. **Focus on outcomes, not vocabulary**: You don't need to memorize latin roots or vendor buzzwords to build something that works.
2. **Break it into 10-minute micro-habits**: Learning one small concept per day compounds faster than a grueling weekend cram session.
3. **Always build a tangible artifact**: Don't just watch videos. Create a photo, write a script, or audit a password.

---

### Step-by-Step Action Plan
- **Step 1**: Identify the core problem you want to solve.
- **Step 2**: Open a simulator or sandbox (like Plainly's 3D camera or code runner) and test the extreme limits.
- **Step 3**: Share your tiny win with someone else to solidify the knowledge!
    `,
    actionableTakeaways: [
      `Practice the fundamentals of ${cleanTopic} today in bite-sized steps.`,
      'Avoid buying expensive equipment or courses before mastering the free basics.',
      'Teach what you learned to a friend in plain English to test your understanding.'
    ],
    viewsCount: 120,
    likesCount: 15,
    tags: [category, 'Plain English', 'Self-Taught', 'Actionable Guide']
  };
}
