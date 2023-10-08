import React from "react";
import "./SoftwareSkill.scss";
import { skillsSection } from "../../portfolio";

const SoftwareSkill: React.FC = () => {
  return (
    <div>
      <div className="software-skills-main-div">
        <ul className="dev-icons">
          {skillsSection.softwareSkills.map((skills, i) => (
            <li
              key={i}
              className="software-skill-inline"
            >
              <i className={skills.fontAwesomeClassname}></i>
              <p>{skills.skillName}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SoftwareSkill;