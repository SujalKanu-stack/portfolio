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
    // TODO(Sujal): add year
    stack: ["Solidity", "Polygon Amoy", "React", "Node/Express", "Ethers.js", "Docker Compose"],
    features: [
      "4-tier lifecycle custody tracking (Farmer -> Distributor -> Retailer -> Consumer)",
      "3-layer fraud engine: flags duplicate batch lots, sequence gaps, and >500% price anomalies",
      "Dynamic trust score (0-100) per actor and QR-based provenance verification",
      "Integrated courier tracking for active transit legs",
    ],
    repoUrl: "https://github.com/SujalKanu-stack/AgriChain",
    image: withBase("/projects/agrichain.png"), // TODO(Sujal): add screenshot to public/projects/agrichain.png
  },
  {
    id: "research-collab-hub",
    featured: false,
    status: "in-progress",
    title: "Research Collab Hub",
    tagline: "Collaborative research paper workspace with AI abstract decomposition",
    description:
      "A collaborative research paper platform with automated paper versioning triggers, BibTeX citation export, and conference deadline tracking; Claude API pipelines for abstract decomposition, venue suitability analysis, and co-author matching.",
    // TODO(Sujal): confirm which of these features actually work, and edit the bullets to match.
    // TODO(Sujal): add year
    repoUrl: "https://github.com/SujalKanu-stack/Research_collab_Hub",
    stack: ["FastAPI", "React 18", "PostgreSQL 16", "Redis", "Docker", "Claude API"],
    bullets: [
      "Versioned paper drafting workspace with AI abstract decomposition via Claude API",
      "Automated BibTeX citation formatting and conference submission deadline calendar",
      "Full-stack asynchronous backend with PostgreSQL schema and Redis caching",
    ],
  },
  {
    id: "cardiosim-3d",
    featured: false,
    status: "completed",
    title: "CardioSim 3D",
    tagline: "Interactive 3D cardiac anatomy and arrhythmia simulation",
    description:
      "Browser-based anatomical simulator allowing 30 to 200 BPM heart pacing, interactive coronary artery blockage models, and an integrated diagnostic quiz for medical students.",
    // TODO(Sujal): add year
    // TODO(Sujal): confirm Heart_Sim vs Heart-simulator
    repoUrl: "https://github.com/SujalKanu-stack/Heart_Sim",
    stack: ["Vanilla JS", "WebGL", "Sketchfab API"],
    bullets: [
      "Browser-based 3D anatomical heart simulator supporting 30 to 200 BPM dynamic pacing",
      "Interactive coronary artery blockage and simulated ischemia visualization",
      "Integrated arrhythmia diagnostic quiz using Sketchfab 3D API",
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
    // TODO(Sujal): add repoUrl if you make the repository public
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
  // TODO(Sujal): credential links
  {
    year: "Oct 2025",
    category: "Certification",
    title: "Statistics Onramp and Curve Fitting Onramp",
    institution: "MathWorks",
    details: "100% completion. Regression curves, residual analysis, and mathematical curve fitting models.",
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
    title: "IoT and Robotics, 7-Day Intensive",
    institution: "NepaTronix x National Infotech",
    details: "Hands-on microcontroller programming, sensor integration, and motor actuation circuits.",
  },
];

export const PERSONAL_INFO = {
  name: "Sujal Kumar Kanu",
  role: "Computer Science & Engineering Student",
  institution: "BMS Institute of Technology & Management (VTU)",
  location: "Bengaluru, India",
  tagline: "Exploring full-stack systems, blockchain protocols, and applied generative AI.",
  bio: [
    "I am a third-year Computer Science and Engineering student at BMS Institute of Technology & Management in Bengaluru, studying since 2023.",
    "My focus centers on full-stack web engineering, smart contract development, and applied generative AI systems.",
    "Right now I'm learning generative AI: how large language models work, prompt engineering, and building AI agents. Next I want to build an agent end to end, while continuing to explore network security.",
    // TODO(Sujal): add the framework or course you are using (e.g. LangChain, LlamaIndex, or specific AI agent course)
    "Outside coursework, I experiment with decentralized systems and participate in 24-hour hackathons.",
  ],
  languages: ["Bhojpuri", "Hindi", "Nepali", "English"],
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
    // TODO(Sujal): confirm which LinkedIn URL is correct (resume says sujal-kanu vs sujal-kumar-kanu)
    linkedin: "https://www.linkedin.com/in/sujal-kanu",
    email: "sujalguptaa121@gmail.com",
  },
  resumePath: withBase("/Sujal_Kumar_Kanu_Resume.pdf"),
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
