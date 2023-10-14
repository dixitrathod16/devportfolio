import React, { useContext } from "react";
import "./Skills.scss";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import { illustration, skillsSection } from "../../portfolio";
import skills from "../../assets/lottie/skills.json";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import StyleContext from "../../store/context";
import { motion } from "framer-motion";

const Skills: React.FC = (): React.ReactElement | null => {
  const { isDark } = useContext(StyleContext);

  if (!skillsSection.display) {
    return null;
  }

  return (
    <div className={isDark ? "dark-mode main" : "main"} id="skills">
      <div className="skills-main-div">
        <motion.div
          initial={{ x: -300, y: "-12%" }}
          whileInView={{ x: 0, y: "-12%" }}
          transition={{ delay: 1, type: "tween", stiffness: 100 }}
          viewport={{ once: true }}
        >
          <div className="skills-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={skills} />
            ) : (
              <img
                alt="Man Working"
                src={require("../../assets/images/developerActivity.svg")}
              ></img>
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ x: +300 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.9, type: "tween", stiffness: 100 }}
          viewport={{ once: true }}
        >
          <div className="skills-text-div">
            <h1
              className={isDark ? "dark-mode skills-heading" : "skills-heading"}
            >
              {skillsSection.title}{" "}
            </h1>
            <p
              className={
                isDark
                  ? "dark-mode subTitle skills-text-subtitle"
                  : "subTitle skills-text-subtitle"
              }
            >
              {skillsSection.subTitle}
            </p>
            <SoftwareSkill />
            <div>
              {skillsSection.skills.map((skills, i) => (
                <p
                  key={i}
                  className={
                    isDark
                      ? "dark-mode subTitle skills-text"
                      : "subTitle skills-text"
                  }
                >
                  {skills}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
