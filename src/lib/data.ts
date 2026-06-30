// Realistic data for Shikas Estates platform in Hyderabad (Pasumamla / Abdullapurmet).

export const COMPANY = {
  name: "Shikas Estates",
  tagline: "HMDA & DTCP Approved Premium Residential Plots",
  phone: "+91 9177686822",
  phoneHref: "+919177686822",
  whatsapp: "919177686822",
  email: "contactus@shikas.online",
  address: "Pasumamla, Abdullapurmet Mandal, Ranga Reddy District, Telangana 501505",
  hours: "Mon–Sat: 9 AM – 6 PM · Sunday: 10 AM – 4 PM",
};

export type Plot = {
  id: string;
  name: string;
  location: string;
  size: number; // sqft
  price: number;
  status: "Available" | "Reserved" | "Sold";
  image: string;
  amenities: string[];
  description: string;
  additionalImages?: string[];
  sqYds: number;
  facing: "East" | "West" | "North" | "South" | "North-East" | "North-West" | "South-East" | "South-West";
  hmdaApproved: boolean;
  dtcpApproved: boolean;
  reraNo?: string;
  lpNo?: string;
};

export const PLOTS: Plot[] = [
  {
    id: "plot_001",
    name: "Green Meadows — Plot 24",
    location: "Pasumamla",
    size: 2400,
    sqYds: 267,
    price: 6675000, // ~25,000 per Sq. Yd
    status: "Available",
    facing: "East",
    hmdaApproved: true,
    dtcpApproved: false,
    lpNo: "000142/LO/HMDA/2025",
    reraNo: "P02400008542",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Corner Plot", "East Facing (100% Vastu)", "Near Vijayawada Highway"],
    description: "Premium corner plot with clear title in a fully gated layout at Pasumamla. Ready for immediate registration and house construction.",
    additionalImages: ["/images/HousePlan_G2P_V03.png"]
  },
  {
    id: "plot_002",
    name: "Royal Boulevard — Plot 12",
    location: "Abdullapurmet",
    size: 2700,
    sqYds: 300,
    price: 8400000, // ~28,000 per Sq. Yd
    status: "Available",
    facing: "West",
    hmdaApproved: true,
    dtcpApproved: false,
    lpNo: "000318/LO/HMDA/2025",
    reraNo: "P02400009102",
    image: "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1200&q=80",
    amenities: ["40ft Wide BT Road", "Park Facing", "Underground Utilities"],
    description: "East-facing layout plots at Abdullapurmet with premium underground drainage, electricity, overhead water tank, and children's park.",
  },
  {
    id: "plot_003",
    name: "Golden Sands — Plot 45",
    location: "Hayathnagar",
    size: 1800,
    sqYds: 200,
    price: 6400000, // ~32,000 per Sq. Yd
    status: "Reserved",
    facing: "North-East",
    hmdaApproved: true,
    dtcpApproved: false,
    lpNo: "000512/LO/HMDA/2024",
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",
    amenities: ["North-East Facing", "Vastu Compliant", "Fully Secured Compound"],
    description: "Perfect North-East facing residential site, located in a fast-developing neighborhood of Hayathnagar, just minutes from the Outer Ring Road.",
  },
  {
    id: "plot_004",
    name: "Grand Vista — Plot 88",
    location: "Bongloor (ORR exit 12)",
    size: 3600,
    sqYds: 400,
    price: 14000000, // ~35,000 per Sq. Yd
    status: "Available",
    facing: "East",
    hmdaApproved: true,
    dtcpApproved: false,
    lpNo: "000219/LO/HMDA/2025",
    reraNo: "P02400007812",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80",
    amenities: ["30ft Road", "Avenue Plantation", "100% Vastu"],
    description: "Premium large residential parcel inside a massive township at Bongloor, highly suitable for a luxury villa close to TCS Adibatla.",
  },
  {
    id: "plot_005",
    name: "Signature Park — Plot 15",
    location: "Pedda Amberpet",
    size: 2160,
    sqYds: 240,
    price: 6000000, // ~25,000 per Sq. Yd
    status: "Sold",
    facing: "North",
    hmdaApproved: false,
    dtcpApproved: true,
    lpNo: "000045/LO/DTCP/2024",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    amenities: ["DTCP Approved Layout", "Main Road Frontage", "Ready to Construct"],
    description: "Sold out — presented for reference of our successfully completed gated community layout at Pedda Amberpet.",
  },
  {
    id: "plot_006",
    name: "Aero Enclave — Plot 9",
    location: "Adibatla (Aerospace Zone)",
    size: 2250,
    sqYds: 250,
    price: 8750000, // ~35,000 per Sq. Yd
    status: "Available",
    facing: "South",
    hmdaApproved: true,
    dtcpApproved: false,
    lpNo: "000452/LO/HMDA/2025",
    reraNo: "P02400009945",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Gated Venture", "Underground Drainage", "Near TCS Adibatla"],
    description: "Premium high-value plot inside a gated layout near Adibatla Aerospace SEZ. Best choice for IT professionals and high-yield investors.",
  },
];

export type Plan = {
  id: string;
  name: string;
  category: "1BHK" | "2BHK" | "3BHK" | "Luxury";
  bedrooms: number;
  bathrooms: number;
  parking: number;
  area: number; // sqft
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
    features: ["Open Kitchen", "Skylit Bath", "East Facing Vastu"],
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
    features: ["Modular Kitchen", "Walk-in Wardrobe", "100% Vastu Layout"],
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
    features: ["Double-Height Living", "Pooja Room", "Separate Servant Quarters"],
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
    features: ["Private Swimming Pool", "Home Theatre Room", "Traditional Central Courtyard"],
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
    features: ["Sun-Deck Balcony", "Pooja Room", "Smart Automated Lighting"],
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
    features: ["Spacious Family Lounge", "Chef's Kitchen", "100% Vastu Compliant"],
  },
];

export type House = {
  id: string;
  name: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  area: number; // sqft
  sqYds: number; // Plot size in Sq Yds
  price: number;
  facing: "East" | "West" | "North" | "South" | "North-East" | "North-West" | "South-East" | "South-West";
  status: "Ready to Move" | "Under Construction" | "Sold";
  image: string;
  description: string;
  amenities: string[];
  additionalImages?: string[];
  reraNo?: string;
};

export const HOUSES: House[] = [
  {
    id: "house_001",
    name: "Shikas Celestial Villa",
    location: "Hayathnagar",
    bedrooms: 4,
    bathrooms: 5,
    parking: 2,
    area: 3500,
    sqYds: 250,
    price: 18500000,
    facing: "West",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    description: "A breathtaking contemporary villa nestled in a premium gated community at Hayathnagar. Boasts 100% Vastu compliance, a modern double-height living room, custom Italian marble flooring, and top-tier smart automation.",
    amenities: ["Double Height Ceiling", "Private Lawn", "Home Automation", "Vastu Compliant"],
    reraNo: "P02400009102"
  },
  {
    id: "house_002",
    name: "The Oakwood Residence",
    location: "Pasumamla",
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    area: 2600,
    sqYds: 220,
    price: 14500000,
    facing: "East",
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Elegant East-facing 3BHK villa with an expansive terrace garden and modular kitchen. Currently under construction in the peaceful Green Meadows layout of Pasumamla.",
    amenities: ["Modular Kitchen", "Terrace Garden", "East Facing Vastu", "40ft Road Access"]
  },
  {
    id: "house_003",
    name: "Aero Edge Signature Villa",
    location: "Adibatla (Aerospace Zone)",
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    area: 3800,
    sqYds: 300,
    price: 21000000,
    facing: "North-East",
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    description: "Ultra-luxury modern villa near TCS Adibatla, designed for executive living. Features a private home theatre, lift provision, and premium fittings throughout.",
    amenities: ["Home Theatre", "Private Lift Provision", "North-East Corner", "Solar Water Heating"]
  },
  {
    id: "house_004",
    name: "Grand Vista Villa",
    location: "Bongloor (ORR exit 12)",
    bedrooms: 3,
    bathrooms: 4,
    parking: 2,
    area: 3000,
    sqYds: 267,
    price: 17500000,
    facing: "East",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    description: "Ready-to-occupy luxury villa just minutes from Bongloor ORR Exit 12. Ideal location for commuters to the Adibatla IT/Aerospace hub and Central Hyderabad.",
    amenities: ["Clubhouse Access", "24/7 Security Patrol", "Underground Cabling", "Pooja Room"]
  },
  {
    id: "house_005",
    name: "The Orchard Villa",
    location: "Abdullapurmet",
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    area: 2400,
    sqYds: 200,
    price: 13500000,
    facing: "North",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    description: "Beautifully designed independent villa in Abdullapurmet. Surrounded by private fruit trees, features modern wardrobes, high-end sanitaries, and excellent cross-ventilation.",
    amenities: ["Orchard Surroundings", "Wardrobes Installed", "Gated Security", "Overhead Water Tank"]
  }
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
    name: "Green Meadows Township",
    location: "Pasumamla, Hyderabad",
    status: "Ongoing",
    progress: 62,
    completion: "Expected Mar 2027",
    units: 84,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    amenities: ["40ft Gated Main Entrance", "Underground Electrical Cabling", "Rainwater Harvesting"],
    description: "Premium gated plot development at Pasumamla with 100% underground amenities, avenue plantations and grand entry gate.",
    stages: [
      { name: "Land Leveling & Clearing", pct: 100, status: "Completed" },
      { name: "BT Road & Drainage Laying", pct: 75, status: "In Progress" },
      { name: "Electricity & Plantation Setup", pct: 15, status: "Planned" },
    ],
  },
  {
    id: "p_002",
    name: "Aero Enclave Phase I",
    location: "Adibatla, Hyderabad",
    status: "Ongoing",
    progress: 38,
    completion: "Expected Q4 2027",
    units: 24,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Children's Play Area", "Overhead Water Tank", "24/7 Security Patrol"],
    description: "HMDA layout near TCS Adibatla offering custom residential sites for immediate house construction.",
    stages: [
      { name: "HMDA Permissions & LP Sanction", pct: 100, status: "Completed" },
      { name: "Roads & Compound Wall Layout", pct: 40, status: "In Progress" },
      { name: "Individual Tap Connections", pct: 0, status: "Planned" },
    ],
  },
  {
    id: "p_003",
    name: "Royal Vista Gated Layout",
    location: "Abdullapurmet, Hyderabad",
    status: "Ongoing",
    progress: 85,
    completion: "Expected Aug 2026",
    units: 56,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Gated Compound Wall", "Jogging Track", "Overhead Water Tank"],
    description: "Boutique HMDA plots venture centered around a green park, located near Abdullapurmet junction.",
    stages: [
      { name: "HMDA Approvals", pct: 100, status: "Completed" },
      { name: "BT Roads Construction", pct: 100, status: "Completed" },
      { name: "Final Layout Certification", pct: 55, status: "In Progress" },
    ],
  },
  {
    id: "p_004",
    name: "Golden Sands Avenue",
    location: "Hayathnagar, Hyderabad",
    status: "Completed",
    progress: 100,
    completion: "Handover 2024",
    units: 120,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Overhead Water Reservoir", "Children's Park", "Sewerage Treatment Plant"],
    description: "Fully completed and registered HMDA layouts at Hayathnagar, with 60+ houses currently constructed.",
  },
  {
    id: "p_005",
    name: "Signature Park Layout",
    location: "Pedda Amberpet, Hyderabad",
    status: "Completed",
    progress: 100,
    completion: "Handover 2022",
    units: 48,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Beautiful Entrance Arch", "24/7 Security Staff", "Eco-friendly Parks"],
    description: "DTCP approved layout at Pedda Amberpet, completely sold out and handed over to buyers.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Ananya Rao",
    title: "Resident, Golden Sands",
    rating: 5,
    quote: "The layout quality is exceptional. From RERA clearance to final registration, Shikas Estates handled everything transparently.",
  },
  {
    name: "K. Venkat Reddy",
    title: "Plot Owner, Pasumamla",
    rating: 5,
    quote: "Shikas Estates builds with absolute clear titles. Getting bank loans was simple because all HMDA layouts are pre-approved.",
  },
  {
    name: "Priya & Rohan",
    title: "Owners, Greenwood Residency",
    rating: 5,
    quote: "Best real estate venture along the Vijayawada highway corridor. Trustable services and complete value for money.",
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
