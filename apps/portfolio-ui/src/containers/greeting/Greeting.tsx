import React, { useContext, useEffect, useState } from "react";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import { greeting } from "../../portfolio";
import StyleContext from "../../store/context";
import apiClient from "../../utils/apiClient";
import { motion } from "framer-motion";

interface GitHubProfile {
  avatarUrl: string;
  name: string;
}

const Greeting: React.FC = () => {
  const { isDark } = useContext<any>(StyleContext);
  const [githubProfile, setGitHubProfile] = useState<GitHubProfile | null>(
    null
  );

  useEffect(() => {
    apiClient
      .get('/getGithubProfile')
      .then((response) => {
        setGitHubProfile(response.data.data.user);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {
        greeting.displayGreeting && (
          <motion.div
            initial={{ y: 300 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1, type: "twean", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <div className="greet-main" id="greeting">
              <div className="greeting-main">
                <div className="greeting-text-div">
                  <div>
                    <h1
                      className={
                        isDark ? "dark-mode greeting-text" : "greeting-text"
                      }
                    >
                      {" "}
                      {greeting.title}{" "}
                      <span className="wave-emoji">{emoji("👋")}</span>
                    </h1>
                    <p
                      className={
                        isDark
                          ? "dark-mode greeting-text-p"
                          : "greeting-text-p subTitle"
                      }
                    >
                      {greeting.subTitle}
                    </p>
                    <SocialMedia />
                    <div className="button-greeting-div">
                      <Button text="Contact me" href="#contact" />
                      {greeting.resumeLink && (
                        <Button
                          text="See my resume"
                          newTab={true}
                          href={greeting.resumeLink}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="image-content-profile">
                  {githubProfile && (
                    <img
                      src={githubProfile.avatarUrl}
                      alt={githubProfile.name}
                      className="profile-image"
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )
      }
    </>
  );
};

export default Greeting;