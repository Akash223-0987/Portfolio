export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  type: 'education' | 'experience';
  title: string;
  institution: string;
  date: string;
  description: string;
}
