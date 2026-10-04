export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  year: string;
  features?: string[];
  fraudEngine?: string[];
  metrics?: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured?: boolean;
}

export interface JourneyItem {
  year: string;
  category: "Education" | "Hackathon" | "Certification";
  title: string;
  institution: string;
  location?: string;
  details?: string;
}

export const PERSONAL_INFO = {
  name: "Sujal Kumar Kanu",
  role: "Computer Science & Engineering Student",
  institution: "BMS Institute of Technology & Management (VTU)",
  location: "Bengaluru, India",
  tagline: "Exploring full-stack systems, blockchain protocols, and applied generative AI.",
  bio: [
    "I am a third-year Computer Science and Engineering student at BMS Institute of Technology & Management in Bengaluru, studying since 2023.",
    "My focus centers on full-stack web engineering, smart contract development, and applied generative AI systems.",
    "Currently, I am exploring network security fundamentals, smart contract verification, and statistical curve fitting models.",
    "Outside coursework, I experiment with decentralized systems and participate in 24-hour hackathons.",
  ],
  languages: ["Bhojpuri", "Hindi", "Nepali", "English"],
  stats: [
    { value: "3", label: "Shipped Projects" },
    { value: "2", label: "National Hackathons" },
    { value: "3", label: "Technical Certifications" },
  ],
  socials: {
    github: "https://github.com/SujalKanu-stack",
    linkedin: "https://www.linkedin.com/in/sujal-kumar-kanu/",
    email: "sujalguptaa121@gmail.com",
  },
  resumePath: "/Sujal_Kumar_Kanu_Resume.pdf",
};

export const TECH_LOGOS = [
  { name: "Python", slug: "python" },
  { name: "JavaScript", slug: "javascript" },
  { name: "React", slug: "react" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Solidity", slug: "solidity" },
  { name: "Docker", slug: "docker" },
  { name: "Git", slug: "git" },
  { name: "Linux", slug: "linux" },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "agrichain",
    featured: true,
    title: "AgriChain",
    tagline: "Blockchain agricultural supply chain with automated fraud detection",
    description:
      "A decentralized tracking platform built on Polygon Amoy. It establishes an immutable provenance trail across farmer, distributor, retailer, and consumer while flagging supply chain anomalies in real time.",
    year: "2025",
    stack: ["Solidity", "Polygon Amoy", "React", "Node/Express", "Ethers.js", "Docker Compose"],
    features: [
      "4-tier lifecycle custody tracking (Farmer -> Distributor -> Retailer -> Consumer)",
      "3-layer fraud engine: flags duplicate batch lots, sequence gaps, and >500% price anomalies",
      "Dynamic trust score (0-100) per actor and QR-based provenance verification",
      "Integrated AfterShip courier tracking for active transit legs",
    ],
    liveUrl: "https://github.com/SujalKanu-stack/agrichain", // TODO(Sujal): update with production live URL if deployed
    githubUrl: "https://github.com/SujalKanu-stack/agrichain",
    image: "/projects/agrichain.png", // TODO(Sujal): add screenshot to public/projects/agrichain.png
  },
  {
    id: "research-collab-hub",
    featured: false,
    title: "Research Collab Hub",
    tagline: "Collaborative research paper workspace with AI abstract decomposition",
    description:
      "A unified platform for academic research teams featuring versioned paper drafting, BibTeX export, conference deadline calendars, and automated co-author matching via the Claude API.",
    year: "2024",
    stack: ["FastAPI", "React 18", "PostgreSQL 16", "Redis", "Docker", "Claude API"],
    liveUrl: "https://github.com/SujalKanu-stack/research-collab-hub",
    githubUrl: "https://github.com/SujalKanu-stack/research-collab-hub",
  },
  {
    id: "cardiosim-3d",
    featured: false,
    title: "CardioSim 3D",
    tagline: "Interactive 3D cardiac anatomy and arrhythmia simulation",
    description:
      "Browser-based anatomical simulator allowing 30 to 200 BPM heart pacing, interactive coronary artery blockage models, and an integrated diagnostic quiz for medical students.",
    year: "2024",
    stack: ["Vanilla JS (ES6+)", "WebGL", "Sketchfab API", "HTML5/CSS3"],
    liveUrl: "https://github.com/SujalKanu-stack/cardiosim-3d",
    githubUrl: "https://github.com/SujalKanu-stack/cardiosim-3d",
  },
  {
    id: "iot-weather",
    featured: false,
    title: "IoT Weather Monitoring System",
    tagline: "Microcontroller telemetry for ambient temperature, humidity, and barometric pressure",
    description:
      "Hardware sensor array transmitting atmospheric data via MQTT to a lightweight dashboard for real-time climate logging.",
    year: "2023",
    stack: ["C++", "ESP32", "MQTT", "Node.js", "Sensors"],
    githubUrl: "https://github.com/SujalKanu-stack/iot-weather",
  },
  {
    id: "matlab-modelling",
    featured: false,
    title: "Statistical Modelling & Curve Fitting in MATLAB",
    tagline: "Numerical analysis, regression curves, and error distribution modelling",
    description:
      "Parametric and non-parametric data modelling evaluating goodness-of-fit across physical and statistical experimental datasets.",
    year: "2025",
    stack: ["MATLAB", "Statistics Toolbox", "Curve Fitting"],
    githubUrl: "https://github.com/SujalKanu-stack",
  },
];

export const JOURNEY: JourneyItem[] = [
  {
    year: "2023 - Present",
    category: "Education",
    title: "B.E. in Computer Science & Engineering",
    institution: "BMS Institute of Technology & Management (VTU)",
    location: "Bengaluru, India",
    details: "Third-year undergraduate student. Core studies in Algorithms, Database Systems, Computer Networks, and Cryptography.",
  },
  {
    year: "2024",
    category: "Education",
    title: "Higher Secondary (Grade XII)",
    institution: "National Infotech Secondary School (NEB)",
    location: "Birgunj, Nepal",
    details: "Science & Technology stream with focus on Physics, Mathematics, and Computer Science.",
  },
  {
    year: "Mar 2026",
    category: "Hackathon",
    title: "ArtPark CodeForge, Rhapsody 4.0",
    institution: "IISc Bangalore",
    details: "Competed alongside 2,796+ teams in robotics, autonomous agents, and systems tracks.",
  },
  {
    year: "2026",
    category: "Hackathon",
    title: "CODE RED 3.0",
    institution: "E-Cell BMSIT&M",
    details: "24-hour national technical hackathon solving real-time engineering challenges under tight time limits.",
  },
  {
    year: "Oct 2025",
    category: "Certification",
    title: "Statistics & Curve Fitting Onramp",
    institution: "MathWorks",
    details: "Regression analysis, residual testing, and parametric mathematical curve fitting.",
  },
  {
    year: "Jun 2025",
    category: "Certification",
    title: "Introduction to Cyber Security",
    institution: "Infosys Springboard",
    details: "Network defense mechanisms, threat modelling, vulnerability assessment, and encryption standards.",
  },
  {
    year: "2023",
    category: "Certification",
    title: "IoT and Robotics 7-Day Intensive",
    institution: "NepaTronix x National Infotech",
    details: "Hands-on microcontroller programming, sensor integration, and motor actuation circuits.",
  },
];
