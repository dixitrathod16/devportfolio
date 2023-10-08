import React from "react";
import "./Education.scss";
import EducationCard from "../../components/educationCard/EducationCard";
import { educationInfo } from "../../portfolio";
import { motion } from "framer-motion";

const Education: React.FC = () => {
  return (
    <>
      {
        educationInfo.display && (
          <motion.div
            initial={{ y: 300 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1, type: "twean", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <div className="education-section" id="education">
              <h1 className="education-heading">Education</h1>
              <div className="education-card-container">
                {educationInfo.schools.map((school, index) => (
                  <EducationCard key={index} school={school} />
                ))}
              </div>
            </div>
          </motion.div>
        )
      }
    </>
  );
};

export default Education;

