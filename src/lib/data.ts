// Mock data for the Shika Estates real estate platform.

export const COMPANY = {
  name: "Shika Estates",
  tagline: "Premium Residential Plots & House Plans",
  phone: "+91 9177686822",
  phoneHref: "+919177686822",
  whatsapp: "919177686822",
  email: "contactus@shikas.online",
  address: "Pasumamla, Telangana",
  hours: "Mon–Sat: 9 AM – 6 PM · Sunday: 10 AM – 4 PM",
};

export type Plot = {
  id: string;
  name: string;
  location: string;
  size: number;
  price: number;
  status: "Available" | "Reserved" | "Sold";
  image: string;
  amenities: string[];
  description: string;
  additionalImages?: string[];
};

export const PLOTS: Plot[] = [
  {
    id: "plot_001",
    name: "Cedar Crest — Plot A",
    location: "Banjara Hills",
    size: 2400,
    price: 4800000,
    status: "Available",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Corner Plot", "East Facing", "Near International School"],
    description: "Premier corner plot with unobstructed sunrise views and gated community access.",
    additionalImages: ["/images/HousePlan_G2P_V03.png"]
  },
  {
    id: "plot_002",
    name: "Magnolia Heights — Plot 7",
    location: "Gachibowli",
    size: 3200,
    price: 7200000,
    status: "Available",
    image: "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Park Facing", "30ft Road", "Underground Utilities"],
    description: "Elevated parcel with mature landscaping and panoramic ridge-line views.",
  },
  {
    id: "plot_003",
    name: "Riverstone — Plot 12",
    location: "Madhapur",
    size: 1800,
    price: 3600000,
    status: "Reserved",
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Riverside", "Clubhouse Access", "Solar Ready"],
    description: "Tranquil waterside plot within a walkable wellness-focused enclave.",
  },
  {
    id: "plot_004",
    name: "Aspen Reserve — Plot 21",
    location: "Jubilee Hills",
    size: 4000,
    price: 9000000,
    status: "Available",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Hilltop", "Private Driveway", "Vastu Compliant"],
    description: "Estate-grade hilltop parcel designed for a flagship private residence.",
  },
  {
    id: "plot_005",
    name: "Willow Court — Plot 4",
    location: "Secunderabad",
    size: 2100,
    price: 4200000,
    status: "Sold",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Gated", "Park Facing", "Designer Boundary"],
    description: "Sold — featured for portfolio reference of completed Willow Court phase.",
  },
  {
    id: "plot_006",
    name: "Olive Grove — Plot 9",
    location: "Kukatpally",
    size: 2600,
    price: 5200000,
    status: "Available",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Orchard Backed", "Quiet Lane", "Premium Frontage"],
    description: "Mature olive-flanked plot for a serene, low-density residence.",
  },
];

export type Plan = {
  id: string;
  name: string;
  category: "1BHK" | "2BHK" | "3BHK" | "Luxury";
  bedrooms: number;
  bathrooms: number;
  parking: number;
  area: number;
  price: number;
  image: string;
  features: string[];
  additionalImages?: string[];
};

export const PLANS: Plan[] = [
  {
    id: "plan_001",
    name: "Atelier One",
    category: "1BHK",
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    area: 720,
    price: 4200000,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    features: ["Open Kitchen", "Skylit Bath", "Private Balcony"],
  },
  {
    id: "plan_002",
    name: "Linden Two",
    category: "2BHK",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    area: 1080,
    price: 6800000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    features: ["Modular Kitchen", "Walk-in Wardrobe", "North-Light Study"],
  },
  {
    id: "plan_003",
    name: "Solace Three",
    category: "3BHK",
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    area: 1620,
    price: 9800000,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    features: ["Double-Height Living", "Pooja Room", "Servant Quarters"],
  },
  {
    id: "plan_004",
    name: "Heritage Villa",
    category: "Luxury",
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    area: 3200,
    price: 24500000,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    features: ["Private Pool", "Home Theatre", "Landscaped Courtyard"],
  },
  {
    id: "plan_005",
    name: "Sienna Two",
    category: "2BHK",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    area: 1180,
    price: 7400000,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    features: ["Sun-Deck", "Terrazzo Floors", "Smart Lighting"],
  },
  {
    id: "plan_006",
    name: "Cypress Three",
    category: "3BHK",
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    area: 1840,
    price: 11200000,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    features: ["Family Lounge", "Chef's Kitchen", "Reading Nook"],
  },
];

export type Project = {
  id: string;
  name: string;
  location: string;
  status: "Ongoing" | "Completed";
  progress: number;
  completion: string;
  units: number;
  image: string;
  amenities: string[];
  description: string;
  stages?: { name: string; pct: number; status: string }[];
};

export const PROJECTS: Project[] = [
  {
    id: "p_001",
    name: "Greenwood Residency",
    location: "Jubilee Hills, Hyderabad",
    status: "Ongoing",
    progress: 62,
    completion: "Expected Mar 2027",
    units: 84,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Infinity Pool", "Sky Lounge", "EV Charging"],
    description: "A 12-storey low-density residential tower with private sky gardens.",
    stages: [
      { name: "Foundation", pct: 100, status: "Completed" },
      { name: "Structural", pct: 70, status: "In Progress" },
      { name: "Finishing", pct: 12, status: "Planned" },
    ],
  },
  {
    id: "p_002",
    name: "Aurelia Hill Villas",
    location: "Jubilee Hills",
    status: "Ongoing",
    progress: 38,
    completion: "Expected Q4 2027",
    units: 24,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Private Plunge Pools", "Clubhouse", "Forest Trails"],
    description: "Twenty-four limited-edition hill villas surrounded by reserved forest.",
    stages: [
      { name: "Foundation", pct: 100, status: "Completed" },
      { name: "Structural", pct: 40, status: "In Progress" },
      { name: "Finishing", pct: 0, status: "Planned" },
    ],
  },
  {
    id: "p_003",
    name: "Linden Court",
    location: "Hitech City",
    status: "Ongoing",
    progress: 85,
    completion: "Expected Aug 2026",
    units: 56,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Co-working Lounge", "Yoga Deck", "Kids' Atelier"],
    description: "Boutique apartments designed around a central botanical courtyard.",
    stages: [
      { name: "Foundation", pct: 100, status: "Completed" },
      { name: "Structural", pct: 100, status: "Completed" },
      { name: "Finishing", pct: 55, status: "In Progress" },
    ],
  },
  {
    id: "p_004",
    name: "Magnolia Park",
    location: "Kukatpally",
    status: "Completed",
    progress: 100,
    completion: "Handover 2024",
    units: 120,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Lap Pool", "Indoor Sports", "Community Theatre"],
    description: "A flagship community of 120 residences with award-winning landscaping.",
  },
  {
    id: "p_005",
    name: "Riverstone Enclave",
    location: "Kondapur",
    status: "Completed",
    progress: 100,
    completion: "Handover 2022",
    units: 48,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Riverside Walk", "Yoga Pavilion", "Organic Garden"],
    description: "Forty-eight waterside homes built on a regenerative landscape charter.",
  },
  {
    id: "p_006",
    name: "Cedar Crest Phase I",
    location: "Banjara Hills",
    status: "Completed",
    progress: 100,
    completion: "Handover 2021",
    units: 72,
    image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Gated Boulevard", "Clubhouse", "Tennis Court"],
    description: "The original Cedar Crest masterplan, fully sold and 100% handed over.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Ananya Rao",
    title: "Resident, Magnolia Park",
    rating: 5,
    quote: "The attention to detail is extraordinary — from the gold-leaf signage to the timber finishings, every choice feels considered.",
  },
  {
    name: "Vikram Shetty",
    title: "Investor, Greenwood Residency",
    rating: 5,
    quote: "Shika Estates is the rare developer that ships on time without compromising the architectural intent. Best decision we've made.",
  },
  {
    name: "Priya & Rohan",
    title: "Owners, Aurelia Hill Villas",
    rating: 5,
    quote: "We were treated like custodians of a future home, not buyers. The team made the entire process feel effortless.",
  },
];

export const GALLERY = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", tag: "Interiors" },
  { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", tag: "Projects" },
  { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80", tag: "Plots" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80", tag: "Interiors" },
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", tag: "Projects" },
  { src: "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1200&q=80", tag: "Plots" },
  { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80", tag: "Interiors" },
  { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80", tag: "Construction" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80", tag: "Interiors" },
  { src: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80", tag: "Plots" },
  { src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80", tag: "Projects" },
  { src: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80", tag: "Plots" },
] as const;

export const formatINR = (n: number) =>
  n >= 10000000
    ? `₹${(n / 10000000).toFixed(2)} Cr`
    : `₹${(n / 100000).toFixed(2)} L`;
