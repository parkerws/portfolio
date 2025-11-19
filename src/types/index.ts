export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  github: string;
  technologies: string[];
  category: 'web' | 'api' | 'game' | 'ml' | 'other';
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  proficiency: number; // 1-100
}
