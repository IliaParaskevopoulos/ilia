import { useState, type ReactNode } from "react";
import PerceptualMap from "@/components/PerceptualMap";
import {
  BATTLE_CARD, COMPETITORS, COMPETITOR_SUMMARY, FOUNDATION, GOALS, HOUSES, ICPS, MAPS,
  PDFS, POSITIONING_SUMMARY, SCORES, VARS, type VarKey,
} from "@/data/paj";

const NAV = [
  ["goals", "Goals"], ["icp", "ICPs"], ["competitors", "Competitors"], ["battlecard", "Battle card"],
  ["positioning", "Positioning"], ["messaging", "Messaging"], ["downloads", "Downloads"],
] as const;

const Logo = ({ light = false }: { light?: boolean }) => (
  <span className={`text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-[#111]"}`}>
    PAJ <span className="text-[#f05123]">GPS</span>
  </span>
);

const Kicker = ({ children }: { children: ReactNode }) => (
  <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#f05123]">{children}</div>
);

const Label = ({ children }: { children: ReactNode }) => (
  <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.1em] text-[#111]">{children}</h3>
);

const Dash = ({ items }: { items: ReactNode[] }) => (
  <ul className="space-y-1.5">
    {items.map((x, i) => (
      <li key={i} className="relative pl-4 text-[15px] leading-snug text-[#333] before:absolute before:left-0 before:top-[0.6em] before:h-[2px] before:w-2 before:bg-[#f05123]">
        {x}
      </li>
    ))}
  </ul>
);

const Card = ({ title, accent = false, children }: { title: string; accent?: boolean; children: ReactNode }) => (
  <div className={`border-t-2 pt-3 ${accent ? "border-[#f05123]" : "border-[#111]"}`}>
    <Label>{title}</Label>
    {children}
  </div>
);

const Section = ({ id, kicker, title, dark = false, children }: { id: string; kicker: string; title: string; dark?: boolean; children: ReactNode }) => (
  <section id={id} className={`scroll-mt-16 px-4 py-16 sm:px-8 md:py-24 ${dark ? "bg-[#111] text-white" : ""}`}>
    <div className="mx-auto max-w-6xl">
      <Kicker>{kicker}</Kicker>
      <h2 className={`mb-10 mt-2 text-3xl font-extrabold tracking-tight md:text-5xl ${dark ? "text-white" : "text-[#111]"}`}>{title}</h2>
      {children}
    </div>
  </section>
);

const Tabs = ({ items, value, onChange }: { items: string[]; value: number; onChange: (i: number) => void }) => (
  <div className="mb-8 flex flex-wrap gap-2">
    {items.map((t, i) => (
      <button key={t} onClick={() => onChange(i)}
        className={`rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition ${i === value ? "border-[#f05123] bg-[#f05123] text-[#111]" : "border-[#111] text-[#111] hover:bg-[#f6f6f6]"}`}>
        {t}
      </button>
    ))}
  </div>
);

const ThreatPill = ({ t }: { t: string }) => (
  <span className={`inline-block rounded px-2 py-0.5 text-xs font-bold ${t === "High" ? "bg-[#f05123] text-[#111]" : t === "Medium" ? "bg-[#111] text-white" : "bg-[#eee] text-[#111]"}`}>{t}</span>
);

function HeadToHead({ name }: { name: string }) {
  const t = SCORES[name], u = SCORES.PAJ;
  const keys = (Object.keys(VARS) as VarKey[]).filter((k) => t[k] != null);
  return (
    <div className="space-y-2">
      <div className="flex gap-4 text-xs text-[#8a8a8a]">
        <span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-[#f05123]" />PAJ</span>
        <span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-[#4a4a4a]" />{name}</span>
        <span>· directional (verify)</span>
      </div>
      {keys.map((k) => {
        const a = t[k]!, b = u[k]!;
        const lo = Math.min(a, b) * 10, hi = Math.max(a, b) * 10;
        return (
          <div key={k} className="grid grid-cols-[110px_1fr_28px_28px] items-center gap-2 text-sm sm:grid-cols-[140px_1fr_32px_32px]">
            <span className="text-[#333]">{VARS[k]}</span>
            <div className="relative h-4">
              <div className="absolute inset-x-0 top-1/2 h-px bg-[#e4e4e4]" />
              <div className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-[#8a8a8a]" style={{ left: `${lo}%`, width: `${hi - lo}%` }} />
              <div className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#4a4a4a]" style={{ left: `${a * 10}%` }} />
              <div className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#f05123]" style={{ left: `${b * 10}%` }} />
            </div>
            <span className="text-right font-bold tabular-nums">{b}</span>
            <span className="text-right tabular-nums text-[#4a4a4a]">{a}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Index() {
  const [icp, setIcp] = useState(0);
  const [comp, setComp] = useState<number | null>(null);
  const [map, setMap] = useState(0);
  const [house, setHouse] = useState(0);
  const I = ICPS[icp], M = MAPS[map], H = HOUSES[house];

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif] text-[#111] antialiased">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b-4 border-[#f05123] bg-[#111]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-8">
          <a href="#top"><Logo light /></a>
          <nav className="hidden gap-5 md:flex">
            {NAV.map(([id, l]) => (
              <a key={id} href={`#${id}`} className="text-sm font-medium text-[#cfcfcf] hover:text-white">{l}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-[#111] px-4 pb-20 pt-16 text-white sm:px-8 md:pb-28 md:pt-24">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(240,81,35,0.35),transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl">
          <Kicker>Go-to-market intelligence · Q4 2026</Kicker>
          <h1 className="mt-4 max-w-4xl text-5xl font-extrabold leading-[0.98] tracking-tight md:text-7xl">
            One app. Every tracker.<br /><span className="text-[#f05123]">Honest price.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[#cfcfcf]">Three ICPs, eight rivals, four maps, three messaging houses.</p>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
            {[["3", "ICPs"], ["8", "Competitors"], ["4", "Positioning maps"], ["3", "Messaging houses"]].map(([n, l]) => (
              <div key={l} className="border-t-4 border-[#f05123] pt-3">
                <div className="text-4xl font-extrabold">{n}</div>
                <div className="text-sm text-[#cfcfcf]">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <Section id="goals" kicker="This quarter" title="Two goals">
        <div className="grid gap-6 md:grid-cols-2">
          {GOALS.map((g) => (
            <div key={g.n} className="border-t-4 border-[#f05123] bg-[#f6f6f6] p-6">
              <div className="text-5xl font-extrabold text-[#f05123]">{g.n}</div>
              <div className="mt-2 text-2xl font-extrabold">{g.title}</div>
              <p className="mt-1 text-[#333]">{g.text}</p>
              <p className="mt-3 text-sm text-[#8a8a8a]">{g.kpis}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ICPs */}
      <Section id="icp" kicker="Ideal customer profiles" title="Who we sell to">
        <Tabs items={ICPS.map((x) => x.label)} value={icp} onChange={setIcp} />
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Kicker>ICP {icp + 1} · {I.label} · {I.type}</Kicker>
            <h3 className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl">{I.title}</h3>
            <p className="mt-2 text-lg font-medium text-[#4a4a4a]"><span className="font-extrabold text-[#f05123]">“</span>{I.job}<span className="font-extrabold text-[#f05123]">”</span></p>
          </div>
          <div className="flex gap-8 md:text-right">
            <div><div className="text-2xl font-extrabold">{I.valueMetric}</div><div className="text-xs font-semibold uppercase tracking-wider text-[#8a8a8a]">Value metric</div></div>
            <div><div className="text-2xl font-extrabold">{I.product}</div><div className="text-xs font-semibold uppercase tracking-wider text-[#8a8a8a]">Lead product</div></div>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card title="Profile" accent>
            <dl className="space-y-2">
              {I.profile.map(([k, v]) => (
                <div key={k}><dt className="text-[11px] font-bold uppercase tracking-wider text-[#8a8a8a]">{k}</dt><dd className="text-[15px]">{v}</dd></div>
              ))}
            </dl>
          </Card>
          <Card title="Pains"><Dash items={I.pains} /></Card>
          <Card title="Triggers"><Dash items={I.triggers} /></Card>
          <Card title="Channels"><Dash items={I.channels} /></Card>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.6fr_1fr]">
          <Card title="Buying criteria">
            <ol className="list-decimal space-y-1 pl-5 marker:font-bold marker:text-[#f05123]">{I.criteria.map((c) => <li key={c}>{c}</li>)}</ol>
          </Card>
          <Card title="Objections → answer">
            <table className="w-full text-sm"><tbody>
              {I.objections.map(([o, a]) => (
                <tr key={o} className="border-b border-[#e4e4e4]"><td className="py-2 pr-3 align-top">“{o}”</td><td className="py-2 align-top text-[#333]">{a}</td></tr>
              ))}
            </tbody></table>
          </Card>
          <Card title="Fit & expansion" accent>
            <dl className="space-y-2">
              {[["Good fit", I.fit], ["Disqualify", I.disqualify], ["Cross-sell (goal 2)", I.expand]].map(([k, v]) => (
                <div key={k}><dt className="text-[11px] font-bold uppercase tracking-wider text-[#8a8a8a]">{k}</dt><dd className="text-[15px]">{v}</dd></div>
              ))}
            </dl>
          </Card>
        </div>
        <p className="mt-8 text-xs text-[#8a8a8a]">Method: ICP framework (HubSpot / Gartner) + Jobs-to-be-Done.</p>
      </Section>

      {/* Competitors */}
      <Section id="competitors" kicker="Competitive landscape" title="Eight rivals. One open lane." dark>
        <div className="mb-10 grid gap-3 md:grid-cols-2">
          {COMPETITOR_SUMMARY.map((s) => (
            <div key={s} className="border-l-4 border-[#f05123] bg-white/5 px-4 py-3 text-[#e9e9e9]">{s}</div>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMPETITORS.map((c, i) => (
            <button key={c.name} onClick={() => setComp(comp === i ? null : i)}
              className={`border-t-4 bg-white p-4 text-left text-[#111] transition hover:-translate-y-0.5 ${comp === i ? "border-[#f05123] ring-2 ring-[#f05123]" : "border-[#111]"}`}>
              <div className="flex items-start justify-between gap-2"><div className="text-lg font-extrabold">{c.name}</div><ThreatPill t={c.threat} /></div>
              <div className="text-sm text-[#8a8a8a]">{c.seg}</div>
              <div className="mt-3 text-sm"><span className="font-semibold">Win:</span> {c.win[0]}</div>
              <div className="text-sm"><span className="font-semibold">Lose:</span> {c.lose[0]}</div>
            </button>
          ))}
        </div>
        {comp !== null && (() => {
          const c = COMPETITORS[comp];
          return (
            <div className="mt-6 bg-white p-6 text-[#111] md:p-8">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <Kicker>Competitor {comp + 1} / {COMPETITORS.length} · {c.seg}</Kicker>
                  <h3 className="mt-1 text-3xl font-extrabold">{c.name} {c.sub && <span className="text-lg font-semibold text-[#8a8a8a]">{c.sub}</span>}</h3>
                  <p className="mt-1 text-lg text-[#4a4a4a]">“{c.pos}”</p>
                </div>
                <ThreatPill t={c.threat} />
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card title="Snapshot" accent>
                  <dl className="space-y-2 text-[15px]">
                    {[["HQ", c.hq], ["Offer", c.offer], ["Pricing", c.price]].map(([k, v]) => (
                      <div key={k}><dt className="text-[11px] font-bold uppercase tracking-wider text-[#8a8a8a]">{k}</dt><dd>{v}</dd></div>
                    ))}
                  </dl>
                </Card>
                <Card title="Strengths"><Dash items={c.str} /></Card>
                <Card title="Weaknesses"><Dash items={c.weak} /></Card>
                <Card title="Where we lose"><Dash items={c.lose} /></Card>
              </div>
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_2fr]">
                <Card title="Where we win" accent><Dash items={c.win} /></Card>
                <div>
                  <div className="border-l-4 border-[#f05123] bg-[#111] px-4 py-3 font-semibold text-white">
                    <div className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#f05123]">Talk track</div>{c.track}
                  </div>
                  <div className="mt-6"><Card title="Head-to-head · 0–10"><HeadToHead name={c.name} /></Card></div>
                </div>
              </div>
            </div>
          );
        })()}
        <p className="mt-6 text-sm text-[#8a8a8a]">Tap a card for the full profile.</p>
      </Section>

      {/* Battle card */}
      <Section id="battlecard" kicker="Battle card · Pets" title={`${BATTLE_CARD.product} vs ${BATTLE_CARD.versus}`}>
        <p className="-mt-6 mb-10 text-lg font-medium text-[#4a4a4a]">“{BATTLE_CARD.pitch}”</p>
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.4fr_1fr]">
          <div className="bg-[#111] p-6 text-white">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.1em] text-[#f05123]">Why we win</h3>
            <Dash items={BATTLE_CARD.why.map(([a, b]) => <span key={a} className="text-white"><b>{a}</b> {b}</span>)} />
            <h3 className="mb-3 mt-6 text-xs font-bold uppercase tracking-[0.1em] text-[#f05123]">Landmines to set</h3>
            <ol className="list-decimal space-y-1.5 pl-5 marker:font-bold marker:text-[#f05123]">{BATTLE_CARD.landmines.map((l) => <li key={l}>“{l}”</li>)}</ol>
          </div>
          <div className="overflow-x-auto">
            <Label>Quick facts</Label>
            <table className="w-full min-w-[420px] text-sm">
              <thead><tr className="border-b-2 border-[#111] text-left text-[11px] uppercase tracking-wider text-[#8a8a8a]">
                <th className="py-2" />{BATTLE_CARD.facts.cols.map((c, i) => <th key={c} className={`py-2 text-center ${i === 0 ? "bg-[#fde8e0] text-[#111]" : ""}`}>{c}</th>)}
              </tr></thead>
              <tbody>{BATTLE_CARD.facts.rows.map(([k, ...v]) => (
                <tr key={k} className="border-b border-[#e4e4e4]"><td className="py-2 pr-2">{k}</td>
                  {v.map((x, i) => <td key={i} className={`py-2 text-center ${i === 0 ? "bg-[#fde8e0] font-bold" : ""} ${x === "No" ? "text-[#8a8a8a]" : ""}`}>{x}</td>)}
                </tr>
              ))}</tbody>
            </table>
            <p className="mt-2 text-xs text-[#8a8a8a]">Prices and specs from retailer / review data, 2025 (verify).</p>
          </div>
          <div>
            <Card title="Objections → answer">
              <table className="w-full text-sm"><tbody>
                {BATTLE_CARD.objections.map(([o, a]) => <tr key={o} className="border-b border-[#e4e4e4]"><td className="py-2 pr-3 align-top">“{o}”</td><td className="py-2 align-top">{a}</td></tr>)}
              </tbody></table>
            </Card>
            <div className="mt-6"><Card title="Don't"><Dash items={BATTLE_CARD.dont} /></Card></div>
          </div>
        </div>
      </Section>

      {/* Positioning */}
      <Section id="positioning" kicker="Positioning" title="Four maps, eight buying criteria">
        <Tabs items={MAPS.map((m) => m.icp)} value={map} onChange={setMap} />
        <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_1fr]">
          <PerceptualMap players={M.players} x={M.x} y={M.y} quads={M.quads} />
          <div className="space-y-6">
            <div><Kicker>Map {map + 1} · {M.icp}</Kicker><h3 className="mt-1 text-3xl font-extrabold tracking-tight">{M.title}</h3></div>
            <Card title="Axes from ICP criteria">
              <Dash items={[<span key="x"><b>X · {VARS[M.x]}:</b> {M.why[0]}</span>, <span key="y"><b>Y · {VARS[M.y]}:</b> {M.why[1]}</span>]} />
            </Card>
            <Card title="Executive summary" accent><Dash items={M.take} /></Card>
            <div className="border-l-4 border-[#f05123] bg-[#111] px-4 py-3 font-semibold text-white">
              <div className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#f05123]">Action</div>{M.act}
            </div>
          </div>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {POSITIONING_SUMMARY.map(([k, v]) => (
            <div key={k} className="border-t-2 border-[#f05123] pt-3 text-[15px]"><b>{k}:</b> {v}</div>
          ))}
        </div>
        <p className="mt-6 text-xs text-[#8a8a8a]">Scores 0–10, directional estimates (verify). Upper-right = better for the customer. Hover a dot for scores.</p>
      </Section>

      {/* Messaging */}
      <Section id="messaging" kicker="Messaging house" title="What we say, per ICP">
        <Tabs items={HOUSES.map((h) => h.icp)} value={house} onChange={setHouse} />
        <Kicker>{H.icp} · {H.product}</Kicker>
        <h3 className="mb-8 mt-1 text-2xl font-extrabold tracking-tight md:text-3xl">{H.who}</h3>
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="flex h-36 items-end justify-center bg-[#111] pb-5 text-center text-white [clip-path:polygon(50%_0,100%_100%,0_100%)] md:h-44">
              <div>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f05123]">Roof · core message</div>
                <div className="px-16 text-xl font-extrabold leading-tight md:text-2xl">{H.roof}</div>
              </div>
            </div>
            <div className="h-1.5 bg-[#f05123]" />
            <div className="grid gap-3 px-0 py-3 sm:grid-cols-3 sm:px-6">
              {H.pillars.map((p, j) => (
                <div key={p.t} className="flex flex-col gap-2 border border-[#e4e4e4] border-t-4 border-t-[#f05123] p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a8a8a]">Pillar {j + 1}</div>
                  <div className="text-lg font-extrabold">{p.t}</div>
                  <div className="min-h-[2.8em] text-[15px] text-[#4a4a4a]">{p.m}</div>
                  <div className="flex-1 bg-[#f6f6f6] p-3">
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a8a8a]">Proof</div>
                    <Dash items={p.p} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start justify-between gap-1 bg-[#111] px-4 py-3 text-white sm:flex-row sm:items-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#cfcfcf]">Foundation</span>
              <span className="font-bold">{FOUNDATION.map((f, i) => <span key={f}>{i > 0 && <b className="mx-2 text-[#f05123]">·</b>}{f}</span>)}</span>
            </div>
          </div>
          <div className="space-y-6">
            <Card title="Versus" accent>
              <table className="w-full text-sm"><tbody>
                {H.vs.map(([a, b]) => <tr key={a} className="border-b border-[#e4e4e4]"><td className="py-2 pr-3 font-bold">{a}</td><td className="py-2">{b}</td></tr>)}
              </tbody></table>
            </Card>
            <Card title="Tone"><Dash items={["Calm, direct", "Outcome first", "No tech jargon"]} /></Card>
            <Card title="House check">
              <ul className="space-y-1 text-sm">
                {["Roof passes \"so what?\"", "Each pillar answers an ICP pain", "Each proof is substantiated", "No pillar a rival could copy", "≤ 12 words per line"].map((c) => (
                  <li key={c}><span className="mr-1.5 font-extrabold text-[#f05123]">✓</span>{c}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      {/* Downloads */}
      <Section id="downloads" kicker="Downloads" title="Take it with you" dark>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PDFS.map((p) => (
            <a key={p.file} href={p.file} target="_blank" rel="noreferrer"
              className="group border-t-4 border-[#f05123] bg-white p-5 text-[#111] transition hover:-translate-y-0.5">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a8a8a]">PDF</div>
              <div className="mt-1 text-lg font-extrabold">{p.title}</div>
              <div className="text-sm text-[#4a4a4a]">{p.desc}</div>
              <div className="mt-4 text-sm font-bold text-[#f05123] group-hover:underline">Open →</div>
            </a>
          ))}
        </div>
      </Section>

      <footer className="border-t border-[#e4e4e4] px-4 py-6 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 text-xs text-[#8a8a8a] sm:flex-row">
          <Logo /><span>Internal · Q4 2026 · Items marked (verify) are unconfirmed</span>
        </div>
      </footer>
    </div>
  );
}
