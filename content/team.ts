/**
 * Core team members for TechUP Digital.
 * SPEC RULE: Exact order and designations from spec sections 6.10 & 9.7.
 */

export interface TeamMember {
  id: string;
  order: number;
  name: string;
  designation: string;
  initials: string;
  bio?: string;
  photo?: string;
  photoPosition?: string;
  linkedin?: string;
  instagram?: string;
  isFounder?: boolean;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "dwaipayan-saha",
    order: 1,
    name: "Dwaipayan Saha",
    designation: "Founder & CEO",
    initials: "DS",
    bio: "Leading TechUP Digital's mission to bridge creative vision and technical precision for Indian brands and modern creators.",
    photo: "/team/Dwaipayan.png",
    photoPosition: "object-[center_20%]",
    isFounder: true,
  },
  {
    id: "manish-kumar-parui",
    order: 2,
    name: "Manish Kumar Parui",
    designation: "COO",
    initials: "MP",
    bio: "Overseeing day-to-day operations and ensuring reliable, frictionless delivery across all client retainers.",
  },
  {
    id: "mayukh-mukherjee",
    order: 3,
    name: "Mayukh Mukherjee",
    designation: "CFO",
    initials: "MM",
    bio: "Steering financial strategy, long-term commercial models, and sustainable agency growth.",
    photo: "/team/Mayukh Mukherjee.jpg",
    photoPosition: "object-[center_15%]",
  },
  {
    id: "surojit-dutta",
    order: 4,
    name: "Surojit Dutta",
    designation: "IT Support Specialist",
    initials: "SD",
    bio: "Driving web infrastructure, performance optimization, and technical systems support.",
    photo: "/team/Surojit image 2.jpeg",
    photoPosition: "object-[center_15%]",
  },
  {
    id: "shreyansa-patni",
    order: 5,
    name: "Shreyansa Patni",
    designation: "Strategic Partner",
    initials: "SP",
    bio: "Spearheading strategic collaborations, growth initiatives, and key stakeholder relationships.",
  },
  {
    id: "arnab-karmakar",
    order: 6,
    name: "Arnab Karmakar",
    designation: "Technical Support",
    initials: "AK",
    bio: "Powering technical integrations, platform maintenance, and seamless digital execution.",
  },
];
