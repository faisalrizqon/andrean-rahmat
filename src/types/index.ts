export interface Profile {
  name: string;
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  about: string;
  aboutEn: string;
  education: string;
  educationEn: string;
  location: string;
  email: string;
}

export interface Social {
  instagram: string;
  tiktok: string;
  googleDrive: string; // portfolio drive
  cvDrive: string; // CV drive (same folder for now)
}

export interface Experience {
  id: string;
  role: string;
  roleEn: string;
  company: string;
  period: string;
  description: string;
  descriptionEn: string;
  achievements: string[];
  achievementsEn: string[];
  type: "relevant" | "other";
}

export interface Skills {
  hard: string[];
  soft: string[];
  tools: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  description: string;
  descriptionEn: string;
  driveLink: string;
  image: string;
  sampleImageLabel: string;
}

export interface SiteConfig {
  profile: Profile;
  social: Social;
  whatsappLink: string; // full wa.me URL (number or chat link)
  experiences: Experience[];
  skills: Skills;
  portfolio: PortfolioItem[];
}
