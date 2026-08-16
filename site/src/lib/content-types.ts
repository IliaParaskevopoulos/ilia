// Content schema for a client's Sales Play Kit.
// The Néstōr (see /agent/SYSTEM_PROMPT.md) produces JSON matching
// this shape. The site renders whatever JSON is dropped into /content/<slug>.json.

export interface CompanyMeta {
  name: string;
  slug: string;
  tagline: string;
  logoUrl?: string;
  primaryColor?: string; // hex, used as the site's accent color
  lastUpdated: string; // ISO date
  preparedBy: string; // e.g. "Product Marketing x <agency name>"
  // "teaser": a deliberately partial kit shown to prospects to sell the
  // full engagement. "full": the real, complete deliverable.
  tier: "teaser" | "full";
}

export interface ICPSegment {
  id: string;
  name: string; // e.g. "Mid-market VP of Sales"
  description: string;
  firmographics: string[]; // company size, industry, geo, tech stack, etc.
  buyerRole: string; // title / role of the buyer
  painPoints: string[];
  goals: string[];
  triggerEvents: string[]; // events that create buying urgency
  whereToFindThem: string[]; // channels, communities, events
  disqualifiers: string[]; // signs this is NOT a fit
}

export interface MarketReport {
  id: string;
  title: string;
  summary: string;
  publishedDate: string; // ISO date
  sections: {
    heading: string;
    body: string; // markdown
  }[];
  keyStats: {
    label: string;
    value: string;
    source?: string;
  }[];
  sources: string[];
}

export interface CompetitorProfile {
  name: string;
  logoUrl?: string;
  oneLiner: string;
  strengths: string[];
  weaknesses: string[];
  pricingNotes: string;
  whenTheyWin: string[];
  whenWeWin: string[];
  landmines: string[]; // questions/traps that expose their weaknesses in a deal
  proofPoints: string[]; // case studies, stats, quotes that counter them
}

export interface Battlecard {
  id: string;
  competitorName: string;
  segment?: string; // which ICP segment this battlecard applies to
  positioningStatement: string; // one paragraph: how to frame us vs them
  competitor: CompetitorProfile;
  talkTrack: string[]; // ordered talking points for a rep to use live
  doNotSay: string[]; // things reps should avoid saying
  battleTestedQuotes: string[]; // quotable lines that have worked
}

export interface ObjectionResponse {
  id: string;
  category:
    | "price"
    | "product"
    | "competitor"
    | "timing"
    | "trust"
    | "internal-champion"
    | "other";
  objection: string; // what the prospect says
  underlyingConcern: string; // what they actually mean
  response: string; // recommended verbal response
  followUpQuestions: string[];
  supportingProof: string[]; // stats, case studies, references to use
}

export interface ImageAsset {
  id: string;
  title: string;
  description: string;
  useCase: string; // e.g. "LinkedIn social post", "one-pager hero image"
  url: string; // rendered/generated image, or a placeholder
  altText: string;
  tags: string[];
}

export interface VideoScript {
  id: string;
  title: string;
  purpose: string; // e.g. "30s demo teaser", "objection-handling explainer"
  targetLength: string; // e.g. "60-90 seconds"
  audience: string; // which ICP segment
  scenes: {
    shot: string; // visual direction
    voiceover: string;
    onScreenText?: string;
  }[];
  callToAction: string;
}

export interface CertificationDoc {
  id: string;
  title: string;
  type: "quality" | "legal" | "compliance" | "supply-chain" | "other";
  description: string;
  fileUrl: string; // pdf or scanned document
  issuedBy?: string;
  issuedDate?: string; // ISO date
  expiryDate?: string; // ISO date
  tags: string[];
}

export interface Brochure {
  id: string;
  title: string;
  description: string;
  useCase: string; // e.g. "leave-behind after first meeting"
  audience?: string; // which ICP segment
  fileUrl: string; // pdf
  thumbnailUrl?: string;
}

export interface SalesDeck {
  id: string;
  title: string;
  description: string;
  audience?: string; // which ICP segment / deal stage
  fileUrl: string; // pptx / pdf / slides link
  slideCount?: number;
  lastUpdated?: string; // ISO date
}

export interface WebinarIdea {
  id: string;
  title: string;
  description: string;
  targetAudience: string;
  format: "live" | "recorded" | "panel" | "workshop";
  keyTakeaways: string[];
  suggestedSpeakers?: string[];
}

// Every section is an array so a client's kit can omit any content type
// entirely (e.g. a company with no certifications just gets an empty
// array) without changing the schema.
export interface SalesPlayKit {
  company: CompanyMeta;
  icpSegments: ICPSegment[];
  marketReports: MarketReport[];
  battlecards: Battlecard[];
  objections: ObjectionResponse[];
  imageAssets: ImageAsset[];
  videoScripts: VideoScript[];
  certifications: CertificationDoc[];
  brochures: Brochure[];
  salesDecks: SalesDeck[];
  webinarIdeas: WebinarIdea[];
}
