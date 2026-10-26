export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: "enterprise" | "portal" | "system" | "ai" | "realtime" | "web3";
  source: "internship" | "personal" | "professional";
  featured: boolean;
  accentColor: string;
  icon: string;
  liveUrl?: string;
  videoPath?: string;         // relative to /public/videos/
  docsHref?: string;          // public documentation or case-study URL
  isComingSoon?: boolean;     // blurs card and shows "Under Construction"
  isPrivate?: boolean;        // confidential work: no link, video, or public docs
  metrics?: { label: string; value: string }[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
