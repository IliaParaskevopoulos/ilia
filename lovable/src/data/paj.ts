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
