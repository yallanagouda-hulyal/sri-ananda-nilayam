import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Compass,
  Clock,
  Sparkles,
  Phone,
  Layers,
  Award,
  Users,
  Building2,
  Check,
  HardHat,
  FileCheck2,
} from 'lucide-react';
import SeoMeta from '../components/common/SeoMeta';
import { publicApi } from '../api/publicApi';
import { useSite } from '../context/SiteContext';

const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 2C6.516 2 2.029 6.488 2.029 12.004c0 1.954.566 3.778 1.545 5.323L2 22l4.821-1.536a9.943 9.943 0 0 0 5.21 1.455c5.516 0 10.003-4.488 10.003-10.004S17.547 2 12.031 2zm0 18.232a8.21 8.21 0 0 1-4.32-1.22l-.31-.184-2.86.912.923-2.787-.202-.32a8.196 8.196 0 0 1-1.263-4.364c0-4.542 3.697-8.239 8.239-8.239 4.542 0 8.239 3.697 8.239 8.239 0 4.542-3.697 8.239-8.239 8.239zm4.516-6.173c-.247-.124-1.464-.722-1.691-.805-.227-.082-.392-.124-.557.124-.165.247-.64 1.052-.784 1.217-.144.165-.288.186-.535.062-.247-.124-1.043-.385-1.986-1.226-.734-.655-1.23-1.464-1.374-1.711-.144-.247-.015-.38.109-.503.111-.111.247-.288.371-.433.124-.144.165-.247.247-.412.082-.165.041-.309-.021-.433-.062-.124-.557-1.34-.763-1.835-.2-.482-.404-.417-.557-.425l-.474-.008c-.165 0-.433.062-.66.309-.227.247-.866.845-.866 2.062s.887 2.392 1.01 2.557c.124.165 1.745 2.664 4.227 3.736.59.255 1.052.408 1.411.522.593.189 1.133.162 1.56.098.477-.071 1.464-.598 1.67-.175.206-.577.206-1.072.144-1.175-.062-.103-.227-.165-.474-.288z" />
  </svg>
);

// Comprehensive, Rich Curated Data for ALL 8 Services
const staticServiceDetails = {
  'architectural-design': {
    title: 'Architectural Design',
    heroEyebrow: 'VISIONARY MASTER PLANNING',
    heroSubtitle: 'Bespoke residential concepts, intelligent space planning, 100% Vastu compliance, and precision 3D architectural blueprints.',
    heroImage: '/images/about-hero-villa.jpg',
    heroHighlights: [
      { text: 'Custom Architectural Blueprints' },
      { text: '100% Vastu-Compliant Layouts' },
      { text: 'Photorealistic 3D Visualisation' },
    ],
    overviewEyebrow: 'OVERVIEW & SCOPE',
    overviewTitle: 'ARCHITECTURAL MASTERY CRAFTED FOR LIFE',
    overviewDesc: 'Our architectural practice synthesizes sculptural aesthetics, structural integrity, and functional micro-climatic responsiveness. We craft bespoke spaces that optimize daylight circulation, maximize livable square footage, and create an enduring sense of sanctuary for generations.',
    checklist: [
      'Tailored blueprints adhering precisely to your lifestyle & plot contours',
      'Calculated natural daylight, airflow optimization & scientific Vastu harmony',
      'Integrated structural engineering, electrical schematics & MEP layouts',
      'Municipal building plan sanctions, FAR compliance & statutory liaison',
    ],
    collage: {
      main: '/images/hero-villa.jpg',
      sub1: '/images/process-step-1.jpg',
      sub2: '/images/process-step-2.jpg',
    },
    consultationPoints: [
      'Response within 24 hours',
      'Preliminary plot feasibility & Vastu study',
      'Concept schematic & budget consultation',
    ],
    subServicesEyebrow: 'OUR ARCHITECTURAL EXPERTISE',
    subServicesTitle: 'Comprehensive Architectural Solutions',
    subServices: [
      {
        title: 'Custom Homes & Luxury Villas',
        desc: 'Bespoke multi-level private residences designed with timeless proportion and tailored luxury finishes.',
        image: '/images/project-villa.jpg',
      },
      {
        title: 'Intelligent Space Planning',
        desc: 'Optimized floor schematics eliminating dead corridors and maximizing airflow and daylight penetration.',
        image: '/images/process-step-1.jpg',
      },
      {
        title: 'Photorealistic 3D Visualisation',
        desc: 'Lifelike 3D exterior facades and interior lighting simulations prior to ground breaking.',
        image: '/images/process-step-2.jpg',
      },
      {
        title: 'Structural Framing & Analysis',
        desc: 'Engineered seismic-resistant RCC frames, heavy load calculations, and BIS code compliance.',
        image: '/images/construction-site.jpg',
      },
      {
        title: 'Sanction Blueprints & Municipal Liaison',
        desc: 'Comprehensive BBMP/BDA sanction drawings, floor area ratio (FAR) vetting, and clearances.',
        image: '/images/about-architecture.jpg',
      },
      {
        title: 'Turnkey Architectural Oversight',
        desc: 'Continuous on-site architectural audits and quality inspections from excavation to key handover.',
        image: '/images/about-villa-showcase.jpg',
      },
    ],
    processTitle: 'Our 4-Stage Architectural Protocol',
    processSteps: [
      {
        num: '01',
        stage: 'DISCOVER',
        subtitle: 'Lifestyle & Site Analysis',
        desc: 'Zoning review, solar path mapping, and deep family lifestyle aspiration evaluation.',
        image: '/images/process-step-1.jpg',
      },
      {
        num: '02',
        stage: 'DESIGN',
        subtitle: 'Concepts & 3D Walkthroughs',
        desc: 'Iterative floor schematics, material mood boards, and photorealistic 3D visual renders.',
        image: '/images/process-step-2.jpg',
      },
      {
        num: '03',
        stage: 'ENGINEER',
        subtitle: 'Working Drawings & Approvals',
        desc: 'Integrated structural, plumbing, electrical, and HVAC construction blueprints.',
        image: '/images/process-step-3.jpg',
      },
      {
        num: '04',
        stage: 'DELIVER',
        subtitle: 'Sanction Clearances & Handover',
        desc: 'Municipal sanction approvals, site orientation, and execution blueprint dossier.',
        image: '/images/process-step-4.jpg',
      },
    ],
    whyChoose: [
      {
        num: '01',
        title: 'Personalized Spatial Vision',
        desc: 'Designs mapped meticulously to your family living rituals and long-term generational growth.',
        icon: 'Compass',
      },
      {
        num: '02',
        title: 'Strict Vastu Harmony',
        desc: 'Scientific Vastu Shastra principles woven seamlessly into contemporary luxury design.',
        icon: 'ShieldCheck',
      },
      {
        num: '03',
        title: 'Zero Friction Approvals',
        desc: 'Comprehensive municipal sanction liaison and certified structural stability documentation.',
        icon: 'Award',
      },
      {
        num: '04',
        title: 'End-to-End Oversight',
        desc: 'Direct liaison between chartered architects, structural engineers, and master craftsmen.',
        icon: 'Sparkles',
      },
    ],
    galleryProjects: [
      { title: 'The Solarium Luxury Villa', category: 'Residential Architecture', img: '/images/project-villa.jpg', slug: 'solarium-luxury-villa' },
      { title: 'Aura Corporate Campus', category: 'Commercial Architecture', img: '/images/project-commercial.jpg', slug: 'aura-corporate-headquarters' },
      { title: 'Serene Haven Residence', category: 'Custom Villa Design', img: '/images/about-villa-showcase.jpg', slug: 'serene-haven-residence' },
      { title: 'Heritage Villa Remodeling', category: 'Restorative Architecture', img: '/images/hero-villa.jpg', slug: 'heritage-villa-restoration' },
    ],
    faqs: [
      {
        q: 'How long does the complete architectural design stage take?',
        a: 'Typically 4 to 8 weeks depending on plot complexity, client review cycles, and municipal sanction requirements.',
      },
      {
        q: 'Are all your architectural designs compliant with Vastu Shastra?',
        a: 'Yes. Our senior architects hold profound expertise in blending cardinal Vastu Shastra principles seamlessly with contemporary luxury design.',
      },
      {
        q: 'Can you assist with building plan sanctions from municipal authorities?',
        a: 'Absolutely. We prepare all sanction drawings, liaison blueprints, and structural stability certifications required by municipal corporations.',
      },
      {
        q: 'Do you provide structural and MEP drawings along with architectural plans?',
        a: 'Yes, our comprehensive package includes coordinated structural engineering, plumbing, electrical, and HVAC layout drawings.',
      },
    ],
    ctaEyebrow: "LET'S SHAPE YOUR ARCHITECTURAL VISION",
    ctaHeading: "READY TO DESIGN YOUR MASTERPIECE?",
    ctaDescription: "Discuss your dream project with our principal architects for tailored Vastu-compliant layouts, structural schematics, and photorealistic 3D elevations.",
    ctaButtonText: "Get Architectural Consultation",
  },

  'residential-construction': {
    title: 'Residential Construction',
    heroEyebrow: 'ENDURING CIVIL CRAFTSMANSHIP',
    heroSubtitle: 'Turnkey construction of custom luxury homes and multi-story villas built with certified Grade-A materials and uncompromising engineering rigor.',
    heroImage: '/images/home-hero-villa.jpg',
    heroHighlights: [
      { text: 'Primary Steel & UltraTech 53 Cement' },
      { text: 'Penalty-Backed Milestone SLAs' },
      { text: '10-Year Structural Stability Warranty' },
    ],
    overviewEyebrow: 'OVERVIEW & SCOPE',
    overviewTitle: 'HOMES ENGINEERED TO ENDURE FOR GENERATIONS',
    overviewDesc: 'We execute residential construction with senior civil engineers stationed permanently on-site. Utilizing primary steel brands, automated concrete slump testing, and automated curing schedules, we transform blueprints into unshakeable structural reality without cost creep.',
    checklist: [
      'Custom luxury villas, independent residences & duplex estates',
      'Automated concrete batching, primary TMT steel & chemical waterproofing',
      'Daily progress tracking, milestone photo dossiers & client video portal',
      'Comprehensive 10-year structural warranty & stamped certificates',
    ],
    collage: {
      main: '/images/ethos-mission.jpg',
      sub1: '/images/construction-site.jpg',
      sub2: '/images/project-villa.jpg',
    },
    consultationPoints: [
      'On-site soil & plot evaluation within 24 hours',
      'Transparent itemized Bill of Quantities (BOQ)',
      'Structural engineering & material consultation',
    ],
    subServicesEyebrow: 'OUR RESIDENTIAL SERVICES',
    subServicesTitle: 'Comprehensive Residential Construction Services',
    subServices: [
      {
        title: 'Luxury Villa Construction',
        desc: 'Multi-level bespoke residences built with heavy-duty structural RCC frames and premium finishes.',
        image: '/images/project-villa.jpg',
      },
      {
        title: 'Independent Family Homes',
        desc: 'End-to-end custom residences engineered around specific plot boundaries and family rituals.',
        image: '/images/about-villa-showcase.jpg',
      },
      {
        title: 'Gated Community Residences',
        desc: 'High-spec luxury homes designed to blend harmoniously within exclusive layouts.',
        image: '/images/hero-villa.jpg',
      },
      {
        title: 'Heavy RCC Structural Work',
        desc: 'Seismic-resistant column casting, beam reinforcement, and slump-tested concrete pours.',
        image: '/images/process-step-3.jpg',
      },
      {
        title: 'Turnkey Construction Contracts',
        desc: 'Comprehensive soil-to-handover building contracts with fixed milestones and zero price escalation.',
        image: '/images/ethos-mission.jpg',
      },
      {
        title: 'Floor Extensions & Additions',
        desc: 'Upward vertical additions, sun terrace lounges, and structural retrofitting.',
        image: '/images/service-renovation.jpg',
      },
    ],
    processTitle: 'How We Build Your Dream Home',
    processSteps: [
      {
        num: '01',
        stage: 'GROUNDWORK',
        subtitle: 'Soil Testing & Foundation',
        desc: 'Core borehole analysis, anti-termite treatment, and heavy-duty reinforced foundation casting.',
        image: '/images/process-step-1.jpg',
      },
      {
        num: '02',
        stage: 'STRUCTURE',
        subtitle: 'RCC Framing & Masonry',
        desc: 'Primary steel reinforcement, slump-tested concrete pouring, and high-density masonry walls.',
        image: '/images/process-step-2.jpg',
      },
      {
        num: '03',
        stage: 'SERVICES',
        subtitle: 'MEP Infrastructure & Plastering',
        desc: 'Concealed plumbing hold tests, fire-retardant wiring, and precision plastering.',
        image: '/images/process-step-3.jpg',
      },
      {
        num: '04',
        stage: 'HANDOVER',
        subtitle: '150-Point Snag Audit & Keys',
        desc: 'Comprehensive quality checklist, structural warranty certificate, and key handover ceremony.',
        image: '/images/process-step-4.jpg',
      },
    ],
    whyChoose: [
      {
        num: '01',
        title: 'Primary Materials Only',
        desc: 'Exclusively Tata Tiscon / JSW 550D TMT steel and UltraTech 53-grade certified cement.',
        icon: 'ShieldCheck',
      },
      {
        num: '02',
        title: 'On-Site Civil Engineers',
        desc: 'Full-time graduate civil engineers stationed on-site supervising every structural pour.',
        icon: 'Users',
      },
      {
        num: '03',
        title: 'Transparent Milestone BOQ',
        desc: '100% itemized Bill of Quantities with strictly zero hidden expenses or variation claims.',
        icon: 'Clock',
      },
      {
        num: '04',
        title: '10-Year Warranty',
        desc: 'Stamped structural stability warranty covering civil integrity, foundation, and RCC columns.',
        icon: 'Award',
      },
    ],
    galleryProjects: [
      { title: 'The Solarium Luxury Villa', category: 'Residential Turnkey', img: '/images/project-villa.jpg', slug: 'solarium-luxury-villa' },
      { title: 'Serene Haven Residence', category: 'Custom Villa Construction', img: '/images/construction-site.jpg', slug: 'serene-haven-residence' },
      { title: 'Skyline Twin Villas', category: 'Duplex Villas', img: '/images/about-villa-showcase.jpg', slug: 'solarium-luxury-villa' },
      { title: 'Heritage Villa Remodel', category: 'Structural Expansion', img: '/images/hero-villa.jpg', slug: 'heritage-villa-restoration' },
    ],
    faqs: [
      {
        q: 'What grade of materials do you use for residential construction?',
        a: 'We strictly mandate primary manufacturers: Tata Tiscon / JSW 550D TMT steel, UltraTech/ACC 53-grade cement, and top-tier plumbing and electrical brands.',
      },
      {
        q: 'How do you ensure milestones are delivered on time?',
        a: 'Every project is mapped on a CPM/PERT Gantt chart with penalty-backed milestone SLAs and designated full-time site engineers.',
      },
      {
        q: 'Do I get access to real-time progress on site?',
        a: 'Yes, homeowners receive live video feeds, weekly photo dossiers, and verified NABL laboratory cube test receipts via our client portal.',
      },
      {
        q: 'What structural warranty is provided after completion?',
        a: 'We issue an official 10-year structural stability certificate covering foundation, RCC columns, beams, and slabs.',
      },
    ],
    ctaEyebrow: "LET'S BUILD YOUR LUXURY VILLA",
    ctaHeading: "HAVE A RESIDENTIAL PROJECT IN MIND?",
    ctaDescription: "Partner with our master civil engineers for turnkey villa construction built with certified Grade-A materials and guaranteed milestone delivery.",
    ctaButtonText: "Plan Your Villa Build",
  },

  'commercial-construction': {
    title: 'Commercial Construction',
    heroEyebrow: 'COMMERCIAL INFRASTRUCTURE',
    heroSubtitle: 'Functional, modern and scalable construction for corporate offices, retail spaces, tech campuses and commercial showrooms.',
    heroImage: '/images/service-commercial.jpg',
    heroHighlights: [
      { text: 'Fast-Track Civil Execution' },
      { text: 'Full Fire NOC & NBC Compliance' },
      { text: 'Wide-Span Post-Tensioned Slabs' },
    ],
    overviewEyebrow: 'OVERVIEW & SCOPE',
    overviewTitle: 'HIGH-PERFORMANCE SPACES THAT ACCELERATE BUSINESS',
    overviewDesc: 'We build commercial assets engineered for operational efficiency, high human footfall, and future scalability. From post-tensioned wide-span floors to integrated fire suppression and energy-efficient building envelopes, we deliver commercial facilities that maximize business ROI.',
    checklist: [
      'Corporate headquarters, tech campuses & multi-tenant office towers',
      'High-traffic retail storefronts, showrooms & hospitality developments',
      'Centralized HVAC ducting, heavy electrical routing & high-speed elevators',
      'Complete statutory clearances, environmental permissions & occupancy certificates',
    ],
    collage: {
      main: '/images/project-commercial.jpg',
      sub1: '/images/service-commercial.jpg',
      sub2: '/images/about-architecture.jpg',
    },
    consultationPoints: [
      'Commercial feasibility & FAR calculation within 24 hours',
      'Fast-track CPM milestone schedule',
      'Fire NOC & statutory compliance review',
    ],
    subServicesEyebrow: 'OUR COMMERCIAL EXPERTISE',
    subServicesTitle: 'Our Commercial Construction Services',
    subServices: [
      {
        title: 'Corporate Office Towers',
        desc: 'Multi-level tech parks and corporate headquarters with flexible open-plan floor plates.',
        image: '/images/project-commercial.jpg',
      },
      {
        title: 'Retail Storefronts & Plazas',
        desc: 'Commanding street presence with column-free spans engineered for dynamic retail display.',
        image: '/images/service-commercial.jpg',
      },
      {
        title: 'Automobile & Product Showrooms',
        desc: 'Double-height column-free showrooms with integrated acoustic and display illumination.',
        image: '/images/about-architecture.jpg',
      },
      {
        title: 'Healthcare Clinics & Facilities',
        desc: 'Specialized clinic and medical facilities built strictly to clinical regulatory standards.',
        image: '/images/service-planning.jpg',
      },
      {
        title: 'Educational Campuses',
        desc: 'Acoustic-optimized classrooms, sports infrastructure, and campus administration wings.',
        image: '/images/ethos-vision.jpg',
      },
      {
        title: 'Industrial Warehousing & PEB',
        desc: 'High-load industrial flooring, pre-engineered steel buildings, and logistics terminals.',
        image: '/images/construction-site.jpg',
      },
    ],
    processTitle: 'Our 4-Stage Commercial Delivery Protocol',
    processSteps: [
      {
        num: '01',
        stage: 'ANALYSE',
        subtitle: 'Zoning & FAR Feasibility',
        desc: 'Commercial zoning verification, footfall modeling, setback calculations, and sanction clearances.',
        image: '/images/process-step-1.jpg',
      },
      {
        num: '02',
        stage: 'DESIGN',
        subtitle: 'Wide-Span Framing & MEP',
        desc: 'Post-tensioned slab engineering, fire safety compliance routing, and HVAC plant layouts.',
        image: '/images/process-step-2.jpg',
      },
      {
        num: '03',
        stage: 'BUILD',
        subtitle: 'Fast-Track Civil & Glazing',
        desc: 'Double-glazed facade installation, heavy concrete casting, and integrated service cores.',
        image: '/images/process-step-3.jpg',
      },
      {
        num: '04',
        stage: 'DELIVER',
        subtitle: 'Testing, Fire NOC & Handover',
        desc: 'Statutory inspections, life safety commissioning, and official occupancy certificate handover.',
        image: '/images/service-commercial.jpg',
      },
    ],
    whyChoose: [
      {
        num: '01',
        title: 'Fast-Track Turnaround',
        desc: 'Parallel construction shifts reducing gestation periods and enabling earlier commercial rental income.',
        icon: 'Clock',
      },
      {
        num: '02',
        title: 'Statutory Mastery',
        desc: 'Comprehensive management of statutory clearances, Fire NOC, and Occupancy Certificates.',
        icon: 'Award',
      },
      {
        num: '03',
        title: 'Heavy Floor Load Capacity',
        desc: 'Slabs engineered for high-density occupancy, server room banks, and heavy machinery.',
        icon: 'Building2',
      },
      {
        num: '04',
        title: 'Single Accountability',
        desc: 'Unified civil and MEP project management preventing vendor friction and unnecessary delay.',
        icon: 'ShieldCheck',
      },
    ],
    galleryProjects: [
      { title: 'Aura Corporate Headquarters', category: 'Commercial Campus', img: '/images/project-commercial.jpg', slug: 'aura-corporate-headquarters' },
      { title: 'Prime Retail Center', category: 'Retail & Commercial', img: '/images/service-commercial.jpg', slug: 'aura-corporate-headquarters' },
      { title: 'Innovate Tech Tower', category: 'Office Building', img: '/images/about-architecture.jpg', slug: 'aura-corporate-headquarters' },
      { title: 'Urban Commercial Hub', category: 'Multi-Tenant Commercial', img: '/images/service-planning.jpg', slug: 'aura-corporate-headquarters' },
    ],
    faqs: [
      {
        q: 'Can you handle commercial regulatory approvals and fire NOCs?',
        a: 'Yes. We manage end-to-end statutory clearances including fire safety NOC, environmental permissions, and commercial occupancy certificates.',
      },
      {
        q: 'How do you maintain fast-track construction schedules?',
        a: 'We deploy post-tensioned slab casting, parallel MEP pre-fabrication, and round-the-clock site management shifts.',
      },
      {
        q: 'Do you provide turnkey interior fitouts along with shell and core construction?',
        a: 'Yes, our turnkey capability bridges structural construction directly with corporate MEP fitouts and bespoke executive interiors.',
      },
    ],
    ctaEyebrow: "ENGINEERING COMMERCIAL LANDMARKS",
    ctaHeading: "PLANNING A COMMERCIAL FACILITY?",
    ctaDescription: "Construct scalable tech campuses, corporate headquarters, and high-footfall retail spaces delivered on time with zero budget escalation.",
    ctaButtonText: "Discuss Commercial Project",
  },

  'interior-design': {
    title: 'Interior Design',
    heroEyebrow: 'BESPOKE LUXURY LIVING SPACES',
    heroSubtitle: 'Curated residential and executive interiors balancing sculptural form, tactile materiality, bespoke cabinetry, and tailored lighting.',
    heroImage: '/images/service-interiors.jpg',
    heroHighlights: [
      { text: 'German Precision Factory Joinery' },
      { text: 'Calibrated BWP Marine Plywood Carcass' },
      { text: 'White-Glove 45–60 Day Delivery' },
    ],
    overviewEyebrow: 'OVERVIEW & SCOPE',
    overviewTitle: 'INTERIORS THAT CELEBRATE CONTEMPORARY LUXURY',
    overviewDesc: 'We compose interiors that transcend passing trends. By harmonizing Italian marble surfaces, architectural fluted paneling, acoustic textile treatments, and automated circadian illumination, we craft spaces that feel deeply personal, luxurious, and effortlessly functional.',
    checklist: [
      'Full-home bespoke interior architecture & tailored joinery',
      'Precision CNC factory-manufactured modular wardrobes & cabinetry',
      'Architectural false ceilings, concealed cove lighting & automation',
      'Custom soft furnishings, Italian marble curation & wall paneling',
    ],
    collage: {
      main: '/images/interior-living-room.jpg',
      sub1: '/images/interior-bedroom.jpg',
      sub2: '/images/interior-kitchen.jpg',
    },
    consultationPoints: [
      'In-studio material palette session within 24 hours',
      'Photorealistic 3D interior walkthrough render',
      'Itemized, fixed-price interior contract',
    ],
    subServicesEyebrow: 'OUR INTERIOR SERVICES',
    subServicesTitle: 'Our Interior Design Capabilities',
    subServices: [
      {
        title: 'Living & Dining Suites',
        desc: 'Fluted wood feature walls, Italian marble surfaces, and statement cove illumination.',
        image: '/images/interior-living-room.jpg',
      },
      {
        title: 'Modular Kitchen Design',
        desc: 'Ergonomic modular cabinetry with Blum soft-close mechanics and quartz counters.',
        image: '/images/service-modular-kitchen.jpg',
      },
      {
        title: 'Master Bedroom Sanctuaries',
        desc: 'Acoustic padded headboards, walk-in closets with tinted glass, and tranquil lighting.',
        image: '/images/interior-bedroom.jpg',
      },
      {
        title: 'Executive Home Offices',
        desc: 'Ergonomic executive suites, acoustic breakout pods, and productive collaborative areas.',
        image: '/images/service-interiors.jpg',
      },
      {
        title: 'Luxury Bathrooms & Spas',
        desc: 'Sintered stone vanity counters, concealed diverters, and glass shower suites.',
        image: '/images/service-design.jpg',
      },
      {
        title: 'Turnkey Styling & Furnishing',
        desc: 'Complete soft furnishings, custom upholstery, artwork curation, and white-glove staging.',
        image: '/images/about-villa-showcase.jpg',
      },
    ],
    processTitle: 'How We Create Beautiful Interiors',
    processSteps: [
      {
        num: '01',
        stage: 'CONSULT',
        subtitle: 'Understand Your Style',
        desc: 'Exploring personal aesthetics, functional requirements, material affinities, and color moods.',
        image: '/images/process-step-1.jpg',
      },
      {
        num: '02',
        stage: 'DESIGN',
        subtitle: '3D Walkthrough & Material Board',
        desc: 'Photorealistic 3D interior renders, lighting circuit plans, and physical material samples.',
        image: '/images/process-step-2.jpg',
      },
      {
        num: '03',
        stage: 'EXECUTE',
        subtitle: 'Precision Factory Joinery',
        desc: 'Dust-free factory precision woodworking, imported hardware fitting, and meticulous joinery.',
        image: '/images/process-step-3.jpg',
      },
      {
        num: '04',
        stage: 'ENJOY',
        subtitle: 'White-Glove Handover',
        desc: 'Deep clean detailing, soft furnishings styling, and handover of your pristine sanctuary.',
        image: '/images/interior-living-room.jpg',
      },
    ],
    whyChoose: [
      {
        num: '01',
        title: 'CNC Factory Precision',
        desc: 'Zero on-site carpentry dust; furniture crafted with calibrated German edge-banding.',
        icon: 'Layers',
      },
      {
        num: '02',
        title: 'Boiling Waterproof Materials',
        desc: 'Strictly 710-grade BWP marine plywood and HDHMR moisture-resistant substrates.',
        icon: 'ShieldCheck',
      },
      {
        num: '03',
        title: 'Transparent Fixed Estimates',
        desc: 'Itemized hardware, veneer, and finish specifications with zero hidden costs.',
        icon: 'Clock',
      },
      {
        num: '04',
        title: 'Smart Home Integration',
        desc: 'Seamless control of lighting scenes, motorized curtains, and HVAC zoning.',
        icon: 'Sparkles',
      },
    ],
    galleryProjects: [
      { title: 'Bespoke Penthouse Living', category: 'Luxury Interiors', img: '/images/interior-living-room.jpg', slug: 'bespoke-penthouse-living' },
      { title: 'Palatial Master Suite', category: 'Bedroom Interior', img: '/images/interior-bedroom.jpg', slug: 'palatial-master-suite' },
      { title: 'Culinary Master Kitchen', category: 'Modular Kitchen', img: '/images/service-modular-kitchen.jpg', slug: 'culinary-master-modular-kitchen' },
      { title: 'Courtyard Villa Interiors', category: 'Full Home Interior', img: '/images/ethos-vision.jpg', slug: 'bespoke-penthouse-living' },
    ],
    faqs: [
      {
        q: 'Do you manufacture modular joinery in-house or outsource it?',
        a: 'All our modular woodwork is fabricated in our partner precision CNC factory using German machinery and calibrated BWP marine plywood.',
      },
      {
        q: 'Can we integrate smart home automation with lighting and curtains?',
        a: 'Yes, we seamlessly integrate centralized smart lighting, motorized curtains, HVAC zoning, and multi-room audio systems.',
      },
      {
        q: 'How long does a 3BHK or 4BHK interior fitout take?',
        a: 'A typical bespoke 3BHK or 4BHK turnkey interior takes between 45 to 60 days from 3D design sign-off to white-glove handover.',
      },
    ],
    ctaEyebrow: "CURATING BESPOKE LUXURY LIVING",
    ctaHeading: "READY TO TRANSFORM YOUR INTERIORS?",
    ctaDescription: "From Italian modular kitchens to custom teak cabinetry and ambient architectural lighting, experience turnkey luxury interior styling.",
    ctaButtonText: "Book Interior Consultation",
  },

  'modular-kitchen': {
    title: 'Modular Kitchen Design',
    heroEyebrow: 'CULINARY PRECISION & ERGONOMICS',
    heroSubtitle: 'German-engineered modular kitchens combining boiling waterproof marine carcasses, soft-close hardware, quartz countertops, and smart corner storage.',
    heroImage: '/images/service-modular-kitchen.jpg',
    heroHighlights: [
      { text: 'IS-710 BWP Marine Plywood Carcass' },
      { text: 'Blum (Austria) Hardware with 10-Yr Warranty' },
      { text: 'Anti-Fingerprint Acrylic & Sintered Stone' },
    ],
    overviewEyebrow: 'OVERVIEW & SCOPE',
    overviewTitle: 'KITCHENS CRAFTED FOR MODERN CULINARY LIVING',
    overviewDesc: 'A truly great kitchen balances relentless ergonomics with exquisite visual poise. We engineer kitchens around the golden working triangle — storage, prep, and cooking — with seamless moisture immunity, smooth electronic touch lift-ups, and effortless deep pantry organization.',
    checklist: [
      'Island, L-shape, U-shape & parallel culinary configurations',
      '710-Grade Boiling Waterproof (BWP) marine plywood construction',
      'Blum / Hafele soft-close tandem boxes & servo-drive lift mechanisms',
      'Sintered stone, quartz & granite heat-resistant countertops',
    ],
    collage: {
      main: '/images/service-modular-kitchen.jpg',
      sub1: '/images/interior-kitchen.jpg',
      sub2: '/images/interior-living-room.jpg',
    },
    consultationPoints: [
      'Laser measurement & appliance layout audit',
      '3D kitchen layout & workflow simulation',
      'Hardware and countertop sample demonstration',
    ],
    subServicesEyebrow: 'OUR MODULAR KITCHEN DESIGNS',
    subServicesTitle: 'Our Modular Kitchen Configurations',
    subServices: [
      {
        title: 'Grand Island Kitchens',
        desc: 'Central island culinary stations with waterfall quartz countertops and breakfast counters.',
        image: '/images/service-modular-kitchen.jpg',
      },
      {
        title: 'Ergonomic L-Shaped Layouts',
        desc: 'Corner efficiency maximized with carousel magic pullouts and smooth traffic flow.',
        image: '/images/interior-kitchen.jpg',
      },
      {
        title: 'Parallel & Galley Kitchens',
        desc: 'High-efficiency dual-counter layouts favored by passionate culinary connoisseurs.',
        image: '/images/interior-living-room.jpg',
      },
      {
        title: 'Anti-Fingerprint Acrylic Finishes',
        desc: 'Ultra-matte and high-gloss scratch-resistant frontages in contemporary architectural tones.',
        image: '/images/service-interiors.jpg',
      },
      {
        title: 'Smart Tall Storage & Pantries',
        desc: 'Heavy-duty larder pull-outs, concealed spice racks, and appliance garages.',
        image: '/images/service-modular-kitchen.jpg',
      },
      {
        title: 'Under-Sink Moisture Defense',
        desc: 'SS-304 stainless steel sink bases with anti-drip waterproof liners.',
        image: '/images/interior-kitchen.jpg',
      },
    ],
    processTitle: 'How We Design Your Modular Kitchen',
    processSteps: [
      {
        num: '01',
        stage: 'MEASURE',
        subtitle: 'Laser Audit & Triangle Mapping',
        desc: 'Laser dimension verification, plumbing inlet audits, and appliance specification cataloging.',
        image: '/images/process-step-1.jpg',
      },
      {
        num: '02',
        stage: 'DESIGN',
        subtitle: '3D Simulation & Finish Selection',
        desc: 'Work-triangle optimization, internal drawer organization, and finish approvals.',
        image: '/images/process-step-2.jpg',
      },
      {
        num: '03',
        stage: 'MANUFACTURE',
        subtitle: 'Factory CNC Carcass Fabrication',
        desc: 'Heavy-duty marine plywood carcass fabrication with PUR waterproof edge-banding.',
        image: '/images/process-step-3.jpg',
      },
      {
        num: '04',
        stage: 'INSTALL',
        subtitle: 'Assembly & Hob Commissioning',
        desc: 'Dust-free mechanical assembly in 48-72 hours followed by plumbing and hob checks.',
        image: '/images/service-modular-kitchen.jpg',
      },
    ],
    whyChoose: [
      {
        num: '01',
        title: '100% Waterproof Core',
        desc: 'IS:710 Marine Plywood ensures zero swelling even around heavy wet-grinding sinks.',
        icon: 'ShieldCheck',
      },
      {
        num: '02',
        title: 'Authentic Blum Hardware',
        desc: 'Certified Austrian soft-close hinges and tandem boxes tested for 200,000 cycles.',
        icon: 'Award',
      },
      {
        num: '03',
        title: 'Laser-Cut Edge Banding',
        desc: 'Seamless moisture seal preventing grease accumulation and delamination.',
        icon: 'Layers',
      },
      {
        num: '04',
        title: '10-Year Hardware Warranty',
        desc: 'Complete peace of mind backed by manufacturer and studio warranty cards.',
        icon: 'Clock',
      },
    ],
    galleryProjects: [
      { title: 'Culinary Master Kitchen', category: 'Island Modular Kitchen', img: '/images/service-modular-kitchen.jpg', slug: 'culinary-master-modular-kitchen' },
      { title: 'Minimalist Quartz Kitchen', category: 'L-Shaped Kitchen', img: '/images/interior-kitchen.jpg', slug: 'culinary-master-modular-kitchen' },
      { title: 'Penthouse Chef Studio', category: 'High-Gloss Modular Kitchen', img: '/images/service-modular-kitchen.jpg', slug: 'bespoke-penthouse-living' },
      { title: 'Warm Wood Tone Kitchen', category: 'Veneer Finish Kitchen', img: '/images/interior-living-room.jpg', slug: 'culinary-master-modular-kitchen' },
    ],
    faqs: [
      {
        q: 'What core material do you recommend for Indian wet kitchen conditions?',
        a: 'We strictly utilize 710-grade Boiling Waterproof (BWP) Marine Plywood with HDHMR for sink areas to ensure 100% moisture and termite immunity.',
      },
      {
        q: 'What brand of hardware and drawer runners do you provide?',
        a: 'We partner directly with Blum (Austria) and Hafele (Germany) for soft-close hinges, tandem boxes, and electronic servo-drive lift mechanisms.',
      },
      {
        q: 'How long does manufacturing and on-site assembly take?',
        a: 'Factory manufacturing takes 21 to 28 days. Once delivered to your home, our certified technicians complete full on-site installation in 48 to 72 hours.',
      },
    ],
    ctaEyebrow: "CULINARY ERGONOMICS & ITALIAN LUXURY",
    ctaHeading: "READY TO DESIGN YOUR DREAM KITCHEN?",
    ctaDescription: "Upgrade to customized German-hardware modular systems, quartz worktops, and intelligent pantry organizers built for seamless daily living.",
    ctaButtonText: "Design Your Kitchen",
  },

  'renovation-remodeling': {
    title: 'Renovation & Remodeling',
    heroEyebrow: 'ARCHITECTURAL TRANSFORMATION',
    heroSubtitle: 'Breathe new life into aging structures with modern upgrades, intelligent space planning, and bespoke finishes.',
    heroImage: '/images/service-renovation.jpg',
    heroHighlights: [
      { text: 'Structural Assessment & Planning' },
      { text: 'Dust-Controlled Project Execution' },
      { text: 'Transparent Project Estimates' },
    ],
    overviewEyebrow: 'OVERVIEW & SCOPE',
    overviewTitle: 'TRANSFORMING EXISTING STRUCTURES INTO BESPOKE MODERN LANDMARKS',
    overviewDesc: 'At Sri Ananda Nilayam, we view renovation not merely as a cosmetic facelift, but as an architectural metamorphosis. We seamlessly merge the heritage and bone structure of your existing property with modern open-concept spatial layouts, advanced MEP engineering, and timeless luxury finishes — all executed with surgical precision and minimal disruption to your daily life.',
    checklist: [
      'Forensic structural audit & load-bearing capacity analysis',
      'Open-plan spatial reconfiguration & structural beam modifications',
      'Concealed plumbing, fire-retardant wiring & smart home automation',
      'Dust-containment negative pressure zones for minimum disruption',
    ],
    collage: {
      main: '/images/renovation-hero.jpg',
      sub1: '/images/renovation-facade.jpg',
      sub2: '/images/renovation-interior.jpg',
    },
    consultationPoints: [
      'On-site structural evaluation within 24 hours',
      'Laser-scanned 3D as-built drawings & feasibility review',
      'Transparent itemized BOQ with zero surprise expenses',
    ],
    subServicesEyebrow: 'OUR RENOVATION & REMODELING CAPABILITIES',
    subServicesTitle: 'Comprehensive Renovation & Modernization Solutions',
    subServices: [
      {
        title: 'Full-Home & Villa Overhaul',
        desc: 'Complete turnkey metamorphosis of dated residences into ultra-luxury modern sanctuaries with new layouts, finishes, and automation.',
        image: '/images/renovation-hero.jpg',
      },
      {
        title: 'Structural Retrofitting & Jacketing',
        desc: 'Precision column strengthening, RCC beam modifications, micro-concreting, and foundation reinforcement to BIS seismic standards.',
        image: '/images/construction-site.jpg',
      },
      {
        title: 'Floor Additions & Penthouse Extensions',
        desc: 'Lightweight steel vertical expansions, enclosed sun terraces, and panoramic rooftop lounges with complete municipal sanction support.',
        image: '/images/about-villa-showcase.jpg',
      },
      {
        title: 'Contemporary Facade Modernization',
        desc: 'Elevating exterior curb appeal with sustainable teak timber louvers, natural limestone claddings, and architectural ambient lighting.',
        image: '/images/renovation-facade.jpg',
      },
      {
        title: 'Luxury Interior Space Reconfiguration',
        desc: 'Removing non-load-bearing partitions to create light-flooded open living-dining expanses, Italian marble flooring, and bespoke ceilings.',
        image: '/images/renovation-interior.jpg',
      },
      {
        title: 'Kitchen & Wet Area Reconstruction',
        desc: 'Complete strip-down and reconstruction with chemical pressure waterproofing, concealed PEX piping, and German modular cabinetry.',
        image: '/images/service-modular-kitchen.jpg',
      },
    ],
    processTitle: 'Our Precision 4-Stage Renovation Protocol',
    processSteps: [
      {
        num: '01',
        stage: 'DIAGNOSE',
        subtitle: 'Structural & MEP Forensic Audit',
        desc: 'Non-destructive rebound hammer tests, moisture mapping, and digital 3D spatial scanning of the existing framework.',
        image: '/images/process-step-1.jpg',
      },
      {
        num: '02',
        stage: 'ENGINEER',
        subtitle: 'Architectural Redesign & BOQ Lock',
        desc: 'Coordinated structural reinforcement calculations, phased demolition blueprints, and a 100% itemized, locked-price contract.',
        image: '/images/process-step-2.jpg',
      },
      {
        num: '03',
        stage: 'EXECUTE',
        subtitle: 'Controlled Demolition & Rebuild',
        desc: 'Dust-barrier negative pressure containment, structural steel propping, high-grade civil retrofitting, and designer finishes.',
        image: '/images/process-step-3.jpg',
      },
      {
        num: '04',
        stage: 'REVEAL',
        subtitle: 'White-Glove Handover & Warranty',
        desc: 'Rigorous 120-point quality audit, 72-hour plumbing pressure hold tests, deep cleaning, and presentation of the 5-year structural warranty certificate.',
        image: '/images/process-step-4.jpg',
      },
    ],
    whyChoose: [
      {
        num: '01',
        title: 'Forensic Structural Safety',
        desc: 'We never compromise building integrity. Every wall modification is vetted by senior licensed structural engineers with load calculations.',
        icon: 'ShieldCheck',
      },
      {
        num: '02',
        title: 'Dust-Barrier Containment',
        desc: 'Our phased execution uses hospital-grade dust screens and zip-walls so adjacent spaces remain clean and functional throughout.',
        icon: 'Layers',
      },
      {
        num: '03',
        title: 'Zero Hidden Cost Guarantee',
        desc: 'Comprehensive upfront scanning eliminates surprise variations. Our transparent itemized BOQ locks the budget from day one.',
        icon: 'Clock',
      },
      {
        num: '04',
        title: 'Turnkey Architectural Vision',
        desc: 'From municipal approvals and structural retrofitting to bespoke Italian finishes, one accountable team orchestrates everything.',
        icon: 'Sparkles',
      },
    ],
    galleryProjects: [
      { title: 'Heritage Villa Modernization', category: 'Turnkey Villa Renovation', img: '/images/renovation-hero.jpg', slug: 'heritage-villa-restoration' },
      { title: 'Contemporary Facade Metamorphosis', category: 'Exterior Modernization', img: '/images/renovation-facade.jpg', slug: 'solarium-luxury-villa' },
      { title: 'Open-Plan Penthouse Overhaul', category: 'Structural Interior Remodel', img: '/images/renovation-interior.jpg', slug: 'bespoke-penthouse-living' },
      { title: 'Modern Living Terrace Extension', category: 'Vertical Floor Addition', img: '/images/about-villa-showcase.jpg', slug: 'serene-haven-residence' },
    ],
    faqs: [
      {
        q: 'Can we stay in the home while the renovation is underway?',
        a: 'For localized or phased remodeling (such as master suites, kitchens, or facade modernizations), yes. We install heavy-duty zip-wall dust screens, negative-air filtration, and designated worker entry corridors to isolate the work zone. For full-home structural overhauls, we advise temporary relocation during active demolition for comfort and safety.',
      },
      {
        q: 'How do you prevent unexpected costs and variation claims during remodeling?',
        a: 'The number-one cause of renovation budget bloat is unseen surprises. Before finalizing your quote, our engineers conduct non-destructive structural scans, moisture meter tests, and plumbing pressure tests. This forensic evaluation allows us to generate a 100% itemized, fixed-price Bill of Quantities (BOQ) with zero surprise expenses.',
      },
      {
        q: 'Do structural wall removals or floor additions require municipal approvals?',
        a: 'Any load-bearing wall modification, foundation underpinning, or vertical floor addition requires municipal sanctioning and structural stability vetting. Our in-house licensed structural engineers handle complete municipal liaison, structural load drawings, and official certifications.',
      },
      {
        q: 'What warranties and post-handover support do you provide?',
        a: 'Every Sri Ananda Nilayam renovation project includes a stamped 5-Year Structural Stability Warranty, a 3-Year Waterproofing Warranty against leakages, and standard OEM manufacturer guarantees on all sanitaryware, electricals, and hardware.',
      },
    ],
    ctaEyebrow: "RE-ENGINEER & REVITALIZE YOUR PROPERTY",
    ctaHeading: "CONSIDERING A STRUCTURAL RENOVATION?",
    ctaDescription: "Modernize aging facades, expand living rooms, and reinforce foundational stability with certified seismic engineering and premium finishes.",
    ctaButtonText: "Request Renovation Review",
  },

  'turnkey-projects': {
    title: 'Turnkey Projects',
    heroEyebrow: 'SINGLE-POINT ACCOUNTABILITY',
    heroSubtitle: 'Coordinated architectural design, civil construction, interior fit-outs, and luxury furnishing orchestrated seamlessly under one trusted team.',
    heroImage: '/images/project-villa.jpg',
    heroHighlights: [
      { text: 'Single Point of Accountability' },
      { text: 'Guaranteed Handover Timelines' },
      { text: 'Comprehensive 5-Year Master Warranty' },
    ],
    overviewEyebrow: 'OVERVIEW & SCOPE',
    overviewTitle: 'FROM RAW LAND TO FURNISHED LUXURY SANCTUARY',
    overviewDesc: 'Our turnkey delivery model eliminates the friction, finger-pointing, and budget creep inherent in hiring separate architects, civil contractors, and interior designers. From soil testing and municipal sanctions to final custom upholstery and key handover, we manage every detail under a single unified contract.',
    checklist: [
      'Complete concept-to-keys single-contract accountability',
      'Unified architectural, civil engineering & interior styling teams',
      'Milestone-backed progress tracking with transparent stage reviews',
      'Comprehensive 10-year structural & 5-year interior master warranty',
    ],
    collage: {
      main: '/images/project-villa.jpg',
      sub1: '/images/construction-site.jpg',
      sub2: '/images/interior-living-room.jpg',
    },
    consultationPoints: [
      'Turnkey feasibility & plot evaluation within 24 hours',
      'Comprehensive integrated Design-Build BOQ',
      'Senior Project Director assigned directly to your project',
    ],
    subServicesEyebrow: 'OUR TURNKEY CAPABILITIES',
    subServicesTitle: 'End-to-End Turnkey Execution Solutions',
    subServices: [
      {
        title: 'Turnkey Luxury Villas',
        desc: 'Complete design, civil construction, interior joinery, and landscaping for bespoke estates.',
        image: '/images/project-villa.jpg',
      },
      {
        title: 'Turnkey Corporate Fitouts',
        desc: 'End-to-end commercial interior execution including HVAC, fire systems, and acoustic partitions.',
        image: '/images/project-commercial.jpg',
      },
      {
        title: 'Turnkey Home Transformations',
        desc: 'Whole-home remodeling encompassing structural additions, MEP overhauls, and curated interiors.',
        image: '/images/service-renovation.jpg',
      },
      {
        title: 'Global Material Sourcing',
        desc: 'Direct sourcing of Italian marble, German hardware, and high-performance architectural glass.',
        image: '/images/about-architecture.jpg',
      },
      {
        title: 'Sanction & Clearances',
        desc: 'Complete municipal liaison, environmental clearances, and final occupancy certifications.',
        image: '/images/process-step-1.jpg',
      },
      {
        title: 'White-Glove Interior Staging',
        desc: 'Installation of custom furniture, designer lighting, soft furnishings, and move-in cleaning.',
        image: '/images/interior-bedroom.jpg',
      },
    ],
    processTitle: 'Our 4-Stage Turnkey Protocol',
    processSteps: [
      {
        num: '01',
        stage: 'CONCEPT',
        subtitle: 'Unified Design & BOQ Lock',
        desc: 'Coordinated architectural, structural, and interior design finalized under a single locked-price contract.',
        image: '/images/process-step-1.jpg',
      },
      {
        num: '02',
        stage: 'STATUTORY',
        subtitle: 'Sanctions & Groundwork',
        desc: 'Municipal sanction liaison, soil consolidation, and structural foundation casting.',
        image: '/images/process-step-2.jpg',
      },
      {
        num: '03',
        stage: 'BUILD',
        subtitle: 'Civil Superstructure & Joinery',
        desc: 'Precision civil superstructure rising while modular interiors are fabricated in CNC factory.',
        image: '/images/process-step-3.jpg',
      },
      {
        num: '04',
        stage: 'UNVEIL',
        subtitle: 'Snag-Zero Handover & Move-In',
        desc: 'Complete 200-point snag check, deep cleaning, key handover ceremony, and master warranty dossier.',
        image: '/images/process-step-4.jpg',
      },
    ],
    whyChoose: [
      {
        num: '01',
        title: 'Zero Finger-Pointing',
        desc: 'Design, civil, and interior teams report to one principal project director.',
        icon: 'ShieldCheck',
      },
      {
        num: '02',
        title: 'Guaranteed Time & Budget',
        desc: 'Milestone penalties protect your timeline and a locked BOQ protects your investment.',
        icon: 'Clock',
      },
      {
        num: '03',
        title: 'Curated Global Finishes',
        desc: 'Direct partnerships with leading stone quarries and European hardware manufacturers.',
        icon: 'Award',
      },
      {
        num: '04',
        title: 'All-Inclusive Post-Handover',
        desc: 'Dedicated support team managing routine maintenance and warranty service.',
        icon: 'Sparkles',
      },
    ],
    galleryProjects: [
      { title: 'The Solarium Luxury Villa', category: 'Turnkey Villa', img: '/images/project-villa.jpg', slug: 'solarium-luxury-villa' },
      { title: 'Aura Corporate Campus', category: 'Turnkey Commercial', img: '/images/project-commercial.jpg', slug: 'aura-corporate-headquarters' },
      { title: 'Bespoke Penthouse Living', category: 'Turnkey Interior Fitout', img: '/images/interior-living-room.jpg', slug: 'bespoke-penthouse-living' },
      { title: 'Heritage Villa Restoration', category: 'Turnkey Remodel', img: '/images/hero-villa.jpg', slug: 'heritage-villa-restoration' },
    ],
    faqs: [
      {
        q: 'What does turnkey project execution include?',
        a: 'Turnkey covers everything: architectural blueprints, municipal plan sanctions, complete civil construction, electrical/plumbing infrastructure, modular woodwork, false ceilings, painting, sanitaryware, and move-in cleaning.',
      },
      {
        q: 'How does a turnkey contract protect my budget?',
        a: 'Unlike fragmented contracting where change orders proliferate, our turnkey contract locks specifications and costs under an itemized, milestone-verified BOQ.',
      },
      {
        q: 'Who will be my primary contact during construction?',
        a: 'You are assigned a dedicated Senior Project Director who provides weekly video updates, milestone reports, and single-point communication.',
      },
    ],
    ctaEyebrow: "END-TO-END TURNKEY EXCELLENCE",
    ctaHeading: "SEEKING A COMPLETE TURNKEY PARTNER?",
    ctaDescription: "From municipal blueprint sanctions to civil structural framing and interior turnkey handover, enjoy 100% single-point accountability.",
    ctaButtonText: "Start Your Turnkey Project",
  },

  'space-planning': {
    title: 'Space Planning & Consultation',
    heroEyebrow: 'STRATEGIC SPATIAL OPTIMIZATION',
    heroSubtitle: 'Expert architectural consultations, Vastu alignment audits, and ergonomic space planning to maximize efficiency, natural illumination, and human well-being.',
    heroImage: '/images/service-planning.jpg',
    heroHighlights: [
      { text: 'Vastu Alignment & Energy Flow Analysis' },
      { text: 'Laser-Measured As-Built Schematics' },
      { text: 'Circulation & Natural Light Optimization' },
    ],
    overviewEyebrow: 'OVERVIEW & SCOPE',
    overviewTitle: 'UNLOCKING THE HIDDEN POTENTIAL OF EVERY SQUARE FOOT',
    overviewDesc: 'Exceptional architecture begins with intelligent spatial logic. Whether you are evaluating an undeveloped plot, optimizing a commercial floorplate, or reimagining a residential layout, our chartered spatial consultants analyze sunlight paths, cross-ventilation, circulation velocity, and Vastu principles to craft flawless plans.',
    checklist: [
      'Comprehensive plot feasibility & zoning setback optimization studies',
      'Scientific Vastu Shastra audit & practical architectural harmonisation',
      'Circulation flow mapping for residences, clinics & corporate offices',
      'Detailed 2D furniture clearance schematics & MEP coordination layouts',
    ],
    collage: {
      main: '/images/service-planning.jpg',
      sub1: '/images/process-step-1.jpg',
      sub2: '/images/about-architecture.jpg',
    },
    consultationPoints: [
      'Discovery session with principal architect within 24 hours',
      'Plot coordinate & zoning clearance review',
      'Practical Vastu harmonisation recommendations',
    ],
    subServicesEyebrow: 'OUR SPATIAL CONSULTING CAPABILITIES',
    subServicesTitle: 'Specialized Space Planning Services',
    subServices: [
      {
        title: 'Residential Layout Optimization',
        desc: 'Eliminating dead corridors and maximizing living expanses in apartments and luxury villas.',
        image: '/images/service-planning.jpg',
      },
      {
        title: 'Scientific Vastu Harmonisation',
        desc: 'Aligning water bodies, master suites, kitchens, and entrances with solar and magnetic axes.',
        image: '/images/process-step-1.jpg',
      },
      {
        title: 'Corporate Footfall & Workstation Planning',
        desc: 'Optimizing corporate desk density, acoustic privacy, and collaborative breakout zones.',
        image: '/images/project-commercial.jpg',
      },
      {
        title: 'Pre-Purchase Plot Feasibility',
        desc: 'Evaluating access roads, soil viability, setbacks, and buildable area before land acquisition.',
        image: '/images/construction-site.jpg',
      },
      {
        title: 'Daylight & Solar Orientation Modeling',
        desc: 'Calculating seasonal sun angles and window placement to slash artificial cooling needs.',
        image: '/images/about-architecture.jpg',
      },
      {
        title: 'Furniture Ergonomics & Clearance Schematics',
        desc: 'Precise clearance drawings ensuring effortless movement and luxury spatial flow.',
        image: '/images/interior-living-room.jpg',
      },
    ],
    processTitle: 'Our 4-Stage Spatial Advisory Protocol',
    processSteps: [
      {
        num: '01',
        stage: 'AUDIT',
        subtitle: 'Site & Lifestyle Diagnostics',
        desc: 'Precision laser measurement, plot coordinate verification, and occupant workflow audit.',
        image: '/images/process-step-1.jpg',
      },
      {
        num: '02',
        stage: 'SYNTHESIS',
        subtitle: 'Multi-Option Conceptual Schematics',
        desc: 'Developing alternative spatial circulation plans optimizing daylight, breeze, and Vastu.',
        image: '/images/process-step-2.jpg',
      },
      {
        num: '03',
        stage: 'REFINE',
        subtitle: 'Collaborative 3D Walkthrough',
        desc: 'Interactive deliberation session refining door swings, sightlines, and furniture clearances.',
        image: '/images/process-step-3.jpg',
      },
      {
        num: '04',
        stage: 'DELIVER',
        subtitle: 'Technical Blueprint Dossier',
        desc: 'Complete CAD schematics, dimensional drawings, and MEP alignment reports ready for execution.',
        image: '/images/process-step-4.jpg',
      },
    ],
    whyChoose: [
      {
        num: '01',
        title: 'Scientific Vastu Expertise',
        desc: 'Pragmatic, non-destructive Vastu solutions that honor modern architectural sensibilities.',
        icon: 'Compass',
      },
      {
        num: '02',
        title: 'Maximized Usable Area',
        desc: 'Extracting 10% to 15% more usable living space by eliminating wasted hallway corridors.',
        icon: 'Layers',
      },
      {
        num: '03',
        title: 'Pre-Construction Cost Savings',
        desc: 'Catching design flaws on paper before costly civil concrete is poured on site.',
        icon: 'Clock',
      },
      {
        num: '04',
        title: 'Holistic Architectural Context',
        desc: 'Space planning that integrates structural reality with interior luxury from day one.',
        icon: 'Sparkles',
      },
    ],
    galleryProjects: [
      { title: 'The Solarium Luxury Villa', category: 'Spatial Architecture', img: '/images/project-villa.jpg', slug: 'solarium-luxury-villa' },
      { title: 'Aura Corporate Headquarters', category: 'Corporate Space Planning', img: '/images/project-commercial.jpg', slug: 'aura-corporate-headquarters' },
      { title: 'Serene Haven Residence', category: 'Vastu Villa Planning', img: '/images/about-villa-showcase.jpg', slug: 'serene-haven-residence' },
      { title: 'Bespoke Penthouse Living', category: 'Open Space Plan', img: '/images/interior-living-room.jpg', slug: 'bespoke-penthouse-living' },
    ],
    faqs: [
      {
        q: 'Can space planning be done for an already built apartment or villa?',
        a: 'Yes! We frequently re-plan existing homes by analyzing partition removals, furniture repositioning, and lighting realignment to dramatically improve flow.',
      },
      {
        q: 'Do you provide Vastu consultations without breaking existing walls?',
        a: 'Yes. Our principal architects specialize in remedial, non-destructive Vastu adjustments through spatial reallocation, element balancing, and circulation shifts.',
      },
      {
        q: 'What deliverables do I receive from a space planning consultation?',
        a: 'You receive laser-accurate 2D CAD floorplans with dimensions, furniture clearance diagrams, electrical/lighting coordination drawings, and a Vastu compliance summary.',
      },
    ],
    ctaEyebrow: "INTELLIGENT SPATIAL FLOW & HARMONY",
    ctaHeading: "WANT TO OPTIMIZE YOUR FLOOR PLAN?",
    ctaDescription: "Eliminate wasted circulation space, maximize natural daylight penetration, and harmonise every square foot with scientific Vastu alignment.",
    ctaButtonText: "Schedule Space Planning",
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const { settings } = useSite();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Hello Sri Ananda Nilayam, I have a project in mind regarding ${service?.title || 'Architecture & Construction'} and would like to consult.`
    );
    const num = settings?.whatsappRaw || '919876543210';
    window.open(`https://wa.me/${num}?text=${text}`, '_blank');
  };

  useEffect(() => {
    // Window scroll to top on route change
    window.scrollTo(0, 0);

    const fetchService = async () => {
      try {
        const res = await publicApi.getServiceBySlug(slug);
        const staticData = staticServiceDetails[slug];

        if (staticData) {
          // If we have our curated rich static data, use it as baseline and merge dynamic updates
          if (res.data?.success && res.data.data) {
            const apiData = res.data.data;
            setService({
              ...staticData,
              ...apiData,
              checklist: (apiData.benefits && apiData.benefits.length > 0) ? apiData.benefits : staticData.checklist,
              subServices: staticData.subServices,
              processSteps: staticData.processSteps,
              galleryProjects: staticData.galleryProjects,
              faqs: (staticData.faqs && staticData.faqs.length > 0) ? staticData.faqs : apiData.faqs,
              collage: staticData.collage,
              heroHighlights: staticData.heroHighlights,
            });
          } else {
            setService(staticData);
          }
        } else if (res.data?.success && res.data.data) {
          setService(res.data.data);
        } else {
          // Smart fallback for custom slug
          const formattedTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
          setService({
            title: formattedTitle,
            heroEyebrow: 'SERVICE DETAIL',
            heroSubtitle: `Professional architectural, construction and interior solutions for ${formattedTitle.toLowerCase()}.`,
            heroImage: '/images/service-design.jpg',
            heroHighlights: [
              { text: 'Customized Planning' },
              { text: 'Quality Materials' },
              { text: 'Transparent Delivery' },
            ],
            overviewEyebrow: 'OVERVIEW & SCOPE',
            overviewTitle: `${formattedTitle.toUpperCase()} EXCELLENCE`,
            overviewDesc: `At Sri Ananda Nilayam, we deliver exemplary quality in every dimension of ${formattedTitle.toLowerCase()}. Our chartered specialists ensure impeccable standards of execution, material grade certification, and timeline adherence.`,
            checklist: [
              'Custom tailored blueprints adhering to your precise requirements',
              'Experienced chartered architects and licensed structural engineers',
              'Transparent milestone-based progress reviews',
              'Long-term post-completion maintenance assurance',
            ],
            collage: {
              main: '/images/project-villa.jpg',
              sub1: '/images/process-step-1.jpg',
              sub2: '/images/process-step-2.jpg',
            },
            consultationPoints: [
              'Response within 24 hours',
              'Preliminary site feasibility study',
              'Design & material consultation',
            ],
            subServicesEyebrow: `OUR ${formattedTitle.toUpperCase()} SERVICES`,
            subServicesTitle: `Comprehensive ${formattedTitle} Solutions`,
            subServices: [
              { title: 'Consultation & Planning', desc: 'Detailed site study and feasibility analysis.', image: '/images/process-step-1.jpg' },
              { title: 'Architectural Schematics', desc: 'Custom layouts tailored to plot specifications.', image: '/images/process-step-2.jpg' },
              { title: 'Quality Construction', desc: 'Grade-A materials and engineered execution.', image: '/images/process-step-3.jpg' },
              { title: 'Turnkey Handover', desc: 'Snag-free completion and long-term assurance.', image: '/images/process-step-4.jpg' },
            ],
            processTitle: 'Our Proven Execution Process',
            processSteps: [
              { num: '01', stage: 'DISCOVER', subtitle: 'Understanding Your Needs', desc: 'Thorough assessment of lifestyle, plot, and budget goals.', image: '/images/process-step-1.jpg' },
              { num: '02', stage: 'DESIGN', subtitle: 'Strategic Planning', desc: 'Precise blueprints, 3D visualizations, and material selection.', image: '/images/process-step-2.jpg' },
              { num: '03', stage: 'BUILD', subtitle: 'Precision Execution', desc: 'Rigorous on-site engineering and quality compliance.', image: '/images/process-step-3.jpg' },
              { num: '04', stage: 'DELIVER', subtitle: 'Handover & Support', desc: 'Complete delivery and post-handover warranty support.', image: '/images/process-step-4.jpg' },
            ],
            galleryProjects: [
              { title: 'The Solarium Luxury Villa', category: 'Residential', img: '/images/project-villa.jpg', slug: 'solarium-luxury-villa' },
              { title: 'Aura Corporate Headquarters', category: 'Commercial', img: '/images/project-commercial.jpg', slug: 'aura-corporate-headquarters' },
              { title: 'Bespoke Penthouse Living', category: 'Interior Fitout', img: '/images/interior-living-room.jpg', slug: 'bespoke-penthouse-living' },
              { title: 'Heritage Villa Restoration', category: 'Renovation', img: '/images/hero-villa.jpg', slug: 'heritage-villa-restoration' },
            ],
            faqs: [
              { q: 'How do we initiate a consultation for this service?', a: 'Simply submit the contact form or reach our team via WhatsApp to coordinate an in-studio discovery discussion.' },
              { q: 'Do you provide detailed cost estimates prior to work commencement?', a: 'Yes, we provide itemized Bill of Quantities (BOQ) with transparent specifications before any agreements are executed.' },
            ],
            ctaEyebrow: `LET'S BUILD YOUR ${formattedTitle.toUpperCase()} VISION`,
            ctaHeading: `READY TO BRING YOUR ${formattedTitle.toUpperCase()} TO LIFE?`,
            ctaDescription: `Discuss your ${formattedTitle.toLowerCase()} ideas with our expert team and turn them into a beautifully designed reality.`,
            ctaButtonText: `Get a Free Consultation`,
          });
        }
      } catch (err) {
        console.warn('API error fetching service, using static fallback:', err.message);
        setService(staticServiceDetails[slug] || staticServiceDetails['architectural-design']);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="service-detail-loading section-padding text-center">
        <div className="service-loading-spinner" />
        <p className="service-loading-text">Loading Service Details...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="section-padding text-center">
        <h2>Service Not Found</h2>
        <Link to="/services" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Back to All Services
        </Link>
      </div>
    );
  }

  const getWhyChooseIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck size={22} />;
      case 'Layers': return <Layers size={22} />;
      case 'Clock': return <Clock size={22} />;
      case 'Sparkles': return <Sparkles size={22} />;
      case 'Compass': return <Compass size={22} />;
      case 'Award': return <Award size={22} />;
      case 'Users': return <Users size={22} />;
      case 'Building2': return <Building2 size={22} />;
      default: return <ShieldCheck size={22} />;
    }
  };

  const defaultWhyChooseItems = [
    {
      num: '01',
      title: 'Thoughtful Planning',
      desc: 'Optimized space flow, natural daylight calculations, and seamless Vastu harmonisation tailored to your family.',
      icon: <Compass size={22} />,
    },
    {
      num: '02',
      title: 'Quality-Focused Execution',
      desc: 'Certified Grade-A materials, stringent BIS testing protocols, and full-time on-site senior civil engineers.',
      icon: <ShieldCheck size={22} />,
    },
    {
      num: '03',
      title: 'Transparent Communication',
      desc: 'Real-time progress dossiers, 100% itemized Bill of Quantities (BOQ), and strictly zero hidden expenses.',
      icon: <Clock size={22} />,
    },
    {
      num: '04',
      title: 'Personalised Design',
      desc: 'Custom-tailored architectural blueprints and bespoke finishes engineered around your unique aspirations.',
      icon: <Sparkles size={22} />,
    },
  ];

  const activeWhyChoose = service?.whyChoose
    ? service.whyChoose.map((item) => ({
        ...item,
        icon: typeof item.icon === 'string' ? getWhyChooseIcon(item.icon) : item.icon,
      }))
    : defaultWhyChooseItems;

  return (
    <div className="service-detail-page-v2">
      <SeoMeta
        title={`${service.title} | Sri Ananda Nilayam`}
        description={service.heroSubtitle || service.overviewDesc || `Premier ${service.title} services by Sri Ananda Nilayam in Bengaluru.`}
        canonicalUrl={`/services/${slug}`}
        ogImage={service.heroImage || '/images/hero-villa.jpg'}
      />

      {/* ============================================================
          SECTION 1 — LUXURY ARCHITECTURAL HERO BANNER
          ============================================================ */}
      <section
        className="srv-hero"
        style={{ backgroundImage: `url(${service.heroImage || '/images/about-hero-villa.jpg'})` }}
      >
        <div className="srv-hero-overlay" />
        <div className="container srv-hero-container">
          {/* Left Column: Frosted Breadcrumbs, Eyebrow, Title, Subtitle, Highlights */}
          <div className="srv-hero-left">
            {/* Frosted Glass Pill Breadcrumb */}
            <nav className="srv-hero-pill-breadcrumb" aria-label="Breadcrumb Navigation">
              <Link to="/" className="srv-bc-home">Home</Link>
              <span className="srv-bc-slash">/</span>
              <Link to="/services" className="srv-bc-link">Services</Link>
              <span className="srv-bc-slash">/</span>
              <span className="srv-bc-current">{service.title}</span>
            </nav>

            {/* Gold Architectural Eyebrow */}
            <div className="srv-hero-eyebrow-wrap">
              <span className="srv-eyebrow-line" />
              <span className="srv-hero-eyebrow">{service.heroEyebrow || 'SERVICE DETAIL'}</span>
              <span className="srv-eyebrow-line" />
            </div>

            {/* Stately Serif Title */}
            <h1 className="srv-hero-title">{service.title.toUpperCase()}</h1>

            {/* Descriptive Subtitle */}
            <p className="srv-hero-desc">{service.heroSubtitle}</p>

            {/* 3 Circular Gold Feature Highlights */}
            {service.heroHighlights && service.heroHighlights.length > 0 && (
              <div className="srv-hero-highlights">
                {service.heroHighlights.map((hl, hIdx) => (
                  <div key={hIdx} className="srv-hero-pill">
                    <div className="srv-pill-icon-circle">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="srv-pill-label">{hl.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Architectural Heritage Seal & Excellence Card */}
          <div className="srv-hero-right">
            <div className="srv-hero-floating-card">
              <div className="srv-hero-badge-header">
                <div className="srv-badge-gold-crest">
                  <span className="crest-num">20+</span>
                  <span className="crest-lbl">Years</span>
                </div>
                <div className="srv-badge-title-block">
                  <span className="srv-badge-sub">EXCELLENCE IN</span>
                  <span className="srv-badge-main">{service.badgeMain || service.title || 'Turnkey Architecture'}</span>
                </div>
              </div>
              <div className="srv-hero-badge-body">
                <p className="srv-badge-desc">
                  Architectural master planning, engineered civil execution &amp; bespoke luxury interiors under single accountability in Bengaluru.
                </p>
                <div className="srv-badge-stats">
                  <div className="srv-mini-stat">
                    <span className="stat-val">300+</span>
                    <span className="stat-lbl">Projects</span>
                  </div>
                  <div className="srv-stat-divider" />
                  <div className="srv-mini-stat">
                    <span className="stat-val">100%</span>
                    <span className="stat-lbl">Vastu Compliant</span>
                  </div>
                  <div className="srv-stat-divider" />
                  <div className="srv-mini-stat">
                    <span className="stat-val">0</span>
                    <span className="stat-lbl">Cost Overruns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — SERVICE OVERVIEW & SCOPE (Solid Warm Cream #F7F4EE)
          ============================================================ */}
      <section className="srv-overview-section">
        <div className="container srv-overview-container">
          {/* Left Column: Scope, 4 Key Benefits (2x2 grid), and 3-Image Collage */}
          <div className="srv-overview-left">
            <div className="srv-section-eyebrow-wrap">
              <span className="srv-eyebrow-line" />
              <span className="srv-section-eyebrow">{service.overviewEyebrow || 'OVERVIEW & SCOPE'}</span>
            </div>

            <h2 className="srv-overview-title">{service.overviewTitle || 'ARCHITECTURAL MASTERY DELIVERED'}</h2>

            <p className="srv-overview-desc">{service.overviewDesc}</p>

            {/* 4 Key Benefits displayed in 2 columns */}
            {service.checklist && (
              <div className="srv-checklist-grid">
                {service.checklist.slice(0, 4).map((item, cIdx) => (
                  <div key={cIdx} className="srv-checklist-item">
                    <div className="srv-check-icon-wrap">
                      <Check size={14} strokeWidth={2.8} />
                    </div>
                    <span className="srv-check-text">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Clean 3-Image Collage (Content Images Inside Rounded Containers) */}
            {service.collage && (
              <div className="srv-collage-wrap">
                <div className="srv-collage-main">
                  <img
                    src={service.collage.main || '/images/hero-villa.jpg'}
                    alt={`${service.title} architectural showcase`}
                    loading="lazy"
                  />
                </div>
                <div className="srv-collage-subs">
                  <div className="srv-collage-sub-box">
                    <img
                      src={service.collage.sub1 || '/images/process-step-1.jpg'}
                      alt={`${service.title} detail`}
                      loading="lazy"
                    />
                  </div>
                  <div className="srv-collage-sub-box">
                    <img
                      src={service.collage.sub2 || '/images/process-step-2.jpg'}
                      alt={`${service.title} precision`}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Navy Consultation Card with Thin Gold Border */}
          <div className="srv-overview-right">
            <div className="srv-consult-card">
              <div className="srv-consult-card-header">
                <span className="srv-card-eyebrow">EXPERT GUIDANCE</span>
                <h3 className="srv-consult-card-title">REQUEST A CONSULTATION</h3>
                <p className="srv-consult-card-intro">
                  Schedule an in-depth feasibility session with our principal architect with zero obligations.
                </p>
              </div>

              {/* 3 Service-Specific Benefits with Gold Checkmarks */}
              <div className="srv-consult-points">
                {(service.consultationPoints || [
                  'Response within 24 hours',
                  'Preliminary site feasibility study',
                  'Vastu alignment guidance',
                ]).slice(0, 3).map((pt, pIdx) => (
                  <div key={pIdx} className="srv-consult-point-row">
                    <div className="srv-point-icon-badge">
                      <Check size={13} strokeWidth={3} />
                    </div>
                    <span className="srv-point-text">{pt}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="srv-consult-actions">
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="srv-btn-gold"
                >
                  <span>Book Consultation</span>
                  <ArrowRight size={16} strokeWidth={2.4} />
                </Link>

                <a
                  href={`https://wa.me/${settings.whatsappRaw || '919876543210'}?text=${encodeURIComponent(
                    `Hello Sri Ananda Nilayam, I would like to book a consultation regarding ${service.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="srv-btn-whatsapp"
                >
                  <WhatsAppIcon size={17} />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

              <div className="srv-consult-phone-note">
                <Phone size={13} className="srv-phone-icon" />
                <span>
                  Or direct line:{' '}
                  <a href={`tel:${settings.phoneRaw || '+919876543210'}`}>
                    {settings.phone || '+91 98765 43210'}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — OUR EXPERTISE / SUB-SERVICES (Solid Cream #F7F4EE with White Cards)
          ============================================================ */}
      {service.subServices && service.subServices.length > 0 && (
        <section className="srv-subservices-section">
          <div className="container">
            <div className="srv-subservices-header">
              <div className="srv-header-left">
                <div className="srv-section-eyebrow-wrap">
                  <span className="srv-eyebrow-line" />
                  <span className="srv-section-eyebrow">
                    {service.subServicesEyebrow || 'OUR EXPERTISE'}
                  </span>
                </div>
                <h2 className="srv-subservices-title">
                  {service.subServicesTitle || 'Comprehensive Architectural Solutions'}
                </h2>
              </div>

              <Link to="/services" className="srv-view-all-link">
                <span>View All Services</span>
                <ArrowRight size={15} strokeWidth={2.2} />
              </Link>
            </div>

            {/* Sub-Service White Cards Grid */}
            <div className="srv-subservices-grid">
              {service.subServices.map((sub, sIdx) => (
                <div key={sIdx} className="srv-sub-card">
                  <div className="srv-sub-card-img-wrap">
                    <img src={sub.image || '/images/hero-villa.jpg'} alt={sub.title} loading="lazy" />
                    <div className="srv-sub-card-badge">
                      <span>0{sIdx + 1}</span>
                    </div>
                  </div>
                  <div className="srv-sub-card-body">
                    <h3 className="srv-sub-card-title">{sub.title}</h3>
                    <p className="srv-sub-card-desc">{sub.desc}</p>
                    <Link
                      to={`/contact?service=${encodeURIComponent(`${service.title} - ${sub.title}`)}`}
                      className="srv-sub-card-link"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 4 — OUR EXECUTION PROCESS (Solid Cream #F7F4EE with White Cards)
          ============================================================ */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="srv-process-section">
          <div className="container">
            <div className="srv-process-header text-center">
              <div className="srv-section-eyebrow-wrap justify-center">
                <span className="srv-eyebrow-line" />
                <span className="srv-section-eyebrow">OUR EXECUTION PROCESS</span>
                <span className="srv-eyebrow-line" />
              </div>

              <h2 className="srv-process-title">
                {service.processTitle || 'HOW WE BRING YOUR VISION TO LIFE'}
              </h2>

              <p className="srv-process-desc">
                A disciplined, milestone-driven workflow ensuring precision, premium craftsmanship and transparent progress.
              </p>
            </div>

            {/* 4 Connected White Cards Grid */}
            <div className="srv-process-grid">
              {service.processSteps.map((step, pIdx) => (
                <div key={pIdx} className="srv-process-col">
                  <div className="srv-process-card">
                    <div className="srv-proc-img-wrap">
                      <img src={step.image || '/images/process-step-1.jpg'} alt={step.subtitle} loading="lazy" />
                    </div>

                    {/* Circular Gold Number Badge */}
                    <div className="srv-proc-badge">
                      <span className="srv-proc-num">{step.num || `0${pIdx + 1}`}</span>
                    </div>

                    <div className="srv-proc-content">
                      <h3 className="srv-proc-stage">{step.stage}</h3>
                      <div className="srv-proc-sub">{step.subtitle}</div>
                      <p className="srv-proc-desc">{step.desc}</p>
                    </div>
                  </div>

                  {/* Desktop Connecting Arrow between adjacent cards */}
                  {pIdx < service.processSteps.length - 1 && (
                    <div className="srv-proc-arrow" aria-hidden="true">
                      <ArrowRight size={13} strokeWidth={2.4} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 5 — WHY CHOOSE SRI ANANDA NILAYAM (Solid Cream #F7F4EE with White Cards)
          ============================================================ */}
      <section className="srv-why-section">
        <div className="container">
          <div className="srv-why-header text-center">
            <div className="srv-section-eyebrow-wrap justify-center">
              <span className="srv-eyebrow-line" />
              <span className="srv-section-eyebrow">WHY CHOOSE SRI ANANDA NILAYAM</span>
              <span className="srv-eyebrow-line" />
            </div>

            <h2 className="srv-why-title">EXCELLENCE ENGINEERED INTO EVERY DETAIL</h2>
            <p className="srv-why-desc">
              We stand apart through architectural ingenuity, uncompromised structural rigor, and single-point accountability.
            </p>
          </div>

          <div className="srv-why-grid">
            {activeWhyChoose.map((item, wIdx) => (
              <div key={wIdx} className="srv-why-card">
                <div className="srv-why-icon-wrap">{item.icon}</div>
                <div className="srv-why-num">{item.num}</div>
                <h3 className="srv-why-card-title">{item.title}</h3>
                <p className="srv-why-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ============================================================
          SECTION 7 — FREQUENTLY ASKED QUESTIONS (Solid Cream #F7F4EE with White Accordion)
          ============================================================ */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="srv-faq-section">
          <div className="container srv-faq-container">
            <div className="srv-faq-header text-center">
              <div className="srv-section-eyebrow-wrap justify-center">
                <span className="srv-eyebrow-line" />
                <span className="srv-section-eyebrow">FREQUENTLY ASKED QUESTIONS</span>
                <span className="srv-eyebrow-line" />
              </div>

              <h2 className="srv-faq-title">{service.faqTitle || `CLARIFICATIONS ON ${service.title.toUpperCase()}`}</h2>
              <p className="srv-faq-desc">
                Everything you need to know about our workflow, material standards, and deliverables.
              </p>
            </div>

            <div className="srv-accordion-wrap">
              {service.faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className={`srv-accordion-item ${openFaq === fIdx ? 'active' : ''}`}
                >
                  <button
                    type="button"
                    className="srv-accordion-btn"
                    onClick={() => setOpenFaq(openFaq === fIdx ? -1 : fIdx)}
                    aria-expanded={openFaq === fIdx}
                  >
                    <span className="srv-faq-q">{faq.q || faq.question}</span>
                    <span className="srv-faq-chevron-wrap">
                      <ChevronDown
                        size={18}
                        className={`srv-faq-chevron ${openFaq === fIdx ? 'rotated' : ''}`}
                      />
                    </span>
                  </button>
                  {openFaq === fIdx && (
                    <div className="srv-accordion-body">
                      <p>{faq.a || faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 8 — CONSULTATION CALL-TO-ACTION SECTION (Wide Navy Card with Architectural Line Art)
          ============================================================ */}
      <section className="srv-cta-panel-section">
        <div className="container">
          <div className="portfolio-cta-card">
            {/* Background Architectural Blueprint Line Art */}
            <div className="cta-blueprint-art" aria-hidden="true">
              <svg width="340" height="240" viewBox="0 0 340 240" fill="none" stroke="rgba(234, 175, 53, 0.18)" strokeWidth="1.2">
                <rect x="20" y="40" width="300" height="180" rx="4" />
                <line x1="20" y1="90" x2="320" y2="90" />
                <line x1="20" y1="140" x2="320" y2="140" />
                <line x1="80" y1="40" x2="80" y2="220" />
                <line x1="160" y1="40" x2="160" y2="220" />
                <line x1="240" y1="40" x2="240" y2="220" />
                <circle cx="160" cy="115" r="18" />
                <line x1="40" y1="20" x2="300" y2="20" strokeDasharray="4 4" />
                <polygon points="170,10 150,40 190,40" stroke="rgba(234, 175, 53, 0.25)" />
              </svg>
            </div>

            <div className="cta-text-left">
              <div className="cta-eyebrow">
                <span className="cta-dash" />
                <span>{service.ctaEyebrow || "LET'S BUILD YOUR VISION"}</span>
                <span className="cta-dash" />
              </div>
              <h2 className="cta-heading">{service.ctaHeading || "HAVE A PROJECT IN MIND?"}</h2>
              <p className="cta-description">
                {service.ctaDescription || "Discuss your ideas with our expert team and turn them into a beautifully designed reality."}
              </p>
            </div>

            <div className="cta-actions-right">
              <Link
                to={`/contact?service=${encodeURIComponent(service?.title || 'General Consultation')}`}
                className="cta-btn-gold"
              >
                <span>{service.ctaButtonText || "Get a Free Consultation"}</span>
                <ArrowRight size={15} />
              </Link>
              <button
                type="button"
                className="cta-btn-whatsapp"
                onClick={handleWhatsAppClick}
              >
                <WhatsAppIcon size={17} />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          DESIGN SYSTEM STYLESHEET
          Main background: Warm Cream #F7F4EE
          Primary Navy: #102945 | Gold: #ECAF35 | White: #FFFFFF
          Main Text: #172B43 | Secondary Text: #687789
          ============================================================ */}
      <style>{`
        .service-detail-page-v2 {
          background-color: #F7F4EE;
          color: #172B43;
          overflow-x: hidden;
        }

        .service-detail-loading {
          padding: 8rem 1rem;
          background-color: #F7F4EE;
        }

        .service-loading-spinner {
          width: 48px;
          height: 48px;
          border: 3px solid rgba(236, 175, 53, 0.2);
          border-top-color: #ECAF35;
          border-radius: 50%;
          animation: srvSpin 0.9s linear infinite;
          margin: 0 auto 1.5rem auto;
        }

        .service-loading-text {
          font-family: var(--font-sans);
          font-size: 1rem;
          color: #687789;
        }

        @keyframes srvSpin {
          to { transform: rotate(360deg); }
        }

        /* ── Common Eyebrow Elements ── */
        .srv-section-eyebrow-wrap {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .srv-section-eyebrow-wrap.justify-center {
          justify-content: center;
        }

        .srv-eyebrow-line {
          width: 28px;
          height: 1.5px;
          background-color: #ECAF35;
          display: inline-block;
        }

        .srv-section-eyebrow {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2.2px;
          text-transform: uppercase;
          color: #ECAF35;
        }

        .text-gold {
          color: #ECAF35 !important;
        }

        /* ============================================================
           SECTION 1 — LUXURY ARCHITECTURAL HERO BANNER
           ============================================================ */
        .srv-hero {
          position: relative;
          min-height: 560px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          padding-top: 180px;
          padding-bottom: 85px;
          overflow: hidden;
          border-bottom: 1.5px solid rgba(236, 175, 53, 0.35);
        }

        .srv-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(7, 23, 43, 0.94) 0%,
            rgba(7, 23, 43, 0.88) 42%,
            rgba(7, 23, 43, 0.72) 72%,
            rgba(7, 23, 43, 0.5) 100%
          ),
          linear-gradient(
            180deg,
            rgba(5, 16, 31, 0.88) 0%,
            transparent 35%,
            rgba(7, 23, 43, 0.5) 75%,
            rgba(10, 29, 53, 0.98) 100%
          );
          z-index: 1;
        }

        .srv-hero-container {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3.5rem;
          width: 100%;
        }

        .srv-hero-left {
          flex: 1;
          max-width: 780px;
        }

        /* Frosted Glass Pill Breadcrumb */
        .srv-hero-pill-breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(16, 41, 69, 0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.45rem 1.25rem;
          border-radius: 9999px;
          font-family: var(--font-sans);
          font-size: 0.84rem;
          color: #94A3B8;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
        }

        .srv-bc-home,
        .srv-bc-link {
          color: #CBD5E1;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .srv-bc-home:hover,
        .srv-bc-link:hover {
          color: #ECAF35;
        }

        .srv-bc-slash {
          color: #ECAF35;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .srv-bc-current {
          color: #FFFFFF;
          font-weight: 600;
        }

        .srv-hero-eyebrow-wrap {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .srv-hero-eyebrow {
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 2.8px;
          text-transform: uppercase;
          color: #ECAF35;
        }

        .srv-hero-title {
          font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
          font-size: clamp(2.5rem, 4.6vw, 4.2rem);
          font-weight: 800;
          line-height: 1.15;
          color: #FFFFFF !important;
          margin: 0 0 1.25rem 0;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-shadow: 0 4px 24px rgba(0, 0, 0, 0.75), 0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .srv-hero-desc {
          font-family: var(--font-sans);
          font-size: clamp(1.02rem, 1.35vw, 1.14rem);
          color: rgba(226, 232, 240, 0.92);
          line-height: 1.75;
          margin: 0 0 2rem 0;
          max-width: 680px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
        }

        .srv-hero-highlights {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          flex-wrap: wrap;
        }

        .srv-hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background: rgba(16, 41, 69, 0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(236, 175, 53, 0.38);
          padding: 0.55rem 1.25rem 0.55rem 0.65rem;
          border-radius: 9999px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .srv-hero-pill:hover {
          transform: translateY(-2px);
          border-color: #ECAF35;
          box-shadow: 0 8px 24px rgba(236, 175, 53, 0.3);
        }

        .srv-pill-icon-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ECAF35;
          color: #102945;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(236, 175, 53, 0.4);
        }

        .srv-pill-label {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 600;
          color: #FFFFFF;
          letter-spacing: 0.2px;
          white-space: nowrap;
        }

        /* Right Column: Architectural Seal / Trust Badge */
        .srv-hero-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-shrink: 0;
        }

        .srv-hero-floating-card {
          background: rgba(10, 27, 51, 0.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1.5px solid rgba(236, 175, 53, 0.4);
          border-radius: 20px;
          padding: 1.75rem 2rem;
          max-width: 360px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .srv-hero-floating-card:hover {
          transform: translateY(-3px);
          border-color: #ECAF35;
        }

        .srv-hero-badge-header {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          margin-bottom: 1.1rem;
          padding-bottom: 1.1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .srv-badge-gold-crest {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: 2px solid #ECAF35;
          background: rgba(236, 175, 53, 0.14);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 14px rgba(236, 175, 53, 0.35);
        }

        .crest-num {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 800;
          color: #ECAF35;
          line-height: 1;
        }

        .crest-lbl {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #FFFFFF;
          letter-spacing: 0.5px;
        }

        .srv-badge-title-block {
          display: flex;
          flex-direction: column;
        }

        .srv-badge-sub {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 700;
          color: #ECAF35;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          line-height: 1.3;
        }

        .srv-badge-main {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.25;
        }

        .srv-badge-desc {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: #CBD5E1;
          line-height: 1.6;
          margin: 0 0 1.25rem 0;
        }

        .srv-badge-stats {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(6, 17, 33, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 0.65rem 0.85rem;
        }

        .srv-mini-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .stat-val {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 800;
          color: #ECAF35;
          line-height: 1.1;
        }

        .stat-lbl {
          font-family: var(--font-sans);
          font-size: 0.68rem;
          color: #94A3B8;
          font-weight: 500;
          margin-top: 0.15rem;
          white-space: nowrap;
        }

        .srv-stat-divider {
          width: 1px;
          height: 28px;
          background: rgba(255, 255, 255, 0.12);
        }

        @media (max-width: 1100px) {
          .srv-hero-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 2.5rem;
          }

          .srv-hero-right {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .srv-hero {
            padding-top: 145px;
            padding-bottom: 60px;
            min-height: auto;
          }

          .srv-hero-title {
            font-size: 2.2rem;
          }

          .srv-hero-desc {
            font-size: 0.98rem;
            margin-bottom: 1.5rem;
          }

          .srv-hero-pill {
            padding: 0.45rem 0.95rem;
          }

          .srv-pill-label {
            font-size: 0.8rem;
            white-space: normal;
          }
        }

        /* ============================================================
           SECTION 2 — OVERVIEW & SCOPE (Cream #F7F4EE)
           ============================================================ */
        .srv-overview-section {
          background-color: #F7F4EE;
          padding: 5.5rem 0;
          position: relative;
          z-index: 1;
        }

        .srv-overview-container {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 3.5rem;
          align-items: flex-start;
        }

        .srv-overview-left {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .srv-overview-title {
          font-family: 'Cinzel', Georgia, serif;
          font-size: clamp(2.1rem, 3.4vw, 2.85rem);
          font-weight: 800;
          line-height: 1.25;
          color: #07172B !important;
          margin: 0 0 1.25rem 0;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .srv-overview-desc {
          font-family: var(--font-sans);
          font-size: 1.02rem;
          line-height: 1.8;
          color: #172B43;
          margin: 0 0 2rem 0;
        }

        /* 4 Key Benefits in 2-Column Grid */
        .srv-checklist-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }

        .srv-checklist-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .srv-check-icon-wrap {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ECAF35;
          color: #102945;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .srv-check-text {
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 600;
          color: #172B43;
          line-height: 1.5;
        }

        /* 3-Image Clean Content Gallery */
        .srv-collage-wrap {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          grid-template-rows: 350px;
          gap: 1.25rem;
          height: 350px;
          max-height: 350px;
          margin-top: 1rem;
          border-radius: 16px;
          overflow: hidden;
        }

        .srv-collage-main {
          height: 350px;
          max-height: 350px;
          min-height: 0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px -4px rgba(16, 41, 69, 0.12);
        }

        .srv-collage-main img {
          width: 100%;
          height: 100%;
          max-height: 350px;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .srv-collage-main:hover img {
          transform: scale(1.03);
        }

        .srv-collage-subs {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 350px;
          max-height: 350px;
          min-height: 0;
          overflow: hidden;
        }

        .srv-collage-sub-box {
          flex: 1 1 0;
          height: calc(50% - 0.5rem);
          max-height: calc(50% - 0.5rem);
          min-height: 0;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(16, 41, 69, 0.08);
        }

        .srv-collage-sub-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .srv-collage-sub-box:hover img {
          transform: scale(1.04);
        }

        /* Right Column: Navy Consultation Card */
        .srv-overview-right {
          position: sticky;
          top: 110px;
        }

        .srv-consult-card {
          background: #102945;
          border: 1.5px solid #ECAF35;
          border-radius: 20px;
          padding: 2.25rem 2rem;
          box-shadow: 0 16px 40px -8px rgba(16, 41, 69, 0.3);
          color: #FFFFFF;
        }

        .srv-card-eyebrow {
          font-family: var(--font-sans);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #ECAF35;
          display: block;
          margin-bottom: 0.4rem;
        }

        .srv-consult-card-title {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 0.85rem 0;
          letter-spacing: 0.5px;
        }

        .srv-consult-card-intro {
          font-family: var(--font-sans);
          font-size: 0.92rem;
          color: #CBD5E1;
          line-height: 1.6;
          margin: 0 0 1.5rem 0;
        }

        .srv-consult-points {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.85rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .srv-consult-point-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .srv-point-icon-badge {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ECAF35;
          color: #102945;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .srv-point-text {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          color: #E2E8F0;
          font-weight: 500;
        }

        .srv-consult-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .srv-btn-gold {
          background: linear-gradient(135deg, #F3C35B 0%, #ECAF35 100%);
          color: #102945;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 700;
          padding: 0.9rem 1.6rem;
          border-radius: 50px;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          box-shadow: 0 6px 20px rgba(236, 175, 53, 0.35);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .srv-btn-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(236, 175, 53, 0.5);
          color: #102945;
        }

        .srv-btn-whatsapp {
          background: rgba(255, 255, 255, 0.05);
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.85rem 1.6rem;
          border-radius: 50px;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          transition: all 0.25s ease;
        }

        .srv-btn-whatsapp:hover {
          border-color: #25D366;
          color: #25D366;
          background: rgba(37, 211, 102, 0.1);
        }

        .srv-consult-phone-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: #94A3B8;
        }

        .srv-phone-icon {
          color: #ECAF35;
        }

        .srv-consult-phone-note a {
          color: #FFFFFF;
          text-decoration: none;
          font-weight: 600;
        }

        .srv-consult-phone-note a:hover {
          color: #ECAF35;
        }

        /* ============================================================
           SECTION 3 — OUR EXPERTISE / SUB-SERVICES (Solid Cream #F7F4EE)
           ============================================================ */
        .srv-subservices-section {
          background-color: #F7F4EE;
          padding: 5.5rem 0;
          color: #172B43;
          border-top: 1px solid rgba(16, 41, 69, 0.08);
          position: relative;
          z-index: 2;
          clear: both;
        }

        .srv-subservices-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3.25rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .srv-subservices-title {
          font-family: 'Cinzel', Georgia, serif;
          font-size: clamp(2.1rem, 3.4vw, 2.85rem);
          font-weight: 800;
          color: #07172B !important;
          margin: 0;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .srv-view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 700;
          color: #102945;
          text-decoration: none;
          padding: 0.65rem 1.4rem;
          border: 1.5px solid rgba(16, 41, 69, 0.2);
          border-radius: 50px;
          transition: all 0.25s ease;
          background: #FFFFFF;
        }

        .srv-view-all-link:hover {
          border-color: #ECAF35;
          color: #ECAF35;
          background: #102945;
        }

        .srv-subservices-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .srv-sub-card {
          background: #FFFFFF;
          border: 1px solid rgba(16, 41, 69, 0.08);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(16, 41, 69, 0.05);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .srv-sub-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(16, 41, 69, 0.1);
          border-color: #ECAF35;
        }

        .srv-sub-card-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .srv-sub-card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .srv-sub-card:hover .srv-sub-card-img-wrap img {
          transform: scale(1.05);
        }

        .srv-sub-card-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(16, 41, 69, 0.9);
          backdrop-filter: blur(4px);
          border: 1px solid #ECAF35;
          color: #ECAF35;
          font-family: var(--font-sans);
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
        }

        .srv-sub-card-body {
          padding: 1.6rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .srv-sub-card-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: #102945;
          margin: 0 0 0.65rem 0;
          line-height: 1.3;
        }

        .srv-sub-card-desc {
          font-family: var(--font-sans);
          font-size: 0.92rem;
          color: #687789;
          line-height: 1.6;
          margin: 0 0 1.25rem 0;
          flex: 1;
        }

        .srv-sub-card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.86rem;
          font-weight: 700;
          color: #ECAF35;
          text-decoration: none;
          transition: transform 0.2s ease, color 0.2s ease;
          align-self: flex-start;
        }

        .srv-sub-card-link:hover {
          color: #102945;
          transform: translateX(4px);
        }

        /* ============================================================
           SECTION 4 — OUR EXECUTION PROCESS (Solid Cream #F7F4EE)
           ============================================================ */
        .srv-process-section {
          background-color: #F7F4EE;
          padding: 5.5rem 0;
          border-top: 1px solid rgba(16, 41, 69, 0.08);
        }

        .srv-process-header {
          max-width: 780px;
          margin: 0 auto 3.5rem auto;
        }

        .srv-process-title {
          font-family: 'Cinzel', Georgia, serif;
          font-size: clamp(2.1rem, 3.4vw, 2.85rem);
          font-weight: 800;
          color: #07172B !important;
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .srv-process-desc {
          font-family: var(--font-sans);
          font-size: 1rem;
          color: #687789;
          line-height: 1.7;
          margin: 0;
        }

        .srv-process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .srv-process-col {
          position: relative;
          display: flex;
          align-items: stretch;
        }

        .srv-process-card {
          background: #FFFFFF;
          border: 1px solid rgba(16, 41, 69, 0.08);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(16, 41, 69, 0.05);
          display: flex;
          flex-direction: column;
          width: 100%;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .srv-process-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 26px rgba(16, 41, 69, 0.1);
        }

        .srv-proc-img-wrap {
          height: 150px;
          overflow: hidden;
        }

        .srv-proc-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .srv-proc-badge {
          position: absolute;
          top: 130px;
          left: 1.5rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ECAF35;
          color: #102945;
          font-family: var(--font-sans);
          font-weight: 800;
          font-size: 0.94rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(236, 175, 53, 0.4);
          z-index: 2;
        }

        .srv-proc-content {
          padding: 2.2rem 1.4rem 1.6rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .srv-proc-stage {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 700;
          color: #ECAF35;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          margin: 0 0 0.35rem 0;
        }

        .srv-proc-sub {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: #102945;
          margin-bottom: 0.65rem;
          line-height: 1.3;
        }

        .srv-proc-desc {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          color: #687789;
          line-height: 1.6;
          margin: 0;
        }

        .srv-proc-arrow {
          position: absolute;
          top: 75px;
          right: -14px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #102945;
          color: #ECAF35;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        /* ============================================================
           SECTION 5 — WHY CHOOSE SRI ANANDA NILAYAM (Solid Cream #F7F4EE)
           ============================================================ */
        .srv-why-section {
          background-color: #F7F4EE;
          padding: 5.5rem 0;
          color: #172B43;
          border-top: 1px solid rgba(16, 41, 69, 0.08);
        }

        .srv-why-header {
          max-width: 780px;
          margin: 0 auto 3.5rem auto;
        }

        .srv-why-title {
          font-family: 'Cinzel', Georgia, serif;
          font-size: clamp(2.1rem, 3.4vw, 2.85rem);
          font-weight: 800;
          color: #07172B !important;
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .srv-why-desc {
          font-family: var(--font-sans);
          font-size: 1rem;
          color: #687789;
          line-height: 1.7;
          margin: 0;
        }

        .srv-why-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .srv-why-card {
          background: #FFFFFF;
          border: 1px solid rgba(16, 41, 69, 0.08);
          border-radius: 18px;
          padding: 2rem 1.6rem;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 4px 18px rgba(16, 41, 69, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .srv-why-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(16, 41, 69, 0.1);
          border-color: #ECAF35;
        }

        .srv-why-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(236, 175, 53, 0.14);
          color: #ECAF35;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.4rem;
        }

        .srv-why-num {
          position: absolute;
          top: 1.6rem;
          right: 1.6rem;
          font-family: var(--font-sans);
          font-size: 1.15rem;
          font-weight: 800;
          color: rgba(16, 41, 69, 0.15);
        }

        .srv-why-card-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: #102945;
          margin: 0 0 0.65rem 0;
        }

        .srv-why-card-desc {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: #687789;
          line-height: 1.6;
          margin: 0;
        }


        /* ============================================================
           SECTION 7 — FREQUENTLY ASKED QUESTIONS (Solid Cream #F7F4EE)
           ============================================================ */
        .srv-faq-section {
          background-color: #F7F4EE;
          padding: 5.5rem 0;
          border-top: 1px solid rgba(16, 41, 69, 0.08);
        }

        .srv-faq-container {
          max-width: 860px;
          margin: 0 auto;
        }

        .srv-faq-header {
          margin-bottom: 3.5rem;
        }

        .srv-faq-title {
          font-family: 'Cinzel', Georgia, serif;
          font-size: clamp(2rem, 3.2vw, 2.65rem);
          font-weight: 800;
          line-height: 1.25;
          color: #07172B !important;
          margin: 0 0 0.85rem 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .srv-faq-desc {
          font-family: var(--font-sans);
          font-size: 0.98rem;
          color: #687789;
          margin: 0;
        }

        .srv-accordion-wrap {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .srv-accordion-item {
          background: #FFFFFF;
          border: 1px solid rgba(16, 41, 69, 0.1);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(16, 41, 69, 0.04);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .srv-accordion-item.active {
          border-color: #ECAF35;
          box-shadow: 0 8px 24px -4px rgba(236, 175, 53, 0.15);
        }

        .srv-accordion-btn {
          width: 100%;
          background: none;
          border: none;
          padding: 1.4rem 1.6rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          cursor: pointer;
          gap: 1rem;
        }

        .srv-faq-q {
          font-family: var(--font-sans);
          font-size: 1.02rem;
          font-weight: 700;
          color: #102945;
          line-height: 1.4;
        }

        .srv-faq-chevron-wrap {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #F8FAFC;
          border: 1px solid rgba(16, 41, 69, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #102945;
          flex-shrink: 0;
          transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;
        }

        .srv-accordion-item.active .srv-faq-chevron-wrap {
          background: #ECAF35;
          color: #102945;
          border-color: #ECAF35;
        }

        .srv-faq-chevron {
          transition: transform 0.3s ease;
        }

        .srv-faq-chevron.rotated {
          transform: rotate(180deg);
        }

        .srv-accordion-body {
          padding: 0 1.6rem 1.4rem 1.6rem;
        }

        .srv-accordion-body p {
          font-family: var(--font-sans);
          font-size: 0.94rem;
          color: #475569;
          line-height: 1.7;
          margin: 0;
        }

        /* ============================================================
           SECTION 8 — CONSULTATION CALL-TO-ACTION SECTION (Reference Design)
           ============================================================ */
        .srv-cta-panel-section {
          background-color: #F7F4EE;
          padding: 0 0 5.5rem 0;
        }

        .portfolio-cta-card {
          position: relative;
          background: #07172B;
          border: 1px solid rgba(234, 175, 53, 0.28);
          border-radius: 20px;
          padding: 3.5rem 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2.5rem;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(7, 23, 43, 0.35);
        }

        .cta-blueprint-art {
          position: absolute;
          right: -10px;
          bottom: -10px;
          pointer-events: none;
          opacity: 0.8;
        }

        .cta-text-left {
          position: relative;
          z-index: 2;
          max-width: 600px;
        }

        .cta-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          color: #EAAF35;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .cta-dash {
          width: 24px;
          height: 1.5px;
          background: #EAAF35;
        }

        .cta-heading {
          font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 3.2vw, 2.75rem);
          font-weight: 700;
          color: #FFFFFF !important;
          margin: 0 0 0.75rem 0;
          letter-spacing: 0.02em;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .cta-description {
          font-family: var(--font-sans);
          font-size: 1rem;
          color: #CBD5E1;
          line-height: 1.65;
          margin: 0;
        }

        .cta-actions-right {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 1.15rem;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        .cta-btn-gold {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background: linear-gradient(135deg, #F5BF4A 0%, #EAAF35 100%);
          color: #07172B;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 700;
          padding: 0.95rem 1.85rem;
          border-radius: 9999px;
          text-decoration: none;
          border: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(234, 175, 53, 0.4);
          white-space: nowrap;
        }

        .cta-btn-gold:hover {
          background: #F5BF4A;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(234, 175, 53, 0.55);
        }

        .cta-btn-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background: #0B2038;
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 600;
          padding: 0.95rem 1.75rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .cta-btn-whatsapp:hover {
          background: #102844;
          border-color: rgba(234, 175, 53, 0.4);
          color: #F5BF4A;
          transform: translateY(-2px);
        }

        /* ============================================================
           RESPONSIVE MEDIA QUERIES
           ============================================================ */
        @media (max-width: 1200px) {
          .srv-process-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }

          .srv-proc-arrow {
            display: none;
          }

          .srv-why-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }


        }

        @media (max-width: 992px) {
          .srv-overview-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .srv-overview-right {
            position: static;
          }

          .srv-subservices-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .portfolio-cta-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 2.5rem 2rem;
          }

          .cta-actions-right {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .srv-hero {
            padding-top: 130px;
            padding-bottom: 50px;
            min-height: auto;
          }

          .srv-checklist-grid {
            grid-template-columns: 1fr;
          }

          .srv-collage-wrap {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            height: auto;
            max-height: none;
          }

          .srv-collage-main {
            height: 240px;
            max-height: 240px;
          }

          .srv-collage-subs {
            flex-direction: row;
            height: 140px;
            max-height: 140px;
          }

          .srv-collage-sub-box {
            height: 100%;
            max-height: 100%;
          }

          .srv-subservices-grid {
            grid-template-columns: 1fr;
          }

          .srv-process-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .srv-why-grid {
            grid-template-columns: 1fr;
          }

          .srv-subservices-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .srv-btn-gold,
          .srv-btn-whatsapp,
          .srv-btn-navy-outline,
          .cta-btn-gold,
          .cta-btn-whatsapp {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
