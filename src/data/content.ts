import { withBase } from "@/lib/basePath";

export interface SectionMeta {
  id: string;
  num: string;
  name: string;
  eyebrow: string;
  label: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: "home", num: "01", name: "Home", eyebrow: "01 / Home", label: "01 Home" },
  { id: "about", num: "02", name: "About", eyebrow: "02 / About", label: "02 About" },
  { id: "projects", num: "03", name: "Projects", eyebrow: "03 / Projects", label: "03 Projects" },
  { id: "journey", num: "04", name: "Journey", eyebrow: "04 / Journey", label: "04 Journey" },
  { id: "contact", num: "05", name: "Contact", eyebrow: "05 / Contact", label: "05 Contact" },
];

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  status: "completed" | "in-progress";
  visibility?: "private" | "public";
  year?: string;
  features?: string[];
  bullets?: string[];
  repoUrl?: string;
  liveUrl?: string;
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
  credentialUrl?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "agrichain",
    featured: true,
    status: "completed",
    title: "AgriChain",
    tagline: "Blockchain agricultural supply chain with automated fraud detection",
    description:
      "A decentralized tracking platform built on Polygon Amoy. It establishes an immutable provenance trail across farmer, distributor, retailer, and consumer while flagging supply chain anomalies in real time.",
    year: "2026",
    stack: ["Solidity", "Polygon Amoy", "React", "Node.js", "Docker", "Ethers.js"],
    features: [
      "4-tier lifecycle custody tracking (Farmer -> Distributor -> Retailer -> Consumer)",
      "3-layer fraud engine: flags duplicate batch lots, sequence gaps, and >500% price anomalies",
      "Dynamic trust score (0-100) per actor and QR-based provenance verification",
      "Integrated courier tracking for active transit legs and containerized with Docker Compose",
    ],
    bullets: [
      "Architected a decentralized supply chain covering 4 role tiers (Farmer, Distributor, Retailer, Consumer) on Polygon Amoy with Solidity smart contracts and Ethers.js.",
      "Implemented an automated 3-tier fraud engine flagging duplicates, missing transit steps, and price spikes (>500%) while computing dynamic trust scores (0–100).",
      "Created batch-specific dynamic QR code generation for end-to-end provenance verification, integrated live logistics tracking, and containerized the service using Docker Compose.",
    ],
    repoUrl: "https://github.com/SujalKanu-stack/AgriChain",
    image: withBase("/projects/agrichain.png"),
  },
  {
    id: "research-collab-hub",
    featured: false,
    status: "completed",
    title: "Research Collab Hub",
    tagline: "AI-powered academic research platform with Claude LLM workflows",
    description:
      "A modular collaborative research platform featuring automated paper version archiving, BibTeX citation export, and an Anthropic Claude LLM pipeline for abstract summarization and co-author matching.",
    year: "2026",
    repoUrl: "https://github.com/SujalKanu-stack/Research_collab_Hub",
    stack: ["FastAPI", "PostgreSQL", "Redis", "React", "Claude API"],
    bullets: [
      "Developed a modular collaborative research system with automated paper version archiving, BibTeX citation export, and milestone/deadline management.",
      "Built an integrated LLM pipeline using Anthropic Claude for abstract summarization, venue suitability analysis, and co-author recommendations via Jaccard similarity.",
      "Designed a relational PostgreSQL schema utilizing triggers for automated revision tracking, audit logs, and instant notifications; backed by Redis caching.",
    ],
  },
  {
    id: "cardiosim-3d",
    featured: false,
    status: "completed",
    title: "CardioSim 3D",
    tagline: "Interactive 3D cardiac anatomy and arrhythmia simulation",
    description:
      "Interactive 3D human heart simulation platform featuring photorealistic rendering, 360° orbital control, dynamic 30–200 BPM cardiac pacing, and pathology simulations with a medical quiz engine.",
    year: "2026",
    repoUrl: "https://github.com/SujalKanu-stack/Heart_Sim",
    stack: ["JavaScript (ES6+)", "Sketchfab 3D API", "HTML5", "CSS3"],
    bullets: [
      "Engineered an interactive 3D human heart simulation platform featuring photorealistic rendering, 360° orbital control, and dynamic anatomical callouts for 24+ structures.",
      "Built a synchronized cardiac engine dynamically adjusting from 30 BPM to 200 BPM paired with pulsing CSS animations and cardiac cycle phase transitions.",
      "Simulated cardiac pathologies (arterial blockage, arrhythmia, valve regurgitation) and developed an interactive medical quiz assessment engine.",
    ],
  },
  {
    id: "iot-weather",
    featured: false,
    status: "completed",
    title: "IoT Weather Monitoring System",
    tagline: "Microcontroller telemetry for ambient temperature, humidity, and barometric pressure",
    description:
      "Hardware sensor array transmitting atmospheric data via telemetry to a lightweight dashboard for real-time climate logging.",
    year: "2023",
    stack: ["IoT sensors", "Temperature", "Humidity", "Pressure"],
    bullets: [
      "Atmospheric sensor array recording ambient temperature, humidity, and barometric pressure",
      "Calibrated transducer telemetry with edge-level signal filtering",
      "Real-time climate logging interface for continuous physical environment monitoring",
    ],
  },
];

export const JOURNEY: JourneyItem[] = [
  {
    year: "2023 - Present",
    category: "Education",
    title: "B.E. in Computer Science & Engineering",
    institution: "BMS Institute of Technology & Management (VTU)",
    location: "Bengaluru, Karnataka",
    details: "Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, Operating Systems, Discrete Mathematics.",
  },
  {
    year: "Graduated 2024",
    category: "Education",
    title: "Grade XII (NEB, Nepal)",
    institution: "National Infotech Secondary School",
    location: "Birgunj, Nepal",
    details: "Science & Technology stream with focus on Physics, Mathematics, and Computer Science.",
  },
  {
    year: "Mar 2026",
    category: "Hackathon",
    title: "ArtPark CodeForge, Rhapsody 4.0",
    institution: "IISc Bangalore",
    details: "Competed among 2,796+ national teams in rapid software prototyping.",
  },
  {
    year: "2026",
    category: "Hackathon",
    title: "CODE RED 3.0",
    institution: "E-Cell BMSIT&M",
    details: "24-Hour Hackathon. Prototyped and pitched a working software solution in 24 hours.",
  },
  {
    year: "Oct 2025",
    category: "Certification",
    title: "Statistics & Curve Fitting Onramp",
    institution: "MathWorks",
    details: "Regression curves, residual analysis, and mathematical curve fitting models.",
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
    title: "IoT & Robotics Intensive",
    institution: "NepaTronix",
    details: "Hands-on microcontroller programming, sensor integration, and motor actuation circuits.",
  },
];

export const PERSONAL_INFO = {
  name: "Sujal Kumar Kanu",
  role: "Computer Science & Engineering Student",
  institution: "BMS Institute of Technology & Management (VTU)",
  location: "Bengaluru, Karnataka",
  tagline: "Exploring full-stack systems, blockchain protocols, and applied generative AI.",
  bio: [
    "I am a third-year Computer Science and Engineering student at BMS Institute of Technology & Management in Bengaluru, studying since 2024.",
    "My focus centers on full-stack web engineering, smart contract development, and applied generative AI systems.",
    "Right now I'm learning generative AI: how large language models work, prompt engineering, and building AI agents. Next I want to build an agent end to end, while continuing to explore network security.",
    "Outside coursework, I experiment with decentralized systems and participate in 24-hour hackathons.",
  ],
  languages: ["English (Professional)", "Hindi", "Nepali", "Bhojpuri"],
  stats: [
    {
      value: PROJECTS.filter((p) => p.status === "completed").length.toString(),
      label: "Projects built",
    },
    {
      value: JOURNEY.filter((j) => j.category === "Hackathon").length.toString(),
      label: "National Hackathons",
    },
    {
      value: JOURNEY.filter((j) => j.category === "Certification").length.toString(),
      label: "Technical Certifications",
    },
  ],
  socials: {
    github: "https://github.com/SujalKanu-stack",
    linkedin: "https://www.linkedin.com/in/sujal-kumar-kanu/",
    email: "sujalguptaa121@gmail.com",
    phone: "+91 9905206764",
    phoneRaw: "+919905206764",
  },
  resumePath: withBase("/Sujal_Kumar_Kanu_Resume_2026.pdf"),
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
