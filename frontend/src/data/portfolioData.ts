import type { Project, SkillCategory, ExperienceItem } from '../types';

export const projects: Project[] = [
  {
    id: 'retention-analysis',
    title: 'Retention Analysis Dashboard',
    description: 'A comprehensive data dashboard analyzing user retention metrics with interactive visualizations.',
    techStack: ['Python', 'Data Analytics', 'Pandas', 'Visualization'],
    githubUrl: 'https://github.com',
  },
  {
    id: 'auto-news',
    title: 'Auto-News Sentiment Aggregator',
    description: 'An automated pipeline aggregating news and performing sentiment analysis using AI models.',
    techStack: ['Python', 'FastAPI', 'Sentiment Analysis', 'React'],
    githubUrl: 'https://github.com',
  },
  {
    id: 'gesture-mario',
    title: 'Gesture-Based Mario Game',
    description: 'A computer vision project that allows playing Super Mario using hand gestures.',
    techStack: ['Python', 'OpenCV', 'AI/ML'],
    githubUrl: 'https://github.com',
  },
  {
    id: 'medicine-tracker',
    title: 'Medicine Tracker App',
    description: 'An application designed to help users track their medication schedules and health metrics.',
    techStack: ['React', 'TypeScript', 'TailwindCSS', 'SQLite'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
  },
  {
    id: 'ai-portfolio',
    title: 'AI Portfolio',
    description: 'A modern developer portfolio powered by an integrated AI chatbot assistant.',
    techStack: ['React 19', 'TypeScript', 'Vite', 'TailwindCSS 4'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'TailwindCSS', 'HTML5', 'CSS3', 'Vite'],
  },
  {
    title: 'Backend',
    skills: ['Python', 'FastAPI', 'Java', 'REST APIs', 'Node.js'],
  },
  {
    title: 'Databases',
    skills: ['SQL', 'DBMS', 'SQLite', 'PostgreSQL'],
  },
  {
    title: 'AI / ML',
    skills: ['Data Mining', 'Sentiment Analysis', 'Model Building', 'Pandas', 'OpenCV'],
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'edu-1',
    type: 'education',
    title: 'Bachelor of Technology in Computer Science',
    institution: 'University Name',
    date: '2020 - 2024',
    description: 'Graduated with honors. Focused on AI, Data Structures, and System Design.',
  },
  {
    id: 'exp-1',
    type: 'experience',
    title: 'Data Analyst Intern',
    institution: 'Tech Company',
    date: 'Summer 2023',
    description: 'Developed analytics dashboards and performed customer retention analysis utilizing Python and SQL.',
  },
  {
    id: 'exp-2',
    type: 'experience',
    title: 'Full Stack Developer Intern',
    institution: 'Software Startup',
    date: 'Fall 2023',
    description: 'Built scalable backend microservices with FastAPI and created interactive React components.',
  },
];
