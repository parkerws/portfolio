import { Project, Skill } from '@/types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Azure Landing Zone Accelerator',
    description: 'Enterprise-Scale Azure Landing Zone built with Terraform, featuring hub-spoke networking, governance policies, and security controls following Microsoft CAF best practices',
    image: '/images/github.jpg',
    github: 'https://github.com/parkerws/azure-landing-zone-accelerator',
    technologies: ['Terraform', 'Azure', 'Bicep', 'PowerShell', 'Azure Policy'],
    category: 'other',
  },
  {
    id: 2,
    title: 'Infrastructure Compliance Scanner',
    description: 'Automated security and compliance scanning tool for Azure and AWS. Validates resources against CIS Benchmarks, NIST, PCI-DSS with detailed remediation reports',
    image: '/images/github.jpg',
    github: 'https://github.com/parkerws/infrastructure-compliance-scanner',
    technologies: ['Python', 'Azure SDK', 'AWS Boto3', 'Security'],
    category: 'other',
  },
  {
    id: 3,
    title: 'Cloud Cost Optimizer',
    description: 'Real-time cloud cost analysis and optimization tool with ML-based anomaly detection, automated recommendations, and multi-cloud support for Azure and AWS',
    image: '/images/github.jpg',
    github: 'https://github.com/parkerws/cloud-cost-optimizer',
    technologies: ['Python', 'React', 'Machine Learning', 'Azure', 'AWS'],
    category: 'ml',
  },
  {
    id: 4,
    title: 'CI/CD Pipeline Templates',
    description: 'Production-ready CI/CD pipeline templates for Azure DevOps, GitHub Actions, and GitLab CI. Includes Terraform, Kubernetes, and container deployment workflows',
    image: '/images/github.jpg',
    github: 'https://github.com/parkerws/cicd-pipeline-templates',
    technologies: ['Azure DevOps', 'GitHub Actions', 'Terraform', 'Kubernetes'],
    category: 'other',
  },
  {
    id: 5,
    title: 'Azure Naming Convention Generator',
    description: 'Web-based tool for generating Azure resource names following Microsoft CAF best practices with support for custom organizational standards and bulk generation',
    image: '/images/github.jpg',
    github: 'https://github.com/parkerws/azure-naming-generator',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    category: 'web',
  },
  {
    id: 6,
    title: 'Portfolio Website',
    description: 'Modern portfolio website built with Next.js, TypeScript, and Tailwind CSS featuring dark mode, animations, and GitHub Pages deployment',
    image: '/images/portfolio.png',
    github: 'https://github.com/parkerws/portfolio',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    category: 'web',
  },
  {
    id: 7,
    title: 'Machine Learning Deployment',
    description: 'Demonstration of deploying a machine learning model to a web application with Flask API and React frontend',
    image: '/images/mlflask.png',
    github: 'https://github.com/parkerws/machine-learning-deployment',
    technologies: ['Python', 'Flask', 'Machine Learning', 'React'],
    category: 'ml',
  },
  {
    id: 8,
    title: 'CRUD API',
    description: 'RESTful API demonstrating CRUD operations with Node.js and Express, including authentication and data validation',
    image: '/images/crud.PNG',
    github: 'https://github.com/parkerws/CRUD_API',
    technologies: ['Node.js', 'Express', 'REST API', 'MongoDB'],
    category: 'api',
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
