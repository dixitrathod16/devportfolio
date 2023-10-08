import React from "react";
import "./Education.scss";
import EducationCard from "../../components/educationCard/EducationCard";
import { educationInfo } from "../../portfolio";

const Education: React.FC = () => {
    return (
      <>
      {
        educationInfo.display && (
          <div className="education-section" id="education">
          <h1 className="education-heading">Education</h1>
          <div className="education-card-container">
            {educationInfo.schools.map((school, index) => (
              <EducationCard key={index} school={school} />
            ))}
          </div>
        </div>
        )
      }
      </>
    );
};

export default Education;

