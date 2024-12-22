// Splash Screen
export interface SplashScreen {
  animation: any; // You should specify the type for the animation
}

// Illustration
export interface Illustration {
  animated: boolean;
}

// Greeting
export interface Greeting {
  username: string;
  title: string;
  subTitle: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  resumeLink: string;
  displayGreeting: boolean;
}

// Social Media Links
export interface SocialMediaLinks {
  github: string;
  linkedin: string;
  gmail: string;
  facebook: string;
  medium: string;
  instagram: string;
  devTo: string;
  display: boolean;
}

// Skills Section
export interface SkillsSection {
  title: string;
  subTitle: string;
  skills: React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
  softwareSkills: {
    skillName: string;
    fontAwesomeClassname: string;
  }[];
  display: boolean;
}

// Education Info
export interface School {
  schoolName: string;
  logo: any; // You should specify the type for the logo
  subHeader: string;
  duration: string;
  desc?: string;
  descBullets?: string[];
}

export interface EducationInfo {
  display: boolean;
  schools: School[];
}

// Tech Stack
export interface TechStackExperience {
  Stack: string;
  progressPercentage: string;
}

export interface TechStack {
  viewSkillBars: boolean;
  experience: TechStackExperience[];
}

// Work Experiences
export interface WorkExperience {
  role: string;
  desc?: string;
  company: string;
  companylogo: any; // You should specify the type for the company logo
  date: string;
  descBullets? : string[];
}

export interface WorkExperiences {
  display: boolean;
  experience: WorkExperience[];
}

// Open Source
export interface OpenSource {
  showGithubProfile: boolean;
  display: boolean;
}

// Big Projects
export interface Project {
  image: any; // You should specify the type for the image
  projectName: string;
  projectDesc: string;
  footerLink: {
    name: string;
    url: string;
  }[];
}

export interface BigProjects {
  title: string;
  subtitle: string;
  projects: Project[];
  display: boolean;
}

// Achievement Section
export interface AchievementCard {
  title: string;
  desc?: string;
  subtitle: string;
  image: any; // You should specify the type for the image
  imageAlt?: string;
  footerLink: {
    name: string;
    url: string;
  }[];
}

export interface AchievementSection {
  title: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  subtitle: string;
  achievementsCards: AchievementCard[];
  display: boolean;
}

// Blogs Section
export interface Blog {
  url: string;
  title: string;
  description: string;
}

export interface BlogSection {
  title: string;
  subtitle: string;
  displayMediumBlogs: boolean;
  displayDevToBlogs: boolean;
  display: boolean;
}

// Contact Info
export interface ContactInfo {
  title: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  subtitle: string;
  number: string;
  email_address: string;
}

export interface Context {
    isDark?: boolean;
    changeTheme?: () => void;
}
