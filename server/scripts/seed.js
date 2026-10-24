require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Service = require('../models/Service');
const Project = require('../models/Project');
const GalleryImage = require('../models/GalleryImage');
const Testimonial = require('../models/Testimonial');
const SiteSettings = require('../models/SiteSettings');
const Enquiry = require('../models/Enquiry');

const UNSPLASH_BASE = 'https://images.unsplash.com';

// ── SERVICES ─────────────────────────────────────────────────────────────────
const servicesData = [
  {
    title: 'Architectural Design',
    slug: 'architectural-design',
    shortDescription: 'Innovative architectural solutions that blend aesthetics with functionality for every project.',
    description: 'Our architectural design services cover every aspect of the design process, from initial concept to detailed construction drawings. We create spaces that are not only visually stunning but also highly functional and sustainable.',
    coverImage: `${UNSPLASH_BASE}/photo-1503387762-592deb58ef4e?w=800`,
    coverImageAlt: 'Architectural design blueprints and models',
    benefits: ['Custom design tailored to your needs', '3D visualizations before construction', 'Vastu-compliant designs available', 'Energy-efficient layouts', 'RERA-compliant documentation'],
    process: [
      { step: 1, title: 'Consultation', description: 'Initial meeting to understand your requirements and vision.' },
      { step: 2, title: 'Concept Design', description: 'Creating initial design concepts and mood boards.' },
      { step: 3, title: 'Detailed Design', description: 'Full architectural drawings, elevations and floor plans.' },
      { step: 4, title: 'Documentation', description: 'Permit drawings and construction documents.' },
    ],
    faqs: [
      { question: 'How long does architectural design take?', answer: 'Depending on project complexity, design typically takes 4–12 weeks.' },
      { question: 'Do you provide 3D visualizations?', answer: 'Yes, we provide photorealistic 3D renderings for all our design projects.' },
    ],
    order: 1, isFeatured: true, status: 'published',
  },
  {
    title: 'Residential Construction',
    slug: 'residential-construction',
    shortDescription: 'High-quality residential construction delivering your dream home on time and within budget.',
    description: 'We specialize in building premium residences that combine quality craftsmanship with modern techniques. From villas to apartments, we bring architectural visions to life with precision and care.',
    coverImage: `${UNSPLASH_BASE}/photo-1600585154340-be6161a56a0c?w=800`,
    coverImageAlt: 'Modern residential construction site',
    benefits: ['Quality materials and certified contractors', 'Transparent pricing and timelines', 'Vastu-compliant construction', 'On-site quality checks', 'Post-construction support'],
    process: [
      { step: 1, title: 'Site Survey', description: 'Soil testing and site evaluation.' },
      { step: 2, title: 'Foundation', description: 'Robust foundation work with quality materials.' },
      { step: 3, title: 'Structure', description: 'Column, beam and slab construction.' },
      { step: 4, title: 'Finishing', description: 'Plastering, painting and final finishes.' },
    ],
    faqs: [
      { question: 'How long does residential construction take?', answer: 'A typical 2,000 sq ft home takes 12–18 months from foundation to handover.' },
      { question: 'Do you handle approvals?', answer: 'Yes, we assist with all BBMP/local authority building plan approvals.' },
    ],
    order: 2, isFeatured: true, status: 'published',
  },
  {
    title: 'Commercial Construction',
    slug: 'commercial-construction',
    shortDescription: 'Efficient and modern commercial spaces designed for productivity and brand identity.',
    description: 'Our commercial construction expertise spans offices, retail spaces, showrooms and corporate campuses. We build functional, impressive commercial environments that reflect your brand.',
    coverImage: `${UNSPLASH_BASE}/photo-1486325212027-8081e485255e?w=800`,
    coverImageAlt: 'Modern commercial building exterior',
    benefits: ['Scalable design for future expansion', 'Compliance with commercial building codes', 'Fast-track construction options', 'Interior and exterior fitout', 'MEP coordination'],
    process: [
      { step: 1, title: 'Feasibility Study', description: 'Site analysis and project viability assessment.' },
      { step: 2, title: 'Design', description: 'Commercial architecture and interior planning.' },
      { step: 3, title: 'Construction', description: 'Efficient, scheduled construction management.' },
      { step: 4, title: 'Handover', description: 'Quality inspection, snagging and handover.' },
    ],
    faqs: [
      { question: 'Do you build commercial complexes?', answer: 'Yes, from small offices to large commercial complexes.' },
    ],
    order: 3, status: 'published',
  },
  {
    title: 'Interior Design',
    slug: 'interior-design',
    shortDescription: 'Creative interiors that transform your space into a beautiful, functional environment.',
    description: 'Our interior design services blend aesthetics with practicality. We craft interiors that reflect your personality and lifestyle, using a curated palette of materials, furniture and finishes.',
    coverImage: `${UNSPLASH_BASE}/photo-1618221195710-dd6b41faaea6?w=800`,
    coverImageAlt: 'Elegant modern interior design',
    benefits: ['Custom furniture and fit-outs', 'Space planning optimization', 'Premium material selection', '3D interior visualization', 'Turnkey interior execution'],
    process: [
      { step: 1, title: 'Design Brief', description: 'Understanding your style preferences and requirements.' },
      { step: 2, title: 'Concept Board', description: 'Mood boards, color palettes and material samples.' },
      { step: 3, title: '3D Design', description: 'Detailed 3D renders of every room.' },
      { step: 4, title: 'Execution', description: 'Coordinated execution with skilled craftsmen.' },
    ],
    faqs: [
      { question: 'How much does interior design cost?', answer: 'Costs vary by scope; we offer packages starting from ₹800/sq ft.' },
    ],
    order: 4, isFeatured: true, status: 'published',
  },
  {
    title: 'Modular Kitchen Design',
    slug: 'modular-kitchen',
    shortDescription: 'Stylish and functional modular kitchens tailored to your cooking style and space.',
    description: 'We design and install modular kitchens that are elegant, highly functional and built to last. Our kitchens combine premium hardware with smart storage solutions.',
    coverImage: `${UNSPLASH_BASE}/photo-1556909114-f6e7ad7d3136?w=800`,
    coverImageAlt: 'Premium modular kitchen design',
    benefits: ['Custom layouts: L, U, Island, Parallel', 'Premium finish options', 'Soft-close hardware', 'Quartz and granite countertops', 'Optimised storage solutions'],
    process: [
      { step: 1, title: 'Measurement', description: 'Precise kitchen space measurement.' },
      { step: 2, title: 'Design', description: 'Layout and finish selection.' },
      { step: 3, title: 'Manufacturing', description: 'Factory-made precision components.' },
      { step: 4, title: 'Installation', description: 'Expert installation and finishing.' },
    ],
    faqs: [
      { question: 'How long does a modular kitchen take?', answer: 'Typically 3–6 weeks from design approval to installation.' },
    ],
    order: 5, status: 'published',
  },
  {
    title: 'Renovation & Remodeling',
    slug: 'renovation-remodeling',
    shortDescription: 'Turnkey architectural restoration, structural retrofitting, and bespoke modern space re-engineering.',
    description: 'At Sri Ananda Nilayam, we view renovation as an architectural metamorphosis. We seamlessly merge the heritage of your existing property with modern open-concept spatial layouts, advanced structural retrofitting, and timeless luxury finishes.',
    coverImage: '/images/service-renovation.jpg',
    coverImageAlt: 'Luxury villa renovation and architectural remodeling by Sri Ananda Nilayam',
    benefits: [
      'Forensic structural audit & load-bearing capacity analysis',
      'Open-plan spatial reconfiguration & structural beam modifications',
      'Concealed plumbing, fire-retardant wiring & smart home automation',
      'Dust-containment negative pressure zones for minimum disruption',
      'Municipal sanction liaison for vertical floor additions & cantilever decks',
      '5-Year structural warranty & 3-year waterproofing certification',
    ],
    process: [
      { step: 1, title: 'Diagnose', description: 'Structural NDT testing, MEP forensic scan, and 3D digital as-built scanning.' },
      { step: 2, title: 'Engineer', description: 'Structural load calculation, phased demolition blueprints, and 100% locked-price BOQ.' },
      { step: 3, title: 'Execute', description: 'Dust-barrier containment, structural steel propping, high-grade civil retrofitting, and finishes.' },
      { step: 4, title: 'Reveal', description: '120-point quality audit, 72-hour plumbing pressure hold tests, and 5-year warranty handover.' },
    ],
    faqs: [
      { question: 'Can we stay in the home while the renovation is underway?', answer: 'For phased renovations, yes. We install heavy-duty zip-wall dust screens, negative-air filtration, and designated corridors to isolate the work zone.' },
      { question: 'How do you prevent unexpected costs during renovation?', answer: 'We conduct non-destructive structural scans and plumbing pressure tests beforehand to create a 100% itemized, fixed-price Bill of Quantities (BOQ).' },
      { question: 'Do structural modifications require municipal approvals?', answer: 'Load-bearing modifications and floor additions require municipal sanction. Our licensed structural team handles complete licensing and engineering vetting.' },
    ],
    order: 6, status: 'published',
  },
  {
    title: 'Turnkey Projects',
    slug: 'turnkey-projects',
    shortDescription: 'End-to-end project management — from foundation to furnished, ready to move in.',
    description: 'Our turnkey service handles every aspect of your project: design, construction, interior fit-out, furniture procurement and final finishing. One point of contact, zero hassle.',
    coverImage: `${UNSPLASH_BASE}/photo-1600607687920-4e2a09cf159d?w=800`,
    coverImageAlt: 'Completed turnkey luxury residence',
    benefits: ['Single point of accountability', 'Design + Build + Interior under one roof', 'Fixed price contracts available', 'Transparent milestone tracking', 'Ready-to-move-in delivery'],
    process: [
      { step: 1, title: 'Design', description: 'Architecture and interior design finalized.' },
      { step: 2, title: 'Construction', description: 'Complete civil construction.' },
      { step: 3, title: 'Interior Fit-out', description: 'Furniture, fixtures and fittings installed.' },
      { step: 4, title: 'Handover', description: 'Final inspection, keys and documentation.' },
    ],
    faqs: [
      { question: 'What does turnkey mean?', answer: 'You hand over the keys at the start and receive a fully finished property at handover.' },
    ],
    order: 7, status: 'published',
  },
  {
    title: 'Space Planning & Consultation',
    slug: 'space-planning',
    shortDescription: 'Professional space planning consultation to maximise functionality and flow in any space.',
    description: 'Our space planning service optimises how your space is used, ensuring every square foot serves a purpose. Ideal for new builds, office layouts and home reconfigurations.',
    coverImage: `${UNSPLASH_BASE}/photo-1497366216548-37526070297c?w=800`,
    coverImageAlt: 'Space planning consultation session',
    benefits: ['Floor plan optimization', 'Traffic flow analysis', 'Furniture layout planning', 'Vastu and Feng Shui guidance', 'Budget estimation'],
    process: [
      { step: 1, title: 'Site Visit', description: 'On-site measurement and analysis.' },
      { step: 2, title: 'Planning', description: 'Space utilization study and layout options.' },
      { step: 3, title: 'Presentation', description: 'Floor plan presentation and recommendations.' },
      { step: 4, title: 'Implementation', description: 'Guidance through implementation phase.' },
    ],
    faqs: [
      { question: 'How much does a consultation cost?', answer: 'Initial consultations start at ₹5,000, deductible from project cost if hired.' },
    ],
    order: 8, status: 'published',
  },
];

// ── PROJECTS ──────────────────────────────────────────────────────────────────
const projectsData = [
  {
    title: 'Modern Luxury Villa',
    slug: 'modern-luxury-villa',
    category: 'residential',
    location: 'Whitefield, Bengaluru',
    shortDescription: 'A stunning contemporary villa with 4 BHK layout, infinity pool and premium interiors.',
    description: '**Sample demonstration project.** This 5,200 sq ft villa showcases our capabilities in luxury residential construction. The project features an open-plan living area, home theatre, private gym and landscaped garden.',
    coverImage: `${UNSPLASH_BASE}/photo-1613490493576-7fde63acd811?w=900`,
    coverImageAlt: 'Modern luxury villa exterior with pool',
    images: [
      { url: `${UNSPLASH_BASE}/photo-1613490493576-7fde63acd811?w=900`, alt: 'Villa exterior', order: 1 },
      { url: `${UNSPLASH_BASE}/photo-1600585154340-be6161a56a0c?w=900`, alt: 'Villa living room', order: 2 },
    ],
    status: 'published', projectStatus: 'completed', isFeatured: true, area: '5,200 sq ft',
  },
  {
    title: 'Contemporary Family Residence',
    slug: 'contemporary-family-residence',
    category: 'residential',
    location: 'Sarjapur Road, Bengaluru',
    shortDescription: 'A warm and functional family home designed for modern living with Vastu compliance.',
    description: '**Sample demonstration project.** This 3,800 sq ft residence demonstrates our approach to creating family-friendly spaces that balance aesthetics with practicality.',
    coverImage: `${UNSPLASH_BASE}/photo-1600596542815-ffad4c1539a9?w=900`,
    coverImageAlt: 'Contemporary family home exterior',
    images: [
      { url: `${UNSPLASH_BASE}/photo-1600596542815-ffad4c1539a9?w=900`, alt: 'Home exterior', order: 1 },
    ],
    status: 'published', projectStatus: 'completed', isFeatured: true, area: '3,800 sq ft',
  },
  {
    title: 'Premium Apartment Interiors',
    slug: 'premium-apartment-interiors',
    category: 'interior',
    location: 'Koramangala, Bengaluru',
    shortDescription: 'Full interior design and fit-out for a 3 BHK luxury apartment with custom furniture.',
    description: '**Sample demonstration project.** Complete interior transformation of a 1,800 sq ft apartment featuring custom wardrobes, modular kitchen and curated art pieces.',
    coverImage: `${UNSPLASH_BASE}/photo-1618221195710-dd6b41faaea6?w=900`,
    coverImageAlt: 'Premium apartment interior living room',
    images: [
      { url: `${UNSPLASH_BASE}/photo-1618221195710-dd6b41faaea6?w=900`, alt: 'Living room interior', order: 1 },
      { url: `${UNSPLASH_BASE}/photo-1556909114-f6e7ad7d3136?w=900`, alt: 'Kitchen interior', order: 2 },
    ],
    status: 'published', projectStatus: 'completed', isFeatured: true, area: '1,800 sq ft',
  },
  {
    title: 'Modern Office Interior',
    slug: 'modern-office-interior',
    category: 'commercial',
    location: 'MG Road, Bengaluru',
    shortDescription: 'Contemporary corporate office design that enhances productivity and brand identity.',
    description: '**Sample demonstration project.** A 4,500 sq ft open-plan office with collaborative zones, private cabins and a premium reception area.',
    coverImage: `${UNSPLASH_BASE}/photo-1497366216548-37526070297c?w=900`,
    coverImageAlt: 'Modern corporate office interior',
    images: [
      { url: `${UNSPLASH_BASE}/photo-1497366216548-37526070297c?w=900`, alt: 'Office reception', order: 1 },
    ],
    status: 'published', projectStatus: 'completed', area: '4,500 sq ft',
  },
  {
    title: 'Commercial Building Design',
    slug: 'commercial-building-design',
    category: 'commercial',
    location: 'Electronic City, Bengaluru',
    shortDescription: 'G+4 commercial complex designed for retail and office spaces with modern facade.',
    description: '**Sample demonstration project.** A mixed-use commercial complex featuring retail on the ground floor and professional offices on upper floors.',
    coverImage: `${UNSPLASH_BASE}/photo-1486325212027-8081e485255e?w=900`,
    coverImageAlt: 'Modern commercial building exterior',
    status: 'published', projectStatus: 'completed', area: '18,000 sq ft',
  },
  {
    title: 'Modular Kitchen Project',
    slug: 'modular-kitchen-project',
    category: 'interior',
    location: 'HSR Layout, Bengaluru',
    shortDescription: 'Elegant L-shaped modular kitchen with quartz countertop and premium fittings.',
    description: '**Sample demonstration project.** A premium modular kitchen installation featuring German hardware, quartz countertops and custom cabinetry.',
    coverImage: `${UNSPLASH_BASE}/photo-1556909114-f6e7ad7d3136?w=900`,
    coverImageAlt: 'Elegant modular kitchen with premium fittings',
    status: 'published', projectStatus: 'completed', area: '240 sq ft',
  },
  {
    title: 'Luxury Bedroom Suite',
    slug: 'luxury-bedroom-suite',
    category: 'interior',
    location: 'Indiranagar, Bengaluru',
    shortDescription: 'Opulent master bedroom suite with custom walk-in wardrobe and en-suite bathroom.',
    description: '**Sample demonstration project.** A luxurious master bedroom featuring custom upholstered headboard, walk-in wardrobe and spa-inspired ensuite.',
    coverImage: `${UNSPLASH_BASE}/photo-1631049307264-da0ec9d70304?w=900`,
    coverImageAlt: 'Luxury master bedroom interior',
    status: 'published', projectStatus: 'completed', area: '600 sq ft',
  },
  {
    title: 'Villa Renovation Project',
    slug: 'villa-renovation-project',
    category: 'renovation',
    location: 'Jayanagar, Bengaluru',
    shortDescription: 'Complete transformation of a 20-year-old villa into a contemporary family residence.',
    description: '**Sample demonstration project.** Full renovation including structural repairs, new MEP, complete interior redesign and landscape upgrade.',
    coverImage: `${UNSPLASH_BASE}/photo-1562663474-6cbb3eaa4d14?w=900`,
    coverImageAlt: 'Renovated villa exterior',
    status: 'published', projectStatus: 'completed', area: '2,800 sq ft',
  },
  {
    title: 'Ongoing Premium Residence',
    slug: 'ongoing-premium-residence',
    category: 'ongoing',
    location: 'Hebbal, Bengaluru',
    shortDescription: 'A 4 BHK premium residence currently under construction — expected completion Q2 2026.',
    description: '**Sample demonstration project.** This ongoing project showcases our construction process transparency and quality milestone tracking.',
    coverImage: `${UNSPLASH_BASE}/photo-1503387762-592deb58ef4e?w=900`,
    coverImageAlt: 'Residence under construction',
    status: 'published', projectStatus: 'ongoing', isFeatured: false, area: '4,200 sq ft',
  },
  {
    title: 'Boutique Hotel Interior',
    slug: 'boutique-hotel-interior',
    category: 'commercial',
    location: 'Coorg, Karnataka',
    shortDescription: 'Boutique eco-lodge interior design celebrating local heritage and natural materials.',
    description: '**Sample demonstration project.** An eco-lodge interior featuring natural stone, reclaimed wood and local textile artworks.',
    coverImage: `${UNSPLASH_BASE}/photo-1566073771259-6a8506099945?w=900`,
    coverImageAlt: 'Boutique hotel interior design',
    status: 'published', projectStatus: 'completed', isFeatured: false, area: '8,000 sq ft',
  },
];

// ── GALLERY ───────────────────────────────────────────────────────────────────
const galleryData = [
  { url: `${UNSPLASH_BASE}/photo-1613490493576-7fde63acd811?w=800`, alt: 'Luxury villa exterior', caption: 'Modern Luxury Villa — Whitefield', category: 'exterior', order: 1 },
  { url: `${UNSPLASH_BASE}/photo-1600585154340-be6161a56a0c?w=800`, alt: 'Contemporary residence exterior', caption: 'Contemporary Residence — Sarjapur', category: 'exterior', order: 2 },
  { url: `${UNSPLASH_BASE}/photo-1600596542815-ffad4c1539a9?w=800`, alt: 'Modern home facade', caption: 'Modern Home Design', category: 'exterior', order: 3 },
  { url: `${UNSPLASH_BASE}/photo-1486325212027-8081e485255e?w=800`, alt: 'Commercial building', caption: 'Commercial Building — Electronic City', category: 'exterior', order: 4 },
  { url: `${UNSPLASH_BASE}/photo-1618221195710-dd6b41faaea6?w=800`, alt: 'Elegant living room', caption: 'Premium Living Room Interior', category: 'interior', order: 5 },
  { url: `${UNSPLASH_BASE}/photo-1631049307264-da0ec9d70304?w=800`, alt: 'Luxury bedroom', caption: 'Luxury Master Bedroom Suite', category: 'interior', order: 6 },
  { url: `${UNSPLASH_BASE}/photo-1497366216548-37526070297c?w=800`, alt: 'Modern office interior', caption: 'Corporate Office — MG Road', category: 'interior', order: 7 },
  { url: `${UNSPLASH_BASE}/photo-1556909114-f6e7ad7d3136?w=800`, alt: 'Modular kitchen', caption: 'Premium Modular Kitchen', category: 'kitchen', order: 8 },
  { url: `${UNSPLASH_BASE}/photo-1566073771259-6a8506099945?w=800`, alt: 'Hotel interior', caption: 'Boutique Hotel Interior', category: 'interior', order: 9 },
  { url: `${UNSPLASH_BASE}/photo-1562663474-6cbb3eaa4d14?w=800`, alt: 'Renovation project', caption: 'Villa Renovation — Jayanagar', category: 'renovation', order: 10 },
  { url: `${UNSPLASH_BASE}/photo-1503387762-592deb58ef4e?w=800`, alt: 'Architectural drawings', caption: 'Architectural Design Process', category: 'construction', order: 11 },
  { url: `${UNSPLASH_BASE}/photo-1600607687920-4e2a09cf159d?w=800`, alt: 'Turnkey villa interior', caption: 'Turnkey Project — Premium Villa', category: 'interior', order: 12 },
  { url: `${UNSPLASH_BASE}/photo-1558618666-fcd25c85cd64?w=800`, alt: 'Construction site', caption: 'Active Construction Site', category: 'construction', order: 13 },
  { url: `${UNSPLASH_BASE}/photo-1600121848594-d8644e57abab?w=800`, alt: 'Modern kitchen design', caption: 'Open Kitchen Design', category: 'kitchen', order: 14 },
  { url: `${UNSPLASH_BASE}/photo-1524758631624-e2822e304c36?w=800`, alt: 'Bedroom design', caption: 'Guest Bedroom Design', category: 'interior', order: 15 },
  { url: `${UNSPLASH_BASE}/photo-1507089947368-19c1da9775ae?w=800`, alt: 'Renovation before after', caption: 'Renovation Transformation', category: 'renovation', order: 16 },
];

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
const testimonialsData = [
  {
    clientName: 'Rajesh Sharma',
    clientTitle: 'Homeowner',
    text: '⚠️ Sample testimonial for demonstration purposes. Sri Ananda Nilayam transformed our vision into a beautiful home. The attention to detail and quality of construction exceeded our expectations. Highly recommend their turnkey service.',
    rating: 5, projectCategory: 'Residential Construction', projectTitle: 'Modern Luxury Villa', isFeatured: true, isPublished: true, order: 1,
  },
  {
    clientName: 'Priya Nair',
    clientTitle: 'Interior Design Client',
    text: '⚠️ Sample testimonial for demonstration purposes. The interior design team was phenomenal. They listened to every requirement and delivered a home that feels uniquely ours. The modular kitchen is especially stunning.',
    rating: 5, projectCategory: 'Interior Design', projectTitle: 'Premium Apartment Interiors', isFeatured: true, isPublished: true, order: 2,
  },
  {
    clientName: 'Anand Krishnamurthy',
    clientTitle: 'Business Owner',
    text: '⚠️ Sample testimonial for demonstration purposes. Our office renovation was completed ahead of schedule with outstanding quality. The team was professional, transparent and delivered exactly what was promised.',
    rating: 5, projectCategory: 'Commercial Construction', projectTitle: 'Modern Office Interior', isFeatured: false, isPublished: true, order: 3,
  },
  {
    clientName: 'Sunita Reddy',
    clientTitle: 'Home Renovation Client',
    text: '⚠️ Sample testimonial for demonstration purposes. The renovation team was efficient and respectful of our living space. They minimised disruption and the result is beyond what we imagined.',
    rating: 4, projectCategory: 'Renovation', projectTitle: 'Villa Renovation Project', isFeatured: false, isPublished: true, order: 4,
  },
  {
    clientName: 'Vikram Mehta',
    clientTitle: 'Real Estate Developer',
    text: '⚠️ Sample testimonial for demonstration purposes. We partnered for a commercial project and the expertise, project management and final output were truly professional. Will definitely work with them again.',
    rating: 5, projectCategory: 'Commercial', isFeatured: true, isPublished: true, order: 5,
  },
];

// ── SETTINGS ──────────────────────────────────────────────────────────────────
const settingsData = [
  { key: 'company_name', value: 'Sri Ananda Nilayam', group: 'general', label: 'Company Name', type: 'string' },
  { key: 'company_tagline', value: 'DESIGN | CONSTRUCTION | INTERIORS', group: 'general', label: 'Tagline', type: 'string' },
  { key: 'phone', value: '+91 98765 43210', group: 'contact', label: 'Phone Number', type: 'string' },
  { key: 'whatsapp', value: '+919876543210', group: 'contact', label: 'WhatsApp Number', type: 'string' },
  { key: 'email', value: 'info@srianandanilayam.example', group: 'contact', label: 'Email', type: 'string' },
  { key: 'address', value: '123 Main Road, Bengaluru, Karnataka 560001', group: 'contact', label: 'Address', type: 'string' },
  { key: 'working_hours', value: 'Monday – Saturday, 9:00 AM – 6:00 PM', group: 'contact', label: 'Working Hours', type: 'string' },
  { key: 'hero_title', value: 'Designing Dreams. Building Realities.', group: 'homepage', label: 'Hero Title', type: 'string' },
  { key: 'hero_subtitle', value: 'Your trusted partner for architectural design, quality construction and premium interiors. We transform your vision into beautifully designed spaces built to last.', group: 'homepage', label: 'Hero Subtitle', type: 'string' },
  { key: 'stat_years', value: '10+', group: 'stats', label: 'Years of Experience', type: 'string' },
  { key: 'stat_clients', value: '150+', group: 'stats', label: 'Happy Clients', type: 'string' },
  { key: 'stat_projects', value: '200+', group: 'stats', label: 'Projects Completed', type: 'string' },
  { key: 'stat_team', value: '50+', group: 'stats', label: 'Expert Team Members', type: 'string' },
  { key: 'facebook_url', value: '#', group: 'social', label: 'Facebook URL', type: 'string' },
  { key: 'instagram_url', value: '#', group: 'social', label: 'Instagram URL', type: 'string' },
  { key: 'youtube_url', value: '#', group: 'social', label: 'YouTube URL', type: 'string' },
  { key: 'linkedin_url', value: '#', group: 'social', label: 'LinkedIn URL', type: 'string' },
  { key: 'footer_credit', value: 'Designed and developed by bookmywebsite.in', group: 'footer', label: 'Footer Credit', type: 'string' },
  { key: 'meta_title', value: 'Sri Ananda Nilayam — Design | Construction | Interiors', group: 'seo', label: 'Default Meta Title', type: 'string' },
  { key: 'meta_description', value: 'Sri Ananda Nilayam offers premium architectural design, residential and commercial construction, and interior design services in Bengaluru.', group: 'seo', label: 'Default Meta Description', type: 'string' },
];

// ── SAMPLE ENQUIRIES ──────────────────────────────────────────────────────────
const enquiriesData = [
  { fullName: 'Sample Client A', phone: '+91 98000 00001', email: 'clienta@example.com', serviceRequired: 'Residential Construction', projectLocation: 'Whitefield', estimatedBudget: '₹1–1.5 Crore', message: 'Interested in building a 4 BHK villa.', status: 'new' },
  { fullName: 'Sample Client B', phone: '+91 98000 00002', email: 'clientb@example.com', serviceRequired: 'Interior Design', projectLocation: 'Koramangala', estimatedBudget: '₹15–20 Lakhs', message: 'Need interior design for my new apartment.', status: 'contacted' },
  { fullName: 'Sample Client C', phone: '+91 98000 00003', email: 'clientc@example.com', serviceRequired: 'Modular Kitchen', projectLocation: 'HSR Layout', estimatedBudget: '₹3–5 Lakhs', message: 'Looking for a premium modular kitchen.', status: 'qualified' },
  { fullName: 'Sample Client D', phone: '+91 98000 00004', email: 'clientd@example.com', serviceRequired: 'Renovation', projectLocation: 'Jayanagar', estimatedBudget: '₹10–15 Lakhs', message: 'Renovation of 20-year-old house.', status: 'converted' },
  { fullName: 'Sample Client E', phone: '+91 98000 00005', serviceRequired: 'Architectural Design', projectLocation: 'Sarjapur', estimatedBudget: '₹50 Lakhs+', message: 'Commercial building design required.', status: 'closed' },
  { fullName: 'Sample Client F', phone: '+91 98000 00006', email: 'clientf@example.com', serviceRequired: 'Turnkey Projects', projectLocation: 'Hebbal', estimatedBudget: '₹2–3 Crore', message: 'Interested in a complete turnkey villa.', status: 'new' },
];

// ── SEED RUNNER ───────────────────────────────────────────────────────────────
async function seed() {
  await connectDB();
  console.log('🌱 Seeding database...');

  // Services
  for (const s of servicesData) {
    await Service.findOneAndUpdate({ slug: s.slug }, s, { upsert: true, new: true });
  }
  console.log(`✅ Seeded ${servicesData.length} services`);

  // Projects
  for (const p of projectsData) {
    await Project.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
  }
  console.log(`✅ Seeded ${projectsData.length} projects`);

  // Gallery
  for (const g of galleryData) {
    await GalleryImage.findOneAndUpdate({ url: g.url }, g, { upsert: true, new: true });
  }
  console.log(`✅ Seeded ${galleryData.length} gallery images`);

  // Testimonials
  for (const t of testimonialsData) {
    await Testimonial.findOneAndUpdate({ clientName: t.clientName }, t, { upsert: true, new: true });
  }
  console.log(`✅ Seeded ${testimonialsData.length} testimonials`);

  // Settings
  for (const s of settingsData) {
    await SiteSettings.findOneAndUpdate({ key: s.key }, s, { upsert: true, new: true });
  }
  console.log(`✅ Seeded ${settingsData.length} site settings`);

  // Enquiries (sample only — only if none exist)
  const existingEnquiries = await Enquiry.countDocuments();
  if (existingEnquiries === 0) {
    await Enquiry.insertMany(enquiriesData.map(e => ({ ...e, statusHistory: [{ status: e.status, changedAt: new Date() }] })));
    console.log(`✅ Seeded ${enquiriesData.length} sample enquiries`);
  } else {
    console.log('ℹ️  Enquiries already exist, skipping sample enquiry seed');
  }

  console.log('🎉 Seeding complete!');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
