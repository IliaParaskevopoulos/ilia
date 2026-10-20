// Shared scores (0–10, higher = better for the customer). Directional estimates — verify.
// Variables are the ICP buying criteria; used by positioning maps and competitor head-to-heads.
const VARS = {
  afford:  'Affordability',
  live:    'Live tracking',
  ease:    'Ease of use',
  safety:  'Safety features',
  plug:    'Plug & play',
  depth:   'Fleet depth',
  breadth: 'Portfolio breadth',
  flex:    'Contract flexibility',
};
const SCORES = {
  'PAJ':          { afford: 7.5, live: 8,   ease: 6,   safety: 8,   plug: 9,   depth: 5,   breadth: 9, flex: 8.5 },
  'Tractive':     { afford: 5,   live: 9,   ease: 8,   safety: 6,                            breadth: 3, flex: 7 },
  'Weenect':      { afford: 5.5, live: 8,   ease: 7,   safety: 6.5,                          breadth: 6, flex: 7 },
  'Apple AirTag': { afford: 9.5, live: 2,   ease: 9,   safety: 1.5, plug: 9.5, depth: 1,   breadth: 7, flex: 9.5 },
  'Invoxia':      { afford: 4.5, live: 5,   ease: 6.5, safety: 4,   plug: 8,   depth: 3,   breadth: 6.5, flex: 6 },
  'Hausnotruf':   { afford: 3,   live: 3,   ease: 8.5, safety: 9,                            breadth: 2, flex: 6 },
  'Webfleet':     { afford: 2,   live: 9,   ease: 4,   safety: 7,   plug: 3,   depth: 9.5, breadth: 3, flex: 2 },
  'Samsara':      { afford: 1,   live: 9.5, ease: 4,   safety: 8,   plug: 3.5, depth: 10,  breadth: 4, flex: 2 },
  'Vimcar':       { afford: 4.5, live: 7,   ease: 7,   safety: 4,   plug: 7,   depth: 7,   breadth: 2, flex: 5 },
};
