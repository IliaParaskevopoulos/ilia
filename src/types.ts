export type TopicKey =
  | "competitors"
  | "regulation"
  | "pricing"
  | "funding_ma"
  | "supply_chain"
  | "key_customers";

export const TOPIC_LABELS: Record<TopicKey, string> = {
  competitors: "Competitive moves",
  regulation: "Regulatory & policy",
  pricing: "Pricing & deals",
  funding_ma: "Funding & M&A",
  supply_chain: "Supply chain",
  key_customers: "Customer signals",
};

export interface CompanyConfig {
  id: string;
  companyName: string;
  market: string;
  competitors: string[];
  trackedTopics: TopicKey[];
  subscribers: string[];
}

export interface TopicFinding {
  headline: string;
  summary: string;
  whyItMatters: string;
  sources: string[];
}

export type ResearchResult = Partial<Record<TopicKey, TopicFinding[]>>;

export interface DraftItem {
  lead: string;
  body: string;
  source?: string;
}

export interface DraftSection {
  topic: TopicKey;
  items: DraftItem[];
}

export interface DraftIssue {
  title: string;
  executiveSummary: string;
  sections: DraftSection[];
}
