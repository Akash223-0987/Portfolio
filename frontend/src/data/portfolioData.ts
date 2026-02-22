import type { Project, SkillCategory, ExperienceItem } from '../types';

export const projects: Project[] = [
  {
    id: 'kairos',
    title: 'Kairos',
    description: 'An intelligent AI chatbot application.',
    techStack: ['HTML', 'CSS', 'Node.js', 'Express.js', 'REST API'],
    githubUrl: 'https://github.com/Akash223-0987/Kairos-AI',
    liveUrl: 'https://kairos-nine-sepia.vercel.app',
  },
  {
    id: 'gesture-mario',
    title: 'Gesture-Based Mario Game',
    description: 'A computer vision project that allows playing Super Mario using hand gestures.',
    techStack: ['Java', 'JavaFX', 'Swing', 'OpenCV'],
    githubUrl: 'https://github.com/Akash223-0987/2D-Game-using-hand-Gestures',
  },
  {
    id: 'nubesvault',
    title: 'NubesVault',
    description: 'A cloud storage application allowing users to securely store and manage files, folders, and images.',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'OAuth'],
    githubUrl: 'https://github.com/Akash223-0987/NubesVault',
    liveUrl: 'https://nubes-vault.vercel.app',
  },
  {
    id: 'auto-news',
    title: 'Press Pulse',
    description: 'An automated pipeline aggregating news and performing sentiment analysis using AI models.',
    techStack: ['Python', 'FastAPI', 'Sentiment Analysis'],
    githubUrl: 'https://github.com/Akash223-0987/PressPulse',
    ongoing: true,
  },
  {
    id: 'spendora',
    title: 'Spendora',
    description: 'Smart expense tracker with budget management, spending pattern analysis, and financial insights through data visualization.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Supabase'],
    githubUrl: 'https://github.com/Akash223-0987/Spendora',
    ongoing: true,
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: ['Python', 'C', 'C++', 'Java', 'R', 'TypeScript'],
  },
  {
    title: 'Frontend Technologies',
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'TailwindCSS', 'Bootstrap'],
  },
  {
    title: 'Backend Technologies',
    skills: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    title: 'Databases',
    skills: ['MySQL', 'MongoDB', 'Firebase', 'Supabase'],
  },
  {
    title: 'Data Analytics & ML',
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Power BI'],
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
