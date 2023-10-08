/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation.json"; // Rename to your file name for custom animation
import { AchievementSection, BigProjects, BlogSection, ContactInfo, EducationInfo, Greeting, Illustration, OpenSource, SkillsSection, SocialMediaLinks, SplashScreen, TechStack, WorkExperiences } from "./types/interfaces";

// Splash Screen

const splashScreen: SplashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration: Illustration = {
  animated: true // Set to false to use static SVG
};

const greeting: Greeting = {
  username: "Dixit Jain",
  title: "Hi, I'm Dixit Jain",
  subTitle: emoji(
    "A tech enthusiast with 5+ years of experience in the digital realm, specializing in AWS Cloud, React, Node.js, and TypeScript. I'm also an AWS Community Builder. Currently, I'm diving into AWS CDK. Let's connect and explore tech together! 🚀🔥"
  ),
  resumeLink:
    "https://drive.google.com/file/d/1fFX3G9HSL3iIi9Q1oBmgSBHitg6poUAy/view?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks: SocialMediaLinks = {
  github: "https://github.com/dixitrathod16",
  linkedin: "https://www.linkedin.com/in/dixitrathod16/",
  gmail: "dixitrathod16@gmail.com",
  facebook: "https://www.facebook.com/dixit.rathod.948",
  medium: "https://medium.com/@dixitrathod16",
  instagram: "https://www.instagram.com/im_d_rathod",
  devTo: "https://dev.to/dixitjain",
  display: true
};

// Skills Section

const skillsSection: SkillsSection = {
  title: "What I do",
  subTitle: "Build applications that solves a complex problem with below skills",
  skills: [
    emoji("⚡ Interactive User Interfaces for web using React with TypeScript"),
    emoji("⚡ Scalable backend applications using Express.js with TypeScript"),
    emoji("⚡ CI/CD using tools like CodeFresh and GitLab"),
    emoji("⚡ Host and deploy solutions using AWS Cloud Infrastructure"),
    emoji("⚡ Event driven workloads usign AWS Serverless Technologies"),
    emoji("⚡ AWS CDK to build infrastructure as code"),
    emoji("⚡ GitHub and GitLab for version control and collaboration"),
    emoji("⚡ Docker for containerization"),
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "reactjs",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "nodejs",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "npm",
      fontAwesomeClassname: "fab fa-npm"
    },
    {
      skillName: "mysql",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "aws",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "docker",
      fontAwesomeClassname: "fab fa-docker"
    },
    {
      skillName: "html-5",
      fontAwesomeClassname: "fab fa-html5"
    },
    {
      skillName: "css3",
      fontAwesomeClassname: "fab fa-css3-alt"
    },
    {
      skillName: "github",
      fontAwesomeClassname: "fab fa-github"
    },
  ],
  display: true
};

// Education Section

const educationInfo: EducationInfo = {
  display: true,
  schools: [
    {
      schoolName: "GM Institue of Technology",
      logo: require("./assets/images/GMIT.png"),
      subHeader: "B.E in Information Science & Engineering",
      duration: "Jul 2014 - Jun 2018",
      desc: "Completed coursework in Software Engineering, Algorithms and Data Structures, Web Development, Web Security, and Operating Systems as part of my educational journey.",
    },
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack: TechStack = {
  viewSkillBars: true,
  experience: [
    {
      Stack: "Frontend Technologies",
      progressPercentage: "80%"
    },
    {
      Stack: "Backend Technologies",
      progressPercentage: "85%"
    },
    {
      Stack: "Problem Solving",
      progressPercentage: "85%"
    },
  ],
};

// Work experience section

const workExperiences: WorkExperiences = {
  display: true,
  experience: [
    {
      role: "Software Development Engineer II",
      company: "PowerSchool",
      companylogo: require("./assets/images/powerschool.png"),
      date: "Apr 2022 – Present",
    },
    {
      role: "Software Development Engineer I",
      company: "PowerSchool",
      companylogo: require("./assets/images/powerschool.png"),
      date: "Jul 2021 – Mar 2022",
    },
    {
      role: "Software Development Engineer, Sr. Associate",
      company: "Fiserv",
      companylogo: require("./assets/images/fiserv.png"),
      date: "Oct 2020 – Jun 2021",
    },
    {
      role: "Software Development Engineer, Associate",
      company: "Fiserv",
      companylogo: require("./assets/images/fiserv.png"),
      date: "Jul 2019 – Sep 2020",
    },
    {
      role: "Software Development Engineer, Trainee",
      company: "Fiserv",
      companylogo: require("./assets/images/fiserv.png"),
      date: "Jul 2018 – Jun 2019",
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource: OpenSource = {
  showGithubProfile: true, // Set true or false to show Contact profile using Github, defaults to true
  display: true
};

// Some big projects you have worked on

const bigProjects: BigProjects = {
  title: "Big Projects",
  subtitle: "SOME STARTUPS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: require("./assets/images/powerschool.png"),
      projectName: "Saayahealth",
      projectDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://saayahealth.com/"
        }
        //  you can add extra buttons here.
      ]
    },
  ],
  display: false
};

// Achievement Section
// Include certificates, talks etc

const achievementSection: AchievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle:
    "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

  achievementsCards: [
    {
      title: "AWS Certified Solutions Architect – Associate",
      subtitle:
        "I'm a certified AWS Solutions Architect, Associate. I have completed the certification in May-2023.",
      image: require("./assets/images/asa.png"),
      imageAlt: "AWS Solutions Architect Associate Badge",
      footerLink: [
        {
          name: "View Certificate",
          url: "https://www.credly.com/badges/00e0f1e2-3c90-4fe0-b9ae-157810b2df21"
        }
      ]
    },
    {
      title: "AWS Community Builder",
      subtitle:
        "I got selected for AWS Community Builder Program under DevTools category because of my passion and contribution towards community building by sharing my knowlege via various technical blog posts",
      image: require("./assets/images/acb.png"),
      imageAlt: "AWS Community Builders Logo",
      footerLink: [
        {
          name: "View Community Builders Directory",
          url: "https://aws.amazon.com/developer/community/community-builders/community-builders-directory/?cb-cards.sort-by=item.additionalFields.cbName&cb-cards.sort-order=asc&awsf.builder-category=cb-type%23devtools&awsf.location=location%23apac&awsf.year=year%232023&cb-cards.q=Dixit%2BR%2BJain&cb-cards.q_operator=AND"
        }
      ]
    },

    {
      title: "Just Express (with a bunch of node and http).",
      subtitle: "Completed Course on Express.js on Udemy by Robert Bunch",
      image: require("./assets/images/express.jpeg"),
      imageAlt: "Express Logo",
      footerLink: [
        {name: "View Certificatie", url: "https://www.udemy.com/certificate/UC-3bfb0d9a-eeeb-493f-88d6-3ebbfe80e23c"},
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection: BlogSection = {
  title: "Blogs",
  subtitle:
    "I love to write blogs to share my knowledge and experience with the community. I have written blogs on various topics on AWS Cloud",
  displayMediumBlogs: true, // Set true to display fetched medium blogs instead of hardcoded ones
  displayDevToBlogs: true, // Set true to display fetched dev.to blogs instead of hardcoded ones
  display: true // Set false to hide this section, defaults to true
};

const contactInfo: ContactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Whether you have a project idea, a collaboration opportunity, or just want to say hello, feel free to connect and drop me a message on any of below platforms. I'll do my best to get back to you as soon as possible.",
  number: "+91-9738876147",
  email_address: "dixitrathod16@gmail.com"
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  contactInfo,
  isHireable
};
