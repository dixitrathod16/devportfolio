import React from "react";
import "./Progress.scss";
import { illustration, techStack } from "../../portfolio";
import { Fade } from "react-awesome-reveal";
import Build from "../../assets/lottie/build.json";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";

const StackProgress: React.FC = (): React.ReactElement | null => {
  if (techStack.viewSkillBars) {
    return (
      <Fade direction={"up"} duration={1000}>
        <div className="skills-container">
          <div className="skills-bar">
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
          </div>
          <div className="skills-image">
            {illustration.animated ? (
              <DisplayLottie animationData={Build} />
            ) : (
              <img
                alt="Skills"
                src={require("../../assets/images/skill.svg")}
              />
            )}
          </div>
        </div>
      </Fade>
    );
  }
  return null;
};

export default StackProgress;
