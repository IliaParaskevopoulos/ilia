import Anthropic from "@anthropic-ai/sdk";
import { TOPIC_LABELS, type CompanyConfig, type ResearchResult } from "./types.js";

const anthropic = new Anthropic();

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  return JSON.parse(candidate.trim());
}

export async function researchCompany(company: CompanyConfig): Promise<ResearchResult> {
  const topicList = company.trackedTopics.map((t) => `- ${t}: ${TOPIC_LABELS[t]}`).join("\n");

  const prompt = `You are a market-intelligence researcher. Search the web for developments from the last 7 days relevant to this company and its market:

Company: ${company.companyName}
Market: ${company.market}
Named competitors to track: ${company.competitors.join(", ") || "none listed"}

Research each of these topics. If you find nothing genuinely new for a topic in the last 7 days, return an empty array for it rather than inventing filler.
${topicList}

For every finding, verify it against at least one real, cited source found via search — never fabricate a headline or event.

Respond with ONLY a JSON object (no prose before or after) shaped exactly like this:
{
  "<topic_key>": [
    {
      "headline": "short factual headline",
      "summary": "2-3 sentence neutral summary of what happened",
      "whyItMatters": "1-2 sentences on the implication specifically for ${company.companyName}",
      "sources": ["https://..."]
    }
  ]
}
Only include the topic keys listed above. Wrap the JSON in a \`\`\`json code fence.`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 8000,
    tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 10 }],
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n");

  try {
    return extractJson(text) as ResearchResult;
  } catch (err) {
    throw new Error(
      `Failed to parse research JSON for ${company.id}. Raw model output:\n${text}\n\nOriginal error: ${err}`
    );
  }
}
