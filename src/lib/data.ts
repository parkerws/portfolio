import { Project, Skill } from '@/types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Rock Paper Scissors',
    description: 'A rock, paper, scissors game written in HTML, CSS, and JavaScript',
    image: '/images/rps.png',
    github: 'https://github.com/parkerws/rockpaperscissors',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'game',
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'Modern portfolio website built with Next.js, TypeScript, and Tailwind CSS',
    image: '/images/portfolio.png',
    github: 'https://github.com/parkerws/portfolio',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    category: 'web',
  },
  {
    id: 3,
    title: 'MSIP',
    description: 'A web application designed to connect teachers and students, as well as connect multiple resources together',
    image: '/images/msip.png',
    github: 'https://github.com/parkerws/MSIP',
    technologies: ['ASP.NET', 'C#', 'SQL'],
    category: 'web',
  },
  {
    id: 4,
    title: 'Bike Rental Agency',
    description: 'An e-commerce web application demonstrating an online bike store',
    image: '/images/bike.png',
    github: 'https://github.com/parkerws/BikeRentalAgency',
    technologies: ['ASP.NET', 'C#', 'Entity Framework'],
    category: 'web',
  },
  {
    id: 5,
    title: 'Hash Server',
    description: 'A low-level client/server program using sockets used to return the cryptographic hash of a file',
    image: '/images/hashserver.png',
    github: 'https://github.com/parkerws/HashServer',
    technologies: ['C', 'Sockets', 'Cryptography'],
    category: 'other',
  },
  {
    id: 6,
    title: 'Roulette Game',
    description: 'A console-based game of Roulette',
    image: '/images/roulette.png',
    github: 'https://github.com/parkerws/Roulette',
    technologies: ['C#', '.NET'],
    category: 'game',
  },
  {
    id: 7,
    title: 'CRUD API',
    description: 'An API demonstrating CRUD operations',
    image: '/images/crud.PNG',
    github: 'https://github.com/parkerws/CRUD_API',
    technologies: ['Node.js', 'Express', 'REST API'],
    category: 'api',
  },
  {
    id: 8,
    title: 'Whale Wars RPG',
    description: 'A console-based Role Playing Game',
    image: '/images/whale.png',
    github: 'https://github.com/parkerws/Whale_Wars',
    technologies: ['C#', '.NET'],
    category: 'game',
  },
  {
    id: 9,
    title: 'Machine Learning Deployment',
    description: 'A demonstration of deploying a machine learning model to a web application',
    image: '/images/mlflask.png',
    github: 'https://github.com/parkerws/machine-learning-deployment',
    technologies: ['Python', 'Flask', 'Machine Learning'],
    category: 'ml',
  },
  {
    id: 10,
    title: 'MSSA Projects',
    description: 'Various practices in language familiarity, data structures/algorithms, and other miscellaneous projects',
    image: '/images/github.jpg',
    github: 'https://github.com/parkerws/MSSA-Projects',
    technologies: ['C#', 'Python', 'JavaScript', 'Algorithms'],
    category: 'other',
  },
];

export const skills: Skill[] = [
  // Cloud & Infrastructure
  { name: 'Azure', category: 'other', proficiency: 95 },
  { name: 'AWS', category: 'other', proficiency: 85 },
  { name: 'Terraform', category: 'tools', proficiency: 95 },
  { name: 'Kubernetes / AKS', category: 'other', proficiency: 90 },
  { name: 'Bicep', category: 'tools', proficiency: 90 },
  { name: 'Landing Zones', category: 'other', proficiency: 95 },

  // DevOps & Automation
  { name: 'CI/CD Pipelines', category: 'tools', proficiency: 90 },
  { name: 'PowerShell', category: 'backend', proficiency: 90 },
  { name: 'Bash', category: 'backend', proficiency: 85 },
  { name: 'Git / GitOps', category: 'tools', proficiency: 90 },
  { name: 'Helm', category: 'tools', proficiency: 85 },

  // Programming & Development
  { name: 'Python', category: 'backend', proficiency: 90 },
  { name: 'Node.js', category: 'backend', proficiency: 80 },
  { name: 'React / Next.js', category: 'frontend', proficiency: 85 },
  { name: 'TypeScript', category: 'frontend', proficiency: 85 },

  // Security & Governance
  { name: 'Cloud Governance', category: 'other', proficiency: 95 },
  { name: 'Security Operations', category: 'other', proficiency: 90 },
  { name: 'Identity Management', category: 'other', proficiency: 90 },
  { name: 'Risk Management', category: 'other', proficiency: 85 },

  // Networking & Data
  { name: 'Network Design', category: 'other', proficiency: 85 },
  { name: 'SQL', category: 'backend', proficiency: 80 },
  { name: 'Data Analysis', category: 'other', proficiency: 85 },
];

export const socialLinks = {
  github: 'https://github.com/parkerws',
  linkedin: 'https://www.linkedin.com/in/parkerws/',
  email: 'contact@willparker.dev',
};
