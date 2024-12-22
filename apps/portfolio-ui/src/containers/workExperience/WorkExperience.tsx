import React, { useContext } from "react";
import "./WorkExperience.scss";
import ExperienceCard from "../../components/experienceCard/ExperienceCard";
import { workExperiences } from "../../portfolio";
import { StyleContext } from "../../store/context";
import { WorkExperience } from "../../types/interfaces";
import { motion } from "framer-motion";

const WorkExperience: React.FC = () => {
  const { isDark } = useContext(StyleContext);

  if (workExperiences.display) {
    return (
      <div id="experience">
        <motion.div
          initial={{ y: 300 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1, type: "twean", stiffness: 100 }}
          viewport={{ once: true }}
        >
          <div className="experience-container" id="workExperience">
            <div>
              <h1 className="experience-heading">Experiences</h1>
              <div className="experience-cards-div">
                {workExperiences.experience.map((card: WorkExperience, i: number) => (
                  <ExperienceCard
                    key={i}
                    isDark={isDark}
                    cardInfo={{
                      company: card.company,
                      desc: card.desc,
                      date: card.date,
                      companylogo: card.companylogo,
                      role: card.role,
                      descBullets: card.descBullets,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
  return null;
};

export default WorkExperience;
