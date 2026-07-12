// Product catalog — 4 categories, 2 products each. Each product references an
// image "slot" key; the console lets an admin fill each slot from Supabase
// Storage. `slot` values must stay in sync with lib/slots.ts.

export type Product = {
  id: string;
  name: string;
  slot: string;
  blurb: string;
  features: string[];
};

export type Category = {
  id: string;
  name: string;
  kicker: string;
  intro: string;
  products: Product[];
};

export const catalog: Category[] = [
  {
    id: "mobility-chairs",
    name: "Wheelchairs",
    kicker: "Roll with ease",
    intro:
      "Everyday and transit chairs fitted for comfort over long stretches — not just for getting from A to B.",
    products: [
      {
        id: "transit-lite",
        name: "Alder Transit Lite",
        slot: "product-transit-lite",
        blurb:
          "A featherweight companion chair for outings and appointments, folded and lifted with one hand.",
        features: [
          "Aircraft-grade aluminum frame, 19 lb",
          "Folds to 11\" for boot storage",
          "Breathable back with lumbar taper",
          "Swing-away, elevating footrests",
        ],
      },
      {
        id: "meadow-day",
        name: "Meadow Daily Cruiser",
        slot: "product-meadow-day",
        blurb:
          "A self-propel chair built for the long haul, with quick-release wheels and a seat you can sit in all afternoon.",
        features: [
          "18\" contoured cushion seat",
          "Quick-release rear wheels",
          "Adjustable-height push handles",
          "Puncture-resistant treaded tires",
        ],
      },
    ],
  },
  {
    id: "mobility-aids",
    name: "Mobility Aids",
    kicker: "Steady footing",
    intro:
      "Walkers, rollators, and canes that give back confidence on the stairs, the sidewalk, and the kitchen floor.",
    products: [
      {
        id: "harbor-rollator",
        name: "Harbor Four-Wheel Rollator",
        slot: "product-harbor-rollator",
        blurb:
          "A padded seat, loop brakes, and a roomy under-basket for the walk to the mailbox and back.",
        features: [
          "Locking loop hand brakes",
          "Padded flip-up seat with backrest",
          "8\" wheels for curbs and thresholds",
          "Removable canvas storage basket",
        ],
      },
      {
        id: "birch-cane",
        name: "Birch Offset Cane",
        slot: "product-birch-cane",
        blurb:
          "A weight-balanced offset cane with a soft-grip handle that stands on its own when you set it down.",
        features: [
          "Self-standing quad base option",
          "Cushioned ergonomic grip",
          "Height adjusts 30\"–39\"",
          "Non-slip all-weather tip",
        ],
      },
    ],
  },
  {
    id: "diabetic-care",
    name: "Diabetic Care",
    kicker: "Daily routines",
    intro:
      "The quiet, reliable supplies that make blood-sugar management one less thing to worry about.",
    products: [
      {
        id: "clearread-meter",
        name: "ClearRead Glucose Kit",
        slot: "product-clearread-meter",
        blurb:
          "A large-display meter with a lancing device, carry case, and results in five seconds.",
        features: [
          "5-second reading, no coding",
          "Backlit high-contrast display",
          "300-result memory with averages",
          "Includes case, lancets, and log",
        ],
      },
      {
        id: "cloud-socks",
        name: "Cloudstep Diabetic Socks",
        slot: "product-cloud-socks",
        blurb:
          "Seamless, non-binding socks that keep circulation easy and feet dry through a full day.",
        features: [
          "Seamless toe, non-binding top",
          "Moisture-wicking bamboo blend",
          "Cushioned sole, light compression",
          "Three-pair value pack",
        ],
      },
    ],
  },
  {
    id: "orthopedic-braces",
    name: "Orthopedic Braces",
    kicker: "Gentle support",
    intro:
      "Braces and supports fitted to the joint, so recovery and daily wear both feel like relief.",
    products: [
      {
        id: "ridge-knee",
        name: "Ridgeline Knee Stabilizer",
        slot: "product-ridge-knee",
        blurb:
          "Dual side hinges and adjustable straps that hold the knee true without pinching behind it.",
        features: [
          "Dual aluminum side hinges",
          "Four adjustable tension straps",
          "Open patella for pressure relief",
          "Breathable perforated neoprene",
        ],
      },
      {
        id: "willow-wrist",
        name: "Willow Wrist Brace",
        slot: "product-willow-wrist",
        blurb:
          "A low-profile brace with a removable splint for typing, sleeping, and everything between.",
        features: [
          "Removable contoured splint",
          "Left/right and ambidextrous fit",
          "Soft-loop fastening, no pinch",
          "Machine-washable liner",
        ],
      },
    ],
  },
];

export const categoryList = catalog.map((c) => ({ id: c.id, name: c.name }));
