import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Greeting from "../greeting/Greeting";
import Skills from "../skills/Skills";
import StackProgress from "../skillProgress/skillProgress";
import WorkExperience from "../workExperience/WorkExperience";
import Projects from "../projects/Projects";
import StartupProject from "../StartupProjects/StartupProject";
import Achievement from "../achievement/Achievement";
import Blogs from "../blogs/Blogs";
import Footer from "../../components/footer/Footer";
import Education from "../education/Education";
import ScrollToTopButton from "../topbutton/Top";
import Profile from "../profile/Profile";
import SplashScreen from "../splashScreen/SplashScreen";
import { splashScreen } from "../../portfolio";
import { GithubProfileProvider, StyleProvider } from "../../store/context";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import "./main.scss";
import apiClient from "../../utils/apiClient";

interface GitHubProfile {
  avatarUrl: string;
  name: string;
}

interface Blog {
  title: string;
  link: string;
  thumbnail?: string;
  description: string;
}

const getBlogsAndGithubProfile = async (
  setIsShowingSplashAnimation: React.Dispatch<React.SetStateAction<boolean>>,
  setGithubProfile: React.Dispatch<React.SetStateAction<GitHubProfile | undefined>>,
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>
) => {
  setIsShowingSplashAnimation(true);
  const [githubProfile, blogs] = await Promise.all([
    getGithubProfile(),
    getBlogs(),
  ]);
  setGithubProfile(githubProfile);
  setBlogs(blogs);
  setIsShowingSplashAnimation(false);
}

const getBlogs = async () => {
  try {
    const response = await apiClient.get("/getBlogs");
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const getGithubProfile = async () => {
  try {
    const response = await apiClient.get("/getGithubProfile");
    return response.data.data.user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const Main: React.FC = () => {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] =
    useState(true);

  const [githubProfile, setGithubProfile] = useState<GitHubProfile>();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    getBlogsAndGithubProfile(
      setIsShowingSplashAnimation,
      setGithubProfile,
      setBlogs
    );
  }, []);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={isDark && "dark-mode"}>
      <StyleProvider value={{ isDark, changeTheme }}>
        {isShowingSplashAnimation ? (
          <SplashScreen />
        ) : (
          <GithubProfileProvider value={{ githubProfile }}>
            <Header />
            <Greeting />
            <Skills />
            <StackProgress />
            <Education />
            <WorkExperience />
            <Projects />
            <StartupProject />
            <Achievement />
            <Blogs />
            <Profile />
            <Footer />
            <ScrollToTopButton />
          </GithubProfileProvider>
        )}
      </StyleProvider>
    </div>
  );
};

export default Main;