import Anthropic from "@anthropic-ai/sdk";
import { TOPIC_LABELS, type CompanyConfig, type DraftIssue, type ResearchResult } from "./types.js";

const anthropic = new Anthropic();

const STYLE_GUIDE = `Write like a top-tier strategy consultancy memo (McKinsey house style), kept a little leaner than the original:
- Lead every item with the "so what," not the news itself. State the implication in the first clause.
- Short, declarative sentences. Active voice. No hedging ("might potentially").
- One idea per sentence. Cut adjectives that don't carry information.
- Quantify wherever the source supports it (percentages, dollar amounts, timeframes).
- Never editorialize beyond what the source supports. If evidence is thin, say so plainly ("early signal, unconfirmed").
- The executive summary is 2-4 sentences that a reader could act on without reading further.`;

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  return JSON.parse(candidate.trim());
}

export async function draftIssue(company: CompanyConfig, research: ResearchResult): Promise<DraftIssue> {
  const topicsWithFindings = Object.entries(research).filter(([, items]) => items && items.length > 0);

  const prompt = `${STYLE_GUIDE}

Using the research findings below, write this week's market intelligence briefing for ${company.companyName} (market: ${company.market}).

Research findings (JSON):
${JSON.stringify(research, null, 2)}

Respond with ONLY a JSON object (no prose before or after), wrapped in a \`\`\`json code fence, shaped exactly like this:
{
  "title": "one specific headline capturing the single most important development this week",
  "executiveSummary": "2-4 sentences, the so-what a reader needs even if they read nothing else",
  "sections": [
    {
      "topic": "<one of: ${topicsWithFindings.map(([k]) => k).join(", ")}>",
      "items": [
        { "lead": "bolded-style short lead phrase (no markdown bold, just the phrase)", "body": "1-2 sentences of supporting detail", "source": "short source label, e.g. 'company pricing page' or 'SEC filing'" }
      ]
    }
  ]
}
Only include sections for topics that actually have findings. Skip empty ones entirely.`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n");

  try {
    return extractJson(text) as DraftIssue;
  } catch (err) {
    throw new Error(`Failed to parse draft JSON for ${company.id}. Raw model output:\n${text}\n\nOriginal error: ${err}`);
  }
}
