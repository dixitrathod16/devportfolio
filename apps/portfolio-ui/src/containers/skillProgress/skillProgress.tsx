import React from "react";
import "./Progress.scss";
import { illustration, techStack } from "../../portfolio";
import Build from "../../assets/lottie/build.json";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import { motion } from "framer-motion";

const StackProgress: React.FC = (): React.ReactElement | null => {
  if (techStack.viewSkillBars) {
    return (
      <div className="skills-container">
        <motion.div
          initial={{ x: -300 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.9, type: "tween", stiffness: 100 }}
          viewport={{ once: true }}
          className="skills-bar">
          <h1 className="skills-heading">Proficiency</h1>
          {techStack.experience.map((exp, i) => {
            const progressStyle: React.CSSProperties = {
              width: exp.progressPercentage + "%",
            };
            return (
              <div key={i} className="skill">
                <p>{exp.Stack}</p>
                <div className="meter">
                  <span style={progressStyle}></span>
                </div>
              </div>
            );
          })}
        </motion.div>
        <motion.div
          initial={{ x: +300 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.9, type: "tween", stiffness: 100 }}
          viewport={{ once: true }}
          className="skills-image"
        >
          {illustration.animated ? (
            <DisplayLottie animationData={Build} />
          ) : (
            <img
              alt="Skills"
              src={require("../../assets/images/skill.svg")}
            />
          )}
        </motion.div>
      </div>
    );
  }
  return null;
};

export default StackProgress;
