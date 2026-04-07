export type ExperienceLevel = 'Entry Level' | 'Mid Level' | 'Senior Level';
export type Language = 'vi' | 'en';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string; // Can be used as major or left empty if included in description
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  role: string; // e.g., "Backend System for an E-Commerce Platform"
  startDate: string;
  endDate: string;
  demoLink: string;
  githubLink: string;
  details: string; // Bullet points separated by newline
}

export interface Certification {
  id: string;
  name: string;
  date: string;
  link: string;
}

export interface CVData {
  language: Language;
  personalInfo: PersonalInfo;
  level: ExperienceLevel;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string;
  projects: Project[];
  certifications: Certification[];
}
