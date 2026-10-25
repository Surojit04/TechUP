/**
 * TechUp Digital — Official Client Logos Data
 * Real client logos provided for "Trusted by Ambitious Creators & Brands"
 */

export interface ClientLogo {
  id: string;
  name: string;
  originalFilename: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  theme: "light" | "dark" | "gray";
  cardBg: string;
  borderColor: string;
  hoverBorder: string;
  scaleClass?: string;
  paddingClass?: string;
  containerWidth?: string;
}

export const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: "club-kautilya",
    name: "Club Kautilya",
    originalFilename: "Logo .jpg",
    src: "/clients/club-kautilya.jpg",
    alt: "Club Kautilya official logo",
    width: 1340,
    height: 620,
    theme: "light",
    cardBg: "bg-white",
    borderColor: "border-ink/8",
    hoverBorder: "hover:border-brand-orange/40",
    scaleClass: "scale-100",
    paddingClass: "p-4 sm:p-5",
    containerWidth: "w-24 sm:w-28 md:w-32",
  },
  {
    id: "hospitality-eduinpla",
    name: "Hospitality Eduinpla",
    originalFilename: "Hospitality Eduinpla_02_FINAL(social).jpg",
    src: "/clients/hospitality-eduinpla.png",
    alt: "Hospitality Eduinpla client logo",
    width: 4082,
    height: 1108,
    theme: "light",
    cardBg: "bg-white",
    borderColor: "border-ink/8",
    hoverBorder: "hover:border-brand-orange/40",
    scaleClass: "scale-[1.05]",
    paddingClass: "p-4 sm:p-5",
    containerWidth: "w-28 sm:w-32 md:w-36",
  },
  {
    id: "india-autism-center",
    name: "India Autism Center",
    originalFilename: "IAC Logo v2..png",
    src: "/clients/india-autism-center.png",
    alt: "India Autism Center (IAC) official logo",
    width: 1080,
    height: 620,
    theme: "light",
    cardBg: "bg-white",
    borderColor: "border-ink/8",
    hoverBorder: "hover:border-brand-orange/40",
    scaleClass: "scale-100",
    paddingClass: "p-4 sm:p-5",
    containerWidth: "w-24 sm:w-28 md:w-32",
  },
  {
    id: "jito-kolkata",
    name: "JITO Kolkata",
    originalFilename: "JITO Roster (2).jpg.jpeg",
    src: "/clients/jito-kolkata.png",
    alt: "JITO Kolkata chapter logo",
    width: 1457,
    height: 646,
    theme: "light",
    cardBg: "bg-white",
    borderColor: "border-ink/8",
    hoverBorder: "hover:border-brand-orange/40",
    scaleClass: "scale-[1.05]",
    paddingClass: "p-4 sm:p-5",
    containerWidth: "w-24 sm:w-28 md:w-32",
  },
  {
    id: "raj-yatayat",
    name: "Raj Yatayat (P) Ltd",
    originalFilename: "Enhanced - Raj Yatayat Logo.png",
    src: "/clients/raj-yatayat.png",
    alt: "Raj Yatayat (P) Ltd logo",
    width: 1152,
    height: 925,
    theme: "light",
    cardBg: "bg-white",
    borderColor: "border-ink/8",
    hoverBorder: "hover:border-brand-orange/40",
    scaleClass: "scale-[1.05]",
    paddingClass: "p-3 sm:p-4",
    containerWidth: "w-20 sm:w-24 md:w-28",
  },
  {
    id: "shinobi-martial-arts",
    name: "Shinobi Martial Arts Academy",
    originalFilename: "SHINOBI MARTIAL ARTS ACADEMY (FINAL LOGO 1).jpg",
    src: "/clients/shinobi-martial-arts.jpg",
    alt: "Shinobi Martial Arts Academy logo",
    width: 4496,
    height: 4486,
    theme: "dark",
    cardBg: "bg-[#0B0B0F]",
    borderColor: "border-white/10",
    hoverBorder: "hover:border-brand-orange/50",
    scaleClass: "scale-[1.28]",
    paddingClass: "p-3 sm:p-4",
    containerWidth: "w-16 sm:w-18 md:w-20",
  },
  {
    id: "toha",
    name: "The Old Heritans Association",
    originalFilename: "TOHA logo white-qKz-t51d.webp",
    src: "/clients/toha.webp",
    alt: "The Old Heritans Association (TOHA) official logo",
    width: 1920,
    height: 1080,
    theme: "dark",
    cardBg: "bg-[#0B0B0F]",
    borderColor: "border-white/10",
    hoverBorder: "hover:border-brand-orange/50",
    scaleClass: "scale-100",
    paddingClass: "p-4 sm:p-5",
    containerWidth: "w-24 sm:w-28 md:w-32",
  },
  {
    id: "travedo",
    name: "Travedo",
    originalFilename: "logo-Travedo -JPG.jpg.jpg",
    src: "/clients/travedo.png",
    alt: "Travedo official logo",
    width: 2700,
    height: 1300,
    theme: "dark",
    cardBg: "bg-[#0B0B0F]",
    borderColor: "border-white/10",
    hoverBorder: "hover:border-brand-orange/50",
    scaleClass: "scale-[1.05]",
    paddingClass: "p-3 sm:p-4",
    containerWidth: "w-26 sm:w-30 md:w-34",
  },
];
