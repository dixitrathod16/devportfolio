import React, {ReactElement, useContext} from "react";
import "./Achievement.scss";
import AchievementCard from "../../components/achievementCard/AchievementCard";
import {achievementSection} from "../../portfolio";
import {Fade} from "react-awesome-reveal";
import StyleContext from "../../store/context";

const Achievement = (): ReactElement => {
  const {isDark} = useContext<any>(StyleContext);
  return (
    <>
    {
      achievementSection.display && (
        <Fade direction={"up"} duration={1000}>
        <div className="main" id="achievements">
          <div className="achievement-main-div">
            <div className="achievement-header">
              <h1
                className={
                  isDark
                    ? "dark-mode heading achievement-heading"
                    : "heading achievement-heading"
                }
              >
                {achievementSection.title}
              </h1>
              <p
                className={
                  isDark
                    ? "dark-mode subTitle achievement-subtitle"
                    : "subTitle achievement-subtitle"
                }
              >
                {achievementSection.subtitle}
              </p>
            </div>
            <div className="achievement-cards-div">
              {achievementSection.achievementsCards.map((card, i) => {
                return (
                  <AchievementCard
                    key={i}
                    isDark={isDark}
                    cardInfo={{
                      title: card.title,
                      description: card.subtitle,
                      image: card.image,
                      imageAlt: card.imageAlt,
                      footer: card.footerLink
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Fade>
      )
    }
    </>
  );
}

export default Achievement;
