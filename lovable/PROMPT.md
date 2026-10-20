# Lovable prompts

Paste each message separately. Wait for Lovable to finish before the next one.

## Message 1

```
Build an internal one-page site for PAJ GPS (GPS trackers).
Brand: orange #f05123, black #111111, white. Font: Inter from Google Fonts (weights 400-800), set as the body font in index.css.
Add `html { scroll-behavior: smooth; }` to index.css.
The next messages contain three files. Create them exactly as given, character for character. Do not redesign, rename or add libraries.
The page in src/pages/Index.tsx is the "/" route.
```

## Message 2

Create `src/data/paj.ts` with exactly this content:

```ts
// PAJ GPS go-to-market content. Single source for the site.
// Scores 0–10, higher = better for the customer. Directional estimates — verify.

export const BRAND = {
  orange: "#f05123",
  orangeTint: "#fde8e0",
  black: "#111111",
};

export const GOALS = [
  { n: 1, title: "Acquire", text: "Expand the customer base with devices sold.", kpis: "Devices sold · activations · CAC" },
  { n: 2, title: "Retain & expand", text: "Existing customers buy more and keep subscribing.", kpis: "Churn · renewals · devices per customer · upgrades" },
];

export type VarKey = "afford" | "live" | "ease" | "safety" | "plug" | "depth" | "breadth" | "flex";

export const VARS: Record<VarKey, string> = {
  afford: "Affordability",
  live: "Live tracking",
  ease: "Ease of use",
  safety: "Safety features",
  plug: "Plug & play",
  depth: "Fleet depth",
  breadth: "Portfolio breadth",
  flex: "Contract flexibility",
};

export const SCORES: Record<string, Partial<Record<VarKey, number>>> = {
  PAJ: { afford: 7.5, live: 8, ease: 6, safety: 8, plug: 9, depth: 5, breadth: 9, flex: 8.5 },
  Tractive: { afford: 5, live: 9, ease: 8, safety: 6, breadth: 3, flex: 7 },
  Weenect: { afford: 5.5, live: 8, ease: 7, safety: 6.5, breadth: 6, flex: 7 },
  "Apple AirTag": { afford: 9.5, live: 2, ease: 9, safety: 1.5, plug: 9.5, depth: 1, breadth: 7, flex: 9.5 },
  Invoxia: { afford: 4.5, live: 5, ease: 6.5, safety: 4, plug: 8, depth: 3, breadth: 6.5, flex: 6 },
  Hausnotruf: { afford: 3, live: 3, ease: 8.5, safety: 9, breadth: 2, flex: 6 },
  Webfleet: { afford: 2, live: 9, ease: 4, safety: 7, plug: 3, depth: 9.5, breadth: 3, flex: 2 },
  Samsara: { afford: 1, live: 9.5, ease: 4, safety: 8, plug: 3.5, depth: 10, breadth: 4, flex: 2 },
  Vimcar: { afford: 4.5, live: 7, ease: 7, safety: 4, plug: 7, depth: 7, breadth: 2, flex: 5 },
};

export type Icp = {
  id: string; label: string; type: string; title: string; job: string;
  valueMetric: string; product: string;
  profile: [string, string][]; pains: string[]; triggers: string[]; channels: string[];
  criteria: string[]; objections: [string, string][]; fit: string; disqualify: string; expand: string;
};

export const ICPS: Icp[] = [
  {
    id: "pets", label: "Pets", type: "B2C", title: "The protective dog owner",
    job: "Find my dog fast when it runs off.", valueMetric: "Minutes to find", product: "PET Finder 4G",
    profile: [["Who", "Dog owner, 25–55 · also outdoor cats"], ["Where", "DACH / EU · suburban, rural"], ["Dog", "> 4 kg · hunting, rescue, escape-prone"], ["Buyer / user", "Owner = buyer = user"]],
    pains: ["Dog bolts, hunts, gets lost", "Fear of theft", "AirTag fails away from phones", "Panic: no idea where to start"],
    triggers: ["New puppy / rescue dog", "Near-loss incident", "Move to countryside", "Holiday, hiking season"],
    channels: ["Amazon, pet retail", "Vets, dog trainers", "Dog forums, Facebook groups", "Instagram, YouTube reviews"],
    criteria: ["Live location, any distance", "Battery life", "Weight on collar", "Waterproof", "Monthly cost"],
    objections: [["Another subscription", "From ~€5/mo (verify)"], ["Battery dies too fast", "Up to 5 days; low-battery alert"], ["AirTag is enough", "AirTag needs phones nearby. PAJ is 4G live."], ["Too heavy for my dog", "Light, collar-mounted; dogs > 4 kg"]],
    fit: "Outdoor dogs, off-leash walks", disqualify: "Indoor-only pets · dogs < 4 kg", expand: "2nd pet · car tracker · parent tracker",
  },
  {
    id: "seniors", label: "Seniors", type: "B2C", title: "The caring adult child",
    job: "Know mum is safe, without taking her independence.", valueMetric: "SOS response", product: "EASY Finder 4G",
    profile: [["Buyer", "Adult child, 40–65, often lives away"], ["User", "Parent 75+, lives alone, early dementia"], ["Where", "DACH / EU"], ["Influencers", "Siblings, doctor, care service"]],
    pains: ["Wandering, getting lost", "Falls outside the home", "Parent can't use a smartphone", "Guilt, distance, worry"],
    triggers: ["First wandering episode", "Fall or hospital stay", "Dementia diagnosis", "Partner dies, parent alone"],
    channels: ["Google: \"GPS tracker dementia\"", "Amazon, pharmacies", "Care services, GPs", "Facebook carer groups"],
    criteria: ["Senior will actually wear it", "One-press SOS", "Zero setup for the senior", "Geofence alerts", "Price vs Hausnotruf"],
    objections: [["She won't wear it", "Small, pocket or keyring."], ["Too complex", "Senior presses one button. You use the app."], ["Feels like spying", "Alerts only when needed. GDPR, German."], ["We have Hausnotruf", "Hausnotruf stops at the door. PAJ goes with her."]],
    fit: "Mobile senior, still walks out alone", disqualify: "Full-time residential care with own system", expand: "2nd parent · Premium history · family pet",
  },
  {
    id: "fleet", label: "Fleet", type: "B2B (SMB)", title: "The hands-on fleet owner",
    job: "See every vehicle and machine. Cut cost and theft.", valueMetric: "€ saved / vehicle / month", product: "POWER / VEHICLE Finder",
    profile: [["Size", "3–50 vehicles · < 250 staff"], ["Industries", "Trades, delivery, construction, rental"], ["Buyer", "Owner / ops manager"], ["User", "Dispatcher, office manager"]],
    pains: ["Vehicle and equipment theft", "Fuel, private-use cost", "Manual logbooks, disputes", "No live dispatch view"],
    triggers: ["Theft of van or machine", "Tax / logbook requirement", "Fleet grows past ~5", "Insurer demands tracking"],
    channels: ["Google, Amazon Business", "Trade associations", "Insurers, leasing firms", "Resellers, installers"],
    criteria: ["Price per vehicle", "Plug & play install", "Theft alarm + recovery", "No long contract", "Route history, logbook"],
    objections: [["Drivers / works council", "GDPR-ready, German company (verify)"], ["Telematics is expensive", "Fraction of Webfleet. No lock-in."], ["Installation hassle", "Magnetic or 12V. Minutes."], ["We need integrations", "Portal export. ERP needs → not our ICP."]],
    fit: "Mixed fleet: vans + trailers + machines", disqualify: "> 200 vehicles, deep ERP needs", expand: "Land 3 → grow per vehicle · equipment add-on",
  },
];

export type Competitor = {
  name: string; sub?: string; seg: string; threat: "High" | "Medium" | "Low"; pos: string;
  hq: string; offer: string; price: string;
  str: string[]; weak: string[]; win: string[]; lose: string[]; track: string;
};

export const COMPETITORS: Competitor[] = [
  { name: "Tractive", seg: "Pets", threat: "High", pos: "The #1 GPS tracker for dogs and cats.",
    hq: "Pasching, Austria · since 2012", offer: "GPS DOG / CAT trackers, health & activity", price: "~€50 device + ~€5–13/mo (verify)",
    str: ["Category leader, strong brand", "Health, activity, sleep tracking", "Polished app, big community", "Wide retail presence"],
    weak: ["Pets only", "Mandatory, pricier subscription", "Battery a few days"],
    win: ["Lower price", "One app: pet + family + car", "German company, support"], lose: ["Brand awareness", "Health features", "Retail shelf space"],
    track: "Same live tracking. Lower price. One app for the whole household." },
  { name: "Weenect", seg: "Pets · Seniors", threat: "Medium", pos: "GPS trackers for pets and loved ones.",
    hq: "Paris, France", offer: "Dog, cat, kids, senior trackers", price: "Device + ~€5–10/mo (verify)",
    str: ["Multi-segment consumer range", "Design, cat-specific device", "Strong in France"], weak: ["No vehicle / fleet line", "Smaller DACH presence"],
    win: ["Vehicle and equipment range", "DACH presence", "Price"], lose: ["Design", "Cat-specific form factor"],
    track: "Everything Weenect tracks, plus your car, van and trailer." },
  { name: "Apple AirTag", sub: "and Samsung SmartTag", seg: "All segments", threat: "High", pos: "Lose your knack for losing things.",
    hq: "Cupertino, USA", offer: "Bluetooth item finder, Find My network", price: "~€35, no subscription",
    str: ["Price anchor, no subscription", "Huge crowd network", "1-year coin battery", "Brand trust"],
    weak: ["Not real-time; needs iPhones nearby", "Anti-stalking alerts warn thieves", "No geofence, no SOS", "Apple: not for pets or people"],
    win: ["Live 4G anywhere", "Geofence, alarms, SOS", "Theft recovery"], lose: ["Price", "Zero setup"],
    track: "AirTag tells you where it was. PAJ tells you where it is." },
  { name: "Invoxia", seg: "Pets · Vehicles", threat: "Medium", pos: "Discreet trackers, months of battery.",
    hq: "Issy-les-Moulineaux, France", offer: "Pet, bike and car trackers (LTE-M / LoRa)", price: "Device incl. 1–3 yrs, then sub (verify)",
    str: ["Long battery", "Small, discreet", "Design"], weak: ["Interval updates, less live", "Fewer alarms, no SOS", "Thin fleet tooling"],
    win: ["True live tracking", "SOS and alarm range", "Fleet portal"], lose: ["Battery life", "Size"],
    track: "When it matters, minutes count. PAJ updates live." },
  { name: "Hausnotruf", sub: "DRK · Johanniter · Malteser", seg: "Seniors", threat: "Medium", pos: "Help at the press of a button, 24/7.",
    hq: "Germany · welfare organisations", offer: "Home emergency button + call centre", price: "Base ~€25/mo, reimbursable with care grade (verify)",
    str: ["24/7 human response", "Trust, institutions", "Insurer reimbursement"], weak: ["Base system stops at the door", "Mobile option costs more", "Dated tech"],
    win: ["Works outside the home", "Live location to family", "Lower mobile cost"], lose: ["Human call centre", "Reimbursement", "Institutional trust"],
    track: "Hausnotruf at home. PAJ everywhere else." },
  { name: "Webfleet", sub: "Bridgestone", seg: "Fleet", threat: "Medium", pos: "Europe's leading fleet management solution.",
    hq: "Amsterdam, NL", offer: "Telematics, driver behaviour, tachograph, integrations", price: "Per vehicle, multi-year contract (verify)",
    str: ["Deep fleet features", "Integrations, ecosystem", "Installer network, scale"], weak: ["Price", "Long contracts", "Overkill for small fleets"],
    win: ["Price per vehicle", "No lock-in", "DIY install, equipment"], lose: ["Feature depth", "Integrations", "Enterprise deals"],
    track: "What a 10-van business needs, at a fraction of the price." },
  { name: "Samsara", seg: "Fleet (enterprise)", threat: "Low", pos: "The Connected Operations Cloud.",
    hq: "San Francisco, USA · NYSE: IOT", offer: "Telematics, AI dashcams, operations platform", price: "Enterprise, multi-year (verify)",
    str: ["AI video safety", "Platform, integrations", "Enterprise sales"], weak: ["Enterprise pricing", "US-centric", "Complex for SMB"],
    win: ["SMB price, simplicity", "EU, GDPR", "Self-serve"], lose: ["Anything enterprise"],
    track: "Not our fight. Walk away above ~200 vehicles." },
  { name: "Vimcar", seg: "Fleet (DACH SMB)", threat: "High", pos: "Fleet management and tax-proof logbook for SMBs.",
    hq: "Berlin, Germany", offer: "OBD dongle, digital logbook, fleet software", price: "Per vehicle / month (verify)",
    str: ["Tax-office-proof logbook", "DACH SMB focus", "Accounting fit"], weak: ["Vehicles only", "No battery / equipment trackers", "No consumer range"],
    win: ["Trailers, machines, equipment", "Theft use case", "Price"], lose: ["Tax logbook depth", "Accounting integrations"],
    track: "Track everything you own, not just the cars." },
];

export const COMPETITOR_SUMMARY = [
  "Specialists own each segment: Tractive (pets), Hausnotruf (seniors), Webfleet / Vimcar (fleet).",
  "AirTag sets the price anchor: €35, no subscription, but not live.",
  "PAJ is the only player across pets, people and vehicles in one app.",
  "Play: live 4G at a fair price; win on breadth to grow devices per customer.",
];

export const BATTLE_CARD = {
  product: "PET Finder 4G", versus: "Tractive · AirTag",
  pitch: "Live 4G tracking for your dog, at a fair price, in one app for the whole family.",
  why: [["Live, anywhere.", "4G, not Bluetooth."], ["Fair price.", "Below Tractive per month."], ["One app.", "Dog, parents, car, van."], ["German.", "GDPR, local support."]],
  landmines: ["What if your dog runs where no iPhone is?", "What will it cost you over 2 years?", "Who else in your family needs tracking?"],
  facts: {
    cols: ["PAJ PET", "Tractive", "AirTag"],
    rows: [
      ["Live 4G tracking", "Yes", "Yes", "No"], ["Monthly cost", "~€4–5", "~€5–13", "€0"], ["Device price", "~€40–50", "~€50", "~€35"],
      ["Battery", "up to 5 days", "2–7 days", "~1 year"], ["Waterproof", "Yes", "IPX7", "IP67"], ["Geofence alert", "Yes", "Yes", "No"],
      ["Health / activity", "Basic", "Yes", "No"], ["Pets + people + vehicles", "Yes", "Pets only", "Items"],
    ],
  },
  objections: [["Tractive is the known brand", "Same live tracking, lower monthly cost."], ["I want health stats", "We focus on finding your dog. Fast."], ["AirTag is cheaper", "Until your dog is in a field with no phones."], ["Battery too short", "Up to 5 days + low-battery alert."]],
  dont: ["Attack Tractive health features", "Promise exact battery days", "Sell to owners of dogs < 4 kg"],
};

export type MapDef = {
  icp: string; title: string; x: VarKey; y: VarKey; players: string[];
  quads: [string, string, string, string]; why: [string, string]; take: string[]; act: string;
};

export const MAPS: MapDef[] = [
  { icp: "ICP 1 · Pets", title: "Live tracking at a fair price", x: "afford", y: "live",
    players: ["PAJ", "Tractive", "Weenect", "Apple AirTag", "Invoxia"], quads: ["Value live", "Premium live", "Weak", "Cheap, blind"],
    why: ["#1 Live location, any distance", "#5 Monthly cost"],
    take: ["PAJ owns \"value live\" alone.", "Tractive: more live, pricier.", "AirTag: cheapest, but blind away from phones."],
    act: "Lead with live + fair price. Landmine: \"no iPhone nearby?\"" },
  { icp: "ICP 2 · Seniors", title: "Safety without complexity", x: "ease", y: "safety",
    players: ["PAJ", "Hausnotruf", "Weenect", "Apple AirTag"], quads: ["Safe and simple", "Safe, complex", "Weak", "Simple, unsafe"],
    why: ["#1 Will wear it · #3 Zero setup", "#2 One-press SOS · #4 Geofence"],
    take: ["Hausnotruf leads, but only at home.", "PAJ strong on safety; ease is the gap.", "AirTag is not a safety device."],
    act: "Simplify onboarding. Sell as Hausnotruf's outdoor complement." },
  { icp: "ICP 3 · Fleet", title: "Easy start, enough depth", x: "plug", y: "depth",
    players: ["PAJ", "Webfleet", "Samsara", "Vimcar", "Invoxia", "Apple AirTag"], quads: ["Easy and deep", "Deep, heavy", "Weak", "Easy, shallow"],
    why: ["#2 Plug & play install", "#5 Route history, logbook"],
    take: ["PAJ: easiest real fleet option.", "Webfleet / Samsara: deep, heavy, costly.", "Vimcar is the real fight."],
    act: "Add logbook depth. Target 3–50 vehicles, mixed assets." },
  { icp: "All ICPs · Goal 2", title: "One account, every tracker", x: "breadth", y: "flex",
    players: ["PAJ", "Tractive", "Weenect", "Apple AirTag", "Invoxia", "Hausnotruf", "Webfleet", "Samsara", "Vimcar"],
    quads: ["Platform", "Flexible niche", "Locked niche", "Broad, locked"],
    why: ["Goal 2: devices per customer", "Goal 2: renewals, churn"],
    take: ["PAJ: broadest live range, no lock-in.", "Only AirTag rivals it, and it isn't live.", "Fleet rivals lock in; pet rivals stay narrow."],
    act: "Multi-device bundles. One login, one bill." },
];

export const POSITIONING_SUMMARY = [
  ["Pets", "only live tracker at a fair price."],
  ["Seniors", "safety leader outside the home; simplify."],
  ["Fleet", "easiest start; deepen logbook vs Vimcar."],
  ["Across ICPs", "broadest range, no lock-in. Our moat for goal 2."],
  ["Positioning", "one app, every tracker, honest price."],
];

export type House = {
  icp: string; who: string; product: string; roof: string;
  pillars: { t: string; m: string; p: string[] }[]; vs: [string, string][];
};

export const FOUNDATION = ["Reliable", "Simple", "Caring", "German, GDPR-safe"];

export const HOUSES: House[] = [
  { icp: "ICP 1 · Pets", who: "The protective dog owner", product: "PET Finder 4G", roof: "Find your dog in minutes, not hours.",
    pillars: [
      { t: "Live, anywhere", m: "4G live location, wherever your dog runs.", p: ["4G + GPS, live in FINDER app", "No phones nearby needed"] },
      { t: "Escape alert", m: "Know the moment they leave the garden.", p: ["Geofence alarm", "Push + email alerts", "Route history"] },
      { t: "Built for outdoors", m: "Light, waterproof, ready for every walk.", p: ["Waterproof (manufacturer)", "Up to 5 days battery"] },
    ],
    vs: [["Tractive", "Same live tracking, lower price."], ["AirTag", "Live, not \"last seen nearby\"."]] },
  { icp: "ICP 2 · Seniors", who: "The caring adult child", product: "EASY Finder 4G", roof: "Their independence. Your peace of mind.",
    pillars: [
      { t: "Help in one press", m: "One button. You're alerted at once.", p: ["SOS button", "Alert + live location to family"] },
      { t: "Wandering alert", m: "Know if they leave safe areas.", p: ["Geofence alarm", "Live map, history"] },
      { t: "Nothing to learn", m: "Small, wearable, no smartphone needed.", p: ["Pocket / keyring size", "~7 days battery, IP65 (retailer)"] },
    ],
    vs: [["Hausnotruf", "Works outside the home too."], ["Weenect", "One app for parent, pet and car."]] },
  { icp: "ICP 3 · Fleet", who: "The hands-on fleet owner", product: "POWER / VEHICLE Finder 4G", roof: "Every vehicle, every machine, in view.",
    pillars: [
      { t: "Stop theft", m: "Instant alarm. Live recovery.", p: ["Movement + vibration alarms", "Live 4G tracking", "Magnetic, hidden install"] },
      { t: "Run the fleet", m: "Routes and trips in one portal.", p: ["Route history up to 100 days", "All devices in one FINDER portal"] },
      { t: "No lock-in", m: "Start with three. Install in minutes.", p: ["No long contract (verify)", "Magnetic or 12V, no installer"] },
    ],
    vs: [["Webfleet", "Fraction of the price, no lock-in."], ["Vimcar", "Tracks trailers and machines too."]] },
];

export const PDFS = [
  { file: "/pdfs/PAJ_icp.pdf", title: "ICPs", desc: "One page per ICP" },
  { file: "/pdfs/PAJ_competitors.pdf", title: "Competitors", desc: "Summary, 8 rivals, battle card" },
  { file: "/pdfs/PAJ_positioning.pdf", title: "Positioning", desc: "4 perceptual maps" },
  { file: "/pdfs/PAJ_messaging.pdf", title: "Messaging houses", desc: "One house per ICP" },
  { file: "/pdfs/PAJ_sales-allround.pdf", title: "ALLROUND Finder", desc: "Sales brochure · 3 pages" },
];
```

## Message 3

Create `src/components/PerceptualMap.tsx` with exactly this content:

```tsx
import { useMemo, useState } from "react";
import { BRAND, SCORES, VARS, type VarKey } from "@/data/paj";

type Props = {
  players: string[];
  x: VarKey;
  y: VarKey;
  quads?: [string, string, string, string];
  compact?: boolean;
};

type Box = { x0: number; y0: number; x1: number; y1: number };
const hit = (a: Box, b: Box) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;

// Perceptual map on a 0–10 grid, quadrants split at 5. Upper-right = better for the customer.
export default function PerceptualMap({ players, x, y, quads, compact = false }: Props) {
  const [hover, setHover] = useState<string | null>(null);
  const size = compact ? 320 : 600;
  const pad = compact ? { l: 26, r: 14, t: 14, b: 26 } : { l: 44, r: 24, t: 24, b: 44 };
  const iw = size - pad.l - pad.r;
  const ih = size - pad.t - pad.b;
  const sx = (v: number) => pad.l + (v / 10) * iw;
  const sy = (v: number) => pad.t + ih - (v / 10) * ih;
  const fs = compact ? 11 : 14;
  const rOther = compact ? 5 : 7;
  const rUs = compact ? 7 : 10;

  const pts = useMemo(() => {
    const base = players.map((n) => ({
      n, us: n === "PAJ", label: n === "PAJ" ? "PAJ GPS" : n,
      cx: sx(SCORES[n][x] ?? 0), cy: sy(SCORES[n][y] ?? 0),
      tx: 0, ty: 0, a: "start" as "start" | "end" | "middle",
    }));
    // Place each label at the first candidate spot that clears dots and earlier labels.
    const boxes: Box[] = base.map((p) => ({ x0: p.cx - rUs, y0: p.cy - rUs, x1: p.cx + rUs, y1: p.cy + rUs }));
    for (const p of base) {
      const w = p.label.length * fs * (p.us ? 0.64 : 0.58);
      const h = fs;
      const g = (p.us ? rUs : rOther) + 4;
      const cands: [number, number, "start" | "end" | "middle"][] = [
        [p.cx + g, p.cy + h * 0.35, "start"], [p.cx - g, p.cy + h * 0.35, "end"],
        [p.cx, p.cy - g - 2, "middle"], [p.cx, p.cy + g + h, "middle"],
        [p.cx + g, p.cy - g, "start"], [p.cx - g, p.cy - g, "end"],
      ];
      let placed = false;
      for (const [tx, ty, a] of cands) {
        const x0 = a === "start" ? tx : a === "end" ? tx - w : tx - w / 2;
        const b = { x0, y0: ty - h, x1: x0 + w, y1: ty + 2 };
        if (b.x0 < pad.l || b.x1 > size - 2 || b.y0 < 2 || b.y1 > pad.t + ih) continue;
        if (boxes.some((o) => hit(o, b))) continue;
        boxes.push(b);
        Object.assign(p, { tx, ty, a });
        placed = true;
        break;
      }
      if (!placed) Object.assign(p, { tx: p.cx + g, ty: p.cy + h * 0.35, a: "start" });
    }
    return base;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players, x, y, compact]);

  const mx = sx(5);
  const my = sy(5);
  const q = { fontSize: 11, fontWeight: 700, letterSpacing: 1 };
  const ax = { fontSize: compact ? 10 : 12, fontWeight: 600 };
  const hovered = pts.find((p) => p.n === hover);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto" role="img"
        aria-label={`${VARS[x]} versus ${VARS[y]}`}>
        <rect x={mx} y={pad.t} width={pad.l + iw - mx} height={my - pad.t} fill={BRAND.orangeTint} />
        <rect x={pad.l} y={pad.t} width={iw} height={ih} fill="none" stroke="#e4e4e4" />
        <line x1={mx} y1={pad.t} x2={mx} y2={pad.t + ih} stroke="#cfcfcf" strokeDasharray="3 3" />
        <line x1={pad.l} y1={my} x2={pad.l + iw} y2={my} stroke="#cfcfcf" strokeDasharray="3 3" />
        {quads && !compact && (
          <g style={q}>
            <text x={pad.l + iw - 8} y={pad.t + 16} textAnchor="end" fill={BRAND.orange}>{quads[0].toUpperCase()}</text>
            <text x={pad.l + 8} y={pad.t + 16} fill="#8a8a8a">{quads[1].toUpperCase()}</text>
            <text x={pad.l + 8} y={pad.t + ih - 8} fill="#8a8a8a">{quads[2].toUpperCase()}</text>
            <text x={pad.l + iw - 8} y={pad.t + ih - 8} textAnchor="end" fill="#8a8a8a">{quads[3].toUpperCase()}</text>
          </g>
        )}
        <text x={pad.l + iw} y={size - (compact ? 8 : 14)} textAnchor="end" fill="#4a4a4a" style={ax}>{VARS[x]} →</text>
        <text x={pad.l} y={size - (compact ? 8 : 14)} fill="#8a8a8a" style={ax}>Low</text>
        <text transform={`translate(${compact ? 12 : 18},${pad.t}) rotate(-90)`} textAnchor="end" fill="#4a4a4a" style={ax}>{VARS[y]} →</text>
        <text transform={`translate(${compact ? 12 : 18},${pad.t + ih}) rotate(-90)`} fill="#8a8a8a" style={ax}>Low</text>
        {[...pts.filter((p) => !p.us), ...pts.filter((p) => p.us)].map((p) => (
          <g key={p.n} onMouseEnter={() => setHover(p.n)} onMouseLeave={() => setHover(null)} className="cursor-default">
            <circle cx={p.cx} cy={p.cy} r={16} fill="transparent" />
            <circle cx={p.cx} cy={p.cy} r={p.us ? rUs : rOther} fill={p.us ? BRAND.orange : "#4a4a4a"} stroke="#fff" strokeWidth={2} />
          </g>
        ))}
        {pts.map((p) => (
          <text key={p.n + "-l"} x={p.tx} y={p.ty} textAnchor={p.a} fontSize={fs} fontWeight={p.us ? 800 : 500} fill="#111" pointerEvents="none">
            {p.label}
          </text>
        ))}
      </svg>
      {hovered && (
        <div className="pointer-events-none absolute rounded-md bg-[#111] px-3 py-2 text-xs text-white shadow-lg"
          style={{ left: `${(hovered.cx / size) * 100}%`, top: `${(hovered.cy / size) * 100}%`, transform: "translate(-50%, calc(-100% - 14px))" }}>
          <div className="font-bold">{hovered.label}</div>
          <div>{VARS[x]}: {SCORES[hovered.n][x]}</div>
          <div>{VARS[y]}: {SCORES[hovered.n][y]}</div>
        </div>
      )}
    </div>
  );
}
```

## Message 4

Create `src/pages/Index.tsx` with exactly this content:

```tsx
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
```

## Message 5

Attach the 5 PDFs from `public/pdfs/`, then:

```
Put these PDFs in public/pdfs/ with the same file names. Don't change anything else.
```
