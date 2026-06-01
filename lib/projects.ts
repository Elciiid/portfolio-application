import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "mp3-streamer",
    title: "MP3 Streamer",
    description:
      "Server-authoritative audio broadcasting system syncing ~24 speaker clients across 4 factory zones with sub-200ms drift correction.",
    longDescription:
      "A local-network audio broadcast system where a single host controls synchronized playback across distributed speaker clients. Clients calculate their expected playback position from server time, latency, and the shared start timestamp, keeping factory-zone audio aligned without manual intervention. The system also includes biometric-based authorization and remote speaker monitoring from a central dashboard.",
    tech: ["PHP 8.x", "Vanilla JS", "SQL Server", "JSON", "Long-poll"],
    category: "realtime",
    source: "internship",
    featured: true,
    accentColor: "#7C3AED",
    icon: "MP3",
    liveUrl: "https://mp3-streamer-phi.vercel.app/",
    videoPath: "MP3.mp4",
    docsHref: "/docs/developer_documentationMP3.html",
    metrics: [
      { label: "Speaker clients", value: "~24 nodes" },
      { label: "Factory zones", value: "4 areas" },
      { label: "Sync drift", value: "<200ms" },
    ],
  },

  {
    id: "iticket-hub",
    title: "ITicketHub",
    description:
      "Internal IT ticketing system for 4,000+ requests with RBAC triage, assignments, attachments, and audit history.",
    longDescription:
      "A full rebuild of La Rose Noire's internal IT ticketing workflow for admins, IT PICs, and end users. The system supports structured ticket triage, automated history logs, resolution attachments, role-based filtering, and multi-technician assignment so the IT team can manage requests with clearer ownership and traceability.",
    tech: ["PHP", "SQL Server", "RBAC", "Tailwind CSS"],
    category: "enterprise",
    source: "internship",
    featured: true,
    accentColor: "#F59E0B",
    icon: "TKT",
    liveUrl: "https://iticket-hub.vercel.app/login.php",
    videoPath: "tickethub.mp4",
    metrics: [
      { label: "Ticket history", value: "4,000+" },
      { label: "IT team", value: "9 staff" },
      { label: "Access model", value: "3 roles" },
    ],
  },

  {
    id: "centralpoint-portal",
    title: "CentralPoint Portal",
    description:
      "SQL-backed intranet for 250+ office employees, combining app access, company updates, schedules, and live feeds.",
    longDescription:
      "A redesign of the company's primary intranet experience for office employees. CentralPoint Portal brings internal app access, company news, personal schedules, and live content feeds into a responsive dashboard. The desktop layout uses a three-column independent-scroll interface and a Three.js particle banner while the backend integrates with shared SQL Server data.",
    tech: ["Vanilla JS", "Three.js", "Tailwind CSS", "PHP", "SQL Server"],
    category: "portal",
    source: "internship",
    featured: true,
    accentColor: "#A3E635",
    icon: "CP",
    liveUrl: "https://centralpoint-liart.vercel.app/",
    videoPath: "CentralPoint.mp4",
    metrics: [
      { label: "Office users", value: "250+" },
      { label: "Core layout", value: "3 columns" },
      { label: "Content model", value: "Live feeds" },
    ],
  },

  {
    id: "centralpoint-core",
    title: "CentralPoint Core",
    description:
      "Admin layer for CentralPoint with ChatNow messaging, meeting scheduling, venue conflict checks, and permissions.",
    longDescription:
      "The administrative engine behind the CentralPoint ecosystem. It includes ChatNow for direct messages, group chats, and temporary Stories, plus a Meeting Planner that checks venue conflicts and sends attendee notifications. Built with PHP 7.4+ and MSSQL Server, it uses modular permissions to govern access across internal modules.",
    tech: ["PHP 7.4+", "MSSQL", "Vanilla JS", "Permissions", "Messaging"],
    category: "enterprise",
    source: "internship",
    featured: true,
    accentColor: "#38BDF8",
    icon: "CORE",
    liveUrl: "https://centralpoint-liart.vercel.app/admin.php",
    videoPath: "CentralPoint_Core.mp4",
    docsHref: "/docs/developer_adminCentralPointCore.html",
    metrics: [
      { label: "Modules", value: "Chat + planner" },
      { label: "Scheduling", value: "Conflict checks" },
      { label: "Access", value: "Permissions" },
    ],
  },

  {
    id: "disposal-logs",
    title: "Disposal Logs",
    description:
      "Production waste audit workflow with operator submission, supervisor review, admin release, and 3-department tracking.",
    longDescription:
      "An operations tool for logging, reviewing, and releasing production waste records. The workflow moves each incident through operator submission, supervisor review, and admin release, giving the production team a clearer audit trail than manual reporting. The system also includes analytics views and SQL identifier whitelisting for safer query handling.",
    tech: ["PHP 8.x", "MSSQL", "Bootstrap 5", "SQL Server"],
    category: "system",
    source: "internship",
    featured: false,
    accentColor: "#F97316",
    icon: "LOG",
    liveUrl: "https://waste-logs.vercel.app/pages/login.php",
    videoPath: "Disposal.mp4",
    metrics: [
      { label: "Use case", value: "Daily logs" },
      { label: "Departments", value: "3 covered" },
      { label: "Workflow", value: "3 stages" },
    ],
  },

  {
    id: "return-to-work-portal",
    title: "Return to Work Portal",
    description:
      "Health-clearance workflow replacing paper forms with employee submission, supervisor review, nurse sign-off, and RBAC.",
    longDescription:
      "A paperless health-clearance workflow for employees returning from absence. Employees submit declarations, supervisors approve or decline the request, and nurses issue final clearance. The system replaces manual forms with role-based routing, status tracking, and a structured approval chain.",
    tech: ["PHP", "SQL Server", "RBAC", "Tailwind CSS"],
    category: "enterprise",
    source: "internship",
    featured: true,
    accentColor: "#A78BFA",
    icon: "RTW",
    liveUrl: "https://return-to-work-one.vercel.app/auth/login.php",
    videoPath: "RTW.mp4",
    metrics: [
      { label: "Workforce", value: "1,100 users" },
      { label: "Approval chain", value: "3 stages" },
      { label: "Paper forms", value: "Replaced" },
    ],
  },

  {
    id: "facilities-portal",
    title: "Facilities Portal",
    description:
      "Lightweight Facilities app hub centralizing 6 internal tools with low-latency JSON-backed rendering.",
    longDescription:
      "A department portal for Facilities staff that centralizes access to internal applications without requiring users to remember separate URLs. The app uses flat JSON configuration for fast grid rendering and a PHP management layer for simple updates, keeping the system lightweight for daily operational use.",
    tech: ["HTML5", "Vanilla JS", "PHP", "JSON", "Tailwind CSS"],
    category: "portal",
    source: "internship",
    featured: false,
    accentColor: "#22D3EE",
    icon: "FAC",
    liveUrl: "https://facilities-portal-gamma.vercel.app/",
    videoPath: "Facilities_Portal.mp4",
    metrics: [
      { label: "Apps grouped", value: "6 tools" },
      { label: "Daily users", value: "7-15" },
      { label: "Data layer", value: "Flat JSON" },
    ],
  },

  {
    id: "raffle-system",
    title: "Raffle System",
    description:
      "Live-event raffle platform with weighted department draws, stock tracking, and admin-controlled winner reveal.",
    longDescription:
      "A raffle system built for La Rose Noire's 35th anniversary event, with all employees registered in the draw pool. Admins can control department-based probability rules, manage prize stock, and reveal winners during the event. The backend coordinates SQL Server data with JSON event state for a controlled live-draw experience.",
    tech: ["PHP", "SQL Server", "JSON", "Tailwind CSS", "Vanilla JS"],
    category: "realtime",
    source: "internship",
    featured: false,
    accentColor: "#FB7185",
    icon: "RAF",
    liveUrl: "https://raffle-system-ten.vercel.app/login.php",
    videoPath: "Raffle35th.mp4",
    metrics: [
      { label: "Participants", value: "1,100" },
      { label: "Draw model", value: "Weighted" },
      { label: "Event", value: "35th year" },
    ],
  },

  {
    id: "ai-web3-automation-assistant",
    title: "AI Web3 Automation Assistant",
    description:
      "Wallet monitoring assistant that turns on-chain events into AI summaries, automation rules, and Telegram alerts.",
    longDescription:
      "A personal exploration into AI-assisted operational tooling for Web3 activity. The assistant monitors wallet events, enriches blockchain activity into readable summaries, and triggers Telegram alerts based on user-defined automation rules. The positioning is intentionally exploratory: the goal is to learn event-driven automation patterns, not to present a mature crypto platform.",
    tech: ["TypeScript", "AI Summaries", "Telegram Bot", "Wallet Events", "Automation Rules"],
    category: "web3",
    source: "personal",
    featured: true,
    accentColor: "#6366F1",
    icon: "AI",
    liveUrl: "https://aiweb3-assistant.vercel.app/",
    videoPath: "AIWeb3Assistant.mp4",
    docsHref: "/docs/developer_documentationWEB3.html",
    metrics: [
      { label: "Focus", value: "Automation" },
      { label: "Signals", value: "Wallet events" },
      { label: "Delivery", value: "Telegram alerts" },
    ],
  },

  {
    id: "facebook-phishing-detector",
    title: "Facebook Phishing Detector",
    description:
      "Browser extension that scans Facebook post URLs with AE + GCN detection, then blurs and explains suspected phishing links.",
    longDescription:
      "A thesis-built anomaly detection system for phishing links in Facebook feed posts. The browser extension extracts URLs from the Facebook DOM, sends them to a Dockerized HTTPS REST backend, and blurs suspicious posts while offering View Anyway, Report, and Show Link Details controls. The detection pipeline combines URL lexical features, an Autoencoder trained on benign URLs, and a Graph Convolutional Network for domain-level relationship signals. Evaluation used 1,274,010 phishing URLs, 50,000 benign domains, and a 397,203-URL public test split, where the final hybrid model reached F1 0.9308 and accuracy 0.8753.",
    tech: ["Browser Extension", "Python", "Autoencoder", "GCN", "Firestore"],
    category: "ai",
    source: "personal",
    featured: true,
    accentColor: "#60A5FA",
    icon: "SEC",
    docsHref: "/docs/facebook-phishing-detector-case-study.html",
    metrics: [
      { label: "Dataset", value: "1.32M URLs" },
      { label: "Public-test F1", value: "0.9308" },
      { label: "Model", value: "AE + GCN" },
    ],
  },

  {
    id: "sulyap-kapampangan",
    title: "Sulyap Kapampangan",
    description:
      "Language and culture project exploring Kapampangan learning through digital content, structured lessons, and accessible interaction.",
    longDescription:
      "A personal product experiment focused on making Kapampangan language and cultural learning more accessible through software. The project adds breadth to the portfolio by showing user-facing product thinking outside enterprise tooling, while remaining in the Personal tab as exploratory work rather than a production business system.",
    tech: ["TypeScript", "Content Design", "Learning UX", "Localization"],
    category: "ai",
    source: "personal",
    featured: false,
    accentColor: "#F472B6",
    icon: "SK",
    metrics: [
      { label: "Focus", value: "Language" },
      { label: "Mode", value: "Learning UX" },
      { label: "Status", value: "Exploratory" },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const internshipProjects = projects.filter((p) => p.source === "internship");
export const personalProjects = projects.filter((p) => p.source === "personal");
