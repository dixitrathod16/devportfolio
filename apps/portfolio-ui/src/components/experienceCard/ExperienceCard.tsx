import React, { useState, createRef } from "react";
import "./ExperienceCard.scss";
import ColorThief from "colorthief";
import { WorkExperience } from "../../types/interfaces";

interface ExperienceCardProps {
  cardInfo: WorkExperience;
  isDark: boolean | undefined;
}

interface GetDescBulletsProps {
  descBullets: string[] | null;
  isDark: boolean | undefined;
}

const ExperienceCard = ({ cardInfo, isDark }: ExperienceCardProps) => {
  const [colorArrays, setColorArrays] = useState<number[]>([]);
  const imgRef = createRef<HTMLImageElement>();

  const getColorArrays = () => {
    const colorThief = new ColorThief();
    setColorArrays(colorThief.getColor(imgRef.current as HTMLImageElement));
  };

  const rgb = (values: number[] | undefined): string | number => {
    return `rgb(${values?.join(", ")})`;
  };

  const GetDescBullets: React.FC<GetDescBulletsProps> = ({
    descBullets,
    isDark,
  }) => {
    return descBullets
      ? descBullets.map((item, i) => (
          <li
            key={i}
            className={isDark ? "subTitle dark-mode-text" : "subTitle"}
          >
            {item}
          </li>
        ))
      : null;
  };

  return (
    <div className={isDark ? "experience-card-dark" : "experience-card"}>
      <div
        style={{ background: rgb(colorArrays) }}
        className="experience-banner"
      >
        <div className="experience-blurred_div"></div>
        <div className="experience-div-company">
          <h5 className="experience-text-company">{cardInfo.company}</h5>
        </div>

        <img
          crossOrigin="anonymous"
          ref={imgRef}
          className="experience-roundedimg"
          src={cardInfo.companylogo}
          alt={cardInfo.company}
          onLoad={() => getColorArrays()}
        />
      </div>
      <div className="experience-text-details">
        <h5
          className={
            isDark
              ? "experience-text-role dark-mode-text"
              : "experience-text-role"
          }
        >
          {cardInfo.role}
        </h5>
        <h5
          className={
            isDark
              ? "experience-text-date dark-mode-text"
              : "experience-text-date"
          }
        >
          {cardInfo.date}
        </h5>
        {cardInfo.desc && (
          <p
            className={
              isDark
                ? "subTitle experience-text-desc dark-mode-text"
                : "subTitle experience-text-desc"
            }
          >
            {cardInfo.desc}
          </p>
        )}
        {cardInfo.descBullets && cardInfo.descBullets.length && (
          <ul>
            <GetDescBullets
              descBullets={cardInfo.descBullets}
              isDark={isDark}
            />
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
